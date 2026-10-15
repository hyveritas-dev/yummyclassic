import { DurableObject } from 'cloudflare:workers';

// Yummy Classic site worker.
// Static files are served from the assets directory; only /api/* and shared links (/s) run this code (see wrangler.jsonc).
//
// POST /api/translate — Korean event titles translated for the EN/JA pages (see below)
//
// GET  /api/stat           how many people got each result type (for "같은 유형 12%")
// POST /api/stat {m, k}    count one finished test (k 'done') or finished friend match (k 'match')
// POST /api/fb {v, c, m}   one-tap result feedback (v 1 = fits me, -1 = not me), saved on tap -> {id}
// POST /api/fb {id, c}      optional one-line comment added to that vote afterwards
// GET  /api/fb?key=&days=1 read feedback (key checked against ADMIN_HASH)
// GET  /s?...&t=<type> or /s?vm=...  the page, with its link preview set to the shared result type
//
// GET /api/intl-concerts?country=US
//   International classical concerts from the Ticketmaster Discovery API.
//   The API key lives in the Cloudflare secret TICKETMASTER_KEY (never in index.html).
//   Each country's list is cached for 6 hours, so visitor traffic does not raise API usage.

const TM_ENDPOINT = 'https://app.ticketmaster.com/discovery/v2/events.json';
const COUNTRIES = ['US', 'GB', 'DE', 'FR', 'CA', 'AU'];
const TTL = 6 * 60 * 60; // seconds
const CACHE_VERSION = 'v3';

// Ticketmaster's "Classical" genre mixes real classical concerts with film-score shows, pop acts and tributes.
// Each title is sorted into: 'classical' (the main list), 'crossover' (shown after, with a label) or dropped.
const ENSEMBLE = /symphon|orchest|philharmon|sinfoni|orchestre/i;
const REPERTOIRE = new RegExp([
  'chamber', 'quartet', 'quintet', 'trio\\b', 'recital', 'sonata', 'concerto', 'opera', 'requiem', 'oratorio',
  'cantata', 'masterworks', 'choral', 'choir', 'chorale', 'baroque', 'string', 'piano', 'cello', 'violin', 'organ\\b',
  'ballet', 'nutcracker', 'messiah', 'swan lake', 'scheherazade', 'kammer', 'konzert', 'quatuor', 'opéra', 'récital',
  'bach', 'mozart', 'beethoven', 'brahms', 'tchaikovsky', 'chopin', 'debussy', 'ravel', 'mahler', 'schubert',
  'schumann', 'handel', 'händel', 'haydn', 'vivaldi', 'rachmanin', 'dvor', 'dvoř', 'sibelius', 'grieg', 'liszt',
  'mendelssohn', 'verdi', 'puccini', 'wagner', 'strauss', 'stravinsky', 'prokofiev', 'shostakovich', 'bruckner',
  'elgar', 'holst', 'copland', 'gershwin', 'bernstein', 'satie', 'faur', 'saint-sa', 'bizet', 'rossini', 'respighi',
  'berlioz', 'messiaen', 'einaudi', 'pärt',
].join('|'), 'i');
// giveaways of a crossover show (film/game scores, pops, tributes, singers "in concert")
const CROSSOVER = /\bin concert\b|live to film|tribute|the music of|music of the|\bpops\b|candlelight|film|movie|anime|video game|\bblues\b|\bjazz\b|\brock\b|broadway/i;
// big names: a small nudge for 인기순 (Ticketmaster gives no popularity figure)
const MARQUEE = /carnegie|lincoln center|new york philharmonic|boston symphony|chicago symphony|los angeles phil|la phil|philadelphia orchestra|cleveland orchestra|san francisco symphony|metropolitan opera|royal albert|barbican|wigmore|royal opera|london symphony|london philharmonic|berliner philharmoniker|berlin phil|elbphilharmonie|gewandhaus|philharmonie de paris|opéra de paris|opera de paris|sydney opera house|sydney symphony|toronto symphony|montreal symphony|orchestre symphonique de montréal/i;

