#!/usr/bin/env node
// 검색용 정적 페이지 생성기
//   node scripts/build-seo.js
// assets/app.js 안의 데이터(COMPOSERS, WORKS, PORTRAIT, POOLS, CAT, TYPES)를 읽어
//   /classical/                     허브 (작곡가·취향 유형 모아보기)
//   /classical/composers/<id>/      작곡가별 대표곡 10선
//   /classical/types/<id>/          그림 취향 유형별 추천곡
//   /sitemap.xml, /robots.txt
// 를 만든다. app.js 데이터를 고친 뒤 다시 실행하면 페이지도 같이 갱신된다.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://yummyclassic.co.kr';
const GA_ID = 'G-MFFJHXYMYQ';
const src = fs.readFileSync(path.join(ROOT, 'assets/app.js'), 'utf8');

// ---------- app.js에서 `const NAME = {...}` 리터럴을 꺼내 평가 ----------
function extract(name) {
  const m = new RegExp('const ' + name + ' = ([\\[{])').exec(src);
  if (!m) throw new Error('not found: ' + name);
  let i = m.index + m[0].length - 1, depth = 0, q = null;
  const start = i;
  for (; i < src.length; i++) {
    const c = src[i];
    if (q) {
      if (c === '\\') { i++; continue; }
      if (c === q) q = null;
      continue;
    }
    if (c === '/' && src[i + 1] === '/') { i = src.indexOf('\n', i); continue; }
    if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i) + 1; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') { depth--; if (depth === 0) break; }
  }
  return Function('"use strict"; return (' + src.slice(start, i + 1) + ');')();
}

const COMPOSERS = extract('COMPOSERS');
const WORKS = extract('WORKS');
const PORTRAIT = extract('PORTRAIT');
const SHORT = extract('SHORT');
const POOLS = extract('POOLS');
const CAT = extract('CAT');
const TYPES = extract('TYPES');

// ---------- 공통 도구 ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const norm = s => String(s).toLowerCase().replace(/[“”"'’‘.,()–—\-:;!?]/g, ' ').replace(/\s+/g, ' ').trim();
const imgUrl = (file, w) => {
  const name = file.replace(/ /g, '_'), h = crypto.createHash('md5').update(name).digest('hex'), enc = encodeURIComponent(name);
  return '/img/thumb/' + h[0] + '/' + h.slice(0, 2) + '/' + enc + '/' + w + 'px-' + enc;
};
// 작곡가 칩 옆 작은 초상: 본앱과 같은 120px 썸네일(엣지 캐시 공유), 지연 로딩, 크기 고정으로 레이아웃 흔들림 없음
const face = id => PORTRAIT[id]
  ? `<img class="face" src="${imgUrl(PORTRAIT[id], 120)}" alt="" width="26" height="26" loading="lazy" decoding="async">`
  : '';
const ytWatch = id => 'https://www.youtube.com/watch?v=' + id;
const ytSearch = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);

const ERA_KO = { classic: '바로크 · 고전주의', romantic: '낭만주의', impress: '인상주의' };
const eraOf = {};
const fullName = {};
Object.entries(COMPOSERS).forEach(([era, list]) => list.forEach(([en, ko, id]) => {
  if (id) { eraOf[id] = era; fullName[id] = [en, ko]; }
}));
const shortKo = id => (SHORT[id] ? SHORT[id][1] : (fullName[id] ? fullName[id][1] : id));
const shortEn = id => (SHORT[id] ? SHORT[id][0] : (fullName[id] ? fullName[id][0] : id));

// 곡 제목(영문) → 유튜브 녹음
const REC = new Map();
CAT.forEach(x => { if (x.yt && !REC.has(norm(x.en))) REC.set(norm(x.en), { yt: x.yt, who: x.who }); });
Object.values(POOLS).forEach(list => list.forEach(([, en, , yt, who]) => { if (yt && !REC.has(norm(en))) REC.set(norm(en), { yt, who }); }));

