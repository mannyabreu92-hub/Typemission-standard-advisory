// Content and catalogue data. Everything here is placeholder until the museum
// and the artist approve it; in production it comes from the admin panel.
const TZ = 'America/Santo_Domingo';

const EXPERIENCES = [
  {
    id: 'vip', price: 100, capacity: 10, minutes: 75,
    name: { es: 'VIP Tour del museo', en: 'Museum VIP Tour' },
    desc: {
      es: 'Recorrido en grupo reducido con guía autorizado y selección de salas y obras. 60–90 min.',
      en: 'Small-group tour with an authorised guide through selected rooms and works. 60–90 min.',
    },
  },
  {
    id: 'artist', price: 250, capacity: 8, minutes: 90,
    name: { es: 'Encuentro con Oscar Abreu', en: 'Meet Oscar Abreu' },
    desc: {
      es: 'Recorrido o conversación con el artista. Solo en fechas con su participación confirmada.',
      en: 'A tour or conversation with the artist. Only on dates with his confirmed participation.',
    },
  },
  {
    id: 'combo', price: 115, capacity: 10, minutes: 75, includesBook: true,
    name: { es: 'Tour y libro digital', en: 'Tour + digital book' },
    desc: {
      es: 'VIP Tour más acceso a una edición digital de El arte salvó mi vida.',
      en: 'VIP Tour plus access to a digital edition of Art Saved My Life.',
    },
  },
  {
    id: 'private', price: null,
    name: { es: 'Tour privado', en: 'Private tour' },
    desc: {
      es: 'Para parejas, familias, grupos o empresas. Solicitud de disponibilidad y cotización.',
      en: 'For couples, families, groups or companies. Availability request and quote.',
    },
  },
];

const LANG_NAMES = {
  es: { es: 'Español', en: 'Spanish' },
  en: { es: 'Inglés', en: 'English' },
  fr: { es: 'Francés', en: 'French' },
  de: { es: 'Alemán', en: 'German' },
  pt: { es: 'Portugués', en: 'Portuguese' },
};

// Sample weekly schedule. Each session lists its real guide languages; a language
// in the app does not imply a guide is available in it.
const SCHEDULE = {
  vip: [
    { time: '10:00', langs: ['es', 'en'] },
    { time: '12:30', langs: ['en', 'fr'] },
    { time: '15:30', langs: ['es'] },
  ],
  artist: [{ time: '16:30', langs: ['es', 'en'], days: [6] }], // Saturdays only
};
SCHEDULE.combo = SCHEDULE.vip;

const WORKS = [
  { id: 'w1', seed: 11, title: { es: 'Obra I', en: 'Work I' } },
  { id: 'w2', seed: 23, title: { es: 'Obra II', en: 'Work II' } },
  { id: 'w3', seed: 37, title: { es: 'Obra III', en: 'Work III' } },
  { id: 'w4', seed: 41, title: { es: 'Obra IV', en: 'Work IV' } },
  { id: 'w5', seed: 59, title: { es: 'Obra V', en: 'Work V' } },
  { id: 'w6', seed: 67, title: { es: 'Obra VI', en: 'Work VI' } },
  { id: 'w7', seed: 73, title: { es: 'Obra VII', en: 'Work VII' } },
  { id: 'w8', seed: 89, title: { es: 'Obra VIII', en: 'Work VIII' } },
];

const EDITIONS = [
  { lang: 'es', price: 25, status: 'available' },
  { lang: 'en', price: 25, status: 'available' },
  { lang: 'fr', price: 25, status: 'soon' },
  { lang: 'de', price: 25, status: 'soon' },
  { lang: 'pt', price: 25, status: 'soon' },
];

const CHAPTERS = [
  { free: true, title: { es: 'Prólogo', en: 'Prologue' } },
  { free: true, title: { es: 'Capítulo 1', en: 'Chapter 1' } },
  { title: { es: 'Capítulo 2', en: 'Chapter 2' } },
  { title: { es: 'Capítulo 3', en: 'Chapter 3' } },
  { title: { es: 'Capítulo 4', en: 'Chapter 4' } },
  { title: { es: 'Capítulo 5', en: 'Chapter 5' } },
  { title: { es: 'Epílogo', en: 'Epilogue' } },
];

