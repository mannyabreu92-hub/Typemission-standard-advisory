// Dashboard "Overview" (#/admin): money received on Whop, sales by product and by month, each
// event's invitations, confirmations and arrivals, and the auction so far. Worked out in the browser
// from the same data as the tables below it (api/admin.js); nothing new is stored.

Object.assign(I18N.es, {
  inTitle: 'Resumen', inMoney: 'Ingresos', inSales: 'Ventas', inBooks: 'Libros vendidos', inRefunds: 'Reembolsos',
  inByProduct: 'Ventas por producto', inByMonth: 'Ingresos por mes', inEvents: 'Eventos', inAuction: 'Subasta',
  inInvited: 'Invitados', inConfirmed: 'Confirmados', inArrived: 'Llegaron', inTopBids: 'Suma de las pujas más altas',
  inBidders: 'Postores', inLotsBid: 'Obras con pujas', inOther: 'Otro', inNoAmount: 'importe no indicado',
  inSalesN: '{n} ventas', inSale1: '1 venta', inExample: 'Las obras de la subasta aún son de ejemplo.',
  inHelp: 'Cuenta los pagos confirmados por Whop; los reembolsos se restan de las ventas y de los ingresos. Las membresías y avisos de Whop sin pago no cuentan como ventas.',
});
Object.assign(I18N.en, {
  inTitle: 'Overview', inMoney: 'Money received', inSales: 'Sales', inBooks: 'Books sold', inRefunds: 'Refunds',
  inByProduct: 'Sales by product', inByMonth: 'Money received by month', inEvents: 'Events', inAuction: 'Auction',
  inInvited: 'Invited', inConfirmed: 'Confirmed', inArrived: 'Arrived', inTopBids: 'Highest bids added up',
  inBidders: 'Bidders', inLotsBid: 'Pieces with bids', inOther: 'Other', inNoAmount: 'amount not given',
  inSalesN: '{n} sales', inSale1: '1 sale', inExample: 'The auction pieces are still examples.',
  inHelp: 'Counts payments Whop confirmed; refunds are taken off the sales and the money. Membership notices and other Whop events without a payment are not counted as sales.',
});
Object.assign(I18N.fr, {
  inTitle: 'Vue d’ensemble', inMoney: 'Montant encaissé', inSales: 'Ventes', inBooks: 'Livres vendus', inRefunds: 'Remboursements',
  inByProduct: 'Ventes par produit', inByMonth: 'Montant encaissé par mois', inEvents: 'Événements', inAuction: 'Enchères',
  inInvited: 'Invités', inConfirmed: 'Confirmés', inArrived: 'Arrivés', inTopBids: 'Total des enchères les plus hautes',
  inBidders: 'Enchérisseurs', inLotsBid: 'Œuvres avec enchères', inOther: 'Autre', inNoAmount: 'montant non indiqué',
  inSalesN: '{n} ventes', inSale1: '1 vente', inExample: 'Les œuvres de la vente sont encore des exemples.',
  inHelp: 'Compte les paiements confirmés par Whop ; les remboursements sont déduits des ventes et du montant. Les avis d’adhésion et autres événements Whop sans paiement ne comptent pas comme ventes.',
});

// Whop also sends membership and "pending" events for the same purchase; only payments count.
const inIsSale = p => /payment[._]succeeded|payment[._]completed|\.paid$/i.test(p.type);
const inIsRefund = p => /refund[._]created|payment[._]refunded/i.test(p.type);

function insights(d) {
  const sales = d.purchases.filter(inIsSale), refunds = d.purchases.filter(inIsRefund);
  const sum = xs => xs.reduce((s, p) => s + (p.amount || 0), 0);
  const money = Math.max(0, sum(sales) - sum(refunds));
  // Per product, a refund takes the sale back off.
  const byProduct = {}, prod = p => (byProduct[p.product || ''] ||= { n: 0, usd: 0, noAmount: 0 });
  sales.forEach(p => { const x = prod(p); x.n++; x.usd += p.amount || 0; if (p.amount == null) x.noAmount++; });
  refunds.forEach(p => { const x = prod(p); x.n--; x.usd -= p.amount || 0; });
  for (const [k, x] of Object.entries(byProduct)) if (x.n <= 0 && x.usd <= 0) delete byProduct[k];
  // The last six months, Punta Cana time, oldest first.
  const months = [], now = new Date(todayPC() + 'T12:00:00');
  for (let i = 5; i >= 0; i--) { const m = new Date(now.getFullYear(), now.getMonth() - i, 1); months.push({ key: `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`, m, usd: 0 }); }
  const monthOf = iso => new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/Santo_Domingo' }).slice(0, 7);
  sales.forEach(p => { const m = months.find(x => x.key === monthOf(p.at)); if (m) m.usd += p.amount || 0; });
  refunds.forEach(p => { const m = months.find(x => x.key === monthOf(p.at)); if (m) m.usd -= p.amount || 0; });
  // Per event date: invitations, people confirmed, people arrived.
  const evs = {};
  const ev = (e, date) => (evs[e + ' ' + date] ||= { event: e, date, invited: 0, confirmed: 0, arrived: 0 });
  d.invites.forEach(i => { ev(i.event, i.date).invited += i.list.length; });
  d.rsvps.forEach(r => { const x = ev(r.event, r.date); if (r.att === 'yes') x.confirmed += 1 + (r.guests || 0); x.arrived += r.arrived || 0; });
  // Auction: the highest bid on each piece, and who has bid.
  const bidders = new Set();
  d.auction.forEach(l => l.bids.forEach(b => bidders.add((b.email || b.phone || b.name || '').toLowerCase())));
  const withBids = d.auction.filter(l => l.bids.length);
  return { sales, refunds, money, byProduct, months, events: Object.values(evs).sort((a, b) => b.date.localeCompare(a.date)),
    topBids: withBids.reduce((s, l) => s + Math.max(...l.bids.map(b => b.amount)), 0), bidders: bidders.size, lotsBid: withBids.length,
    lots: d.auction.length, example: d.auction.length > 0 && d.auction.every(l => l.example),
    net: Math.max(0, sales.length - refunds.length),
    books: Math.max(0, sales.filter(p => /^book-/.test(p.product)).length - refunds.filter(p => /^book-/.test(p.product)).length) };
}

