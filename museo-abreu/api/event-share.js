// Share link for an event: /e/<id>?l=<lang> (vercel.json rewrite). Messaging apps read the Open Graph
// tags below (title, date, image) to build the link preview; people are sent on to the event page.
// Texts are the app's own (features.js); keep them in step when an event changes.
const EVENTS = {
 "anniversary": {
  "m": 11,
  "d": 17,
  "time": "19:00",
  "img": "img/escaping-being.jpg",
  "name": {
   "es": "Aniversario del Museo Abreu",
   "en": "Museo Abreu anniversary",
   "fr": "Anniversaire du Museo Abreu"
  },
  "desc": {
   "es": "Celebramos la apertura del museo, inaugurado el 17 de noviembre de 2021 con la retrospectiva Memoria del Psico-Expresionismo.",
   "en": "We celebrate the opening of the museum, inaugurated on November 17, 2021 with the retrospective Memoria del Psico-Expresionismo.",
   "fr": "Nous célébrons l’ouverture du musée, inauguré le 17 novembre 2021 avec la rétrospective Memoria del Psico-Expresionismo."
  },
  "byYear": {
   "2026": {
    "title": {
     "es": "Quinto aniversario · Presentación de Ecce Homo",
     "en": "Fifth Anniversary · Launch of Ecce Homo",
     "fr": "Cinquième anniversaire · Lancement d’Ecce Homo"
    },
    "desc": {
     "es": "Una velada para celebrar el arte, un extraordinario recorrido personal y cinco años del Museo Abreu.",
     "en": "An evening celebrating art, a remarkable personal journey, and five years of Museo Abreu.",
     "fr": "Une soirée pour célébrer l’art, un parcours personnel remarquable et cinq années du Museo Abreu."
    }
   }
  }
 },
 "group-exhibition": {
  "m": 6,
  "d": 13,
  "time": "19:00",
  "img": "img/resilience.jpg",
  "name": {
   "es": "Exposición colectiva",
   "en": "Group exhibition",
   "fr": "Exposition collective"
  },
  "desc": {
   "es": "Cada año el Museo Abreu reúne en una exposición colectiva a artistas dominicanos y obras de Oscar Abreu.",
   "en": "Every year Museo Abreu brings together Dominican artists and works by Oscar Abreu in a group exhibition.",
   "fr": "Chaque année, le Museo Abreu réunit des artistes dominicains et des œuvres d’Oscar Abreu dans une exposition collective."
  },
  "withYear": true
 },
 "art-gabangi": {
  "m": 7,
  "d": 6,
  "time": "18:00",
  "lastDay": 8,
  "img": "img/gabangi/gg-magazine-2025.jpg",
  "name": {
   "es": "ART GABANGI",
   "en": "ART GABANGI",
   "fr": "ART GABANGI"
  },
  "desc": {
   "es": "Encuentro anual de artistas, críticos, coleccionistas y público en el Museo Abreu: exposiciones, conferencias, talleres y mercado del arte.",
   "en": "Annual gathering of artists, critics, collectors and visitors at Museo Abreu: exhibitions, lectures, workshops and the art market.",
   "fr": "Rencontre annuelle d’artistes, de critiques, de collectionneurs et de visiteurs au Museo Abreu : expositions, conférences, ateliers et marché de l’art."
  },
  "withYear": true
 }
};

const LOCALES = { es: 'es-DO', en: 'en-US', fr: 'fr-FR' };
const SITE = 'https://museo-abreu.vercel.app';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Next date of a yearly event in Punta Cana (UTC−4), counting today until the event's last day.
function nextDate(ev) {
  const now = new Date(Date.now() - 4 * 3600e3), y = now.getUTCFullYear();
  const end = Date.UTC(y, ev.m - 1, ev.d + (ev.lastDay || 0), 23, 59);
  return now.getTime() <= end ? new Date(Date.UTC(y, ev.m - 1, ev.d)) : new Date(Date.UTC(y + 1, ev.m - 1, ev.d));
}

module.exports = (req, res) => {
  const id = String(req.query.id || ''), ev = EVENTS[id];
  const l = LOCALES[req.query.l] ? req.query.l : 'en';
  if (!ev) { res.statusCode = 302; res.setHeader('Location', '/#/eventos'); return res.end(); }
  const date = nextDate(ev), year = String(date.getUTCFullYear()), special = (ev.byYear || {})[year] || {};
  const title = special.title ? special.title[l] : ev.name[l] + (ev.withYear ? ' ' + year : '');
  const fmt = d => d.toLocaleDateString(LOCALES[l], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const short = d => d.toLocaleDateString(LOCALES[l], { day: 'numeric', month: 'long', timeZone: 'UTC' });
  const [h, m] = ev.time.split(':').map(Number), mm = String(m).padStart(2, '0');
  const time = l === 'fr' ? `${h} h${m ? ' ' + mm : ''}` : `${h % 12 || 12}:${mm} ${h < 12 ? (l === 'es' ? 'a. m.' : 'AM') : (l === 'es' ? 'p. m.' : 'PM')}`;
  const when = ev.lastDay ? short(date) + ' – ' + fmt(new Date(date.getTime() + ev.lastDay * 864e5)) : fmt(date) + ' · ' + time;
  const desc = `${when} · Museo Abreu, Bávaro, Punta Cana. ${(special.desc || ev.desc)[l]}`;
  const target = `/#/evento/${id}`;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.end(`<!doctype html><html lang="${l}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Museo Abreu</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Museo Abreu · Art Experiences">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}/${ev.img}"><meta property="og:url" content="${SITE}/e/${id}">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)})</script>
</head><body><p><a href="${target}">${esc(title)}</a></p></body></html>`);
};
