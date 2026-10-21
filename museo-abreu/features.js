// Membership and community features: classes and clubs, events with member
// passes, the collection (new works, offers, auctions), private meetings with
// the artist, Pro membership and the daily reading. Loaded after data.js and
// before app.js; app.js merges EXTRA_ROUTES, EXTRA_ACTIONS and EXTRA_FORMS.
// Everything is simulated in the browser; prices marked illustrative or
// example are not approved figures.

Object.assign(I18N.es, {
  navClasses: 'Clases', navEvents: 'Eventos', navCollection: 'Colección', navPro: 'Pro', tabCollection: 'Colección',
  example: 'Ejemplo', examplesNote: 'Fechas y valores de ejemplo; no son datos reales.',
  proOnly: 'Exclusivo Pro', becomePro: 'Hazte Pro', youArePro: 'Eres miembro Pro',
  moreTitle: 'Vive más el Museo Abreu',
  moreClasses: 'Clases y clubes', moreClassesText: 'Pinta y esculpe con la técnica del Psico-Expresionismo.',
  moreEvents: 'Eventos', moreEventsText: 'Inauguraciones, presentaciones del libro y noches de coleccionistas.',
  moreCollection: 'Colección y subastas', moreCollectionText: 'Obras de Oscar Abreu: nuevas, disponibles, ofertas y subastas.',
  morePro: 'Membresía Pro', moreProText: 'Entrada gratis a eventos, 3 invitados en eventos VIP, subastas y más.',

  classesEyebrow: 'Aprende', classesTitle: 'Clases y clubes',
  classesLead: 'Talleres en el museo para aprender los procesos del Psico-Expresionismo: capas, raspados, rasgados y materia.',
  classesSection: 'Clases', clubsSection: 'Clubes', bookClass: 'Reservar clase',
  perMonth: 'al mes', joinClub: 'Unirme al club', joinedClub: 'Te has unido al club (simulación). El museo te escribirá con el calendario.',
  clubMember: 'Ya eres miembro', proPriority: 'Los miembros Pro tienen prioridad en clases y clubes.',
  sponsorTitle: 'Apoya una clase de pintura',
  sponsorText: 'Patrocina la clase de un estudiante que no puede pagarla. Cada aporte cubre materiales y la sesión con un instructor.',
  sponsorBtn: 'Aportar {amount} (simulación)', sponsorThanks: '¡Gracias! Tu aporte de {amount} patrocina una clase (simulación).',

  eventsEyebrow: 'Agenda', eventsTitle: 'Eventos del museo',
  eventsLead: 'Los miembros Pro entran gratis con su código QR y pueden traer hasta 3 invitados sin costo en cada evento VIP.',
  vipEvent: 'Evento VIP', freeForPro: 'Gratis para Pro', guests: 'Invitados', guestsHelp: 'Hasta 3 invitados sin costo en eventos VIP.',
  getPass: 'Obtener mi pase', buyTicket: 'Comprar entrada {price} (simulación)', passReady: 'Tu pase está listo. Muestra el código QR en la entrada.',
  passFor: 'Pase para {n} persona(s)', alreadyRegistered: 'Ya tienes pase para este evento.',

  collectionEyebrow: 'Obras de Oscar Abreu', collectionTitle: 'Colección',
  collectionLead: 'Busca exclusivamente obras de Oscar Abreu: nuevas, disponibles, en oferta y en subasta.',
  tabNew: 'Nuevas', tabAvailable: 'Disponibles', tabSale: 'Ofertas', tabAuctions: 'Subastas',
  priceOnRequest: 'Precio a consultar', memberOffer: 'Oferta para miembros Pro', requestInfo: 'Solicitar información',
  earlyAccess: 'Acceso anticipado Pro', lockedText: 'Hazte Pro para ver las obras nuevas, las ofertas y participar en subastas.',
  currentBid: 'Puja actual', startingBid: 'Puja inicial', endsIn: 'Termina en {n} días', bidBtn: 'Pujar {amount} (simulación)',
  youLead: 'Tu puja es la más alta', bidPlaced: 'Puja registrada (simulación): {amount}.',
  auctionNote: 'Valores de ejemplo para la demostración; no son precios reales de las obras.',

  privateTitle2: 'Reunión o cena privada con el artista',
  privateLead2: 'Para coleccionistas y compradores serios. El equipo del museo evalúa cada solicitud y confirma fecha y formato.',
  meetType: 'Tipo de encuentro', meetMeeting: 'Reunión privada en el museo', meetDinner: 'Cena privada con Oscar Abreu',
  interest: 'Interés', intBuy: 'Adquirir una obra', intCommission: 'Encargar una obra', intCollection: 'Colección o inversión',
  budget: 'Presupuesto aproximado', phone: 'Teléfono o WhatsApp', sendPrivate: 'Enviar solicitud',
  privateSent: 'Solicitud enviada (simulación). El museo te contactará para confirmar.',

  proEyebrow: 'Membresía', proTitle: 'Miembro Pro',
  proLead: 'La forma más cercana de vivir la obra de Oscar Abreu: eventos, coleccionismo, lectura diaria y experiencias exclusivas.',
  proPrice: 'Precio de la membresía: por definir', joinPro: 'Hacerme Pro (simulación)', leavePro: 'Cancelar membresía (demo)',
  joinedPro: '¡Bienvenido! Ya eres miembro Pro (simulación).', memberPass: 'Pase de miembro', memberPassHelp: 'Muéstralo en la entrada de cualquier evento del museo.',
  compare: 'Qué incluye', featureCol: 'Beneficio', freeCol: 'Usuario', proCol: 'Pro', onRequest2: 'Bajo solicitud', priority: 'Prioridad',
  b1: 'Explorar el museo, la obra y el manifiesto', b2: 'Lectura del día (fragmento del libro)', b3: 'Sesión completa del libro cada día',
  b4: 'Entrada gratis a eventos del museo con QR', b5: 'Hasta 3 invitados gratis en cada evento VIP', b6: 'Acceso anticipado a obras nuevas',
  b7: 'Ofertas exclusivas en obras', b8: 'Participar en subastas', b9: 'Prioridad en clases y clubes', b10: 'Reunión o cena privada con el artista',

  dailyTitle: 'Lectura del día', dailyFull: 'Sesión completa de hoy: {ch}', dailyProCta: 'Hazte Pro para la sesión completa diaria del libro.',
  dailyNote: 'Fragmento de Ecce Homo (edición en inglés).',

  accMembership: 'Mi membresía', accPasses: 'Mis pases de eventos', accBids: 'Mis pujas', accRequests: 'Mis solicitudes',
  noPasses: 'Aún no tienes pases.', notPro: 'No eres miembro Pro.',
  howManyCouples: '¿Cuántas parejas asistirán?',
  annualTitle: 'Eventos anuales', annualLead: 'Los celebramos cada año. Márcalos en tu calendario.',
  everyYear: 'Cada año', nameTbc: 'Nombre por confirmar', today: '¡Es hoy!', inNDays: 'faltan {n} días',
  priceTbc: 'Entrada por confirmar', notifyMe: 'Avísame', notifySet: 'Te avisaremos cuando abran las entradas (simulación).',
  nextAnnual: 'Próximo evento anual',
  officialSite: 'Sitio oficial',
  bookOn: 'Reservar en {provider}', buyOn: 'Comprar {price} en {provider}', bookWhatsApp: 'Reservar por WhatsApp',
  buyWhatsApp: 'Comprar {price} por WhatsApp', waTour: 'Hola, quiero reservar una visita al Museo Abreu.',
  waClass: 'Hola, quiero reservar: {name}.', waTicket: 'Hola, quiero comprar {name} para {event}.',
  passesLabel: 'Pases', singleLabel: 'Entradas individuales', fromPrice: 'Desde {price} (aprox.)',
  vipFreePro: 'VIP All-Access gratis para miembros Pro, con hasta 3 invitados', getProPass: 'Obtener mi {name} gratis',
  includedInPass: 'Incluido en tu pase VIP', includedInPro: 'Incluido con Pro (obtén tu VIP All-Access)',
  gabangiSource: 'Precios aproximados, basados en la edición 2026 (gabangi.com); pueden cambiar para la próxima edición.', daysLabel: 'días', nth: '{n}.º aniversario',
});

