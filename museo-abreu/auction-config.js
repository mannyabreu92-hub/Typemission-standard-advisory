// The museum's auction: online only, bidding in the app until `closesAt`; the highest bid wins.
// (To end it live at an event instead, set `live` to { event, tier } from EVENTS, e.g. the ART GABANGI dinner.)
// Shared by the app and the bidding server (api/auction.js), which enforces these rules.
//
// A lot opens for online bids only when it has a starting bid and a closing time. A lot marked
// `example: true` is hidden.
var AUCTION = {
  live: null,                                     // online only (no live finale)
  increment: 100,                                 // USD; each bid must beat the current one by this much
  startBid: 1000,                                 // USD; the opening bid of every lot unless the lot sets its own
  // Soft close: a bid in the last `window` seconds moves that lot's close to `extend` seconds after it,
  // so nobody wins by bidding in the final second and everyone gets a fair chance to answer.
  softClose: { window: 120, extend: 120 },
  closesAt: '2026-12-15T20:00:00-04:00',          // December 15, 2026, 8 pm in Santo Domingo (AST)
  // About each artist, as ART GABANGI · Top 100 Artist prints it (all Dominican; Jesús Desangles' birth year is cut
  // off in the pages received). Shown in each work's Details panel.
  artists: {
    'Wilson Abreu': { born: 1972 }, 'José Almonte': { born: 1969 }, 'Juan Andújar': { born: 1986 },
    'Elvis Avilés': { born: 1964, died: 2022 }, 'Alejandro Asencio': { born: 1971 }, 'Aquiles Azar Billini': { born: 1965 },
    'Osiris Blanc': { born: 1983, died: 2025 }, 'Augusto Batlle': { born: 1995 }, 'Carlos Baret': { born: 1989 },
    'Juan Bravo': { born: 1961 }, 'Félix Bonilla Gerena': { born: 1968 }, 'Dionisio Blanco': { born: 1953 },
    'Ángel Castillo': { born: 1973 }, 'Máximo Caminero': { born: 1962 }, 'Freddie Cabral': { born: 1948 },
    'José Cestero': { born: 1937, died: 2025 }, 'Benjamín Cruz': { born: 1986 }, 'Jorge Checo': { born: 1968 },
    'Jesús Desangles': {}, 'Ney Díaz Henríquez': { born: 1974, died: 2015 },
    'Oscar Abreu': { born: 1978 }, // San Juan de la Maguana, 1978 (data.js, his biography)
  },
  lots: [
    // The works from ART GABANGI · Top 100 Artist come first (lots 1–53), then Oscar Abreu's own.
    // Works by Wilson Abreu (Dominican, b. 1972), as published in ART GABANGI · Top 100 Artist (pp. 25–27).
    { id: 'enfrentamiento', kind: 'painting', artist: 'Wilson Abreu', year: 2018, img: 'img/wilson-enfrentamiento.jpg', thumb: 'img/wilson-enfrentamiento-600.jpg', w: 1196, h: 427,
      title: { es: 'Enfrentamiento', en: 'Enfrentamiento (Confrontation)', fr: 'Enfrentamiento' },
      spec: { es: 'Técnica mixta sobre lienzo · 30 × 80 pulg. (76,2 × 203,2 cm)', en: 'Mixed media on canvas · 30 × 80 in (76.2 × 203.2 cm)', fr: 'Technique mixte sur toile · 30 × 80 po (76,2 × 203,2 cm)' },
      startBid: 1000 },
    { id: 'el-poeta', kind: 'painting', artist: 'Wilson Abreu', img: 'img/wilson-el-poeta.jpg', thumb: 'img/wilson-el-poeta-600.jpg', w: 514, h: 698,
      title: { es: 'El Poeta', en: 'El Poeta (The Poet)', fr: 'El Poeta' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    // By José Almonte (Dominican, b. 1969), from the same book; its title and size are not given there (the caption
    // under it repeats another work's), so it is listed by its artist until the museum confirms them.
    { id: 'almonte', kind: 'painting', artist: 'José Almonte', img: 'img/almonte-100.jpg', thumb: 'img/almonte-100-600.jpg', w: 1073, h: 1073,
      title: { es: 'Obra de José Almonte', en: 'Work by José Almonte', fr: 'Œuvre de José Almonte' },
      startBid: 1000 },
    // Works by Juan Andújar (Dominican, b. 1986), from the same book (pp. 30–35).
    { id: 'sajoma', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-sajoma.jpg', thumb: 'img/andujar-sajoma-600.jpg', w: 1120, h: 1485,
      title: { es: 'Sajoma', en: 'Sajoma', fr: 'Sajoma' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    { id: 'el-constructor-de-suenos', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-constructor.jpg', thumb: 'img/andujar-constructor-600.jpg', w: 494, h: 622,
      title: { es: 'El Constructor de Sueños', en: 'El Constructor de Sueños (The Dream Builder)', fr: 'El Constructor de Sueños' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    { id: 'sinfonia-interior', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-sinfonia.jpg', thumb: 'img/andujar-sinfonia-600.jpg', w: 495, h: 628,
      title: { es: 'Sinfonía Interior', en: 'Sinfonía Interior (Inner Symphony)', fr: 'Sinfonía Interior' },
      spec: { es: 'Técnica mixta sobre lienzo · 50 × 40 pulg. (127 × 101,6 cm)', en: 'Mixed media on canvas · 50 × 40 in (127 × 101.6 cm)', fr: 'Technique mixte sur toile · 50 × 40 po (127 × 101,6 cm)' },
      startBid: 1000 },
    { id: 'el-poeta-invisible', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-poeta-invisible.jpg', thumb: 'img/andujar-poeta-invisible-600.jpg', w: 1120, h: 1408,
      title: { es: 'El Poeta Invisible', en: 'El Poeta Invisible (The Invisible Poet)', fr: 'El Poeta Invisible' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    { id: 'geografia-del-silencio', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-geografia.jpg', thumb: 'img/andujar-geografia-600.jpg', w: 523, h: 654,
      title: { es: 'Geografía del Silencio', en: 'Geografía del Silencio (Geography of Silence)', fr: 'Geografía del Silencio' },
      spec: { es: 'Técnica mixta sobre lienzo · 50 × 40 pulg. (127 × 101,6 cm)', en: 'Mixed media on canvas · 50 × 40 in (127 × 101.6 cm)', fr: 'Technique mixte sur toile · 50 × 40 po (127 × 101,6 cm)' },
      startBid: 1000 },
    { id: 'arquitectura-de-la-imaginacion', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-arquitectura.jpg', thumb: 'img/andujar-arquitectura-600.jpg', w: 523, h: 657,
      title: { es: 'Arquitectura de la Imaginación', en: 'Arquitectura de la Imaginación (Architecture of Imagination)', fr: 'Arquitectura de la Imaginación' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    { id: 'memoria-de-luz', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-memoria.jpg', thumb: 'img/andujar-memoria-600.jpg', w: 521, h: 652,
      title: { es: 'Memoria de Luz', en: 'Memoria de Luz (Memory of Light)', fr: 'Memoria de Luz' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    { id: 'el-guardian-de-los-recuerdos', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-guardian.jpg', thumb: 'img/andujar-guardian-600.jpg', w: 523, h: 629,
      title: { es: 'El Guardián de los Recuerdos', en: 'El Guardián de los Recuerdos (The Keeper of Memories)', fr: 'El Guardián de los Recuerdos' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    { id: 'omega-el-fuerte', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-omega.jpg', thumb: 'img/andujar-omega-600.jpg', w: 1120, h: 1471,
      title: { es: 'Omega El Fuerte', en: 'Omega El Fuerte', fr: 'Omega El Fuerte' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    // Works by Elvis Avilés (Dominican, 1964–2022), from the same book.
    { id: 'armonia-interior', kind: 'painting', artist: 'Elvis Avilés', year: 2009, img: 'img/aviles-armonia.jpg', thumb: 'img/aviles-armonia-600.jpg', w: 1149, h: 409,
      title: { es: 'Armonía Interior', en: 'Armonía Interior (Inner Harmony)', fr: 'Armonía Interior' },
      spec: { es: 'Técnica mixta sobre lienzo · 24 × 64 pulg. (61 × 162,6 cm)', en: 'Mixed media on canvas · 24 × 64 in (61 × 162.6 cm)', fr: 'Technique mixte sur toile · 24 × 64 po (61 × 162,6 cm)' },
      startBid: 1000 },
    { id: 'fragmento-de-una-melodia', kind: 'painting', artist: 'Elvis Avilés', year: 2009, img: 'img/aviles-fragmento.jpg', thumb: 'img/aviles-fragmento-600.jpg', w: 1149, h: 410,
      title: { es: 'Fragmento de una Melodía', en: 'Fragmento de una Melodía (Fragment of a Melody)', fr: 'Fragmento de una Melodía' },
      spec: { es: 'Técnica mixta sobre lienzo · 24 × 64 pulg. (61 × 162,6 cm)', en: 'Mixed media on canvas · 24 × 64 in (61 × 162.6 cm)', fr: 'Technique mixte sur toile · 24 × 64 po (61 × 162,6 cm)' },
      startBid: 1000 },
    // By Alejandro Asencio (Dominican, b. 1971), from the same book.
    { id: 'fin-de-un-sueno-en-el-este', kind: 'painting', artist: 'Alejandro Asencio', year: 2003, img: 'img/asencio-fin-de-un-sueno.jpg', thumb: 'img/asencio-fin-de-un-sueno-600.jpg', w: 1148, h: 911,
      title: { es: 'Fin de un Sueño en el Este', en: 'Fin de un Sueño en el Este (The End of a Dream in the East)', fr: 'Fin de un Sueño en el Este' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 50 pulg. (101,6 × 127 cm)', en: 'Mixed media on canvas · 40 × 50 in (101.6 × 127 cm)', fr: 'Technique mixte sur toile · 40 × 50 po (101,6 × 127 cm)' },
      startBid: 1000 },
    // By Aquiles Azar Billini (Dominican, b. 1965), from the same book.
    { id: 'composicion-de-la-forma', kind: 'painting', artist: 'Aquiles Azar Billini', year: 2017, img: 'img/azar-composicion.jpg', thumb: 'img/azar-composicion-600.jpg', w: 538, h: 823,
      title: { es: 'Composición de la Forma', en: 'Composición de la Forma (Composition of Form)', fr: 'Composición de la Forma' },
      spec: { es: 'Técnica mixta sobre papel · 40 × 26 pulg. (101,6 × 66 cm)', en: 'Mixed media on paper · 40 × 26 in (101.6 × 66 cm)', fr: 'Technique mixte sur papier · 40 × 26 po (101,6 × 66 cm)' },
      startBid: 1000 },
    // Works by Osiris Blanc (Dominican, 1983–2025), from the same book.
    { id: 'equilibrium-i', kind: 'sculpture', artist: 'Osiris Blanc', year: 2010, img: 'img/blanc-equilibrium-1.jpg', thumb: 'img/blanc-equilibrium-1-600.jpg', w: 557, h: 835,
      title: { es: 'Equilibrium I', en: 'Equilibrium I', fr: 'Equilibrium I' },
      spec: { es: 'Madera · 21 1/2 × 8 × 5 pulg. (54,6 × 20,3 × 12,7 cm)', en: 'Wood · 21 1/2 × 8 × 5 in (54.6 × 20.3 × 12.7 cm)', fr: 'Bois · 21 1/2 × 8 × 5 po (54,6 × 20,3 × 12,7 cm)' },
      startBid: 1000 },
    { id: 'equilibrium-ii', kind: 'sculpture', artist: 'Osiris Blanc', year: 2010, img: 'img/blanc-equilibrium-2.jpg', thumb: 'img/blanc-equilibrium-2-600.jpg', w: 557, h: 835,
      title: { es: 'Equilibrium II', en: 'Equilibrium II', fr: 'Equilibrium II' },
      spec: { es: 'Madera · 21 1/2 × 8 × 5 pulg. (54,6 × 20,3 × 12,7 cm)', en: 'Wood · 21 1/2 × 8 × 5 in (54.6 × 20.3 × 12.7 cm)', fr: 'Bois · 21 1/2 × 8 × 5 po (54,6 × 20,3 × 12,7 cm)' },
      startBid: 1000 },
    { id: 'mi-musa', kind: 'painting', artist: 'Osiris Blanc', year: 2020, img: 'img/blanc-mi-musa.jpg', thumb: 'img/blanc-mi-musa-600.jpg', w: 556, h: 740,
      title: { es: 'Mi Musa', en: 'Mi Musa (My Muse)', fr: 'Mi Musa' },
      spec: { es: 'Técnica mixta sobre panel de PVC · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on PVC panel · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur panneau PVC · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    // Works by Augusto Batlle (Dominican, b. 1995), from the same book.
    { id: 'lo-que-somos-i', kind: 'painting', artist: 'Augusto Batlle', year: 2016, img: 'img/batlle-lo-que-somos-1.jpg', thumb: 'img/batlle-lo-que-somos-1-600.jpg', w: 557, h: 797,
      title: { es: 'Lo que somos I', en: 'Lo que somos I (What We Are)', fr: 'Lo que somos I' },
      spec: { es: 'Técnica mixta sobre lienzo · 34 1/4 × 24 pulg.', en: 'Mixed media on canvas · 34 1/4 × 24 in', fr: 'Technique mixte sur toile · 34 1/4 × 24 po' },
      startBid: 1000 },
    { id: 'lo-que-somos-ii', kind: 'painting', artist: 'Augusto Batlle', year: 2016, img: 'img/batlle-lo-que-somos-2.jpg', thumb: 'img/batlle-lo-que-somos-2-600.jpg', w: 545, h: 789,
      title: { es: 'Lo que somos II', en: 'Lo que somos II (What We Are)', fr: 'Lo que somos II' },
      spec: { es: 'Técnica mixta sobre lienzo · 34 1/4 × 24 pulg.', en: 'Mixed media on canvas · 34 1/4 × 24 in', fr: 'Technique mixte sur toile · 34 1/4 × 24 po' },
      startBid: 1000 },
    // By Carlos Baret (Dominican, b. 1989), from the same book.
    { id: 'la-ultima-esperanza-de-vida', kind: 'painting', artist: 'Carlos Baret', year: 2015, img: 'img/baret-ultima-esperanza.jpg', thumb: 'img/baret-ultima-esperanza-600.jpg', w: 1190, h: 943,
      title: { es: 'La Última Esperanza de Vida', en: 'La Última Esperanza de Vida (The Last Hope of Life)', fr: 'La Última Esperanza de Vida' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 50 pulg. (101,6 × 127 cm)', en: 'Mixed media on canvas · 40 × 50 in (101.6 × 127 cm)', fr: 'Technique mixte sur toile · 40 × 50 po (101,6 × 127 cm)' },
      startBid: 1000 },
    // By Juan Bravo (Dominican, b. 1961), from the same book.
    { id: 'mujer-en-movimiento', kind: 'painting', artist: 'Juan Bravo', year: 2003, img: 'img/bravo-mujer-en-movimiento.jpg', thumb: 'img/bravo-mujer-en-movimiento-600.jpg', w: 557, h: 886,
      title: { es: 'Mujer en Movimiento', en: 'Mujer en Movimiento (Woman in Motion)', fr: 'Mujer en Movimiento' },
      spec: { es: 'Técnica mixta sobre lienzo · 33 × 20 1/2 pulg. (83,8 × 52,1 cm)', en: 'Mixed media on canvas · 33 × 20 1/2 in (83.8 × 52.1 cm)', fr: 'Technique mixte sur toile · 33 × 20 1/2 po (83,8 × 52,1 cm)' },
      startBid: 1000 },
    { id: 'formas-que-cantan', kind: 'painting', artist: 'Juan Bravo', year: 2004, img: 'img/bravo-formas-que-cantan.jpg', thumb: 'img/bravo-formas-que-cantan-600.jpg', w: 557, h: 560,
      title: { es: 'Formas que Cantan', en: 'Formas que Cantan (Forms That Sing)', fr: 'Formas que Cantan' },
      spec: { es: 'Técnica mixta sobre lienzo · 25 1/2 × 25 1/2 pulg. (64,8 × 64,8 cm)', en: 'Mixed media on canvas · 25 1/2 × 25 1/2 in (64.8 × 64.8 cm)', fr: 'Technique mixte sur toile · 25 1/2 × 25 1/2 po (64,8 × 64,8 cm)' },
      startBid: 1000 },
    { id: 'danza-de-africa', kind: 'painting', artist: 'Juan Bravo', year: 2005, img: 'img/bravo-danza-de-africa.jpg', thumb: 'img/bravo-danza-de-africa-600.jpg', w: 557, h: 741,
      title: { es: 'Danza de África', en: 'Danza de África (Dance of Africa)', fr: 'Danza de África' },
      spec: { es: 'Técnica mixta sobre lienzo · 25 3/4 × 35 pulg. (65,4 × 88,9 cm)', en: 'Mixed media on canvas · 25 3/4 × 35 in (65.4 × 88.9 cm)', fr: 'Technique mixte sur toile · 25 3/4 × 35 po (65,4 × 88,9 cm)' },
      startBid: 1000 },
    // By Félix Bonilla Gerena (Dominican, b. 1968), from the same book.
    { id: 'blue-woman', kind: 'painting', artist: 'Félix Bonilla Gerena', year: 2018, img: 'img/bonilla-blue-woman.jpg', thumb: 'img/bonilla-blue-woman-600.jpg', w: 554, h: 667,
      title: { es: 'Blue Woman', en: 'Blue Woman', fr: 'Blue Woman' },
      spec: { es: 'Óleo sobre lienzo · 24 × 20 pulg.', en: 'Oil on canvas · 24 × 20 in', fr: 'Huile sur toile · 24 × 20 po' },
      startBid: 1000 },
    { id: 'feminine', kind: 'painting', artist: 'Félix Bonilla Gerena', year: 2018, img: 'img/bonilla-feminine.jpg', thumb: 'img/bonilla-feminine-600.jpg', w: 562, h: 673,
      title: { es: 'Feminine', en: 'Feminine', fr: 'Feminine' },
      spec: { es: 'Óleo sobre lienzo · 24 × 20 pulg.', en: 'Oil on canvas · 24 × 20 in', fr: 'Huile sur toile · 24 × 20 po' },
      startBid: 1000 },
    { id: 'mi-deseo-esta-aqui', kind: 'painting', artist: 'Félix Bonilla Gerena', year: 2019, img: 'img/bonilla-mi-deseo.jpg', thumb: 'img/bonilla-mi-deseo-600.jpg', w: 1190, h: 1316,
      title: { es: 'Mi Deseo Está Aquí', en: 'Mi Deseo Está Aquí (My Desire Is Here)', fr: 'Mi Deseo Está Aquí' },
      spec: { es: 'Técnica mixta sobre lienzo · 54 × 49 pulg. (137,2 × 124,5 cm)', en: 'Mixed media on canvas · 54 × 49 in (137.2 × 124.5 cm)', fr: 'Technique mixte sur toile · 54 × 49 po (137,2 × 124,5 cm)' },
      startBid: 1000 },
    // By Dionisio Blanco (Dominican, b. 1953), from the same book.
    { id: 'serie-sembradores', kind: 'painting', artist: 'Dionisio Blanco', year: 1995, img: 'img/dblanco-sembradores.jpg', thumb: 'img/dblanco-sembradores-600.jpg', w: 1189, h: 1591,
      title: { es: 'Serie Sembradores como Ritual de Fertilidad', en: 'Serie Sembradores como Ritual de Fertilidad (Sowers as a Ritual of Fertility Series)', fr: 'Serie Sembradores como Ritual de Fertilidad' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    // By Ángel Castillo (Dominican, b. 1973), from the same book.
    { id: 'fragmento-del-amanecer', kind: 'painting', artist: 'Ángel Castillo', year: 2011, img: 'img/castillo-fragmento.jpg', thumb: 'img/castillo-fragmento-600.jpg', w: 1187, h: 788,
      title: { es: 'Fragmento del Amanecer', en: 'Fragmento del Amanecer (Fragment of Dawn)', fr: 'Fragmento del Amanecer' },
      spec: { es: 'Técnica mixta sobre lienzo · 48 × 72 pulg. (121,9 × 182,9 cm)', en: 'Mixed media on canvas · 48 × 72 in (121.9 × 182.9 cm)', fr: 'Technique mixte sur toile · 48 × 72 po (121,9 × 182,9 cm)' },
      startBid: 1000 },
    { id: 'entre-la-tierra-y-el-cielo', kind: 'painting', artist: 'Ángel Castillo', year: 2011, img: 'img/castillo-entre.jpg', thumb: 'img/castillo-entre-600.jpg', w: 557, h: 930,
      title: { es: 'Entre la Tierra y el Cielo', en: 'Entre la Tierra y el Cielo (Between Earth and Sky)', fr: 'Entre la Tierra y el Cielo' },
      spec: { es: 'Técnica mixta sobre lienzo · 48 × 36 pulg. (121,9 × 91,4 cm)', en: 'Mixed media on canvas · 48 × 36 in (121.9 × 91.4 cm)', fr: 'Technique mixte sur toile · 48 × 36 po (121,9 × 91,4 cm)' },
      startBid: 1000 },
    { id: 'geografia-del-silencio-castillo', kind: 'painting', artist: 'Ángel Castillo', year: 2011, img: 'img/castillo-geografia.jpg', thumb: 'img/castillo-geografia-600.jpg', w: 554, h: 744,
      title: { es: 'Geografía del Silencio', en: 'Geografía del Silencio (Geography of Silence)', fr: 'Geografía del Silencio' },
      spec: { es: 'Técnica mixta sobre lienzo · 48 × 36 pulg. (121,9 × 91,4 cm)', en: 'Mixed media on canvas · 48 × 36 in (121.9 × 91.4 cm)', fr: 'Technique mixte sur toile · 48 × 36 po (121,9 × 91,4 cm)' },
      startBid: 1000 },
    // By Máximo Caminero (Dominican, b. 1962), from the same book. His untitled work is in a private collection, so it is not offered.
    { id: 'hologram', kind: 'painting', artist: 'Máximo Caminero', img: 'img/caminero-hologram.jpg', thumb: 'img/caminero-hologram-600.jpg', w: 1187, h: 1537,
      title: { es: 'Hologram', en: 'Hologram', fr: 'Hologram' },
      spec: { es: 'Óleo sobre lienzo · 54 × 41 pulg.', en: 'Oil on canvas · 54 × 41 in', fr: 'Huile sur toile · 54 × 41 po' },
      startBid: 1000 },
    { id: 'cafetera', kind: 'painting', artist: 'Máximo Caminero', year: 2025, img: 'img/caminero-cafetera.jpg', thumb: 'img/caminero-cafetera-600.jpg', w: 554, h: 686,
      title: { es: 'Cafetera', en: 'Cafetera (Coffee Maker)', fr: 'Cafetera' },
      spec: { es: 'Óleo sobre lienzo · 68 × 55 pulg. (172,7 × 139,7 cm)', en: 'Oil on canvas · 68 × 55 in (172.7 × 139.7 cm)', fr: 'Huile sur toile · 68 × 55 po (172,7 × 139,7 cm)' },
      startBid: 1000 },
    { id: 'cuernos-de-la-abundancia', kind: 'painting', artist: 'Máximo Caminero', img: 'img/caminero-cuernos.jpg', thumb: 'img/caminero-cuernos-600.jpg', w: 1187, h: 595,
      title: { es: 'Cuernos de la abundancia', en: 'Cuernos de la abundancia (Horns of Abundance)', fr: 'Cuernos de la abundancia' },
      spec: { es: 'Óleo sobre lienzo · 90 × 53 pulg.', en: 'Oil on canvas · 90 × 53 in', fr: 'Huile sur toile · 90 × 53 po' },
      startBid: 1000 },
    { id: 'manito-muerta', kind: 'painting', artist: 'Máximo Caminero', img: 'img/caminero-manito.jpg', thumb: 'img/caminero-manito-600.jpg', w: 1187, h: 1722,
      title: { es: 'Manito Muerta', en: 'Manito Muerta (Little Dead Hand)', fr: 'Manito Muerta' },
      spec: { es: 'Óleo sobre lienzo · 40 × 50 pulg.', en: 'Oil on canvas · 40 × 50 in', fr: 'Huile sur toile · 40 × 50 po' },
      startBid: 1000 },
    // By Freddie Cabral (Dominican, b. 1948), from the same book.
    { id: 'contestatario', kind: 'sculpture', artist: 'Freddie Cabral', year: 2005, img: 'img/cabral-contestatario.jpg', thumb: 'img/cabral-contestatario-600.jpg', w: 557, h: 940,
      title: { es: 'Contestatario', en: 'Contestatario (The Dissenter)', fr: 'Contestatario' },
      spec: { es: 'Madera · 23 1/2 × 9 × 9 pulg. (59,7 × 22,9 × 22,9 cm)', en: 'Wood · 23 1/2 × 9 × 9 in (59.7 × 22.9 × 22.9 cm)', fr: 'Bois · 23 1/2 × 9 × 9 po (59,7 × 22,9 × 22,9 cm)' },
      startBid: 1000 },
    { id: 'idealismo', kind: 'sculpture', artist: 'Freddie Cabral', year: 2007, img: 'img/cabral-idealismo.jpg', thumb: 'img/cabral-idealismo-600.jpg', w: 557, h: 888,
      title: { es: 'Idealismo', en: 'Idealismo (Idealism)', fr: 'Idealismo' },
      spec: { es: 'Madera · 26 × 11 × 10 pulg. (66 × 27,9 × 25,4 cm)', en: 'Wood · 26 × 11 × 10 in (66 × 27.9 × 25.4 cm)', fr: 'Bois · 26 × 11 × 10 po (66 × 27,9 × 25,4 cm)' },
      startBid: 1000 },
    // By José Cestero (Dominican, 1937–2025), from the same book. The book titles both works the same; I and II tell them apart.
    { id: 'ciudad-colonial-i', kind: 'painting', artist: 'José Cestero', year: 2021, img: 'img/cestero-colonial-1.jpg', thumb: 'img/cestero-colonial-1-600.jpg', w: 554, h: 736,
      title: { es: 'Sin título, de la serie Ciudad Colonial I', en: 'Untitled, from the Colonial City Series I', fr: 'Sans titre, de la série Ville coloniale I' },
      spec: { es: 'Acrílico sobre lienzo · 10 × 30 pulg.', en: 'Acrylic on canvas · 10 × 30 in', fr: 'Acrylique sur toile · 10 × 30 po' },
      startBid: 1000 },
    { id: 'ciudad-colonial-ii', kind: 'painting', artist: 'José Cestero', year: 2021, img: 'img/cestero-colonial-2.jpg', thumb: 'img/cestero-colonial-2-600.jpg', w: 557, h: 739,
      title: { es: 'Sin título, de la serie Ciudad Colonial II', en: 'Untitled, from the Colonial City Series II', fr: 'Sans titre, de la série Ville coloniale II' },
      spec: { es: 'Acrílico sobre lienzo · 10 × 30 pulg.', en: 'Acrylic on canvas · 10 × 30 in', fr: 'Acrylique sur toile · 10 × 30 po' },
      startBid: 1000 },
    { id: 'las-andanzas-del-quijote', kind: 'painting', artist: 'José Cestero', year: 2007, img: 'img/cestero-quijote.jpg', thumb: 'img/cestero-quijote-600.jpg', w: 552, h: 753,
      title: { es: 'Las Andanzas del Quijote', en: 'Las Andanzas del Quijote (The Adventures of Don Quixote)', fr: 'Las Andanzas del Quijote' },
      spec: { es: 'Acrílico sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Acrylic on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Acrylique sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    // By Benjamín Cruz (Dominican, b. 1986), from the same book.
    { id: 'la-guardiana-del-paraiso', kind: 'painting', artist: 'Benjamín Cruz', year: 2007, img: 'img/cruz-guardiana.jpg', thumb: 'img/cruz-guardiana-600.jpg', w: 554, h: 415,
      title: { es: 'La Guardiana del Paraíso', en: 'La Guardiana del Paraíso (The Guardian of Paradise)', fr: 'La Guardiana del Paraíso' },
      spec: { es: 'Técnica mixta sobre lienzo · 29 × 39 pulg. (73,7 × 99,1 cm)', en: 'Mixed media on canvas · 29 × 39 in (73.7 × 99.1 cm)', fr: 'Technique mixte sur toile · 29 × 39 po (73,7 × 99,1 cm)' },
      startBid: 1000 },
    { id: 'the-ruins-still-stand', kind: 'painting', artist: 'Benjamín Cruz', year: 2020, img: 'img/cruz-ruins.jpg', thumb: 'img/cruz-ruins-600.jpg', w: 1190, h: 873,
      title: { es: 'The Ruins Still Stand, Their Roots Are Flowers', en: 'The Ruins Still Stand, Their Roots Are Flowers', fr: 'The Ruins Still Stand, Their Roots Are Flowers' },
      spec: { es: 'Técnica mixta: acrílico sobre lienzo · 30 × 40 pulg.', en: 'Mixed media: acrylic on canvas · 30 × 40 in', fr: 'Technique mixte : acrylique sur toile · 30 × 40 po' },
      startBid: 1000 },
    // By Jorge Checo (Dominican, b. 1968), from the same book.
    { id: 'red-mango', kind: 'painting', artist: 'Jorge Checo', img: 'img/checo-red-mango.jpg', thumb: 'img/checo-red-mango-600.jpg', w: 554, h: 237,
      title: { es: 'Red Mango', en: 'Red Mango', fr: 'Red Mango' },
      spec: { es: 'Óleo sobre lienzo · 17 1/2 × 41 pulg.', en: 'Oil on canvas · 17 1/2 × 41 in', fr: 'Huile sur toile · 17 1/2 × 41 po' },
      startBid: 1000 },
    // By Jesús Desangles (Dominican), from the same book.
    { id: 'guardianes-del-caribe-ancestral', kind: 'painting', artist: 'Jesús Desangles', year: 2020, img: 'img/desangles-guardianes.jpg', thumb: 'img/desangles-guardianes-600.jpg', w: 565, h: 556,
      title: { es: 'Guardianes del Caribe Ancestral', en: 'Guardianes del Caribe Ancestral', fr: 'Guardianes del Caribe Ancestral' },
      spec: { es: 'Técnica mixta sobre fiberboard · 24 × 24 pulg.', en: 'Mixed media on fiberboard · 24 × 24 in', fr: 'Technique mixte sur panneau de fibres · 24 × 24 po' },
      startBid: 1000 },
    { id: 'memoria-de-los-ancestros', kind: 'painting', artist: 'Jesús Desangles', year: 2020, img: 'img/desangles-memoria.jpg', thumb: 'img/desangles-memoria-600.jpg', w: 565, h: 556,
      title: { es: 'Memoria de los Ancestros', en: 'Memoria de los Ancestros', fr: 'Memoria de los Ancestros' },
      spec: { es: 'Técnica mixta sobre fiberboard · 24 × 24 pulg.', en: 'Mixed media on fiberboard · 24 × 24 in', fr: 'Technique mixte sur panneau de fibres · 24 × 24 po' },
      startBid: 1000 },
    { id: 'cantos-de-la-diaspora', kind: 'painting', artist: 'Jesús Desangles', year: 2020, img: 'img/desangles-cantos.jpg', thumb: 'img/desangles-cantos-600.jpg', w: 565, h: 567,
      title: { es: 'Cantos de la Diáspora', en: 'Cantos de la Diáspora', fr: 'Cantos de la Diáspora' },
      spec: { es: 'Técnica mixta sobre fiberboard · 24 × 24 pulg.', en: 'Mixed media on fiberboard · 24 × 24 in', fr: 'Technique mixte sur panneau de fibres · 24 × 24 po' },
      startBid: 1000 },
    { id: 'espiritus-del-mar-caribe', kind: 'painting', artist: 'Jesús Desangles', year: 2020, img: 'img/desangles-espiritus.jpg', thumb: 'img/desangles-espiritus-600.jpg', w: 1111, h: 1112,
      title: { es: 'Espíritus del Mar Caribe', en: 'Espíritus del Mar Caribe', fr: 'Espíritus del Mar Caribe' },
      spec: { es: 'Técnica mixta sobre fiberboard · 24 × 24 pulg.', en: 'Mixed media on fiberboard · 24 × 24 in', fr: 'Technique mixte sur panneau de fibres · 24 × 24 po' },
      startBid: 1000 },
    { id: 'los-hijos-del-atlantico', kind: 'painting', artist: 'Jesús Desangles', year: 2020, img: 'img/desangles-hijos.jpg', thumb: 'img/desangles-hijos-600.jpg', w: 1111, h: 1112,
      title: { es: 'Los Hijos del Atlántico', en: 'Los Hijos del Atlántico', fr: 'Los Hijos del Atlántico' },
      spec: { es: 'Técnica mixta sobre fiberboard · 24 × 24 pulg.', en: 'Mixed media on fiberboard · 24 × 24 in', fr: 'Technique mixte sur panneau de fibres · 24 × 24 po' },
      startBid: 1000 },
    { id: 'mujer-caribena', kind: 'painting', artist: 'Jesús Desangles', year: 2020, img: 'img/desangles-mujer.jpg', thumb: 'img/desangles-mujer-600.jpg', w: 519, h: 524,
      title: { es: 'Mujer Caribeña', en: 'Mujer Caribeña', fr: 'Mujer Caribeña' },
      spec: { es: 'Técnica mixta sobre fiberboard · 24 × 24 pulg.', en: 'Mixed media on fiberboard · 24 × 24 in', fr: 'Technique mixte sur panneau de fibres · 24 × 24 po' },
      startBid: 1000 },
    { id: 'herencia-de-ebano-y-sol', kind: 'painting', artist: 'Jesús Desangles', year: 2020, img: 'img/desangles-herencia.jpg', thumb: 'img/desangles-herencia-600.jpg', w: 1111, h: 1116,
      title: { es: 'Herencia de Ébano y Sol', en: 'Herencia de Ébano y Sol', fr: 'Herencia de Ébano y Sol' },
      spec: { es: 'Técnica mixta sobre fiberboard · 24 × 24 pulg.', en: 'Mixed media on fiberboard · 24 × 24 in', fr: 'Technique mixte sur panneau de fibres · 24 × 24 po' },
      startBid: 1000 },
    // By Ney Díaz Henríquez (Dominican, 1974–2015), from the same book.
    { id: 'forest-stain', kind: 'painting', artist: 'Ney Díaz Henríquez', year: 2008, img: 'img/ney-forest-stain.jpg', thumb: 'img/ney-forest-stain-600.jpg', w: 1111, h: 1098,
      title: { es: 'Forest Stain', en: 'Forest Stain', fr: 'Forest Stain' },
      spec: { es: 'Técnica mixta sobre panel de madera · 24 × 24 pulg.', en: 'Mixed media on wood panel · 24 × 24 in', fr: 'Technique mixte sur panneau de bois · 24 × 24 po' },
      startBid: 1000 },
    { id: 'juan-marichal', kind: 'painting', artist: 'Ney Díaz Henríquez', year: 2008, img: 'img/ney-juan-marichal.jpg', thumb: 'img/ney-juan-marichal-600.jpg', w: 1111, h: 1099,
      title: { es: 'Juan Marichal', en: 'Juan Marichal', fr: 'Juan Marichal' },
      spec: { es: 'Técnica mixta sobre panel de madera · 24 × 24 pulg.', en: 'Mixed media on wood panel · 24 × 24 in', fr: 'Technique mixte sur panneau de bois · 24 × 24 po' },
      startBid: 1000 },
    // Paintings by Oscar Abreu, from the works on oscarabreu.com (the miniature Pasión is sold, so it is not offered).
    { id: 'resilience', kind: 'painting', work: 'resilience', title: { es: 'Resiliencia', en: 'Resilience', fr: 'Résilience' }, img: 'img/resilience.jpg', startBid: 1000 },
    { id: 'echoes-of-memory', kind: 'painting', work: 'echoes-of-memory', title: { es: 'Ecos de la memoria', en: 'Echoes of Memory', fr: 'Échos de la mémoire' }, img: 'img/echoes-of-memory.jpg', startBid: 1000 },
    { id: 'time-on-my-face', kind: 'painting', work: 'time-on-my-face', title: { es: 'El Tiempo en mi Rostro', en: 'Time on My Face', fr: 'Le temps sur mon visage' }, img: 'img/time-on-my-face.jpg', startBid: 1000 },
    { id: 'escaping-being', kind: 'painting', work: 'escaping-being', title: { es: 'El Ser que se Escapa', en: 'The Escaping Being', fr: 'L’Être qui s’échappe' }, img: 'img/escaping-being.jpg', startBid: 1000 },
    { id: 'petrichor', kind: 'painting', work: 'petrichor', title: { es: 'Petricor', en: 'Petrichor', fr: 'Pétrichor' }, img: 'img/petrichor.jpg', startBid: 1000 },
    { id: 'limerence', kind: 'painting', work: 'limerence', title: { es: 'Limerencia', en: 'Limerence', fr: 'Limerence' }, img: 'img/limerence.jpg', startBid: 1000 },
    // The six paintings by Oscar Abreu on the display cubes at the Abreu gallery (data.js LAYER_WORKS); untitled, so
    // numbered (`gallery`: the app names them “Gallery painting no. n” in each language; `title` is for link previews).
    { id: 'gallery-1', kind: 'painting', gallery: 1, img: 'img/layers/passion.jpg', thumb: 'img/layers/passion-600.jpg', w: 826, h: 970,
      title: { es: 'Pintura de la galería n.º 1', en: 'Gallery painting no. 1', fr: 'Peinture de la galerie n° 1' }, startBid: 1000 },
    { id: 'gallery-2', kind: 'painting', gallery: 2, img: 'img/layers/orange.jpg', thumb: 'img/layers/orange-600.jpg', w: 826, h: 970,
      title: { es: 'Pintura de la galería n.º 2', en: 'Gallery painting no. 2', fr: 'Peinture de la galerie n° 2' }, startBid: 1000 },
    { id: 'gallery-3', kind: 'painting', gallery: 3, img: 'img/layers/yellow.jpg', thumb: 'img/layers/yellow-600.jpg', w: 826, h: 970,
      title: { es: 'Pintura de la galería n.º 3', en: 'Gallery painting no. 3', fr: 'Peinture de la galerie n° 3' }, startBid: 1000 },
    { id: 'gallery-4', kind: 'painting', gallery: 4, img: 'img/layers/mint.jpg', thumb: 'img/layers/mint-600.jpg', w: 826, h: 970,
      title: { es: 'Pintura de la galería n.º 4', en: 'Gallery painting no. 4', fr: 'Peinture de la galerie n° 4' }, startBid: 1000 },
    { id: 'gallery-5', kind: 'painting', gallery: 5, img: 'img/layers/blue.jpg', thumb: 'img/layers/blue-600.jpg', w: 826, h: 970,
      title: { es: 'Pintura de la galería n.º 5', en: 'Gallery painting no. 5', fr: 'Peinture de la galerie n° 5' }, startBid: 1000 },
    { id: 'gallery-6', kind: 'painting', gallery: 6, img: 'img/layers/white-bars.jpg', thumb: 'img/layers/white-bars-600.jpg', w: 826, h: 970,
      title: { es: 'Pintura de la galería n.º 6', en: 'Gallery painting no. 6', fr: 'Peinture de la galerie n° 6' }, startBid: 1000 },
    // Sculptures by Oscar Abreu, published by number on oscarabreu.com/sculpture (no titles given there).
    { id: 'sculpture-1', kind: 'sculpture', n: 1, img: 'img/sculpture/1.jpg', thumb: 'img/sculpture/1-600.jpg', w: 767, h: 1000, startBid: 1000 },
    { id: 'sculpture-2', kind: 'sculpture', n: 2, img: 'img/sculpture/2.jpg', thumb: 'img/sculpture/2-600.jpg', w: 1000, h: 878, startBid: 1000 },
    { id: 'sculpture-3', kind: 'sculpture', n: 3, img: 'img/sculpture/3.jpg', thumb: 'img/sculpture/3-600.jpg', w: 931, h: 1000, startBid: 1000 },
    { id: 'sculpture-4', kind: 'sculpture', n: 4, img: 'img/sculpture/4.jpg', thumb: 'img/sculpture/4-600.jpg', w: 859, h: 1000, startBid: 1000 },
    { id: 'sculpture-5', kind: 'sculpture', n: 5, img: 'img/sculpture/5.jpg', thumb: 'img/sculpture/5-600.jpg', w: 996, h: 1000, startBid: 1000 },
    { id: 'sculpture-6', kind: 'sculpture', n: 6, img: 'img/sculpture/6.jpg', thumb: 'img/sculpture/6-600.jpg', w: 928, h: 1000, startBid: 1000 },
    { id: 'sculpture-7', kind: 'sculpture', n: 7, img: 'img/sculpture/7.jpg', thumb: 'img/sculpture/7-600.jpg', w: 616, h: 1000, startBid: 1000 },
    { id: 'sculpture-8', kind: 'sculpture', n: 8, img: 'img/sculpture/8.jpg', thumb: 'img/sculpture/8-600.jpg', w: 584, h: 1000, startBid: 1000 },
    { id: 'sculpture-9', kind: 'sculpture', n: 9, img: 'img/sculpture/9.jpg', thumb: 'img/sculpture/9-600.jpg', w: 1000, h: 836, startBid: 1000 },
    { id: 'sculpture-10', kind: 'sculpture', n: 10, img: 'img/sculpture/10.jpg', thumb: 'img/sculpture/10-600.jpg', w: 898, h: 1000, startBid: 1000 },
    { id: 'sculpture-11', kind: 'sculpture', n: 11, img: 'img/sculpture/11.jpg', thumb: 'img/sculpture/11-600.jpg', w: 1000, h: 801, startBid: 1000 },
    { id: 'sculpture-12', kind: 'sculpture', n: 12, img: 'img/sculpture/12.jpg', thumb: 'img/sculpture/12-600.jpg', w: 1000, h: 635, startBid: 1000 },
    // Drawings by Oscar Abreu, published by number on oscarabreu.com/drawings (no titles given there). Numbers 16, 17,
    // 18 and 33 repeat drawings 3, 2, 1 and 6 on the site, so they are left out.
    { id: 'drawing-1', kind: 'drawing', n: 1, img: 'img/drawings/1.jpg', thumb: 'img/drawings/1-600.jpg', w: 900, h: 647, startBid: 1000 },
    { id: 'drawing-2', kind: 'drawing', n: 2, img: 'img/drawings/2.jpg', thumb: 'img/drawings/2-600.jpg', w: 689, h: 504, startBid: 1000 },
    { id: 'drawing-3', kind: 'drawing', n: 3, img: 'img/drawings/3.jpg', thumb: 'img/drawings/3-600.jpg', w: 703, h: 504, startBid: 1000 },
    { id: 'drawing-4', kind: 'drawing', n: 4, img: 'img/drawings/4.jpg', thumb: 'img/drawings/4-600.jpg', w: 692, h: 504, startBid: 1000 },
    { id: 'drawing-5', kind: 'drawing', n: 5, img: 'img/drawings/5.jpg', thumb: 'img/drawings/5-600.jpg', w: 504, h: 674, startBid: 1000 },
    { id: 'drawing-6', kind: 'drawing', n: 6, img: 'img/drawings/6.jpg', thumb: 'img/drawings/6-600.jpg', w: 504, h: 675, startBid: 1000 },
    { id: 'drawing-7', kind: 'drawing', n: 7, img: 'img/drawings/7.jpg', thumb: 'img/drawings/7-600.jpg', w: 718, h: 504, startBid: 1000 },
    { id: 'drawing-8', kind: 'drawing', n: 8, img: 'img/drawings/8.jpg', thumb: 'img/drawings/8-600.jpg', w: 688, h: 504, startBid: 1000 },
    { id: 'drawing-9', kind: 'drawing', n: 9, img: 'img/drawings/9.jpg', thumb: 'img/drawings/9-600.jpg', w: 690, h: 504, startBid: 1000 },
    { id: 'drawing-10', kind: 'drawing', n: 10, img: 'img/drawings/10.jpg', thumb: 'img/drawings/10-600.jpg', w: 504, h: 372, startBid: 1000 },
    { id: 'drawing-11', kind: 'drawing', n: 11, img: 'img/drawings/11.jpg', thumb: 'img/drawings/11-600.jpg', w: 504, h: 678, startBid: 1000 },
    { id: 'drawing-12', kind: 'drawing', n: 12, img: 'img/drawings/12.jpg', thumb: 'img/drawings/12-600.jpg', w: 504, h: 701, startBid: 1000 },
    { id: 'drawing-13', kind: 'drawing', n: 13, img: 'img/drawings/13.jpg', thumb: 'img/drawings/13-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-14', kind: 'drawing', n: 14, img: 'img/drawings/14.jpg', thumb: 'img/drawings/14-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-15', kind: 'drawing', n: 15, img: 'img/drawings/15.jpg', thumb: 'img/drawings/15-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-19', kind: 'drawing', n: 19, img: 'img/drawings/19.jpg', thumb: 'img/drawings/19-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-20', kind: 'drawing', n: 20, img: 'img/drawings/20.jpg', thumb: 'img/drawings/20-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-21', kind: 'drawing', n: 21, img: 'img/drawings/21.jpg', thumb: 'img/drawings/21-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-22', kind: 'drawing', n: 22, img: 'img/drawings/22.jpg', thumb: 'img/drawings/22-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-23', kind: 'drawing', n: 23, img: 'img/drawings/23.jpg', thumb: 'img/drawings/23-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-24', kind: 'drawing', n: 24, img: 'img/drawings/24.jpg', thumb: 'img/drawings/24-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-25', kind: 'drawing', n: 25, img: 'img/drawings/25.jpg', thumb: 'img/drawings/25-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-26', kind: 'drawing', n: 26, img: 'img/drawings/26.jpg', thumb: 'img/drawings/26-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-27', kind: 'drawing', n: 27, img: 'img/drawings/27.jpg', thumb: 'img/drawings/27-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-28', kind: 'drawing', n: 28, img: 'img/drawings/28.jpg', thumb: 'img/drawings/28-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-29', kind: 'drawing', n: 29, img: 'img/drawings/29.jpg', thumb: 'img/drawings/29-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-30', kind: 'drawing', n: 30, img: 'img/drawings/30.jpg', thumb: 'img/drawings/30-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-31', kind: 'drawing', n: 31, img: 'img/drawings/31.jpg', thumb: 'img/drawings/31-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-32', kind: 'drawing', n: 32, img: 'img/drawings/32.jpg', thumb: 'img/drawings/32-600.jpg', w: 292, h: 400, startBid: 1000 },
    { id: 'drawing-34', kind: 'drawing', n: 34, img: 'img/drawings/34.jpg', thumb: 'img/drawings/34-600.jpg', w: 292, h: 400, startBid: 1000 },
    { id: 'drawing-35', kind: 'drawing', n: 35, img: 'img/drawings/35.jpg', thumb: 'img/drawings/35-600.jpg', w: 400, h: 292, startBid: 1000 },
    { id: 'drawing-36', kind: 'drawing', n: 36, img: 'img/drawings/36.jpg', thumb: 'img/drawings/36-600.jpg', w: 292, h: 400, startBid: 1000 },
  ],
};

// `title` (paintings) is used by the link previews (api/share-item.js); the app shows the title from WORKS, or the
// lot's own title, `artist`, `spec` and `year` for a work by another artist. `w`/`h` give a picture's shape.
// A lot is open online when it has a starting bid and its closing time has not passed. `state` is the lot's
// bidding state (api/auction.js): a soft close may have moved its close later.
function lotCloses(lot, state) {
  const base = lot.closesAt || AUCTION.closesAt || null;
  return base && state && state.closesAt && Date.parse(state.closesAt) > Date.parse(base) ? state.closesAt : base;
}
function lotOpen(lot, now = Date.now(), state) { return lot.startBid != null && !!lotCloses(lot, state) && now < Date.parse(lotCloses(lot, state)); }
function lotMinBid(lot, state) { return state && state.count ? state.high + AUCTION.increment : lot.startBid; }

if (typeof module !== 'undefined') module.exports = { AUCTION, lotCloses, lotOpen, lotMinBid };

// Each artist's text, exactly as ART GABANGI · Top 100 Artist prints it (published in English): the headline under the
// name and the essay. Paragraphs are separated by a blank line; a single line break is kept as printed. Shown in the
// artist's room (market.js). Oscar Abreu's room uses his biography from oscarabreu.com (data.js BIO_SITE).
AUCTION.essays = {
  'Wilson Abreu': { head: 'The image as an open wound', text: `Wilson Abreu’s work is not made to be contemplated comfortably, but to be confronted from a position of uneasy proximity. There is no safe distance between the image and the viewer because the painting behaves like unstable surface where the human figure does not appear in order to be recognized, but to be placed in crisis.

In that displacement, the body ceases to function as organized form.
It becomes rupture.

A zone where identity decomposes, shifts, and resists stabilization.

Within his work, drawing does not fulfill descriptive function, but active one. The line does not calmly organize the image; it cuts through it, fractures, accelerates, interrupts itself, and pushes forward as though attempting to sustain something already collapsing.

Every mark responds to urgency.
Not to correction.
Not to refinement.

But to the need to hold the human figure precisely at the moment it begins to transform into something unstable and unresolved. The gesture never seeks perfection.
It seeks intensity.

The figures he constructs are never complete, and that incompleteness is not accident or deficiency, but structural decision. Bodies fragment, merge, deform, and drift toward an intermediate state between the human and the animal, between memory and erosion, between presence and disappearance.

What may initially appear as distortion gradually reveals itself as revelation.
Because what the work exposes is not the external form of the body, but its permanent vulnerability.

Painting here does not operate psychologically first.
It operates physically.

Matter itself becomes unstable participant within the image. The paint is never entirely controlled, and that apparent loss of control forms essential part of the language. It spills, accumulates, breaks apart, drags across the surface, and records the violence and immediacy of the gesture directly.

There are moments when the image appears close to collapse.

And it is precisely at that edge that the work acquires its greatest force.

The paintings seem to react against the very bodies they attempt to contain.

Another important dimension of his work lies in its relationship to the social. Yet this relationship never manifests itself through illustration or explicit political narrative.

It does not need to.
The figures already carry that weight within themselves.

They do not represent singular stories, yet they appear marked by many: conditions of marginality, violence, displacement, exhaustion, emotional fracture, and social instability emerge not as themes, but as states of being embedded into the surface of the image itself.

In this sense, his characters do not seek empathy in conventional terms, nor do they establish comforting relationships with the viewer. They impose themselves from an uncomfortable place from a presence that refuses softening or simplification.

And it is precisely there that the work acquires ethical dimension.

Not through declaration.
But through what it refuses to allow the viewer to ignore.

Within contemporary Dominican art, Wilson Abreu occupies a territory of conscious instability. His work belongs neither to tranquil figuration nor to controlled abstraction, but to a zone where the image remains in constant tension.
Form never fully settles.

And that impossibility of stability constitutes part of the work’s power.

The paintings resist closure because the human condition they expose also resists resolution. Gesture, matter, body, and fragmentation remain suspended in active conflict.

In a contemporary context where many images are designed for rapid circulation, easy consumption, and immediate readability, Wilson Abreu introduces resistance. His paintings refuse simplification.

They force the gaze to stop.
To remain.

To confront what is not always comfortable to confront.

Wilson Abreu does not paint the human figure in order to organize it into stable image. He paints it at the exact moment it begins to overflow its own limits. In that gesture, his work reveals something fundamental: that the image is not always made to be understood peacefully.

Sometimes it is made to be faced.

His painting offers neither closure nor reconciliation. It remains open, active, and permanently tense a space where form, matter, and the human condition continue colliding without resolution.` },
  'José Almonte': { head: 'Painting as a cartography of thought and existence', text: `José Almonte’s work exists within a territory where painting ceases to operate as representation and becomes instead a system. His compositions do not describe scenes; they organize relationships between figure, space, and symbol within structures where every element participates in a larger internal logic.

In this sense, his painting does not illustrate.
It thinks.

Within his works, the human figure appears reduced, fragmented, or only partially visible, yet it never fully disappears. The figure does not present itself as protagonist, but as point of reference within a broader field of relations. The body does not dominate the image.

It inhabits it.

Its scale in relation to geometric elements circles, trajectories, surfaces, orbital structures introduces a tension between the individual and the universal, between human presence and systems extending beyond it.

Pictorial space is constructed with remarkable precision. The dominant use of blue does not respond to superficial aesthetic preference, but to the creation of a field in which the image becomes mental, almost suspended. There is no traditional depth.

There is conceptual atmosphere.

The painting is not organized through physical planes, but through levels of perception and consciousness. The viewer enters not into a literal environment, but into a psychological and symbolic space where thought itself seems spatialized.
Geometry plays a fundamental role throughout his language. Circles, orbits, curves, and directional lines traverse the surface, establishing visual routes suggesting trajectories, cycles, displacement, and continuity. These forms do not decorate the image.

They structure it.

They function as invisible maps organizing the relationship between all elements within the composition. Geometry becomes not merely formal device, but conceptual architecture.

The objects appearing within his work a paper airplane, a bench, an isolated figure, a golden disc operate as signs. They are never fully explained, yet they activate associations and psychological resonance. Every element appears charged with intention, though that intention never reveals itself completely.

The work remains open.
And it is precisely that openness which gives the paintings their intellectual depth.

There exists throughout his practice a constant relationship with the idea of displacement not necessarily physical displacement, but existential movement. The figures appear suspended within moments of transition, positioned somewhere between departure and destination without fully belonging to either.

The painting does not narrate that journey.
It contains it.

The use of gold introduces another symbolic dimension. It functions as a point of concentration within the chromatic field, but also as an element suggesting value, center, energy, and symbolic gravity. Gold never appears as decorative accent.

It appears as nucleus.

Its presence reorganizes perception and establishes internal hierarchies within the composition, creating focal points around which the image seems to orbit psychologically as well as visually.

Within the context of contemporary Dominican art, José Almonte occupies a singular position in which painting becomes an instrument of thought. His work does not seek immediate impact or rapid emotional consumption, but instead constructs experiences unfolding gradually through time and contemplation.

His paintings are not consumed quickly.
They are traversed.
That distinction is essential.

Because his work resists the simplification dominating much contemporary visual culture. Rather than reducing complexity in order to facilitate circulation, José Almonte introduces complexity without sacrificing clarity. The paintings demand pause, observation, and connection-making from the viewer.

His practice reveals a strong structural coherence. Each work does not attempt to rupture completely from the previous one, but rather to deepen the same visual and conceptual system in which the relationship between figure, geometry, and symbol becomes increasingly refined. This persistence is not repetition.
It is calibration.

José Almonte does not paint in order to represent scenes or construct closed images. He paints in order to generate cartographies. In that gesture, his work proposes a fundamental idea: that painting can function as a space where existence is not described, but organized.` },
  'Juan Andújar': { head: 'The face as rhythmic system' },
  'Ney Díaz Henríquez': { head: 'Painting as a field of tension between figure and matter' },
};

// Short biographies researched from published sources (each lists them), approved by the museum. `src` are shown as links.
Object.assign(AUCTION.artists['Félix Bonilla Gerena'], { country: 'pr' }); // born in Utuado, Puerto Rico
const AU_BIOS = {
  'José Cestero': { src: ['https://en.wikipedia.org/wiki/Jos%C3%A9_Cestero_(painter)', 'https://acento.com.do/cultura/quien-fue-el-maestro-jose-cestero-razones-de-la-trascendencia-de-su-obra-pictorica-9525499.html', 'https://eldia.com.do/fallece-el-maestro-jose-cestero-referente-del-arte-moderno-dominicano/'],
    en: 'Born in Santo Domingo in 1937, José Cestero received the Premio Nacional de Artes Plásticas in 2015, the highest honor for a Dominican visual artist. Known as the painter of the Colonial City and Calle El Conde, he saw a museum devoted to his work open in the Zona Colonial during his lifetime. He died in July 2025, at 88.',
    es: 'Nacido en Santo Domingo en 1937, José Cestero recibió el Premio Nacional de Artes Plásticas en 2015, el mayor reconocimiento para un artista visual dominicano. Conocido como el pintor de la Ciudad Colonial y de la calle El Conde, vio abrir en vida un museo dedicado a su obra en la Zona Colonial. Falleció en julio de 2025, a los 88 años.',
    fr: 'Né à Saint-Domingue en 1937, José Cestero a reçu en 2015 le Premio Nacional de Artes Plásticas, la plus haute distinction pour un artiste visuel dominicain. Connu comme le peintre de la Ville coloniale et de la rue El Conde, il a vu de son vivant un musée consacré à son œuvre ouvrir dans la Zona Colonial. Il est mort en juillet 2025, à 88 ans.' },
  'Dionisio Blanco': { src: ['https://emuseum.museoarteponce.org/people/1123/dionisio-blanco', 'https://dominicanaonline.org/en/?p=2584'],
    en: 'Born in San Cristóbal in 1953, Dionisio Blanco studied at the Escuela Nacional de Bellas Artes and taught drawing at the Universidad Autónoma de Santo Domingo. He co-directed the magazine Isla Abierta. His bronze ensemble “Homenaje a la música, homenaje a la tierra” stands in the Parque Piedras Vivas in San Cristóbal, and the Museo de Arte de Ponce holds his work.',
    es: 'Nacido en San Cristóbal en 1953, Dionisio Blanco estudió en la Escuela Nacional de Bellas Artes y enseñó dibujo en la Universidad Autónoma de Santo Domingo. Fue codirector de la revista Isla Abierta. Su conjunto en bronce «Homenaje a la música, homenaje a la tierra» se alza en el Parque Piedras Vivas de San Cristóbal, y el Museo de Arte de Ponce conserva obra suya.',
    fr: 'Né à San Cristóbal en 1953, Dionisio Blanco a étudié à l’Escuela Nacional de Bellas Artes et enseigné le dessin à l’Universidad Autónoma de Santo Domingo. Il a codirigé la revue Isla Abierta. Son ensemble en bronze « Homenaje a la música, homenaje a la tierra » se dresse au Parque Piedras Vivas de San Cristóbal, et le Museo de Arte de Ponce conserve son œuvre.' },
  'Carlos Baret': { src: ['https://acento.com.do/cultura/obra-visual-de-carlos-baret-el-lenguaje-del-concepto-y-lo-sensible-9685571.html', 'https://www.elcaribe.com.do/gente/cultura/entrevista-cultural/traves-del-arte-se-puede-re-significar-la-realidad/'],
    en: 'Born in 1989 in the province of Espaillat, Carlos Baret won the National Painting Prize at the 28th National Biennial of Visual Arts in 2015. He studied at Bellas Artes in Santiago and is also a civil engineer. Working across painting, installation and textile, he has work in public and private collections in nine countries.',
    es: 'Nacido en 1989 en la provincia Espaillat, Carlos Baret obtuvo el Premio Nacional de Pintura en la 28.ª Bienal Nacional de Artes Visuales, en 2015. Estudió en Bellas Artes de Santiago y es también ingeniero civil. Trabaja la pintura, la instalación y el textil, y su obra está en colecciones públicas y privadas de nueve países.',
    fr: 'Né en 1989 dans la province d’Espaillat, Carlos Baret a remporté le Prix national de peinture à la 28e Biennale nationale des arts visuels, en 2015. Formé aux Beaux-Arts de Santiago, il est aussi ingénieur civil. Peinture, installation et textile : son œuvre figure dans des collections publiques et privées de neuf pays.' },
  'Elvis Avilés': { src: ['https://www.diariolibre.com/revista/cultura/2022/07/30/fallece-elvis-aviles-artista-plastico-dominicano/1979247'],
    en: 'Elvis Avilés (1964–2022) began his studies at the Escuela Nacional de Bellas Artes in 1978. In 2015 he presented his retrospective “35 años de juventud pictórica” at the Galería Nacional of the Palacio de Bellas Artes. His studio was in the Colonial City of Santo Domingo.',
    es: 'Elvis Avilés (1964–2022) comenzó sus estudios en la Escuela Nacional de Bellas Artes en 1978. En 2015 presentó su retrospectiva «35 años de juventud pictórica» en la Galería Nacional del Palacio de Bellas Artes. Su taller estaba en la Ciudad Colonial de Santo Domingo.',
    fr: 'Elvis Avilés (1964–2022) entre à l’Escuela Nacional de Bellas Artes en 1978. En 2015, il présente sa rétrospective « 35 años de juventud pictórica » à la Galería Nacional du Palacio de Bellas Artes. Son atelier se trouvait dans la Ville coloniale de Saint-Domingue.' },
  'Freddie Cabral': { src: ['https://www.elcaribe.com.do/gente/cultura/museo-casa-de-la-escultura-nuevo-espacio-para-el-arte/', 'https://acento.com.do/opinion/freddie-cabral-50-anos-esculpiendo-madera-9607704.html'],
    en: 'A sculptor in wood, clay and metal for more than four decades, Freddie Cabral was named “Escultor del año 2018” by the Fundación Corripio. The Museo Casa de la Escultura Freddie Cabral, in Villa Consuelo, Santo Domingo, holds hundreds of his works.',
    es: 'Escultor en madera, barro y metal desde hace más de cuatro décadas, Freddie Cabral fue reconocido como «Escultor del año 2018» por la Fundación Corripio. El Museo Casa de la Escultura Freddie Cabral, en Villa Consuelo, Santo Domingo, reúne cientos de sus obras.',
    fr: 'Sculpteur du bois, de l’argile et du métal depuis plus de quarante ans, Freddie Cabral a été nommé « Escultor del año 2018 » par la Fundación Corripio. Le Museo Casa de la Escultura Freddie Cabral, à Villa Consuelo, Saint-Domingue, réunit des centaines de ses œuvres.' },
  'Máximo Caminero': { src: ['https://acento.com.do/cultura/museo-autozama-mercedes-benz-inaugura-exposicion-de-maximo-caminero-9626235.html', 'https://diariolibre.com/revista/sociales/2026/02/18/museo-autozama-mercedes-benz-inaugura-exposicion-caos--equilibrio/3441207'],
    en: 'Born in 1962, Máximo Caminero moved to Texas in 1982 and has since worked in Florida, where his studio is in West Palm Beach. His work is in private collections in Europe, the United States and the Caribbean. He is also the author of the novel Patricio, todas las puertas. In 2026 he opened “Caos & Equilibrio” at the Museo Autozama Mercedes-Benz.',
    es: 'Nacido en 1962, Máximo Caminero se trasladó a Texas en 1982 y desde entonces trabaja en Florida, donde tiene su estudio en West Palm Beach. Su obra está en colecciones privadas de Europa, Estados Unidos y el Caribe. Es también autor de la novela Patricio, todas las puertas. En 2026 inauguró «Caos & Equilibrio» en el Museo Autozama Mercedes-Benz.',
    fr: 'Né en 1962, Máximo Caminero s’installe au Texas en 1982 puis travaille en Floride, où son atelier est à West Palm Beach. Son œuvre figure dans des collections privées en Europe, aux États-Unis et dans la Caraïbe. Il est aussi l’auteur du roman Patricio, todas las puertas. En 2026, il présente « Caos & Equilibrio » au Museo Autozama Mercedes-Benz.' },
  'Aquiles Azar Billini': { src: ['https://www.artealdia.com/Reviews/Aquiles-Azar-Billini', 'https://acento.com.do/cultura/aquiles-azar-pluma-y-pincel-de-arte-total-9470646.html'],
    en: 'Painter, draftsman and photographer, Aquiles Azar Billini was born in Santo Domingo in 1965. He studied architecture and graduated cum laude from the Escuela de Diseño Altos de Chavón, where he teaches fine arts. He is the son of the painter Aquiles Azar García (1932–2015).',
    es: 'Pintor, dibujante y fotógrafo, Aquiles Azar Billini nació en Santo Domingo en 1965. Estudió arquitectura y se graduó cum laude de la Escuela de Diseño Altos de Chavón, donde enseña bellas artes. Es hijo del pintor Aquiles Azar García (1932–2015).',
    fr: 'Peintre, dessinateur et photographe, Aquiles Azar Billini est né à Saint-Domingue en 1965. Il a étudié l’architecture et est diplômé cum laude de l’Escuela de Diseño Altos de Chavón, où il enseigne les beaux-arts. Il est le fils du peintre Aquiles Azar García (1932–2015).' },
  'Félix Bonilla Gerena': { src: ['https://www.puertoricoartnews.com/2022/05/felix-bonilla-gerena-at-tripoli-gallery.html', 'https://www.elcaribe.com.do/gente/cultura/considero-un-artista-comprometido-con-mi-pintura-y-su-originalidad/'],
    en: 'Born in Utuado, Puerto Rico, in 1968, Félix Bonilla Gerena graduated in 1992 from the Escuela de Artes Plásticas of the Instituto de Cultura Puertorriqueña. He has shown with Tripoli Gallery in New York since 2008, and his work is in the Museo de Arte Moderno in Santo Domingo.',
    es: 'Nacido en Utuado, Puerto Rico, en 1968, Félix Bonilla Gerena se graduó en 1992 de la Escuela de Artes Plásticas del Instituto de Cultura Puertorriqueña. Expone con Tripoli Gallery en Nueva York desde 2008, y su obra está en el Museo de Arte Moderno de Santo Domingo.',
    fr: 'Né à Utuado, Porto Rico, en 1968, Félix Bonilla Gerena est diplômé en 1992 de l’Escuela de Artes Plásticas de l’Instituto de Cultura Puertorriqueña. Il expose avec la Tripoli Gallery à New York depuis 2008, et son œuvre est au Museo de Arte Moderno de Saint-Domingue.' },
  'Ney Díaz Henríquez': { src: ['https://www.elcaribe.com.do/sin-categoria/ney-diaz-henriquez-audacia-del-genio/', 'https://eldia.com.do/georges-thevenet-rendira-tributo-al-artista-ney-diazh-con-exposicion-en-punta-cana/'],
    en: 'Nelson Rafael Díaz Henríquez (1974–2015), known as Ney, signed some of his works “Ney DiazH”. Critics describe his short body of work as an icon of the bohemian life of Santo Domingo’s Colonial City and of Dominican art.',
    es: 'Nelson Rafael Díaz Henríquez (1974–2015), conocido como Ney, firmaba algunas de sus obras como «Ney DiazH». La crítica describe su obra, breve, como un ícono de la bohemia de la Ciudad Colonial de Santo Domingo y del arte dominicano.',
    fr: 'Nelson Rafael Díaz Henríquez (1974–2015), dit Ney, signait certaines de ses œuvres « Ney DiazH ». La critique voit dans son œuvre, brève, une icône de la bohème de la Ville coloniale de Saint-Domingue et de l’art dominicain.' },
  'Jesús Desangles': { src: ['https://artsandculture.google.com/asset/PgE7bPODvhwHmw', 'https://www.elcaribe.com.do/gente/cultura/el-muralismo-parte-clave-de-nuestro-legado-artistico/'],
    en: 'Born in 1961, Jesús Desangles is counted among the leading Dominican muralists. At nineteen he won a Golden Palette at the Festival International de la Peinture in Cagnes-sur-Mer, France. His work is in the Museo de Arte Contemporáneo de Puerto Rico.',
    es: 'Nacido en 1961, Jesús Desangles figura entre los muralistas dominicanos más destacados. A los diecinueve años obtuvo una Paleta de Oro en el Festival Internacional de Pintura de Cagnes-sur-Mer, Francia. Su obra está en el Museo de Arte Contemporáneo de Puerto Rico.',
    fr: 'Né en 1961, Jesús Desangles compte parmi les grands muralistes dominicains. À dix-neuf ans, il obtient une Palette d’or au Festival international de la peinture de Cagnes-sur-Mer. Son œuvre est au Museo de Arte Contemporáneo de Puerto Rico.' },
};
Object.entries(AU_BIOS).forEach(([n, b]) => { AUCTION.artists[n].bio = b; });
Object.assign(AUCTION.artists['Jesús Desangles'], { born: 1961 });