function category(title) {
  const rep = REPERTOIRE.test(title), ens = ENSEMBLE.test(title), cross = CROSSOVER.test(title);
  if (cross) return (rep || ens) || /\bin concert\b|live to film|candlelight|\bpops\b/i.test(title) ? 'crossover' : '';
  if (rep) return 'classical';
  // "<pop act> with the X Symphony": an orchestra but no classical repertoire named
  if (ens) return /\bwith\b|\bw\/|\bfeat/i.test(title) ? 'crossover' : 'classical';
  return '';
}

const json = (body, status = 200, maxAge = 0) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': maxAge ? `public, max-age=${maxAge}` : 'no-store',
    'access-control-allow-origin': '*',
  },
});

// pick a landscape image around 640px wide
function pickImage(images) {
  if (!Array.isArray(images) || !images.length) return '';
  const wide = images.filter(i => i.ratio === '16_9' || i.ratio === '3_2');
  const pool = wide.length ? wide : images;
  const best = pool.slice().sort((a, b) => Math.abs((a.width || 0) - 640) - Math.abs((b.width || 0) - 640))[0];
  return best && best.url ? best.url : '';
}

function toItem(ev) {
  const v = (ev._embedded && ev._embedded.venues && ev._embedded.venues[0]) || {};
  const start = (ev.dates && ev.dates.start) || {};
  return {
    title: ev.name || '',
    date: start.localDate || '',
    time: start.timeTBA || start.noSpecificTime ? '' : (start.localTime || '').slice(0, 5),
    venue: v.name || '',
    city: (v.city && v.city.name) || '',
    country: (v.country && v.country.countryCode) || '',
    url: ev.url || '',
    image: pickImage(ev.images),
  };
}

async function intlConcerts(request, env, ctx, url) {
  const country = (url.searchParams.get('country') || 'US').toUpperCase();
  if (!COUNTRIES.includes(country)) return json({ error: 'country', countries: COUNTRIES }, 400);
  if (!env.TICKETMASTER_KEY) return json({ error: 'no-key' }, 503);

  const cache = caches.default;
  const cacheKey = new Request(`${url.origin}/api/intl-concerts?country=${country}&cv=${CACHE_VERSION}`);
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const q = new URL(TM_ENDPOINT);
  q.searchParams.set('apikey', env.TICKETMASTER_KEY);
  q.searchParams.set('classificationName', 'classical');
  q.searchParams.set('countryCode', country);
  q.searchParams.set('sort', 'date,asc');
  q.searchParams.set('size', '150');
  q.searchParams.set('startDateTime', new Date().toISOString().slice(0, 19) + 'Z');

  let data;
  try {
    const r = await fetch(q.toString(), { headers: { accept: 'application/json' } });
    if (!r.ok) return json({ error: 'upstream', status: r.status }, 502);
    data = await r.json();
  } catch (e) {
    return json({ error: 'upstream' }, 502);
  }

  // one card per concert: the same title at the same venue on several dates keeps the earliest date
  const seen = new Map();
  for (const ev of (data._embedded && data._embedded.events) || []) {
    const it = toItem(ev);
    const cat = it.title && it.url ? category(it.title) : '';
    if (!cat) continue;
    const k = (it.title + '|' + it.venue).toLowerCase();
    if (seen.has(k)) seen.get(k).moreDates++;
    else seen.set(k, Object.assign(it, { cat, moreDates: 0 }));
  }
  // classical is the main list; crossover fills in after it (at most 12)
  const all = [...seen.values()];
  const items = all.filter(e => e.cat === 'classical').slice(0, 40)
    .concat(all.filter(e => e.cat === 'crossover').slice(0, 12));
  // 인기순 score: more performance dates (demand) + marquee orchestra/hall; crossover always ranks below classical
  items.forEach(e => {
    e.pop = Math.min(e.moreDates, 6) * 10 + (MARQUEE.test(e.title + ' ' + e.venue) ? 25 : 0) + (e.cat === 'classical' ? 100 : 0);
  });

  const res = json({ country, updated: new Date().toISOString(), source: 'Ticketmaster', items }, 200, TTL);
  ctx.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}

// POST /api/translate  {to:'en'|'ja', texts:[...]}  ->  {to, map:{text: translation}}
//   Korean concert/exhibition titles shown as "한국어 제목 (translation)" on the EN/JA pages.
//   Uses the Workers AI binding (no extra key); each title is cached for 30 days.
const TR_MODEL = '@cf/meta/m2m100-1.2b';
const TR_TTL = 30 * 24 * 60 * 60;
const TR_LANGS = { en: 'english', ja: 'japanese' };