// A horizontal bar with its label and value written out, so nothing depends on reading the bar.
const inBar = (label, value, frac, tip) => `<li class="in-bar" title="${esc(tip || label + ': ' + value)}">
    <span class="in-label">${label}</span><span class="in-track"><span class="in-fill" style="width:${Math.max(frac > 0 ? 2 : 0, Math.round(frac * 100))}%"></span></span>
    <span class="in-value">${value}</span></li>`;
const inSalesN = n => n === 1 ? t('inSale1') : t('inSalesN', { n });

function insightsHTML(d) {
  const x = insights(d);
  const prods = Object.entries(x.byProduct).sort((a, b) => b[1].usd - a[1].usd || b[1].n - a[1].n);
  // Bars follow the money; while Whop gives no amounts, they follow the number of sales.
  const byUsd = prods.some(([, p]) => p.usd > 0), top = Math.max(1, ...prods.map(([, p]) => byUsd ? p.usd : p.n));
  const byProduct = prods.length ? `<ul class="in-bars">${prods.map(([k, p]) => {
    const name = esc(k ? adProductName(k) : t('inOther'));
    const value = `${p.usd ? auUSD(p.usd) : '—'} · ${inSalesN(p.n)}${p.noAmount ? ` <small>(${p.noAmount} ${t('inNoAmount')})</small>` : ''}`;
    return inBar(name, value, (byUsd ? p.usd : p.n) / top);
  }).join('')}</ul>` : `<p class="muted">${t('adNone')}</p>`;
  const mMax = Math.max(1, ...x.months.map(m => m.usd));
  const byMonth = `<ul class="in-bars">${x.months.map(m => inBar(m.m.toLocaleDateString(lang, { month: 'short', year: 'numeric' }), m.usd ? auUSD(m.usd) : '—', Math.max(0, m.usd) / mMax)).join('')}</ul>`;
  const events = x.events.length ? x.events.map(e => {
    const top = Math.max(1, e.invited, e.confirmed, e.arrived);
    return `<article class="in-event"><h4>${esc(adEventName(e.event))} · ${fmtDate(e.date)}</h4><ul class="in-bars">
      ${[['inInvited', e.invited], ['inConfirmed', e.confirmed], ['inArrived', e.arrived]].map(([k, n]) => inBar(t(k), n, n / top)).join('')}</ul></article>`;
  }).join('') : `<p class="muted">${t('adNone')}</p>`;
  return `<section class="section in-overview"><h2>${t('inTitle')}</h2>
    <div class="ad-tiles in-tiles">
      <div><strong>${auUSD(x.money)}</strong><span>${t('inMoney')}</span></div>
      <div><strong>${x.net}</strong><span>${t('inSales')}</span></div>
      <div><strong>${x.books}</strong><span>${t('inBooks')}</span></div>
      ${x.refunds.length ? `<div><strong>${x.refunds.length}</strong><span>${t('inRefunds')}</span></div>` : ''}
    </div>
    <p class="muted ad-help">${t('inHelp')}</p>
    <div class="in-grid">
      <div><h3>${t('inByProduct')}</h3>${byProduct}</div>
      <div><h3>${t('inByMonth')}</h3>${byMonth}</div>
    </div>
    <h3>${t('inEvents')}</h3><div class="in-grid">${events}</div>
    <h3>${t('inAuction')}</h3>
    <div class="ad-tiles in-tiles">
      <div><strong>${auUSD(x.topBids)}</strong><span>${t('inTopBids')}</span></div>
      <div><strong>${x.bidders}</strong><span>${t('inBidders')}</span></div>
      <div><strong>${x.lotsBid}/${x.lots}</strong><span>${t('inLotsBid')}</span></div>
    </div>
    ${x.example ? `<p class="muted ad-help">${t('inExample')}</p>` : ''}
  </section>`;
}

// The overview goes right under the dashboard's heading; the "Whop purchases" tile counts sales only.
{
  const admin = pageAdmin;
  pageAdmin = () => {
    const html = admin();
    if (!adData) return html;
    const sales = insights(adData).net;
    const out = html.replace(`<strong>${adData.purchases.length}</strong><span>${t('adPurchases')}</span>`, `<strong>${sales}</strong><span>${t('inSales')}</span>`);
    const at = out.indexOf('<section class="section">', out.indexOf('<section class="section">') + 1);
    return at > 0 ? out.slice(0, at) + insightsHTML(adData) + out.slice(at) : out + insightsHTML(adData);
  };
}