// 작곡가 → 그 작곡가가 추천되는 취향 유형
const typesOfComposer = {};
Object.entries(POOLS).forEach(([type, list]) => list.forEach(([cid]) => {
  if (!TYPES[type]) return;
  (typesOfComposer[cid] = typesOfComposer[cid] || new Set()).add(type);
}));

const composerIds = Object.keys(WORKS).filter(id => fullName[id]);
const typeIds = Object.keys(TYPES).filter(t => POOLS[t] && POOLS[t].length);

// ---------- 페이지 틀 ----------
const CSS = `
:root{--vanilla:#F4E9D0;--paper:#FBF5E6;--wine:#7A0F2A;--ink:#2A1A1E;--muted:rgba(42,26,30,.66);--apricot:#E8753D;--line:rgba(122,15,42,.16)}
*{box-sizing:border-box}
body{margin:0;background:var(--vanilla);color:var(--ink);font-family:'Pretendard Variable',Pretendard,-apple-system,BlinkMacSystemFont,system-ui,sans-serif;line-height:1.7;-webkit-font-smoothing:antialiased}
a{color:var(--wine)}
.wrap{max-width:760px;margin:0 auto;padding:0 16px}
header.top{border-bottom:1px solid var(--line);background:var(--vanilla)}
header.top .wrap{display:flex;align-items:center;justify-content:space-between;height:56px}
.brand{font-family:'Noto Serif KR',Georgia,serif;font-weight:700;color:var(--wine);text-decoration:none;font-size:1.05rem}
.top-cta{font-size:.85rem;font-weight:600;text-decoration:none;border:1px solid var(--wine);border-radius:999px;padding:6px 14px}
nav.crumb{font-size:.8rem;color:var(--muted);margin:22px 0 6px}
nav.crumb a{color:var(--muted);text-decoration:none}
h1{font-family:'Noto Serif KR',Georgia,serif;font-size:clamp(1.6rem,5vw,2.3rem);line-height:1.3;margin:6px 0 10px;color:var(--ink)}
h2{font-family:'Noto Serif KR',Georgia,serif;font-size:1.25rem;margin:40px 0 12px}
.lead{color:var(--muted);margin:0 0 18px}
.hero{display:flex;gap:18px;align-items:center;margin:18px 0 8px}
.hero img{width:96px;height:96px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid var(--paper);box-shadow:0 2px 10px rgba(42,26,30,.15);flex:none;background:var(--paper)}
.tag{display:inline-block;font-size:.75rem;font-weight:600;color:var(--wine);background:var(--paper);border:1px solid var(--line);border-radius:999px;padding:2px 10px}
ol.works{list-style:none;padding:0;margin:0;counter-reset:w}
ol.works li{counter-increment:w;background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:14px 16px 14px 52px;margin:0 0 10px;position:relative}
ol.works li::before{content:counter(w);position:absolute;left:16px;top:14px;width:24px;height:24px;border-radius:50%;background:var(--wine);color:var(--paper);font-size:.8rem;font-weight:700;display:flex;align-items:center;justify-content:center}
.w-ko{font-weight:600}
.w-en{font-size:.82rem;color:var(--muted)}
.w-by{font-size:.82rem;color:var(--muted)}
.w-link{font-size:.82rem;font-weight:600;text-decoration:none;margin-top:4px;display:inline-block}
.cta{display:block;text-align:center;background:var(--wine);color:var(--paper);text-decoration:none;font-weight:700;border-radius:14px;padding:16px;margin:34px 0 8px}
.cta.share{width:100%;border:0;font:inherit;font-weight:700;cursor:pointer}
.cta small{display:block;font-weight:400;opacity:.85;font-size:.8rem}
.chips{display:flex;flex-wrap:wrap;gap:8px;padding:0;margin:0;list-style:none}
.chips a{display:inline-block;text-decoration:none;background:var(--paper);border:1px solid var(--line);border-radius:999px;padding:6px 12px;font-size:.88rem;color:var(--ink)}
.chips a.has-face{display:inline-flex;align-items:center;gap:7px;padding:4px 12px 4px 4px}
.face{width:26px;height:26px;border-radius:50%;object-fit:cover;object-position:50% 20%;background:var(--line);flex:none}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px;padding:0;margin:0;list-style:none}
.grid a{display:block;height:100%;text-decoration:none;color:var(--ink);background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:14px}
.grid b{display:block;color:var(--wine)}
.grid span{font-size:.85rem;color:var(--muted)}
.w-link.on{color:var(--ink)}
ol.works li.playing{border-color:var(--wine);box-shadow:0 2px 12px rgba(122,15,42,.12)}
.pl-player{margin:10px 0 4px;aspect-ratio:16/9;border-radius:10px;overflow:hidden;background:#000;max-width:520px}
.pl-player iframe{width:100%;height:100%;display:block;border:0}
.pl-player.pl-fail{aspect-ratio:auto;background:transparent;padding:4px 0}
.pl-player.pl-fail a{font-size:.88rem}
.pl-tools{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.pl-tool{font:inherit;font-size:.8rem;font-weight:600;color:var(--wine);background:var(--vanilla);border:1px solid var(--line);border-radius:999px;padding:4px 12px;text-decoration:none;cursor:pointer}
.pl-auto{font-size:.78rem;color:var(--muted);margin:2px 0 0}
.typeimg{width:100%;max-width:520px;border-radius:14px;display:block;margin:10px 0 4px;border:1px solid var(--line)}
footer.site{border-top:1px solid var(--line);margin-top:56px;padding:26px 0 40px;font-size:.8rem;color:var(--muted)}
footer.site a{color:var(--muted)}
`;

