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

module.exports = (req, res) => {
  const { html, paths, data } = load();
  const p = String(req.query.p || '').replace(/^\/|\/$/g, '');
  if (!paths[p]) return res.status(404).send('Not found');
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
    .replace('</head>', head + '\n</head>')
    .replace(/<main id="main" tabindex="-1"><\/main>/, `<main id="main" tabindex="-1">${body}</main>`);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(out);
};
module.exports.nextDate = nextDate;
