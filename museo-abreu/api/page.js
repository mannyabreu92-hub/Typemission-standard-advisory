// The app's main pages at their own addresses (/oscar-abreu, /events, /books/fundamentos… see seo/paths.json),
// for search engines and shared links. Serves index.html with that page's own title, description, canonical
// address and language versions (?lang=), search data (schema.org: the museum, Oscar Abreu, the events, the
// books) and the page's heading and sections as plain HTML, so the page reads without JavaScript; the app then
// shows the page itself (window.SEO_ROUTE). Texts come from seo/pages.json (tools/seo-build.js).
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const LANGS = ['es', 'en', 'fr', 'de', 'it', 'ar', 'ru'];
const SITE = (process.env.SITE_URL || 'https://museo-abreu.vercel.app').replace(/\/$/, '');
let cache;
const load = () => cache ||= {
  html: fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'),
  paths: JSON.parse(fs.readFileSync(path.join(ROOT, 'seo/paths.json'), 'utf8')),
  data: JSON.parse(fs.readFileSync(path.join(ROOT, 'seo/pages.json'), 'utf8')),
};
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const url = (p, l) => `${SITE}/${p}${l && l !== 'en' ? `?lang=${l}` : ''}`;

// The next date of a yearly event in Punta Cana (UTC−4, no daylight saving).
function nextDate(e, now = new Date()) {
  const today = new Date(now.getTime() - 4 * 36e5).toISOString().slice(0, 10);
  for (const y of [now.getUTCFullYear(), now.getUTCFullYear() + 1]) {
    const d = `${y}-${String(e.m).padStart(2, '0')}-${String(e.d).padStart(2, '0')}`;
    const end = new Date(Date.parse(d) + e.days * 864e5).toISOString().slice(0, 10);
    if (end >= today) return { start: d, end };
  }
}
const MUSEUM = { '@type': 'Museum', '@id': `${SITE}/#museum`, name: 'Museo Abreu', url: SITE + '/', image: `${SITE}/img/og-image.jpg`,
  address: { '@type': 'PostalAddress', addressLocality: 'Bávaro, Punta Cana', addressCountry: 'DO' },
  telephone: '+1-809-840-9588', email: 'info@oscarabreu.com', sameAs: ['https://www.instagram.com/oscarabreu_artist/'],
  founder: { '@id': `${SITE}/oscar-abreu#person` } };
const PERSON = { '@type': 'Person', '@id': `${SITE}/oscar-abreu#person`, name: 'Oscar Abreu', jobTitle: 'Artist', birthDate: '1978-03-06',
  birthPlace: 'San Juan de la Maguana, Dominican Republic', nationality: 'Dominican', url: `${SITE}/oscar-abreu`, image: `${SITE}/img/oscar-abreu.jpg`,
  sameAs: ['https://www.instagram.com/oscarabreu_artist/', 'https://www.oscarabreu.com'], knowsAbout: 'Psycho-Expressionism' };

function schema(p, l, data, m) {
  const g = [MUSEUM];
  if (p === '' || p === 'oscar-abreu' || p === 'psycho-expressionism') g.push(PERSON);
  const ev = e => { const d = nextDate(e); return d && { '@type': 'Event', name: e.name[l] || e.name.en, description: e.desc[l] || e.desc.en,
    startDate: `${d.start}T${e.time}:00-04:00`, ...(e.days ? { endDate: d.end } : {}), eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', location: { '@id': `${SITE}/#museum` }, organizer: { '@id': `${SITE}/#museum` },
    url: e.id === 'art-gabangi' ? url('art-gabangi', l) : url(`events/${e.id}`, l), image: `${SITE}/img/og-image.jpg`,
    ...(e.price ? { offers: { '@type': 'Offer', price: e.price, priceCurrency: 'USD', url: url('events', l) } } : {}) }; };
  if (p === '' || p === 'events') g.push(...data.events.map(ev).filter(Boolean));
  else if (p.startsWith('events/') || p === 'art-gabangi') { const e = data.events.find(x => `events/${x.id}` === p || (p === 'art-gabangi' && x.id === 'art-gabangi')); if (e) g.push(ev(e)); }
  if (p === 'books/ecce-homo' || p === 'books/fundamentos') g.push({ '@type': 'Book', name: m.h1, author: { '@id': `${SITE}/oscar-abreu#person` },
    bookFormat: 'https://schema.org/EBook', url: url(p, l), publisher: p === 'books/fundamentos' ? 'ARTFORO Editions' : undefined });
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': g.filter(Boolean) }).replace(/</g, '\\u003c');
}