// ---------- 페이지 안 재생: 본앱과 같은 방식(YouTube IFrame API), 한 곡이 끝나면 다음 곡으로 ----------
const PLAYER = `  <script>
  (function () {
    var items = document.querySelectorAll('ol.works li[data-yt]');
    if (!items.length || !/^https?:$/.test(location.protocol)) return;
    var api = null, li0 = null, player = null;
    function loadYT() {
      if (api) return api;
      api = new Promise(function (res) {
        if (window.YT && window.YT.Player) return res(true);
        var prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () { if (typeof prev === 'function') prev(); res(true); };
        var s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api'; s.async = true;
        s.onerror = function () { res(false); };
        document.head.appendChild(s);
        setTimeout(function () { res(!!(window.YT && window.YT.Player)); }, 9000);
      });
      return api;
    }
    window.addEventListener('pointerdown', function () { loadYT(); }, { once: true });
    function btn(li) { return li.querySelector('.pl-btn'); }
    function stop() {
      if (player) { try { player.destroy(); } catch (e) {} }
      if (li0) {
        ['.pl-player', '.pl-tools', '.pl-auto'].forEach(function (c) { var x = li0.querySelector(c); if (x) x.remove(); });
        li0.classList.remove('playing');
        var b = btn(li0); if (b) { b.textContent = '▶ 이 창에서 듣기'; b.classList.remove('on'); }
      }
      player = null; li0 = null;
    }
    function nextOf(li) {
      var n = li.nextElementSibling;
      while (n && !n.dataset.yt) n = n.nextElementSibling;
      if (!n) {   // 같은 페이지의 다음 목록(예: 더 들어볼 만한 곡)으로 이어서
        var lists = Array.prototype.slice.call(document.querySelectorAll('ol.works'));
        for (var i = lists.indexOf(li.parentNode) + 1; i < lists.length && !n; i++) n = lists[i].querySelector('li[data-yt]');
      }
      return n;
    }
    function playNext(li) { var n = nextOf(li); if (n) open(n, true); else stop(); }
    function fail(li, auto, code) {
      var box = li.querySelector('.pl-player'); if (!box) return;
      if (player) { try { player.destroy(); } catch (e) {} player = null; }
      box.className = 'pl-player pl-fail'; box.innerHTML = '';
      var a = document.createElement('a');
      a.href = 'https://www.youtube.com/watch?v=' + li.dataset.yt; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = '이 곡은 여기서 재생할 수 없어요 — 유튜브에서 열기 ↗';
      box.appendChild(a);
      try { gtag('event', 'play_fail', { piece: li.dataset.name, code: code || 0 }); } catch (e) {}
      if (auto) setTimeout(function () { if (li0 === li) playNext(li); }, 1500);   // 연속 재생 중이면 건너뛰고 다음 곡
    }
    function open(li, auto) {
      if (li0 === li && !auto) { stop(); return; }
      stop();
      li0 = li;
      li.classList.add('playing');
      var b = btn(li); if (b) { b.textContent = '■ 멈추기'; b.classList.add('on'); }
      var box = document.createElement('div'); box.className = 'pl-player';
      var holder = document.createElement('div'); box.appendChild(holder);
      var tools = document.createElement('div'); tools.className = 'pl-tools';
      var nx = document.createElement('button'); nx.type = 'button'; nx.className = 'pl-tool'; nx.textContent = '다음 곡 ▶▶';
      nx.addEventListener('click', function () { var n = nextOf(li); if (n) open(n, false); });
      var yt = document.createElement('a'); yt.className = 'pl-tool'; yt.href = 'https://www.youtube.com/watch?v=' + li.dataset.yt;
      yt.target = '_blank'; yt.rel = 'noopener'; yt.textContent = '유튜브에서 보기 ↗';
      yt.addEventListener('click', function () { try { player && player.pauseVideo(); } catch (e) {} });
      var cl = document.createElement('button'); cl.type = 'button'; cl.className = 'pl-tool'; cl.textContent = '■ 닫기';
      cl.addEventListener('click', stop);
      if (nextOf(li)) tools.appendChild(nx);
      tools.appendChild(yt); tools.appendChild(cl);
      li.appendChild(box); li.appendChild(tools);
      if (nextOf(li)) { var note = document.createElement('p'); note.className = 'pl-auto'; note.textContent = '곡이 끝나면 다음 곡이 이어서 나와요'; li.appendChild(note); }
      setTimeout(function () { li.scrollIntoView({ behavior: 'smooth', block: auto ? 'center' : 'nearest' }); }, 60);
      try { gtag('event', 'play_music', { piece: li.dataset.name, area: 'seo', auto: auto ? 1 : 0 }); } catch (e) {}
      function build() {
        if (li0 !== li) return;
        if (!(window.YT && window.YT.Player)) return fail(li, auto);
        player = new YT.Player(holder, {
          videoId: li.dataset.yt, width: '100%', height: '100%', host: 'https://www.youtube.com',
          playerVars: { autoplay: 1, mute: 0, rel: 0, playsinline: 1, modestbranding: 1, origin: location.origin, enablejsapi: 1 },
          events: {
            onReady: function (e) { try { e.target.unMute(); e.target.setVolume(100); e.target.playVideo(); } catch (x) {} },
            onError: function (e) { fail(li, auto, e && e.data); },
            onStateChange: function (e) {
              if (e.data === 1) { try { if (e.target.isMuted()) { e.target.unMute(); e.target.setVolume(100); } } catch (x) {} }
              if (e.data === 0) playNext(li);
            }
          }
        });
      }
      // API가 이미 있으면 탭 안에서 바로 만들어 자동재생이 막히지 않게
      if (window.YT && window.YT.Player) build(); else loadYT().then(build);
    }
    items.forEach(function (li) {
      var b = btn(li); if (!b) return;
      b.addEventListener('click', function (e) { e.preventDefault(); open(li, false); });
    });
  })();
  </script>`;