async function sha(text) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

async function translateOne(env, text, to) {
  // the model accepts language names; fall back to codes if a name is refused
  for (const [src, dst] of [['korean', TR_LANGS[to]], ['ko', to]]) {
    try {
      const r = await env.AI.run(TR_MODEL, { text, source_lang: src, target_lang: dst });
      const out = r && (r.translated_text || (r.result && r.result.translated_text));
      if (out && out.trim() && out.trim() !== text.trim()) return out.trim();
    } catch (e) { /* try the next form */ }
  }
  return '';
}

async function translate(request, env, ctx, url) {
  if (request.method !== 'POST') return json({ error: 'method' }, 405);
  if (!env.AI) return json({ error: 'no-ai' }, 503);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'body' }, 400); }
  const to = body && TR_LANGS[body.to] ? body.to : '';
  if (!to) return json({ error: 'lang' }, 400);
  const texts = [...new Set((Array.isArray(body.texts) ? body.texts : []).map(t => String(t || '').trim()).filter(t => t && t.length <= 200))].slice(0, 30);
  const cache = caches.default, map = {};
  await Promise.all(texts.map(async text => {
    const key = new Request(`${url.origin}/api/translate-cache/${to}/${await sha(text)}`);
    const hit = await cache.match(key);
    if (hit) { map[text] = await hit.text(); return; }
    const out = await translateOne(env, text, to);
    if (!out) return;
    map[text] = out;
    ctx.waitUntil(cache.put(key, new Response(out, { headers: { 'cache-control': `public, max-age=${TR_TTL}` } })));
  }));
  return json({ to, map });
}


// ---------- Result types, feedback and link previews ----------
const TYPES = {"radiant": {"en": "The Quiet Light-Catcher", "ko": "고요한 빛을 모으는 사람", "ja": "静かな光を集める人"}, "grand": {"en": "The Grand Conductor", "ko": "무대 한가운데의 지휘자", "ja": "舞台の真ん中の指揮者"}, "mercy": {"en": "The Gentle Consoler", "ko": "따뜻한 위로를 건네는 사람", "ja": "温かな慰めを差し出す人"}, "dramatic": {"en": "The Chiaroscuro Director", "ko": "명암을 즐기는 연출가", "ja": "明暗を楽しむ演出家"}, "joy": {"en": "The Sparkler", "ko": "반짝이는 에너지의 소유자", "ja": "きらめくエネルギーの持ち主"}, "heroic": {"en": "The Decisive Leader", "ko": "결단의 리더", "ja": "決断のリーダー"}, "solemn": {"en": "The Quiet Philosopher", "ko": "깊이 사색하는 철학자", "ja": "深く思索する哲学者"}, "elegant": {"en": "The Connoisseur of Grace", "ko": "우아함을 아는 감식가", "ja": "優雅を知る目利き"}, "calm": {"en": "The Keeper of Calm", "ko": "평온을 지키는 사람", "ja": "平穏を守る人"}, "galant": {"en": "The Charming Socialite", "ko": "산뜻하게 반짝이는 사교가", "ja": "軽やかにきらめく社交家"}, "tender": {"en": "The Tender Dreamer", "ko": "다정한 몽상가", "ja": "やさしい夢想家"}, "love": {"en": "The Wholehearted Romantic", "ko": "사랑에 진심인 로맨티스트", "ja": "恋に本気のロマンチスト"}, "tragic": {"en": "The One Who Faces the Dark", "ko": "어둠을 정면으로 보는 사람", "ja": "闇をまっすぐ見つめる人"}, "opulent": {"en": "The Storm Chaser", "ko": "폭풍을 즐기는 탐험가", "ja": "嵐を楽しむ探検家"}, "dread": {"en": "The Night Storyteller", "ko": "밤의 이야기꾼", "ja": "夜の語り部"}, "dash": {"en": "The Unstoppable Runner", "ko": "멈추지 않는 질주자", "ja": "止まらない疾走者"}, "fantasy": {"en": "The Dream Traveller", "ko": "꿈과 신화의 여행자", "ja": "夢と神話の旅人"}, "intimate": {"en": "The Host of a Cosy Room", "ko": "따뜻한 거실의 주인", "ja": "温かな居間のあるじ"}};
// sha-256 of the admin key used to read feedback; the key itself is never stored in this repo
const ADMIN_HASH = 'b549ab8e45bf613ffd6031b9aa8f32a0e0d85145dcb20eb4296c6c1ea8516cb2';
const SITE_LANGS = ['ko', 'en', 'ja'];
const OG_TXT = {
  ko: { type: '나의 오늘 그림 유형은 ‘{t}’', typeDesc: '그림 몇 장만 고르면 오늘의 클래식이 나와요. 어떤 그림에 끌리세요?',
        pair: '두 분의 화음 결과지가 도착했어요', pairDesc: '그림으로 알아본 소중한 사람과 나의 화음, 지금 열어 보세요.',
        match: '소중한 사람과 나, 그림으로 알아본 화음은 몇%일까요?', matchDesc: '화음 링크가 도착했어요. 그림 몇 장만 고르면 두 분의 화음과 화음률이 나와요.' },
  en: { type: 'My painting type today: “{t}”', typeDesc: 'Pick a few paintings and today’s classical finds you. Which one draws you?',
        pair: 'Your harmony report has arrived', pairDesc: 'The harmony the two of you found through paintings. Open it now.',
        match: 'You and someone special: what % harmony do your paintings show?', matchDesc: 'A harmony link for you. Pick a few paintings to see your harmony and its rate.' },
  ja: { type: '今日の私の絵のタイプは「{t}」', typeDesc: '絵を数枚選ぶだけで、今日のクラシックが見つかります。',
        pair: 'ふたりの和音レポートが届きました', pairDesc: '絵で見つけた大切な人との和音を、今すぐ開いてみてください。',
        match: '大切な人と私、絵でわかる和音は何%?', matchDesc: '和音リンクが届きました。絵を数枚選ぶと、ふたりの和音と和音率がわかります。' },
};