Object.assign(I18N.en, {
  navClasses: 'Classes', navEvents: 'Events', navCollection: 'Collection', navPro: 'Pro', tabCollection: 'Collection',
  example: 'Example', examplesNote: 'Example dates and values; not real data.',
  proOnly: 'Pro only', becomePro: 'Become Pro', youArePro: 'You are a Pro member',
  moreTitle: 'More of Museo Abreu',
  moreClasses: 'Classes and clubs', moreClassesText: 'Paint and sculpt with the Psycho-Expressionism technique.',
  moreEvents: 'Events', moreEventsText: 'Openings, book presentations and collectors’ nights.',
  moreCollection: 'Collection and auctions', moreCollectionText: 'Works by Oscar Abreu: new, available, offers and auctions.',
  morePro: 'Pro membership', moreProText: 'Free event entry, 3 guests at VIP events, auctions and more.',

  classesEyebrow: 'Learn', classesTitle: 'Classes and clubs',
  classesLead: 'Workshops at the museum to learn the processes of Psycho-Expressionism: layers, scraping, tearing and matter.',
  classesSection: 'Classes', clubsSection: 'Clubs', bookClass: 'Book a class',
  perMonth: 'per month', joinClub: 'Join the club', joinedClub: 'You joined the club (simulated). The museum will email you the schedule.',
  clubMember: 'Already a member', proPriority: 'Pro members get priority in classes and clubs.',
  sponsorTitle: 'Support a painting class',
  sponsorText: 'Sponsor a class for a student who cannot afford it. Each contribution covers materials and a session with an instructor.',
  sponsorBtn: 'Give {amount} (simulated)', sponsorThanks: 'Thank you! Your {amount} sponsors a class (simulated).',

  eventsEyebrow: 'What’s on', eventsTitle: 'Museum events',
  eventsLead: 'Pro members get in free with their QR code and can bring up to 3 guests at no cost to every VIP event.',
  vipEvent: 'VIP event', freeForPro: 'Free for Pro', guests: 'Guests', guestsHelp: 'Up to 3 guests at no cost at VIP events.',
  getPass: 'Get my pass', buyTicket: 'Buy ticket {price} (simulated)', passReady: 'Your pass is ready. Show the QR code at the entrance.',
  passFor: 'Pass for {n} person(s)', alreadyRegistered: 'You already have a pass for this event.',

  collectionEyebrow: 'Works by Oscar Abreu', collectionTitle: 'Collection',
  collectionLead: 'Search exclusively for works by Oscar Abreu: new, available, on offer and at auction.',
  tabNew: 'New', tabAvailable: 'Available', tabSale: 'Offers', tabAuctions: 'Auctions',
  priceOnRequest: 'Price on request', memberOffer: 'Offer for Pro members', requestInfo: 'Request information',
  earlyAccess: 'Pro early access', lockedText: 'Become Pro to see new works and offers, and to take part in auctions.',
  currentBid: 'Current bid', startingBid: 'Starting bid', endsIn: 'Ends in {n} days', bidBtn: 'Bid {amount} (simulated)',
  youLead: 'Your bid is the highest', bidPlaced: 'Bid recorded (simulated): {amount}.',
  auctionNote: 'Example values for the demo; not real prices for these works.',

  privateTitle2: 'Private meeting or dinner with the artist',
  privateLead2: 'For collectors and serious buyers. The museum team reviews each request and confirms the date and format.',
  meetType: 'Type of meeting', meetMeeting: 'Private meeting at the museum', meetDinner: 'Private dinner with Oscar Abreu',
  interest: 'Interest', intBuy: 'Acquire a work', intCommission: 'Commission a work', intCollection: 'Collection or investment',
  budget: 'Approximate budget', phone: 'Phone or WhatsApp', sendPrivate: 'Send request',
  privateSent: 'Request sent (simulated). The museum will contact you to confirm.',

  proEyebrow: 'Membership', proTitle: 'Pro member',
  proLead: 'The closest way to live Oscar Abreu’s work: events, collecting, daily reading and exclusive experiences.',
  proPrice: 'Membership price: to be defined', joinPro: 'Become Pro (simulated)', leavePro: 'Cancel membership (demo)',
  joinedPro: 'Welcome! You are now a Pro member (simulated).', memberPass: 'Member pass', memberPassHelp: 'Show it at the entrance of any museum event.',
  compare: 'What’s included', featureCol: 'Benefit', freeCol: 'User', proCol: 'Pro', onRequest2: 'On request', priority: 'Priority',
  b1: 'Explore the museum, the work and the manifesto', b2: 'Daily reading (excerpt from the book)', b3: 'Full book session every day',
  b4: 'Free entry to museum events with QR', b5: 'Up to 3 free guests at every VIP event', b6: 'Early access to new works',
  b7: 'Exclusive offers on works', b8: 'Take part in auctions', b9: 'Priority in classes and clubs', b10: 'Private meeting or dinner with the artist',

  dailyTitle: 'Today’s reading', dailyFull: 'Today’s full session: {ch}', dailyProCta: 'Become Pro for the full daily book session.',
  dailyNote: 'Excerpt from Ecce Homo (English edition).',

  accMembership: 'My membership', accPasses: 'My event passes', accBids: 'My bids', accRequests: 'My requests',
  noPasses: 'You have no passes yet.', notPro: 'You are not a Pro member.',
  howManyCouples: 'How many couples are coming?',
  annualTitle: 'Yearly events', annualLead: 'We celebrate them every year. Save the dates.',
  everyYear: 'Every year', nameTbc: 'Name to be confirmed', today: 'It\u2019s today!', inNDays: '{n} days to go',
  priceTbc: 'Ticket price to be confirmed', notifyMe: 'Notify me', notifySet: 'We will let you know when tickets open (simulated).',
  nextAnnual: 'Next yearly event',
  officialSite: 'Official site',
  bookOn: 'Book on {provider}', buyOn: 'Buy {price} on {provider}', bookWhatsApp: 'Book via WhatsApp',
  buyWhatsApp: 'Buy {price} via WhatsApp', waTour: 'Hello, I would like to book a visit to Museo Abreu.',
  waClass: 'Hello, I would like to book: {name}.', waTicket: 'Hello, I would like to buy {name} for {event}.',
  passesLabel: 'Passes', singleLabel: 'Single tickets', fromPrice: 'From {price} (approx.)',
  vipFreePro: 'VIP All-Access free for Pro members, with up to 3 guests', getProPass: 'Get my free {name}',
  includedInPass: 'Included in your VIP pass', includedInPro: 'Included with Pro (get your VIP All-Access)',
  gabangiSource: 'Approximate prices, based on the 2026 edition (gabangi.com); they may change for the next edition.', daysLabel: 'days', nth: '{n}th anniversary',
});