function page({ url, title, desc, image, h1, crumbs, body, jsonld }) {
  const crumbHtml = crumbs.map(([t, u]) => (u ? `<a href="${u}">${esc(t)}</a>` : `<span>${esc(t)}</span>`)).join(' › ');
  const crumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(([t, u], i) => ({ '@type': 'ListItem', position: i + 1, name: t, item: SITE + (u || url) })),
  };
  const ld = [crumbLd].concat(jsonld || []).map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n  ');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#F4E9D0" />
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon-96.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon-192.png" />
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <link rel="canonical" href="${SITE}${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="냠냠클래식" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:url" content="${SITE}${url}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${esc(image && image.startsWith('http') ? image : SITE + (image || '/og/match-ko.png'))}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700&display=swap" />
  <style>${CSS.trim()}</style>
  ${ld}
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>
    try { if (localStorage.getItem('noga') === '1') window['ga-disable-${GA_ID}'] = true; } catch (e) {}
    window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date()); gtag('config', '${GA_ID}');
  </script>
</head>
<body>
  <header class="top"><div class="wrap">
    <a class="brand" href="/?lang=ko">냠냠클래식</a>
    <a class="top-cta" href="/?lang=ko">그림으로 취향 찾기</a>
  </div></header>
  <main class="wrap">
    <nav class="crumb" aria-label="현재 위치">${crumbHtml}</nav>
    <h1>${h1}</h1>
