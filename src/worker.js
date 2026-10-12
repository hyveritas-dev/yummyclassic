// Yummy Classic site worker.
// Static files are served from the assets directory; only /api/* runs this code (see wrangler.jsonc).
//
// POST /api/translate — Korean event titles translated for the EN/JA pages (see below)
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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/intl-concerts') return intlConcerts(request, env, ctx, url);
    if (url.pathname === '/api/translate') return translate(request, env, ctx, url);
    return env.ASSETS.fetch(request);
  },
};
