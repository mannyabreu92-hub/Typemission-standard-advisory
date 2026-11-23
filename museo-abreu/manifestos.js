// Manifestos 3–23 as published on oscarabreu.com/manifiesto/N.html, in the
// artist's Spanish, English and French versions. A block is a paragraph (string), a
// heading { h }, a quotation { q } or a list { ul }. `work` is the image that
// opens each manifesto on the site (oscarabreu.com/gallery4/N.JPG); all share
// the site's spec: mixed media on paper, 24 × 24 in, 2019. img is null where
// the site links to a file that does not exist (manifestos 16–23).
const MANIFESTO_WORKS = [
  { id: 'g71', img: 'img/manifestos/71.jpg', spec: SPEC_PAPER, title: { es: 'Siluetas de Identidad', en: 'Identity Silhouettes', fr: 'Silhouettes d’identité' } },
  { id: 'g76', img: 'img/manifestos/76.jpg', spec: SPEC_PAPER, title: { es: 'Memoria de un Retrato', en: 'Memory of a Portrait', fr: 'Mémoire d’un portrait' } },
  { id: 'g81', img: 'img/manifestos/81.jpg', spec: SPEC_PAPER, title: { es: 'Amnesia', en: 'Amnesia', fr: 'Amnésie' } },
  { id: 'g86', img: 'img/manifestos/86.jpg', spec: SPEC_PAPER, title: { es: 'El Olvido Progresivo', en: 'Progressive Forgetting', fr: 'L’oubli progressif' } },
  { id: 'g91', img: 'img/manifestos/91.jpg', spec: SPEC_PAPER, title: { es: 'El Desgaste del Tiempo', en: 'The Wear of Time', fr: 'L’usure du temps' } },
  { id: 'g96', img: 'img/manifestos/96.jpg', spec: SPEC_PAPER, title: { es: 'Los Pasillos Vacíos', en: 'Empty Corridors', fr: 'Les couloirs vides' } },
  { id: 'g101', img: 'img/manifestos/101.jpg', spec: SPEC_PAPER, title: { es: 'La Enfermedad del Olvido', en: 'The Disease of Forgetting', fr: 'La maladie de l’oubli' } },
  { id: 'g106', img: 'img/manifestos/106.jpg', spec: SPEC_PAPER, title: { es: 'El Silencio de la Memoria', en: 'The Silence of Memory', fr: 'Le silence de la mémoire' } },
  { id: 'g111', img: 'img/manifestos/111.jpg', spec: SPEC_PAPER, title: { es: 'La Brecha de la Mente', en: 'The Mind’s Breach', fr: 'La brèche de l’esprit' } },
  { id: 'g116', img: 'img/manifestos/116.jpg', spec: SPEC_PAPER, title: { es: 'Desvanecimiento', en: 'Fading', fr: 'Effacement' } },
  { id: 'g121', img: 'img/manifestos/121.jpg', spec: SPEC_PAPER, title: { es: 'El Archivo del Dolor', en: 'The Archive of Pain', fr: 'Les archives de la douleur' } },
  { id: 'g126', img: 'img/manifestos/126.jpg', spec: SPEC_PAPER, title: { es: 'Marcas Invisibles', en: 'Invisible Marks', fr: 'Marques invisibles' } },
  { id: 'g131', img: 'img/manifestos/131.jpg', spec: SPEC_PAPER, title: { es: 'El Peso del Trauma', en: 'The Weight of Trauma', fr: 'Le poids du traumatisme' } },
  { id: 'g161', img: null, spec: SPEC_PAPER, title: { es: 'El Pasado que No Pasa', en: 'The Past That Won’t Pass', fr: 'Le passé qui ne passe pas' } },
  { id: 'g171', img: null, spec: SPEC_PAPER, title: { es: 'La Herida Invisible', en: 'The Invisible Wound', fr: 'La blessure invisible' } },
  { id: 'g181', img: null, spec: SPEC_PAPER, title: { es: 'Trauma en Espiral', en: 'Spiral Trauma', fr: 'Traumatisme en spirale' } },
  { id: 'g191', img: null, spec: SPEC_PAPER, title: { es: 'El Pasado Encadenado', en: 'The Chained Past', fr: 'Le passé enchaîné' } },
  { id: 'g201', img: null, spec: SPEC_PAPER, title: { es: 'Ruinas Traumáticas', en: 'Traumatic Ruins', fr: 'Ruines traumatiques' } },
  { id: 'g211', img: null, spec: SPEC_PAPER, title: { es: 'El Gran Vacío', en: 'The Great Void', fr: 'Le Grand Vide' } },
  { id: 'g221', img: null, spec: SPEC_PAPER, title: { es: 'El Retorno de un Recuerdo', en: 'The Return of a Memory', fr: 'Le retour d’un souvenir' } },
  { id: 'g231', img: null, spec: SPEC_PAPER, title: { es: 'El Archivo Recuperado', en: 'The Recovered Archive', fr: 'L’archive retrouvée' } },
];