// Every other page of the app at its own address (its route: /subasta/sajoma, /evento/uasd-psico, /mi-coleccion…):
// its own title, description and picture for link previews, else those of the main page it belongs to.
const { AUCTION } = require('../auction-config.js');
const SHARE = require('./share-item.js'), EVENT_SHARE = require('./event-share.js');
const L3 = l => (['es', 'en', 'fr'].includes(l) ? l : 'en');
const slug = n => n.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const lots = () => AUCTION.lots.filter(x => !x.example);
const artistOf = x => x.artist || 'Oscar Abreu';
const RT = {
  auction: { es: 'Subasta · Museo Abreu', en: 'Auction · Museo Abreu', fr: 'Vente aux enchères · Museo Abreu' },
  auctionDesc: { es: '{n} obras de {a} artistas en subasta. Puje en línea; gana la puja más alta.', en: '{n} works by {a} artists at auction. Bid online; the highest bid wins.', fr: '{n} œuvres de {a} artistes aux enchères. Enchérissez en ligne ; l’enchère la plus haute l’emporte.' },
  room: { es: 'Sala de {name} · Subasta · Museo Abreu', en: '{name} · Auction room · Museo Abreu', fr: 'Salle de {name} · Enchères · Museo Abreu' },
  works: { es: '{n} obras en subasta', en: '{n} works at auction', fr: '{n} œuvres aux enchères' },
  work1: { es: '1 obra en subasta', en: '1 work at auction', fr: '1 œuvre aux enchères' },
  catalogue: { es: 'Catálogo de la subasta · Museo Abreu', en: 'Sale catalogue · Museo Abreu', fr: 'Catalogue de la vente · Museo Abreu' },
  collection: { es: 'Mi colección · Museo Abreu', en: 'My collection · Museo Abreu', fr: 'Ma collection · Museo Abreu' },
};
const fill = SHARE.fill;
function routeMeta(r, l, data, paths) {
  const k = L3(l), seg = r.split('/'), inv = Object.fromEntries(Object.entries(paths).map(([pp, rr]) => [rr, pp]));
  const base = pp => (data.pages[pp] || data.pages['']).meta[l] || (data.pages[pp] || data.pages['']).meta.en;
  const all = lots(), artists = [...new Set(all.map(artistOf))];
  if (seg[0] === 'subasta') {
    const lot = seg[1] && all.find(x => x.id === seg[1]);
    if (lot) {
      const n = all.indexOf(lot) + 1, name = lot.title ? (lot.title[k] || lot.title.en) : '';
      return { title: `${name} · ${artistOf(lot)} — ${fill(SHARE.T.lot[k], { n })} · ${SHARE.T.auction[k]}`, img: lot.img,
        desc: fill(SHARE.T.lotDesc[k], { kind: SHARE.T.kind[lot.kind][k], artist: artistOf(lot) }) + (lot.startBid != null ? ' ' + fill(SHARE.T.start[k], { p: lot.startBid.toLocaleString('en-US') }) : '') };
    }
    const room = seg[1] && seg[1].startsWith('artista-') && artists.find(a => 'artista-' + slug(a) === seg[1]);
    if (room) {
      const own = all.filter(x => artistOf(x) === room), e = AUCTION.essays && AUCTION.essays[room];
      return { title: fill(RT.room[k], { name: room }), img: own[0].img,
        desc: [e && e.head, fill(own.length === 1 ? RT.work1[k] : RT.works[k], { n: own.length })].filter(Boolean).join(' · ') + '. ' + fill(RT.auctionDesc[k], { n: all.length, a: artists.length }).split('. ')[1] };
    }
    return { title: seg[1] === 'catalogo' || seg[1] === 'qr' ? RT.catalogue[k] : RT.auction[k], img: all[0] && all[0].img, desc: fill(RT.auctionDesc[k], { n: all.length, a: artists.length }) };
  }
  if (seg[0] === 'evento' && EVENT_SHARE.EVENTS[seg[1]]) {
    const ev = EVENT_SHARE.EVENTS[seg[1]], d = EVENT_SHARE.nextDate(ev), y = String(d.getUTCFullYear()), sp = (ev.byYear || {})[y] || {};
    const loc = { es: 'es-DO', en: 'en-US', fr: 'fr-FR' }[k];
    return { title: (sp.title ? sp.title[k] : ev.name[k]) + ' · Museo Abreu', img: ev.img,
      desc: `${d.toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })} · ${ev.place ? ev.place[k] : 'Museo Abreu, Bávaro, Punta Cana'}. ${(sp.desc || ev.desc)[k]}` };
  }
  if (seg[0] === 'fundamentos') return { ...base('books/fundamentos'), img: 'img/fundamentos-cover-art.jpg' };
  if (seg[0] === 'leer' || seg[0] === 'buscar') return base('books/ecce-homo');
  if (seg[0] === 'mi-coleccion') return { ...base(''), title: RT.collection[k], noindex: true };
  if (inv[seg[0]]) return base(inv[seg[0]]);
  return { ...base(''), noindex: /^(admin|personal|cuenta|gracias)$/.test(seg[0]) };
}

