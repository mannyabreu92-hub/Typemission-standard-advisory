// Manifestos 3–23 as published on oscarabreu.com/manifiesto/N.html, in the
// artist's Spanish and English versions. A block is a paragraph (string), a
// heading { h }, a quotation { q } or a list { ul }. `work` is the image that
// opens each manifesto on the site (oscarabreu.com/gallery4/N.JPG); all share
// the site's spec: mixed media on paper, 24 × 24 in, 2019. img is null where
// the site links to a file that does not exist (manifestos 16–23).
const MANIFESTO_WORKS = [
  { id: 'g71', img: 'img/manifestos/71.jpg', spec: SPEC_PAPER, title: { es: 'Siluetas de Identidad', en: 'Identity Silhouettes' } },
  { id: 'g76', img: 'img/manifestos/76.jpg', spec: SPEC_PAPER, title: { es: 'Memoria de un Retrato', en: 'Memory of a Portrait' } },
  { id: 'g81', img: 'img/manifestos/81.jpg', spec: SPEC_PAPER, title: { es: 'Amnesia', en: 'Amnesia' } },
  { id: 'g86', img: 'img/manifestos/86.jpg', spec: SPEC_PAPER, title: { es: 'El Olvido Progresivo', en: 'Progressive Forgetting' } },
  { id: 'g91', img: 'img/manifestos/91.jpg', spec: SPEC_PAPER, title: { es: 'El Desgaste del Tiempo', en: 'The Wear of Time' } },
  { id: 'g96', img: 'img/manifestos/96.jpg', spec: SPEC_PAPER, title: { es: 'Los Pasillos Vacíos', en: 'Empty Corridors' } },
  { id: 'g101', img: 'img/manifestos/101.jpg', spec: SPEC_PAPER, title: { es: 'La Enfermedad del Olvido', en: 'The Disease of Forgetting' } },
  { id: 'g106', img: 'img/manifestos/106.jpg', spec: SPEC_PAPER, title: { es: 'El Silencio de la Memoria', en: 'The Silence of Memory' } },
  { id: 'g111', img: 'img/manifestos/111.jpg', spec: SPEC_PAPER, title: { es: 'La Brecha de la Mente', en: 'The Mind’s Breach' } },
  { id: 'g116', img: 'img/manifestos/116.jpg', spec: SPEC_PAPER, title: { es: 'Desvanecimiento', en: 'Fading' } },
  { id: 'g121', img: 'img/manifestos/121.jpg', spec: SPEC_PAPER, title: { es: 'El Archivo del Dolor', en: 'The Archive of Pain' } },
  { id: 'g126', img: 'img/manifestos/126.jpg', spec: SPEC_PAPER, title: { es: 'Marcas Invisibles', en: 'Invisible Marks' } },
  { id: 'g131', img: 'img/manifestos/131.jpg', spec: SPEC_PAPER, title: { es: 'El Peso del Trauma', en: 'The Weight of Trauma' } },
  { id: 'g161', img: null, spec: SPEC_PAPER, title: { es: 'El Pasado que No Pasa', en: 'The Past That Won’t Pass' } },
  { id: 'g171', img: null, spec: SPEC_PAPER, title: { es: 'La Herida Invisible', en: 'The Invisible Wound' } },
  { id: 'g181', img: null, spec: SPEC_PAPER, title: { es: 'Trauma en Espiral', en: 'Spiral Trauma' } },
  { id: 'g191', img: null, spec: SPEC_PAPER, title: { es: 'El Pasado Encadenado', en: 'The Chained Past' } },
  { id: 'g201', img: null, spec: SPEC_PAPER, title: { es: 'Ruinas Traumáticas', en: 'Traumatic Ruins' } },
  { id: 'g211', img: null, spec: SPEC_PAPER, title: { es: 'El Gran Vacío', en: 'The Great Void' } },
  { id: 'g221', img: null, spec: SPEC_PAPER, title: { es: 'El Retorno de un Recuerdo', en: 'The Return of a Memory' } },
  { id: 'g231', img: null, spec: SPEC_PAPER, title: { es: 'El Archivo Recuperado', en: 'The Recovered Archive' } },
];

