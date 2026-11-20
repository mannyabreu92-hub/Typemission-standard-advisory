// The collector page (#/coleccion): the works saved with ♡, the visitor's own bids with where each stands,
// the artists behind them, and works chosen for them by colour, size and artist. Everything comes from
// this phone (the ♡ list and the bids placed from it) and from the live auction state; nothing is invented.

function pageCollector() {
  if (!auState && !auFailed) fetchAuction().then(() => { if (location.hash.startsWith('#/coleccion')) route(); });
  const byId = id => AUCTION.lots.find(l => l.id === id);
  const saved = wsList(), savedLots = saved.filter(k => k.startsWith('l:')).map(k => byId(k.slice(2))).filter(Boolean);
  const savedWorks = saved.filter(k => k.startsWith('w:')).map(k => findWork(k.slice(2))).filter(Boolean);
  // One line per lot bid on: the visitor's highest bid against the highest bid now.
  const best = new Map();
  myBids().forEach(b => { if (byId(b.lot) && (!best.has(b.lot) || b.amount > best.get(b.lot))) best.set(b.lot, b.amount); });
  const bids = [...best].map(([id, amount]) => ({ lot: byId(id), amount })).reverse();
  const bidRow = ({ lot, amount }) => {
    const s = auSt(lot) || {}, high = s.count ? s.high : null, open = auOpen(lot);
    const state = high == null ? '' : amount >= high ? `<span class="cl-lead">${t('clLeading')}</span>` : `<span class="cl-out">${t('clOutbid', { amount: auUSD(high) })}</span>`;
    return `<li><a class="cl-bid" href="#/subasta/${lot.id}">
      <img src="${lot.thumb || lot.img}" alt="" loading="lazy" width="72" height="72">
      <span class="cl-bid-text"><span class="lot-meta">${t('auLot', { n: lotNumber(lot) })}</span>
        <span class="lot-artist">${esc(lotArtist(lot))}</span><i class="cl-bid-title">${esc(lotTitle(lot))}</i>
        <span class="cl-bid-state">${t('clYourBid', { amount: auUSD(amount) })}${state ? ' · ' + state : ''}${!open && auCloses(lot) ? ' · ' + t(auClosedKey()) : ''}</span></span>
      <span class="arr" aria-hidden="true">→</span></a></li>`;
  };
  // The artists of the saved works and of the works bid on, most present first.
  const counts = new Map();
  [...savedLots, ...bids.map(b => b.lot)].forEach(l => counts.set(lotArtist(l), (counts.get(lotArtist(l)) || 0) + 1));
  const artists = [...counts].sort((a, b) => b[1] - a[1]).map(([name]) => auArtists().find(a => a.name === name)).filter(Boolean);
  const seeds = [...savedLots, ...bids.map(b => b.lot)];
  const forYou = seeds.length ? auRecommend(seeds, 8) : [];
  const head = (key, extra = '') => `<div class="au-index-top"><h2 class="au-index-h">${t(key)}</h2>${extra}</div>`;
  return `<div class="wrap cl-page">
    <section class="section shop-head"><p class="eyebrow">Museo Abreu</p><h1 class="shop-h1">${t('clTitle')}</h1><p class="shop-lead">${t('clLead')}</p></section>
    <section class="section">${head('clBids')}
      ${bids.length ? `<ol class="cl-bids">${bids.map(bidRow).join('')}</ol>` : `<p class="au-index-lead">${t('clNoBids')} <a class="lot-go" href="#/subasta">${t('shAllLots')} <span class="arr" aria-hidden="true">→</span></a></p>`}
    </section>
    <section class="section">${head('clSaved', `<span class="au-find-meta">${savedLots.length + savedWorks.length}</span>`)}
      ${savedLots.length ? `<div class="lots">${savedLots.map(l => lotCard(l, 'h3')).join('')}</div>` : ''}
      ${savedWorks.length ? `<div class="grid four" style="margin-top:1.4rem">${savedWorks.map(workCard).join('')}</div>` : ''}
      ${savedLots.length || savedWorks.length ? '' : `<p class="au-index-lead">${t('clEmptySaved')}</p>`}
    </section>
    ${artists.length ? `<section class="section au-artists">${head('clArtists')}
      <ol class="au-artist-list au-index">${artists.map((a, i) => `<li><a class="au-artist" href="${auRoomHref(a.name)}">
        <span class="au-index-n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <span class="au-artist-text"><span class="au-artist-name">${esc(a.name)}${auNameYears(a.name)}</span>
          ${auEssay(a.name).head ? `<span class="au-artist-head" lang="${auEssay(a.name).headLang}">${esc(auEssay(a.name).head)}</span>` : ''}
          <span class="au-artist-n">${auWorksText(a.lots.length)}</span></span>
        <span class="au-artist-strip" aria-hidden="true">${a.lots.slice(0, 3).map(l => `<img src="${l.thumb || l.img}" alt="" loading="lazy" width="120" height="120">`).join('')}</span>
        <span class="arr" aria-hidden="true">→</span></a></li>`).join('')}</ol></section>` : ''}
    ${forYou.length ? `<section class="section">${head('clForYou')}<p class="au-index-lead">${t('clForYouLead')}</p>
      <div class="lots">${forYou.map(l => lotCard(l, 'h3')).join('')}</div></section>` : ''}
  </div>`;
}
EXTRA_ROUTES.coleccion = pageCollector;
if (typeof ROUTE_SECTION !== 'undefined') ROUTE_SECTION.coleccion = 'cuenta';

// The way in: from the account page, and under the auction's search.
{
  const acc = accountExtras;
  accountExtras = () => `<section class="section"><a class="cl-door" href="#/coleccion"><span class="au-index-h">${t('clTitle')}</span>
    <span class="cl-door-lead">${t('clLead')}</span><span class="lot-go">${t('clOpenCol')} <span class="arr" aria-hidden="true">→</span></span></a></section>` + acc();
}
