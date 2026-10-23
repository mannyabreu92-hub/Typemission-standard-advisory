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
    pro: '',
    'painting-club': 'https://whop.com/museoabreu/painting-club',
    'art-club': 'https://whop.com/museoabreu/art-club-5d',
    'book-en': 'https://whop.com/museoabreu/ecce-homo-english-edition',
    'book-es': 'https://whop.com/museoabreu/ecce-homo-edicion-en-espanol',
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

// Lets the purchase server (api/) read the same product list.
if (typeof module !== 'undefined') module.exports = { BOOKING };