/* ---------- Data ---------- */

EXPERIENCES.splice(1, 0, {
  id: 'couple', cat: 'tour', price: 50, capacity: 10, seatsPer: 2, minutes: 75,
  perLabel: { es: 'por pareja', en: 'per couple' },
  name: { es: 'VIP Tour para parejas', en: 'VIP Tour for couples' },
  desc: { es: 'El VIP Tour para dos personas, a precio de pareja.', en: 'The VIP Tour for two people, at a couple’s price.' },
});
EXPERIENCES.push(
  {
    id: 'painting-class', cat: 'class', price: 45, capacity: 12, minutes: 120,
    name: { es: 'Clase de pintura Psico-Expresionista', en: 'Psycho-Expressionist painting class' },
    desc: { es: 'Capas, raspado y rasgado sobre lienzo. Materiales incluidos. 2 horas.', en: 'Layers, scraping and tearing on canvas. Materials included. 2 hours.' },
  },
  {
    id: 'sculpture-class', cat: 'class', price: 55, capacity: 8, minutes: 150,
    name: { es: 'Clase de escultura', en: 'Sculpture class' },
    desc: { es: 'Forma y materia en tres dimensiones, a partir del rostro. 2 h 30 min.', en: 'Form and matter in three dimensions, starting from the face. 2 h 30 min.' },
  },
);
SCHEDULE.couple = SCHEDULE.vip;
SCHEDULE['painting-class'] = [{ time: '10:00', langs: ['es', 'en'], days: [2, 4, 6] }];
SCHEDULE['sculpture-class'] = [{ time: '15:00', langs: ['es'], days: [3, 6] }];

// The book price requested by the family.
EDITIONS.forEach(e => { e.price = 60; });

const CLUBS = [
  { id: 'painting-club', price: 80, name: { es: 'Club de pintura', en: 'Painting club' },
    when: { es: 'Cada sábado · 2 horas', en: 'Every Saturday · 2 hours' },
    desc: { es: 'Pinta cada semana en el museo con un instructor y otros miembros.', en: 'Paint every week at the museum with an instructor and other members.' } },
  { id: 'art-club', price: 30, name: { es: 'Club de arte', en: 'Art club' },
    when: { es: 'Una vez al mes', en: 'Once a month' },
    desc: { es: 'Charlas, visitas a talleres y lectura de obras con artistas invitados.', en: 'Talks, studio visits and readings of works with guest artists.' } },
];

