// 냠냠클래식 · 어디서 들어도 내 방에 남게 (2026-11)
// 1) 곡을 재생하면 미니룸 LP장(nyamnyam-room-lib-v1)에 LP로 꽂아 둔다. 방(assets/room.html)과 같은 id 규칙.
// 2) 들은 시간을 하루 단위로 적어 둔다(yc-listen-v1). 방의 '자라는 화분'이 이 시간도 같이 쳐 준다.
// 회원가입이 없으니 모두 이 기기(localStorage)에만 남는다.
(function () {
  'use strict';
  var LIB = 'nyamnyam-room-lib-v1', LST = 'yc-listen-v1', MAX_LP = 16;
  function hashS(t) { var h = 7; Array.from(String(t)).forEach(function (c) { h = (h * 31 + c.charCodeAt(0)) >>> 0; }); return h; }
  function dayKey() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function read(k, def) { try { var v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? def : v; } catch (e) { return def; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }

  // r = { cid, en, title, cn, who, yt } → 새로 꽂혔으면 true
  function addLP(r) {
    if (!r || !r.en || !r.yt) return false;
    var id = 'r' + hashS(r.en).toString(36);
    var lib = read(LIB, []); if (!Array.isArray(lib)) lib = [];
    var had = lib.some(function (l) { return l && (l.id === id || (Array.isArray(l.yt) && l.yt.indexOf(r.yt) >= 0)); });
    if (had) return false;
    lib.unshift({ id: id, comp: r.cid || '', cn: r.cn || '', title: r.title || r.en, who: r.who || '', era: '', yt: [r.yt] });
    return write(LIB, lib.slice(0, MAX_LP));
  }

  // 재생 중 5초마다 부른다. 최근 14일만 남긴다.
  function addListen(sec) {
    var m = read(LST, {}); if (!m || typeof m !== 'object' || Array.isArray(m)) m = {};
    var k = dayKey(); m[k] = (m[k] | 0) + (sec | 0);
    var keys = Object.keys(m); if (keys.length > 14) keys.slice(0, keys.length - 14).forEach(function (x) { delete m[x]; });
    write(LST, m);
  }

  // YouTube 플레이어가 재생 중일 때만 시간을 센다 (화면이 꺼져 있어도 소리가 나면 센다)
  var watch = null;
  function track(player) {
    clearInterval(watch);
    if (!player) return;
    watch = setInterval(function () {
      try { if (player.getPlayerState && player.getPlayerState() === 1) addListen(5); } catch (e) { clearInterval(watch); }
    }, 5000);
  }

  // 짧은 안내 (곡이 처음 LP장에 꽂힐 때 한 번)
  var tt = null;
  function toast(msg) {
    var t = document.getElementById('yc-lp-toast');
    if (!t) {
      t = document.createElement('div'); t.id = 'yc-lp-toast'; t.setAttribute('role', 'status');
      t.style.cssText = 'position:fixed;left:50%;bottom:calc(88px + env(safe-area-inset-bottom));transform:translateX(-50%) translateY(10px);z-index:9999;background:#2A1A1E;color:#FBF5E6;font-size:15px;font-weight:600;padding:10px 18px;border-radius:999px;box-shadow:0 4px 16px rgba(0,0,0,.25);opacity:0;transition:opacity .25s,transform .25s;pointer-events:none;max-width:calc(100vw - 32px);text-align:center';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(tt); tt = setTimeout(function () { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(10px)'; }, 2600);
  }

  window.ycLP = { add: addLP, listen: addListen, track: track, toast: toast };
})();