// Titles only; the text is in manifestos-text.js, loaded when a manifesto is opened.
const MANIFESTOS_MORE = [
  { n: 3, work: 'g71', source: 'oscarabreu.com', title: { es: 'Nacimiento del Psico-Expresionismo', en: 'Birth of Psycho-Expressionism' } },
  { n: 4, work: 'g76', source: 'oscarabreu.com', title: { es: 'Manifiesto del Psico-Expresionismo', en: 'Manifesto of Psycho-Expressionism' } },
  { n: 5, work: 'g81', source: 'oscarabreu.com', title: { es: 'Color, símbolo y memoria: principios filosóficos del Psico-Expresionismo', en: 'Color, Symbol, and Memory: Philosophical Principles of Psycho-Expressionism' } },
  { n: 6, work: 'g86', source: 'oscarabreu.com', title: { es: 'Estética y técnica del Psico-Expresionismo', en: 'Aesthetics and Technique of Psycho-Expressionism' } },
  { n: 7, work: 'g91', source: 'oscarabreu.com', title: { es: 'El rol del espectador: presencia, espejo y revelación', en: 'The Role of the Viewer: Presence, Mirror, and Revelation' } },
  { n: 8, work: 'g96', source: 'oscarabreu.com', title: { es: 'El papel: protagonista silencioso del Psico-Expresionismo', en: 'Paper: the Silent Protagonist of Psycho-Expressionism' } },
  { n: 9, work: 'g101', source: 'oscarabreu.com', title: { es: 'El color como aliento, la forma como testigo', en: 'Color as Breath, Form as Witness' } },
  { n: 10, work: 'g106', source: 'oscarabreu.com', title: { es: 'El trazo que recuerda, la mancha que sueña', en: 'The Line that Remembers, the Stain that Dreams' } },
  { n: 11, work: 'g111', source: 'oscarabreu.com', title: { es: 'Lo que el alma calla, la obra revela', en: 'What the Soul Keeps Silent, the Work Reveals' } },
  { n: 12, work: 'g116', source: 'oscarabreu.com', title: { es: 'Habitar la grieta', en: 'Inhabiting the Rift' } },
  { n: 13, work: 'g121', source: 'oscarabreu.com', title: { es: 'Fragmentos de lo invisible: el Psico-Expresionismo como espejo compartido', en: 'Fragments of the Invisible: Psycho-Expressionism as a Shared Mirror' } },
  { n: 14, work: 'g126', source: 'oscarabreu.com', title: { es: 'El cuerpo como herida y ritual: la piel simbólica en mi Psico-Expresionismo', en: 'The Body as Wound and Ritual: The Symbolic Skin in My Psycho-Expressionism' } },
  { n: 15, work: 'g131', source: 'oscarabreu.com', title: { es: 'La metáfora de mí mismo', en: 'The Metaphor of Myself' } },
  { n: 16, work: 'g161', source: 'oscarabreu.com', title: { es: 'El espectador como espejo: la obra abierta en mi Psico-Expresionismo', en: 'The Spectator as Mirror: The Open Work in my Psycho-Expressionism' } },
  { n: 17, work: 'g171', source: 'oscarabreu.com', title: { es: 'Obras fundamentales: fragmentos de mi alma visual', en: 'Foundational Works: Fragments of My Visual Soul' } },
  { n: 18, work: 'g181', source: 'oscarabreu.com', title: { es: 'Latinoamérica en mi sangre: resonancias y diferencias', en: 'Latin America in My Blood: Resonances and Differences' } },
  { n: 19, work: 'g191', source: 'oscarabreu.com', title: { es: 'Psicología del color en el Psico-Expresionismo', en: 'Psychology of Color in Psycho-Expressionism' } },
  { n: 20, work: 'g201', source: 'oscarabreu.com', title: { es: 'Mapa conceptual de mi Psico-Expresionismo', en: 'Conceptual Map of my Psycho-Expressionism' } },
  { n: 21, work: 'g211', source: 'oscarabreu.com', title: { es: 'El futuro del Psico-Expresionismo: semilla, eco y posibilidad', en: 'The Future of Psycho-Expressionism: Seed, Echo, and Possibility' } },
  { n: 22, work: 'g221', source: 'oscarabreu.com', title: { es: 'El arte como permanencia del alma', en: 'Art as the Permanence of the Soul' } },
  { n: 23, work: 'g231', source: 'oscarabreu.com', title: { es: 'Hacia el abismo luminoso del arte', en: 'Toward the Luminous Abyss of Art' } },
];
