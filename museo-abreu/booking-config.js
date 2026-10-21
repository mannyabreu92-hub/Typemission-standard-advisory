// Real booking channels. Leave a value empty to keep the in-app simulation.
// Once the museum's Bókun account exists, paste each product's checkout link
// below; the app then sends visitors to Bókun to pay. The WhatsApp number
// (country code + number, digits only, e.g. '18095550100') adds
// "Book via WhatsApp" buttons with the request already written.
var BOOKING = {
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
  whatsapp: '',
};

function bookingLink(key) {
  return (BOOKING.links && BOOKING.links[key]) || '';
}

function whatsappLink(text) {
  return BOOKING.whatsapp ? `https://wa.me/${BOOKING.whatsapp}?text=${encodeURIComponent(text)}` : '';
}