${body}
  </main>
  <footer class="site"><div class="wrap">
    <p><a href="/classical/">작곡가·취향 유형 모아보기</a> · <a href="/?lang=ko">냠냠클래식 홈</a> · <a href="https://www.youtube.com/@%EB%83%A0%EB%83%A0%ED%81%B4%EB%9E%98%EC%8B%9D" rel="noopener">YouTube</a> · <a href="https://www.instagram.com/yummy.classic/" rel="noopener">Instagram</a></p>
    <p>초상화·그림: Wikimedia Commons (퍼블릭 도메인) · 음원: YouTube</p>
    <p>© ${new Date().getFullYear()} 냠냠클래식 · 그림 한 장으로 고르는 오늘의 클래식</p>
  </div></footer>
${PLAYER}
</body>
</html>
`;
}

const CTA = `    <a class="cta" href="/?lang=ko">그림 몇 장만 고르면, 오늘 나에게 맞는 클래식을 추천해 드려요
      <small>약 20초 · 회원가입 없음 · 정답 없음</small></a>`;
// 친구에게 추천하기: 휴대폰은 공유 시트, PC는 링크 복사
const SHARE = `    <button type="button" class="cta share" id="share-site">친구에게 냠냠클래식 추천하기
      <small id="share-note">그림 몇 장으로 고르는 오늘의 클래식, 20초면 돼요</small></button>
    <script>
      (function () {
        var b = document.getElementById('share-site'), note = document.getElementById('share-note');
        var data = { title: '냠냠클래식', text: '그림 몇 장만 고르면 오늘 나에게 맞는 클래식을 추천해 줘요. 20초면 돼요!', url: 'https://www.yummyclassic.co.kr/?lang=ko' };
        function done(m) { note.textContent = m; try { gtag('event', 'share', { method: m === '링크를 복사했어요' ? 'copy' : 'native', content_type: 'site', item_id: 'classical_hub' }); } catch (e) {} }
        function copy() {
          var t = data.text + ' ' + data.url;
          if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(function () { done('링크를 복사했어요'); }, function () { prompt('아래 링크를 복사해 친구에게 보내 주세요', data.url); });
          else prompt('아래 링크를 복사해 친구에게 보내 주세요', data.url);
        }
        b.addEventListener('click', function () {
          if (navigator.share) navigator.share(data).then(function () { done('추천해 주셔서 고마워요'); }, function (e) { if (e && e.name !== 'AbortError') copy(); });
          else copy();
        });
      })();
    </script>`;

function workItem(en, ko, who, composerKo) {
  const r = REC.get(norm(en));
  const by = who || (r && r.who);
  const link = r
    ? `<a class="w-link pl-btn" href="${ytWatch(r.yt)}" target="_blank" rel="noopener">▶ 이 창에서 듣기</a>`
    : `<a class="w-link" href="${ytSearch(composerKo + ' ' + ko)}" target="_blank" rel="noopener">▶ 유튜브에서 찾기</a>`;
  return `      <li${r ? ` data-yt="${esc(r.yt)}" data-name="${esc(composerKo + ' · ' + ko)}"` : ''}><div class="w-ko">${esc(ko)}</div><div class="w-en">${esc(en)}</div>${by ? `<div class="w-by">연주 ${esc(by)}</div>` : ''}${link}</li>`;
}

const out = [];   // [url, html]

// ---------- 작곡가 페이지 ----------
composerIds.forEach(id => {
  const [en, ko] = fullName[id], sk = shortKo(id), era = ERA_KO[eraOf[id]] || '';
  const url = `/classical/composers/${id}/`;
  const all = WORKS[id], works = all.slice(0, 10), more = all.slice(10), N = works.length;
  const first = works[0] ? works[0][1] : '';
  const title = `${sk} 대표곡 ${N}선 — 처음 듣기 좋은 ${sk} 명곡 | 냠냠클래식`;
  const desc = `${ko}(${en})의 대표곡 ${N}곡을 시작하기 좋은 악장과 함께 모았어요. ${first ? '“' + first.replace(/[“”]/g, '') + '”' + '부터 ' : ''}유튜브로 바로 들어보세요.`;
  const types = [...(typesOfComposer[id] || [])];
  const sameEra = composerIds.filter(x => x !== id && eraOf[x] === eraOf[id]);
  const img = PORTRAIT[id] ? imgUrl(PORTRAIT[id], 250) : null;
  const body = [
    `    <div class="hero">${img ? `<img src="${img}" alt="${esc(ko)} 초상" width="96" height="96" loading="eager" referrerpolicy="no-referrer" onerror="this.remove()" />` : ''}
      <div><span class="tag">${esc(era)}</span><p class="lead">${esc(ko)} · ${esc(en)}<br />처음 듣는 분도 편하게 시작할 수 있도록, ${esc(sk)}의 대표곡을 들을 만한 악장까지 짚어 골랐어요.</p></div></div>`,
    `    <h2>${esc(sk)} 대표곡 ${N}곡</h2>`,
    `    <ol class="works">`,
    ...works.map(([wen, wko]) => workItem(wen, wko, null, sk)),
    `    </ol>`,
    more.length ? `    <h2>${esc(sk)}, 더 들어볼 만한 곡</h2>
    <ol class="works" start="${N + 1}" style="counter-reset:w ${N}">
