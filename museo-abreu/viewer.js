// Full-screen viewing: a work alone on black, to inspect closely. Pinch, double-tap, the wheel or the + and −
// buttons zoom; a zoomed picture moves with a finger; a sideways swipe (or the arrows, or the keyboard)
// moves to the artist's next or previous work; a swipe down or Esc closes. Also: the calm motion of the
// site — pictures fade in as they arrive, and each new page rises gently into place.

let vw = null;
function vwSet(lot) {
  // The works of the same artist, in the order of their room.
  const room = typeof auArtists === 'function' && auArtists().find(a => a.name === lotArtist(lot));
  return room ? room.lots : [lot];
}
function vwShow() {
  const { list, i, dlg } = vw, lot = list[i];
  const img = dlg.querySelector('.vw-img');
  img.classList.add('vw-swap');
  img.onload = () => img.classList.remove('vw-swap');
  img.src = lot.img; img.alt = lotTitle(lot);
  if (img.complete) img.classList.remove('vw-swap');
  dlg.querySelector('.vw-cap').innerHTML = `<span class="vw-meta">${t('auLot', { n: lotNumber(lot) })}${list.length > 1 ? ` · ${t('auOfN', { i: i + 1, n: list.length })}` : ''}</span>
    <span class="vw-artist">${esc(lotArtist(lot))}</span> <i class="vw-title">${esc(lotTitle(lot))}</i>`;
  dlg.querySelectorAll('.vw-nav').forEach(b => { b.hidden = list.length < 2; });
  vwZoom(1, 0, 0);
}
function vwZoom(s, x, y) {
  vw.s = Math.max(1, Math.min(5, s)); vw.x = vw.s === 1 ? 0 : x; vw.y = vw.s === 1 ? 0 : y;
  const img = vw.dlg.querySelector('.vw-img');
  img.style.transform = `translate(${vw.x}px, ${vw.y}px) scale(${vw.s})`;
  vw.dlg.classList.toggle('vw-zoomed', vw.s > 1);
}
function vwGo(d) {
  if (!vw || vw.list.length < 2) return;
  vw.i = (vw.i + d + vw.list.length) % vw.list.length;
  vwShow();
}
EXTRA_ACTIONS.vwOpen = el => {
  const lot = AUCTION.lots.find(l => l.id === el.dataset.lot);
  if (!lot) return;
  const list = vwSet(lot), back = document.activeElement;
  const dlg = document.createElement('dialog');
  dlg.className = 'vw';
  dlg.setAttribute('aria-label', lotTitle(lot));
  dlg.innerHTML = `<div class="vw-stage"><img class="vw-img" alt="" draggable="false"></div>
    <p class="vw-cap"></p>
    <div class="vw-bar">
      <button type="button" class="vw-btn vw-nav" data-vw="prev" aria-label="${t('vwPrev')}"><span aria-hidden="true">‹</span></button>
      <button type="button" class="vw-btn" data-vw="out" aria-label="${t('vwZoomOut')}"><span aria-hidden="true">−</span></button>
      <button type="button" class="vw-btn" data-vw="in" aria-label="${t('vwZoomIn')}"><span aria-hidden="true">+</span></button>
      <button type="button" class="vw-btn vw-nav" data-vw="next" aria-label="${t('vwNext')}"><span aria-hidden="true">›</span></button>
    </div>
    <button type="button" class="vw-close" data-vw="close" aria-label="${t('vwClose')}"><span aria-hidden="true">×</span></button>
    <p class="vw-hint">${t('vwHint')}</p>`;
  document.body.appendChild(dlg);
  vw = { dlg, list, i: Math.max(0, list.indexOf(lot)), s: 1, x: 0, y: 0 };
  vwShow();
  dlg.addEventListener('click', e => {
    const b = e.target.closest('[data-vw]');
    if (!b) return;
    const a = b.dataset.vw;
    if (a === 'close') dlg.close();
    if (a === 'prev') vwGo(document.documentElement.dir === 'rtl' ? 1 : -1);
    if (a === 'next') vwGo(document.documentElement.dir === 'rtl' ? -1 : 1);
    if (a === 'in') vwZoom(vw.s * 1.6, vw.x, vw.y);
    if (a === 'out') vwZoom(vw.s / 1.6, vw.x / 1.6, vw.y / 1.6);
  });
  dlg.addEventListener('keydown', e => {
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'ArrowRight') { e.preventDefault(); vwGo(rtl ? -1 : 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); vwGo(rtl ? 1 : -1); }
    if (e.key === '+' || e.key === '=') vwZoom(vw.s * 1.6, vw.x, vw.y);
    if (e.key === '-') vwZoom(vw.s / 1.6, vw.x / 1.6, vw.y / 1.6);
  });
  // Touch and mouse: one finger pans a zoomed picture or swipes; two pinch.
  const stage = dlg.querySelector('.vw-stage'), pts = new Map();
  let start = null, pinch = null, lastTap = 0;
  stage.addEventListener('pointerdown', e => {
    stage.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) start = { x: e.clientX, y: e.clientY, ox: vw.x, oy: vw.y, t: Date.now() };
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: vw.s }; }
  });
  stage.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2 && pinch) { const [a, b] = [...pts.values()]; vwZoom(pinch.s * Math.hypot(a.x - b.x, a.y - b.y) / pinch.d, vw.x, vw.y); return; }
    if (pts.size === 1 && start && vw.s > 1) vwZoom(vw.s, start.ox + e.clientX - start.x, start.oy + e.clientY - start.y);
  });
  const up = e => {
    if (!pts.has(e.pointerId)) return;
    pts.delete(e.pointerId);
    if (pts.size) return;
    if (pinch) { pinch = null; start = null; return; }
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y, quick = Date.now() - start.t < 500;
    if (vw.s === 1 && quick && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) vwGo(dx < 0 ? 1 : -1);
    else if (vw.s === 1 && quick && dy > 90 && Math.abs(dy) > Math.abs(dx)) dlg.close();
    else if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      // A double tap zooms in where it lands, or back out.
      if (Date.now() - lastTap < 320) { const r = stage.getBoundingClientRect(), cx = e.clientX - r.left - r.width / 2, cy = e.clientY - r.top - r.height / 2;
        vw.s > 1 ? vwZoom(1, 0, 0) : vwZoom(2.5, -cx * 1.5, -cy * 1.5); lastTap = 0; }
      else lastTap = Date.now();
    }
    start = null;
  };
  stage.addEventListener('pointerup', up);
  stage.addEventListener('pointercancel', up);
  stage.addEventListener('wheel', e => { e.preventDefault(); vwZoom(vw.s * (e.deltaY < 0 ? 1.15 : 1 / 1.15), vw.x, vw.y); }, { passive: false });
  dlg.addEventListener('close', () => { dlg.remove(); vw = null; document.documentElement.classList.remove('vw-lock'); if (back && back.focus) back.focus({ preventScroll: true }); });
  document.documentElement.classList.add('vw-lock');
  dlg.showModal();
  dlg.querySelector('.vw-close').focus();
};

// Motion. A picture that is not already loaded fades in when it arrives (pictures the browser already has
// appear at once, so the auction's refresh every few seconds never flickers). A new page rises into place.
{
  const main = document.querySelector('main');
  const reduce = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fade = root => {
    if (reduce()) return;
    root.querySelectorAll('img:not(.vw-img)').forEach(img => {
      if (img.complete || img.dataset.faded) return;
      img.dataset.faded = '1';
      img.classList.add('img-wait');
      const done = () => img.classList.remove('img-wait');
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    });
  };
  if (main) new MutationObserver(() => fade(main)).observe(main, { childList: true, subtree: true });
  addEventListener('hashchange', () => {
    if (!main || reduce()) return;
    main.classList.remove('page-in'); void main.offsetWidth; main.classList.add('page-in');
  });
}
