// The app's three money sections: Auction (#/subasta), Shop (#/tienda) and the events already in
// features.js. The bottom menu is Home · Events · Auction · Shop · Account.
//
// Auction: online bidding through api/auction.js until each lot's close, then the auction ends
// live in the room (AUCTION.live, auction-config.js). Shop: the printed and digital Ecce Homo.

Object.assign(I18N.es, {
  navAuction: 'Subasta', navShop: 'Tienda',
  auEyebrow: 'Subasta · Museo Abreu', auTitle: 'Subasta de obras de Oscar Abreu',
  auLead: 'Pinturas y esculturas en subasta. Puje en línea hasta el cierre; la subasta termina en vivo en la {event}.',
  auExampleNote: 'Obras de ejemplo: el museo publicará los lotes reales, sus precios de salida y la fecha de cierre.',
  auExample: 'Ejemplo', auLot: 'Lote {n}', auPainting: 'Pintura', auSculpture: 'Escultura', auSculptureN: 'Escultura n.º {n}',
  auStart: 'Precio de salida', auCurrent: 'Puja actual', auBidsN: '{n} pujas', auBid1: '1 puja', auNoBids: 'Sin pujas todavía', auTba: 'Por anunciar',
  auClosesIn: 'Cierra {time}', auClosesOn: 'Puja en línea hasta el {date}',
  auClosed: 'Puja en línea cerrada. La puja más alta pasa a la sala.', auLiveAt: 'Final en vivo: {event}, {date}',
  auView: 'Ver lote', auYourBid: 'Su puja (USD)', auMin: 'Mínimo {amount}', auBidBtn: 'Pujar',
  auTerms: 'Entiendo que mi puja es un compromiso de compra si resulta ganadora. El museo me contactará para confirmar.',
  auThanks: 'Puja registrada: {amount}. Usted es el mejor postor.', auTooLow: 'Otra persona pujó más. La puja mínima ahora es {amount}.',
  auErr: 'No se pudo registrar la puja. Inténtelo de nuevo.', auAccept: 'Marque la casilla para confirmar su puja.',
  auNotOpen: 'La puja en línea abrirá cuando el museo publique el precio de salida y la fecha de cierre.',
  auInterest: 'Avisarme cuando abra', waAuInterest: 'Hola, me interesa el {lot} de la subasta: {title}.',
  auHistory: 'Pujas', auWinner: 'El museo contacta al ganador para el pago y la entrega.', auBack: 'Todos los lotes',
  auLiveOff: 'Las pujas en vivo no están disponibles ahora.',
  shTitle: 'Tienda', shLead: 'El libro Ecce Homo, impreso y digital, y las obras en subasta.',
  shBook: 'El libro', shPrint: 'Libro impreso', shPrintSub: 'Edición en español · Ediciones ARTFORO',
  shPrintNote: 'Recogida en el museo o envío; el museo confirma el precio y la entrega.',
  shDigital: 'Edición digital', shDigitalNote: 'Para leer en esta app.', shOrder: 'Pedir',
  shAuctionTitle: 'En subasta', shAllLots: 'Ver la subasta',
});
Object.assign(I18N.en, {
  navAuction: 'Auction', navShop: 'Shop',
  auEyebrow: 'Auction · Museo Abreu', auTitle: 'Auction of works by Oscar Abreu',
  auLead: 'Paintings and sculptures at auction. Bid online until the close; the auction ends live at the {event}.',
  auExampleNote: 'Example lots: the museum will publish the real lots, their starting bids and the closing date.',
  auExample: 'Example', auLot: 'Lot {n}', auPainting: 'Painting', auSculpture: 'Sculpture', auSculptureN: 'Sculpture no. {n}',
  auStart: 'Starting bid', auCurrent: 'Current bid', auBidsN: '{n} bids', auBid1: '1 bid', auNoBids: 'No bids yet', auTba: 'To be announced',
  auClosesIn: 'Closes {time}', auClosesOn: 'Online bidding until {date}',
  auClosed: 'Online bidding closed. The highest bid carries into the room.', auLiveAt: 'Live finale: {event}, {date}',
  auView: 'View lot', auYourBid: 'Your bid (USD)', auMin: 'Minimum {amount}', auBidBtn: 'Place bid',
  auTerms: 'I understand my bid is a commitment to buy if it wins. The museum will contact me to confirm.',
  auThanks: 'Bid placed: {amount}. You are the highest bidder.', auTooLow: 'Someone bid higher. The minimum bid is now {amount}.',
  auErr: 'Your bid could not be placed. Please try again.', auAccept: 'Tick the box to confirm your bid.',
  auNotOpen: 'Online bidding opens when the museum publishes the starting bid and closing date.',
  auInterest: 'Notify me when it opens', waAuInterest: 'Hello, I am interested in auction {lot}: {title}.',
  auHistory: 'Bids', auWinner: 'The museum contacts the winner to arrange payment and delivery.', auBack: 'All lots',
  auLiveOff: 'Live bids are unavailable right now.',
  shTitle: 'Shop', shLead: 'The book Ecce Homo, in print and digital, and the works at auction.',
  shBook: 'The book', shPrint: 'Printed book', shPrintSub: 'Spanish edition · Ediciones ARTFORO',
  shPrintNote: 'Pick up at the museum or have it shipped; the museum confirms price and delivery.',
  shDigital: 'Digital edition', shDigitalNote: 'To read in this app.', shOrder: 'Order',
  shAuctionTitle: 'At auction', shAllLots: 'See the auction',
});
Object.assign(I18N.fr, {
  navAuction: 'Enchères', navShop: 'Boutique',
  auEyebrow: 'Enchères · Museo Abreu', auTitle: 'Vente aux enchères d’œuvres d’Oscar Abreu',
  auLead: 'Peintures et sculptures aux enchères. Enchérissez en ligne jusqu’à la clôture ; la vente se termine en direct lors du {event}.',
  auExampleNote: 'Lots d’exemple : le musée publiera les lots réels, leurs mises à prix et la date de clôture.',
  auExample: 'Exemple', auLot: 'Lot {n}', auPainting: 'Peinture', auSculpture: 'Sculpture', auSculptureN: 'Sculpture n° {n}',
  auStart: 'Mise à prix', auCurrent: 'Enchère actuelle', auBidsN: '{n} enchères', auBid1: '1 enchère', auNoBids: 'Aucune enchère pour l’instant', auTba: 'À annoncer',
  auClosesIn: 'Clôture {time}', auClosesOn: 'Enchères en ligne jusqu’au {date}',
  auClosed: 'Enchères en ligne closes. L’enchère la plus haute est reprise en salle.', auLiveAt: 'Finale en direct : {event}, {date}',
  auView: 'Voir le lot', auYourBid: 'Votre enchère (USD)', auMin: 'Minimum {amount}', auBidBtn: 'Enchérir',
  auTerms: 'Je comprends que mon enchère est un engagement d’achat si elle l’emporte. Le musée me contactera pour confirmer.',
  auThanks: 'Enchère enregistrée : {amount}. Vous êtes le meilleur enchérisseur.', auTooLow: 'Quelqu’un a enchéri plus haut. L’enchère minimale est maintenant de {amount}.',
  auErr: 'Votre enchère n’a pas pu être enregistrée. Réessayez.', auAccept: 'Cochez la case pour confirmer votre enchère.',
  auNotOpen: 'Les enchères en ligne ouvriront quand le musée publiera la mise à prix et la date de clôture.',
  auInterest: 'Me prévenir à l’ouverture', waAuInterest: 'Bonjour, le {lot} de la vente m’intéresse : {title}.',
  auHistory: 'Enchères', auWinner: 'Le musée contacte le gagnant pour le paiement et la livraison.', auBack: 'Tous les lots',
  auLiveOff: 'Les enchères en direct sont indisponibles pour le moment.',
  shTitle: 'Boutique', shLead: 'Le livre Ecce Homo, imprimé et numérique, et les œuvres aux enchères.',
  shBook: 'Le livre', shPrint: 'Livre imprimé', shPrintSub: 'Édition espagnole · Ediciones ARTFORO',
  shPrintNote: 'Retrait au musée ou envoi ; le musée confirme le prix et la livraison.',
  shDigital: 'Édition numérique', shDigitalNote: 'À lire dans cette app.', shOrder: 'Commander',
  shAuctionTitle: 'Aux enchères', shAllLots: 'Voir la vente',
});