// The picture shown in a link's preview, where a page has its own.
const PAGE_IMG = { 'books/fundamentos': 'img/fundamentos-cover-art.jpg', 'events/anniversary': 'img/escaping-being.jpg', 'events/group-exhibition': 'img/resilience.jpg' };

module.exports = (req, res) => {
  const { html, paths, data } = load();
  const p = String(req.query.p || '').replace(/^\/|\/$/g, '');
  if (!paths[p] && !/^[\w\-\/%.]+$/.test(p)) return res.status(404).send('Not found');
  if (!paths[p]) return routePage(req, res, p, html, paths, data);
  const l = LANGS.includes(String(req.query.lang)) ? String(req.query.lang) : 'en';
  const page = data.pages[p], m = page.meta[l] || page.meta.en;
  const links = Object.keys(paths).filter(k => !k.includes('/') || k.startsWith('books/')).map(k => `<li><a href="${url(k, l)}">${esc(data.pages[k].meta[l].h1 || k)}</a></li>`).join('');
  const body = `<div class="wrap"><section class="section"><h1>${esc(m.h1)}</h1>${m.lead ? `<p class="lead">${esc(m.lead)}</p>` : ''}${m.desc && m.desc !== m.lead ? `<p>${esc(m.desc)}</p>` : ''}
    ${m.heads.length ? `<ul>${m.heads.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}</section><nav class="section" aria-label="Museo Abreu"><ul>${links}</ul></nav></div>`;
  const head = `<link rel="canonical" href="${url(p, l)}">
${LANGS.map(x => `<link rel="alternate" hreflang="${x}" href="${url(p, x)}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${url(p)}">
<script type="application/ld+json">${schema(p, l, data, m)}</script>
<script>window.SEO_ROUTE = ${JSON.stringify(page.route)};</script>`;
  const out = html
    .replace(/<html lang="[^"]*">/, `<html lang="${l}"${l === 'ar' ? ' dir="rtl"' : ''}>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(m.desc)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(m.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(m.desc)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url(p, l)}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${SITE}/${PAGE_IMG[p] || 'img/og-image.jpg'}`)
    .replace('</head>', head + '\n</head>')
    .replace(/<main id="main" tabindex="-1"><\/main>/, `<main id="main" tabindex="-1">${body}</main>`);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(out);
};

// A page that is not one of the main ones: the app shows it from its route (window.SEO_ROUTE); its preview is its own.
function routePage(req, res, r, html, paths, data) {
  const l = LANGS.includes(String(req.query.lang)) ? String(req.query.lang) : 'en';
  let m;
  try { m = routeMeta(r, l, data, paths); } catch (e) { m = data.pages[''].meta[l] || data.pages[''].meta.en; }
  const img = m.img ? `${SITE}/${m.img}` : `${SITE}/img/og-image.jpg`;
  const out = html
    .replace(/<html lang="[^"]*">/, `<html lang="${l}"${l === 'ar' ? ' dir="rtl"' : ''}>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(m.desc)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(m.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(m.desc)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url(r, l)}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${img}`)
    .replace(/\s*<meta property="og:image:(width|height)" content="[^"]*">/g, '')
    .replace('</head>', `<link rel="canonical" href="${url(r, l)}">${m.noindex ? '\n<meta name="robots" content="noindex">' : ''}
<script>window.SEO_ROUTE = ${JSON.stringify(r)};</script>\n</head>`);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
  res.status(200).send(out);
}
module.exports.nextDate = nextDate;
