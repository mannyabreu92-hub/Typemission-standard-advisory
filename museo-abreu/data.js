// Content and catalogue data. Everything here is placeholder until the museum
// and the artist approve it; in production it comes from the admin panel.
const TZ = 'America/Santo_Domingo';

const EXPERIENCES = [
  {
    id: 'vip', price: 100, capacity: 10, minutes: 75,
    name: { es: 'VIP Tour del museo', en: 'Museum VIP Tour', fr: 'VIP Tour du musée' },
    desc: {
      es: 'Recorrido en grupo reducido con guía autorizado y selección de salas y obras. 60–90 min.',
      en: 'Small-group tour with an authorised guide through selected rooms and works. 60–90 min.', fr: 'Visite en petit groupe avec un guide agréé à travers une sélection de salles et d’œuvres. 60–90 min.',
    },
  },
  {
    id: 'artist', price: 250, capacity: 8, minutes: 90,
    name: { es: 'Encuentro con Oscar Abreu', en: 'Meet Oscar Abreu', fr: 'Rencontre avec Oscar Abreu' },
    desc: {
      es: 'Recorrido o conversación con el artista. Solo en fechas con su participación confirmada.',
      en: 'A tour or conversation with the artist. Only on dates with his confirmed participation.', fr: 'Une visite ou une conversation avec l’artiste. Uniquement aux dates où sa participation est confirmée.',
    },
  },
  {
    id: 'combo', price: 115, capacity: 10, minutes: 75, includesBook: true,
    name: { es: 'Tour y libro digital', en: 'Tour + digital book', fr: 'Visite + livre numérique' },
    desc: {
      es: 'VIP Tour más acceso a una edición digital de El arte me salvó la vida.',
      en: 'VIP Tour plus access to a digital edition of Art Saved My Life.', fr: 'VIP Tour avec accès à une édition numérique de L’art m’a sauvé la vie.',
    },
  },
  {
    id: 'private', price: null,
    name: { es: 'Tour privado', en: 'Private tour', fr: 'Visite privée' },
    desc: {
      es: 'Para parejas, familias, grupos o empresas. Solicitud de disponibilidad y cotización.',
      en: 'For couples, families, groups or companies. Availability request and quote.', fr: 'Pour couples, familles, groupes ou entreprises. Demande de disponibilité et devis.',
    },
  },
];

const LANG_NAMES = {
  es: { es: 'Español', en: 'Spanish', fr: 'Espagnol' },
  en: { es: 'Inglés', en: 'English', fr: 'Anglais' },
  fr: { es: 'Francés', en: 'French', fr: 'Français' },
  de: { es: 'Alemán', en: 'German', fr: 'Allemand' },
  ru: { es: 'Ruso', en: 'Russian', fr: 'Russe' },
  it: { es: 'Italiano', en: 'Italian', fr: 'Italien' },
  pt: { es: 'Portugués', en: 'Portuguese', fr: 'Portugais' },
  ja: { es: 'Japonés', en: 'Japanese', fr: 'Japonais' },
  zh: { es: 'Chino', en: 'Chinese', fr: 'Chinois' },
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
  fr: ['2021', 'Technique mixte sur MDF', '8 × 8 in (20,32 × 20,32 cm)'],
  series: { es: 'Serie miniaturas del Psico Expresionismo', en: 'Psycho-Expressionism Miniatures Series', fr: 'Série Miniatures du Psycho-Expressionnisme' } };
const SPEC_PAPER = { es: ['2019', 'Técnica mixta sobre papel', '24 × 24 pulgadas'], en: ['2019', 'Mixed media on paper', '24 × 24 in'],
  fr: ['2019', 'Technique mixte sur papier', '24 × 24 pouces'] };

// Works shown on oscarabreu.com, with the original image files from the site.
// "sold" follows the miniatures page (sold: 1, 9, 14, 17, 18).
const WORKS = [
  { id: 'escaping-being', seed: 11, img: 'img/escaping-being.jpg', spec: SPEC_PAPER, title: { es: 'El Ser que se Escapa', en: 'The Escaping Being', fr: 'L’Être qui s’échappe' } },
  { id: 'passion', seed: 23, img: 'img/passion.jpg', spec: SPEC_MINI, sold: true, title: { es: 'Pasión', en: 'Passion', fr: 'Passion' } },
  { id: 'petrichor', seed: 37, img: 'img/petrichor.jpg', spec: SPEC_MINI, title: { es: 'Petricor', en: 'Petrichor', fr: 'Pétrichor' } },
  { id: 'resilience', seed: 41, img: 'img/resilience.jpg', spec: SPEC_MINI, title: { es: 'Resiliencia', en: 'Resilience', fr: 'Résilience' } },
  { id: 'limerence', seed: 59, img: 'img/limerence.jpg', spec: SPEC_MINI, title: { es: 'Limerencia', en: 'Limerence', fr: 'Limerence' } },
  // Shown on the Biography page; no technical data published for it.
  { id: 'echoes-of-memory', seed: 67, img: 'img/echoes-of-memory.jpg', title: { es: 'Ecos de la memoria', en: 'Echoes of Memory', fr: 'Échos de la mémoire' } },
  { id: 'time-on-my-face', seed: 71, img: 'img/time-on-my-face.jpg', spec: SPEC_PAPER, title: { es: 'El Tiempo en mi Rostro', en: 'Time on My Face', fr: 'Le temps sur mon visage' } },
];

// "Discover another layer": six paintings by Oscar Abreu on the display cubes at
// the Abreu gallery, straightened from the family's photos. Titles pending (one
// carries the word "Passion"; it is not the miniature "Pasión" in WORKS).
const LAYER_WORKS = ['passion', 'orange', 'yellow', 'mint', 'blue', 'white-bars'].map(id => ({ id, img: `img/layers/${id}.jpg` }));

// oscarabreu.com/paintings, /drawings and /sculpture: works published by number
// only (no titles or data). Sculptures are files 37–48 on the site, shown as 1–12.
// Drawings 16–18 and 33 repeat 3, 2, 1 and 6 on the site; kept as published.
const numbered = (count, dir) => Array.from({ length: count }, (_, i) => ({ n: i + 1, img: `img/${dir}/${i + 1}.jpg` }));
const PAINTINGS = numbered(36, 'paintings');
const DRAWINGS = numbered(36, 'drawings');
const SCULPTURES = numbered(12, 'sculpture');
// oscarabreu.com/photos (three pages, files 3–38, shown as 1–36): event photos
// with no captions, dates or names on the site.
const PHOTOS = numbered(36, 'photos');

const EDITIONS = [
  { lang: 'es', price: 25, status: 'available' },
  { lang: 'en', price: 25, status: 'available' },
  { lang: 'fr', price: 25, status: 'available' },
  { lang: 'de', price: 25, status: 'available' },
  { lang: 'ru', price: 25, status: 'available' },
  { lang: 'it', price: 25, status: 'available' },
  { lang: 'pt', price: 25, status: 'available' },
  { lang: 'ja', price: 25, status: 'available' },
];

// Table of contents of ECCE HOMO. Introduction and Chapter I are the free sample.
const CHAPTERS = [
  { key: 'intro', free: true, title: { es: 'Introducción', en: 'Introduction', fr: 'Introduction', de: 'Einleitung', ru: 'Введение', it: 'Introduzione', pt: 'Introdução', ja: 'はじめに' } },
  ...TOC_EN.nums.map((n, i) => ({
    key: 'ch' + (i + 1), free: i === 0,
    title: { es: 'Capítulo ' + n + ' — ' + TOC_ES.titles[i], en: 'Chapter ' + n + ' — ' + TOC_EN.titles[i], fr: 'Chapitre ' + n + ' — ' + TOC_FR.titles[i], de: 'Kapitel ' + n + ' — ' + TOC_DE.titles[i], ru: 'Глава ' + n + ' — ' + TOC_RU.titles[i], it: 'Capitolo ' + n + ' — ' + TOC_IT.titles[i], pt: 'Capítulo ' + n + ' — ' + TOC_PT.titles[i], ja: TOC_JA.nums[i] + '　' + TOC_JA.titles[i] },
  })),
  { key: 'ack', title: { es: 'Agradecimientos', en: 'Acknowledgments', fr: 'Remerciements', de: 'Danksagung', ru: 'Благодарности', it: 'Ringraziamenti', pt: 'Agradecimentos', ja: '謝辞' } },
  { key: 'chrono', title: { es: 'Cronología biográfica', en: 'Biographical Chronology', fr: 'Chronologie biographique', de: 'Biografische Zeittafel', ru: 'Биографическая хроника', it: 'Cronologia biografica', pt: 'Cronologia biográfica', ja: '年譜' } },
];

// Selected milestones from the book's Biographical Chronology (updated manuscript, 1978–2026).
const TIMELINE = [
  { y: '1978', es: 'Nace el 6 de marzo en San Juan de la Maguana, República Dominicana.', en: 'Born on March 6 in San Juan de la Maguana, Dominican Republic.', fr: 'Naît le 6 mars à San Juan de la Maguana, en République dominicaine.' },
  { y: '1982', es: 'Con sus abuelos en Las Mulas dibuja sobre la tierra y modela figuras con barro tras la lluvia.', en: 'Living with his grandparents in Las Mulas, he draws on the earth and models figures from mud after the rain.', fr: 'Chez ses grands-parents à Las Mulas, il dessine sur la terre et modèle des figures en boue après la pluie.' },
  { y: '1990', es: 'A los doce años visita por primera vez el Museo del Prado, en España.', en: 'At twelve, he visits the Museo del Prado in Spain for the first time.', fr: 'À douze ans, il visite pour la première fois le Museo del Prado, en Espagne.' },
  { y: '1994', es: 'Llega solo a Chicago a los dieciséis años. Ese verano nombra por primera vez el Psico-Expresionismo.', en: 'Arrives alone in Chicago at sixteen. That summer he first names Psycho-Expressionism.', fr: 'Arrive seul à Chicago à seize ans. Cet été-là, il nomme pour la première fois le Psycho-Expressionnisme.' },
  { y: '1996', es: 'El 19 de abril inaugura su primera exposición individual, El mal de las drogas, en el Riverside Arts Center de Illinois.', en: 'On April 19, opens his first solo exhibition, El mal de las drogas, at the Riverside Arts Center in Illinois.', fr: 'Le 19 avril, inaugure sa première exposition personnelle, El mal de las drogas, au Riverside Arts Center, dans l’Illinois.' },
  { y: '1998', es: 'Abil Peralta Agüero se convierte en el primer crítico que escribe sobre su obra.', en: 'Abil Peralta Agüero becomes the first critic to write about his work.', fr: 'Abil Peralta Agüero devient le premier critique à écrire sur son œuvre.' },
  { y: '2001', es: 'Dirige el primer número de la revista ARTEP: Arte & Arquitectura, con Cándido Gerón como editor asociado.', en: 'Directs the first issue of the magazine ARTEP: Arte & Arquitectura, with Cándido Gerón as associate editor.', fr: 'Dirige le premier numéro de la revue ARTEP : Arte & Arquitectura, avec Cándido Gerón comme rédacteur associé.' },
  { y: '2004', es: 'Huellas: la invención de lo visible, en el Museo del Hombre Dominicano.', en: 'Huellas: la invención de lo visible at the Museo del Hombre Dominicano.', fr: 'Huellas : la invención de lo visible au Museo del Hombre Dominicano.' },
  { y: '2005', es: 'Se muda a Nueva York y asume la dirección ejecutiva de Alianza Art Gallery.', en: 'Moves to New York and takes on the executive direction of Alianza Art Gallery.', fr: 'S’installe à New York et prend la direction exécutive d’Alianza Art Gallery.' },
  { y: '2007', es: 'Ozamarte, el centro de arte contemporáneo que creó en Santo Domingo Este, se convierte en Centro Abreu.', en: 'Ozamarte, the contemporary art center he created in Santo Domingo Este, becomes Centro Abreu.', fr: 'Ozamarte, le centre d’art contemporain qu’il a créé à Santo Domingo Este, devient Centro Abreu.' },
  { y: '2011', es: 'En noviembre abre Abreu Fine Art, estudio-galería en el 4394 de Broadway, Washington Heights, Nueva York.', en: 'In November, opens Abreu Fine Art, a studio-gallery at 4394 Broadway in Washington Heights, New York.', fr: 'En novembre, ouvre Abreu Fine Art, atelier-galerie au 4394 Broadway, à Washington Heights, New York.' },
  { y: '2013', es: 'Comienza Las células gliales y lleva el Psico-Expresionismo hacia la estructura del cerebro.', en: 'Begins Las células gliales, taking Psycho-Expressionism toward the structure of the brain.', fr: 'Commence Las células gliales et oriente le Psycho-Expressionnisme vers la structure du cerveau.' },
  { y: '2016', es: 'Un incendio destruye su estudio-residencia en Nueva York. ARTFORO se convierte en feria de arte.', en: 'A fire destroys his studio-residence in New York. ARTFORO becomes an art fair.', fr: 'Un incendie détruit son atelier-résidence à New York. ARTFORO devient une foire d’art.' },
  { y: '2017', es: 'Crea el mural Todos somos inmigrantes durante ARTFORO en Nueva York.', en: 'Creates the mural Todos somos inmigrantes during ARTFORO in New York.', fr: 'Réalise la fresque Todos somos inmigrantes pendant ARTFORO à New York.' },
  { y: '2018', es: 'El 23 de abril se presenta la segunda edición de Oscar Abreu: Memoria del Psico-Expresionismo, de Abil Peralta Agüero, en la Feria Internacional del Libro de Santo Domingo.', en: 'On April 23, the second edition of Oscar Abreu: Memoria del Psico-Expresionismo by Abil Peralta Agüero is presented at the Santo Domingo International Book Fair.', fr: 'Le 23 avril, la deuxième édition d’Oscar Abreu : Memoria del Psico-Expresionismo, d’Abil Peralta Agüero, est présentée à la Foire internationale du livre de Saint-Domingue.' },
  { y: '2019', es: 'En diciembre, tercera edición de ARTFORO, la primera en República Dominicana, en el Palacio de Bellas Artes.', en: 'In December, the third edition of ARTFORO, the first in the Dominican Republic, at the Palacio de Bellas Artes.', fr: 'En décembre, troisième édition d’ARTFORO, la première en République dominicaine, au Palacio de Bellas Artes.' },
  { y: '2020', es: 'Comienza la construcción del Museo Abreu.', en: 'Construction of Museo Abreu begins.', fr: 'Début de la construction du Museo Abreu.' },
  { y: '2021', es: 'El 17 de noviembre abre la primera fase del Museo Abreu en Bávaro con la retrospectiva Memoria del Psico-Expresionismo.', en: 'On November 17, the first phase of Museo Abreu opens in Bávaro with the retrospective Memoria del Psico-Expresionismo.', fr: 'Le 17 novembre, la première phase du Museo Abreu ouvre à Bávaro avec la rétrospective Memoria del Psico-Expresionismo.' },
  { y: '2023', es: 'El 12 de diciembre el museo se amplía a diez salas.', en: 'On December 12, the museum expands to ten galleries.', fr: 'Le 12 décembre, le musée s’agrandit et compte dix salles.' },
  { y: '2024', es: 'Treinta años del Psico-Expresionismo. En el tercer aniversario del museo se inaugura la Sala Freddy Javier.', en: 'Thirty years of Psycho-Expressionism. At the museum’s third anniversary, the Sala Freddy Javier opens.', fr: 'Trente ans de Psycho-Expressionnisme. Au troisième anniversaire du musée, la Sala Freddy Javier est inaugurée.' },
  { y: '2025', es: 'Del 11 al 20 de diciembre, ART GABANGI 2025 en el Museo Abreu.', en: 'From December 11 to 20, ART GABANGI 2025 at Museo Abreu.', fr: 'Du 11 au 20 décembre, ART GABANGI 2025 au Museo Abreu.' },
  { y: '2026', es: 'ART GABANGI 2026 (6–14 de julio) y la publicación Top 100 Artists: ART GABANGI 2026. El 17 de octubre abre Abreu Fine Art en Los Corales, Bávaro. Publica Ecce Homo: El arte me salvó la vida.', en: 'ART GABANGI 2026 (July 6–14) and the publication Top 100 Artists: ART GABANGI 2026. On October 17, Abreu Fine Art opens in Los Corales, Bávaro. Publishes Ecce Homo: Art Saved My Life.', fr: 'ART GABANGI 2026 (6–14 juillet) et la publication Top 100 Artists : ART GABANGI 2026. Le 17 octobre, Abreu Fine Art ouvre à Los Corales, Bávaro. Publie Ecce Homo : L’art m’a sauvé la vie.' },
];

