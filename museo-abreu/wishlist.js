// Collector wishlist: a ♡ on artworks (cards and the artwork window) and auction pieces (cards and the
// piece's page) saves them to "My saved works" in Account. The list stays on the device; the app also
// sends it, under a random device id and nothing else, to api/wish.js, so the dashboard can show how
// many people saved each work ("Most wanted"). From the list, a guest can ask the museum on WhatsApp.

Object.assign(I18N.es, {
  wsSaveT: 'Guardar «{title}» en mi lista', wsSavedT: '«{title}» está en mi lista', wsSave: 'Guardar', wsSaved: 'Guardada',
  wsAdded: 'Guardada en su lista (Cuenta)', wsRemoved: 'Quitada de su lista',
  wsTitle: 'Mis obras guardadas', wsEmpty: 'Toque ♡ en una obra o en una pieza de la subasta para guardarla aquí.',
  wsAsk: 'Preguntar al museo por estas obras', wsWa: 'Hola, me interesan estas obras de Oscar Abreu: {list}.',
  wsAuction: 'Subasta', wsRemove: 'Quitar', wsRemoveT: 'Quitar «{title}»', wsSeeWorks: 'Ver obras', wsSeeAuction: 'Ver la subasta',
  wsPrivacy: 'La lista se guarda en este teléfono. El museo solo ve cuántas personas guardaron cada obra, nunca quién.',
  inWanted: 'Obras más deseadas', inPeople: '{n} personas', inPerson1: '1 persona',
  inWantedHelp: 'Cuántas personas guardaron cada obra con ♡ en la app (sin saber quiénes).',
});
Object.assign(I18N.en, {
  wsSaveT: 'Save “{title}” to my list', wsSavedT: '“{title}” is in my list', wsSave: 'Save', wsSaved: 'Saved',
  wsAdded: 'Saved to your list (Account)', wsRemoved: 'Removed from your list',
  wsTitle: 'My saved works', wsEmpty: 'Tap ♡ on an artwork or an auction piece to save it here.',
  wsAsk: 'Ask the museum about these works', wsWa: 'Hello, I am interested in these works by Oscar Abreu: {list}.',
  wsAuction: 'Auction', wsRemove: 'Remove', wsRemoveT: 'Remove “{title}”', wsSeeWorks: 'See the works', wsSeeAuction: 'See the auction',
  wsPrivacy: 'Your list stays on this phone. The museum only sees how many people saved each work, never who.',
  inWanted: 'Most wanted works', inPeople: '{n} people', inPerson1: '1 person',
  inWantedHelp: 'How many people saved each work with ♡ in the app (without knowing who).',
});
Object.assign(I18N.fr, {
  wsSaveT: 'Enregistrer « {title} » dans ma liste', wsSavedT: '« {title} » est dans ma liste', wsSave: 'Enregistrer', wsSaved: 'Enregistrée',
  wsAdded: 'Enregistrée dans votre liste (Compte)', wsRemoved: 'Retirée de votre liste',
  wsTitle: 'Mes œuvres enregistrées', wsEmpty: 'Touchez ♡ sur une œuvre ou une pièce de la vente pour l’enregistrer ici.',
  wsAsk: 'Interroger le musée sur ces œuvres', wsWa: 'Bonjour, ces œuvres d’Oscar Abreu m’intéressent : {list}.',
  wsAuction: 'Vente aux enchères', wsRemove: 'Retirer', wsRemoveT: 'Retirer « {title} »', wsSeeWorks: 'Voir les œuvres', wsSeeAuction: 'Voir la vente',
  wsPrivacy: 'La liste reste sur ce téléphone. Le musée voit seulement combien de personnes ont enregistré chaque œuvre, jamais qui.',
  inWanted: 'Œuvres les plus désirées', inPeople: '{n} personnes', inPerson1: '1 personne',
  inWantedHelp: 'Combien de personnes ont enregistré chaque œuvre avec ♡ dans l’app (sans savoir qui).',
});

