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
    'Aurora Díaz': { born: 1969 }, 'María Dolores': { born: 1956 }, 'Gerald Ellis': { born: 1976 },
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
    { id: 'instante-de-introspeccion', kind: 'painting', artist: 'Ney Díaz Henríquez', year: 2008, img: 'img/ney-instante.jpg', thumb: 'img/ney-instante-600.jpg', w: 814, h: 1030,
      title: { es: 'Instante de Introspección', en: 'Instante de Introspección (Moment of Introspection)', fr: 'Instante de Introspección' },
      spec: { es: 'Técnica mixta sobre lienzo · 54 × 44 1/4 pulg. (137,2 × 112,4 cm)', en: 'Mixed media on canvas · 54 × 44 1/4 in (137.2 × 112.4 cm)', fr: 'Technique mixte sur toile · 54 × 44 1/4 po (137,2 × 112,4 cm)' },
      startBid: 1000 },
    { id: 'acrobacia-de-amor', kind: 'painting', artist: 'Ney Díaz Henríquez', year: 2008, img: 'img/ney-acrobacia.jpg', thumb: 'img/ney-acrobacia-600.jpg', w: 381, h: 455,
      title: { es: 'Acrobacia de Amor', en: 'Acrobacia de Amor (Acrobatics of Love)', fr: 'Acrobacia de Amor' },
      spec: { es: 'Técnica mixta sobre lienzo · 70 × 60 pulg. (177,8 × 152,4 cm)', en: 'Mixed media on canvas · 70 × 60 in (177.8 × 152.4 cm)', fr: 'Technique mixte sur toile · 70 × 60 po (177,8 × 152,4 cm)' },
      startBid: 1000 },
    { id: 'mujeres-en-la-fiesta', kind: 'painting', artist: 'Ney Díaz Henríquez', year: 2008, img: 'img/ney-mujeres.jpg', thumb: 'img/ney-mujeres-600.jpg', w: 381, h: 460,
      title: { es: 'Mujeres en la Fiesta', en: 'Mujeres en la Fiesta (Women at the Celebration)', fr: 'Mujeres en la Fiesta' },
      spec: { es: 'Técnica mixta sobre lienzo · 54 × 44 1/4 pulg. (137,2 × 112,4 cm)', en: 'Mixed media on canvas · 54 × 44 1/4 in (137.2 × 112.4 cm)', fr: 'Technique mixte sur toile · 54 × 44 1/4 po (137,2 × 112,4 cm)' },
      startBid: 1000 },
    { id: 'metamorfosis', kind: 'painting', artist: 'Ney Díaz Henríquez', year: 2008, img: 'img/ney-metamorfosis.jpg', thumb: 'img/ney-metamorfosis-600.jpg', w: 814, h: 1020,
      title: { es: 'Metamorfosis', en: 'Metamorfosis (Metamorphosis)', fr: 'Metamorfosis' },
      spec: { es: 'Técnica mixta sobre lienzo · 54 × 44 1/4 pulg. (137,2 × 112,4 cm)', en: 'Mixed media on canvas · 54 × 44 1/4 in (137.2 × 112.4 cm)', fr: 'Technique mixte sur toile · 54 × 44 1/4 po (137,2 × 112,4 cm)' },
      startBid: 1000 },
    { id: 'equilibrio-del-ser', kind: 'painting', artist: 'Ney Díaz Henríquez', year: 2008, img: 'img/ney-equilibrio.jpg', thumb: 'img/ney-equilibrio-600.jpg', w: 812, h: 1223,
      title: { es: 'Equilibrio del Ser', en: 'Equilibrio del Ser (Balance of Being)', fr: 'Equilibrio del Ser' },
      spec: { es: 'Técnica mixta sobre lienzo · 76 1/2 × 51 pulg. (194,3 × 129,5 cm)', en: 'Mixed media on canvas · 76 1/2 × 51 in (194.3 × 129.5 cm)', fr: 'Technique mixte sur toile · 76 1/2 × 51 po (194,3 × 129,5 cm)' },
      startBid: 1000 },
    // By Aurora Díaz (Dominican, b. 1969), from the same book.
    { id: 'the-noise-of-silence', kind: 'painting', artist: 'Aurora Díaz', year: 2018, img: 'img/aurora-noise.jpg', thumb: 'img/aurora-noise-600.jpg', w: 814, h: 605,
      title: { es: 'The noise of silence', en: 'The noise of silence', fr: 'The noise of silence' },
      spec: { es: 'Técnica mixta sobre lienzo · 48 × 36 pulg.', en: 'Mixed media on canvas · 48 × 36 in', fr: 'Technique mixte sur toile · 48 × 36 po' },
      startBid: 1000 },
    // By María Dolores (Dominican, b. 1956), from the same book.
    { id: 'fragmento-de-identidad', kind: 'painting', artist: 'María Dolores', year: 2026, img: 'img/dolores-fragmento.jpg', thumb: 'img/dolores-fragmento-600.jpg', w: 381, h: 482,
      title: { es: 'Fragmento de Identidad', en: 'Fragmento de Identidad (Fragment of Identity)', fr: 'Fragmento de Identidad' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    { id: 'la-estructura-del-alma', kind: 'painting', artist: 'María Dolores', year: 2026, img: 'img/dolores-estructura.jpg', thumb: 'img/dolores-estructura-600.jpg', w: 814, h: 1037,
      title: { es: 'La Estructura del Alma', en: 'La Estructura del Alma (The Structure of the Soul)', fr: 'La Estructura del Alma' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000 },
    // By Gerald Ellis (Dominican, b. 1976), from the same book.
    { id: 'mujer-descansando-ii', kind: 'painting', artist: 'Gerald Ellis', year: 2021, img: 'img/ellis-mujer.jpg', thumb: 'img/ellis-mujer-600.jpg', w: 811, h: 577,
      title: { es: 'Mujer descansando II', en: 'Mujer descansando II (Woman Resting II)', fr: 'Mujer descansando II' },
      spec: { es: 'Óleo sobre tela · 35 × 48 pulg.', en: 'Oil on canvas · 35 × 48 in', fr: 'Huile sur toile · 35 × 48 po' },
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

// The book's headlines and critiques in Spanish and French: the museum's translations of the English ART GABANGI prints,
// paragraph for paragraph. Other languages show the English.
AUCTION.essaysTr = {
 "Wilson Abreu": {
  "es": {
   "head": "La imagen como herida abierta",
   "text": "La obra de Wilson Abreu no está hecha para ser contemplada con comodidad, sino para ser enfrentada desde una proximidad incómoda. No existe distancia segura entre la imagen y el espectador, porque la pintura se comporta como una superficie inestable donde la figura humana no aparece para ser reconocida, sino para ser puesta en crisis.\n\nEn ese desplazamiento, el cuerpo deja de funcionar como forma organizada.\nSe vuelve ruptura.\n\nUna zona donde la identidad se descompone, se desplaza y se resiste a estabilizarse.\n\nEn su obra, el dibujo no cumple una función descriptiva, sino activa. La línea no organiza la imagen con calma; la atraviesa, la fractura, se acelera, se interrumpe y avanza como si intentara sostener algo que ya se derrumba.\n\nCada trazo responde a la urgencia.\nNo a la corrección.\nNo al refinamiento.\n\nSino a la necesidad de sostener la figura humana justo en el momento en que comienza a transformarse en algo inestable y sin resolver. El gesto nunca busca la perfección.\nBusca la intensidad.\n\nLas figuras que construye nunca están completas, y esa incompletud no es accidente ni carencia, sino decisión estructural. Los cuerpos se fragmentan, se funden, se deforman y derivan hacia un estado intermedio entre lo humano y lo animal, entre la memoria y la erosión, entre la presencia y la desaparición.\n\nLo que al principio puede parecer distorsión se revela poco a poco como revelación.\nPorque lo que la obra expone no es la forma externa del cuerpo, sino su vulnerabilidad permanente.\n\nAquí la pintura no opera primero en lo psicológico.\nOpera en lo físico.\n\nLa materia misma se vuelve un participante inestable dentro de la imagen. La pintura nunca está del todo controlada, y esa aparente pérdida de control forma parte esencial del lenguaje. Se derrama, se acumula, se quiebra, se arrastra sobre la superficie y registra directamente la violencia y la inmediatez del gesto.\n\nHay momentos en que la imagen parece a punto de colapsar.\n\nY es precisamente en ese borde donde la obra adquiere su mayor fuerza.\n\nLas pinturas parecen reaccionar contra los mismos cuerpos que intentan contener.\n\nOtra dimensión importante de su obra reside en su relación con lo social. Sin embargo, esa relación nunca se manifiesta mediante la ilustración ni la narrativa política explícita.\n\nNo le hace falta.\nLas figuras ya cargan ese peso en sí mismas.\n\nNo representan historias singulares, pero parecen marcadas por muchas: la marginalidad, la violencia, el desplazamiento, el agotamiento, la fractura emocional y la inestabilidad social no surgen como temas, sino como estados del ser incrustados en la superficie misma de la imagen.\n\nEn este sentido, sus personajes no buscan la empatía en términos convencionales, ni establecen relaciones reconfortantes con el espectador. Se imponen desde un lugar incómodo, desde una presencia que se niega a suavizarse o simplificarse.\n\nY es precisamente ahí donde la obra adquiere una dimensión ética.\n\nNo por declaración.\nSino por lo que se niega a permitir que el espectador ignore.\n\nDentro del arte dominicano contemporáneo, Wilson Abreu ocupa un territorio de inestabilidad consciente. Su obra no pertenece ni a la figuración tranquila ni a la abstracción controlada, sino a una zona donde la imagen permanece en tensión constante.\nLa forma nunca termina de asentarse.\n\nY esa imposibilidad de estabilidad forma parte del poder de la obra.\n\nLas pinturas se resisten al cierre porque la condición humana que exponen también se resiste a la resolución. Gesto, materia, cuerpo y fragmentación permanecen suspendidos en conflicto activo.\n\nEn un contexto contemporáneo donde muchas imágenes se diseñan para la circulación rápida, el consumo fácil y la lectura inmediata, Wilson Abreu introduce resistencia. Sus pinturas se niegan a la simplificación.\n\nObligan a la mirada a detenerse.\nA permanecer.\n\nA enfrentar lo que no siempre es cómodo enfrentar.\n\nWilson Abreu no pinta la figura humana para organizarla en una imagen estable. La pinta en el momento exacto en que empieza a desbordar sus propios límites. En ese gesto, su obra revela algo fundamental: que la imagen no siempre está hecha para ser comprendida en paz.\n\nA veces está hecha para ser enfrentada.\n\nSu pintura no ofrece ni cierre ni reconciliación. Permanece abierta, activa y permanentemente tensa: un espacio donde la forma, la materia y la condición humana siguen chocando sin resolución."
  },
  "fr": {
   "head": "L’image comme blessure ouverte",
   "text": "L’œuvre de Wilson Abreu n’est pas faite pour être contemplée confortablement, mais pour être affrontée depuis une proximité inquiète. Il n’existe pas de distance sûre entre l’image et le spectateur, car la peinture se comporte comme une surface instable où la figure humaine n’apparaît pas pour être reconnue, mais pour être mise en crise.\n\nDans ce déplacement, le corps cesse de fonctionner comme forme organisée.\nIl devient rupture.\n\nUne zone où l’identité se décompose, se déplace et résiste à toute stabilisation.\n\nDans son œuvre, le dessin ne remplit pas une fonction descriptive, mais active. La ligne n’organise pas calmement l’image ; elle la traverse, la fracture, s’accélère, s’interrompt et avance comme si elle tentait de soutenir quelque chose qui s’effondre déjà.\n\nChaque trait répond à l’urgence.\nNon à la correction.\nNon au raffinement.\n\nMais à la nécessité de retenir la figure humaine précisément au moment où elle commence à se transformer en quelque chose d’instable et d’irrésolu. Le geste ne cherche jamais la perfection.\nIl cherche l’intensité.\n\nLes figures qu’il construit ne sont jamais complètes, et cette incomplétude n’est ni un accident ni un manque, mais une décision structurelle. Les corps se fragmentent, se confondent, se déforment et dérivent vers un état intermédiaire entre l’humain et l’animal, entre la mémoire et l’érosion, entre la présence et la disparition.\n\nCe qui peut d’abord sembler distorsion se révèle peu à peu comme révélation.\nCar ce que l’œuvre expose n’est pas la forme extérieure du corps, mais sa vulnérabilité permanente.\n\nIci, la peinture n’opère pas d’abord sur le plan psychologique.\nElle opère physiquement.\n\nLa matière elle-même devient un participant instable de l’image. La peinture n’est jamais entièrement maîtrisée, et cette apparente perte de contrôle fait partie essentielle du langage. Elle coule, s’accumule, se brise, se traîne sur la surface et enregistre directement la violence et l’immédiateté du geste.\n\nIl y a des moments où l’image semble sur le point de s’effondrer.\n\nEt c’est précisément à cette limite que l’œuvre acquiert sa plus grande force.\n\nLes peintures semblent réagir contre les corps mêmes qu’elles tentent de contenir.\n\nUne autre dimension importante de son œuvre tient à son rapport au social. Pourtant, ce rapport ne se manifeste jamais par l’illustration ni par un récit politique explicite.\n\nIl n’en a pas besoin.\nLes figures portent déjà ce poids en elles.\n\nElles ne représentent pas des histoires singulières, mais semblent marquées par beaucoup : la marginalité, la violence, le déplacement, l’épuisement, la fracture émotionnelle et l’instabilité sociale n’apparaissent pas comme des thèmes, mais comme des états de l’être inscrits dans la surface même de l’image.\n\nEn ce sens, ses personnages ne cherchent pas l’empathie au sens conventionnel et n’établissent pas de relations rassurantes avec le spectateur. Ils s’imposent depuis un lieu inconfortable, depuis une présence qui refuse l’adoucissement ou la simplification.\n\nEt c’est précisément là que l’œuvre acquiert une dimension éthique.\n\nNon par déclaration.\nMais par ce qu’elle refuse de laisser le spectateur ignorer.\n\nDans l’art dominicain contemporain, Wilson Abreu occupe un territoire d’instabilité consciente. Son œuvre n’appartient ni à la figuration tranquille ni à l’abstraction maîtrisée, mais à une zone où l’image demeure en tension constante.\nLa forme ne se pose jamais tout à fait.\n\nEt cette impossibilité de stabilité fait partie de la puissance de l’œuvre.\n\nLes peintures résistent à la clôture parce que la condition humaine qu’elles exposent résiste, elle aussi, à toute résolution. Geste, matière, corps et fragmentation demeurent suspendus dans un conflit actif.\n\nDans un contexte contemporain où tant d’images sont conçues pour circuler vite, se consommer facilement et se lire immédiatement, Wilson Abreu introduit de la résistance. Ses peintures refusent la simplification.\n\nElles obligent le regard à s’arrêter.\nÀ demeurer.\n\nÀ affronter ce qu’il n’est pas toujours confortable d’affronter.\n\nWilson Abreu ne peint pas la figure humaine pour l’organiser en une image stable. Il la peint au moment exact où elle commence à déborder ses propres limites. Dans ce geste, son œuvre révèle quelque chose de fondamental : l’image n’est pas toujours faite pour être comprise en paix.\n\nParfois, elle est faite pour être affrontée.\n\nSa peinture n’offre ni clôture ni réconciliation. Elle reste ouverte, active et en tension permanente : un espace où la forme, la matière et la condition humaine continuent de s’entrechoquer sans résolution."
  }
 },
 "José Almonte": {
  "es": {
   "head": "La pintura como cartografía del pensamiento y de la existencia",
   "text": "La obra de José Almonte existe en un territorio donde la pintura deja de operar como representación y se convierte en sistema. Sus composiciones no describen escenas; organizan relaciones entre figura, espacio y símbolo dentro de estructuras donde cada elemento participa de una lógica interna mayor.\n\nEn este sentido, su pintura no ilustra.\nPiensa.\n\nEn sus obras, la figura humana aparece reducida, fragmentada o apenas visible, pero nunca desaparece del todo. La figura no se presenta como protagonista, sino como punto de referencia dentro de un campo más amplio de relaciones. El cuerpo no domina la imagen.\n\nLa habita.\n\nSu escala frente a los elementos geométricos —círculos, trayectorias, superficies, estructuras orbitales— introduce una tensión entre lo individual y lo universal, entre la presencia humana y los sistemas que la sobrepasan.\n\nEl espacio pictórico se construye con notable precisión. El predominio del azul no responde a una preferencia estética superficial, sino a la creación de un campo en el que la imagen se vuelve mental, casi suspendida. No hay profundidad tradicional.\n\nHay atmósfera conceptual.\n\nLa pintura no se organiza por planos físicos, sino por niveles de percepción y de conciencia. El espectador no entra en un entorno literal, sino en un espacio psicológico y simbólico donde el pensamiento mismo parece espacializarse.\nLa geometría desempeña un papel fundamental en todo su lenguaje. Círculos, órbitas, curvas y líneas direccionales recorren la superficie y trazan rutas visuales que sugieren trayectorias, ciclos, desplazamiento y continuidad. Estas formas no decoran la imagen.\n\nLa estructuran.\n\nFuncionan como mapas invisibles que organizan la relación entre todos los elementos de la composición. La geometría deja de ser un mero recurso formal y se convierte en arquitectura conceptual.\n\nLos objetos que aparecen en su obra —un avión de papel, un banco, una figura aislada, un disco dorado— operan como signos. Nunca se explican del todo, pero activan asociaciones y resonancias psicológicas. Cada elemento parece cargado de intención, aunque esa intención nunca se revele por completo.\n\nLa obra permanece abierta.\nY es precisamente esa apertura la que da a las pinturas su profundidad intelectual.\n\nA lo largo de su práctica existe una relación constante con la idea de desplazamiento, no necesariamente físico, sino existencial. Las figuras parecen suspendidas en momentos de tránsito, situadas en algún punto entre la partida y el destino sin pertenecer del todo a ninguno.\n\nLa pintura no narra ese viaje.\nLo contiene.\n\nEl uso del oro introduce otra dimensión simbólica. Funciona como punto de concentración dentro del campo cromático, pero también como elemento que sugiere valor, centro, energía y gravedad simbólica. El oro nunca aparece como acento decorativo.\n\nAparece como núcleo.\n\nSu presencia reorganiza la percepción y establece jerarquías internas dentro de la composición, creando focos alrededor de los cuales la imagen parece orbitar, tanto psicológica como visualmente.\n\nEn el contexto del arte dominicano contemporáneo, José Almonte ocupa una posición singular en la que la pintura se convierte en instrumento del pensamiento. Su obra no busca el impacto inmediato ni el consumo emocional rápido, sino que construye experiencias que se despliegan poco a poco, a través del tiempo y la contemplación.\n\nSus pinturas no se consumen deprisa.\nSe recorren.\nEsa distinción es esencial.\n\nPorque su obra se resiste a la simplificación que domina gran parte de la cultura visual contemporánea. En lugar de reducir la complejidad para facilitar la circulación, José Almonte introduce complejidad sin sacrificar la claridad. Las pinturas exigen pausa, observación y que el espectador establezca conexiones.\n\nSu práctica revela una fuerte coherencia estructural. Cada obra no intenta romper por completo con la anterior, sino profundizar el mismo sistema visual y conceptual en el que la relación entre figura, geometría y símbolo se vuelve cada vez más refinada. Esa persistencia no es repetición.\nEs calibración.\n\nJosé Almonte no pinta para representar escenas ni para construir imágenes cerradas. Pinta para generar cartografías. En ese gesto, su obra propone una idea fundamental: que la pintura puede funcionar como un espacio donde la existencia no se describe, sino que se organiza."
  },
  "fr": {
   "head": "La peinture comme cartographie de la pensée et de l’existence",
   "text": "L’œuvre de José Almonte existe dans un territoire où la peinture cesse d’opérer comme représentation pour devenir système. Ses compositions ne décrivent pas des scènes ; elles organisent des relations entre la figure, l’espace et le symbole au sein de structures où chaque élément participe d’une logique interne plus vaste.\n\nEn ce sens, sa peinture n’illustre pas.\nElle pense.\n\nDans ses œuvres, la figure humaine apparaît réduite, fragmentée ou à peine visible, sans jamais disparaître tout à fait. Elle ne se présente pas comme protagoniste, mais comme point de repère dans un champ plus large de relations. Le corps ne domine pas l’image.\n\nIl l’habite.\n\nSon échelle face aux éléments géométriques — cercles, trajectoires, surfaces, structures orbitales — introduit une tension entre l’individuel et l’universel, entre la présence humaine et les systèmes qui la dépassent.\n\nL’espace pictural est construit avec une précision remarquable. La prédominance du bleu ne relève pas d’une préférence esthétique superficielle, mais de la création d’un champ où l’image devient mentale, presque suspendue. Il n’y a pas de profondeur traditionnelle.\n\nIl y a une atmosphère conceptuelle.\n\nLa peinture ne s’organise pas par plans physiques, mais par niveaux de perception et de conscience. Le spectateur n’entre pas dans un environnement littéral, mais dans un espace psychologique et symbolique où la pensée elle-même semble se spatialiser.\nLa géométrie joue un rôle fondamental dans tout son langage. Cercles, orbites, courbes et lignes directionnelles parcourent la surface et tracent des itinéraires visuels qui suggèrent trajectoires, cycles, déplacement et continuité. Ces formes ne décorent pas l’image.\n\nElles la structurent.\n\nElles fonctionnent comme des cartes invisibles qui organisent la relation entre tous les éléments de la composition. La géométrie n’est plus un simple procédé formel, mais une architecture conceptuelle.\n\nLes objets qui apparaissent dans son œuvre — un avion en papier, un banc, une figure isolée, un disque doré — opèrent comme des signes. Ils ne sont jamais entièrement expliqués, mais activent des associations et des résonances psychologiques. Chaque élément semble chargé d’intention, sans que cette intention se révèle jamais complètement.\n\nL’œuvre reste ouverte.\nEt c’est précisément cette ouverture qui donne aux peintures leur profondeur intellectuelle.\n\nToute sa pratique entretient un rapport constant avec l’idée de déplacement — non pas nécessairement physique, mais existentiel. Les figures semblent suspendues dans des moments de transition, situées quelque part entre le départ et la destination, sans appartenir pleinement à l’un ni à l’autre.\n\nLa peinture ne raconte pas ce voyage.\nElle le contient.\n\nL’usage de l’or introduit une autre dimension symbolique. Il fonctionne comme point de concentration dans le champ chromatique, mais aussi comme élément suggérant la valeur, le centre, l’énergie et la gravité symbolique. L’or n’apparaît jamais comme accent décoratif.\n\nIl apparaît comme noyau.\n\nSa présence réorganise la perception et établit des hiérarchies internes dans la composition, créant des points focaux autour desquels l’image semble graviter, psychologiquement comme visuellement.\n\nDans le contexte de l’art dominicain contemporain, José Almonte occupe une position singulière où la peinture devient un instrument de la pensée. Son œuvre ne cherche ni l’impact immédiat ni la consommation émotionnelle rapide ; elle construit des expériences qui se déploient peu à peu, à travers le temps et la contemplation.\n\nSes peintures ne se consomment pas vite.\nElles se parcourent.\nCette distinction est essentielle.\n\nCar son œuvre résiste à la simplification qui domine une grande partie de la culture visuelle contemporaine. Au lieu de réduire la complexité pour faciliter la circulation, José Almonte introduit de la complexité sans sacrifier la clarté. Les peintures exigent du spectateur pause, observation et mise en relation.\n\nSa pratique révèle une forte cohérence structurelle. Chaque œuvre ne cherche pas à rompre entièrement avec la précédente, mais à approfondir le même système visuel et conceptuel, où la relation entre figure, géométrie et symbole s’affine sans cesse. Cette persistance n’est pas répétition.\nC’est un étalonnage.\n\nJosé Almonte ne peint pas pour représenter des scènes ni pour construire des images fermées. Il peint pour produire des cartographies. Dans ce geste, son œuvre propose une idée fondamentale : la peinture peut être un espace où l’existence n’est pas décrite, mais organisée."
  }
 },
 "Juan Andújar": {
  "es": {
   "head": "El rostro como sistema rítmico"
  },
  "fr": {
   "head": "Le visage comme système rythmique"
  }
 },
 "Ney Díaz Henríquez": {
  "es": {
   "head": "La pintura como campo de tensión entre la figura y la materia",
   "text": "La obra de Ney Díaz Henríquez se construye en un territorio donde la figura humana no se presenta como forma estable, sino como un cuerpo en transformación constante. Sus imágenes no buscan fijar una identidad ni representar un estado definitivo; exponen, más bien, el proceso por el cual la figura se construye, se altera y se descompone dentro de la pintura misma.\n\nEn sus composiciones, el cuerpo aparece atravesado por la materia. No lo contiene el dibujo ni lo define del todo la forma. Se funde, en cambio, con manchas, veladuras, transparencias y gestos que interrumpen su estabilidad. La figura nunca desaparece del todo, pero tampoco se impone por completo sobre la superficie.\n\nPermanece en tensión.\n\nEsa inestabilidad es central en la obra.\n\nPorque Ney Díaz Henríquez entiende la figura no como certeza, sino como presencia frágil sometida a una transformación continua.\n\nEl gesto pictórico es decisivo en su lenguaje. No funciona como recurso expresivo superficial, sino como una acción capaz de modificar la estructura misma de la imagen. La pintura no se aplica para completar la figura.\n\nSe aplica para cuestionarla.\n\nCada intervención altera la percepción, desestabiliza el equilibrio y obliga a la imagen a permanecer abierta. La superficie nunca se resuelve del todo. La pintura conserva, en cambio, huellas de construcción, interrupción, corrección y desplazamiento a la vez.\n\nEl color intensifica aún más esta condición. Rojos, amarillos, azules y zonas neutras conviven en superficies donde el contraste no busca armonía, sino fricción. El color no acompaña a la forma.\n\nLa atraviesa.\n\nLa figura queda expuesta a una tensión cromática que la transforma continuamente desde dentro. El cuerpo parece vulnerable a la fuerza del color, como si la identidad misma fuera inestable bajo la presión de la materia y el gesto.\n\nHay también una dimensión psicológica directa en toda su obra. Los cuerpos no parecen representar personajes concretos, sino estados emocionales y existenciales. La pintura no describe lo que vemos desde fuera; revela condiciones internas que se resisten a una definición fija.\n\nLa imagen funciona como un espacio donde la emoción y la materialidad se cruzan sin llegar nunca a resolverse.\nEn este sentido, su obra pertenece a un territorio donde la figuración deja de funcionar como mera representación y se convierte en un campo de conflicto. La pintura no busca claridad ni estabilidad.\n\nBusca una incertidumbre sostenida en tensión activa.\n\nEsa distinción es fundamental.\n\nPorque la obra obtiene su fuerza precisamente de su negativa a asentarse en la figuración pura o en la abstracción total. Ney Díaz Henríquez habita un espacio intermedio donde ambas condiciones coexisten y se afectan continuamente. La figura surge de la materia solo para disolverse de nuevo en ella.\n\nEn el contexto del arte dominicano contemporáneo, su obra ocupa una posición singular por su capacidad de tensar los límites mismos de la pintura. Su práctica revela una coherencia notable en la que cada obra no intenta resolver el conflicto, sino profundizarlo. La repetición del cuerpo, del gesto y de la intervención material no funciona como insistencia vacía, sino como exploración continua de las posibilidades de la imagen.\n\nEsa persistencia le da profundidad a la obra.\n\nPorque cada pintura se siente menos como una conclusión que como un proceso en curso.\n\nEn un contexto contemporáneo en el que muchas pinturas buscan una lectura inmediata, su obra propone lo contrario. No se entrega rápido, porque está construida desde la inestabilidad. El espectador debe aceptar que la imagen nunca se fija del todo, sino que cambia según el tiempo, la percepción y la cercanía emocional.\n\nNey Díaz Henríquez no pinta para representar la figura humana.\n\nPinta para exponer su fragilidad dentro del propio lenguaje pictórico.\n\nY en ese gesto, su obra propone una idea fundamental: que la pintura no es un espacio de certeza, sino de transformación.\n\nSu obra permanece activa porque nunca se cierra del todo. Funciona como una superficie donde la figura y la materia siguen existiendo en diálogo, conflicto y proceso mucho después de que la imagen ha sido vista."
  },
  "fr": {
   "head": "La peinture comme champ de tension entre la figure et la matière",
   "text": "L’œuvre de Ney Díaz Henríquez se construit dans un territoire où la figure humaine ne se présente pas comme forme stable, mais comme un corps en transformation constante. Ses images ne cherchent ni à fixer une identité ni à représenter un état définitif ; elles exposent plutôt le processus par lequel la figure se construit, s’altère et se décompose au sein de la peinture elle-même.\n\nDans ses compositions, le corps apparaît traversé par la matière. Il n’est ni contenu par le dessin ni entièrement défini par la forme. Il se fond au contraire dans des taches, des glacis, des transparences et des gestes qui interrompent sa stabilité. La figure ne disparaît jamais tout à fait, sans pour autant s’imposer complètement à la surface.\n\nElle demeure en tension.\n\nCette instabilité est au cœur de l’œuvre.\n\nCar Ney Díaz Henríquez comprend la figure non comme une certitude, mais comme une présence fragile, soumise à une transformation continue.\n\nLe geste pictural est décisif dans son langage. Il ne fonctionne pas comme un procédé expressif superficiel, mais comme une action capable de modifier la structure même de l’image. La peinture n’est pas appliquée pour compléter la figure.\n\nElle est appliquée pour l’interroger.\n\nChaque intervention modifie la perception, déstabilise l’équilibre et oblige l’image à rester ouverte. La surface ne se résout jamais complètement. La peinture conserve au contraire, simultanément, des traces de construction, d’interruption, de correction et de déplacement.\n\nLa couleur intensifie encore cette condition. Rouges, jaunes, bleus et zones neutres coexistent sur des surfaces où le contraste ne cherche pas l’harmonie, mais la friction. La couleur n’accompagne pas la forme.\n\nElle la traverse.\n\nLa figure reste exposée à une tension chromatique qui la transforme continuellement de l’intérieur. Le corps semble vulnérable à la force de la couleur, comme si l’identité elle-même était instable sous la pression de la matière et du geste.\n\nUne dimension psychologique directe parcourt aussi toute son œuvre. Les corps ne semblent pas représenter des personnages précis, mais des états émotionnels et existentiels. La peinture ne décrit pas ce que nous voyons de l’extérieur ; elle révèle des conditions intérieures qui résistent à toute définition fixe.\n\nL’image fonctionne comme un espace où l’émotion et la matérialité se croisent sans jamais se résoudre complètement.\nEn ce sens, son œuvre appartient à un territoire où la figuration cesse de n’être que représentation pour devenir un champ de conflit. La peinture ne cherche ni la clarté ni la stabilité.\n\nElle cherche une incertitude maintenue en tension active.\n\nCette distinction est fondamentale.\n\nCar l’œuvre tire précisément sa force de son refus de s’établir dans la figuration pure ou dans l’abstraction totale. Ney Díaz Henríquez habite un espace intermédiaire où les deux conditions coexistent et s’affectent sans cesse. La figure surgit de la matière pour s’y dissoudre à nouveau.\n\nDans le contexte de l’art dominicain contemporain, son œuvre occupe une position singulière par sa capacité à mettre en tension les limites mêmes de la peinture. Sa pratique révèle une cohérence remarquable : chaque œuvre ne cherche pas à résoudre le conflit, mais à l’approfondir. La répétition du corps, du geste et de l’intervention matérielle n’est pas une insistance vide, mais une exploration continue des possibilités de l’image.\n\nCette persistance donne de la profondeur à l’œuvre.\n\nCar chaque peinture ressemble moins à une conclusion qu’à un processus en cours.\n\nDans un contexte contemporain où tant de peintures recherchent une lecture immédiate, son œuvre propose l’inverse. Elle ne se livre pas vite, parce qu’elle est construite sur l’instabilité. Le spectateur doit accepter que l’image ne se fixe jamais entièrement, mais change selon le temps, la perception et la proximité émotionnelle.\n\nNey Díaz Henríquez ne peint pas pour représenter la figure humaine.\n\nIl peint pour exposer sa fragilité au sein même du langage pictural.\n\nEt dans ce geste, son œuvre propose une idée fondamentale : la peinture n’est pas un espace de certitude, mais de transformation.\n\nSon œuvre reste active parce qu’elle ne se referme jamais complètement. Elle fonctionne comme une surface où la figure et la matière continuent d’exister dans le dialogue, le conflit et le processus, longtemps après que l’image a été vue."
  }
 },
 "Aurora Díaz": {
  "es": {
   "head": "La delicadeza como estructura de resistencia",
   "text": "Aurora Díaz construye una imagen que existe entre la revelación y la fragmentación. En esta obra, el rostro humano no aparece como un retrato estable, sino como una superficie psicológica intervenida por la memoria, la transformación y el desplazamiento simbólico. La figura surge suspendida entre la presencia y la disolución, como si la identidad misma estuviera en un proceso constante de reconstrucción.\n\nLo que al principio parece serenidad revela poco a poco una tensión interna.\n\nLa mirada permanece fija y consciente, pero el rostro es invadido por una estructura orgánica que rompe la armonía visual y transforma el retrato en un territorio de conflicto psicológico. Esta intervención no opera mediante la violencia literal, sino mediante la perturbación emocional. La imagen se vuelve un espacio donde la belleza, la fragilidad y la mutación coexisten a la vez.\n\nEn la composición, el azul funciona como algo más que color.\n\nSe vuelve atmósfera.\n\nAurora Díaz usa la contención cromática para construir espacio emocional. El campo tonal genera silencio, introspección y distancia, y permite que la pintura respire desde la suspensión y no desde el exceso. Los chorreados que atraviesan la superficie refuerzan esta sensación de inestabilidad, como si la imagen se disolviera mientras intenta, al mismo tiempo, preservarse.\n\nIgualmente significativa es la presencia del insecto alado situado junto al rostro. Su función no es decorativa, sino simbólica. El insecto introduce ideas de metamorfosis, vulnerabilidad y tránsito, y establece un diálogo entre lo orgánico y lo psicológico. Su presencia delicada contrasta con la fragmentación del rostro y crea una tensión constante entre destrucción y transformación.\n\nLos patrones geométricos integrados en toda la composición intensifican aún más esta relación. Introducen orden en una imagen gobernada por la inestabilidad emocional y sugieren la necesidad humana de construir estructura en medio de la incertidumbre. En Aurora Díaz, la geometría no neutraliza la emoción.\n\nLa contiene.\n\nUno de los aspectos más fuertes de su obra es el control. La pintura nunca cae en el exceso visual pese a la complejidad emocional que sostiene. Cada elemento —gesto, color, símbolo y espacio— opera con una precisión medida. Esa contención permite que la obra mantenga sofisticación sin perder intensidad psicológica.\n\nAurora Díaz no construye narrativas literales. Sus pinturas se resisten a la explicación directa porque su verdadero funcionamiento ocurre más allá de la anécdota. Lo que importa no es la historia en sí, sino la condición emocional y simbólica que surge de la relación entre la imagen y la percepción.\n\nEn el contexto del arte dominicano contemporáneo, su obra ocupa una posición singular basada en la sensibilidad, la introspección y el refinamiento simbólico. Su pintura transforma la imagen en un espacio donde lo visible y lo invisible coexisten; donde la identidad se vuelve inestable, la memoria se vuelve atmósfera y el silencio adquiere forma.\n\nLo que surge de esta obra no es simplemente un retrato.\n\nEs un estado psicológico suspendido en la pintura."
  },
  "fr": {
   "head": "La délicatesse comme structure de résistance",
   "text": "Aurora Díaz construit une image qui existe entre révélation et fragmentation. Dans cette œuvre, le visage humain n’apparaît pas comme un portrait stable, mais comme une surface psychologique traversée par la mémoire, la transformation et le déplacement symbolique. La figure surgit, suspendue entre présence et dissolution, comme si l’identité elle-même était en reconstruction permanente.\n\nCe qui semble d’abord sérénité révèle peu à peu une tension intérieure.\n\nLe regard reste fixe et conscient, mais le visage est envahi par une structure organique qui rompt l’harmonie visuelle et transforme le portrait en territoire de conflit psychologique. Cette intervention n’opère pas par une violence littérale, mais par un trouble émotionnel. L’image devient un espace où la beauté, la fragilité et la mutation coexistent simultanément.\n\nDans la composition, le bleu fonctionne comme quelque chose qui dépasse la couleur.\n\nIl devient atmosphère.\n\nAurora Díaz se sert de la retenue chromatique pour construire un espace émotionnel. Le champ tonal engendre silence, introspection et distance, et laisse la peinture respirer par la suspension plutôt que par l’excès. Les coulures qui traversent la surface renforcent cette sensation d’instabilité, comme si l’image se dissolvait tout en cherchant à se préserver.\n\nTout aussi significative est la présence de l’insecte ailé placé à côté du visage. Sa fonction n’est pas décorative, mais symbolique. L’insecte introduit les idées de métamorphose, de vulnérabilité et de transition, et instaure un dialogue entre l’organique et le psychologique. Sa présence délicate contraste avec la fragmentation du visage et crée une tension constante entre destruction et transformation.\n\nLes motifs géométriques intégrés à toute la composition intensifient encore cette relation. Ils introduisent de l’ordre dans une image gouvernée par l’instabilité émotionnelle et suggèrent le besoin humain de construire une structure au sein de l’incertitude. Chez Aurora Díaz, la géométrie ne neutralise pas l’émotion.\n\nElle la contient.\n\nL’un des aspects les plus forts de son œuvre est la maîtrise. La peinture ne bascule jamais dans l’excès visuel malgré la complexité émotionnelle qu’elle porte. Chaque élément — geste, couleur, symbole et espace — opère avec une précision mesurée. Cette retenue permet à l’œuvre de garder sa sophistication sans perdre son intensité psychologique.\n\nAurora Díaz ne construit pas de récits littéraux. Ses peintures résistent à l’explication directe, parce que leur véritable fonctionnement se situe au-delà de l’anecdote. Ce qui compte n’est pas l’histoire en elle-même, mais la condition émotionnelle et symbolique qui naît de la relation entre l’image et la perception.\n\nDans le contexte de l’art dominicain contemporain, son œuvre occupe une position singulière, fondée sur la sensibilité, l’introspection et le raffinement symbolique. Sa peinture transforme l’image en un espace où le visible et l’invisible coexistent ; où l’identité devient instable, la mémoire devient atmosphère et le silence prend forme.\n\nCe qui émerge de cette œuvre n’est pas simplement un portrait.\n\nC’est un état psychologique suspendu dans la peinture."
  }
 },
 "María Dolores": {
  "es": {
   "head": "La geometría emocional del rostro",
   "text": "La obra de María Dolores (1956), en particular su serie de cabezas, existe en un territorio donde la figuración y la abstracción alcanzan un delicado equilibrio estructural. Sus composiciones no buscan reproducir el rostro humano según la lógica anatómica tradicional; lo reconstruyen, en cambio, como un sistema simbólico de líneas, formas y tensiones cromáticas. Cada cabeza funciona como una arquitectura emocional en la que la geometría se vuelve lenguaje psicológico.\n\nEn sus pinturas, el rostro deja de representar una identidad individual y se transforma en un signo universal. María Dolores simplifica formas, fragmenta volúmenes y reorganiza la estructura facial mediante una red de curvas, divisiones internas y planos de color que interactúan constantemente entre sí. La artista parece comprender que el ser humano no puede reducirse a la representación literal; por eso sus figuras funcionan más como mapas interiores que como retratos convencionales.\n\nUno de los aspectos más significativos de esta serie es su capacidad de sintetizar la complejidad visual mediante una aparente sencillez formal. Gruesas líneas negras operan como ejes constructivos que sostienen la composición, mientras los colores vibrantes generan ritmos visuales de notable intensidad. Rojos, amarillos, verdes, blancos y negros conviven en un equilibrio cuidadosamente calculado que recuerda ciertas exploraciones del cubismo, del modernismo latinoamericano y de la abstracción lírica, aunque siempre filtradas por una sensibilidad profundamente personal.\n\nLa repetición del motivo de la cabeza no debe interpretarse como limitación temática, sino como una investigación continua sobre la condición humana. Cada variación introduce nuevas relaciones entre forma y espacio, entre vacío y densidad, entre control geométrico y espontaneidad emocional. María Dolores transforma el rostro en un laboratorio visual donde explora la identidad, la memoria, la energía y la percepción.\n\nHay además en su obra una dimensión lúdica que da frescura a la composición. Puntos, patrones, franjas y módulos geométricos generan una sensación de movimiento interno que impide que la estructura se vuelva rígida. Sus pinturas conservan una vitalidad cercana al lenguaje musical: las formas parecen moverse por el lienzo como notas organizadas en una partitura visual.\n\nSin embargo, bajo esta aparente ligereza formal hay una rigurosa conciencia compositiva. Nada en sus pinturas parece arbitrario. Cada curva, intersección y bloque cromático participa en una arquitectura cuidadosamente equilibrada. María Dolores entiende la pintura como construcción, pero también como sensibilidad. Su obra logra articular orden y emoción sin sacrificar la fuerza expresiva de ninguno de los dos.\n\nLa frontalidad de las cabezas establece además una relación directa con el espectador. Aunque los rostros están fragmentados y reducidos a estructuras esenciales, conservan una poderosa presencia psicológica. La mirada surge desde dentro de la abstracción. El espectador no se enfrenta solo a una composición geométrica, sino a una presencia humana transformada en símbolo.\n\nEn el contexto del arte dominicano contemporáneo, la obra de María Dolores representa una investigación coherente y sostenida sobre las posibilidades expresivas de la síntesis formal. Su obra demuestra que la abstracción y la figuración no son territorios opuestos, sino dimensiones complementarias capaces de coexistir en una misma estructura visual. En sus manos, el rostro humano se convierte en un territorio de exploración tanto estética como emocional.\n\nPor ello, la inclusión de María Dolores en ART GABANGI 2026: Top 100 Artists reconoce a una artista que ha desarrollado un lenguaje visual sólido, identificable y profundamente contemporáneo. Su serie de cabezas confirma una visión artística en la que la geometría, el color y la sensibilidad convergen para construir imágenes cargadas de equilibrio, ritmo y humanidad."
  },
  "fr": {
   "head": "La géométrie émotionnelle du visage",
   "text": "L’œuvre de María Dolores (1956), en particulier sa série de têtes, existe dans un territoire où la figuration et l’abstraction atteignent un délicat équilibre structurel. Ses compositions ne cherchent pas à reproduire le visage humain selon la logique anatomique traditionnelle ; elles le reconstruisent comme un système symbolique de lignes, de formes et de tensions chromatiques. Chaque tête fonctionne comme une architecture émotionnelle où la géométrie devient langage psychologique.\n\nDans ses peintures, le visage cesse de représenter une identité individuelle et se transforme en signe universel. María Dolores simplifie les formes, fragmente les volumes et réorganise la structure du visage par un réseau de courbes, de divisions internes et de plans de couleur qui interagissent sans cesse. L’artiste semble comprendre que l’être humain ne peut se réduire à une représentation littérale ; c’est pourquoi ses figures fonctionnent davantage comme des cartes intérieures que comme des portraits conventionnels.\n\nL’un des aspects les plus significatifs de cette série est sa capacité à synthétiser la complexité visuelle par une apparente simplicité formelle. D’épaisses lignes noires opèrent comme des axes constructifs qui soutiennent la composition, tandis que des couleurs vibrantes engendrent des rythmes visuels d’une intensité remarquable. Rouges, jaunes, verts, blancs et noirs coexistent dans un équilibre soigneusement calculé qui rappelle certaines explorations du cubisme, du modernisme latino-américain et de l’abstraction lyrique, toujours filtrées par une sensibilité profondément personnelle.\n\nLa répétition du motif de la tête ne doit pas être interprétée comme une limite thématique, mais comme une recherche continue sur la condition humaine. Chaque variation introduit de nouvelles relations entre forme et espace, entre vide et densité, entre maîtrise géométrique et spontanéité émotionnelle. María Dolores fait du visage un laboratoire visuel où elle explore l’identité, la mémoire, l’énergie et la perception.\n\nIl existe aussi dans son œuvre une dimension ludique qui donne de la fraîcheur à la composition. Points, motifs, rayures et modules géométriques créent une sensation de mouvement interne qui empêche la structure de se figer. Ses peintures gardent une vitalité proche du langage musical : les formes semblent se déplacer sur la toile comme des notes organisées dans une partition visuelle.\n\nPourtant, sous cette apparente légèreté formelle se cache une rigoureuse conscience de la composition. Rien dans ses peintures ne semble arbitraire. Chaque courbe, chaque intersection et chaque bloc chromatique participe d’une architecture soigneusement équilibrée. María Dolores conçoit la peinture comme construction, mais aussi comme sensibilité. Son œuvre parvient à articuler ordre et émotion sans sacrifier la force expressive de l’un ni de l’autre.\n\nLa frontalité des têtes établit en outre une relation directe avec le spectateur. Bien que les visages soient fragmentés et réduits à des structures essentielles, ils conservent une puissante présence psychologique. Le regard surgit de l’intérieur de l’abstraction. Le spectateur ne fait pas seulement face à une composition géométrique, mais à une présence humaine transformée en symbole.\n\nDans le contexte de l’art dominicain contemporain, l’œuvre de María Dolores représente une recherche cohérente et soutenue sur les possibilités expressives de la synthèse formelle. Elle démontre que l’abstraction et la figuration ne sont pas des territoires opposés, mais des dimensions complémentaires capables de coexister dans une même structure visuelle. Entre ses mains, le visage humain devient un territoire d’exploration à la fois esthétique et émotionnelle.\n\nC’est pourquoi l’inclusion de María Dolores dans ART GABANGI 2026: Top 100 Artists distingue une artiste qui a développé un langage visuel solide, identifiable et profondément contemporain. Sa série de têtes confirme une vision artistique où la géométrie, la couleur et la sensibilité convergent pour construire des images chargées d’équilibre, de rythme et d’humanité."
  }
 },
 "Gerald Ellis": {
  "es": {
   "head": "La imagen como territorio de memoria y presencia",
   "text": "Gerald Ellis no aborda la imagen como simple representación, sino como un territorio donde la memoria, la identidad y la presencia humana se reorganizan mediante una sensibilidad profundamente visual. Su obra parte de la figura, pero no se queda en ella; la usa como punto de entrada para construir una atmósfera en la que lo humano se vuelve símbolo, tensión y permanencia.\n\nEn su lenguaje, la figura no aparece como un cuerpo aislado, sino como una presencia cargada de historia. Cada rostro, gesto y postura parece contener una dimensión interior que excede lo visible, como si la obra no se ocupara de describir al sujeto, sino de revelar lo que lo sostiene emocionalmente.\n\nUno de los aspectos más significativos de su práctica es la manera en que articula color, gesto y composición para construir imágenes de fuerte intensidad expresiva. El color no funciona como ornamento, sino como fuerza psicológica: organiza la mirada, genera temperatura emocional y transforma la superficie en un campo activo donde la figura respira, se afirma y perdura.\n\nSu obra opera entre la figuración y un grado de libertad expresiva que evita caer en la descripción literal. No hay una búsqueda fría del parecido ni una adhesión absoluta al realismo; lo que surge, en cambio, es la voluntad de capturar una presencia, una energía, una condición humana. En este sentido, Ellis entiende que la imagen no necesita replicar la realidad para transmitir una verdad más profunda.\n\nUna lectura más crítica: su mayor fortaleza —la capacidad de cargar la figura de intensidad emocional— también exige vigilancia. Cuando el gesto expresivo se vuelve demasiado reconocible, la obra corre el riesgo de estabilizarse en una fórmula. El desafío está en llevar la figura hacia zonas de mayor tensión, donde el color, la composición y el material no solo acompañen al sujeto, sino que lo pongan en crisis.\n\nCuando aparece esa tensión, ocurre algo esencial:\n\nla pintura deja de ser imagen y se convierte en experiencia.\n\nGerald Ellis no pinta figuras para ser consumidas rápidamente; construye presencias que obligan al espectador a detenerse, a mirar nuevamente y a reconocer que detrás de cada imagen existe una carga humana que no puede agotarse en la superficie.\n\nPor ello, más que un pintor de cuerpos o de rostros, Gerald Ellis puede entenderse como un constructor de presencias. Su obra afirma que la pintura sigue siendo un espacio válido para pensar lo humano, no a través de la apariencia, sino de la memoria emocional que cada imagen es capaz de sostener."
  },
  "fr": {
   "head": "L’image comme territoire de mémoire et de présence",
   "text": "Gerald Ellis n’aborde pas l’image comme une simple représentation, mais comme un territoire où la mémoire, l’identité et la présence humaine se réorganisent à travers une sensibilité profondément visuelle. Son œuvre part de la figure sans s’y enfermer ; elle s’en sert comme point d’entrée pour construire une atmosphère où l’humain devient symbole, tension et permanence.\n\nDans son langage, la figure n’apparaît pas comme un corps isolé, mais comme une présence chargée d’histoire. Chaque visage, chaque geste et chaque posture semble contenir une dimension intérieure qui dépasse le visible, comme si l’œuvre ne cherchait pas à décrire le sujet, mais à révéler ce qui le soutient émotionnellement.\n\nL’un des aspects les plus significatifs de sa pratique est la manière dont il articule la couleur, le geste et la composition pour construire des images d’une forte intensité expressive. La couleur ne fonctionne pas comme ornement, mais comme force psychologique : elle organise le regard, crée une température émotionnelle et transforme la surface en un champ actif où la figure respire, s’affirme et perdure.\n\nSon œuvre se situe entre la figuration et une liberté expressive qui évite de tomber dans la description littérale. Il n’y a ni recherche froide de la ressemblance ni adhésion absolue au réalisme ; ce qui émerge, c’est une volonté de saisir une présence, une énergie, une condition humaine. En ce sens, Ellis comprend que l’image n’a pas besoin de reproduire la réalité pour transmettre une vérité plus profonde.\n\nUne lecture plus critique : sa plus grande force — la capacité de charger la figure d’une intensité émotionnelle — exige aussi de la vigilance. Lorsque le geste expressif devient trop reconnaissable, l’œuvre risque de se figer en formule. Le défi consiste à pousser la figure vers des zones de tension plus fortes, où la couleur, la composition et la matière n’accompagnent pas seulement le sujet, mais le mettent en crise.\n\nLorsque cette tension apparaît, quelque chose d’essentiel se produit :\n\nla peinture cesse d’être image et devient expérience.\n\nGerald Ellis ne peint pas des figures destinées à être consommées rapidement ; il construit des présences qui obligent le spectateur à s’arrêter, à regarder de nouveau et à reconnaître que derrière chaque image se trouve une charge humaine qui ne peut s’épuiser à la surface.\n\nC’est pourquoi, plus qu’un peintre de corps ou de visages, Gerald Ellis peut être compris comme un bâtisseur de présences. Son œuvre affirme que la peinture reste un espace légitime pour penser l’humain, non par l’apparence, mais par la mémoire émotionnelle que chaque image est capable de porter."
  }
 }
};

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
  'Ney Díaz Henríquez': { head: 'Painting as a field of tension between figure and matter', text: `Ney Díaz Henríquez’s work is constructed within a territory where the human figure does not present itself as stable form, but as a body in constant transformation. His images do not seek to fix identity or represent a definitive state; rather, they expose the process through which the figure is constructed, altered, and decomposed within the painting itself.

Within his compositions, the body appears traversed by matter. It is not contained by drawing nor fully defined by form. Instead, it merges with stains, glazes, transparencies, and gestures that interrupt its stability. The figure never fully disappears, yet neither does it completely impose itself upon the surface.

It remains in tension.

That instability is central to the work.

Because Ney Díaz Henríquez understands the figure not as certainty, but as fragile presence continually subjected to transformation.

Pictorial gesture is decisive within his language. It does not function as superficial expressive device, but as an action capable of modifying the very structure of the image. Paint is not applied in order to complete the figure.

It is applied in order to question it.

Every intervention alters perception, destabilizes equilibrium, and forces the image to remain open. The surface never resolves itself completely. Instead, the painting preserves traces of construction, interruption, correction, and displacement simultaneously.

Color intensifies this condition further. Reds, yellows, blues, and neutral zones coexist across surfaces where contrast does not seek harmony, but friction. Color does not accompany form.

It passes through it.

The figure remains exposed to chromatic tension continuously transforming it from within. The body appears vulnerable to the force of color, as though identity itself were unstable under the pressure of matter and gesture.

There is also a direct psychological dimension running throughout his work. The bodies do not appear to represent specific characters, but rather emotional and existential states. The painting does not describe what we see externally; it reveals internal conditions that resist fixed definition.

The image functions as a space where emotion and materiality intersect without ever fully resolving themselves.
In this sense, his work belongs to a territory where figuration ceases to function merely as representation and becomes instead a field of conflict. The painting does not seek clarity or stability.

It seeks uncertainty held in active tension.

That distinction is fundamental.

Because the work gains its force precisely through its refusal to settle into either pure figuration or complete abstraction. Ney Díaz Henríquez inhabits an intermediate space where both conditions coexist and continuously affect one another. The figure emerges from matter only to dissolve back into it again.

Within the context of contemporary Dominican art, his work occupies a singular position because of its ability to tension the very limits of painting itself. His practice reveals a remarkable coherence in which each work does not attempt to resolve conflict, but to deepen it. The repetition of body, gesture, and material intervention does not function as empty insistence, but as continuous exploration of the possibilities of the image.

That persistence gives the work depth.

Because each painting feels less like conclusion than ongoing process.

In a contemporary context where many paintings seek immediate readability, his work proposes the opposite. It does not surrender itself quickly because it is constructed through instability. The viewer is required to accept that the image never fully fixes itself, but changes according to time, perception, and emotional proximity.

Ney Díaz Henríquez does not paint in order to represent the human figure.

He paints in order to expose its fragility within the pictorial language itself.

And in that gesture, his work proposes a fundamental idea: that painting is not a space of certainty, but of transformation.

His work remains active because it never fully closes itself. It functions as a surface where figure and matter continue existing in dialogue, conflict, and process long after the image has been seen.` },
  'Aurora Díaz': { head: 'Delicacy as a structure of resistance', text: `Aurora Díaz constructs an image that exists between revelation and fragmentation. In this work, the human face does not appear as a stable portrait, but as a psychological surface intervened by memory, transformation, and symbolic displacement. The figure emerges suspended between presence and dissolution, as if identity itself were in a constant process of reconstruction.

What initially appears as serenity gradually reveals an internal tension.

The gaze remains fixed and conscious, yet the face is invaded by an organic structure that disrupts visual harmony and transforms the portrait into a territory of psychological conflict. This intervention does not operate through literal violence, but through emotional disturbance. The image becomes a space where beauty, fragility, and mutation coexist simultaneously.

Within the composition, blue functions as something beyond color.

It becomes atmosphere.

Aurora Díaz uses chromatic restraint to construct emotional space. The tonal field generates silence, introspection, and distance, allowing the painting to breathe through suspension rather than excess. The drippings that traverse the surface reinforce this sensation of instability, as if the image were dissolving while simultaneously attempting to preserve itself.

Equally significant is the presence of the winged insect positioned beside the face. Its function is not decorative, but symbolic. The insect introduces ideas of metamorphosis, vulnerability, and transition, establishing a dialogue between the organic and the psychological. Its delicate presence contrasts with the fragmentation of the face, creating a constant tension between destruction and transformation.

The geometric patterns integrated throughout the composition intensify this relationship even further. They introduce order into an image governed by emotional instability, suggesting the human necessity to construct structure within uncertainty. In Aurora Díaz, geometry does not neutralize emotion.

It contains it.

One of the strongest aspects of her work is control. The painting never collapses into visual excess despite the emotional complexity it sustains. Every element gesture, color, symbol, and space operates through measured precision. This restraint allows the work to maintain sophistication without losing psychological intensity.

Aurora Díaz does not construct literal narratives. Her paintings resist direct explanation because their true operation occurs beyond anecdote. What matters is not the story itself, but the emotional and symbolic condition that emerges from the relationship between image and perception.

Within the context of Dominican contemporary art, her work occupies a singular position grounded in sensibility, introspection, and symbolic refinement. Her painting transforms the image into a space where the visible and the invisible coexist; where identity becomes unstable, memory becomes atmosphere, and silence acquires form.

What emerges from this work is not simply a portrait.

It is a psychological state suspended in paint.` },
  'María Dolores': { head: 'The emotional geometry of the face', text: `The work of María Dolores (1956), particularly within her series of heads, exists in a territory where figuration and abstraction achieve a delicate structural balance. Her compositions do not seek to reproduce the human face through traditional anatomical logic; instead, they reconstruct it as a symbolic system of lines, forms, and chromatic tensions. Each head functions as an emotional architecture in which geometry becomes psychological language.

In her paintings, the face ceases to represent individual identity and transforms into a universal sign. María Dolores simplifies forms, fragments volumes, and reorganizes facial structure through a network of curves, internal divisions, and planes of color that constantly interact with one another. The artist appears to understand that the human being cannot be reduced to literal representation; for this reason, her figures function more as interior maps than as conventional portraits.

One of the most significant aspects of this series is her ability to synthesize visual complexity through an apparent formal simplicity. Thick black lines operate as constructive axes that sustain the composition, while vibrant colors generate visual rhythms of remarkable intensity. Reds, yellows, greens, whites, and blacks coexist within a carefully calculated equilibrium that recalls certain explorations of Cubism, Latin American modernism, and lyrical abstraction, though always filtered through a profoundly personal sensibility.

The repetition of the head motif should not be interpreted as thematic limitation, but rather as an ongoing investigation into the human condition. Each variation introduces new relationships between form and space, between emptiness and density, between geometric control and emotional spontaneity. María Dolores transforms the face into a visual laboratory where she explores identity, memory, energy, and perception.

There is also within her work a playful dimension that gives freshness to the composition. Dots, patterns, stripes, and geometric modules generate a sensation of internal movement that prevents the structure from becoming rigid. Her paintings retain a vitality close to musical language: the forms appear to move across the canvas like notes organized within a visual score.

Yet beneath this apparent formal lightness lies a rigorous compositional awareness. Nothing within her paintings appears arbitrary. Every curve, intersection, and chromatic block participates in a carefully balanced architecture. María Dolores understands painting as construction, but also as sensitivity. Her work succeeds in articulating order and emotion without sacrificing the expressive force of either element.

The frontal quality of the heads also establishes a direct relationship with the viewer. Although the faces are fragmented and reduced to essential structures, they retain a powerful psychological presence. The gaze emerges from within abstraction. The viewer is not confronted merely with a geometric composition, but with a human presence transformed into symbol.

Within the context of contemporary Dominican art, María Dolores’s work represents a coherent and sustained investigation into the expressive possibilities of formal synthesis. Her work demonstrates that abstraction and figuration are not opposing territories, but complementary dimensions capable of coexisting within the same visual structure. In her hands, the human face becomes a territory of both aesthetic and emotional exploration.

For this reason, María Dolores’s inclusion in ART GABANGI 2026: Top 100 Artists recognizes an artist who has developed a solid, identifiable, and profoundly contemporary visual language. Her series of heads confirms an artistic vision in which geometry, color, and sensitivity converge to construct images charged with balance, rhythm, and humanity.` },
  'Gerald Ellis': { head: 'The image as a territory of memory and presence', text: `Gerald Ellis does not approach the image as simple representation, but as a territory where memory, identity, and human presence are reorganized through a deeply visual sensibility. His work begins with the figure, yet does not remain confined to it; rather, it uses it as an entry point to construct an atmosphere in which the human becomes symbol, tension, and permanence.

In his language, the figure does not appear as an isolated body, but as a presence charged with history. Each face, gesture, and posture seems to contain an inner dimension that exceeds the visible, as if the work were not concerned with describing the subject, but with revealing what sustains it emotionally.

One of the most significant aspects of his practice is the way he articulates color, gesture, and composition to construct images of strong expressive intensity. Color does not function as ornament, but as psychological force; it organizes the gaze, generates emotional temperature, and transforms the surface into an active field where the figure breathes, asserts itself, and endures.

His work operates between figuration and a degree of expressive freedom that avoids falling into literal description. There is no cold pursuit of likeness, nor absolute adherence to realism; what emerges instead is a will to capture presence an energy, a human condition. In this sense, Ellis understands that the image does not need to replicate reality in order to convey a deeper truth.

A more critical reading: his greatest strength the ability to charge the figure with emotional intensity also demands vigilance. When expressive gesture becomes too recognizable, the work risks stabilizing into a formula. The challenge lies in pushing the figure toward greater zones of tension, where color, composition, and material do not simply accompany the subject, but place it into crisis.

When that tension appears, something essential occurs:

painting ceases to be image and becomes experience.

Gerald Ellis does not paint figures to be quickly consumed; he constructs presences that compel the viewer to pause, to look again, and to recognize that behind each image lies a human charge that cannot be exhausted at the surface.

For this reason, more than a painter of bodies or faces, Gerald Ellis can be understood as a builder of presences. His work affirms that painting remains a valid space for thinking the human not through appearance, but through the emotional memory that each image is capable of sustaining.` },
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