// Major exhibitions as listed on oscarabreu.com (Biography page); `pes` is the
// Spanish place name and `pfr` the French one, where they differ.
const EXHIBITIONS = [
  { y: 1996, t: 'El mal de las drogas', p: 'Riverside Arts Center, Illinois' },
  { y: 1999, t: 'Mira a través de mis ojos', p: 'Casa Dominicana, Chicago' },
  { y: 1999, t: 'Resaca de la existencia', p: 'Truman College, Chicago' },
  { y: 2004, t: 'Huellas: La invención de lo visible', p: 'Museo del Hombre Dominicano, Santo Domingo', pfr: 'Museo del Hombre Dominicano, Saint-Domingue' },
  { y: 2005, t: 'La forma de la música', p: 'Sofitel Nicolás de Ovando, Santo Domingo', pfr: 'Sofitel Nicolás de Ovando, Saint-Domingue' },
  { y: 2005, t: 'Acontecimientos del espíritu', p: 'Galerías Prinardi, Puerto Rico', pfr: 'Galerías Prinardi, Porto Rico' },
  { y: 2005, t: 'Comportamiento de la memoria', p: 'Alianza Art Gallery, New York', pes: 'Alianza Art Gallery, Nueva York' },
  { y: 2006, t: 'Punishment of Memory', p: 'Joe Hintersteiner Gallery, New York', pes: 'Joe Hintersteiner Gallery, Nueva York' },
  { y: 2006, t: 'Detachment of the Ego', p: 'Marwen Foundation, Chicago / Alianza Art Gallery, New York', pes: 'Marwen Foundation, Chicago / Alianza Art Gallery, Nueva York' },
  { y: 2006, t: 'Generaciones', p: 'Ozamarte Centro de Arte Contemporáneo, Santo Domingo', pfr: 'Ozamarte Centro de Arte Contemporáneo, Saint-Domingue' },
  { y: 2009, t: 'Ironically Absurd', p: 'Alliance Française, Santo Domingo', pes: 'Alianza Francesa, Santo Domingo', pfr: 'Alliance Française, Saint-Domingue' },
  { y: 2009, t: 'Agitación de la memoria', p: 'Centro Abreu, Santo Domingo', pfr: 'Centro Abreu, Saint-Domingue' },
  { y: 2019, t: 'La forma del pensamiento', p: 'CODAP, Santo Domingo', pfr: 'CODAP, Saint-Domingue' },
  { y: 2019, t: 'Razonamiento de la Identidad', p: 'Altos de Chavón Gallery, Casa de Campo', pes: 'Galería Altos de Chavón, Casa de Campo', pfr: 'Galerie Altos de Chavón, Casa de Campo' },
  { y: 2021, t: 'Memoria del Psico-Expresionismo', p: 'Abreu Museum, Punta Cana', pes: 'Museo Abreu, Punta Cana', pfr: 'Musée Abreu, Punta Cana' },
  { y: 2024, t: 'Luxura', p: 'Abreu Museum, Punta Cana', pes: 'Museo Abreu, Punta Cana', pfr: 'Musée Abreu, Punta Cana' },
];

// Official biography from oscarabreu.com/biography, Spanish, English and French
// versions as published (critics' links removed).
const BIO_SITE = {
  source: 'oscarabreu.com',
  en: {
    intro: 'Oscar Abreu (San Juan de la Maguana, Dominican Republic, 1978) is one of the three most valued Dominican painters according to artprice.com; his painting María Moñito (2014) was acquired for USD 200,000. With more than three decades of practice, Abreu has developed his own language: Psycho-Expressionism, inspired by Freudian psychoanalysis and focused on exploring memory, identity, and the human psyche through layers of color, collage, symbols, and textures.',
    circuit: 'These exhibitions have consolidated his presence in New York, Chicago, Puerto Rico, Santo Domingo, and Punta Cana, positioning his work within a diverse international circuit.',
    recognition: [
      'His work has been analyzed by influential critics such as Candido Geron, Abil Peralta Agüero (Memoria del Psico-Expresionismo, 2018), Odalís G. Pérez, Fernando Morbán Laucer, Laura Gil, Gamal Michelen, and Marianne de Tolentino, who have emphasized the originality, expressive power, and psychological depth of his proposal.',
      'In parallel with his artistic production, Abreu has developed significant work as a cultural organizer. In 2000 he founded Artep Magazine; in 2014 he created ARTFORO —which became an international fair—; and in 2021 he inaugurated the Abreu Museum, a space dedicated to consecrating contemporary Dominican art.',
    ],
    legacy: 'With boldness and originality, Oscar Abreu has turned Psycho-Expressionism into a visual and philosophical movement that goes beyond painting. Exhibited in museums and private collections across the United States, the Caribbean and Europe, his work stands as a landmark of contemporary Dominican art and a cultural bridge between the Dominican Republic and its global diaspora.',
  },
  fr: {
    intro: 'Oscar Abreu (San Juan de la Maguana, République dominicaine, 1978) est l’un des trois peintres dominicains les plus cotés selon artprice.com ; sa peinture María Moñito (2014) a été acquise pour 200 000 USD. Fort de plus de trois décennies de carrière, Abreu a développé un langage personnel : le Psycho-Expressionnisme, inspiré par la psychanalyse freudienne et centré sur l’exploration de la mémoire, de l’identité et de la psyché humaine à travers des couches de couleur, des collages, des symboles et des textures.',
    circuit: 'Ces expositions ont consolidé sa présence à New York, Chicago, Porto Rico, Saint-Domingue et Punta Cana, positionnant son œuvre dans un circuit international diversifié.',
    recognition: [
      'Son travail a été analysé par des critiques influents tels que Candido Geron, Abil Peralta Agüero (Memoria del Psico-Expresionismo, 2018), Odalís G. Pérez, Fernando Morbán Laucer, Laura Gil, Gamal Michelen et Marianne de Tolentino, qui ont souligné l’originalité, la puissance expressive et la profondeur psychologique de sa proposition.',
      'Parallèlement à sa production artistique, Abreu a mené une importante action en tant qu’organisateur culturel. En 2000, il fonde la revue Artep Magazine ; en 2014, il crée ARTFORO —devenue une foire internationale— ; et en 2021, il inaugure le Musée Abreu, un espace dédié à l’art contemporain dominicain.',
    ],
    legacy: 'Avec audace et originalité, Oscar Abreu a fait du Psycho-Expressionnisme un mouvement visuel et philosophique qui dépasse la peinture. Présentée dans des musées et des collections privées aux États-Unis, dans les Caraïbes et en Europe, son œuvre constitue une référence de l’art dominicain contemporain et un pont culturel entre la République dominicaine et sa diaspora.',
  },
  es: {
    intro: 'Oscar Abreu (San Juan de la Maguana, República Dominicana, 1978) es uno de los tres pintores dominicanos más cotizados según artprice.com; su pintura María Moñito (2014) fue adquirida por 200,000 dólares. Con más de tres décadas de trayectoria, Abreu ha desarrollado un lenguaje propio: el Psico-Expresionismo, inspirado en el psicoanálisis freudiano y centrado en la exploración de la memoria, la identidad y la psicología humana mediante capas de color, collages, símbolos y texturas.',
    circuit: 'Estas exposiciones han consolidado su proyección en Nueva York, Chicago, Puerto Rico, Santo Domingo y Punta Cana, posicionando su obra en un circuito internacional diverso.',
    recognition: [
      'Su obra ha sido objeto de análisis por influyentes críticos como Candido Geron, Abil Peralta Agüero (Memoria del Psico-Expresionismo, 2018), Odalís G. Pérez, Fernando Morbán Laucer, Laura Gil, Gamal Michelen y Marianne de Tolentino, quienes han subrayado la originalidad, la fuerza expresiva y el trasfondo psicológico de su propuesta.',
      'Paralelamente a su producción artística, Abreu ha desarrollado una importante labor como gestor cultural. En 2000 fundó la revista Artep Magazine, en 2014 creó ARTFORO —convertida en feria internacional— y en 2021 inauguró el Museo Abreu, un espacio dedicado a consagrar el arte contemporáneo dominicano.',
    ],
    legacy: 'Con valentía y originalidad, Oscar Abreu ha convertido el Psico-Expresionismo en un movimiento visual y filosófico que va más allá de la pintura. Su obra, exhibida en museos y colecciones privadas en Estados Unidos, el Caribe y Europa, constituye un referente del arte dominicano contemporáneo y un puente cultural entre la República Dominicana y la diáspora internacional.',
  },
};

// Quote of the day on the home page: Oscar Abreu's own words from Ecce Homo (English edition,
// updated manuscript), copied exactly, with the chapter each comes from (0 = Introduction).
const DAILY_QUOTES = [
  { ch: 0, q: 'Art gave me refuge from the streets, structure amid confusion, and purpose amid uncertainty.' },
  { ch: 0, q: 'Every book expanded the world before me; every drawing carried me farther from a wrong decision; every painting confirmed that I could build my life through discipline rather than violence.' },
  { ch: 0, q: 'Art did not make the dangers disappear, but it helped me move through them without becoming part of them.' },
  { ch: 0, q: 'One essential question remained: What visible and invisible forces shape a human being?' },
  { ch: 1, q: 'Back then, there was only a surface, the impulse to leave a mark, and the need to create.' },
  { ch: 1, q: 'It amazed me that a few marks could transform the earth: where seconds earlier there had been only damp ground, a face, a body, or a scene would appear.' },
  { ch: 2, q: 'The first great distance of my life was not measured in miles.' },
  { ch: 2, q: 'Those tasks revealed everything that existed behind a finished work: preparation, patience, discipline, and attention at every stage.' },
  { ch: 3, q: 'A book had introduced me to the image; the museum brought me face-to-face with the work itself.' },
  { ch: 3, q: 'I was drawn to something more immediate: a face could be fragmented, its proportions altered, and still convey a human presence.' },
  { ch: 4, q: 'Every material purchased with those savings represented a small daily deprivation and, at the same time, a way of protecting my vocation.' },
  { ch: 5, q: 'What could painting do with what could not be seen?' },
  { ch: 5, q: 'Amid that disorder, I began creating an order of my own.' },
  { ch: 6, q: 'One form led to another, and an accident could change the direction of the piece.' },
  { ch: 12, q: 'A painting could leave my hands and still remain part of the history of my art.' },
  { ch: 15, q: 'Each new depth altered the painting and opened the way to further decisions.' },
  { ch: 21, q: 'Some paintings moved me forward; others revealed the limits of a solution.' },
  { ch: 23, q: 'No one chooses the first language they hear, the family stories with which they grow up, or the celebrations they learn to recognize.' },
  { ch: 24, q: 'A painting could arise from an intellectual concern and lead me toward an unexpected result.' },
  { ch: 25, q: 'Creating a sculpture required me to consider both what I constructed and the space I left open.' },
  { ch: 26, q: 'A work could emerge from personal experience without remaining confined within it.' },
  { ch: 26, q: 'An artist possesses information about his work that is inaccessible to others, but such proximity also imposes a limitation: he may become trapped within the intentions that preceded the result.' },
  { ch: 27, q: 'Artistic development and financial stability do not always advance at the same pace.' },
  { ch: 27, q: 'Some forms of assistance resolve an immediate crisis; others prevent a possibility from disappearing before it can take shape.' },
  { ch: 28, q: 'One layer could cover another without erasing it; an experience could remain displaced for years and return through an unexpected stimulus.' },
  { ch: 28, q: 'Time altered everything that appeared stable, and when we least expected it, what we believed buried returned to intervene in the present.' },
  { ch: 29, q: 'What happens when we forget an experience, yet its consequences continue to act upon us?' },
  { ch: 30, q: 'A work leaves the studio and enters other spaces: a collection, an exhibition, a publication, or a home.' },
  { ch: 34, q: 'Some decisions leave consequences, and certain words remain with us for years.' },
  { ch: 35, q: 'Art and family should not become rival forces.' },
  { ch: 35, q: 'An artistic tradition does not endure through symbolic recognition alone: it requires institutions capable of documenting, exhibiting, preserving, and bringing to market with integrity what its creators produce.' },
  { ch: 37, q: 'An artistic vision is not fully born when the artist finds an appealing visual solution or decides to give it a name.' },
  { ch: 37, q: 'An artist may study the masters, acknowledge influences, and experiment with a wide range of materials, but a moment comes when he must seek within his own work the answers he will not find elsewhere.' },
  { ch: 39, q: 'What happens to a work after it ceases to belong to the artist?' },
  { ch: 40, q: 'The work proposed; the viewer completed the journey through the lens of their own history.' },
  { ch: 41, q: 'Each new intervention altered the previous layers without ever erasing them completely.' },
  { ch: 42, q: 'Art history is not written solely through the works that survive.' },
  { ch: 42, q: 'The artist writes the first chapter by creating it; the chapters that follow belong to exhibitions, critics, galleries, collectors, institutions, and time.' },
  { ch: 43, q: 'Some artistic searches expand because one question inevitably leads to another.' },
  { ch: 43, q: 'We arrive in the present carrying relationships, losses, lessons, decisions, and forgotten experiences.' },
  { ch: 44, q: 'Each person belongs to a family, a language, a culture, an era, and a history.' },
  { ch: 45, q: 'Some losses cannot be compensated for by any lesson.' },
  { ch: 45, q: 'Some people open a door; others acquire a work when almost no one is paying attention.' },
  { ch: 46, q: 'Every individual contains contradictions and inaccessible territories, even for those who know them intimately.' },
  { ch: 46, q: 'No artist ever truly returns to the same model, because the years do not alter only the person portrayed; they also transform the painter’s gaze.' },
  { ch: 46, q: 'No painting should possess the arrogance to confine a human being.' },
  { ch: 48, q: 'Culture encompasses the decisions through which a community defends its rights and imagines its future.' },
  { ch: 49, q: 'Every immigrant constructs the present from fragments of the world left behind.' },
  { ch: 49, q: 'Every displacement contains a rupture, but it can also reveal abilities that a stable life would never have forced us to discover.' },
  { ch: 49, q: 'A work may arise in solitude, but its journey depends on a network of people willing to look at it, study it, preserve it, and place it before new audiences.' },
  { ch: 51, q: 'A painting can survive and still lose its history.' },
  { ch: 51, q: 'The works explored the distance between what we reveal and what we try to protect.' },
  { ch: 54, q: 'Every difficulty compelled us to change our methods without abandoning our purpose.' },
  { ch: 55, q: 'One work changed hands while making possible a place where others could endure.' },
  { ch: 56, q: 'A museum begins when those walls acquire the ability to preserve a history, generate questions, and inspire new interpretations.' },
  { ch: 57, q: 'Every student who entered the studio reminded me that a cultural institution can intervene in a life before knowing how far its influence will reach.' },
  { ch: 57, q: 'What am I losing historically if this work leaves?' },
  { ch: 58, q: 'Some stains needed to disappear; others claimed their place within the work.' },
  { ch: 59, q: 'Some of the most intense encounters with art occur when no one has planned them.' },
  { ch: 59, q: 'Each intervention revealed a different way of approaching freedom and risk.' },
  { ch: 60, q: 'Art allows an individual perception to enter into relation with other lives and participate in a shared reality.' },
  { ch: 61, q: 'We are formed by strata that overlap, transform one another, and continue to act even when we believe we have left them behind.' },
  { ch: 61, q: 'What takes place within us that we cannot reveal directly?' },
  { ch: 61, q: 'The work belongs to the artist while it is being created, but once it enters the world, it begins to receive interpretations its author can no longer control.' },
  { ch: 61, q: 'An artistic language that, after decades, can do nothing but repeat itself begins to die, even if it retains recognition and a market.' },
  { ch: 61, q: 'A painting can leave the studio within hours; a career requires decades to reveal what endures.' },
  { ch: 62, q: 'We can forget a face and remember a voice, lose the date yet retain the sensation.' },
  { ch: 62, q: 'A painting can survive apart from its context and continue moving those who encounter it.' },
  { ch: 63, q: 'A work can be born in solitude; its journey almost never is.' },
  { ch: 65, q: 'Memory reconstructs; documentation allows verification.' },
  { ch: 65, q: 'An artist needs a market because the market can purchase something extraordinarily valuable: time to continue creating.' },
  { ch: 66, q: 'Painting forced me to leave behind the administration of answers and return to the territory of questions.' },
  { ch: 66, q: 'Painting reminded me that creation begins precisely where control ceases to be absolute.' },
  { ch: 69, q: 'Every achievement reveals another responsibility, and every door we open forces us to think of those still waiting to enter.' },
  { ch: 70, q: 'A work cannot depend on an explanation in order to exist.' },
  { ch: 70, q: 'Some forms of knowledge are enacted by the body before consciousness can name them.' },
  { ch: 70, q: 'Art then ceases merely to represent an experience and begins to generate one.' },
  { ch: 70, q: 'An artist may name a proposition, explain its intentions, and devote a life to it, but cannot command history to grant it importance.' },
];

