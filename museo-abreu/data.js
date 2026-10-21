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

// Table of contents of ECCE HOMO. Introduction and Chapter I are the free sample.
// Spanish chapter titles are pending the Spanish edition.
const CHAPTERS = [
  { key: 'intro', free: true, title: { es: 'Introducción', en: 'Introduction' } },
  ...TOC_EN.nums.map((n, i) => ({
    key: 'ch' + (i + 1), free: i === 0,
    title: { es: 'Capítulo ' + n, en: 'Chapter ' + n + ' — ' + TOC_EN.titles[i] },
  })),
  { key: 'ack', title: { es: 'Agradecimientos', en: 'Acknowledgments' } },
  { key: 'chrono', title: { es: 'Cronología biográfica', en: 'Biographical Chronology' } },
];

// Selected milestones from the book's Biographical Chronology.
const TIMELINE = [
  { y: '1978', es: 'Nace el 6 de marzo en San Juan de la Maguana, República Dominicana.', en: 'Born on March 6 in San Juan de la Maguana, Dominican Republic.' },
  { y: '1982', es: 'Con sus abuelos en Las Mulas dibuja sobre la tierra y modela figuras con barro tras la lluvia.', en: 'Living with his grandparents in Las Mulas, he draws on the earth and models figures from mud after the rain.' },
  { y: '1990', es: 'A los doce años visita por primera vez el Museo del Prado, en España.', en: 'At twelve, he visits the Museo del Prado in Spain for the first time.' },
  { y: '1994', es: 'Llega solo a Chicago a los dieciséis años. Ese verano nombra por primera vez el Psico-Expresionismo.', en: 'Arrives alone in Chicago at sixteen. That summer he first names Psycho-Expressionism.' },
  { y: '2004', es: 'Huellas: la invención de lo visible, en el Museo del Hombre Dominicano.', en: 'Huellas: la invención de lo visible at the Museo del Hombre Dominicano.' },
  { y: '2016', es: 'Un incendio destruye su estudio-residencia en Nueva York.', en: 'A fire destroys his studio-residence in New York.' },
  { y: '2017', es: 'Crea el mural Todos somos inmigrantes durante ARTFORO en Nueva York.', en: 'Creates the mural Todos somos inmigrantes during ARTFORO in New York.' },
  { y: '2021', es: 'El 17 de noviembre abre la primera fase del Museo Abreu en Bávaro con la retrospectiva Memoria del Psico-Expresionismo.', en: 'On November 17, the first phase of Museo Abreu opens in Bávaro with the retrospective Memoria del Psico-Expresionismo.' },
  { y: '2023', es: 'El 12 de diciembre el museo se amplía a diez salas.', en: 'On December 12, the museum expands to ten galleries.' },
  { y: '2025', es: 'Primera edición de ART GABANGI en el Museo Abreu.', en: 'First edition of ART GABANGI at Museo Abreu.' },
  { y: '2026', es: 'Publica Ecce Homo: El arte salvó mi vida.', en: 'Publishes Ecce Homo: Art Saved My Life.' },
];

const EXHIBITIONS = [
  { y: 2004, t: 'Huellas: la invención de lo visible', p: 'Museo del Hombre Dominicano, Santo Domingo' },
  { y: 2005, t: 'Conexión Cósmica', p: 'Palacio Consistorial, Santiago' },
  { y: 2006, t: 'Castigo de la memoria', p: 'Joe Hintersteiner Gallery, New York' },
  { y: 2019, t: 'La forma del pensamiento', p: 'Colegio Dominicano de Artistas Plásticos, Santo Domingo' },
  { y: 2021, t: 'Memoria del Psico-Expresionismo', p: 'Museo Abreu, Bávaro' },
  { y: 2023, t: 'Por el Amor de Dios', p: 'Eden Roc Cap Cana' },
];