// The printed Ecce Homo (Spanish and French editions, both printed by Amigo del Hogar per their
// credits pages). Prices pending: until set, orders go to WhatsApp with "Price confirmed by the
// museum". Whop keys: book-print-es, book-print-fr.
const PRINT_EDITIONS = [
  { lang: 'es', price: null, key: 'book-print-es', name: { es: 'Edición en español', en: 'Spanish edition', fr: 'Édition espagnole' } },
  { lang: 'fr', price: null, key: 'book-print-fr', name: { es: 'Edición en francés', en: 'French edition', fr: 'Édition française' } },
];
const printSub = p => L(p.name) + ' · Ediciones ARTFORO';

/* ---------- Auction ---------- */

const auUSD = n => 'USD ' + money(Number(n));
let auState = null, auFailed = false, auTimer = null;

function lotTitle(lot) {
  const w = lot.work && workById(lot.work);
  return w ? L(w.title) : t('auSculptureN', { n: lot.n });
}
const lotNumber = lot => AUCTION.lots.indexOf(lot) + 1;
const lotKind = lot => t(lot.kind === 'sculpture' ? 'auSculpture' : 'auPainting');
function liveFinale() {
  const gb = EVENTS.find(e => e.id === AUCTION.live.event), tier = gb.tiers.find(x => x.id === AUCTION.live.tier);
  return { name: `${L(tier.name)} · ${eventTitle(gb)}`, date: addDays(eventDate(gb), tier.day), time: tier.time };
}
function relTime(iso) {
  const ms = Date.parse(iso) - Date.now(), rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  const d = ms / 864e5, h = ms / 36e5;
  return Math.abs(d) >= 1 ? rtf.format(Math.round(d), 'day') : Math.abs(h) >= 1 ? rtf.format(Math.round(h), 'hour') : rtf.format(Math.round(ms / 6e4), 'minute');
}
const dateTime = iso => fmtDate(iso.slice(0, 10), { day: 'numeric', month: 'long' }) + ' · ' + new Date(iso).toLocaleTimeString(lang, { hour: 'numeric', minute: '2-digit', timeZone: 'America/Santo_Domingo' });