// Yearly museum events (month, day). Their next date is computed automatically.
const ANNUAL_EVENTS = [
  { id: 'anniversary', annual: { m: 11, d: 17 }, since: 2021, vip: true, price: null, time: '19:00',
    name: { es: 'Aniversario del Museo Abreu', en: 'Museo Abreu anniversary' },
    desc: { es: 'Celebramos la apertura del museo, inaugurado el 17 de noviembre de 2021 con la retrospectiva Memoria del Psico-Expresionismo.',
      en: 'We celebrate the opening of the museum, inaugurated on November 17, 2021 with the retrospective Memoria del Psico-Expresionismo.' } },
  { id: 'group-exhibition', annual: { m: 6, d: 13 }, vip: true, price: null, time: '19:00',
    name: { es: 'Exposición colectiva', en: 'Group exhibition' },
    desc: { es: 'Cada año el Museo Abreu reúne en una exposición colectiva a artistas dominicanos y obras de Oscar Abreu.',
      en: 'Every year Museo Abreu brings together Dominican artists and works by Oscar Abreu in a group exhibition.' } },
  { id: 'art-gabangi', annual: { m: 7, d: 6 }, vip: true, price: null, time: '18:00', lastDay: 8, tiers: [
    // Ticket options as published on gabangi.com for ART GABANGI 2026. "day" counts from July 6.
    { id: 'festival', time: '10:00', group: 'pass', price: 50, day: 1, name: { es: 'Festival Pass', en: 'Festival Pass' },
      tag: { es: '7 días · sin gala', en: '7 days · no gala' },
      items: { es: ['Válido del 7 al 14 de julio', 'Acceso diario 10:00 a. m. – 8:00 p. m.', 'El 14 de julio la feria cierra a las 5:00 p. m.', 'No incluye la Gala Premier'],
        en: ['Valid July 7–14', 'Daily access 10:00 AM – 8:00 PM', 'On July 14 the fair closes at 5:00 PM', 'Does not include the Gala Premier'] } },
    { id: 'vip', time: '18:00', group: 'pass', price: 140, day: 0, proFree: true, name: { es: 'VIP All-Access', en: 'VIP All-Access' },
      tag: { es: 'Gala + 7 días', en: 'Gala + 7 days' },
      items: { es: ['Incluye la Gala Premier del 6 de julio', 'Puertas 6:00 p. m. · evento principal 8:00 p. m.', 'Incluye el Festival Pass (7 al 14 de julio)'],
        en: ['Includes the Gala Premier on July 6', 'Doors 6:00 PM · main event 8:00 PM', 'Includes the Festival Pass (July 7–14)'] } },
    { id: 'dinner', time: '19:00', group: 'pass', price: 200, day: 8, name: { es: 'Cena de Subasta y Premios', en: 'Auction & Awards Dinner' },
      tag: { es: '14 de julio · cena incluida', en: 'July 14 · dinner included' },
      items: { es: ['Obras en exhibición del 6 al 14 de julio', 'La cena comienza a las 7:00 p. m.', 'Subasta en vivo durante la cena', 'Premio Artista del Año', 'Reconocimiento a líderes políticos, sociales y culturales'],
        en: ['Works on view July 6–14', 'Dinner starts 7:00 PM', 'Live auction during dinner', 'Artist of the Year Award', 'Recognition of political, social and cultural leaders'] } },
    { id: 'gala', time: '18:00', group: 'single', price: 100, day: 0, name: { es: 'Gala Premier', en: 'Gala Premier' },
      tag: { es: '6 de julio', en: 'July 6' },
      items: { es: ['Puertas 6:00 p. m.', 'Evento principal 8:00 p. m.', 'Celebración de apertura'], en: ['Doors open 6:00 PM', 'Main event starts 8:00 PM', 'Opening celebration'] } },
    { id: 'regular', time: '10:00', group: 'single', price: 10, day: 1, name: { es: 'Día regular', en: 'Regular Day' },
      tag: { es: '7 al 14 de julio', en: 'July 7–14' },
      items: { es: ['Acceso diario 10:00 a. m. – 8:00 p. m.', 'El 14 de julio cierra a las 5:00 p. m.'], en: ['Daily access 10:00 AM – 8:00 PM', 'July 14 closes 5:00 PM'] } },
  ],
    name: { es: 'ART GABANGI', en: 'ART GABANGI' },
    desc: { es: 'Encuentro anual de artistas, críticos, coleccionistas y público en el Museo Abreu: exposiciones, conferencias, talleres y mercado del arte.',
      en: 'Annual gathering of artists, critics, collectors and visitors at Museo Abreu: exhibitions, lectures, workshops and the art market.' } },
];

const EVENTS = [
  ...ANNUAL_EVENTS,
  { id: 'book-launch', vip: true, price: 40, inDays: 10, time: '19:00',
    name: { es: 'Presentación del libro Ecce Homo', en: 'Ecce Homo book presentation' },
    desc: { es: 'Oscar Abreu presenta su autobiografía y firma ejemplares.', en: 'Oscar Abreu presents his autobiography and signs copies.' } },
  { id: 'collectors-night', vip: true, price: 75, inDays: 17, time: '20:00',
    name: { es: 'Noche de coleccionistas', en: 'Collectors’ night' },
    desc: { es: 'Obras nuevas y disponibles, con el artista presente.', en: 'New and available works, with the artist present.' } },
  { id: 'opening', vip: false, price: 20, inDays: 24, time: '18:30',
    name: { es: 'Inauguración de exposición', en: 'Exhibition opening' },
    desc: { es: 'Apertura de la nueva sala del museo.', en: 'Opening of the museum’s new gallery.' } },
  { id: 'artist-talk', vip: true, price: 35, inDays: 31, time: '18:00',
    name: { es: 'Conversatorio con Oscar Abreu', en: 'A conversation with Oscar Abreu' },
    desc: { es: 'El artista habla sobre el Psico-Expresionismo y responde preguntas.', en: 'The artist talks about Psycho-Expressionism and answers questions.' } },
];

const COLLECTION = [
  { work: 'escaping-being', status: 'new' },
  { work: 'passion', status: 'available' },
  { work: 'limerence', status: 'available' },
  { work: 'petrichor', status: 'sale' },
];

// Example values for the demo only.
const AUCTIONS = [
  { work: 'resilience', start: 8000, step: 500, inDays: 6 },
  { work: 'echoes-of-memory', start: 12000, step: 1000, inDays: 12 },
];

const BUDGETS = ['US$10,000–25,000', 'US$25,000–50,000', 'US$50,000–100,000', 'US$100,000+'];

/* ---------- State ---------- */

const fx = {
  get: (k, d) => store.get(k, d),
  set: (k, v) => store.set(k, v),
};
const member = () => fx.get('member', null);
const isPro = () => !!member();
let collectionTab = 'new';

/* ---------- Pages ---------- */

function nextAnnualEvent() {
  return ANNUAL_EVENTS.slice().sort((a, b) => eventDate(a).localeCompare(eventDate(b))).at(0);
}

function homeExtras() {
  const ev = nextAnnualEvent();
  const d = eventDate(ev), n = daysUntil(d);
  const promo = `<section class="section"><a class="promo" href="#/eventos">
    <span class="promo-count"><strong>${n}</strong><small>${t('daysLabel')}</small></span>
    <span class="promo-text"><span class="eyebrow">${t('nextAnnual')}</span>
      <strong class="promo-title">${eventTitle(ev)}</strong>
      <span>${fmtDate(d)} · ${t('freeForPro')}</span>
      <span class="promo-all">${ANNUAL_EVENTS.map(a => `${String(a.annual.d)}/${String(a.annual.m)}`).join(' · ')} · ${t('everyYear')}</span></span>
  </a></section>`;
  const tiles = [
    ['#/clases', 'moreClasses', 'moreClassesText'], ['#/eventos', 'moreEvents', 'moreEventsText'],
    ['#/coleccion', 'moreCollection', 'moreCollectionText'], ['#/pro', 'morePro', 'moreProText'],
  ];
  return promo + `<section class="section"><h2>${t('moreTitle')}</h2><div class="grid four">${tiles.map(([h, a, b]) =>
    `<a class="card" href="${h}" style="text-decoration:none"><h3>${t(a)}</h3><p class="muted">${t(b)}</p></a>`).join('')}</div></section>`;
}

