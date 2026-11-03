// Auction of works by Oscar Abreu: online bidding in the app until `closesAt`, then the auction
// ends live in the room at the ART GABANGI Auction & Awards Dinner (its live auction is on gabangi.com).
// Shared by the app and the bidding server (api/auction.js), which enforces these rules.
//
// A lot opens for online bids only when it has a starting bid and a closing time. The lots below
// are EXAMPLES (example: true) until the museum publishes the real list, starting bids and dates.
var AUCTION = {
  live: { event: 'art-gabangi', tier: 'dinner' }, // where the auction ends live
  increment: 50,                                  // USD; each bid must beat the current one by this much
  closesAt: null,                                 // default online close, e.g. '2027-07-14T12:00:00-04:00'
  lots: [
    { id: 'resilience', kind: 'painting', work: 'resilience', title: { es: 'Resiliencia', en: 'Resilience', fr: 'Résilience' }, img: 'img/resilience.jpg', startBid: null, example: true },
    { id: 'echoes-of-memory', kind: 'painting', work: 'echoes-of-memory', title: { es: 'Ecos de la memoria', en: 'Echoes of Memory', fr: 'Échos de la mémoire' }, img: 'img/echoes-of-memory.jpg', startBid: null, example: true },
    { id: 'time-on-my-face', kind: 'painting', work: 'time-on-my-face', title: { es: 'El Tiempo en mi Rostro', en: 'Time on My Face', fr: 'Le temps sur mon visage' }, img: 'img/time-on-my-face.jpg', startBid: null, example: true },
    { id: 'sculpture-3', kind: 'sculpture', n: 3, img: 'img/sculpture/3.jpg', startBid: null, example: true },
    { id: 'sculpture-7', kind: 'sculpture', n: 7, img: 'img/sculpture/7.jpg', startBid: null, example: true },
  ],
};

// `title` (paintings) is used by the link previews (api/share-item.js); the app shows the title from WORKS.
// A lot is open online when it has a starting bid and its closing time has not passed.
function lotCloses(lot) { return lot.closesAt || AUCTION.closesAt || null; }
function lotOpen(lot, now = Date.now()) { return lot.startBid != null && !!lotCloses(lot) && now < Date.parse(lotCloses(lot)); }
function lotMinBid(lot, state) { return state && state.count ? state.high + AUCTION.increment : lot.startBid; }

if (typeof module !== 'undefined') module.exports = { AUCTION, lotCloses, lotOpen, lotMinBid };