// Quote of the day for Spanish visitors: exact sentences from the Spanish edition
// (Ediciones ARTFORO, 2026). ch 0 is the Introduction.
const DAILY_QUOTES_ES = [
  { ch: 0, q: "El arte me dio refugio frente a la calle, estructura en medio de la confusión y propósito en medio de la incertidumbre." },
  { ch: 0, q: "Cada libro ensanchaba el mundo frente a mí; cada dibujo me alejaba un poco más de una mala decisión; cada cuadro me confirmaba que podía construir mi vida con disciplina y no con violencia." },
  { ch: 0, q: "La pintura no borró mis heridas ni resolvió las contradicciones que intentaba comprender." },
  { ch: 1, q: "Cada dibujo pertenecía por completo al presente: trazaba las líneas, contemplaba la imagen y aceptaba que podía desaparecer." },
  { ch: 4, q: "La pintura me hacía avanzar aunque todavía no tuviera respuestas." },
  { ch: 4, q: "Lo que yo hiciera con él todavía me correspondía decidirlo a mí." },
  { ch: 6, q: "Una forma me llevaba a otra, y un accidente podía cambiar la dirección de la pieza." },
  { ch: 10, q: "Una conversación podía quedarse conmigo durante horas antes de que empezara a pintar." },
  { ch: 15, q: "Cada nueva profundidad alteraba la pintura y abría el camino a otras decisiones." },
  { ch: 21, q: "Una explicación convincente no podía resolver una zona débil ni darle fuerza a una figura." },
  { ch: 23, q: "Nadie elige el primer idioma que escucha, las historias familiares con las que crece ni las celebraciones que aprende a reconocer." },
  { ch: 25, q: "Crear una escultura me exigía pensar tanto en lo que construía como en el espacio que dejaba abierto." },
  { ch: 26, q: "Una obra podía nacer de la experiencia personal sin quedar encerrada en ella." },
  { ch: 26, q: "Una mirada crítica puede establecer relaciones que el creador no percibió." },
  { ch: 26, q: "Algunas llegan a través de una conversación, una recomendación, un gesto de confianza o una puerta abierta en el momento justo." },
  { ch: 27, q: "Algunas ayudas resuelven una crisis inmediata; otras impiden que una posibilidad desaparezca antes de tomar forma." },
  { ch: 28, q: "Una canción podía devolver una isla; un plato podía reconstruir la cocina de una familia; una conversación podía acortar por un momento la distancia entre Manhattan y Santo Domingo." },
  { ch: 28, q: "Una capa podía cubrir otra sin borrarla; una experiencia podía permanecer desplazada durante años y volver por un estímulo inesperado." },
  { ch: 28, q: "La pintura proponía el encuentro; los espectadores lo completaban con lo que llevaban dentro." },
  { ch: 28, q: "El tiempo alteraba todo lo que parecía estable y, cuando menos lo esperábamos, lo que creíamos enterrado volvía a intervenir en el presente." },
  { ch: 29, q: "Crear no borraba lo vivido ni prometía una cura automática." },
  { ch: 30, q: "Hay un momento en la relación entre una persona y una obra de arte que puede arruinarse si el artista se apresura a llenarlo con explicaciones." },
  { ch: 33, q: "Las obras partían de mis preguntas y terminaban entrando en vidas de las que yo no sabía nada." },
  { ch: 34, q: "Una línea ya no necesitaba solo dividir; también podía unir." },
  { ch: 35, q: "El arte y la familia no debían convertirse en fuerzas rivales." },
  { ch: 35, q: "Una tradición artística no perdura solo con reconocimientos simbólicos: necesita instituciones capaces de documentar, exhibir, preservar y llevar al mercado con integridad lo que producen sus creadores." },
  { ch: 35, q: "El mercado por sí solo no determina la importancia de un artista, pero tampoco puede tratarse como algo ajeno a una trayectoria." },
  { ch: 37, q: "Una apariencia puede imitarse; una visión tiene que construirse." },
  { ch: 37, q: "Una idea puede surgir en un instante; dedicarle una vida exige trabajo, duda, decisiones, sacrificio y perseverancia." },
  { ch: 37, q: "Una obra puede alcanzar un lenguaje inconfundible y aun así perder su fuerza si se encierra en sí misma." },
  { ch: 39, q: "El arte nos permitía pasar con naturalidad de un tema a otro y reconocernos más allá de nuestras profesiones." },
  { ch: 39, q: "El mercado podía premiar la repetición en el momento preciso en que mi obra necesitaba cambiar." },
  { ch: 41, q: "Una superficie monumental no es necesariamente superior a una pequeña, pero cambia la relación física tanto con quien la mira como con quien la crea." },
  { ch: 41, q: "Crear una obra que tuviera una razón para existir." },
  { ch: 43, q: "Una evolución genuina no exige destruir lo anterior para justificar lo nuevo." },
  { ch: 43, q: "La obra podía partir de mi experiencia, pero no podía quedarse encerrada en mi biografía." },
  { ch: 43, q: "La pintura podía acercarse a esa complejidad sin pretender resolverla." },
  { ch: 44, q: "Cada persona pertenece a una familia, un idioma, una cultura, una época y una historia." },
  { ch: 45, q: "Una pared se levanta bloque a bloque; también una vida." },
  { ch: 46, q: "Ningún artista vuelve realmente al mismo modelo, porque los años no alteran solo a la persona retratada; transforman también la mirada del pintor." },
  { ch: 46, q: "Ninguna pintura debería tener la arrogancia de encerrar a un ser humano." },
  { ch: 49, q: "Una exposición desaparece cuando se desmonta; una publicación prolonga su existencia, preserva sus argumentos y le permite llegar a lectores que no estuvieron presentes." },
  { ch: 49, q: "Cada inmigrante construye el presente con fragmentos del mundo que dejó atrás." },
  { ch: 49, q: "Todo desplazamiento contiene una ruptura, pero también puede revelar capacidades que una vida estable nunca nos habría obligado a descubrir." },
  { ch: 49, q: "Una obra puede nacer en soledad, pero su recorrido depende de una red de personas dispuestas a mirarla, estudiarla, preservarla y ponerla ante nuevos públicos." },
  { ch: 50, q: "Un artista puede entender las razones que lo llevaron a crear una obra, pero no puede controlar el momento en que otra persona reconoce en ella algo que quiere conservar." },
  { ch: 50, q: "El mercado podía crecer alrededor del Psico-Expresionismo, pero nunca podría convertirse en su autor." },
  { ch: 51, q: "Una pintura puede sobrevivir y aun así perder su historia." },
  { ch: 52, q: "La obra más importante de ARTFORO no colgaba de ninguna pared." },
  { ch: 52, q: "El miedo dio paso a la cooperación, las jerarquías perdieron importancia y la identidad individual se amplió sin desaparecer." },
  { ch: 55, q: "Una fecha cambia la naturaleza de un proyecto." },
  { ch: 56, q: "Una pared desnuda todavía pertenece a una obra en construcción; cuando sostiene una obra de arte, empieza a cumplir otro propósito." },
  { ch: 56, q: "Un museo empieza cuando esas paredes adquieren la capacidad de preservar una historia, generar preguntas e inspirar nuevas interpretaciones." },
  { ch: 57, q: "Una corrección, una pregunta, un elogio o el simple hecho de prestar atención pueden parecer insignificantes para quien los ofrece y cambiar la vida de quien los recibe." },
  { ch: 57, q: "Cada estudiante que entraba al taller me recordaba que una institución cultural puede intervenir en una vida antes de saber hasta dónde llegará su influencia." },
  { ch: 59, q: "Algunos de los encuentros más intensos con el arte ocurren cuando nadie los ha planeado." },
  { ch: 59, q: "La pintura dejó de ser un objeto colocado ante el público y se convirtió en un acontecimiento compartido." },
  { ch: 60, q: "El arte permite que una percepción individual entre en relación con otras vidas y participe en una realidad compartida." },
  { ch: 61, q: "Hay también una condición que considero innegociable: la obra tiene que sostenerse por sí misma antes de que el espectador lea una sola palabra sobre ella." },
  { ch: 61, q: "La obra pertenece al artista mientras la crea, pero cuando entra en el mundo empieza a recibir interpretaciones que su autor ya no puede controlar." },
  { ch: 62, q: "Una exposición ofrece visibilidad en el presente; un archivo puede ofrecer presencia en el futuro." },
  { ch: 62, q: "Una fotografía que parece un simple recuerdo durante una inauguración puede convertirse décadas después en prueba." },
  { ch: 63, q: "Una obra puede nacer en soledad; su recorrido casi nunca." },
  { ch: 63, q: "El mercado no determinaba la calidad artística, pero creaba las condiciones en que el valor podía reconocerse, defenderse y sostenerse." },
  { ch: 64, q: "Cada obra encontró una pared; cada artista, un territorio." },
  { ch: 65, q: "Un libro podía cruzar fronteras y perdurar durante generaciones." },
  { ch: 65, q: "El tiempo es mucho más exigente que cualquier editor." },
  { ch: 66, q: "La pintura me recordaba que la creación empieza precisamente donde el control deja de ser absoluto." },
  { ch: 69, q: "Una galería no empieza cuando tiene paredes propias, sino cuando las obras reciben condiciones dignas, un programa coherente y personas dispuestas a detenerse frente a ellas." },
  { ch: 69, q: "Cada logro revela otra responsabilidad, y cada puerta que abrimos nos obliga a pensar en quienes todavía esperan para entrar." },
  { ch: 70, q: "Una obra no puede depender de una explicación para existir." },
  { ch: 70, q: "El rostro dejó de ser el destino de la pintura y se convirtió en una puerta." },
  { ch: 70, q: "Una técnica puede empezar como descubrimiento y terminar como prisión cuando el artista se da cuenta de que el público la reconoce y decide repetirla indefinidamente." },
  { ch: 70, q: "Lo que une sus distintas etapas es una pregunta: ¿cómo puede una obra transformar los procesos interiores del ser humano en una experiencia visual?" },
];