async function fetchAuction() {
  try {
    const r = await fetch('/api/auction', { cache: 'no-store' });
    if (!r.ok) throw new Error(r.status);
    auState = (await r.json()).lots; auFailed = false;
  } catch (e) { auFailed = true; }
}
// Refreshes the bids every 20 s while an auction page is open and nobody is typing in the form.
function auPoll() {
  clearInterval(auTimer);
  if (!location.hash.startsWith('#/subasta') || !AUCTION.lots.some(l => lotOpen(l))) return;
  auTimer = setInterval(async () => {
    if (!location.hash.startsWith('#/subasta')) return clearInterval(auTimer);
    await fetchAuction();
    if (!document.activeElement || !document.activeElement.closest('form')) route();
  }, 20000);
}

function lotPriceLine(lot) {
  const s = auState && auState[lot.id];
  if (s && s.count) return `<span class="lot-price"><small>${t('auCurrent')}</small>${auUSD(s.high)}</span><span class="muted">${s.count === 1 ? t('auBid1') : t('auBidsN', { n: s.count })}</span>`;
  return `<span class="lot-price"><small>${t('auStart')}</small>${lot.startBid != null ? auUSD(lot.startBid) : t('auTba')}</span>${lot.startBid != null ? `<span class="muted">${t('auNoBids')}</span>` : ''}`;
}
function lotCloseLine(lot) {
  const c = lotCloses(lot);
  if (!c) return '';
  return lotOpen(lot) ? `<p class="lot-close">${t('auClosesIn', { time: relTime(c) })} · ${t('auClosesOn', { date: dateTime(c) })}</p>` : `<p class="lot-close">${t('auClosed')}</p>`;
}
function lotCard(lot, h = 'h3') {
  return `<article class="lot-card">
    <a href="#/subasta/${lot.id}" class="lot-img" tabindex="-1" aria-hidden="true"><img src="${lot.img}" alt="" loading="lazy" width="600" height="600"></a>
    <p class="lot-meta">${t('auLot', { n: lotNumber(lot) })} · ${lotKind(lot)}${lot.example ? ` · <span class="chip">${t('auExample')}</span>` : ''}</p>
    <${h} class="lot-title"><a href="#/subasta/${lot.id}">${esc(lotTitle(lot))}</a></${h}>
    <p class="lot-state">${lotPriceLine(lot)}</p>
    ${lotCloseLine(lot)}
    <a class="buy-now" href="#/subasta/${lot.id}">${t('auView')} <span class="arr" aria-hidden="true">›</span></a>
  </article>`;
}

