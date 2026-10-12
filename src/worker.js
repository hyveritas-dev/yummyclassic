// Yummy Classic site worker.
// Static files are served from the assets directory; only /api/* runs this code (see wrangler.jsonc).
//
// GET /api/intl-concerts?country=US
//   International classical concerts from the Ticketmaster Discovery API.
//   The API key lives in the Cloudflare secret TICKETMASTER_KEY (never in index.html).
//   Each country's list is cached for 6 hours, so visitor traffic does not raise API usage.

const TM_ENDPOINT = 'https://app.ticketmaster.com/discovery/v2/events.json';
const COUNTRIES = ['US', 'GB', 'DE', 'FR', 'CA', 'AU'];
const TTL = 6 * 60 * 60; // seconds
const CACHE_VERSION = 'v1';

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
  q.searchParams.set('size', '60');
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
    if (!it.title || !it.url) continue;
    const k = (it.title + '|' + it.venue).toLowerCase();
    if (seen.has(k)) seen.get(k).moreDates++;
    else seen.set(k, Object.assign(it, { moreDates: 0 }));
  }
  const items = [...seen.values()].slice(0, 40);

  const res = json({ country, updated: new Date().toISOString(), source: 'Ticketmaster', items }, 200, TTL);
  ctx.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/intl-concerts') return intlConcerts(request, env, ctx, url);
    return env.ASSETS.fetch(request);
  },
};
