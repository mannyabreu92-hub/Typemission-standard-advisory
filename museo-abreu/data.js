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

// Technical data as published on oscarabreu.com. The miniatures series
// (oscarabreu.com/museo) and the manifesto works (oscarabreu.com/statement,
// /manifiesto/2.html) each share one spec.
const SPEC_MINI = { es: ['2021', 'Técnica mixta sobre MDF', '8 × 8 in (20.32 × 20.32 cm)'], en: ['2021', 'Mixed media on MDF', '8 × 8 in (20.32 × 20.32 cm)'],
  series: { es: 'Serie miniaturas del Psico Expresionismo', en: 'Psycho-Expressionism Miniatures Series' } };
const SPEC_PAPER = { es: ['2019', 'Técnica mixta sobre papel', '24 × 24 pulgadas'], en: ['2019', 'Mixed media on paper', '24 × 24 in'] };

// Works shown on oscarabreu.com, with the original image files from the site.
// "sold" follows the miniatures page (sold: 1, 9, 14, 17, 18).
const WORKS = [
  { id: 'escaping-being', seed: 11, img: 'img/escaping-being.jpg', spec: SPEC_PAPER, title: { es: 'El Ser que se Escapa', en: 'The Escaping Being' } },
  { id: 'passion', seed: 23, img: 'img/passion.jpg', spec: SPEC_MINI, sold: true, title: { es: 'Pasión', en: 'Passion' } },
  { id: 'petrichor', seed: 37, img: 'img/petrichor.jpg', spec: SPEC_MINI, title: { es: 'Petricor', en: 'Petrichor' } },
  { id: 'resilience', seed: 41, img: 'img/resilience.jpg', spec: SPEC_MINI, title: { es: 'Resiliencia', en: 'Resilience' } },
  { id: 'limerence', seed: 59, img: 'img/limerence.jpg', spec: SPEC_MINI, title: { es: 'Limerencia', en: 'Limerence' } },
  // Shown on the Biography page; no technical data published for it.
  { id: 'echoes-of-memory', seed: 67, img: 'img/echoes-of-memory.jpg', title: { es: 'Ecos de la memoria', en: 'Echoes of Memory' } },
  { id: 'time-on-my-face', seed: 71, img: 'img/time-on-my-face.jpg', spec: SPEC_PAPER, title: { es: 'El Tiempo en mi Rostro', en: 'Time on My Face' } },
];

// oscarabreu.com/paintings, /drawings and /sculpture: works published by number
// only (no titles or data). Sculptures are files 37–48 on the site, shown as 1–12.
// Drawings 16–18 and 33 repeat 3, 2, 1 and 6 on the site; kept as published.
const numbered = (count, dir) => Array.from({ length: count }, (_, i) => ({ n: i + 1, img: `img/${dir}/${i + 1}.jpg` }));
const PAINTINGS = numbered(36, 'paintings');
const DRAWINGS = numbered(36, 'drawings');
const SCULPTURES = numbered(12, 'sculpture');

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

// Major exhibitions as listed on oscarabreu.com (Biography page); `pes` is the
// Spanish place name where it differs.
const EXHIBITIONS = [
  { y: 1996, t: 'El mal de las drogas', p: 'Riverside Arts Center, Illinois' },
  { y: 1999, t: 'Mira a través de mis ojos', p: 'Casa Dominicana, Chicago' },
  { y: 1999, t: 'Resaca de la existencia', p: 'Truman College, Chicago' },
  { y: 2004, t: 'Huellas: La invención de lo visible', p: 'Museo del Hombre Dominicano, Santo Domingo' },
  { y: 2005, t: 'La forma de la música', p: 'Sofitel Nicolás de Ovando, Santo Domingo' },
  { y: 2005, t: 'Acontecimientos del espíritu', p: 'Galerías Prinardi, Puerto Rico' },
  { y: 2005, t: 'Comportamiento de la memoria', p: 'Alianza Art Gallery, New York', pes: 'Alianza Art Gallery, Nueva York' },
  { y: 2006, t: 'Punishment of Memory', p: 'Joe Hintersteiner Gallery, New York', pes: 'Joe Hintersteiner Gallery, Nueva York' },
  { y: 2006, t: 'Detachment of the Ego', p: 'Marwen Foundation, Chicago / Alianza Art Gallery, New York', pes: 'Marwen Foundation, Chicago / Alianza Art Gallery, Nueva York' },
  { y: 2006, t: 'Generaciones', p: 'Ozamarte Centro de Arte Contemporáneo, Santo Domingo' },
  { y: 2009, t: 'Ironically Absurd', p: 'Alliance Française, Santo Domingo', pes: 'Alianza Francesa, Santo Domingo' },
  { y: 2009, t: 'Agitación de la memoria', p: 'Centro Abreu, Santo Domingo' },
  { y: 2019, t: 'La forma del pensamiento', p: 'CODAP, Santo Domingo' },
  { y: 2019, t: 'Razonamiento de la Identidad', p: 'Altos de Chavón Gallery, Casa de Campo', pes: 'Galería Altos de Chavón, Casa de Campo' },
  { y: 2021, t: 'Memoria del Psico-Expresionismo', p: 'Abreu Museum, Punta Cana', pes: 'Museo Abreu, Punta Cana' },
  { y: 2024, t: 'Luxura', p: 'Abreu Museum, Punta Cana', pes: 'Museo Abreu, Punta Cana' },
];

