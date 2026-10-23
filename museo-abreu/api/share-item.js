// Share links with their own preview for an auction lot (/l/<lot>) and for the book (/b), in Spanish,
// English or French (?l=). Messaging apps read the Open Graph tags; people are sent on to the page.
// See also api/event-share.js (events).
const { AUCTION, lotOpen } = require('../auction-config.js');

const SITE = 'https://museo-abreu.vercel.app';
const LANGS = ['es', 'en', 'fr'];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const T = {
  lot: { es: 'Lote {n}', en: 'Lot {n}', fr: 'Lot {n}' },
  sculpture: { es: 'Escultura n.º {n}', en: 'Sculpture no. {n}', fr: 'Sculpture n° {n}' },
  kind: { painting: { es: 'Pintura', en: 'Painting', fr: 'Peinture' }, sculpture: { es: 'Escultura', en: 'Sculpture', fr: 'Sculpture' } },
  auction: { es: 'Subasta Museo Abreu', en: 'Museo Abreu auction', fr: 'Enchères Museo Abreu' },
  lotDesc: {
    es: '{kind} de Oscar Abreu en subasta. Puje en línea; la subasta termina en vivo en la Cena de Subasta y Premios de ART GABANGI.',
    en: '{kind} by Oscar Abreu at auction. Bid online; the auction ends live at the ART GABANGI Auction & Awards Dinner.',
    fr: '{kind} d’Oscar Abreu aux enchères. Enchérissez en ligne ; la vente se termine en direct lors du dîner de vente aux enchères et remise des prix d’ART GABANGI.',
  },
  start: { es: 'Precio de salida: USD {p}.', en: 'Starting bid: USD {p}.', fr: 'Mise à prix : {p} USD.' },
  // The book: title and subtitles as printed, and the first sentence of the app's synopsis.
  book: {
    es: ['Ecce Homo · El arte me salvó la vida', '«Este libro existe porque el arte me salvó la vida». El nacimiento del Psico-Expresionismo, por Oscar Abreu. Edición impresa y digital.'],
    en: ['Ecce Homo · Art Saved My Life', '“This book exists because art saved my life.” The Birth of Psycho-Expressionism, by Oscar Abreu. In print and digital.'],
    fr: ['Ecce Homo · L’art m’a sauvé la vie', '« Ce livre existe parce que l’art m’a sauvé la vie. » La naissance du Psycho-Expressionnisme, par Oscar Abreu. En version imprimée et numérique.'],
  },
};
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k]);

module.exports = (req, res) => {
  const l = LANGS.includes(req.query.l) ? req.query.l : 'en';
  let title, desc, img, path, target;
  if (req.query.type === 'book') {
    [title, desc] = T.book[l]; img = 'img/time-on-my-face.jpg'; path = '/b'; target = '/#/tienda';
  } else {
    const i = AUCTION.lots.findIndex(x => x.id === req.query.id), lot = AUCTION.lots[i];
    if (!lot) { res.statusCode = 302; res.setHeader('Location', '/#/subasta'); return res.end(); }
    const name = lot.title ? lot.title[l] : fill(T.sculpture[l], { n: lot.n });
    title = `${fill(T.lot[l], { n: i + 1 })} · ${name} — ${T.auction[l]}`;
    desc = fill(T.lotDesc[l], { kind: T.kind[lot.kind][l] }) + (lot.startBid != null && lotOpen(lot) ? ' ' + fill(T.start[l], { p: lot.startBid.toLocaleString('en-US') }) : '');
    img = lot.img; path = '/l/' + lot.id; target = '/#/subasta/' + lot.id;
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=600');
  res.end(`<!doctype html><html lang="${l}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Museo Abreu · Art Experiences">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}/${img}"><meta property="og:url" content="${SITE}${path}">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)})</script>
</head><body><p><a href="${target}">${esc(title)}</a></p></body></html>`);
};