// Items are "w:<work id>" (artworks) and "l:<lot id>" (auction pieces).
const wsList = () => { try { return JSON.parse(localStorage.getItem('ma.wish') || '[]'); } catch (e) { return []; } };
function wsDevice() {
  try {
    let id = localStorage.getItem('ma.device');
    if (!id) { id = [...crypto.getRandomValues(new Uint8Array(16))].map(b => b.toString(16).padStart(2, '0')).join(''); localStorage.setItem('ma.device', id); }
    return id;
  } catch (e) { return ''; }
}
function wsInfo(key) {
  const [kind, id] = [key.slice(0, 1), key.slice(2)];
  if (kind === 'w') { const w = findWork(id); return w && { title: L(w.title), thumb: workImg(w), open: `<button type="button" class="ws-open" data-action="work" data-id="${w.id}">` }; }
  const lot = AUCTION.lots.find(l => l.id === id);
  return lot && { title: lotTitle(lot), thumb: `<img src="${lot.img}" alt="" loading="lazy">`, open: `<a class="ws-open" href="#/subasta/${lot.id}">`, lot: true };
}
let wsTimer;
function wsSet(list) {
  try { localStorage.setItem('ma.wish', JSON.stringify(list)); } catch (e) {}
  // Sent a moment later, so several taps make one request.
  clearTimeout(wsTimer);
  wsTimer = setTimeout(() => { const device = wsDevice(); if (device) fetch('/api/wish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ device, items: wsList() }) }).catch(() => {}); }, 800);
}

// The heart: round over a card, or a labelled button (big = true) on a page or in the artwork window.
function wsHeart(key, big) {
  const info = wsInfo(key); if (!info) return '';
  const on = wsList().includes(key);
  return `<button type="button" class="${big ? 'btn wish-btn' : 'wish'}${on ? ' on' : ''}" data-wish="${key}" aria-pressed="${on}"
    aria-label="${esc(t(on ? 'wsSavedT' : 'wsSaveT', { title: info.title }))}">${big ? `<span aria-hidden="true">${on ? '♥' : '♡'}</span> ${t(on ? 'wsSaved' : 'wsSave')}` : `<span aria-hidden="true">${on ? '♥' : '♡'}</span>`}</button>`;
}
function wsToggle(key) {
  const list = wsList(), on = !list.includes(key);
  wsSet(on ? [...list, key] : list.filter(k => k !== key));
  if (on && typeof trackEvent === 'function') trackEvent('Wishlist', { item: key });
  // Update every heart for this item in place (no page redraw, so the scroll position stays).
  document.querySelectorAll(`[data-wish="${key}"]`).forEach(b => { const n = document.createElement('div'); n.innerHTML = wsHeart(key, b.classList.contains('wish-btn')); b.replaceWith(n.firstElementChild); });
  toast(t(on ? 'wsAdded' : 'wsRemoved'));
  if (location.hash.startsWith('#/cuenta') && !on) route();
}
// Hearts sit in the page and in the artwork window (outside <main>), so one listener on the document.
document.addEventListener('click', e => { const b = e.target.closest('[data-wish]'); if (b) { e.preventDefault(); e.stopPropagation(); wsToggle(b.dataset.wish); } }, true);

// "My saved works" in Account.
function wsSection() {
  const items = wsList().map(k => [k, wsInfo(k)]).filter(([, i]) => i);
  const wa = items.length && whatsappLink(t('wsWa', { list: items.map(([, i]) => i.title).join(', ') }));
  return `<section class="section" id="saved"><h2>${t('wsTitle')}</h2>
    ${items.length ? `<ul class="ws-list">${items.map(([k, i]) => `<li>${i.open}<span class="ws-thumb">${i.thumb}</span><span>${esc(i.title)}${i.lot ? `<br><small class="muted">${t('wsAuction')}</small>` : ''}</span>${i.open.startsWith('<a') ? '</a>' : '</button>'}
        <button type="button" class="btn small" data-wish="${k}" aria-label="${esc(t('wsRemoveT', { title: i.title }))}">${t('wsRemove')}</button></li>`).join('')}</ul>
      ${wa ? `<div class="btn-row"><a class="btn wa" href="${wa}" target="_blank" rel="noopener">${t('wsAsk')}</a></div>` : ''}`
    : `<p class="empty">${t('wsEmpty')}</p><div class="btn-row"><a class="btn small" href="#/artista">${t('wsSeeWorks')}</a><a class="btn small" href="#/subasta">${t('wsSeeAuction')}</a></div>`}
    <p class="muted ad-help">${t('wsPrivacy')}</p></section>`;
}

// workCard and openWork are defined in app.js, which loads last, so they are wrapped from its hook.
(window.APP_HOOKS ||= []).push(() => {
  // Artwork cards: the heart sits over the image (a card is a button, so the heart is beside it, not inside).
  const card = workCard;
  workCard = w => `<div class="work-wrap">${card(w)}${wsHeart('w:' + w.id)}</div>`;
  // The artwork window gets a "Save" button next to its other buttons.
  const open = openWork;
  openWork = id => {
    open(id);
    const row = [...document.querySelectorAll('dialog .dlg-body .btn-row')].pop();
    if (row) row.insertAdjacentHTML('afterbegin', wsHeart('w:' + id, true));
  };
});
{
  // Auction cards and pages.
  const lc = lotCard;
  lotCard = (lot, h) => lc(lot, h).replace('<article class="lot-card">', `<article class="lot-card">${wsHeart('l:' + lot.id)}`);
  const auction = pageAuction;
  pageAuction = id => {
    const html = auction(id), btn = `<button class="btn" data-action="lotShare" data-lot="${id}">`;
    return id && AUCTION.lots.some(l => l.id === id) ? html.replace(btn, wsHeart('l:' + id, true) + btn) : html;
  };
  EXTRA_ROUTES.subasta = pageAuction;
  const acc = accountExtras;
  accountExtras = () => wsSection() + acc();
}

// Dashboard › Overview: "Most wanted works", from the counts api/admin.js adds (wishes: { item: people }).
{
  const ins = insightsHTML;
  insightsHTML = d => {
    const html = ins(d), rows = Object.entries(d.wishes || {}).map(([k, n]) => [wsInfo(k), n]).filter(([i]) => i).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const top = Math.max(1, ...rows.map(([, n]) => n));
    const block = `<h3>${t('inWanted')}</h3><p class="muted ad-help">${t('inWantedHelp')}</p>
      ${rows.length ? `<ul class="in-bars">${rows.map(([i, n]) => inBar(esc(i.title) + (i.lot ? ` <small class="muted">· ${t('wsAuction')}</small>` : ''), n === 1 ? t('inPerson1') : t('inPeople', { n }), n / top, `${i.title}: ${n}`)).join('')}</ul>` : `<p class="muted">${t('adNone')}</p>`}`;
    const at = html.lastIndexOf('</section>');
    return html.slice(0, at) + block + html.slice(at);
  };
}