// Official biography from oscarabreu.com/biography, Spanish and English
// versions as published (critics' links removed).
const BIO_SITE = {
  source: 'oscarabreu.com',
  en: {
    intro: 'Oscar Abreu (San Juan de la Maguana, Dominican Republic, 1978) has been regarded since 2021 as the most highly valued living artist in the Dominican Republic, after one of his works reached a record price of USD 200,000. With more than three decades of practice, Abreu has developed his own language: Psycho-Expressionism, inspired by Freudian psychoanalysis and focused on exploring memory, identity, and the human psyche through layers of color, collage, symbols, and textures.',
    circuit: 'These exhibitions have consolidated his presence in New York, Chicago, Puerto Rico, Santo Domingo, and Punta Cana, positioning his work within a diverse international circuit.',
    recognition: [
      'His work has been analyzed by influential critics such as Candido Geron, Abil Peralta Agüero (Memoria del Psico-Expresionismo, 2018), Odalís G. Pérez, Fernando Morbán Laucer, Laura Gil, Gamal Michelen, and Marianne de Tolentino, who have emphasized the originality, expressive power, and psychological depth of his proposal.',
      'In parallel with his artistic production, Abreu has developed significant work as a cultural organizer. In 2000 he founded Artep Magazine; in 2014 he created ARTFORO —which became an international fair—; and in 2021 he inaugurated the Abreu Museum, a space dedicated to consecrating contemporary Dominican art.',
    ],
    legacy: 'With boldness and originality, Oscar Abreu has turned Psycho-Expressionism into a visual and philosophical movement that goes beyond painting. Exhibited in museums and private collections across the United States, the Caribbean and Europe, his work stands as a landmark of contemporary Dominican art and a cultural bridge between the Dominican Republic and its global diaspora.',
  },
  es: {
    intro: 'Oscar Abreu (San Juan de la Maguana, República Dominicana, 1978) es considerado desde 2021 el artista vivo más cotizado de la República Dominicana, tras alcanzar un récord de 200,000 dólares por una de sus obras. Con más de tres décadas de trayectoria, Abreu ha desarrollado un lenguaje propio: el Psico-Expresionismo, inspirado en el psicoanálisis freudiano y centrado en la exploración de la memoria, la identidad y la psicología humana mediante capas de color, collages, símbolos y texturas.',
    circuit: 'Estas exposiciones han consolidado su proyección en Nueva York, Chicago, Puerto Rico, Santo Domingo y Punta Cana, posicionando su obra en un circuito internacional diverso.',
    recognition: [
      'Su obra ha sido objeto de análisis por influyentes críticos como Candido Geron, Abil Peralta Agüero (Memoria del Psico-Expresionismo, 2018), Odalís G. Pérez, Fernando Morbán Laucer, Laura Gil, Gamal Michelen y Marianne de Tolentino, quienes han subrayado la originalidad, la fuerza expresiva y el trasfondo psicológico de su propuesta.',
      'Paralelamente a su producción artística, Abreu ha desarrollado una importante labor como gestor cultural. En 2000 fundó la revista Artep Magazine, en 2014 creó ARTFORO —convertida en feria internacional— y en 2021 inauguró el Museo Abreu, un espacio dedicado a consagrar el arte contemporáneo dominicano.',
    ],
    legacy: 'Con valentía y originalidad, Oscar Abreu ha convertido el Psico-Expresionismo en un movimiento visual y filosófico que va más allá de la pintura. Su obra, exhibida en museos y colecciones privadas en Estados Unidos, el Caribe y Europa, constituye un referente del arte dominicano contemporáneo y un puente cultural entre la República Dominicana y la diáspora internacional.',
  },
};

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

