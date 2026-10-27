// Loads the site's own data files (data.js, features.js, booking-config.js, ...) on the server,
// so the agents always answer from the same catalogue the visitors see. Nothing is duplicated:
// edit data.js / booking-config.js as usual and the agents follow on the next deploy.
//
// The browser files are plain scripts with top-level `const`s, so they are evaluated together in a
// sandbox with minimal browser stubs, and the globals we need are read back at the end.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Order matters: it mirrors the <script> order in index.html.
// Literal paths so Vercel's file tracer bundles them with the function (see vercel.json too).
const ROOT = process.env.SITE_ROOT || process.cwd();
const FILES = [
  'sample-en.js', 'sample-es.js', 'sample-fr.js', 'sample-de.js', 'sample-ru.js',
  'sample-it.js', 'sample-pt.js', 'sample-ja.js', 'sample-fund.js',
  'i18n.js', 'data.js', 'booking-config.js', 'features.js', 'auction-config.js',
];

const PICK = [
  'EXPERIENCES', 'SCHEDULE', 'WORKS', 'EDITIONS', 'EVENTS', 'CLUBS', 'BOOKING', 'VISIT_INFO',
  'AUCTION', 'EXHIBITIONS', 'BIO_SITE', 'TIMELINE', 'CIRCLE_WORKS', 'CIRCLE_EVENINGS', 'LANG_NAMES',
  'PAINTINGS', 'DRAWINGS', 'SCULPTURES', 'PHOTOS', 'REVIEWS', 'FUND_EDITIONS',
];

function sandbox() {
  const noop = () => {};
  const el = () => ({ addEventListener: noop, setAttribute: noop, classList: { add: noop, remove: noop, toggle: noop }, style: {}, dataset: {} });
  const ctx = {
    console: { log: noop, warn: noop, error: noop, info: noop },
    document: {
      addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null,
      createElement: el, documentElement: el(), head: el(), body: el(),
    },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    sessionStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    location: { hash: '', hostname: 'server', protocol: 'https:', search: '' },
    navigator: { language: 'en', languages: ['en'] },
    matchMedia: () => ({ matches: false, addEventListener: noop }),
    addEventListener: noop, setTimeout, clearTimeout, setInterval: () => 0, Intl, Date, Math, JSON, URL, URLSearchParams,
  };
  ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx;
  return vm.createContext(ctx);
}

let cache = null;

function loadSiteData() {
  if (cache) return cache;
  const code = FILES
    .filter(f => fs.existsSync(path.join(ROOT, f)))
    .map(f => fs.readFileSync(path.join(ROOT, f), 'utf8'))
    .join('\n;\n');
  const pick = PICK.map(k => `${k}: typeof ${k} !== 'undefined' ? ${k} : null`).join(',');
  cache = vm.runInContext(`${code}\n;({${pick}})`, sandbox(), { timeout: 2000 });
  // Round-trip to plain JSON (drops functions and sandbox prototypes).
  cache = JSON.parse(JSON.stringify(cache));
  return cache;
}

// Multilingual field -> one language (falls back to English, then Spanish).
const L = (v, lang = 'en') => (v == null ? '' : typeof v === 'string' || typeof v === 'number' ? v : v[lang] || v.en || v.es || '');

const SITE_URL = () => (process.env.SITE_URL || 'https://museo-abreu.vercel.app').replace(/\/$/, '');