const PALETTES = [
  ['#16120f', '#c2410c', '#f6f1e9', '#1d4ed8', '#eab308'],
  ['#0f172a', '#dc2626', '#fde68a', '#0d9488', '#f8fafc'],
  ['#1c1917', '#7c3aed', '#f97316', '#fef3c7', '#0891b2'],
  ['#292524', '#16a34a', '#facc15', '#e11d48', '#fafaf9'],
];

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// Torn-paper polygon: a rough quadrilateral with jagged edges.
function tornPath(r, x, y, w, h) {
  const pts = [];
  const jag = (ax, ay, bx, by) => {
    const n = 6 + Math.floor(r() * 6);
    for (let i = 0; i < n; i++) {
      const t = i / n;
      pts.push([ax + (bx - ax) * t + (r() - .5) * 18, ay + (by - ay) * t + (r() - .5) * 18]);
    }
  };
  jag(x, y, x + w, y); jag(x + w, y, x + w, y + h); jag(x + w, y + h, x, y + h); jag(x, y + h, x, y);
  return 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(',')).join('L') + 'Z';
}

// Generates one layer of a placeholder artwork; real photographs replace these.
function artLayer(seed, layer, opts = {}) {
  const r = rng(seed * 7 + layer * 131);
  const pal = PALETTES[seed % PALETTES.length];
  let out = '';
  if (layer === 0) {
    out += `<rect width="400" height="500" fill="${pal[0]}"/>`;
    for (let i = 0; i < 5; i++) {
      out += `<path d="${tornPath(r, r() * 260, r() * 380, 120 + r() * 160, 90 + r() * 160)}" fill="${pal[1 + (i % 4)]}" opacity="${(.55 + r() * .4).toFixed(2)}"/>`;
    }
  } else if (layer === 1) {
    for (let i = 0; i < 4; i++) {
      out += `<path d="${tornPath(r, -20 + r() * 300, -20 + r() * 420, 140 + r() * 180, 120 + r() * 140)}" fill="${pal[(i + 2) % 5]}" opacity=".92"/>`;
    }
    for (let i = 0; i < 6; i++) {
      const x = r() * 400, y = r() * 500;
      out += `<path d="M${x},${y} q${(r() - .5) * 200},${(r() - .5) * 200} ${(r() - .5) * 300},${(r() - .5) * 300}" stroke="${pal[0]}" stroke-width="${2 + r() * 6}" fill="none" stroke-linecap="round"/>`;
    }
  } else {
    // Central torn structure with fragments of earlier layers showing through.
    const cx = 200 + (r() - .5) * 60, cy = 240 + (r() - .5) * 60;
    out += `<path d="${tornPath(r, cx - 120, cy - 150, 240, 300)}" fill="${pal[2]}" opacity=".95"/>`;
    for (let i = 0; i < 3; i++) {
      out += `<path d="${tornPath(r, cx - 90 + r() * 120, cy - 120 + r() * 180, 40 + r() * 60, 30 + r() * 70)}" fill="${pal[(i + 1) % 5]}" opacity=".9"/>`;
    }
    out += `<path d="M${cx - 110},${cy - 40 + r() * 80} L${cx + 110},${cy - 60 + r() * 120}" stroke="${pal[0]}" stroke-width="${3 + r() * 4}" stroke-linecap="round"/>`;
  }
  if (opts.alone) return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${out}</svg>`;
  return out;
}

function artSVG(seed, label) {
  return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label || ''}">${artLayer(seed, 0)}${artLayer(seed, 1)}${artLayer(seed, 2)}</svg>`;
}

function coverSVG(title) {
  return `<svg viewBox="0 0 400 600" role="img" aria-label="${title}">${artLayer(5, 0).replace('height="500"', 'height="600"')}${artLayer(5, 2)}
    <rect y="430" width="400" height="170" fill="#16120f"/>
    <text x="28" y="490" fill="#f6f1e9" font-family="Cormorant Garamond, serif" font-size="38" font-weight="600">${title}</text>
    <text x="28" y="540" fill="#f59e6b" font-family="Work Sans, sans-serif" font-size="16" letter-spacing="4">OSCAR ABREU</text></svg>`;
}