function pageClasses() {
  const classes = EXPERIENCES.filter(e => e.cat === 'class');
  const clubs = fx.get('clubs', []);
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('classesEyebrow')}</p><h1>${t('classesTitle')}</h1>
      <p class="lead" style="margin-top:.8rem">${t('classesLead')}</p>
      <p class="muted" style="margin-top:.5rem">${t('proPriority')}</p>
    </section>
    <section class="section"><h2>${t('classesSection')}</h2><div class="grid two">${classes.map(c => `
      <div class="card"><span class="price" style="float:right;font-weight:600">${usd(c.price)} <small class="muted">${t('perPerson')}</small></span>
        <h3>${L(c.name)}</h3><p class="muted">${L(c.desc)}</p>
        <div class="btn-row">${bookingLink(c.id)
          ? `<a class="btn primary" href="${bookingLink(c.id)}" target="_blank" rel="noopener">${t('bookClass')} ↗</a>`
          : `<button class="btn primary" data-action="bookClass" data-id="${c.id}">${t('bookClass')}</button>`}
          ${whatsappLink(t('waClass', { name: L(c.name) })) ? `<a class="btn wa" href="${whatsappLink(t('waClass', { name: L(c.name) }))}" target="_blank" rel="noopener">WhatsApp</a>` : ''}</div></div>`).join('')}</div>
      <p class="muted" style="margin-top:.8rem">* ${t('illustrative')}</p></section>
    <section class="section"><h2>${t('clubsSection')}</h2><div class="grid two">${CLUBS.map(c => `
      <div class="card"><span style="float:right;font-weight:600">${usd(c.price)} <small class="muted">${t('perMonth')}</small></span>
        <h3>${L(c.name)}</h3><p class="muted">${L(c.when)}</p><p>${L(c.desc)}</p>
        <div class="btn-row">${clubs.includes(c.id) ? `<span class="status ok">${t('clubMember')}</span>` : `<button class="btn" data-action="joinClub" data-id="${c.id}">${t('joinClub')}</button>`}</div></div>`).join('')}</div></section>
    <section class="section"><div class="card" style="max-width:640px">
      <h2>${t('sponsorTitle')}</h2><p>${t('sponsorText')}</p>
      <div class="btn-row">${[25, 50, 100].map(a => `<button class="btn ${a === 50 ? 'primary' : ''}" data-action="sponsor" data-amount="${a}">${t('sponsorBtn', { amount: usd(a) })}</button>`).join('')}</div>
    </div></section>
  </div>`;
}

function nextAnnual(a) {
  const today = todayPC();
  const y = Number(today.slice(0, 4));
  const iso = yr => `${yr}-${String(a.m).padStart(2, '0')}-${String(a.d).padStart(2, '0')}`;
  return iso(y) >= today ? iso(y) : iso(y + 1);
}
const eventDate = ev => (ev.annual ? nextAnnual(ev.annual) : addDays(todayPC(), ev.inDays));
const daysUntil = iso => Math.round((Date.parse(iso) - Date.parse(todayPC())) / 864e5);
const eventTitle = ev => ev.id === 'art-gabangi' ? `ART GABANGI ${eventDate(ev).slice(0, 4)}`
  : ev.id === 'group-exhibition' ? `${L(ev.name)} ${eventDate(ev).slice(0, 4)}`
  : ev.since ? `${L(ev.name)} · ${t('nth', { n: Number(eventDate(ev).slice(0, 4)) - ev.since })}` : L(ev.name);
const sortedEvents = () => EVENTS.slice().sort((a, b) => eventDate(a).localeCompare(eventDate(b)));

function pageEvents() {
  const passes = fx.get('passes', []);
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('eventsEyebrow')}</p><h1>${t('eventsTitle')}</h1>
      <p class="lead" style="margin-top:.8rem">${t('eventsLead')}</p>
      <p class="muted" style="margin-top:.5rem">${t('examplesNote')}</p>
    </section>
    <section class="section"><h2>${t('annualTitle')}</h2><p class="muted" style="margin-bottom:1rem">${t('annualLead')}</p>
      <div class="grid two">${sortedEvents().filter(ev => ev.annual).map(ev => eventCard(ev, passes)).join('')}</div></section>
    <section class="section"><h2>${t('moreEvents')}</h2><div class="grid two">${sortedEvents().filter(ev => !ev.annual).map(ev => eventCard(ev, passes)).join('')}</div></section>
  </div>`;
}

function tierBlock(ev, tier, passes) {
  const pass = passes.find(p => p.event === ev.id && p.tier === tier.id);
  const proHasVip = isPro() && passes.some(p => p.event === ev.id && p.tier === 'vip');
  let action;
  if (pass) action = passHTML(pass);
  else if (isPro() && tier.proFree) action = `<div class="event-form"><label class="field"><span>${t('guests')}</span>
      <select id="g-${ev.id}-${tier.id}">${[0, 1, 2, 3].map(n => `<option value="${n}">${n}</option>`).join('')}</select>
      <small class="muted">${t('guestsHelp')}</small></label>
      <button class="btn primary" data-action="getPass" data-id="${ev.id}" data-tier="${tier.id}">${t('getProPass', { name: L(tier.name) })}</button></div>`;
  else if (isPro() && tier.id !== 'dinner') action = `<p class="status ok">${proHasVip ? t('includedInPass') : t('includedInPro')}</p>`;
  else {
    const ext = bookingLink('gabangi-' + tier.id);
    const wa = whatsappLink(t('waTicket', { name: L(tier.name), event: eventTitle(ev) }));
    action = ext ? `<a class="btn ${tier.proFree ? 'primary' : ''}" href="${ext}" target="_blank" rel="noopener">${t('buyOn', { price: usd(tier.price), provider: BOOKING.provider })} ↗</a>`
      : wa ? `<a class="btn wa" href="${wa}" target="_blank" rel="noopener">${t('buyWhatsApp', { price: usd(tier.price) })}</a>`
      : `<button class="btn ${tier.proFree ? 'primary' : ''}" data-action="buyEvent" data-id="${ev.id}" data-tier="${tier.id}">${t('buyTicket', { price: usd(tier.price) })}</button>`;
  }
  return `<div class="tier ${tier.proFree ? 'tier-vip' : ''}">
    <div class="tier-head"><strong>${L(tier.name)}</strong><span class="tier-price">${usd(tier.price)}</span></div>
    <span class="chip">${L(tier.tag)}</span>${tier.proFree ? ` <span class="status ok">${t('freeForPro')}</span>` : ''}
    <ul>${tier.items[lang].map(i => `<li>${i}</li>`).join('')}</ul>
    ${action}
  </div>`;
}