// The same quotes in the French edition: each is the sentence in the same place of the same
// paragraph (the French edition follows the Spanish paragraph by paragraph).
const DAILY_QUOTES_FR = [
  { ch: 0, q: "L’art m’a donné un refuge face à la rue, une structure au milieu de la confusion et un but au milieu de l’incertitude." },
  { ch: 0, q: "Chaque livre élargissait le monde devant moi ; chaque dessin m’éloignait un peu plus d’une mauvaise décision ; chaque tableau me confirmait que je pouvais construire ma vie par la discipline et non par la violence." },
  { ch: 0, q: "La peinture n’a pas effacé mes blessures ni résolu les contradictions que j’essayais de comprendre." },
  { ch: 1, q: "Chaque dessin appartenait entièrement au présent : je traçais les lignes, je contemplais l’image et j’acceptais qu’elle puisse disparaître." },
  { ch: 4, q: "La peinture me faisait avancer même si je n’avais pas encore de réponses." },
  { ch: 4, q: "Ce que j’en ferais restait à décider par moi." },
  { ch: 6, q: "Une forme m’en suggérait une autre, et un accident pouvait changer la direction de la pièce." },
  { ch: 10, q: "Une conversation pouvait m’habiter pendant des heures avant que je commence à peindre." },
  { ch: 15, q: "Chaque nouvelle profondeur modifiait la peinture et ouvrait la voie à d’autres décisions." },
  { ch: 21, q: "Une explication convaincante ne pouvait pas résoudre une zone faible ni donner de la force à une figure." },
  { ch: 23, q: "Personne ne choisit la première langue qu’il entend, les histoires familiales avec lesquelles il grandit ni les fêtes qu’il apprend à reconnaître." },
  { ch: 25, q: "Créer une sculpture m’obligeait à penser autant à ce que je construisais qu’à l’espace que je laissais ouvert." },
  { ch: 26, q: "Une œuvre pouvait naître de l’expérience personnelle sans y rester enfermée." },
  { ch: 26, q: "Un regard critique peut établir des relations que le créateur n’a pas perçues." },
  { ch: 26, q: "Certaines arrivent par une conversation, une recommandation, un geste de confiance ou une porte ouverte au bon moment." },
  { ch: 27, q: "Certaines aides règlent une crise immédiate ; d’autres empêchent une possibilité de disparaître avant qu’elle ait pris forme." },
  { ch: 28, q: "Une chanson pouvait ramener une île ; un plat pouvait reconstituer la cuisine d’une famille ; une conversation pouvait réduire un instant la distance entre Manhattan et Saint-Domingue." },
  { ch: 28, q: "Une couche pouvait en recouvrir une autre sans l’effacer ; une expérience pouvait rester déplacée pendant des années et revenir à la faveur d’un stimulus inattendu." },
  { ch: 28, q: "La peinture proposait la rencontre ; les spectateurs la complétaient avec ce qu’ils portaient en eux." },
  { ch: 28, q: "Le temps altérait tout ce qui semblait stable et, au moment où nous nous y attendions le moins, ce que nous croyions enterré revenait intervenir dans le présent." },
  { ch: 29, q: "Créer n’effaçait pas le vécu et ne promettait aucune guérison automatique." },
  { ch: 30, q: "Il y a un moment, dans la relation entre une personne et une œuvre d’art, qui peut être gâché si l’artiste se hâte de le remplir d’explications." },
  { ch: 33, q: "Les œuvres partaient de mes questions et finissaient par entrer dans des vies dont je ne savais rien." },
  { ch: 34, q: "Une ligne n’avait plus besoin seulement de diviser ; elle pouvait aussi unir." },
  { ch: 35, q: "L’art et la famille ne devaient pas devenir des forces rivales." },
  { ch: 35, q: "Une tradition artistique ne perdure pas seulement grâce à des reconnaissances symboliques : elle a besoin d’institutions capables de documenter, d’exposer, de préserver et de porter sur le marché avec intégrité ce que produisent ses créateurs." },
  { ch: 35, q: "Le marché seul ne détermine pas l’importance d’un artiste, mais il ne peut pas non plus être traité comme étranger à un parcours." },
  { ch: 37, q: "Une apparence peut s’imiter ; une vision doit se construire." },
  { ch: 37, q: "Une idée peut surgir en un instant ; lui consacrer une vie exige du travail, des doutes, des décisions, des sacrifices et de la persévérance." },
  { ch: 37, q: "Une œuvre peut atteindre un langage inimitable et perdre pourtant sa force si elle se referme sur elle-même." },
  { ch: 39, q: "L’art nous permettait de passer naturellement d’un sujet à l’autre et de nous reconnaître au-delà de nos professions." },
  { ch: 39, q: "Le marché pouvait récompenser la répétition au moment précis où mon œuvre avait besoin de changer." },
  { ch: 41, q: "Une surface monumentale n’est pas nécessairement supérieure à une petite, mais elle change la relation physique avec celui qui la regarde comme avec celui qui la crée." },
  { ch: 41, q: "Créer une œuvre qui ait une raison d’exister." },
  { ch: 43, q: "Une évolution authentique n’exige pas de détruire ce qui précède pour justifier ce qui vient." },
  { ch: 43, q: "L’œuvre pouvait partir de mon expérience, mais elle ne pouvait pas rester enfermée dans ma biographie." },
  { ch: 43, q: "La peinture pouvait approcher cette complexité sans prétendre la résoudre." },
  { ch: 44, q: "Chaque personne appartient à une famille, une langue, une culture, une époque et une histoire." },
  { ch: 45, q: "Un mur se monte bloc après bloc ; une vie aussi." },
  { ch: 46, q: "Aucun artiste ne revient vraiment au même modèle, car les années ne modifient pas seulement la personne représentée ; elles transforment aussi le regard du peintre." },
  { ch: 46, q: "Aucune peinture ne devrait avoir l’arrogance d’enfermer un être humain." },
  { ch: 49, q: "Une exposition disparaît quand on la démonte ; une publication prolonge son existence, préserve ses arguments et lui permet d’atteindre des lecteurs qui n’étaient pas présents." },
  { ch: 49, q: "Chaque immigrant construit le présent avec des fragments du monde qu’il a laissé derrière lui." },
  { ch: 49, q: "Tout déplacement contient une rupture, mais il peut aussi révéler des capacités qu’une vie stable ne nous aurait jamais obligés à découvrir." },
  { ch: 49, q: "Une œuvre peut naître dans la solitude, mais son parcours dépend d’un réseau de personnes prêtes à la regarder, à l’étudier, à la préserver et à la présenter à de nouveaux publics." },
  { ch: 50, q: "Un artiste peut comprendre les raisons qui l’ont amené à créer une œuvre, mais il ne peut pas contrôler le moment où une autre personne y reconnaît quelque chose qu’elle veut garder." },
  { ch: 50, q: "Le marché pouvait grandir autour du Psycho-Expressionnisme, mais il ne pourrait jamais en devenir l’auteur." },
  { ch: 51, q: "Une peinture peut survivre et pourtant perdre son histoire." },
  { ch: 52, q: "L’œuvre la plus importante d’ARTFORO n’était accrochée à aucun mur." },
  { ch: 52, q: "La peur céda la place à la coopération, les hiérarchies perdirent de leur importance et l’identité individuelle s’élargit sans disparaître." },
  { ch: 55, q: "Une date change la nature d’un projet." },
  { ch: 56, q: "Un mur nu appartient encore à un chantier ; quand il porte une œuvre d’art, il commence à remplir une autre fonction." },
  { ch: 56, q: "Un musée commence quand ces murs acquièrent la capacité de préserver une histoire, de susciter des questions et d’inspirer de nouvelles interprétations." },
  { ch: 57, q: "Une correction, une question, un éloge ou le simple fait de prêter attention peuvent sembler insignifiants pour celui qui les offre et changer la vie de celui qui les reçoit." },
  { ch: 57, q: "Chaque élève qui entrait dans l’atelier me rappelait qu’une institution culturelle peut intervenir dans une vie avant de savoir jusqu’où ira son influence." },
  { ch: 59, q: "Certaines des rencontres les plus intenses avec l’art se produisent quand personne ne les a prévues." },
  { ch: 59, q: "La peinture cessa d’être un objet placé devant le public pour devenir un événement partagé." },
  { ch: 60, q: "L’art permet à une perception individuelle d’entrer en relation avec d’autres vies et de participer à une réalité partagée." },
  { ch: 61, q: "Il y a aussi une condition que je considère comme non négociable : l’œuvre doit tenir par elle-même avant que le spectateur lise un seul mot à son sujet." },
  { ch: 61, q: "L’œuvre appartient à l’artiste pendant qu’il la crée, mais quand elle entre dans le monde, elle commence à recevoir des interprétations que son auteur ne peut plus contrôler." },
  { ch: 62, q: "Une exposition offre une visibilité dans le présent ; une archive peut offrir une présence dans l’avenir." },
  { ch: 62, q: "Une photographie qui semble un simple souvenir pendant une inauguration peut devenir, des décennies plus tard, une preuve." },
  { ch: 63, q: "Une œuvre peut naître dans la solitude ; son parcours, presque jamais." },
  { ch: 63, q: "Le marché ne déterminait pas la qualité artistique, mais il créait les conditions dans lesquelles la valeur pouvait être reconnue, défendue et soutenue." },
  { ch: 64, q: "Chaque œuvre trouva un mur ; chaque artiste, un territoire." },
  { ch: 65, q: "Un livre pouvait franchir les frontières et durer des générations." },
  { ch: 65, q: "Le temps est bien plus exigeant que n’importe quel éditeur." },
  { ch: 66, q: "La peinture me rappelait que la création commence précisément là où la maîtrise cesse d’être absolue." },
  { ch: 69, q: "Une galerie ne commence pas quand elle a ses propres murs, mais quand les œuvres reçoivent des conditions dignes, un programme cohérent et des personnes prêtes à s’arrêter devant elles." },
  { ch: 69, q: "Chaque réussite révèle une autre responsabilité, et chaque porte que nous ouvrons nous oblige à penser à ceux qui attendent encore pour entrer." },
  { ch: 70, q: "Une œuvre ne peut pas dépendre d’une explication pour exister." },
  { ch: 70, q: "Le visage cessa d’être la destination de la peinture pour devenir une porte." },
  { ch: 70, q: "Une technique peut commencer comme une découverte et finir comme une prison quand l’artiste s’aperçoit que le public la reconnaît et décide de la répéter indéfiniment." },
  { ch: 70, q: "Ce qui unit ses différentes étapes, c’est une question : comment une œuvre peut-elle transformer les processus intérieurs de l’être humain en une expérience visuelle ?" },
];

// The same quotes in the German edition: each is the sentence in the same place of the same
// paragraph (the German edition follows the Spanish paragraph by paragraph).
const DAILY_QUOTES_DE = [
  { ch: 0, q: "Die Kunst gab mir Zuflucht vor der Straße, Halt inmitten der Verwirrung und einen Sinn inmitten der Ungewissheit." },
  { ch: 0, q: "Jedes Buch weitete die Welt vor mir; jede Zeichnung brachte mich ein Stück weiter weg von einer falschen Entscheidung; jedes Bild bestätigte mir, dass ich mein Leben mit Disziplin aufbauen konnte und nicht mit Gewalt." },
  { ch: 0, q: "Die Malerei hat meine Wunden nicht gelöscht und die Widersprüche, die ich zu verstehen suchte, nicht aufgelöst." },
  { ch: 1, q: "Jede Zeichnung gehörte ganz der Gegenwart: Ich zog die Linien, betrachtete das Bild und nahm hin, dass es verschwinden konnte." },
  { ch: 4, q: "Die Malerei brachte mich voran, auch wenn ich noch keine Antworten hatte." },
  { ch: 4, q: "Was ich daraus machte, lag noch immer bei mir." },
  { ch: 6, q: "Eine Form führte mich zur nächsten, und ein Zufall konnte die Richtung eines Stücks ändern." },
  { ch: 10, q: "Ein Gespräch konnte mich stundenlang begleiten, bevor ich zu malen begann." },
  { ch: 15, q: "Jede neue Tiefe veränderte das Bild und öffnete den Weg zu weiteren Entscheidungen." },
  { ch: 21, q: "Eine überzeugende Erklärung konnte keine schwache Zone retten und keiner Figur Kraft verleihen." },
  { ch: 23, q: "Niemand wählt die erste Sprache, die er hört, die Familiengeschichten, mit denen er aufwächst, oder die Feste, die er zu erkennen lernt." },
  { ch: 25, q: "Eine Skulptur zu schaffen verlangte von mir, ebenso an das zu denken, was ich baute, wie an den Raum, den ich offen ließ." },
  { ch: 26, q: "Ein Werk konnte aus der persönlichen Erfahrung entstehen, ohne in ihr eingeschlossen zu bleiben." },
  { ch: 26, q: "Ein kritischer Blick kann Beziehungen herstellen, die der Schöpfer nicht bemerkt hat." },
  { ch: 26, q: "Manche kommen durch ein Gespräch, eine Empfehlung, eine Geste des Vertrauens oder eine im richtigen Moment geöffnete Tür." },
  { ch: 27, q: "Manche Hilfe löst eine unmittelbare Krise; andere verhindert, dass eine Möglichkeit verschwindet, bevor sie Gestalt annimmt." },
  { ch: 28, q: "Ein Lied konnte eine Insel zurückbringen; ein Gericht konnte die Küche einer Familie wiederherstellen; ein Gespräch konnte für einen Moment die Entfernung zwischen Manhattan und Santo Domingo verkürzen." },
  { ch: 28, q: "Eine Schicht konnte eine andere bedecken, ohne sie auszulöschen; eine Erfahrung konnte jahrelang verdrängt bleiben und durch einen unerwarteten Reiz zurückkehren." },
  { ch: 28, q: "Das Bild bot die Begegnung an; die Betrachter vervollständigten sie mit dem, was sie in sich trugen." },
  { ch: 28, q: "Die Zeit veränderte alles, was stabil schien, und wenn wir es am wenigsten erwarteten, griff das, was wir für begraben hielten, wieder in die Gegenwart ein." },
  { ch: 29, q: "Schaffen löschte das Erlebte nicht aus und versprach keine automatische Heilung." },
  { ch: 30, q: "Es gibt einen Moment in der Beziehung zwischen einem Menschen und einem Kunstwerk, der verdorben werden kann, wenn der Künstler sich beeilt, ihn mit Erklärungen zu füllen." },
  { ch: 33, q: "Die Werke gingen von meinen Fragen aus und traten schließlich in Leben ein, von denen ich nichts wusste." },
  { ch: 34, q: "Eine Linie musste nicht mehr nur trennen; sie konnte auch verbinden." },
  { ch: 35, q: "Kunst und Familie durften keine rivalisierenden Kräfte werden." },
  { ch: 35, q: "Eine künstlerische Tradition besteht nicht allein durch symbolische Anerkennung fort: Sie braucht Institutionen, die das, was ihre Schaffenden hervorbringen, dokumentieren, ausstellen, bewahren und mit Integrität auf den Markt bringen können." },
  { ch: 35, q: "Der Markt allein bestimmt nicht die Bedeutung eines Künstlers, aber er lässt sich auch nicht als etwas behandeln, das einem Werdegang fremd ist." },
  { ch: 37, q: "Ein Erscheinungsbild kann man nachahmen; eine Vision muss man aufbauen." },
  { ch: 37, q: "Eine Idee kann in einem Augenblick entstehen; ihr ein Leben zu widmen, verlangt Arbeit, Zweifel, Entscheidungen, Opfer und Beharrlichkeit." },
  { ch: 37, q: "Ein Werk kann eine unverwechselbare Sprache erreichen und dennoch seine Kraft verlieren, wenn es sich in sich selbst verschließt." },
  { ch: 39, q: "Die Kunst erlaubte uns, selbstverständlich von einem Thema zum anderen zu wechseln und uns jenseits unserer Berufe zu erkennen." },
  { ch: 39, q: "Der Markt konnte die Wiederholung genau in dem Moment belohnen, in dem mein Werk sich verändern musste." },
  { ch: 41, q: "Eine monumentale Fläche ist einer kleinen nicht unbedingt überlegen, aber sie verändert die körperliche Beziehung sowohl zu dem, der sie betrachtet, als auch zu dem, der sie schafft." },
  { ch: 41, q: "Ein Werk zu schaffen, das einen Grund hatte zu existieren." },
  { ch: 43, q: "Eine echte Entwicklung verlangt nicht, das Vorherige zu zerstören, um das Neue zu rechtfertigen." },
  { ch: 43, q: "Das Werk konnte von meiner Erfahrung ausgehen, durfte aber nicht in meiner Biografie eingeschlossen bleiben." },
  { ch: 43, q: "Die Malerei konnte sich dieser Komplexität nähern, ohne den Anspruch, sie aufzulösen." },
  { ch: 44, q: "Jeder gehört zu einer Familie, einer Sprache, einer Kultur, einer Epoche und einer Geschichte." },
  { ch: 45, q: "Eine Wand wird Stein für Stein errichtet; ein Leben ebenso." },
  { ch: 46, q: "Kein Künstler kehrt wirklich zu demselben Modell zurück, denn die Jahre verändern nicht nur den porträtierten Menschen; sie verwandeln auch den Blick des Malers." },
  { ch: 46, q: "Kein Bild sollte die Anmaßung besitzen, einen Menschen einzuschließen." },
  { ch: 49, q: "Eine Ausstellung verschwindet, wenn sie abgebaut wird; eine Publikation verlängert ihr Dasein, bewahrt ihre Argumente und erlaubt ihr, Leser zu erreichen, die nicht dabei waren." },
  { ch: 49, q: "Jeder Einwanderer baut die Gegenwart mit Bruchstücken der Welt auf, die er zurückgelassen hat." },
  { ch: 49, q: "Jede Entwurzelung enthält einen Bruch, kann aber auch Fähigkeiten offenbaren, zu deren Entdeckung uns ein beständiges Leben nie gezwungen hätte." },
  { ch: 49, q: "Ein Werk kann in der Einsamkeit entstehen, aber sein Weg hängt von einem Netz von Menschen ab, die bereit sind, es anzusehen, zu studieren, zu bewahren und vor neue Publikumskreise zu bringen." },
  { ch: 50, q: "Ein Künstler kann die Gründe verstehen, die ihn zur Schaffung eines Werks geführt haben, aber er kann nicht den Moment kontrollieren, in dem ein anderer Mensch darin etwas erkennt, das er behalten möchte." },
  { ch: 50, q: "Der Markt konnte um den Psycho-Expressionismus herum wachsen, aber er würde nie sein Urheber werden." },
  { ch: 51, q: "Ein Bild kann überleben und dennoch seine Geschichte verlieren." },
  { ch: 52, q: "Das wichtigste Werk von ARTFORO hing an keiner Wand." },
  { ch: 52, q: "Die Angst wich der Zusammenarbeit, die Hierarchien verloren an Bedeutung, und die individuelle Identität weitete sich, ohne zu verschwinden." },
  { ch: 55, q: "Ein Datum verändert das Wesen eines Projekts." },
  { ch: 56, q: "Eine nackte Wand gehört noch zu einer Baustelle; wenn sie ein Kunstwerk trägt, beginnt sie einen anderen Zweck zu erfüllen." },
  { ch: 56, q: "Ein Museum beginnt, wenn diese Wände die Fähigkeit gewinnen, eine Geschichte zu bewahren, Fragen hervorzurufen und neue Deutungen anzuregen." },
  { ch: 57, q: "Eine Korrektur, eine Frage, ein Lob oder die bloße Tatsache, Aufmerksamkeit zu schenken, können dem, der sie gibt, unbedeutend erscheinen und das Leben dessen verändern, der sie empfängt." },
  { ch: 57, q: "Jeder Schüler, der die Werkstatt betrat, erinnerte mich daran, dass eine Kulturinstitution in ein Leben eingreifen kann, bevor sie weiß, wie weit ihr Einfluss reichen wird." },
  { ch: 59, q: "Einige der intensivsten Begegnungen mit Kunst geschehen, wenn niemand sie geplant hat." },
  { ch: 59, q: "Das Bild war kein Gegenstand mehr, der vor das Publikum gestellt wurde, sondern ein gemeinsames Ereignis." },
  { ch: 60, q: "Die Kunst erlaubt einer individuellen Wahrnehmung, mit anderen Leben in Beziehung zu treten und an einer gemeinsamen Wirklichkeit teilzuhaben." },
  { ch: 61, q: "Es gibt auch eine Bedingung, die ich für unverhandelbar halte: Das Werk muss für sich bestehen, bevor der Betrachter ein einziges Wort darüber liest." },
  { ch: 61, q: "Das Werk gehört dem Künstler, solange er es schafft, aber wenn es in die Welt tritt, beginnt es Deutungen zu empfangen, die sein Urheber nicht mehr kontrollieren kann." },
  { ch: 62, q: "Eine Ausstellung bietet Sichtbarkeit in der Gegenwart; ein Archiv kann Gegenwart in der Zukunft bieten." },
  { ch: 62, q: "Eine Fotografie, die bei einer Eröffnung wie eine bloße Erinnerung wirkt, kann Jahrzehnte später zum Beleg werden." },
  { ch: 63, q: "Ein Werk kann in der Einsamkeit entstehen; sein Weg fast nie." },
  { ch: 63, q: "Der Markt bestimmte nicht die künstlerische Qualität, aber er schuf die Bedingungen, unter denen Wert erkannt, verteidigt und erhalten werden konnte." },
  { ch: 64, q: "Jedes Werk fand eine Wand, jeder Künstler ein Gebiet." },
  { ch: 65, q: "Ein Buch konnte Grenzen überschreiten und über Generationen fortbestehen." },
  { ch: 65, q: "Die Zeit ist weit anspruchsvoller als jeder Herausgeber." },
  { ch: 66, q: "Die Malerei erinnerte mich daran, dass das Schaffen genau dort beginnt, wo die Kontrolle aufhört, absolut zu sein." },
  { ch: 69, q: "Eine Galerie beginnt nicht, wenn sie eigene Wände hat, sondern wenn die Werke würdige Bedingungen, ein stimmiges Programm und Menschen finden, die bereit sind, vor ihnen innezuhalten." },
  { ch: 69, q: "Jeder Erfolg offenbart eine weitere Verantwortung, und jede Tür, die wir öffnen, zwingt uns, an diejenigen zu denken, die noch darauf warten, einzutreten." },
  { ch: 70, q: "Ein Werk darf nicht von einer Erklärung abhängen, um zu existieren." },
  { ch: 70, q: "Das Gesicht war nicht mehr das Ziel der Malerei und wurde zu einer Tür." },
  { ch: 70, q: "Eine Technik kann als Entdeckung beginnen und als Gefängnis enden, wenn der Künstler merkt, dass das Publikum sie erkennt, und beschließt, sie endlos zu wiederholen." },
  { ch: 70, q: "Was seine verschiedenen Abschnitte verbindet, ist eine Frage: Wie kann ein Werk die inneren Vorgänge des Menschen in eine visuelle Erfahrung verwandeln?" },
];