function pageAuction(id) {
  if (!auState && !auFailed) fetchAuction().then(() => { if (location.hash.startsWith('#/subasta')) route(); });
  setTimeout(auPoll, 0);
  const fin = liveFinale();
  const lot = id && AUCTION.lots.find(l => l.id === id);
  if (lot) return pageLot(lot, fin);
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('auEyebrow')}</p><h1>${t('auTitle')}</h1>
      <p class="lead" style="margin-top:.8rem">${t('auLead', { event: esc(fin.name) })}</p>
      <p class="lot-live">${t('auLiveAt', { event: esc(fin.name), date: fmtDate(fin.date) + ' · ' + rsvpTime(fin.time) })}</p>
      ${AUCTION.lots.some(l => l.example) ? `<p class="muted" style="margin-top:.5rem">${t('auExampleNote')}</p>` : ''}
      ${auFailed && AUCTION.lots.some(l => lotOpen(l)) ? `<p class="status">${t('auLiveOff')}</p>` : ''}
    </section>
    <section class="section"><div class="lots">${AUCTION.lots.map(l => lotCard(l, 'h2')).join('')}</div></section>
  </div>`;
}

function pageLot(lot, fin) {
  const w = lot.work && workById(lot.work), s = (auState && auState[lot.id]) || { count: 0, last: [] };
  const spec = w && w.spec ? L(w.spec).join(' · ') : '';
  const open = lotOpen(lot), min = open ? lotMinBid(lot, s) : null;
  const action = open ? `<form class="bid-form" data-form="bid" data-lot="${lot.id}" novalidate>
      <div class="field"><label for="bid-amount">${t('auYourBid')}</label>
        <input id="bid-amount" type="number" inputmode="numeric" min="${min}" step="${AUCTION.increment}" value="${min}" required>
        <small class="muted">${t('auMin', { amount: auUSD(min) })}</small></div>
      <div class="grid two">
        <div class="field"><label for="bid-name">${t('name')}</label><input id="bid-name" required autocomplete="name" value="${esc(profile.name || '')}"></div>
        <div class="field"><label for="bid-email">${t('email')}</label><input id="bid-email" type="email" required autocomplete="email" value="${esc(profile.email || '')}"></div>
      </div>
      <div class="field"><label for="bid-phone">${t('phone')}</label><input id="bid-phone" type="tel" required autocomplete="tel" value="${esc(profile.phone || '')}"></div>
      <label class="bid-accept"><input type="checkbox" id="bid-accept"> <span>${t('auTerms')}</span></label>
      <p class="status" id="bid-status" role="status" aria-live="polite" hidden></p>
      <button class="btn primary co-pay" type="submit">${t('auBidBtn')}</button>
    </form>`
    : lotCloses(lot) && lot.startBid != null ? '' // closed online: carries into the room
    : `<p class="muted">${t('auNotOpen')}</p>
       <button class="btn" data-action="lotInterest" data-lot="${lot.id}">${t('auInterest')}</button>`;
  return `<div class="wrap lot-page">
    <a href="#/subasta" class="btn small"><span class="arr">←</span> ${t('auBack')}</a>
    <section class="section lot-detail">
      <figure class="lot-figure"><img src="${lot.img}" alt="${esc(lotTitle(lot))}" width="1400" height="1400"><figcaption>Oscar Abreu · ${esc(lotTitle(lot))}</figcaption></figure>
      <div class="lot-info">
        <p class="lot-meta">${t('auLot', { n: lotNumber(lot) })} · ${lotKind(lot)}${lot.example ? ` · <span class="chip">${t('auExample')}</span>` : ''}</p>
        <h1 class="lot-h1">${esc(lotTitle(lot))}</h1>
        ${spec ? `<p class="muted">${esc(spec)}</p>` : ''}
        <p class="lot-state big">${lotPriceLine(lot)}</p>
        ${lotCloseLine(lot)}
        <p class="lot-live">${t('auLiveAt', { event: esc(fin.name), date: fmtDate(fin.date) + ' · ' + rsvpTime(fin.time) })}</p>
        ${action}
        ${s.last && s.last.length ? `<h2 class="h3" style="margin-top:1.4rem">${t('auHistory')}</h2>
          <ol class="bid-list">${s.last.map(b => `<li><strong>${auUSD(b.amount)}</strong> <span class="muted">${esc(b.who || '')} · ${dateTime(b.at)}</span></li>`).join('')}</ol>` : ''}
        <p class="muted" style="margin-top:1rem">${t('auWinner')}</p>
      </div>
    </section>
  </div>`;
}

EXTRA_FORMS.bid = async form => {
  const lot = AUCTION.lots.find(l => l.id === form.dataset.lot);
  const out = $('#bid-status', form), btn = form.querySelector('button[type=submit]');
  const say = (msg, ok) => { out.textContent = msg; out.hidden = false; out.classList.toggle('ok', !!ok); };
  const amt = $('#bid-amount', form);
  if (!amt.checkValidity()) { amt.focus(); return say(t('auMin', { amount: auUSD(amt.min) })); }
  const bad = ['bid-name', 'bid-email', 'bid-phone'].find(id => !document.getElementById(id).checkValidity());
  if (bad) { document.getElementById(bad).focus(); return say(document.getElementById(bad).validationMessage); }
  if (!$('#bid-accept', form).checked) { $('#bid-accept', form).focus(); return say(t('auAccept')); }
  const v = id => document.getElementById(id).value.trim();
  profile.name = v('bid-name'); profile.email = v('bid-email'); profile.phone = v('bid-phone'); save();
  btn.disabled = true;
  try {
    const r = await fetch('/api/auction', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lot: lot.id, amount: Number(v('bid-amount')), name: profile.name, email: profile.email, phone: profile.phone, accept: true }) });
    const data = await r.json().catch(() => ({}));
    if (r.ok) {
      auState = { ...(auState || {}), [lot.id]: data };
      if (typeof trackEvent === 'function') trackEvent('Bid', { lot: lot.id });
      route();
      const s = $('#bid-status'); if (s) { s.textContent = t('auThanks', { amount: auUSD(data.high) }); s.hidden = false; s.classList.add('ok'); }
      return;
    }
    if (data.error === 'low') {
      auState = { ...(auState || {}), [lot.id]: data };
      const input = $('#bid-amount', form); input.min = data.min; input.value = data.min;
      say(t('auTooLow', { amount: auUSD(data.min) }));
    } else say(t('auErr'));
  } catch (e) { say(t('auErr')); }
  btn.disabled = false;
};

EXTRA_ACTIONS.lotInterest = el => {
  const lot = AUCTION.lots.find(l => l.id === el.dataset.lot);
  if (!openWhatsApp(t('waAuInterest', { lot: t('auLot', { n: lotNumber(lot) }), title: lotTitle(lot) }))) toast(t('ciInterestSent'));
};

/* ---------- Shop ---------- */

function pageShop() {
  const digital = EDITIONS.filter(e => e.status === 'available' && LANG_NAMES[e.lang]);
  const price = p => p == null ? t('coPriceTbd') : auUSD(p);
  return `<div class="wrap">
    <section class="section"><p class="eyebrow">Museo Abreu</p><h1>${t('shTitle')}</h1><p class="lead" style="margin-top:.8rem">${t('shLead')}</p></section>
    <section class="section"><h2 class="tier-group">${t('shBook')}</h2>
      <div class="shop-grid">
        ${PRINT_EDITIONS.map(p => `<article class="shop-item">
          <div class="cover">${coverSVG(t('bookTitle'), t('bookSub'))}</div>
          <h3 class="pass-name">${t('shPrint')}</h3>
          <p class="muted">${printSub(p)}</p>
          <p class="pass-price">${price(p.price)}</p>
          <p class="muted">${t('shPrintNote')}</p>
          <button class="buy-now" data-action="buyPrint" data-l="${p.lang}">${t('shOrder')} <span class="arr" aria-hidden="true">›</span></button>
        </article>`).join('')}
        ${digital.map(e => `<article class="shop-item">
          <div class="cover">${coverSVG(t('bookTitle'), t('bookSub'))}</div>
          <h3 class="pass-name">${t('shDigital')}</h3>
          <p class="muted">${L(LANG_NAMES[e.lang])} · ${t('shDigitalNote')}</p>
          <p class="pass-price">${auUSD(e.price)}</p>
          <button class="buy-now" data-action="buy" data-l="${e.lang}">${t('buyNow')} <span class="arr" aria-hidden="true">›</span></button>
        </article>`).join('')}
      </div>
    </section>
    <section class="section"><h2 class="tier-group">${t('shAuctionTitle')}</h2>
      <div class="lots">${AUCTION.lots.slice(0, 3).map(l => lotCard(l)).join('')}</div>
      <div class="btn-row"><a class="btn primary" href="#/subasta">${t('shAllLots')}</a></div>
    </section>
  </div>`;
}

EXTRA_ACTIONS.buyPrint = el => {
  const p = PRINT_EDITIONS.find(x => x.lang === el.dataset.l);
  checkout({ title: 'Ecce Homo · ' + t('shPrint'), sub: printSub(p), price: p.price, qty: true, link: whopLink(p.key), provider: 'Whop' });
};

/* ---------- Home: auction and shop right after the next event ---------- */
{
  const home = homeExtras;
  homeExtras = () => {
    const html = home(), cut = html.lastIndexOf('<section class="section"><h2>');
    const strip = `<section class="section"><div class="section-head"><h2>${t('shAuctionTitle')}</h2><a class="buy-now" href="#/subasta">${t('shAllLots')} <span class="arr" aria-hidden="true">›</span></a></div>
      <div class="lots">${AUCTION.lots.slice(0, 3).map(l => lotCard(l)).join('')}</div></section>
      <section class="section"><a class="card shop-banner" href="#/tienda"><div class="cover">${coverSVG(t('bookTitle'), t('bookSub'))}</div>
        <div><p class="eyebrow">${t('shTitle')}</p><h3>${t('bookTitle')}</h3><p class="muted">${t('shLead')}</p></div></a></section>`;
    return cut > 0 ? html.slice(0, cut) + strip + html.slice(cut) : html + strip;
  };
}

Object.assign(EXTRA_ROUTES, { subasta: pageAuction, tienda: pageShop });
Object.assign(ROUTE_SECTION, { rsvp: 'eventos', gracias: 'tienda' });

// Thank-you page wording for the printed books.
{
  const info = purchaseInfo;
  purchaseInfo = key => {
    const p = PRINT_EDITIONS.find(x => x.key === key);
    return p ? { item: 'Ecce Homo · ' + t('shPrint') + ' · ' + L(p.name), text: t('shPrintNote') } : info(key);
  };
}