export class Store extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec('CREATE TABLE IF NOT EXISTS cnt (k TEXT PRIMARY KEY, n INTEGER NOT NULL DEFAULT 0)');
    this.sql.exec('CREATE TABLE IF NOT EXISTS short (code TEXT PRIMARY KEY, q TEXT NOT NULL, ts INTEGER NOT NULL)');
    this.sql.exec('CREATE TABLE IF NOT EXISTS fb (id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER NOT NULL, v INTEGER NOT NULL, c TEXT, m TEXT, e TEXT, lang TEXT, dev TEXT)');
  }
  hit(keys) {
    for (const k of keys) this.sql.exec('INSERT INTO cnt (k, n) VALUES (?, 1) ON CONFLICT(k) DO UPDATE SET n = n + 1', k);
    return true;
  }
  counts() {
    const out = {};
    for (const r of this.sql.exec('SELECT k, n FROM cnt').toArray()) out[r.k] = r.n;
    return out;
  }
  addFb(r) {
    this.sql.exec('INSERT INTO fb (ts, v, c, m, e, lang, dev) VALUES (?, ?, ?, ?, ?, ?, ?)', Date.now(), r.v, r.c, r.m, r.e, r.lang, r.dev);
    this.hit([r.v > 0 ? 'fb:up' : 'fb:down']);
    return this.sql.exec('SELECT last_insert_rowid() AS id').toArray()[0].id;
  }
  // an optional comment added after the vote; only to a fresh row that has no comment yet
  addComment(id, c) {
    this.sql.exec("UPDATE fb SET c = ? WHERE id = ? AND (c IS NULL OR c = '') AND ts >= ?", c, id, Date.now() - 3600e3);
    return true;
  }
  putShort(code, q) {
    const row = this.sql.exec('SELECT q FROM short WHERE code = ?', code).toArray()[0];
    if (row) return row.q === q;
    this.sql.exec('INSERT INTO short (code, q, ts) VALUES (?, ?, ?)', code, q, Date.now());
    return true;
  }
  getShort(code) {
    const row = this.sql.exec('SELECT q FROM short WHERE code = ?', code).toArray()[0];
    return row ? row.q : '';
  }
  listFb(since, limit) {
    return this.sql.exec('SELECT * FROM fb WHERE ts >= ? ORDER BY id DESC LIMIT ?', since, limit).toArray();
  }
}
const store = env => env.STORE.get(env.STORE.idFromName('main'));
const today = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);   // KST day
const clean = (x, n) => String(x == null ? '' : x).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);
async function sha256hex(text) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function stat(request, env, ctx, url) {
  if (!env.STORE) return json({ error: 'no-store' }, 503);
  if (request.method === 'POST') {
    let b; try { b = await request.json(); } catch (e) { return json({ error: 'body' }, 400); }
    const m = b && TYPES[b.m] ? b.m : '';
    if (!m) return json({ error: 'type' }, 400);
    const keys = b.k === 'match' ? ['match', 'match:' + today()] : ['all', 'm:' + m, 'd:' + today()];
    await store(env).hit(keys);
    return json({ ok: true });
  }
  const cache = caches.default, key = new Request(url.origin + '/api/stat?cv=1');
  const hit = await cache.match(key);
  if (hit) return hit;
  const c = await store(env).counts(), m = {};
  Object.keys(TYPES).forEach(t => { if (c['m:' + t]) m[t] = c['m:' + t]; });
  const res = json({ all: c.all || 0, m, today: c['d:' + today()] || 0, match: c.match || 0 }, 200, 120);
  ctx.waitUntil(cache.put(key, res.clone()));
  return res;
}

