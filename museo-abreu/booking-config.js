// Real booking channels. Leave a value empty to keep the in-app simulation.
// Once the museum's Bókun account exists, paste each product's checkout link
// below; the app then sends visitors to Bókun to pay. The WhatsApp number
// (country code + number, digits only, e.g. '18095550100') adds
// "Book via WhatsApp" buttons with the request already written.
var BOOKING = {
  // true = public site: nothing is simulated; requests go to WhatsApp (or Bókun links).
  live: true,
  provider: 'Bókun',
  links: {
    vip: '',
    couple: '',
    artist: '',
    combo: '',
    'painting-class': '',
    'sculpture-class': '',
    'gabangi-festival': '',
    'gabangi-vip': '',
    'gabangi-dinner': '',
    'gabangi-gala': '',
    'gabangi-regular': '',
  },
  // Whop checkout links (memberships, clubs, digital book, donations). Paste each product's
  // checkout link; an empty one keeps the WhatsApp request. See BOOKING-SETUP.md, part 2.
  whop: {
    pro: 'https://whop.com/museoabreu/museo-abreu-pro', // weekly membership, USD 5.99
    'painting-club': '', // on hold (family decision); was https://whop.com/museoabreu/painting-club
    'art-club': '', // on hold (family decision); was https://whop.com/museoabreu/art-club-5d
    'book-en': 'https://whop.com/museoabreu/ecce-homo-english-edition',
    'book-es': 'https://whop.com/museoabreu/ecce-homo-edicion-en-espanol',
    'book-fr': 'https://whop.com/museoabreu/ecce-homo-edition-francaise',
    'book-print-es': '', // printed Spanish edition (shop)
    'book-print-fr': '', // printed French edition (shop)
    'book-de': 'https://whop.com/museoabreu/ecce-homo-deutsche-ausgabe',
    'book-print-de': '', // printed German edition (shop)
    'book-ru': 'https://whop.com/museoabreu/ecce-homo', // Russian digital edition (Whop dropped the Cyrillic from the name)
    'book-print-ru': '', // printed Russian edition (shop)
    'book-it': 'https://whop.com/museoabreu/ecce-homo-edizione-italiana', // Italian digital edition
    'book-print-it': '', // printed Italian edition (shop)
    'book-pt': 'https://whop.com/museoabreu/ecce-homo-edicao-em-portugues', // Portuguese digital edition
    'book-print-pt': '', // printed Portuguese edition (shop)
    'book-ja': 'https://whop.com/museoabreu/ecce-homo-57', // Japanese digital edition (Whop dropped the Japanese from the name)
    'book-print-ja': '', // printed Japanese edition (shop)
    'fund-es': '', // Fundamentos del Psico-Expresionismo (Spanish, digital): Whop link to come
    'fund-en': '', // Foundations of Psycho-Expressionism (English, digital): Whop link to come
    'fund-fr': '', // Fondements du Psycho-Expressionnisme (French, digital): Whop link to come
    'fund-pt': '', // Fundamentos do Psicoexpressionismo (Portuguese, digital): Whop link to come
    'fund-it': '', // Fondamenti del Psico-Espressionismo (Italian, digital): Whop link to come
    'fund-de': '', // Grundlagen des Psycho-Expressionismus (German, digital): Whop link to come
    'fund-ja': '', // 心理表現主義の基礎 (Japanese, digital): Whop link to come
    'sponsor-25': '',
    'sponsor-50': '',
    'sponsor-100': '',
    // ART GABANGI tickets (fixed dates, no time slots) are sold on Whop too.
    'gabangi-festival': '',
    'gabangi-vip': '',
    'gabangi-dinner': '',
    'gabangi-gala': '',
    'gabangi-regular': '',
  },
  whatsapp: '18098409588', // Oscar Abreu / Museo Abreu WhatsApp Business
};

function bookingLink(key) {
  return (BOOKING.links && BOOKING.links[key]) || '';
}

function whopLink(key) {
  return (BOOKING.whop && BOOKING.whop[key]) || '';
}

// Opens an external checkout (new tab, or same tab if blocked).
function openCheckout(url) {
  if (typeof trackEvent === 'function') trackEvent('Checkout', { url });
  const w = window.open(url, '_blank');
  if (w) w.opener = null; else location.href = url;
  return true;
}

function whatsappLink(text) {
  return BOOKING.whatsapp ? `https://wa.me/${BOOKING.whatsapp}?text=${encodeURIComponent(text)}` : '';
}

// Opens WhatsApp with a prefilled message (new tab, or same tab if blocked).
function openWhatsApp(text) {
  const url = whatsappLink(text);
  if (!url) return false;
  // Never the message itself: it can hold the visitor's name, email or phone.
  if (typeof trackEvent === 'function') trackEvent('WhatsApp', {});
  const w = window.open(url, '_blank');
  if (w) w.opener = null; else location.href = url;
  return true;
}

// Visitor information for the Visit, Abreu Fine Art and Contact pages. A row appears only once it is filled in:
// nothing unconfirmed is shown to visitors. Texts in Spanish, English and French (other languages show English).
var VISIT_INFO = {
  address: '',                    // Museo Abreu's street address, e.g. 'Calle …, Bávaro, Punta Cana'; also places the map
  hours: { es: '', en: '', fr: '' },          // opening hours
  admission: { es: '', en: '', fr: '' },      // walk-in general admission and its price, or "by guided tour only"
  accessibility: { es: '', en: '', fr: '' },
  arrival: { es: '', en: '', fr: '' },        // getting here: parking, taxi, from the hotels
  fineArtHours: { es: '', en: '', fr: '' },   // Abreu Fine Art opening hours
  pressEmail: '',                              // a press-only email, if the museum has one
};
const visitInfo = k => { const v = VISIT_INFO[k]; return !v ? '' : typeof v === 'string' ? v : v[typeof lang !== 'undefined' && v[lang] ? lang : 'en'] || v.en || v.es || ''; };

// Lets the purchase server (api/) read the same product list.
if (typeof module !== 'undefined') module.exports = { BOOKING };