// Titles only; the text is in manifestos-text.js, loaded when a manifesto is opened.
const MANIFESTOS_MORE = [
  { n: 3, work: 'g71', source: 'oscarabreu.com', title: { es: 'Nacimiento del Psico-Expresionismo', en: 'Birth of Psycho-Expressionism', fr: 'Naissance du Psycho-Expressionnisme' } },
  { n: 4, work: 'g76', source: 'oscarabreu.com', title: { es: 'Manifiesto del Psico-Expresionismo', en: 'Manifesto of Psycho-Expressionism', fr: 'Manifeste du Psycho-Expressionnisme' } },
  { n: 5, work: 'g81', source: 'oscarabreu.com', title: { es: 'Color, símbolo y memoria: principios filosóficos del Psico-Expresionismo', en: 'Color, Symbol, and Memory: Philosophical Principles of Psycho-Expressionism', fr: 'Couleur, symbole et mémoire : principes philosophiques du Psycho-Expressionnisme' } },
  { n: 6, work: 'g86', source: 'oscarabreu.com', title: { es: 'Estética y técnica del Psico-Expresionismo', en: 'Aesthetics and Technique of Psycho-Expressionism', fr: 'Esthétique et technique du Psycho-Expressionnisme' } },
  { n: 7, work: 'g91', source: 'oscarabreu.com', title: { es: 'El rol del espectador: presencia, espejo y revelación', en: 'The Role of the Viewer: Presence, Mirror, and Revelation', fr: 'Le rôle du spectateur : présence, miroir et révélation' } },
  { n: 8, work: 'g96', source: 'oscarabreu.com', title: { es: 'El papel: protagonista silencioso del Psico-Expresionismo', en: 'Paper: the Silent Protagonist of Psycho-Expressionism', fr: 'Le papier : protagoniste silencieux du Psycho-Expressionnisme' } },
  { n: 9, work: 'g101', source: 'oscarabreu.com', title: { es: 'El color como aliento, la forma como testigo', en: 'Color as Breath, Form as Witness', fr: 'La couleur comme souffle, la forme comme témoin' } },
  { n: 10, work: 'g106', source: 'oscarabreu.com', title: { es: 'El trazo que recuerda, la mancha que sueña', en: 'The Line that Remembers, the Stain that Dreams', fr: 'Le trait qui se souvient, la tache qui rêve' } },
  { n: 11, work: 'g111', source: 'oscarabreu.com', title: { es: 'Lo que el alma calla, la obra revela', en: 'What the Soul Keeps Silent, the Work Reveals', fr: 'Ce que l’âme tait, l’œuvre le révèle' } },
  { n: 12, work: 'g116', source: 'oscarabreu.com', title: { es: 'Habitar la grieta', en: 'Inhabiting the Rift', fr: 'Habiter la faille' } },
  { n: 13, work: 'g121', source: 'oscarabreu.com', title: { es: 'Fragmentos de lo invisible: el Psico-Expresionismo como espejo compartido', en: 'Fragments of the Invisible: Psycho-Expressionism as a Shared Mirror', fr: 'Fragments de l’invisible : le Psycho-Expressionnisme comme miroir partagé' } },
  { n: 14, work: 'g126', source: 'oscarabreu.com', title: { es: 'El cuerpo como herida y ritual: la piel simbólica en mi Psico-Expresionismo', en: 'The Body as Wound and Ritual: The Symbolic Skin in My Psycho-Expressionism', fr: 'Le corps comme blessure et rituel : la peau symbolique dans mon Psycho-Expressionnisme' } },
  { n: 15, work: 'g131', source: 'oscarabreu.com', title: { es: 'La metáfora de mí mismo', en: 'The Metaphor of Myself', fr: 'La métaphore de moi-même' } },
  { n: 16, work: 'g161', source: 'oscarabreu.com', title: { es: 'El espectador como espejo: la obra abierta en mi Psico-Expresionismo', en: 'The Spectator as Mirror: The Open Work in my Psycho-Expressionism', fr: 'Le spectateur comme miroir : l’œuvre ouverte dans mon Psycho-Expressionnisme' } },
  { n: 17, work: 'g171', source: 'oscarabreu.com', title: { es: 'Obras fundamentales: fragmentos de mi alma visual', en: 'Foundational Works: Fragments of My Visual Soul', fr: 'Œuvres fondamentales : fragments de mon âme visuelle' } },
  { n: 18, work: 'g181', source: 'oscarabreu.com', title: { es: 'Latinoamérica en mi sangre: resonancias y diferencias', en: 'Latin America in My Blood: Resonances and Differences', fr: 'L’Amérique latine dans mon sang : résonances et différences' } },
  { n: 19, work: 'g191', source: 'oscarabreu.com', title: { es: 'Psicología del color en el Psico-Expresionismo', en: 'Psychology of Color in Psycho-Expressionism', fr: 'Psychologie de la couleur dans le Psycho-Expressionnisme' } },
  { n: 20, work: 'g201', source: 'oscarabreu.com', title: { es: 'Mapa conceptual de mi Psico-Expresionismo', en: 'Conceptual Map of my Psycho-Expressionism', fr: 'Carte conceptuelle de mon Psycho-Expressionnisme' } },
  { n: 21, work: 'g211', source: 'oscarabreu.com', title: { es: 'El futuro del Psico-Expresionismo: semilla, eco y posibilidad', en: 'The Future of Psycho-Expressionism: Seed, Echo, and Possibility', fr: 'L’avenir du Psycho-Expressionnisme : graine, écho et possibilité' } },
  { n: 22, work: 'g221', source: 'oscarabreu.com', title: { es: 'El arte como permanencia del alma', en: 'Art as the Permanence of the Soul', fr: 'L’art comme permanence de l’âme' } },
  { n: 23, work: 'g231', source: 'oscarabreu.com', title: { es: 'Hacia el abismo luminoso del arte', en: 'Toward the Luminous Abyss of Art', fr: 'Vers l’abîme lumineux de l’art' } },
];