// The same quotes in the Russian edition: each is the sentence in the same place of the same
// paragraph (the Russian edition follows the Spanish paragraph by paragraph).
const DAILY_QUOTES_RU = [
  { ch: 0, q: "Искусство дало мне убежище от улицы, опору посреди смятения и цель посреди неопределённости." },
  { ch: 0, q: "Каждая книга расширяла мир передо мной; каждый рисунок уводил меня чуть дальше от дурного решения; каждая картина подтверждала, что я могу строить свою жизнь дисциплиной, а не насилием." },
  { ch: 0, q: "Живопись не стёрла моих ран и не разрешила противоречий, которые я пытался понять." },
  { ch: 1, q: "Каждый рисунок целиком принадлежал настоящему: я проводил линии, рассматривал изображение и принимал, что оно может исчезнуть." },
  { ch: 4, q: "Живопись заставляла меня двигаться вперёд, даже когда у меня ещё не было ответов." },
  { ch: 4, q: "Что я с ней сделаю, по-прежнему зависело от меня." },
  { ch: 6, q: "Одна форма вела к другой, и случайность могла изменить направление работы." },
  { ch: 10, q: "Разговор мог жить во мне часами, прежде чем я начинал писать." },
  { ch: 15, q: "Каждая новая глубина меняла картину и открывала путь к другим решениям." },
  { ch: 21, q: "Убедительное объяснение не могло исправить слабую зону или придать силу фигуре." },
  { ch: 23, q: "Никто не выбирает первый услышанный язык, семейные истории, с которыми растёт, и праздники, которые учится узнавать." },
  { ch: 25, q: "Создание скульптуры требовало думать и о том, что я строю, и о пространстве, которое оставляю открытым." },
  { ch: 26, q: "Произведение могло родиться из личного опыта, не оставаясь в нём запертым." },
  { ch: 26, q: "Критический взгляд способен установить связи, которых создатель не заметил." },
  { ch: 26, q: "Некоторые приходят через разговор, рекомендацию, жест доверия или дверь, открытую в нужный момент." },
  { ch: 27, q: "Одна помощь разрешает немедленный кризис; другая не даёт возможности исчезнуть, прежде чем она обретёт форму." },
  { ch: 28, q: "Песня могла вернуть остров; блюдо могло воссоздать семейную кухню; разговор мог на мгновение сократить расстояние между Манхэттеном и Санто-Доминго." },
  { ch: 28, q: "Слой мог закрыть другой, не стерев его; переживание могло годами оставаться вытесненным и вернуться от неожиданного толчка." },
  { ch: 28, q: "Живопись предлагала встречу; зрители завершали её тем, что несли в себе." },
  { ch: 28, q: "Время меняло всё, что казалось устойчивым, и, когда мы меньше всего этого ждали, то, что мы считали похороненным, снова вмешивалось в настоящее." },
  { ch: 29, q: "Творчество не стирало пережитого и не обещало автоматического исцеления." },
  { ch: 30, q: "В отношениях человека с произведением искусства есть момент, который может быть испорчен, если художник поспешит заполнить его объяснениями." },
  { ch: 33, q: "Работы исходили из моих вопросов и в итоге входили в жизни, о которых я ничего не знал." },
  { ch: 34, q: "Линии уже не нужно было только разделять; она могла и соединять." },
  { ch: 35, q: "Искусство и семья не должны были становиться соперничающими силами." },
  { ch: 35, q: "Художественная традиция не выживает лишь на символическом признании: ей нужны учреждения, способные документировать, показывать, сохранять и честно выводить на рынок то, что создают её творцы." },
  { ch: 35, q: "Рынок сам по себе не определяет значимость художника, но и считать его чем-то чуждым творческому пути нельзя." },
  { ch: 37, q: "Внешность можно подделать; видение нужно построить." },
  { ch: 37, q: "Идея может возникнуть в одно мгновение; посвятить ей жизнь требует труда, сомнений, решений, жертв и упорства." },
  { ch: 37, q: "Творчество может обрести безошибочно узнаваемый язык и всё же утратить силу, если замкнётся в себе." },
  { ch: 39, q: "Искусство позволяло нам естественно переходить от темы к теме и узнавать друг друга за пределами профессий." },
  { ch: 39, q: "Рынок мог поощрять повторение именно тогда, когда моему творчеству нужно было меняться." },
  { ch: 41, q: "Монументальная поверхность не обязательно превосходит маленькую, но она меняет физическое отношение и того, кто на неё смотрит, и того, кто её создаёт." },
  { ch: 41, q: "Создать произведение, у которого есть причина существовать." },
  { ch: 43, q: "Подлинное развитие не требует разрушать прежнее, чтобы оправдать новое." },
  { ch: 43, q: "Работа могла исходить из моего опыта, но не могла оставаться запертой в моей биографии." },
  { ch: 43, q: "Живопись могла приблизиться к этой сложности, не претендуя на её разрешение." },
  { ch: 44, q: "Каждый принадлежит семье, языку, культуре, эпохе и истории." },
  { ch: 45, q: "Стену возводят блок за блоком; жизнь — тоже." },
  { ch: 46, q: "Ни один художник по-настоящему не возвращается к той же модели, потому что годы меняют не только изображённого человека; они преображают и взгляд живописца." },
  { ch: 46, q: "Ни одной картине не следует иметь самонадеянность заключить в себе человека." },
  { ch: 49, q: "Выставка исчезает, когда её разбирают; издание продлевает её существование, сохраняет её доводы и позволяет ей дойти до читателей, которых там не было." },
  { ch: 49, q: "Каждый иммигрант строит настоящее из осколков мира, оставленного позади." },
  { ch: 49, q: "Любое переселение содержит разрыв, но оно может и открыть способности, которые устойчивая жизнь никогда не заставила бы нас обнаружить." },
  { ch: 49, q: "Работа может родиться в одиночестве, но её путь зависит от сети людей, готовых смотреть на неё, изучать её, сохранять её и представлять новой публике." },
  { ch: 50, q: "Художник может понимать причины, побудившие его создать работу, но не может управлять моментом, когда другой человек узнаёт в ней то, что хочет сохранить." },
  { ch: 50, q: "Рынок мог расти вокруг Психо-экспрессионизма, но никогда не смог бы стать его автором." },
  { ch: 51, q: "Картина может уцелеть и всё же утратить свою историю." },
  { ch: 52, q: "Самая важная работа ARTFORO не висела ни на одной стене." },
  { ch: 52, q: "Страх уступил место сотрудничеству, иерархии утратили значение, а индивидуальность расширилась, не исчезая." },
  { ch: 55, q: "Дата меняет природу проекта." },
  { ch: 56, q: "Голая стена ещё принадлежит стройке; когда на ней висит произведение искусства, она начинает служить иной цели." },
  { ch: 56, q: "Музей начинается, когда эти стены обретают способность хранить историю, порождать вопросы и вдохновлять новые толкования." },
  { ch: 57, q: "Исправление, вопрос, похвала или простой акт внимания могут казаться незначительными тому, кто их дарит, и изменить жизнь того, кто их получает." },
  { ch: 57, q: "Каждый студент, входивший в мастерскую, напоминал мне, что культурное учреждение может вмешаться в жизнь прежде, чем узнает, как далеко простирается его влияние." },
  { ch: 59, q: "Некоторые из самых сильных встреч с искусством происходят, когда их никто не планировал." },
  { ch: 59, q: "Картина перестала быть предметом, поставленным перед публикой, и стала общим событием." },
  { ch: 60, q: "Искусство позволяет индивидуальному восприятию вступить в отношения с другими жизнями и участвовать в общей реальности." },
  { ch: 61, q: "Есть и условие, которое я считаю не подлежащим обсуждению: работа должна держаться сама по себе прежде, чем зритель прочтёт о ней хоть одно слово." },
  { ch: 61, q: "Работа принадлежит художнику, пока он её создаёт, но, войдя в мир, она начинает получать толкования, которыми автор уже не может управлять." },
  { ch: 62, q: "Выставка даёт заметность в настоящем; архив может дать присутствие в будущем." },
  { ch: 62, q: "Фотография, кажущаяся на открытии просто памятным снимком, десятилетия спустя может стать доказательством." },
  { ch: 63, q: "Работа может родиться в одиночестве; её путь — почти никогда." },
  { ch: 63, q: "Рынок не определял художественного качества, но создавал условия, в которых ценность могла быть признана, отстаиваема и поддерживаема." },
  { ch: 64, q: "Каждая работа нашла стену; каждый художник — территорию." },
  { ch: 65, q: "Книга могла пересекать границы и жить поколениями." },
  { ch: 65, q: "Время гораздо требовательнее любого редактора." },
  { ch: 66, q: "Живопись напоминала мне, что творчество начинается именно там, где контроль перестаёт быть абсолютным." },
  { ch: 69, q: "Галерея начинается не тогда, когда у неё появляются собственные стены, а когда работы получают достойные условия, цельную программу и людей, готовых остановиться перед ними." },
  { ch: 69, q: "Каждое достижение открывает новую ответственность, и каждая открытая нами дверь заставляет думать о тех, кто ещё ждёт, чтобы войти." },
  { ch: 70, q: "Работа не может зависеть от объяснения, чтобы существовать." },
  { ch: 70, q: "Лицо перестало быть целью живописи и стало дверью." },
  { ch: 70, q: "Техника может начаться как открытие и закончиться тюрьмой, когда художник понимает, что публика её узнаёт, и решает повторять её бесконечно." },
  { ch: 70, q: "Его разные этапы объединяет вопрос: как произведение может превратить внутренние процессы человека в зрительный опыт?" },
];