function eventCard(ev, passes) {
  if (ev.tiers) {
    const d = eventDate(ev), n = daysUntil(d), end = addDays(d, ev.lastDay);
    const group = g => ev.tiers.filter(x => x.group === g).map(x => tierBlock(ev, x, passes)).join('');
    return `<article class="card event annual event-wide">
      <div class="chips" style="margin:0 0 .5rem"><span class="chip vip">${t('vipEvent')}</span><span class="chip annual-chip">${t('everyYear')}</span></div>
      <h3>${eventTitle(ev)}</h3>
      <p class="muted">${fmtDate(d, { day: 'numeric', month: 'long' })} – ${fmtDate(end, { day: 'numeric', month: 'long', year: 'numeric' })} · Punta Cana · <strong>${n === 0 ? t('today') : t('inNDays', { n })}</strong></p>
      <p style="margin-top:.4rem">${L(ev.desc)}</p>
      <p style="margin-top:.6rem"><strong>${t('fromPrice', { price: usd(Math.min(...ev.tiers.map(x => x.price))) })}</strong> · ${t('vipFreePro')}</p>
      <h4 class="tier-group">${t('passesLabel')}</h4><div class="tiers">${group('pass')}</div>
      <h4 class="tier-group">${t('singleLabel')}</h4><div class="tiers">${group('single')}</div>
      <div class="btn-row"><a class="btn dark" href="https://gabangi.com" target="_blank" rel="noopener">${t('officialSite')} · gabangi.com ↗</a></div>
      <p class="muted" style="margin-top:.8rem">${t('gabangiSource')}</p>
    </article>`;
  }
  {
      const pass = passes.find(p => p.event === ev.id);
      const d = eventDate(ev), n = daysUntil(d);
      return `<article class="card event ${ev.annual ? 'annual' : ''}">
        <div class="chips" style="margin:0 0 .5rem">${ev.vip ? `<span class="chip vip">${t('vipEvent')}</span>` : ''}${ev.annual ? `<span class="chip annual-chip">${t('everyYear')}</span>` : `<span class="chip">${t('example')}</span>`}${ev.pendingName ? `<span class="pending">${t('nameTbc')}</span>` : ''}</div>
        <h3>${eventTitle(ev)}</h3>
        <p class="muted">${fmtDate(d)} · ${ev.time} (UTC−4)${ev.annual ? ` · <strong>${n === 0 ? t('today') : t('inNDays', { n })}</strong>` : ''}</p>
        <p style="margin-top:.4rem">${L(ev.desc)}</p>
        <p style="margin-top:.6rem"><strong>${ev.price ? usd(ev.price) : t('priceTbc')}</strong> · <span class="status ok">${t('freeForPro')}</span></p>
        ${pass ? `<div style="margin-top:.8rem">${passHTML(pass)}</div>` : isPro() ? `
          <div class="event-form" style="margin-top:.8rem">
            ${ev.vip ? `<label class="field"><span>${t('guests')}</span>
              <select id="g-${ev.id}">${[0, 1, 2, 3].map(n => `<option value="${n}">${n}</option>`).join('')}</select>
              <small class="muted">${t('guestsHelp')}</small></label>` : ''}
            <button class="btn primary" data-action="getPass" data-id="${ev.id}">${t('getPass')}</button>
          </div>` : `
          <div class="btn-row"><a class="btn primary" href="#/pro">${t('becomePro')}</a>
          ${ev.price ? `<button class="btn" data-action="buyEvent" data-id="${ev.id}">${t('buyTicket', { price: usd(ev.price) })}</button>`
            : `<button class="btn" data-action="notifyEvent" data-id="${ev.id}">${t('notifyMe')}</button>`}</div>`}
      </article>`;
  }
}

function passHTML(p) {
  const ev = EVENTS.find(e => e.id === p.event);
  const tier = p.tier && ev.tiers ? ev.tiers.find(x => x.id === p.tier) : null;
  return `<div class="ticket" style="max-width:320px">
    <div class="ticket-head"><p class="eyebrow" style="color:#f59e6b;margin:0">${p.member ? 'Pro' : 'Museo Abreu'}</p><h3>${eventTitle(ev)}${tier ? ` · ${L(tier.name)}` : ''}</h3></div>
    <div class="ticket-body"><div class="qr" data-qr="${p.code}"></div><p class="code">${p.code}</p>
      <p class="muted" style="text-align:center">${fmtDate(p.date)} · ${(tier && tier.time) || ev.time} · ${t('passFor', { n: 1 + p.guests })}</p></div></div>`;
}

function workById(id) { return WORKS.find(w => w.id === id); }