// Compact catalogue for the system prompt (English; the model answers in the visitor's language).
function catalogueText() {
  const d = loadSiteData();
  const out = [];
  const exp = (d.EXPERIENCES || []).map(e =>
    `- ${e.id}: ${L(e.name)}${e.price != null ? ` · USD ${e.price}${e.perLabel ? ' ' + L(e.perLabel) : ' per person'}` : ' · price on request (quote)'}` +
    `${e.minutes ? ` · ${e.minutes} min` : ''}${e.capacity ? ` · max ${e.capacity}` : ''}${e.includesBook ? ' · includes a digital book' : ''} — ${L(e.desc)}`);
  out.push('EXPERIENCES (tours and classes):\n' + exp.join('\n'));

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const sch = Object.entries(d.SCHEDULE || {}).map(([id, slots]) =>
    `- ${id}: ` + slots.map(s => `${s.time} (guide: ${s.langs.join('/')}${s.days ? '; ' + s.days.map(x => days[x]).join(', ') + ' only' : '; daily'})`).join(', '));
  out.push('WEEKLY SCHEDULE (sample until the museum confirms):\n' + sch.join('\n'));

  const ev = (d.EVENTS || []).map(e =>
    `- ${e.id}: ${L(e.name)}${e.annual ? ` · every year on ${e.annual.d}/${e.annual.m} (day/month)` : e.date ? ` · ${e.date}` : ''}` +
    `${e.time ? ' · ' + e.time : ''}${e.price != null ? ' · USD ' + e.price : ' · price TBC'}${e.vip ? ' · VIP event (Pro members free + up to 3 guests)' : ''}` +
    `${e.desc ? ' — ' + String(L(e.desc)).slice(0, 220) : ''}`);
  out.push('EVENTS:\n' + ev.join('\n'));

  const works = (d.WORKS || []).map(w => {
    const s = w.spec ? (w.spec.en || []) : [];
    return `- ${w.id}: "${L(w.title)}" (${s.join(', ')})${w.spec && w.spec.series ? ' · ' + L(w.spec.series) : ''}${w.sold ? ' · SOLD' : ''}`;
  });
  out.push('FEATURED WORKS:\n' + works.join('\n'));
  const circle = (d.CIRCLE_WORKS || []).map(c => c.work + (c.isNew ? ' (new)' : '')).join(', ');
  out.push(`COLLECTORS' CIRCLE: works by private introduction only (no public prices): ${circle}. Private evenings around: ${(d.CIRCLE_EVENINGS || []).join(', ')}. Formats: private museum viewing, private dinner with Oscar Abreu, commissions.`);

  const B = d.BOOKING || {};
  const ed = (d.EDITIONS || []).map(e => `${e.lang} USD ${e.price}${B.whop && B.whop['book-' + e.lang] ? ' (digital, Whop)' : ''}`).join(', ');
  out.push(`BOOK "Ecce Homo: Art Saved My Life" by Oscar Abreu — editions: ${ed}. Free sample on the site (#/biblioteca).`);
  // The second book (fundamentos.js / sample-fund.js): its editions, and its price once the museum sets FUND_PRICE.
  const F = d.FUND_EDITIONS || {};
  let fPrice = null;
  try { const m = fs.readFileSync(path.join(ROOT, 'fundamentos.js'), 'utf8').match(/const FUND_PRICE = ([\d.]+|null)/); fPrice = m && m[1] !== 'null' ? Number(m[1]) : null; } catch (e) {}
  const fEds = Object.entries(F).map(([l, e]) => `${l} "${e.title}"${fPrice && B.whop && B.whop['fund-' + l] ? ` USD ${fPrice} (digital, Whop)` : ''}`).join('; ');
  if (fEds) out.push(`BOOK "Fundamentos del Psico-Expresionismo" by Oscar Abreu (companion to Ecce Homo; its principles, visual vocabulary, procedures and limits) — DIGITAL ONLY, no printed copy. Editions: ${fEds}. Free sample (note, introduction, chapter 1) at #/fundamentos/<lang>. ${fPrice ? '' : 'Not yet sold by card: the price is not set, so visitors request the digital edition on WhatsApp; do not quote a price. '}Included in Pro.`);
  out.push('PRO MEMBERSHIP: USD 5.99 per week (Whop). Benefits: full daily book session, free entry to museum events with QR pass, up to 3 free guests at every VIP event, priority in classes and clubs.');
  const clubs = (d.CLUBS || []).map(c => `${L(c.name)} USD ${c.price} (${L(c.when)})`).join('; ');
  if (clubs) out.push(`CLUBS (currently ON HOLD, take interest only): ${clubs}.`);

  const A = d.AUCTION || {};
  out.push(`AUCTION: online bidding in the app (#/subasta), ends live at the ART GABANGI Auction & Awards Dinner. Increment USD ${A.increment}. ` +
    `The current lots are examples until the museum publishes the real list, starting bids and dates.`);

  const V = d.VISIT_INFO || {};
  const vis = ['address', 'hours', 'admission', 'accessibility', 'arrival'].map(k => [k, L(V[k])]).filter(x => x[1]);
  out.push('VISITOR INFO: ' + (vis.length ? vis.map(([k, v]) => `${k}: ${v}`).join(' · ') : 'Museo Abreu, Bávaro, Punta Cana, Dominican Republic. Address, hours and walk-in admission are NOT yet published: do not invent them; offer WhatsApp.'));
  out.push(`CONTACT: WhatsApp +1 (809) 840-9588 · info@oscarabreu.com · Instagram @oscarabreu_artist.`);
  out.push(`SITE PAGES (link as ${SITE_URL()}/#/<route>): artista (Oscar Abreu), psico (Psycho-Expressionism), visita (Visit & VIP Tour), clases, eventos, subasta, tienda (shop), coleccion (Collectors' Circle), biblioteca (library/book sample), fundamentos (second book), membresia (Membership: Friend, Pro, Collectors’ Circle), pro, manifiestos, pinturas, dibujos, escultura, fotos, resenas (reviews), prensa, kit (press kit), exposiciones, gabangi, galeria (Abreu Fine Art), contacto.`);
  return out.join('\n\n');
}

function bioText() {
  const d = loadSiteData();
  const bio = d.BIO_SITE ? L(d.BIO_SITE) : '';
  const bioStr = Array.isArray(bio) ? bio.join('\n') : typeof bio === 'object' ? JSON.stringify(bio) : String(bio);
  const tl = Array.isArray(d.TIMELINE) ? d.TIMELINE.map(x => `- ${x.year || x.y || ''}: ${L(x.text || x.t || x.title || x)}`).join('\n') : '';
  const ex = Array.isArray(d.EXHIBITIONS) ? d.EXHIBITIONS.map(x => `- ${x.year || ''} ${L(x.title || x.name || '')} ${L(x.place || x.venue || '')}`.trim()).join('\n') : '';
  return [`ARTIST BIOGRAPHY:\n${bioStr}`.slice(0, 6000), tl && `TIMELINE:\n${tl}`.slice(0, 5000), ex && `EXHIBITIONS:\n${ex}`.slice(0, 2500)].filter(Boolean).join('\n\n');
}

module.exports = { loadSiteData, catalogueText, bioText, L, SITE_URL };