// The same quotes in the Italian edition: each is the sentence in the same place of the same
// paragraph (the Italian edition follows the Spanish paragraph by paragraph).
const DAILY_QUOTES_IT = [
  { ch: 0, q: "L’arte mi diede rifugio dalla strada, struttura in mezzo alla confusione e uno scopo in mezzo all’incertezza." },
  { ch: 0, q: "Ogni libro allargava il mondo davanti a me; ogni disegno mi allontanava un po’ di più da una cattiva decisione; ogni quadro mi confermava che potevo costruire la mia vita con la disciplina e non con la violenza." },
  { ch: 0, q: "La pittura non cancellò le mie ferite né risolse le contraddizioni che cercavo di comprendere." },
  { ch: 1, q: "Ogni disegno apparteneva interamente al presente: tracciavo le linee, contemplavo l’immagine e accettavo che potesse scomparire." },
  { ch: 4, q: "La pittura mi faceva avanzare anche quando non avevo ancora risposte." },
  { ch: 4, q: "Che cosa ne avrei fatto spettava ancora a me deciderlo." },
  { ch: 6, q: "Una forma mi portava a un’altra, e un incidente poteva cambiare la direzione del lavoro." },
  { ch: 10, q: "Una conversazione poteva restare con me per ore prima che cominciassi a dipingere." },
  { ch: 15, q: "Ogni nuova profondità alterava il dipinto e apriva la strada ad altre decisioni." },
  { ch: 21, q: "Una spiegazione convincente non poteva risolvere una zona debole né dare forza a una figura." },
  { ch: 23, q: "Nessuno sceglie la prima lingua che sente, le storie familiari con cui cresce né le feste che impara a riconoscere." },
  { ch: 25, q: "Creare una scultura mi richiedeva di pensare tanto a ciò che costruivo quanto allo spazio che lasciavo aperto." },
  { ch: 26, q: "Un’opera poteva nascere dall’esperienza personale senza restarne rinchiusa." },
  { ch: 26, q: "Uno sguardo critico può stabilire rapporti che il creatore non ha percepito." },
  { ch: 26, q: "Alcune arrivano attraverso una conversazione, un consiglio, un gesto di fiducia o una porta aperta al momento giusto." },
  { ch: 27, q: "Alcuni aiuti risolvono una crisi immediata; altri impediscono che una possibilità scompaia prima di prendere forma." },
  { ch: 28, q: "Una canzone poteva restituire un’isola; un piatto poteva ricostruire la cucina di una famiglia; una conversazione poteva accorciare per un momento la distanza tra Manhattan e Santo Domingo." },
  { ch: 28, q: "Uno strato poteva coprirne un altro senza cancellarlo; un’esperienza poteva restare spostata per anni e tornare per uno stimolo inatteso." },
  { ch: 28, q: "La pittura proponeva l’incontro; gli spettatori lo completavano con ciò che portavano dentro." },
  { ch: 28, q: "Il tempo alterava tutto ciò che sembrava stabile e, quando meno ce lo aspettavamo, ciò che credevamo sepolto tornava a intervenire nel presente." },
  { ch: 29, q: "Creare non cancellava il vissuto né prometteva una guarigione automatica." },
  { ch: 30, q: "C’è un momento nel rapporto tra una persona e un’opera d’arte che può essere rovinato se l’artista si affretta a riempirlo di spiegazioni." },
  { ch: 33, q: "Le opere partivano dalle mie domande e finivano per entrare in vite di cui non sapevo nulla." },
  { ch: 34, q: "Una linea non doveva più soltanto dividere; poteva anche unire." },
  { ch: 35, q: "L’arte e la famiglia non dovevano diventare forze rivali." },
  { ch: 35, q: "Una tradizione artistica non dura solo con riconoscimenti simbolici: ha bisogno di istituzioni capaci di documentare, esporre, conservare e portare sul mercato con integrità ciò che producono i suoi autori." },
  { ch: 35, q: "Il mercato da solo non determina l’importanza di un artista, ma non può nemmeno essere trattato come qualcosa di estraneo a un percorso." },
  { ch: 37, q: "Un’apparenza si può imitare; una visione va costruita." },
  { ch: 37, q: "Un’idea può nascere in un istante; dedicarle una vita richiede lavoro, dubbio, decisioni, sacrificio e perseveranza." },
  { ch: 37, q: "Un’opera può raggiungere un linguaggio inconfondibile e tuttavia perdere forza se si chiude in sé stessa." },
  { ch: 39, q: "L’arte ci permetteva di passare con naturalezza da un tema all’altro e di riconoscerci al di là delle nostre professioni." },
  { ch: 39, q: "Il mercato poteva premiare la ripetizione proprio nel momento in cui la mia opera aveva bisogno di cambiare." },
  { ch: 41, q: "Una superficie monumentale non è necessariamente superiore a una piccola, ma cambia il rapporto fisico tanto con chi la guarda quanto con chi la crea." },
  { ch: 41, q: "Creare un’opera che avesse una ragione di esistere." },
  { ch: 43, q: "Un’evoluzione autentica non richiede di distruggere ciò che c’era prima per giustificare il nuovo." },
  { ch: 43, q: "L’opera poteva partire dalla mia esperienza, ma non poteva restare chiusa nella mia biografia." },
  { ch: 43, q: "La pittura poteva avvicinarsi a quella complessità senza pretendere di risolverla." },
  { ch: 44, q: "Ogni persona appartiene a una famiglia, a una lingua, a una cultura, a un’epoca e a una storia." },
  { ch: 45, q: "Un muro si alza blocco dopo blocco; anche una vita." },
  { ch: 46, q: "Nessun artista torna davvero allo stesso modello, perché gli anni non alterano solo la persona ritratta; trasformano anche lo sguardo del pittore." },
  { ch: 46, q: "Nessun dipinto dovrebbe avere l’arroganza di rinchiudere un essere umano." },
  { ch: 49, q: "Una mostra scompare quando la si smonta; una pubblicazione ne prolunga l’esistenza, ne conserva gli argomenti e le permette di raggiungere lettori che non erano presenti." },
  { ch: 49, q: "Ogni immigrato costruisce il presente con frammenti del mondo che si è lasciato alle spalle." },
  { ch: 49, q: "Ogni spostamento contiene una rottura, ma può anche rivelare capacità che una vita stabile non ci avrebbe mai costretto a scoprire." },
  { ch: 49, q: "Un’opera può nascere in solitudine, ma il suo percorso dipende da una rete di persone disposte a guardarla, studiarla, conservarla e presentarla a nuovi pubblici." },
  { ch: 50, q: "Un artista può capire le ragioni che lo hanno portato a creare un’opera, ma non può controllare il momento in cui un’altra persona vi riconosce qualcosa che vuole conservare." },
  { ch: 50, q: "Il mercato poteva crescere attorno al Psico-Espressionismo, ma non avrebbe mai potuto diventarne l’autore." },
  { ch: 51, q: "Un dipinto può sopravvivere e tuttavia perdere la sua storia." },
  { ch: 52, q: "L’opera più importante di ARTFORO non era appesa a nessuna parete." },
  { ch: 52, q: "La paura lasciò il posto alla cooperazione, le gerarchie persero importanza e l’identità individuale si ampliò senza scomparire." },
  { ch: 55, q: "Una data cambia la natura di un progetto." },
  { ch: 56, q: "Una parete nuda appartiene ancora a un cantiere; quando sostiene un’opera d’arte, comincia a svolgere un altro scopo." },
  { ch: 56, q: "Un museo comincia quando quelle pareti acquistano la capacità di preservare una storia, generare domande e ispirare nuove interpretazioni." },
  { ch: 57, q: "Una correzione, una domanda, un elogio o il semplice fatto di prestare attenzione possono sembrare insignificanti a chi li offre e cambiare la vita di chi li riceve." },
  { ch: 57, q: "Ogni studente che entrava nel laboratorio mi ricordava che un’istituzione culturale può intervenire in una vita prima di sapere fin dove arriverà la sua influenza." },
  { ch: 59, q: "Alcuni degli incontri più intensi con l’arte avvengono quando nessuno li ha pianificati." },
  { ch: 59, q: "Il dipinto smise di essere un oggetto collocato davanti al pubblico e diventò un avvenimento condiviso." },
  { ch: 60, q: "L’arte permette a una percezione individuale di entrare in relazione con altre vite e di partecipare a una realtà condivisa." },
  { ch: 61, q: "C’è anche una condizione che considero irrinunciabile: l’opera deve reggersi da sola prima che lo spettatore legga una sola parola su di essa." },
  { ch: 61, q: "L’opera appartiene all’artista mentre la crea, ma quando entra nel mondo comincia a ricevere interpretazioni che il suo autore non può più controllare." },
  { ch: 62, q: "Una mostra offre visibilità nel presente; un archivio può offrire presenza nel futuro." },
  { ch: 62, q: "Una fotografia che durante un’inaugurazione sembra un semplice ricordo può diventare decenni dopo una prova." },
  { ch: 63, q: "Un’opera può nascere in solitudine; il suo percorso quasi mai." },
  { ch: 63, q: "Il mercato non determinava la qualità artistica, ma creava le condizioni in cui il valore poteva essere riconosciuto, difeso e sostenuto." },
  { ch: 64, q: "Ogni opera trovò una parete; ogni artista, un territorio." },
  { ch: 65, q: "Un libro poteva varcare frontiere e durare per generazioni." },
  { ch: 65, q: "Il tempo è molto più esigente di qualsiasi editore." },
  { ch: 66, q: "La pittura mi ricordava che la creazione comincia proprio dove il controllo smette di essere assoluto." },
  { ch: 69, q: "Una galleria non comincia quando ha pareti proprie, ma quando le opere ricevono condizioni dignitose, un programma coerente e persone disposte a fermarsi davanti a esse." },
  { ch: 69, q: "Ogni traguardo rivela un’altra responsabilità, e ogni porta che apriamo ci obbliga a pensare a chi aspetta ancora di entrare." },
  { ch: 70, q: "Un’opera non può dipendere da una spiegazione per esistere." },
  { ch: 70, q: "Il volto smise di essere la destinazione della pittura e diventò una porta." },
  { ch: 70, q: "Una tecnica può cominciare come scoperta e finire come prigione quando l’artista si accorge che il pubblico la riconosce e decide di ripeterla all’infinito." },
  { ch: 70, q: "Ciò che unisce le sue diverse fasi è una domanda: come può un’opera trasformare i processi interiori dell’essere umano in un’esperienza visiva?" },
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

// Manifestos as published on oscarabreu.com (/statement and /manifiesto/2.html),
// in the artist's own Spanish, English and French versions. `work` is the image that
// opens each one on the site.
const MANIFESTO = {
  title: { es: 'La urgencia de crear: el arte como revelación', en: 'The Urgency to Create: Art as Revelation', fr: 'L’urgence de créer : l’art comme révélation' },
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
  fr: [
    'Je n’ai pas choisi l’art ; l’art m’a choisi. Il m’a traversé comme médium, champ de bataille et refuge. Depuis l’enfance, j’ai senti une énergie indomptable que le visible ne pouvait contenir. Une urgence intérieure exigeant de transformer l’intangible en image, le refoulé en forme. Cet élan fut—et demeure—le moteur vital de ma existence.',
    'Ce manifeste n’est ni une autobiographie traditionnelle ni un catalogue d’œuvres. C’est une carte émotionnelle. Chaque mot répond à une image, et chaque image est l’écho d’une expérience vécue qui a dû être transfigurée. Dans cet acte de création, j’ai trouvé du sens dans le chaos, de la musique dans la fracture, et de la beauté dans le brut, le non décoratif. Comme l’écrivait Jung : « Qui regarde en soi s’éveille. » Cet éveil n’apaise pas : il secoue. Là naît l’authentique.',
    'Le Psycho-Expressionnisme que je propose n’est ni une technique ni un courant : c’est une manière d’être au monde. Une éthique expressive assumée depuis la vulnérabilité et la lucidité. Je ne cherche pas à représenter ce que nous voyons mais ce que nous ressentons. Mon langage visuel est fait de taches, silences, ruptures et gestes ; entre le spontané et le délibéré s’ouvre une fêlure par où paraît l’âme.',
    'Bien que mon œuvre naisse de l’autobiographique, sa vocation est de s’étendre vers le collectif. Elle ne reste pas une confession intime : elle cherche une résonance universelle. En chaque pièce, il y a douleur mais aussi émerveillement ; désir mais aussi contemplation ; et, par-dessus tout, une vérité—non pas objective mais incarnée : émotionnelle, symbolique, profondément humaine.',
    'Ce manifeste est aussi une offrande. À ceux qui m’ont formé, aux symboles qui m’accompagnent, et à ceux qui cherchent dans l’art un langage quand les mots manquent. Plus qu’un parcours, je partage ici une façon de résister à l’oubli, de transformer la blessure en mémoire et la mémoire en signe.',
    'Je n’ai pas écrit ce livre pour plaire. Je l’ai écrit pour émouvoir. Pour ouvrir des questions. Pour agiter ce que nous croyions endormi. L’art qui m’intéresse n’orne pas : il interpelle. Il n’explique pas : il suggère. Il ne console pas : il réveille.',
    'Qui franchit ce seuil ne trouvera pas de réponses closes. Mais peut-être—entre ces mots et ces formes—trouvera-t-il un reflet de lui-même.',
    'Car l’art—lorsqu’il est vrai—ne parle pas de l’extérieur.',
    'Il parle depuis l’abîme.',
    'Et il nous révèle.',
  ],
};

const MANIFESTO2 = {
  title: { es: 'El trazo como origen', en: 'The Stroke as Origin', fr: 'Le trait comme origine' },
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
  fr: [
    'J’avais à peine trois ans. Je ne savais pas encore écrire, mais je dessinais déjà. Un bâton à la main. La terre comme toile.',
    'La cour poussiéreuse chez mes grands-parents à San Juan de la Maguana — au sud de la République dominicaine — fut, sans que je le sache, mon premier atelier.',
    'Je passais des heures à tracer des figures sur le sol humide, absorbé, concentré, comme si chaque ligne emportait un morceau de mon âme.',
    'Personne ne me l’a appris. Personne ne me l’a demandé. Mais je dessinais — parce que j’en avais besoin.',
    '« L’âme se nourrit de symboles. » — Carl G. Jung',
    'Plus tard, mes cahiers d’écolier se couvrirent de dessins : marges remplies, pages saturées. Ce n’était pas un divertissement : c’était une manière d’exister.',
    'Un élan jaillissant du corps, sans explication ; comme si je cherchais à parler à quelque chose de plus ancien, de plus profond que moi.',
    'La famille maternelle, sans formation académique, ne savait qu’en faire. Cela les amusait. On me laissait seul avec mes lignes et mes mondes inventés.',
    'Pour moi, ce n’était pas un jeu : c’était une affirmation. Une urgence. Respirer avec la main.',
    'Je me souviens d’une pièce spéciale chez ma grand-mère : la chambre des saints. Sur une table, un verre d’eau, des images de vierges, des prières, de l’encens.',
    'Une image m’hypnotisait : Saint Michel Archange, l’épée à la main, écrasant le diable avec une fermeté céleste. J’essayais de la copier encore et encore.',
    'Les détails religieux m’importaient peu. C’était le combat qui me frappait : la lutte silencieuse entre la lumière et l’ombre, la tension gravée dans le geste de l’archange.',
    '« On ne s’éclaire pas en imaginant des figures de lumière, mais en rendant consciente l’obscurité. » — Carl G. Jung',
    'Sans le savoir, je représentais déjà une bataille intérieure : je dessinais mes ombres — peur, désir, culpabilité.',
    'Cette image devint symbole. Et les symboles, avec les années, devinrent ma langue.',
    'Chaque trait sur la terre, chaque dessin sur papier, était une manière primitive de faire mémoire : donner un corps à l’innommable, un langage secret de gestes, de couleurs et de silences.',
    'Des années plus tard, je compris que c’était la graine de mon Psycho-Expressionnisme : une pratique née de l’isolement, de l’intuition et du désir de regarder au-dedans.',
    '« Connaître sa propre obscurité est la meilleure méthode pour affronter l’obscurité d’autrui. » — Carl G. Jung',
    'Je n’écris pas ce livre pour raconter des anecdotes. Je l’écris parce que l’art m’a sauvé. Quand je ne savais plus qui j’étais, l’art m’a soutenu.',
    'Quand tout se brisait, l’art était la fissure par où la lumière rentrait.',
    'Le Psycho-Expressionnisme n’est pas une théorie que j’ai conçue : c’est une manière de respirer. De résister. De comprendre l’expérience humaine dans ses couches les plus invisibles.',
    'C’est ma façon de vivre et de partager ma vérité.',
    'Ce livre n’est ni académique ni une autobiographie classique : c’est un manifeste émotionnel, une cartographie symbolique.',
    'J’écris pour tracer le chemin parcouru et offrir une carte à quiconque veut retrouver sa mémoire.',
    'Que ces pages soient une clé, une invitation — une faille lumineuse par laquelle chacun puisse se regarder.',
  ],
};

// Reviews as published on oscarabreu.com/reviews (Spanish, English and French). Only
// Cándido Gerón's full text is online (oscarabreu.com/candidogeron; Gamal Michelén's essay,
// not on the reviews page, is in MICHELEN below); the site's
// links for the other critics return 404, so they are left out.
const REVIEWS = {
  title: { es: 'Reseñas', en: 'Reviews', fr: 'Critiques' },
  intro: { es: 'Lecturas críticas sobre la obra de Oscar Abreu por parte de historiadores y críticos de arte.', en: 'Critical readings of Oscar Abreu’s work by art historians and leading critics.', fr: 'Lectures critiques de l’œuvre d’Oscar Abreu par des historiens et critiques d’art.' },
  items: [
    { critic: 'Marianne de Tolentino', year: '2004',
      es: 'Esta actitud formal concuerda con inquietudes humanistas y la creación de personajes “sobrevivientes y testigos” —así los califica el propio artista— comprometidos con su historia y comprometiendo la reflexión del espectador. Si no representa ni imita, Oscar Abreu sugiere e “inventa lo visible”, acorde con la propuesta del filósofo francés Henri Meschonnic acerca de la escritura y de la pintura: “Inventa otra cosa que el sentido. Y que tenga sentido.”',
      en: 'This formal attitude aligns with humanist concerns and with the creation of characters—“survivors and witnesses,” as the artist himself calls them—committed to their history and engaging the viewer’s reflection. Rather than representing or imitating, Oscar Abreu suggests and “invents the visible,” in keeping with the French philosopher Henri Meschonnic’s proposal regarding writing and painting: “Invent something other than meaning. And let it make sense.”',
      fr: 'Cette attitude formelle s’accorde avec des préoccupations humanistes et la création de personnages — « survivants et témoins », ainsi que les nomme l’artiste — engagés dans leur histoire et sollicitant la réflexion du spectateur. Plutôt que de représenter ou d’imiter, Oscar Abreu suggère et « invente le visible », conformément à la proposition du philosophe français Henri Meschonnic : « Invente autre chose que le sens. Et que cela ait du sens. »' },
    { critic: 'Abil Peralta Agüero', year: '1998',
      es: 'Oscar Abreu, aplica con sensibilidad y raciocinio una cromática deliberadamente anárquica en su exposición, sin dejarla desbordar hasta el esquizoide estado del abigarramiento, demostrando así poseer un ojo cromático de conciencia severa y fría, a pesar de la turbulencia y energía que emiten y transmiten hasta el ojo espectador las líneas de su dibujo vibrante y suelto.',
      en: 'With sensitivity and reason, Oscar Abreu applies a deliberately anarchic chromatic palette, without letting it spill over into a schizoid state of cluttered motley. Thus he shows a chromatic eye marked by a severe, cool awareness, despite the turbulence and energy that the vibrant, free line of his drawing emits and transmits to the viewer.',
      fr: 'Avec sensibilité et discernement, Oscar Abreu emploie une palette chromatique délibérément anarchique, sans la laisser déborder jusqu’à un état schizoïde de bariolage saturé. Il révèle ainsi un œil chromatique d’une conscience sévère et froide, malgré la turbulence et l’énergie que la ligne vibrante et libre de son dessin émet et transmet au regard.' },
    { critic: 'Abil Peralta Agüero', year: '2004',
      es: 'El diseño constructivo, normado por líneas afirmativas en la que prevalece el negro sobre colores cálidos, hace de la mancha y el accidente matérico una entidad de alta significación simbólica dentro de la lingüística visual de Oscar Abreu, en la que prevalecen como valores semánticos, tanto el valor de la pintura-pintura como lenguaje autónomo, como el valor sociológico del humanismo visceral que connota ante la mirada perceptora el habla interior existencial del propio artista.',
      en: 'The constructive design, governed by assertive lines in which black prevails over warm colors, turns stain and material accident into entities of high symbolic significance within Oscar Abreu’s visual linguistics. There, semantic values include both painting-as-painting as an autonomous language and the sociological value of a visceral humanism that, to the perceiving gaze, connotes the artist’s own interior, existential speech.',
      fr: 'Le dessin constructif, régi par des lignes affirmatives où le noir l’emporte sur les tons chauds, fait de la tache et de l’accident matériel une entité de haute portée symbolique au sein de la linguistique visuelle d’Oscar Abreu. Les valeurs sémantiques y incluent à la fois la peinture-en-tant-que-peinture comme langage autonome, et la valeur sociologique d’un humanisme viscéral qui, pour le regard percevant, connote la parole intérieure existentielle de l’artiste.' },
    { critic: 'Odalís G. Pérez', year: '2003',
      es: 'Indudablemente, el eje narrativo de la creación pictórica de Oscar Abreu traduce la visión transindividual del pintor, habida cuenta de los usos estético-sensibles abarcantes de la forma visual que asegura los bordes y centros de una obra presentificada en lo invisible como narrativa de lo visible.',
      en: 'Undoubtedly, the narrative axis of Oscar Abreu’s pictorial creation translates the painter’s trans-individual vision, given the wide aesthetico-sensitive uses of visual form that ensure the edges and centers of a work—made present within the invisible—become a narrative of the visible.',
      fr: 'Sans doute, l’axe narratif de la création picturale d’Oscar Abreu traduit la vision trans-individuelle du peintre, compte tenu des usages esthétiques et sensibles étendus de la forme visuelle qui font que bords et centres d’une œuvre, présentifiée dans l’invisible, deviennent récit du visible.' },
    { critic: 'Odalís G. Pérez', year: '1998',
      es: 'Las imágenes pictóricas de Oscar Abréu puntualizan cierta ontología, onirogestualidad que interpreta la luz, el falso sentido de la realidad que desajusta el vivir planteado y determinado por el artista. La raíz del acto pictórico va articulando todo un proceso desde el cual se unifica el orden de la línea, el punto, las densidades del color y de la forma. No se trata de un discurrir desde la sustancia y el encuadre temático, más bien se trata de un nacimiento del cuerpo alienado por el uso y el contacto corrosivo de los signos.',
      en: 'Oscar Abreu’s pictorial images pinpoint a certain ontology, an oneiric gesturality that interprets light and the false sense of reality that unsettles the life posited and determined by the artist. The root of the pictorial act articulates a process through which the order of line, point, and the densities of color and form are unified. This is not a discourse proceeding from substance and thematic framing; rather, it is the birth of a body alienated by the use and corrosive contact of signs.',
      fr: 'Les images picturales d’Oscar Abreu précisent une certaine ontologie, une gestualité onirique qui interprète la lumière et le faux sentiment de réalité perturbant la vie posée et déterminée par l’artiste. La racine de l’acte pictural articule un processus où s’unifient l’ordre de la ligne, du point, et les densités de la couleur et de la forme. Il ne s’agit pas d’un discours issu de la substance et de l’encadrement thématique ; il s’agit plutôt de la naissance d’un corps aliéné par l’usage et le contact corrosif des signes.' },
    { critic: 'José Saldaña', year: '1998',
      es: 'El mundo de Oscar Abreu se aparta de las referencias circunstanciales, de toda anécdota, para decir, exclamar, la concepción agónica y solitaria del individuo al que se refiere en cada uno de sus lienzos. Sugerente, explorador, de lo más inverosímil del ser, con habilidad y destreza precisa en las líneas.',
      en: 'Oscar Abreu’s world leaves aside circumstantial references and anecdote in order to say—indeed to cry out—the agonistic and solitary conception of the individual he addresses in each canvas. Suggestive, exploratory of the most implausible reaches of being, with skill and precise mastery of line.',
      fr: 'L’univers d’Oscar Abreu s’écarte des références circonstancielles et de toute anecdote pour dire — pour clamer — la conception agonique et solitaire de l’individu auquel il se réfère dans chacune de ses toiles. Suggestif, explorateur de l’invraisemblable de l’être, avec habileté et une maîtrise précise de la ligne.' },
    { critic: 'Fernando Morbán Laucer', year: '1999',
      es: 'La fuerza interpretativa de las obras de Oscar Abreu, en muchos casos, nos recrea los discursos pictóricos del pasado y presente siglo, donde descifrar el código de los símbolos y de las imágenes constituye una tarea que no siempre resulta fácil. Oscar Abreu se abraza en el año de 1994 a lo que él ha llamado Psico-Expresionismo, para con habilidad y talento crear las obras pictóricas de sus experiencias vividas durante diversas etapas de su vida y de distintos personajes, cual si fuera un psicoanalista.',
      en: 'The interpretive force of Oscar Abreu’s works often revisits the pictorial discourses of the past and present century, where deciphering the code of symbols and images is a task that is not always easy. In 1994, Abreu embraced what he called Psycho-Expressionism, and with skill and talent created paintings drawn from lived experiences across stages of his life and from different characters — as if he were a psychoanalyst.',
      fr: 'La force interprétative des œuvres d’Oscar Abreu recrée souvent les discours picturaux des siècles passé et présent, où déchiffrer le code des symboles et des images n’est pas toujours aisé. En 1994, Abreu adopte ce qu’il nomme le Psycho-Expressionnisme et, avec habileté et talent, crée des œuvres nourries de ses expériences et de divers personnages — comme s’il était psychanalyste.' },
    { critic: 'Cándido Gerón', year: '2000', url: 'https://oscarabreu.com/candidogeron/',
      es: 'En realidad, la pintura de Oscar Abreu propone valores plásticos y se ve afectada por todas las vías de expresión. Su diversidad evocadora ensaya ciertos paralelismos sosegados y silentes. En ocasiones, refleja una indulgente ilusión como si naciera desde el recuerdo y, en otros casos, nostálgicas reminiscencias en sus particulares anatemas.',
      en: 'In truth, Oscar Abreu’s painting proposes plastic values and is affected by every avenue of expression. Its evocative diversity essays certain quiet, silent parallelisms. At times it reflects an indulgent illusion, as if born of memory, and in other cases nostalgic reminiscences in his particular anathemas.',
      fr: 'En réalité, la peinture d’Oscar Abreu propose des valeurs plastiques et se voit affectée par toutes les voies d’expression. Sa diversité évocatrice tente certains parallélismes apaisés et silencieux. Parfois, elle reflète une indulgente illusion, comme née du souvenir ; d’autres fois, des réminiscences nostalgiques dans ses anathèmes particuliers.' },
    { critic: 'Myrna Guerrero', year: '2005',
      es: 'Puede que su discurso resulte ajeno o lejano por cuanto en la tradición pictórica dominicana prevalece la figuración. Sin embargo, no cabe duda de que tenemos que reconocer que estamos ante un artista comprometido con su propio ser y su espacio vital.',
      en: 'His discourse may seem alien or distant insofar as figuration prevails in Dominican pictorial tradition. Nevertheless, there is no doubt that we must acknowledge we are before an artist committed to his own being and vital space.',
      fr: 'Son discours peut paraître étranger ou lointain, dans la mesure où la figuration prévaut dans la tradition picturale dominicaine. Néanmoins, il ne fait aucun doute que nous sommes face à un artiste engagé envers son propre être et son espace vital.' },
  ],
};

// Gamal Michelén’s essay as published on oscarabreu.com/gamalmichelen (Spanish, English and
// French versions from the page itself; works on paper gallery4/56–60, titles only).
const MICHELEN = {
  url: 'https://oscarabreu.com/gamalmichelen/',
  title: { es: "Oscar Abreu, verdad o ilusión en su pintura?", en: "Oscar Abreu: truth or illusion in his painting?", fr: "Oscar Abreu : vérité ou illusion dans sa peinture ?" },
  by: { es: "Ensayo de Gamal Michelén", en: "Essay by Gamal Michelén", fr: "Essai de Gamal Michelén" },
  es: [
    "Escribió Hegel, “Lo que buscamos en el arte, lo mismo que en el pensamiento, es la verdad”, partiendo de esta expresión podemos conformar una dialéctica contrapuesta donde el arte oscila entre la verdad y la mentira o la ilusión. Cuando Kandinsky, en cierto sentido, responde a la convicción de Cézanne de que todo en la naturaleza puede ser reducido a su geometría simple y que al pintar una naranja lo que él busca es el círculo, en el tronco del árbol un cilindro y en la montaña una pirámide —es decir, que esas figuras son solo el pretexto para armar geometrías compositivas— se pregunta: ¿por qué no eliminar el pretexto y pintar el círculo, el cilindro y la pirámide? ¿Por qué necesitamos lo figurativo si, al final, toda la pintura es una mentira? Es una ilusión incluso la sensación de profundidad cuando el lienzo es plano y bidimensional.",
    "De ahí surge la abstracción porque, en un sentido último, una pintura no es otra cosa que una combinación armónica de líneas, manchas y tonos: las primeras expresan dirección, las segundas equilibrio de peso y los últimos la mayor o menor luminosidad de las partes.",
    "Hemos procurado en varias ocasiones definir el psico-expresionismo de Oscar Abreu y presentar su obra como un desahogo, una liberación de su universo interno. En ese contexto —y contrastando con aquello que vuelve a la pintura una ilusión— proponemos ahora, en aparente paradoja, que su obra contiene una alta dosis de verdad.",
    "Cuando André Bretón trató de convencer a Frida Kahlo de que su pintura era surrealista, ella lo contradijo: su obra no habitaba otro meridiano de la realidad; por el contrario, era muy real porque hacía catarsis al pintar, y lo que reflejaba era su propia vida: una verdad objetiva y, a veces, dolorosa.",
    "Esto nos concede la licencia de analizar la obra de Abreu, destacar sus rasgos distintivos y asignarles claves de significado para buscar eso que llamamos verdad. Porque, como dijo Oscar Wilde, cuando el artista hace una obra de arte limita la visión; es el espectador quien la amplía al contemplarla. Así, nos permitimos hacer una exégesis de su obra. Más allá de su temática plural y compleja, hay un claro protagonismo de la mujer que remite al rol de su madre, Rosa, en su formación, y a Rosanna, su hermana, fallecida trágicamente en el vuelo 587 de AA en noviembre de 2001. Esa lección —que muchas veces la vida duele— vuelve a la mujer tema primordial si entendemos la pintura como liberación: verdad real atada a los intrincados mundos de su psique. De ahí que dos proposiciones opuestas sean ciertas: el arte es certeza y, a la vez, ilusión. Es real su insistencia en la mirada —los ojos— a veces abiertos, como en “las hermanas” y “voluntad”, y con frecuencia cerrados, como en “secuestro del olvido”, “momentos de relajación” y “remembranza de mi maestro”.",
    "Más complejo es analizar sus geometrías: verticales, horizontales, diagonales; juegos de cuadrados y rectángulos que construyen armonías compositivas. Pensamos que son, sencillamente, intuitivas.",
    "Es la corazonada del artista: la obra adquiere autonomía y se libera, mientras el hacedor la mantiene dentro de un criterio armónico. Eso la vuelve atractiva y nos permite afirmar, como críticos, que estamos ante una factura depurada.",
    "En definitiva, el arte construye una dialéctica entre la verdad y la ilusión. En este conjunto de pinturas de Abreu lo comprobamos. Solo queda exponernos a su contemplación y permitir que haga empatía con nuestra mente porque, al final, el arte es eso: una alianza emotiva entre el artista y nuestra conciencia.",
  ],
  en: [
    "Hegel wrote: “What we seek in art, as in thought, is truth.” From this statement we can set up a counterposed dialectic in which art oscillates between truth and falsehood—or illusion. When Kandinsky, in a sense, responds to Cézanne’s conviction that everything in nature can be reduced to simple geometry—painting an orange as a circle, a tree trunk as a cylinder, a mountain as a pyramid—he asks: why not remove the pretext and paint the circle, the cylinder, and the pyramid themselves? Why do we need figuration if, in the end, painting is a kind of lie? Even depth is illusory on a flat, two-dimensional canvas.",
    "Hence abstraction arises, because ultimately a painting is a harmonious combination of lines, patches, and tones: the first express direction, the second balance of weight, and the last the degree of luminosity.",
    "We have often tried to define Oscar Abreu’s Psycho-Expressionism and present his work as catharsis—a release of his inner universe. In that context—and in contrast with what makes painting an illusion—we now propose, in apparent paradox, that his work contains a strong dose of truth.",
    "When André Breton tried to convince Frida Kahlo that her painting was Surrealist, she contradicted him: her work did not inhabit another meridian of reality; rather, it was profoundly real because painting was catharsis, and what it reflected was her own life—an objective, sometimes painful, truth.",
    "This grants us license to analyze Abreu’s work, highlight its distinctive traits, and assign meaning keys in the search for truth. For, as Oscar Wilde said, when the artist creates a work of art, the vision is limited; it is the spectator who expands it upon contemplating it. Thus we venture an exegesis. Beyond its plural, complex themes, there is a clear prominence of women that points to the role of his mother, Rosa, in his formation, and to Rosanna, his sister, tragically lost on AA Flight 587 in November 2001. That lesson—that life often hurts—makes woman a primary subject if we understand painting as release: a real truth tied to the intricate worlds of his psyche. Hence two opposing propositions can both be true: art is certainty and, at once, illusion. His insistence on the gaze—eyes sometimes open, as in “las hermanas” and “voluntad,” and often closed, as in “secuestro del olvido,” “momentos de relajación,” and “remembranza de mi maestro”—is real.",
    "More complex is an analysis of his geometries: verticals, horizontals, diagonals; games of squares and rectangles that build compositional harmonies—intuitive, we believe.",
    "It is the artist’s hunch: the work gains autonomy and frees itself while the maker holds it within a harmonic criterion. That makes it compelling and allows us, as critics, to affirm a refined craftsmanship.",
    "Ultimately, art builds a dialectic between truth and illusion. In this body of Abreu’s paintings we see it clearly. What remains is to expose ourselves to contemplation and let the work resonate with our mind, because art, in the end, is an emotional alliance between the artist and our consciousness.",
  ],
  fr: [
    "Hegel écrivait : « Ce que nous cherchons dans l’art, comme dans la pensée, c’est la vérité. » À partir de là, l’art oscille entre vérité et mensonge — ou illusion. Lorsque Kandinsky répond, d’une certaine manière, à la conviction de Cézanne que tout dans la nature se réduit à une géométrie simple (l’orange-cercle, le tronc-cylindre, la montagne-pyramide), il demande : pourquoi ne pas supprimer le prétexte et peindre directement cercle, cylindre et pyramide ? Pourquoi le figuratif, si la peinture, au fond, est un « mensonge » ? Même la profondeur est illusoire sur une toile plane.",
    "D’où l’abstraction : un tableau n’est, en dernière analyse, qu’une combinaison harmonieuse de lignes, taches et tons ; les premières donnent la direction, les secondes l’équilibre, les derniers la luminosité.",
    "Nous avons souvent défini le Psycho-Expressionnisme d’Oscar Abreu comme une catharsis, une libération de son univers intérieur. Dans ce cadre — et par contraste avec ce qui fait de la peinture une illusion — nous avançons, paradoxe apparent, que son œuvre contient une forte dose de vérité.",
    "Quand André Breton voulut convaincre Frida Kahlo que sa peinture était surréaliste, elle s’y opposa : son œuvre n’habitait pas un autre méridien du réel ; elle était profondément réelle, la peinture étant une catharsis et le reflet de sa vie même — une vérité objective, parfois douloureuse.",
    "Cela nous autorise à analyser l’œuvre d’Abreu, à en dégager les traits distinctifs et à leur attribuer des clés de sens pour chercher la vérité. Car, comme le disait Oscar Wilde, l’artiste limite la vision en créant ; c’est le spectateur qui l’élargit en contemplant. Ainsi risquons-nous une exégèse. Au-delà des thèmes pluriels et complexes, la femme occupe une place centrale — renvoyant au rôle de sa mère, Rosa, et à Rosanna, sa sœur, tragiquement disparue lors du vol AA 587 en novembre 2001. Cette leçon — que la vie blesse souvent — fait de la femme un sujet majeur si l’on comprend la peinture comme libération : vérité réelle liée aux mondes intriqués de sa psyché. Deux propositions opposées peuvent donc être vraies : l’art est certitude et, en même temps, illusion. Réelle est son insistance sur le regard — yeux parfois ouverts (« las hermanas », « voluntad »), souvent fermés (« secuestro del olvido », « momentos de relajación », « remembranza de mi maestro »).",
    "Plus complexe : ses géométries — verticales, horizontales, diagonales ; jeux de carrés et de rectangles bâtissant des harmonies compositionnelles. Nous les pensons intuitives.",
    "C’est l’intuition de l’artiste : l’œuvre gagne en autonomie tout en restant tenue par un critère harmonique. Cela la rend prenante et manifeste une facture raffinée.",
    "En somme, l’art tisse une dialectique entre vérité et illusion. Ce corpus de toiles d’Abreu en témoigne. Il ne reste qu’à se livrer à la contemplation et laisser l’œuvre résonner avec notre esprit : au bout du compte, l’art est une alliance affective entre l’artiste et notre conscience.",
  ],
  works: [
    { img: 'img/reviews/michelen-56.jpg', title: "Huellas Personales" },
    { img: 'img/reviews/michelen-57.jpg', title: "La Voz del Pasado" },
    { img: 'img/reviews/michelen-58.jpg', title: "El Peso del Yo" },
    { img: 'img/reviews/michelen-59.jpg', title: "El Cuerpo que Recuerda" },
    { img: 'img/reviews/michelen-60.jpg', title: "Identidad Intermitente" },
  ],
};

// oscarabreu.com/exhibits (a 2008 page): one catalogue, as published. Its
// gallery (/exhibits/VII/, 48 images) holds the same files as paintings 1–36
// and sculptures 1–12, so the app links to those galleries instead.
const CATALOGUE = {
  img: 'img/exhibits/huellas-catalogue.jpg', title: 'Huellas “La invención de lo visible”',
  venue: 'Museo del Hombre Dominicano', year: 2004,
  text: 'Published on the occasion of the exhibitions “Huellas “La invención de lo visible”” at Museo del Hombre Dominicano, Dominican Republic, (November 4-20, 2004). Softcover. 64 pgs. with essay by Marianne de Tolentino, Odalís G. Pérez, Abil Peralta Agüero',
  dates: { es: '4–20 de noviembre de 2004', en: 'November 4–20, 2004', fr: '4–20 novembre 2004' },
  format: { es: 'Tapa blanda · 64 páginas', en: 'Softcover · 64 pages', fr: 'Couverture souple · 64 pages' },
  essays: 'Marianne de Tolentino, Odalís G. Pérez, Abil Peralta Agüero',
};

// oscarabreu.com/contact. The site spells the Instagram handle "aertist"; the account is @oscarabreu_artist
// ("Oscar Abreu | Psico-Expresionismo", linking to oscarabreu.com). Portrait from the same page.
const CONTACT = {
  photo: 'img/oscar-abreu.jpg',
  whatsapp: { label: '1809-840-9588', url: 'https://wa.me/18098409588' },
  instagram: { label: '@oscarabreu_artist', url: 'https://www.instagram.com/oscarabreu_artist/' },
  email: 'info@oscarabreu.com',
};

// Press list as published on oscarabreu.com/bibliography: headlines as each
// outlet published them (Spanish), with the site's own summaries in Spanish, English and French.
const BIBLIOGRAPHY = {
  title: { es: 'Bibliografía y prensa', en: 'Bibliography & Press', fr: 'Bibliographie & Presse' },
  intro: { es: 'Selección de artículos, entrevistas y notas recientes sobre Oscar Abreu en medios de referencia.', en: 'A selection of recent articles, interviews, and features on Oscar Abreu from reputable outlets.', fr: 'Sélection d’articles récents, d’entretiens et de dossiers sur Oscar Abreu issus de médias de référence.' },
  note: { es: 'Los titulares se muestran tal como fueron publicados por cada medio. Selección en actualización continua.', en: 'Headlines are shown exactly as originally published by each outlet. Selection updated on a rolling basis.', fr: 'Les titres sont affichés tels que publiés à l’origine par chaque média. Sélection mise à jour en continu.' },
  items: [
    { title: 'Pequeños y medianos formatos de Oscar Abreu en Puerto Rico', outlet: 'Hoy',
      url: 'https://hoy.com.do/pequenos-y-medianos-formatos-de-oscar-abreu-en-puerto-rico/',
      es: 'Cobertura de la muestra de pequeños y medianos formatos presentada en Puerto Rico. El artículo destaca la experimentación material y la continuidad del Psico-Expresionismo en obras recientes, así como la cercanía con el público local. Incluye detalles del montaje y del enfoque curatorial.',
      en: 'Coverage of a presentation of small and medium formats in Puerto Rico. The piece highlights material experimentation and the continuity of Psycho-Expressionism in recent works, as well as a close rapport with local audiences. It also mentions curatorial choices and display.',
      fr: 'Couverture d’une présentation de petits et moyens formats à Porto Rico. L’article met en avant l’expérimentation matérielle et la continuité du Psycho-Expressionnisme dans les œuvres récentes, ainsi que la proximité avec le public local. Des choix curatoriaux et scénographiques sont évoqués.' },
    { title: 'Oscar Abreu: cuando el arte ayuda a los demás', outlet: 'Diario Libre',
      url: 'https://www.diariolibre.com/revista/oscar-abreu-cuando-el-arte-ayuda-a-los-dems-KODL84815',
      es: 'Reporte que pone en primer plano la dimensión social del trabajo de Abreu: iniciativas benéficas, subastas y acciones comunitarias articuladas desde el arte. El medio subraya cómo su práctica conecta sensibilidad estética con impacto real. Un perfil humano y comprometido.',
      en: 'A feature foregrounding the social dimension of Abreu’s practice: charitable initiatives, benefit auctions, and community-driven action. The outlet stresses the bond between aesthetic sensitivity and real-world impact. A humane, committed profile.',
      fr: 'Un dossier qui met au premier plan la dimension sociale de la pratique d’Abreu : initiatives caritatives, ventes solidaires et actions communautaires. Le média souligne le lien entre sensibilité esthétique et impact concret. Un portrait engagé et humain.' },
    { title: 'Oscar Abreu: “El arte salvó mi vida”', outlet: 'Listín Diario', date: '2018-01-13',
      url: 'https://listindiario.com/las-sociales/2018/01/13/498494/oscar-abreu-el-arte-salvo-mi-vida.html',
      es: 'Entrevista y testimonio sobre la trayectoria del artista, donde narra cómo la disciplina y la creación transformaron momentos difíciles. La nota repasa hitos de carrera y motivaciones íntimas. Una lectura valiosa para comprender su ética de trabajo.',
      en: 'Interview and personal account of the artist’s path, reflecting on how discipline and creation transformed difficult moments. The article revisits career milestones and inner motivations. Useful reading to grasp his work ethic.',
      fr: 'Entretien et témoignage personnel sur la trajectoire de l’artiste, expliquant comment la discipline et la création ont transformé des moments difficiles. L’article revisite des jalons de carrière et des motivations intimes. Une clé pour comprendre son éthique de travail.' },
    { title: 'Oscar Abreu deja sus huellas en Trinidad y Tobago', outlet: 'Hoy',
      url: 'https://hoy.com.do/oscar-abreu-deja-sus-huellas-en-trinidad-y-tobago/',
      es: 'Crónica de actividades en Trinidad y Tobago, con énfasis en la pintura en vivo y el intercambio cultural. Se reseña la recepción del público y el diálogo con artistas de la región. La cobertura enfatiza la huella creativa que dejó la visita.',
      en: 'Report from Trinidad & Tobago with emphasis on live painting and cultural exchange. It covers audience reception and dialogue with regional artists. The coverage points to the creative imprint left by the visit.',
      fr: 'Reportage depuis Trinité-et-Tobago, axé sur la peinture en direct et l’échange culturel. Réception du public et dialogue avec des artistes régionaux sont détaillés. Le texte insiste sur l’empreinte créative laissée par la visite.' },
    { title: 'Muestran “Por el amor de Dios” de Oscar Abreu', outlet: 'La Información',
      url: 'https://lainformacion.com.do/tendencias/tendencias/muestran-por-el-amor-de-dios-de-oscar-abreu',
      es: 'Presentación de la serie “Por el amor de Dios”, con comentarios sobre su carga simbólica y su exploración de memoria y espiritualidad. Se mencionan recursos de color y capas texturales característicos. La nota contextualiza la propuesta dentro de su obra.',
      en: 'Presentation of the series “Por el amor de Dios,” noting its symbolic charge and explorations of memory and spirituality. Color strategies and layered textures are discussed. The piece situates the work within his broader production.',
      fr: 'Présentation de la série « Por el amor de Dios », soulignant sa charge symbolique et ses explorations de la mémoire et de la spiritualité. Couleur et textures stratifiées sont discutées. L’article situe l’ensemble dans sa production globale.' },
    { title: 'Oscar Abreu presentará su arte en Alemania', outlet: 'Diario Libre', date: '2025-05-29',
      url: 'https://www.diariolibre.com/revista/cultura/2025/05/29/oscar-abreu-presentara-su-arte-en-alemania/3131395',
      es: 'Anuncio de agenda artística en Alemania, con muestras y presentaciones públicas. La publicación enfatiza el alcance internacional del proyecto y su proyección en el circuito europeo. Un adelanto de itinerario y objetivos.',
      en: 'Announcement of upcoming presentations in Germany, including public events. The article underscores the project’s international scope and projection in the European circuit. A preview of itinerary and goals.',
      fr: 'Annonce de présentations en Allemagne, incluant des événements publics. Le papier insiste sur la portée internationale du projet et sa projection dans le circuit européen. Un aperçu de l’itinéraire et des objectifs.' },
    { title: 'Oscar Abreu emociona a Hamburgo con un poderoso performance pictórico', outlet: 'El Nuevo Diario',
      url: 'https://elnuevodiario.com.do/oscar-abreu-emociona-a-hamburgo-con-un-poderoso-performance-pictorico-durante-la-segunda-semana-dominicana-en-alemania/',
      es: 'Reseña del performance pictórico realizado en Hamburgo durante la Semana Dominicana en Alemania. El texto describe la energía del proceso en vivo y la respuesta del público. Señala conexiones con los ejes de memoria e identidad.',
      en: 'Review of a pictorial performance in Hamburg during Dominican Week in Germany. It describes the energy of the live process and the audience’s response, linking it to themes of memory and identity. Immediate impact on site.',
      fr: 'Compte rendu d’une performance picturale à Hambourg durant la Semaine dominicaine en Allemagne. Énergie du processus live et réaction du public sont décrites, en lien avec la mémoire et l’identité. Un impact immédiat en salle.' },
    { title: 'Oscar Abreu presentará en Miami “Estructura de la memoria”', outlet: 'El Nuevo Diario',
      url: 'https://elnuevodiario.com.do/oscar-abreu-presentara-en-miami-estructura-de-la-memoria/',
      es: 'Anuncio de la exposición “Estructura de la memoria” en Miami, con apuntes curatoriales y claves del Psico-Expresionismo. Se resalta la relevancia del contexto de Miami y su diálogo con la diáspora. Una parada estratégica en su calendario.',
      en: 'Announcement of the Miami show “Structure of Memory,” with curatorial notes and Psycho-Expressionism keys. The relevance of Miami’s context and the dialogue with the diaspora are highlighted. A strategic stop in his calendar.',
      fr: 'Annonce de l’exposition de Miami « Structure de la mémoire », avec notes curatoriales et clés du Psycho-Expressionnisme. L’importance du contexte miamien et le dialogue avec la diaspora sont soulignés. Une étape stratégique.' },
    { title: 'Oscar Abreu, invitado especial y en portada durante Miami Art Week', outlet: 'Diario Hispaniola',
      url: 'https://www.diariohispaniola.com/noticia/17849/entretenimiento-y-cultura/oscar-abreu-invitado-especial-y-en-portada-de-revista-durante-miami-art-week.html',
      es: 'Nota sobre su participación como invitado especial y presencia en portada durante la Miami Art Week. Se subraya la visibilidad que otorga el ecosistema ferial y mediático de la ciudad. Reconocimiento y proyección internacional.',
      en: 'Note on his role as special guest and magazine cover presence during Miami Art Week. It stresses the visibility granted by the fair and media ecosystem. International projection and recognition.',
      fr: 'Note sur sa participation en tant qu’invité d’honneur et sa présence en couverture pendant la Miami Art Week. La visibilité offerte par l’écosystème foires/médias est mise en avant. Rayonnement et reconnaissance internationaux.' },
    { title: 'Oscar Abreu deslumbra en Alemania con un performance', outlet: 'El Día',
      url: 'https://eldia.com.do/oscar-abreu-deslumbra-en-alemania-con-un-performance/',
      es: 'Cobertura del performance realizado en Alemania, destacando su potencia escénica y el uso de recursos gestuales. El medio resalta la recepción entusiasta y el carácter experimental de la propuesta. Una lectura del impacto inmediato en sala.',
      en: 'Coverage of a performance in Germany, emphasizing gestural force and stage presence. The outlet notes the enthusiastic reception and experimental character of the proposal. A snapshot of its immediate impact.',
      fr: 'Couverture d’une performance en Allemagne, insistant sur la force gestuelle et la présence scénique. Réception enthousiaste et caractère expérimental sont relevés. Un instantané de l’impact immédiat.' },
  ],
};
