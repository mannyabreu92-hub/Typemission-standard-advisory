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

// "See it on a wall": the work at its true size above a sofa 84 inches (213 cm) wide, hung as museums do
// (its centre at 57 inches, or higher when it would touch the sofa). The size is the one the book gives;
// which side is the width is read from the picture itself. Only flat works with a known size get the button.
function wlDims(lot) {
  if (lot.kind === 'sculpture') return null;
  const r = ((lot.spec && lot.spec.en) || '').match(/(\d+(?:\.\d+)?)\s*×\s*(\d+(?:\.\d+)?)\s*in\b/);
  if (!r || /×\s*\d+(?:\.\d+)?\s*×/.test(lot.spec.en.split('·').pop())) return null;
  const a = +r[1], b = +r[2], ratio = (lot.w || 1) / (lot.h || 1);
  // Whichever reading matches the picture's shape.
  return Math.abs(Math.log((b / a) / ratio)) < Math.abs(Math.log((a / b) / ratio)) ? { w: b, h: a } : { w: a, h: b };
}
const wlBtn = lot => wlDims(lot) ? `<button type="button" class="lot-more wl-btn" data-action="wlOpen" data-lot="${lot.id}">${t('wlBtn')}</button>` : '';
EXTRA_ACTIONS.wlOpen = el => {
  const lot = AUCTION.lots.find(l => l.id === el.dataset.lot), d = lot && wlDims(lot);
  if (!d) return;
  const back = document.activeElement;
  // The room, in inches: floor at y = H; the sofa centred; the work above it.
  const sofaW = 84, sofaH = 34, cy = Math.max(57, sofaH + 8 + d.h / 2);
  const W = Math.max(150, d.w + 56), H = Math.max(108, cy + d.h / 2 + 14), x0 = (W - d.w) / 2, y0 = H - cy - d.h / 2, sx = (W - sofaW) / 2, fy = H;
  const size = (lot.spec && L(lot.spec).split(' · ').slice(1).join(' · ')) || '';
  const svg = `<svg class="wl-room" viewBox="0 0 ${W} ${H + 6}" role="img" aria-label="${esc(t('wlTitle') + ': ' + lotTitle(lot) + ', ' + size)}">
    <rect x="0" y="0" width="${W}" height="${H}" fill="#efe8dc"/>
    <rect x="0" y="${H}" width="${W}" height="6" fill="#d9cfbf"/>
    <rect x="${x0 + .6}" y="${y0 + 1.2}" width="${d.w}" height="${d.h}" fill="rgba(22,18,15,.18)"/>
    <image href="${lot.img}" x="${x0}" y="${y0}" width="${d.w}" height="${d.h}" preserveAspectRatio="none"/>
    <g fill="#2b2622">
      <rect x="${sx + 6}" y="${fy - sofaH}" width="${sofaW - 12}" height="18" rx="2.5"/>
      <rect x="${sx + 4}" y="${fy - 19}" width="${sofaW - 8}" height="11" rx="2"/>
      <rect x="${sx}" y="${fy - 25}" width="7" height="19" rx="2.5"/>
      <rect x="${sx + sofaW - 7}" y="${fy - 25}" width="7" height="19" rx="2.5"/>
      <rect x="${sx + 5}" y="${fy - 6}" width="2" height="6"/><rect x="${sx + sofaW - 7}" y="${fy - 6}" width="2" height="6"/>
    </g></svg>`;
  const dlg = document.createElement('dialog');
  dlg.className = 'wl';
  dlg.setAttribute('aria-label', t('wlTitle') + ': ' + lotTitle(lot));
  dlg.innerHTML = `<div class="wl-body"><p class="lot-meta">${t('auLot', { n: lotNumber(lot) })} · ${t('wlTitle')}</p>
    <h2 class="wl-h"><span class="lot-artist">${esc(lotArtist(lot))}</span> <i>${esc(lotTitle(lot))}</i></h2>
    ${svg}<p class="wl-note">${esc(t('wlNote', { size }))}</p>
    <button type="button" class="vw-close wl-close" data-wl="close" aria-label="${t('vwClose')}"><span aria-hidden="true">×</span></button></div>`;
  document.body.appendChild(dlg);
  dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('[data-wl=close]')) dlg.close(); });
  dlg.addEventListener('close', () => { dlg.remove(); if (back && back.focus) back.focus({ preventScroll: true }); });
  dlg.showModal();
  dlg.querySelector('.wl-close').focus();
};