async function feedback(request, env, ctx, url) {
  if (!env.STORE) return json({ error: 'no-store' }, 503);
  if (request.method === 'POST') {
    let b; try { b = await request.json(); } catch (e) { return json({ error: 'body' }, 400); }
    if (b && Number.isInteger(b.id) && b.id > 0) {   // comment for a vote already sent
      const c = clean(b.c, 300); if (c) await store(env).addComment(b.id, c);
      return json({ ok: true });
    }
    const v = b && (b.v === 1 || b.v === -1) ? b.v : 0;
    if (!v) return json({ error: 'vote' }, 400);
    const id = await store(env).addFb({ v, c: clean(b.c, 300), m: TYPES[b.m] ? b.m : '', e: clean(b.e, 12), lang: clean(b.lang, 4), dev: clean(b.dev, 8) });
    return json({ ok: true, id });
  }
  if ((await sha256hex(url.searchParams.get('key') || '')) !== ADMIN_HASH) return json({ error: 'key' }, 403);
  const days = Math.min(Math.max(parseFloat(url.searchParams.get('days') || '1') || 1, 0.04), 90);
  const S = store(env);
  const rows = await S.listFb(Date.now() - days * 864e5, 500);
  const counts = await S.counts();
  const kst = ts => new Date(ts + 9 * 3600e3).toISOString().slice(0, 16).replace('T', ' ');
  return json({ days, counts, feedback: rows.map(r => ({ time_kst: kst(r.ts), vote: r.v > 0 ? 'fits' : 'not-me', comment: r.c, type: r.m, era: r.e, lang: r.lang, device: r.dev })) });
}

// Shared links: link previews (KakaoTalk, X, Facebook…) read og: tags without running scripts, so the worker writes them.
// POST /api/short {q}  ->  {code, url}: a short /s/<code> link for a shared result or match link
const SHORT_KEYS = ['e', 'p', 'a', 't', 'vm', 've', 'vp', 'pr', 'lang'];
const B62 = '0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';   // no l/I/O
function canonQuery(raw) {
  const q = new URLSearchParams(String(raw || '')), out = new URLSearchParams();
  SHORT_KEYS.forEach(k => { const v = q.get(k); if (v && /^[A-Za-z0-9_,\-]{1,300}$/.test(v)) out.set(k, v); });
  return out.toString();
}
async function shortCode(q, len) {
  const d = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(q)));
  let s = ''; for (let i = 0; i < len; i++) s += B62[d[i] % B62.length];
  return s;
}
async function shortLink(request, env, ctx, url) {
  if (!env.STORE) return json({ error: 'no-store' }, 503);
  if (request.method !== 'POST') return json({ error: 'method' }, 405);
  let b; try { b = await request.json(); } catch (e) { return json({ error: 'body' }, 400); }
  const q = canonQuery(b && b.q);
  if (!q || (!q.includes('p=') && !q.includes('vm=')) || q.length > 700) return json({ error: 'query' }, 400);
  const S = store(env);
  for (let len = 6; len <= 10; len++) {
    const code = await shortCode(q, len);
    if (await S.putShort(code, q)) return json({ code, url: url.origin + '/s/' + code });
  }
  return json({ error: 'busy' }, 503);
}
async function openShort(request, env, url) {
  const code = url.pathname.slice(3);
  if (!env.STORE || !/^[0-9A-Za-z]{6,10}$/.test(code)) return Response.redirect(url.origin + '/', 302);
  const q = await store(env).getShort(code);
  if (!q) return Response.redirect(url.origin + '/', 302);
  return page(request, env, new URL(url.origin + '/s?' + q), q);
}

