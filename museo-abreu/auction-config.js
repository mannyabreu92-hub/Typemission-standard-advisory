// Auction of works by Oscar Abreu: online bidding in the app until `closesAt`, then the auction
// ends live in the room at the ART GABANGI Auction & Awards Dinner (its live auction is on gabangi.com).
// Shared by the app and the bidding server (api/auction.js), which enforces these rules.
//
// A lot opens for online bids only when it has a starting bid and a closing time. The lots below
// are EXAMPLES (example: true) until the museum confirms which works go to auction and the closing date:
// to publish one, remove `example: true` and set `closesAt` (here, or on the lot).
var AUCTION = {
  live: { event: 'art-gabangi', tier: 'dinner' }, // where the auction ends live
  increment: 100,                                 // USD; each bid must beat the current one by this much
  startBid: 1000,                                 // USD; the opening bid of every lot unless the lot sets its own
  // Soft close: a bid in the last `window` seconds moves that lot's close to `extend` seconds after it,
  // so nobody wins by bidding in the final second and everyone gets a fair chance to answer.
  softClose: { window: 120, extend: 120 },
  closesAt: null,                                 // default online close, e.g. '2027-07-14T12:00:00-04:00'
  lots: [
    // Works by Wilson Abreu (Dominican, b. 1972), as published in ART GABANGI · Top 100 Artist (pp. 25–27).
    { id: 'enfrentamiento', kind: 'painting', artist: 'Wilson Abreu', year: 2018, img: 'img/wilson-enfrentamiento.jpg', thumb: 'img/wilson-enfrentamiento-600.jpg', w: 1196, h: 427,
      title: { es: 'Enfrentamiento', en: 'Enfrentamiento (Confrontation)', fr: 'Enfrentamiento' },
      spec: { es: 'Técnica mixta sobre lienzo · 30 × 80 pulg. (76,2 × 203,2 cm)', en: 'Mixed media on canvas · 30 × 80 in (76.2 × 203.2 cm)', fr: 'Technique mixte sur toile · 30 × 80 po (76,2 × 203,2 cm)' },
      startBid: 1000, example: true },
    { id: 'el-poeta', kind: 'painting', artist: 'Wilson Abreu', img: 'img/wilson-el-poeta.jpg', thumb: 'img/wilson-el-poeta-600.jpg', w: 514, h: 698,
      title: { es: 'El Poeta', en: 'El Poeta (The Poet)', fr: 'El Poeta' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000, example: true },
    { id: 'resilience', kind: 'painting', work: 'resilience', title: { es: 'Resiliencia', en: 'Resilience', fr: 'Résilience' }, img: 'img/resilience.jpg', startBid: 1000, example: true },
    { id: 'echoes-of-memory', kind: 'painting', work: 'echoes-of-memory', title: { es: 'Ecos de la memoria', en: 'Echoes of Memory', fr: 'Échos de la mémoire' }, img: 'img/echoes-of-memory.jpg', startBid: 1000, example: true },
    { id: 'time-on-my-face', kind: 'painting', work: 'time-on-my-face', title: { es: 'El Tiempo en mi Rostro', en: 'Time on My Face', fr: 'Le temps sur mon visage' }, img: 'img/time-on-my-face.jpg', startBid: 1000, example: true },
    // By José Almonte (Dominican, b. 1969), from the same book; its title and size are not given there (the caption
    // under it repeats another work's), so it is listed by its artist until the museum confirms them.
    { id: 'almonte', kind: 'painting', artist: 'José Almonte', img: 'img/almonte-100.jpg', thumb: 'img/almonte-100-600.jpg', w: 1073, h: 1073,
      title: { es: 'Obra de José Almonte', en: 'Work by José Almonte', fr: 'Œuvre de José Almonte' },
      startBid: 1000, example: true },
    // Works by Juan Andújar (Dominican, b. 1986), from the same book (pp. 30–35).
    { id: 'sajoma', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-sajoma.jpg', thumb: 'img/andujar-sajoma-600.jpg', w: 1120, h: 1485,
      title: { es: 'Sajoma', en: 'Sajoma', fr: 'Sajoma' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000, example: true },
    { id: 'el-constructor-de-suenos', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-constructor.jpg', thumb: 'img/andujar-constructor-600.jpg', w: 494, h: 622,
      title: { es: 'El Constructor de Sueños', en: 'El Constructor de Sueños (The Dream Builder)', fr: 'El Constructor de Sueños' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000, example: true },
    { id: 'sinfonia-interior', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-sinfonia.jpg', thumb: 'img/andujar-sinfonia-600.jpg', w: 495, h: 628,
      title: { es: 'Sinfonía Interior', en: 'Sinfonía Interior (Inner Symphony)', fr: 'Sinfonía Interior' },
      spec: { es: 'Técnica mixta sobre lienzo · 50 × 40 pulg. (127 × 101,6 cm)', en: 'Mixed media on canvas · 50 × 40 in (127 × 101.6 cm)', fr: 'Technique mixte sur toile · 50 × 40 po (127 × 101,6 cm)' },
      startBid: 1000, example: true },
    { id: 'el-poeta-invisible', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-poeta-invisible.jpg', thumb: 'img/andujar-poeta-invisible-600.jpg', w: 1120, h: 1408,
      title: { es: 'El Poeta Invisible', en: 'El Poeta Invisible (The Invisible Poet)', fr: 'El Poeta Invisible' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000, example: true },
    { id: 'geografia-del-silencio', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-geografia.jpg', thumb: 'img/andujar-geografia-600.jpg', w: 523, h: 654,
      title: { es: 'Geografía del Silencio', en: 'Geografía del Silencio (Geography of Silence)', fr: 'Geografía del Silencio' },
      spec: { es: 'Técnica mixta sobre lienzo · 50 × 40 pulg. (127 × 101,6 cm)', en: 'Mixed media on canvas · 50 × 40 in (127 × 101.6 cm)', fr: 'Technique mixte sur toile · 50 × 40 po (127 × 101,6 cm)' },
      startBid: 1000, example: true },
    { id: 'arquitectura-de-la-imaginacion', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-arquitectura.jpg', thumb: 'img/andujar-arquitectura-600.jpg', w: 523, h: 657,
      title: { es: 'Arquitectura de la Imaginación', en: 'Arquitectura de la Imaginación (Architecture of Imagination)', fr: 'Arquitectura de la Imaginación' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000, example: true },
    { id: 'memoria-de-luz', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-memoria.jpg', thumb: 'img/andujar-memoria-600.jpg', w: 521, h: 652,
      title: { es: 'Memoria de Luz', en: 'Memoria de Luz (Memory of Light)', fr: 'Memoria de Luz' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000, example: true },
    { id: 'el-guardian-de-los-recuerdos', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-guardian.jpg', thumb: 'img/andujar-guardian-600.jpg', w: 523, h: 629,
      title: { es: 'El Guardián de los Recuerdos', en: 'El Guardián de los Recuerdos (The Keeper of Memories)', fr: 'El Guardián de los Recuerdos' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000, example: true },
    { id: 'omega-el-fuerte', kind: 'painting', artist: 'Juan Andújar', year: 2021, img: 'img/andujar-omega.jpg', thumb: 'img/andujar-omega-600.jpg', w: 1120, h: 1471,
      title: { es: 'Omega El Fuerte', en: 'Omega El Fuerte', fr: 'Omega El Fuerte' },
      spec: { es: 'Técnica mixta sobre lienzo · 40 × 30 pulg. (101,6 × 76,2 cm)', en: 'Mixed media on canvas · 40 × 30 in (101.6 × 76.2 cm)', fr: 'Technique mixte sur toile · 40 × 30 po (101,6 × 76,2 cm)' },
      startBid: 1000, example: true },
    { id: 'escaping-being', kind: 'painting', work: 'escaping-being', title: { es: 'El Ser que se Escapa', en: 'The Escaping Being', fr: 'L’Être qui s’échappe' }, img: 'img/escaping-being.jpg', startBid: 1000, example: true },
    { id: 'petrichor', kind: 'painting', work: 'petrichor', title: { es: 'Petricor', en: 'Petrichor', fr: 'Pétrichor' }, img: 'img/petrichor.jpg', startBid: 1000, example: true },
    { id: 'limerence', kind: 'painting', work: 'limerence', title: { es: 'Limerencia', en: 'Limerence', fr: 'Limerence' }, img: 'img/limerence.jpg', startBid: 1000, example: true },
    { id: 'sculpture-3', kind: 'sculpture', n: 3, img: 'img/sculpture/3.jpg', startBid: null, example: true },
    { id: 'sculpture-7', kind: 'sculpture', n: 7, img: 'img/sculpture/7.jpg', startBid: null, example: true },
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