// Critics quoted in the front matter of ECCE HOMO (English edition).
const QUOTES = [
  { q: 'Oscar Abreu chooses the human figure as his visual alphabet, developing through its graphic deconstruction an intense form of painting that materializes as an outpouring of emotions.', a: 'Abil Peralta Agüero', r: 'Art critic and curator, 1998' },
  { q: 'Between figuration and abstraction, Oscar Abreu searches for—and finds—a point at which the exploration of form opens the door to a conceptual balance between the two.', a: 'José Saldaña', r: 'Oscar Abreu: Psycho-Expressionism, 1998' },
  { q: 'In Oscar Abreu’s work, the divide between the figurative and the abstract has disappeared.', a: 'Marianne de Tolentino', r: 'ADCA/AICA, 2016' },
  { q: 'Oscar’s Psycho-Expressionism belongs to another moment; it is inherent in who he is.', a: 'Gamal Michelén', r: 'Oscar Abreu and Psycho-Expressionism, 2021' },
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

function coverSVG(title, sub) {
  return `<svg viewBox="0 0 400 600" role="img" aria-label="${title}">${artLayer(5, 0).replace('height="500"', 'height="600"')}${artLayer(5, 2)}
    <rect y="400" width="400" height="200" fill="#16120f"/>
    <text x="28" y="462" fill="#f6f1e9" font-family="Cormorant Garamond, serif" font-size="52" font-weight="600" letter-spacing="2">ECCE HOMO</text>
    <text x="28" y="500" fill="#e9dfd0" font-family="Cormorant Garamond, serif" font-size="24" font-style="italic">${sub}</text>
    <text x="28" y="556" fill="#f59e6b" font-family="Work Sans, sans-serif" font-size="16" letter-spacing="4">OSCAR ABREU</text></svg>`;
}

// Manifesto as published on oscarabreu.com (English version, transcribed from
// screenshots supplied by the family). The Spanish version is pending.
const MANIFESTO = {
  title: 'The Urgency to Create: Art as Revelation',
  source: 'oscarabreu.com',
  en: [
    'I did not choose art; art chose me. It cut through me as a medium, a battleground, a refuge. Since childhood I felt an untamable energy that found no containment in the visible. An inner urgency pressing to turn the intangible into image, the repressed into form. That impulse was—and remains—the vital engine of my existence.',
    'This manifesto is not a traditional autobiography nor a catalogue of works. It is an emotional map. Each word answers an image, and each image echoes a lived experience that needed to be transfigured. In that act of creation I found meaning in chaos, music in fracture, and beauty in what is raw and non-decorative. As Jung wrote: “Who looks outside, dreams; who looks inside, awakes.” That awakening does not soothe—it shocks. And there, the authentic is born.',
    'The Psycho-Expressionism I propose is neither a technique nor a school: it is a way of being in the world. An expressive ethics assumed from vulnerability and lucidity. I do not seek to represent what we see, but what we feel. My visual language is made of stains, silences, breaks and gestures; between the spontaneous and the deliberate a fissure opens where the soul appears.',
    'Although my work springs from the autobiographical, its vocation is to expand toward the collective. It does not remain a private confession: it seeks universal resonance. In each piece there is pain, but also wonder. There is desire, but also contemplation. And above all, there is truth—not an objective truth, but an embodied one: emotional, symbolic, profoundly human.',
    'This manifesto is also an offering—to those who shaped me, to the symbols that accompany me, and to those who seek in art a language when words fall short. More than a career, what I share here is a way to resist oblivion, to turn the wound into memory and memory into sign.',
    'I did not write this book to please. I wrote it to move. To open questions. To stir what we thought asleep. The art that interests me does not decorate: it challenges. It does not explain: it suggests. It does not console: it awakens.',
    'Whoever crosses this threshold will not find closed answers. But perhaps—between these words and these forms—will find a reflection of themselves.',
    'Because art—when it is true—does not speak from the outside.',
    'It speaks from the abyss.',
    'And it reveals us.',
  ],
};