function pageCollection() {
  const tabs = [['new', 'tabNew'], ['available', 'tabAvailable'], ['sale', 'tabSale'], ['auctions', 'tabAuctions']];
  const locked = !isPro() && collectionTab !== 'available';
  let body;
  if (collectionTab === 'auctions') {
    const bids = fx.get('bids', []);
    body = `<div class="grid two">${AUCTIONS.map(a => {
      const w = workById(a.work);
      const mine = bids.filter(b => b.work === a.work).map(b => b.amount);
      const current = Math.max(a.start, ...mine);
      const next = mine.length ? current + a.step : a.start;
      return `<article class="card auction"><div class="art-frame">${workImg(w)}</div>
        <h3 style="margin-top:.8rem">${L(w.title)}</h3>
        <div class="summary" style="margin-top:.4rem">
          <span class="muted">${mine.length ? t('currentBid') : t('startingBid')}</span><span><strong>${usd(current)}</strong></span>
          <span class="muted">${t('endsIn', { n: a.inDays })}</span><span>${mine.length ? `<span class="status ok">${t('youLead')}</span>` : ''}</span>
        </div>
        <div class="btn-row">${locked ? '' : `<button class="btn primary" data-action="bid" data-work="${a.work}" data-amount="${next}">${t('bidBtn', { amount: usd(next) })}</button>`}
        <button class="btn" data-action="requestWork" data-work="${a.work}">${t('requestInfo')}</button></div></article>`;
    }).join('')}</div><p class="muted" style="margin-top:.8rem">${t('auctionNote')}</p>`;
  } else {
    const items = COLLECTION.filter(c => c.status === collectionTab);
    body = `<div class="grid two">${items.map(c => {
      const w = workById(c.work);
      const tag = c.status === 'new' ? t('earlyAccess') : c.status === 'sale' ? t('memberOffer') : '';
      return `<article class="card"><div class="art-frame">${workImg(w)}</div>
        ${tag ? `<span class="chip vip" style="margin-top:.8rem;display:inline-block">${tag}</span>` : ''}
        <h3 style="margin-top:.6rem">${L(w.title)}</h3><p class="muted">Oscar Abreu · ${t('priceOnRequest')}</p>
        <div class="btn-row"><button class="btn primary" data-action="requestWork" data-work="${c.work}">${t('requestInfo')}</button></div></article>`;
    }).join('')}</div>`;
  }
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('collectionEyebrow')}</p><h1>${t('collectionTitle')}</h1>
      <p class="lead" style="margin-top:.8rem">${t('collectionLead')}</p>
    </section>
    <section class="section">
      <div class="tabs" role="tablist">${tabs.map(([id, k]) => `<button role="tab" class="tab" data-action="ctab" data-id="${id}" aria-selected="${collectionTab === id}">${t(k)}${!isPro() && id !== 'available' ? ' 🔒' : ''}</button>`).join('')}</div>
      <div class="${locked ? 'locked' : ''}" style="margin-top:1rem">${body}</div>
      ${locked ? `<div class="card lock-card"><strong>${t('proOnly')}</strong><p>${t('lockedText')}</p><div class="btn-row"><a class="btn primary" href="#/pro">${t('becomePro')}</a></div></div>` : ''}
    </section>
    <section class="section" id="privado">
      <h2>${t('privateTitle2')}</h2><p class="muted" style="margin-bottom:1rem">${t('privateLead2')}</p>
      <form class="card" data-form="privateMeet" style="max-width:640px">
        <div class="grid two">
          <div class="field"><label for="pm-name">${t('name')}</label><input id="pm-name" required autocomplete="name" value="${esc(profile.name)}"></div>
          <div class="field"><label for="pm-email">${t('email')}</label><input id="pm-email" type="email" required autocomplete="email" value="${esc(profile.email)}"></div>
          <div class="field"><label for="pm-phone">${t('phone')}</label><input id="pm-phone" type="tel" autocomplete="tel"></div>
          <div class="field"><label for="pm-type">${t('meetType')}</label><select id="pm-type"><option value="meeting">${t('meetMeeting')}</option><option value="dinner">${t('meetDinner')}</option></select></div>
          <div class="field"><label for="pm-int">${t('interest')}</label><select id="pm-int"><option>${t('intBuy')}</option><option>${t('intCommission')}</option><option>${t('intCollection')}</option></select></div>
          <div class="field"><label for="pm-budget">${t('budget')}</label><select id="pm-budget">${BUDGETS.map(b => `<option>${b}</option>`).join('')}</select></div>
        </div>
        <div class="field"><label for="pm-work">${t('collectionTitle')}</label><select id="pm-work"><option value="">—</option>${WORKS.map(w => `<option value="${w.id}">${L(w.title)}</option>`).join('')}</select></div>
        <div class="field"><label for="pm-date">${t('preferredDate')}</label><input id="pm-date" type="date" min="${addDays(todayPC(), 1)}"></div>
        <div class="field"><label for="pm-msg">${t('message')}</label><textarea id="pm-msg" rows="3"></textarea></div>
        <div class="btn-row"><button class="btn primary">${t('sendPrivate')}</button></div>
      </form>
    </section>
  </div>`;
}

function pagePro() {
  const m = member();
  const rows = [['b1', 1, 1], ['b2', 1, 1], ['b3', 0, 1], ['b4', 0, 1], ['b5', 0, 1], ['b6', 0, 1], ['b7', 0, 1], ['b8', 0, 1], ['b9', 0, 1], ['b10', 'req', 'prio']];
  const cell = v => v === 1 ? '<span class="yes" aria-label="✓">✓</span>' : v === 0 ? '<span class="muted" aria-label="—">—</span>' : v === 'req' ? t('onRequest2') : t('priority');
  return `<div class="wrap">
    <section class="section pro-hero">
      <p class="eyebrow">${t('proEyebrow')}</p><h1>${t('proTitle')}</h1>
      <p class="lead" style="margin-top:.8rem">${t('proLead')}</p>
      <p style="margin-top:.8rem"><strong>${t('proPrice')}</strong></p>
      ${m ? `<p class="status ok" style="margin-top:.8rem">${t('youArePro')} · ${m.id}</p>` : `<div class="btn-row"><button class="btn primary" data-action="joinPro">${t('joinPro')}</button></div>`}
    </section>
    ${m ? `<section class="section"><h2>${t('memberPass')}</h2><p class="muted" style="margin-bottom:1rem">${t('memberPassHelp')}</p>${memberCard(m)}
      <div class="btn-row"><a class="btn dark" href="#/eventos">${t('navEvents')}</a><a class="btn" href="#/coleccion">${t('navCollection')}</a><button class="btn small" data-action="leavePro">${t('leavePro')}</button></div></section>` : ''}
    <section class="section"><h2>${t('compare')}</h2>
      <div class="table-wrap"><table class="compare"><thead><tr><th>${t('featureCol')}</th><th>${t('freeCol')}</th><th>${t('proCol')}</th></tr></thead>
      <tbody>${rows.map(([k, a, b]) => `<tr><td>${t(k)}</td><td>${cell(a)}</td><td>${cell(b)}</td></tr>`).join('')}</tbody></table></div>
    </section>
  </div>`;
}

function memberCard(m) {
  return `<div class="ticket member-card" style="max-width:340px">
    <div class="ticket-head"><p class="eyebrow" style="color:#f59e6b;margin:0">Museo Abreu · Pro</p><h3>${esc(m.name)}</h3></div>
    <div class="ticket-body"><div class="qr" data-qr="${m.id}"></div><p class="code">${m.id}</p></div></div>`;
}

function dailyReading() {
  const paras = SAMPLE_EN.intro.concat(SAMPLE_EN.ch1);
  const today = todayPC();
  const day = Math.floor(Date.parse(today) / 864e5);
  const passage = paras.at(day % paras.length);
  const ch = 1 + (day % 70);
  return `<section class="section daily">
    <p class="eyebrow">${t('dailyTitle')} · ${fmtDate(today)}</p>
    <blockquote lang="en">${esc(passage)}</blockquote>
    <p class="muted" style="margin-top:.6rem">${t('dailyNote')}</p>
    <div class="btn-row">${isPro()
      ? `<a class="btn primary" href="#/leer/en/${ch}">${t('dailyFull', { ch: chTitle(CHAPTERS.at(ch), 'en') })}</a>`
      : `<a class="btn" href="#/pro">${t('dailyProCta')}</a>`}</div>
  </section>`;
}

function accountExtras() {
  const m = member();
  const passes = fx.get('passes', []);
  const bids = fx.get('bids', []);
  const reqs = fx.get('privateRequests', []);
  return `<section class="section grid two">
    <div><h2>${t('accMembership')}</h2>${m ? memberCard(m) : `<p class="empty">${t('notPro')} <a href="#/pro">${t('becomePro')}</a></p>`}</div>
    <div><h2>${t('accPasses')}</h2>${passes.length ? `<div class="grid">${passes.map(passHTML).join('')}</div>` : `<p class="empty">${t('noPasses')}</p>`}</div>
  </section>
  ${bids.length || reqs.length ? `<section class="section grid two">
    <div><h2>${t('accBids')}</h2><ul class="toc">${bids.map(b => `<li><span><span>${L(workById(b.work).title)}</span><span>${usd(b.amount)}</span></span></li>`).join('') || '<li class="muted">—</li>'}</ul></div>
    <div><h2>${t('accRequests')}</h2><ul class="toc">${reqs.map(r => `<li><span><span>${r.type === 'dinner' ? t('meetDinner') : t('meetMeeting')}</span><span class="muted">${r.date || ''}</span></span></li>`).join('') || '<li class="muted">—</li>'}</ul></div>
  </section>` : ''}`;
}

/* ---------- Actions ---------- */

function proCode() { return newCode().replace('MA-', 'PRO-'); }

const EXTRA_ROUTES = { clases: pageClasses, eventos: pageEvents, coleccion: pageCollection, pro: pagePro };

const EXTRA_ACTIONS = {
  bookClass: el => {
    bk = Object.assign(freshBooking(), { exp: el.dataset.id, step: 1 });
    location.hash = '#/visita';
  },
  joinClub: el => {
    const clubs = fx.get('clubs', []);
    if (!clubs.includes(el.dataset.id)) clubs.push(el.dataset.id);
    fx.set('clubs', clubs);
    toast(t('joinedClub'));
    route();
  },
  sponsor: el => {
    const gifts = fx.get('sponsorships', []);
    gifts.push({ amount: Number(el.dataset.amount), at: new Date().toISOString() });
    fx.set('sponsorships', gifts);
    toast(t('sponsorThanks', { amount: usd(Number(el.dataset.amount)) }));
  },
  getPass: el => {
    const ev = EVENTS.find(e => e.id === el.dataset.id);
    const tier = el.dataset.tier ? ev.tiers.find(x => x.id === el.dataset.tier) : null;
    const passes = fx.get('passes', []);
    if (passes.some(p => p.event === ev.id && (p.tier || null) === (tier ? tier.id : null))) return toast(t('alreadyRegistered'));
    const sel = document.getElementById('g-' + ev.id + (tier ? '-' + tier.id : ''));
    const guests = ev.vip && sel ? Math.min(3, Number(sel.value) || 0) : 0;
    passes.push({ code: newCode().replace('MA-', 'EV-'), event: ev.id, tier: tier ? tier.id : null, date: tier ? addDays(eventDate(ev), tier.day) : eventDate(ev), guests, member: true, paid: 0 });
    fx.set('passes', passes);
    toast(t('passReady'));
    route();
  },
  buyEvent: el => {
    const ev = EVENTS.find(e => e.id === el.dataset.id);
    const tier = el.dataset.tier ? ev.tiers.find(x => x.id === el.dataset.tier) : null;
    const passes = fx.get('passes', []);
    if (passes.some(p => p.event === ev.id && (p.tier || null) === (tier ? tier.id : null))) return toast(t('alreadyRegistered'));
    passes.push({ code: newCode().replace('MA-', 'EV-'), event: ev.id, tier: tier ? tier.id : null, date: tier ? addDays(eventDate(ev), tier.day) : eventDate(ev), guests: 0, member: isPro(), paid: tier ? tier.price : ev.price });
    fx.set('passes', passes);
    toast(t('passReady'));
    route();
  },
  ctab: el => { collectionTab = el.dataset.id; route(); },
  notifyEvent: el => {
    const list = fx.get('eventAlerts', []);
    if (!list.includes(el.dataset.id)) list.push(el.dataset.id);
    fx.set('eventAlerts', list);
    toast(t('notifySet'));
  },
  bid: el => {
    if (!isPro()) return;
    const bids = fx.get('bids', []);
    bids.push({ work: el.dataset.work, amount: Number(el.dataset.amount), at: new Date().toISOString() });
    fx.set('bids', bids);
    toast(t('bidPlaced', { amount: usd(Number(el.dataset.amount)) }));
    route();
  },
  requestWork: el => {
    const sel = document.getElementById('pm-work');
    if (sel) sel.value = el.dataset.work;
    document.getElementById('privado').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('pm-name').focus({ preventScroll: true }), 400);
  },
  joinPro: () => {
    const name = profile.name.trim() || 'Miembro Pro';
    fx.set('member', { id: proCode(), name, since: new Date().toISOString() });
    toast(t('joinedPro'));
    route();
  },
  leavePro: () => { fx.set('member', null); route(); },
};

const EXTRA_FORMS = {
  privateMeet: () => {
    const v = id => document.getElementById(id).value;
    profile.name = v('pm-name'); profile.email = v('pm-email'); save();
    const reqs = fx.get('privateRequests', []);
    reqs.push({ type: v('pm-type'), interest: v('pm-int'), budget: v('pm-budget'), work: v('pm-work'), date: v('pm-date'), phone: v('pm-phone'), message: v('pm-msg'), at: new Date().toISOString() });
    fx.set('privateRequests', reqs);
    toast(t('privateSent'));
    route();
  },
};