${more.map(([wen, wko]) => workItem(wen, wko, null, sk)).join('\n')}
    </ol>` : '',
    CTA,
    types.length ? `    <h2>${esc(sk)}의 음악이 추천되는 그림 취향</h2>
    <ul class="chips">${types.map(t => `<li><a href="/classical/types/${t}/">${esc(TYPES[t][1])}</a></li>`).join('')}</ul>` : '',
    sameEra.length ? `    <h2>같은 시대의 작곡가</h2>
    <ul class="chips">${sameEra.map(x => `<li><a href="/classical/composers/${x}/">${esc(shortKo(x))}</a></li>`).join('')}</ul>` : '',
  ].filter(Boolean).join('\n');
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: `${ko} 대표곡 ${N}선`,
    itemListElement: works.map(([wen, wko], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'MusicComposition', name: wko, alternateName: wen, composer: { '@type': 'Person', name: en, alternateName: ko } } })),
  };
  out.push([url, page({ url, title, desc, image: img ? SITE + img.replace('/250px-', '/500px-') : null, h1: `${esc(sk)} 대표곡 ${N}선`, crumbs: [['냠냠클래식', '/?lang=ko'], ['작곡가·취향 모아보기', '/classical/'], [sk + ' 대표곡', null]], body, jsonld })]);
});

// ---------- 취향 유형 페이지 ----------
typeIds.forEach(t => {
  const T = TYPES[t], url = `/classical/types/${t}/`;
  const pool = POOLS[t];
  const composers = [...new Set(pool.map(p => p[0]))].filter(c => WORKS[c] && fullName[c]);
  const title = `${T[1]} — 이 그림 취향에 어울리는 클래식 ${pool.length}곡 | 냠냠클래식`;
  const desc = `${T[3]} ${T[5]} 그림 취향 ‘${T[1]}’에게 어울리는 클래식 ${pool.length}곡을 유튜브 연주와 함께 소개해요.`;
  const others = typeIds.filter(x => x !== t);
  const body = [
    `    <p class="lead">${esc(T[3])}<br />${esc(T[5])}</p>`,
    fs.existsSync(path.join(ROOT, `og/${t}-ko.png`)) ? `    <img class="typeimg" src="/og/${t}-ko.png" alt="그림 취향 유형 ‘${esc(T[1])}’ 카드" loading="eager" />` : '',
    `    <h2>‘${esc(T[1])}’에게 어울리는 클래식</h2>`,
    `    <ol class="works">`,
    ...pool.map(([cid, en, ko, , who]) => workItem(en, `${shortKo(cid)} · ${ko}`, who, shortKo(cid))),
    `    </ol>`,
    CTA,
    composers.length ? `    <h2>이 취향에 자주 추천되는 작곡가</h2>
    <ul class="chips">${composers.map(c => `<li><a href="/classical/composers/${c}/">${esc(shortKo(c))} 대표곡</a></li>`).join('')}</ul>` : '',
    `    <h2>다른 그림 취향 유형</h2>
    <ul class="chips">${others.map(x => `<li><a href="/classical/types/${x}/">${esc(TYPES[x][1])}</a></li>`).join('')}</ul>`,
  ].filter(Boolean).join('\n');
  out.push([url, page({ url, title, desc, image: `/og/${t}-ko.png`, h1: `그림 취향 유형<br />‘${esc(T[1])}’`, crumbs: [['냠냠클래식', '/?lang=ko'], ['작곡가·취향 모아보기', '/classical/'], [T[1], null]], body })]);
});

// ---------- 허브 ----------
{
  const url = '/classical/';
  const byEra = Object.keys(ERA_KO).map(era => [era, composerIds.filter(id => eraOf[id] === era)]).filter(([, l]) => l.length);
  const body = [
    `    <p class="lead">냠냠클래식은 음악을 듣기 전에 그림을 먼저 골라, 오늘의 취향에 맞는 클래식을 추천해 주는 서비스예요. 여기서는 작곡가별 대표곡과 그림 취향 유형별 추천곡을 한눈에 볼 수 있어요.</p>`,
    SHARE,
    ...byEra.map(([era, ids]) => `    <h2>${esc(ERA_KO[era])} 작곡가 대표곡</h2>
    <ul class="chips">${ids.map(id => `<li><a class="has-face" href="/classical/composers/${id}/">${face(id)}${esc(shortKo(id))} 대표곡</a></li>`).join('')}</ul>`),
    `    <h2>그림 취향 유형별 추천 클래식</h2>`,
    `    <ul class="grid">${typeIds.map(t => `<li><a href="/classical/types/${t}/"><b>${esc(TYPES[t][1])}</b><span>${esc(TYPES[t][3])}</span></a></li>`).join('')}</ul>`,
    CTA,
  ].join('\n');
  out.push([url, page({ url, title: '작곡가별 대표곡 · 그림 취향별 추천 클래식 모아보기 | 냠냠클래식', desc: `바흐부터 푸치니까지 작곡가 ${composerIds.length}명의 대표곡과, 그림 취향 유형 ${typeIds.length}가지에 어울리는 클래식을 모았어요.`, image: '/og/match-ko.png', h1: '작곡가별 대표곡<br />그림 취향별 추천 클래식', crumbs: [['냠냠클래식', '/?lang=ko'], ['작곡가·취향 모아보기', null]], body })]);
}

// ---------- 쓰기 ----------
fs.rmSync(path.join(ROOT, 'classical'), { recursive: true, force: true });
out.forEach(([url, html]) => {
  const dir = path.join(ROOT, url);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
});

const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);   // KST
const urls = ['/'].concat(out.map(([u]) => u));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(ROOT, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /test.html\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`composers: ${composerIds.length}, types: ${typeIds.length}, pages: ${out.length}, sitemap urls: ${urls.length}`);