// Manifestos as published on oscarabreu.com (/statement and /manifiesto/2.html),
// in the artist's own Spanish and English versions. `work` is the image that
// opens each one on the site.
const MANIFESTO = {
  title: { es: 'La urgencia de crear: el arte como revelación', en: 'The Urgency to Create: Art as Revelation' },
  source: 'oscarabreu.com', work: 'escaping-being',
  es: [
    'No fui yo quien eligió al arte; fue el arte quien me eligió. Me atravesó como médium, como campo de batalla, como refugio. Desde la infancia sentí una energía indomable que no encontraba contención en lo visible. Una urgencia interior que exigía transformar lo intangible en imagen, lo reprimido en forma. Ese impulso fue —y sigue siendo— el motor vital de mi existencia.',
    'Este manifiesto no es una autobiografía tradicional ni un catálogo de obras. Es un mapa emocional. Cada palabra responde a una imagen, y cada imagen es el eco de una experiencia vivida que necesitó ser transfigurada. En ese acto de creación encontré sentido en el caos, música en la fractura, y belleza en lo crudo, en lo no decorativo. Como escribió Jung: “Quien mira hacia dentro, despierta.” Ese despertar no calma: conmociona. Y es ahí donde nace lo auténtico.',
    'El Psico-Expresionismo que propongo no es una técnica ni una corriente: es una forma de estar en el mundo. Una ética expresiva asumida desde la vulnerabilidad y la lucidez. No busco representar lo que vemos, sino lo que sentimos. Mi lenguaje visual se compone de manchas, silencios, quiebres y gestos; entre lo espontáneo y lo deliberado se abre una grieta por donde se asoma el alma.',
    'Aunque mi obra nace desde lo autobiográfico, su vocación es expandirse hacia lo colectivo. No se queda en la confesión íntima: busca resonancia universal. En cada pieza hay dolor, pero también asombro. Hay deseo, pero también contemplación. Y por encima de todo, hay verdad. No una verdad objetiva, sino una verdad encarnada: emocional, simbólica, profundamente humana.',
    'Este manifiesto es también una ofrenda. A quienes me formaron, a los símbolos que me acompañan, y a quienes buscan en el arte un lenguaje cuando la palabra no alcanza. Más que una trayectoria artística, lo que aquí comparto es una forma de resistir al olvido, de transformar la herida en memoria y la memoria en signo.',
    'No escribí este libro para complacer. Lo hice para conmover. Para abrir preguntas. Para agitar lo que creíamos dormido. El arte que me interesa no adorna: interpela. No explica: sugiere. No consuela: despierta.',
    'Quien cruce esta puerta no encontrará respuestas cerradas. Pero quizá —entre estas palabras y estas formas— encuentre un reflejo de sí mismo.',
    'Porque el arte —cuando es verdadero— no habla desde afuera.',
    'Habla desde el abismo.',
    'Y nos revela.',
  ],
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

const MANIFESTO2 = {
  title: { es: 'El trazo como origen', en: 'The Stroke as Origin' },
  source: 'oscarabreu.com', work: 'time-on-my-face',
  es: [
    'Tenía apenas tres años. No sabía escribir, pero ya dibujaba. Un palo en la mano. La tierra como lienzo.',
    'El patio polvoriento de casa de mis abuelos, en San Juan de la Maguana —al sur de la República Dominicana— era, sin saberlo, mi primer taller.',
    'Pasaba horas trazando figuras sobre el suelo húmedo, abstraído, concentrado, como si en cada línea se me fuera algo del alma.',
    'Nadie me lo enseñó. Nadie me lo pidió. Pero yo dibujaba. Porque lo necesitaba.',
    '«El alma se alimenta de símbolos» — Carl G. Jung',
    'Más adelante, mis libretas escolares terminaron cubiertas de dibujos: márgenes llenos, páginas saturadas. No era entretenimiento: era forma de existir.',
    'Un impulso que me brotaba del cuerpo sin explicación. Como si intentara comunicarme con algo más antiguo, más profundo que yo.',
    'Mi familia materna, sin formación académica, no sabía qué hacer con eso. Les parecía curioso, incluso gracioso. Me dejaban solo con mis líneas y mis mundos inventados.',
    'Pero para mí no era un juego: era afirmación. Era urgencia. Era respirar con la mano.',
    'Recuerdo una habitación especial en casa de mi abuela: la habitación de los santos. Sobre una mesa, un vaso con agua, vírgenes, oraciones, incienso.',
    'Había una imagen que me hipnotizaba: San Miguel Arcángel, espada en mano, aplastando al diablo con firmeza celestial. Yo intentaba copiarla una y otra vez.',
    'No me interesaban los detalles religiosos. Lo que me impactaba era la lucha: ese combate silencioso entre luz y oscuridad, esa tensión grabada en el gesto del arcángel.',
    '«Uno no se ilumina imaginando figuras de luz, sino haciendo consciente la oscuridad» — Carl G. Jung',
    'Sin saberlo, ya estaba representando una batalla interna. Estaba dibujando mis sombras: mi miedo, mi deseo, mi culpa.',
    'Esa imagen se volvió símbolo. Y los símbolos, con los años, se convirtieron en mi idioma.',
    'Cada trazo en la tierra, cada dibujo en papel, era una forma primitiva de hacer memoria. De darle cuerpo a lo que no podía nombrar. Un lenguaje secreto de gestos, colores y silencios.',
    'Años después entendería que ese era el germen de mi Psico-Expresionismo: una práctica nacida del aislamiento, la intuición y el deseo de mirar hacia adentro.',
    '«Conocer tu propia oscuridad es el mejor método para enfrentar la oscuridad de otras personas» — Carl G. Jung',
    'No escribo este libro para contar anécdotas. Lo escribo porque el arte me salvó. Porque cuando no sabía quién era, el arte me sostuvo.',
    'Cuando todo se quebraba, el arte era la grieta por donde volvía a entrar la luz.',
    'El Psico-Expresionismo no es una teoría que diseñé: es una forma de respirar. De resistir. De comprender la experiencia humana desde sus capas más invisibles.',
    'Es mi forma de vivir y de compartir mi verdad.',
    'Este libro no es académico ni una autobiografía convencional: es un manifiesto emocional, una cartografía simbólica.',
    'Escribo para trazar el camino recorrido y para ofrecer un mapa a quien necesite reencontrarse con su memoria.',
    'Quiero que estas páginas funcionen como una llave, una invitación, una grieta luminosa por donde otros puedan asomarse a sí mismos.',
  ],
  en: [
    'I was barely three years old. I couldn’t write yet, but I was already drawing. A stick in my hand. The earth as canvas.',
    'The dusty patio at my grandparents’ home in San Juan de la Maguana—south of the Dominican Republic—was, without my knowing, my first studio.',
    'I spent hours tracing figures on the damp ground, absorbed and focused, as if each line carried away a piece of my soul.',
    'No one taught me. No one asked me. But I drew—because I needed to.',
    '“The soul feeds on symbols.” — Carl G. Jung',
    'Later, my school notebooks ended up covered in drawings: margins filled, pages saturated. It wasn’t entertainment—it was a way of existing.',
    'An impulse welling up from the body without explanation, as if I were trying to speak with something older and deeper than myself.',
    'My mother’s family, without academic training, didn’t know what to do with it. They found it curious, even funny. They left me alone with my lines and invented worlds.',
    'But for me it wasn’t a game: it was affirmation. Urgency. Breathing with the hand.',
    'I remember a special room in my grandmother’s house: the room of the saints. On a table, a glass of water, images of virgins, prayers, incense.',
    'There was one image that hypnotized me: Saint Michael the Archangel, sword in hand, crushing the devil with celestial resolve. I tried to copy it over and over.',
    'I wasn’t interested in religious detail. What struck me was the struggle—the silent combat between light and darkness, the tension engraved in the archangel’s gesture.',
    '“One does not become enlightened by imagining figures of light, but by making the darkness conscious.” — Carl G. Jung',
    'Unknowingly, I was already depicting an inner battle—drawing my shadows: fear, desire, guilt.',
    'That image became a symbol. And symbols, over the years, became my language.',
    'Each line on earth, each drawing on paper, was a primitive way of making memory—giving body to what I could not name—a secret language of gestures, colors, and silences.',
    'Years later I would understand this was the seed of my Psycho-Expressionism: a practice born of isolation, intuition, and the deep urge to look inward.',
    '“Knowing your own darkness is the best method for dealing with the darkness of other people.” — Carl G. Jung',
    'I’m not writing this book to tell anecdotes. I write it because art saved me. When I didn’t know who I was, art held me.',
    'When everything broke, art was the crack through which the light entered again.',
    'Psycho-Expressionism is not a theory I designed—it is a way to breathe. To resist. To grasp human experience in its most invisible layers.',
    'It is my way of living and sharing my truth.',
    'This book is neither academic nor a conventional autobiography: it is an emotional manifesto, a symbolic cartography.',
    'I write to trace the path traveled and to offer a map to anyone who needs to rediscover their memory.',
    'May these pages work as a key, an invitation—a luminous fissure through which others might glimpse themselves.',
  ],
};

// Reviews as published on oscarabreu.com/reviews (Spanish and English). Only
// Cándido Gerón's full text is online (oscarabreu.com/candidogeron); the site's
// links for the other critics return 404, so they are left out.
const REVIEWS = {
  title: { es: 'Reseñas', en: 'Reviews' },
  intro: { es: 'Lecturas críticas sobre la obra de Oscar Abreu por parte de historiadores y críticos de arte.', en: 'Critical readings of Oscar Abreu’s work by art historians and leading critics.' },
  items: [
    { critic: 'Marianne de Tolentino', year: '2004',
      es: 'Esta actitud formal concuerda con inquietudes humanistas y la creación de personajes “sobrevivientes y testigos” —así los califica el propio artista— comprometidos con su historia y comprometiendo la reflexión del espectador. Si no representa ni imita, Oscar Abreu sugiere e “inventa lo visible”, acorde con la propuesta del filósofo francés Henri Meschonnic acerca de la escritura y de la pintura: “Inventa otra cosa que el sentido. Y que tenga sentido.”',
      en: 'This formal attitude aligns with humanist concerns and with the creation of characters—“survivors and witnesses,” as the artist himself calls them—committed to their history and engaging the viewer’s reflection. Rather than representing or imitating, Oscar Abreu suggests and “invents the visible,” in keeping with the French philosopher Henri Meschonnic’s proposal regarding writing and painting: “Invent something other than meaning. And let it make sense.”' },
    { critic: 'Abil Peralta', year: '1998',
      es: 'Oscar Abreu, aplica con sensibilidad y raciocinio una cromática deliberadamente anárquica en su exposición, sin dejarla desbordar hasta el esquizoide estado del abigarramiento, demostrando así poseer un ojo cromático de conciencia severa y fría, a pesar de la turbulencia y energía que emiten y transmiten hasta el ojo espectador las líneas de su dibujo vibrante y suelto.',
      en: 'With sensitivity and reason, Oscar Abreu applies a deliberately anarchic chromatic palette, without letting it spill over into a schizoid state of cluttered motley. Thus he shows a chromatic eye marked by a severe, cool awareness, despite the turbulence and energy that the vibrant, free line of his drawing emits and transmits to the viewer.' },
    { critic: 'Abil Peralta Agüero', year: '2004',
      es: 'El diseño constructivo, normado por líneas afirmativas en la que prevalece el negro sobre colores cálidos, hace de la mancha y el accidente matérico una entidad de alta significación simbólica dentro de la lingüística visual de Oscar Abreu, en la que prevalecen como valores semánticos, tanto el valor de la pintura-pintura como lenguaje autónomo, como el valor sociológico del humanismo visceral que connota ante la mirada perceptora el habla interior existencial del propio artista.',
      en: 'The constructive design, governed by assertive lines in which black prevails over warm colors, turns stain and material accident into entities of high symbolic significance within Oscar Abreu’s visual linguistics. There, semantic values include both painting-as-painting as an autonomous language and the sociological value of a visceral humanism that, to the perceiving gaze, connotes the artist’s own interior, existential speech.' },
    { critic: 'Odalís G. Pérez', year: '2003',
      es: 'Indudablemente, el eje narrativo de la creación pictórica de Oscar Abreu traduce la visión transindividual del pintor, habida cuenta de los usos estético-sensibles abarcantes de la forma visual que asegura los bordes y centros de una obra presentificada en lo invisible como narrativa de lo visible.',
      en: 'Undoubtedly, the narrative axis of Oscar Abreu’s pictorial creation translates the painter’s trans-individual vision, given the wide aesthetico-sensitive uses of visual form that ensure the edges and centers of a work—made present within the invisible—become a narrative of the visible.' },
    { critic: 'Odalís G. Pérez', year: '1998',
      es: 'Las imágenes pictóricas de Oscar Abréu puntualizan cierta ontología, onirogestualidad que interpreta la luz, el falso sentido de la realidad que desajusta el vivir planteado y determinado por el artista. La raíz del acto pictórico va articulando todo un proceso desde el cual se unifica el orden de la línea, el punto, las densidades del color y de la forma. No se trata de un discurrir desde la sustancia y el encuadre temático, más bien se trata de un nacimiento del cuerpo alienado por el uso y el contacto corrosivo de los signos.',
      en: 'Oscar Abreu’s pictorial images pinpoint a certain ontology, an oneiric gesturality that interprets light and the false sense of reality that unsettles the life posited and determined by the artist. The root of the pictorial act articulates a process through which the order of line, point, and the densities of color and form are unified. This is not a discourse proceeding from substance and thematic framing; rather, it is the birth of a body alienated by the use and corrosive contact of signs.' },
    { critic: 'José Saldaña', year: '1998',
      es: 'El mundo de Oscar Abreu se aparta de las referencias circunstanciales, de toda anécdota, para decir, exclamar, la concepción agónica y solitaria del individuo al que se refiere en cada uno de sus lienzos. Sugerente, explorador, de lo más inverosímil del ser, con habilidad y destreza precisa en las líneas.',
      en: 'Oscar Abreu’s world leaves aside circumstantial references and anecdote in order to say—indeed to cry out—the agonistic and solitary conception of the individual he addresses in each canvas. Suggestive, exploratory of the most implausible reaches of being, with skill and precise mastery of line.' },
    { critic: 'Fernando Morbán Laucer', year: '1999',
      es: 'La fuerza interpretativa de las obras de Oscar Abreu, en muchos casos, nos recrea los discursos pictóricos del pasado y presente siglo, donde descifrar el código de los símbolos y de las imágenes constituye una tarea que no siempre resulta fácil. Oscar Abreu se abraza en el año de 1994 a lo que él ha llamado Psico-Expresionismo, para con habilidad y talento crear las obras pictóricas de sus experiencias vividas durante diversas etapas de su vida y de distintos personajes, cual si fuera un psicoanalista.',
      en: 'The interpretive force of Oscar Abreu’s works often revisits the pictorial discourses of the past and present century, where deciphering the code of symbols and images is a task that is not always easy. In 1994, Abreu embraced what he called Psycho-Expressionism, and with skill and talent created paintings drawn from lived experiences across stages of his life and from different characters — as if he were a psychoanalyst.' },
    { critic: 'Cándido Gerón', year: '2000', url: 'https://oscarabreu.com/candidogeron/',
      es: 'En realidad, la pintura de Oscar Abreu propone valores plásticos y se ve afectada por todas las vías de expresión. Su diversidad evocadora ensaya ciertos paralelismos sosegados y silentes. En ocasiones, refleja una indulgente ilusión como si naciera desde el recuerdo y, en otros casos, nostálgicas reminiscencias en sus particulares anatemas.',
      en: 'In truth, Oscar Abreu’s painting proposes plastic values and is affected by every avenue of expression. Its evocative diversity essays certain quiet, silent parallelisms. At times it reflects an indulgent illusion, as if born of memory, and in other cases nostalgic reminiscences in his particular anathemas.' },
    { critic: 'Myrna Guerrero', year: '2005',
      es: 'Puede que su discurso resulte ajeno o lejano por cuanto en la tradición pictórica dominicana prevalece la figuración. Sin embargo, no cabe duda de que tenemos que reconocer que estamos ante un artista comprometido con su propio ser y su espacio vital.',
      en: 'His discourse may seem alien or distant insofar as figuration prevails in Dominican pictorial tradition. Nevertheless, there is no doubt that we must acknowledge we are before an artist committed to his own being and vital space.' },
  ],
};

// Press list as published on oscarabreu.com/bibliography: headlines as each
// outlet published them (Spanish), with the site's own summaries in Spanish and English.
const BIBLIOGRAPHY = {
  title: { es: 'Bibliografía y prensa', en: 'Bibliography & Press' },
  intro: { es: 'Selección de artículos, entrevistas y notas recientes sobre Oscar Abreu en medios de referencia.', en: 'A selection of recent articles, interviews, and features on Oscar Abreu from reputable outlets.' },
  note: { es: 'Los titulares se muestran tal como fueron publicados por cada medio. Selección en actualización continua.', en: 'Headlines are shown exactly as originally published by each outlet. Selection updated on a rolling basis.' },
  items: [
    { title: 'Pequeños y medianos formatos de Oscar Abreu en Puerto Rico', outlet: 'Hoy',
      url: 'https://hoy.com.do/pequenos-y-medianos-formatos-de-oscar-abreu-en-puerto-rico/',
      es: 'Cobertura de la muestra de pequeños y medianos formatos presentada en Puerto Rico. El artículo destaca la experimentación material y la continuidad del Psico-Expresionismo en obras recientes, así como la cercanía con el público local. Incluye detalles del montaje y del enfoque curatorial.',
      en: 'Coverage of a presentation of small and medium formats in Puerto Rico. The piece highlights material experimentation and the continuity of Psycho-Expressionism in recent works, as well as a close rapport with local audiences. It also mentions curatorial choices and display.' },
    { title: 'Oscar Abreu: cuando el arte ayuda a los demás', outlet: 'Diario Libre',
      url: 'https://www.diariolibre.com/revista/oscar-abreu-cuando-el-arte-ayuda-a-los-dems-KODL84815',
      es: 'Reporte que pone en primer plano la dimensión social del trabajo de Abreu: iniciativas benéficas, subastas y acciones comunitarias articuladas desde el arte. El medio subraya cómo su práctica conecta sensibilidad estética con impacto real. Un perfil humano y comprometido.',
      en: 'A feature foregrounding the social dimension of Abreu’s practice: charitable initiatives, benefit auctions, and community-driven action. The outlet stresses the bond between aesthetic sensitivity and real-world impact. A humane, committed profile.' },
    { title: 'Oscar Abreu: “El arte salvó mi vida”', outlet: 'Listín Diario', date: '2018-01-13',
      url: 'https://listindiario.com/las-sociales/2018/01/13/498494/oscar-abreu-el-arte-salvo-mi-vida.html',
      es: 'Entrevista y testimonio sobre la trayectoria del artista, donde narra cómo la disciplina y la creación transformaron momentos difíciles. La nota repasa hitos de carrera y motivaciones íntimas. Una lectura valiosa para comprender su ética de trabajo.',
      en: 'Interview and personal account of the artist’s path, reflecting on how discipline and creation transformed difficult moments. The article revisits career milestones and inner motivations. Useful reading to grasp his work ethic.' },
    { title: 'Oscar Abreu deja sus huellas en Trinidad y Tobago', outlet: 'Hoy',
      url: 'https://hoy.com.do/oscar-abreu-deja-sus-huellas-en-trinidad-y-tobago/',
      es: 'Crónica de actividades en Trinidad y Tobago, con énfasis en la pintura en vivo y el intercambio cultural. Se reseña la recepción del público y el diálogo con artistas de la región. La cobertura enfatiza la huella creativa que dejó la visita.',
      en: 'Report from Trinidad & Tobago with emphasis on live painting and cultural exchange. It covers audience reception and dialogue with regional artists. The coverage points to the creative imprint left by the visit.' },
    { title: 'Muestran “Por el amor de Dios” de Oscar Abreu', outlet: 'La Información',
      url: 'https://lainformacion.com.do/tendencias/tendencias/muestran-por-el-amor-de-dios-de-oscar-abreu',
      es: 'Presentación de la serie “Por el amor de Dios”, con comentarios sobre su carga simbólica y su exploración de memoria y espiritualidad. Se mencionan recursos de color y capas texturales característicos. La nota contextualiza la propuesta dentro de su obra.',
      en: 'Presentation of the series “Por el amor de Dios,” noting its symbolic charge and explorations of memory and spirituality. Color strategies and layered textures are discussed. The piece situates the work within his broader production.' },
    { title: 'Oscar Abreu presentará su arte en Alemania', outlet: 'Diario Libre', date: '2025-05-29',
      url: 'https://www.diariolibre.com/revista/cultura/2025/05/29/oscar-abreu-presentara-su-arte-en-alemania/3131395',
      es: 'Anuncio de agenda artística en Alemania, con muestras y presentaciones públicas. La publicación enfatiza el alcance internacional del proyecto y su proyección en el circuito europeo. Un adelanto de itinerario y objetivos.',
      en: 'Announcement of upcoming presentations in Germany, including public events. The article underscores the project’s international scope and projection in the European circuit. A preview of itinerary and goals.' },
    { title: 'Oscar Abreu emociona a Hamburgo con un poderoso performance pictórico', outlet: 'El Nuevo Diario',
      url: 'https://elnuevodiario.com.do/oscar-abreu-emociona-a-hamburgo-con-un-poderoso-performance-pictorico-durante-la-segunda-semana-dominicana-en-alemania/',
      es: 'Reseña del performance pictórico realizado en Hamburgo durante la Semana Dominicana en Alemania. El texto describe la energía del proceso en vivo y la respuesta del público. Señala conexiones con los ejes de memoria e identidad.',
      en: 'Review of a pictorial performance in Hamburg during Dominican Week in Germany. It describes the energy of the live process and the audience’s response, linking it to themes of memory and identity. Immediate impact on site.' },
    { title: 'Oscar Abreu presentará en Miami “Estructura de la memoria”', outlet: 'El Nuevo Diario',
      url: 'https://elnuevodiario.com.do/oscar-abreu-presentara-en-miami-estructura-de-la-memoria/',
      es: 'Anuncio de la exposición “Estructura de la memoria” en Miami, con apuntes curatoriales y claves del Psico-Expresionismo. Se resalta la relevancia del contexto de Miami y su diálogo con la diáspora. Una parada estratégica en su calendario.',
      en: 'Announcement of the Miami show “Structure of Memory,” with curatorial notes and Psycho-Expressionism keys. The relevance of Miami’s context and the dialogue with the diaspora are highlighted. A strategic stop in his calendar.' },
    { title: 'Oscar Abreu, invitado especial y en portada durante Miami Art Week', outlet: 'Diario Hispaniola',
      url: 'https://www.diariohispaniola.com/noticia/17849/entretenimiento-y-cultura/oscar-abreu-invitado-especial-y-en-portada-de-revista-durante-miami-art-week.html',
      es: 'Nota sobre su participación como invitado especial y presencia en portada durante la Miami Art Week. Se subraya la visibilidad que otorga el ecosistema ferial y mediático de la ciudad. Reconocimiento y proyección internacional.',
      en: 'Note on his role as special guest and magazine cover presence during Miami Art Week. It stresses the visibility granted by the fair and media ecosystem. International projection and recognition.' },
    { title: 'Oscar Abreu deslumbra en Alemania con un performance', outlet: 'El Día',
      url: 'https://eldia.com.do/oscar-abreu-deslumbra-en-alemania-con-un-performance/',
      es: 'Cobertura del performance realizado en Alemania, destacando su potencia escénica y el uso de recursos gestuales. El medio resalta la recepción entusiasta y el carácter experimental de la propuesta. Una lectura del impacto inmediato en sala.',
      en: 'Coverage of a performance in Germany, emphasizing gestural force and stage presence. The outlet notes the enthusiastic reception and experimental character of the proposal. A snapshot of its immediate impact.' },
  ],
};