// Shared links use /s?… (or the short /s/<code>) so ordinary visits to / stay static (no worker run).
async function page(request, env, url, shortQ) {
  const hd = new Headers(request.headers); hd.delete('if-none-match'); hd.delete('if-modified-since');
  const res = await env.ASSETS.fetch(new Request(url.origin + '/', { headers: hd }));
  try {
    const q = url.searchParams, ct = res.headers.get('content-type') || '';
    if (res.status !== 200 || !ct.includes('text/html')) return res;
    const lang = SITE_LANGS.includes(q.get('lang')) ? q.get('lang') : 'ko', T = OG_TXT[lang], img = lang === 'ko' ? 'ko' : 'en';
    let title, desc, image;
    if (q.get('pr') === '1' && q.get('vm') && TYPES[q.get('vm')]) { title = T.pair; desc = T.pairDesc; image = '/og/match-' + img + '.png'; }
    else if (q.get('vm') && TYPES[q.get('vm')]) { title = T.match; desc = T.matchDesc; image = '/og/match-' + img + '.png'; }
    else if (q.get('p') && TYPES[q.get('t')]) { title = T.type.replace('{t}', TYPES[q.get('t')][lang]); desc = T.typeDesc; image = '/og/' + q.get('t') + '-' + img + '.png'; }
    else if (!shortQ) return res;
    const abs = url.origin + image, esc = v => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const set = v => ({ element(e) { e.setAttribute('content', v); } });
    const rw = new HTMLRewriter();
    // a short link: put the full query back in the address bar before the page script reads it
    if (shortQ) rw.on('head', { element(e) { e.prepend('<script>try{history.replaceState(null,"","/s?"+' + JSON.stringify(shortQ).replace(/</g, '\\u003c') + ')}catch(e){}</script>', { html: true }); } });
    if (!title) return rw.transform(res);
    const out = rw
      .on('meta[property="og:title"]', set(title))
      .on('meta[property="og:description"]', set(desc))
      .on('meta[property="og:image"]', set(abs))
      .on('head', { element(e) {
        e.append('<meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />'
          + '<meta name="twitter:image" content="' + esc(abs) + '" /><meta name="twitter:title" content="' + esc(title) + '" />', { html: true });
      } })
      .transform(res);
    const h = new Headers(out.headers);
    h.set('cache-control', 'public, max-age=300'); h.delete('etag');
    return new Response(out.body, { status: 200, headers: h });
  } catch (e) {
    return res;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // short promo links: /fb1, /fb2 … → English page with visit tags (utm_campaign = fb1, fb2 …)
    const fb = url.pathname.match(/^\/fb(\d{1,3})\/?$/);
    if (fb) return Response.redirect(`${url.origin}/?lang=en&utm_source=facebook&utm_medium=group&utm_campaign=fb${fb[1]}`, 302);
    if (url.pathname === '/api/intl-concerts') return intlConcerts(request, env, ctx, url);
    if (url.pathname === '/api/translate') return translate(request, env, ctx, url);
    if (url.pathname === '/api/stat') return stat(request, env, ctx, url);
    if (url.pathname === '/api/fb') return feedback(request, env, ctx, url);
    if (url.pathname === '/s') return page(request, env, url);
    if (url.pathname.startsWith('/s/')) return openShort(request, env, url);
    if (url.pathname === '/api/short') return shortLink(request, env, ctx, url);
    return env.ASSETS.fetch(request);
  },
};
