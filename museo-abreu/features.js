// Membership and community features: classes and clubs, events with member
// passes, the Collectors' Circle (works by introduction, private viewings and
// evenings, no prices or offers), Pro membership and the daily reading. Loaded after data.js and
// before app.js; app.js merges EXTRA_ROUTES, EXTRA_ACTIONS and EXTRA_FORMS.
// Everything is simulated in the browser; prices marked illustrative or
// example are not approved figures.

Object.assign(I18N.es, {
  navClasses: 'Clases', navEvents: 'Eventos', navCollection: 'Colección', navPro: 'Pro', tabCollection: 'Colección',
  example: 'Ejemplo', examplesNote: 'Fechas y valores de ejemplo; no son datos reales.',
  becomePro: 'Hazte Pro', youArePro: 'Eres miembro Pro',
  moreTitle: 'Vive más el Museo Abreu',
  moreClasses: 'Clases y clubes', moreClassesText: 'Pinta y esculpe con la técnica del Psico-Expresionismo.',
  moreEvents: 'Eventos', moreEventsText: 'Inauguraciones, presentaciones del libro y noches de coleccionistas.',
  moreCollection: 'Círculo de Coleccionistas', moreCollectionText: 'Las obras de Oscar Abreu, por presentación privada.',
  morePro: 'Membresía Pro', moreProText: 'Entrada gratis a eventos, 3 invitados en eventos VIP, lectura diaria y más.',

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

  
  
  
  

  
  
  phone: 'Teléfono o WhatsApp', 

  proEyebrow: 'Membresía', proTitle: 'Miembro Pro',
  proLead: 'La forma más cercana de vivir la obra de Oscar Abreu: eventos, lectura diaria y experiencias exclusivas.',
  proPrice: 'Membresía: USD 25 al mes', joinPro: 'Hacerme Pro (simulación)', leavePro: 'Cancelar membresía (demo)',
  joinedPro: '¡Bienvenido! Ya eres miembro Pro (simulación).', memberPass: 'Pase de miembro', memberPassHelp: 'Muéstralo en la entrada de cualquier evento del museo.',
  compare: 'Qué incluye', featureCol: 'Beneficio', freeCol: 'Usuario', proCol: 'Pro', 
  b1: 'Explorar el museo, la obra y el manifiesto', b2: 'Lectura del día (fragmento del libro)', b3: 'Sesión completa del libro cada día',
  b4: 'Entrada gratis a eventos del museo con QR', b5: 'Hasta 3 invitados gratis en cada evento VIP', 
  b9: 'Prioridad en clases y clubes', 

  dailyTitle: 'Lectura del día', dailyFull: 'Sesión completa de hoy: {ch}', dailyProCta: 'Hazte Pro para la sesión completa diaria del libro.',
  dailyNote: 'Fragmento de Ecce Homo (edición en inglés).',

  accMembership: 'Mi membresía', accPasses: 'Mis pases de eventos', 
  noPasses: 'Aún no tienes pases.', notPro: 'No eres miembro Pro.',
  howManyCouples: '¿Cuántas parejas asistirán?',
  annualTitle: 'Eventos anuales', annualLead: 'Los celebramos cada año. Márcalos en tu calendario.',
  everyYear: 'Cada año', nameTbc: 'Nombre por confirmar', today: '¡Es hoy!', inNDays: 'faltan {n} días',
  priceTbc: 'Entrada por confirmar', notifyMe: 'Avísame', notifySet: 'Te avisaremos cuando abran las entradas (simulación).',
  nextAnnual: 'Próximo evento',
  quoteOfDay: 'Cita del día',
  englishEdition: 'edición en inglés',
  chapterN: 'capítulo {n}',
  buyTickets: 'Comprar entradas',
  eventDetails: 'Ver detalles',
  waTicketsFor: 'Hola, quiero comprar entradas para {event} ({date}).',
  officialSite: 'Sitio oficial',
  bookOn: 'Reservar en {provider}', buyOn: 'Comprar {price} en {provider}', bookWhatsApp: 'Reservar por WhatsApp',
  buyWhatsApp: 'Comprar {price} por WhatsApp', waTour: 'Hola, quiero reservar una visita al Museo Abreu.',
  waClass: 'Hola, quiero reservar: {name}.', waTicket: 'Hola, quiero comprar {name} para {event}.',
  includedBenefits: 'Beneficios incluidos', buyNow: 'Comprar',
  passesLabel: 'Pases', singleLabel: 'Entradas individuales', fromPrice: 'Desde {price} (aprox.)',
  vipFreePro: 'VIP All-Access gratis para miembros Pro, con hasta 3 invitados', getProPass: 'Obtener mi {name} gratis',
  includedInPass: 'Incluido en tu pase VIP', includedInPro: 'Incluido con Pro (obtén tu VIP All-Access)',
  gabangiSource: 'Precios aproximados, basados en la edición 2026 (gabangi.com); pueden cambiar para la próxima edición.', daysLabel: 'días', nth: '{n}.º aniversario',
});

Object.assign(I18N.en, {
  navClasses: 'Classes', navEvents: 'Events', navCollection: 'Collection', navPro: 'Pro', tabCollection: 'Collection',
  example: 'Example', examplesNote: 'Example dates and values; not real data.',
  becomePro: 'Become Pro', youArePro: 'You are a Pro member',
  moreTitle: 'More of Museo Abreu',
  moreClasses: 'Classes and clubs', moreClassesText: 'Paint and sculpt with the Psycho-Expressionism technique.',
  moreEvents: 'Events', moreEventsText: 'Openings, book presentations and collectors’ nights.',
  moreCollection: 'Collectors’ Circle', moreCollectionText: 'The works of Oscar Abreu, by private introduction.',
  morePro: 'Pro membership', moreProText: 'Free event entry, 3 guests at VIP events, daily reading and more.',

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

  
  
  
  

  
  
  phone: 'Phone or WhatsApp', 

  proEyebrow: 'Membership', proTitle: 'Pro member',
  proLead: 'The closest way to live Oscar Abreu’s work: events, daily reading and exclusive experiences.',
  proPrice: 'Membership: USD 25 per month', joinPro: 'Become Pro (simulated)', leavePro: 'Cancel membership (demo)',
  joinedPro: 'Welcome! You are now a Pro member (simulated).', memberPass: 'Member pass', memberPassHelp: 'Show it at the entrance of any museum event.',
  compare: 'What’s included', featureCol: 'Benefit', freeCol: 'User', proCol: 'Pro', 
  b1: 'Explore the museum, the work and the manifesto', b2: 'Daily reading (excerpt from the book)', b3: 'Full book session every day',
  b4: 'Free entry to museum events with QR', b5: 'Up to 3 free guests at every VIP event', 
  b9: 'Priority in classes and clubs', 

  dailyTitle: 'Today’s reading', dailyFull: 'Today’s full session: {ch}', dailyProCta: 'Become Pro for the full daily book session.',
  dailyNote: 'Excerpt from Ecce Homo (English edition).',

  accMembership: 'My membership', accPasses: 'My event passes', 
  noPasses: 'You have no passes yet.', notPro: 'You are not a Pro member.',
  howManyCouples: 'How many couples are coming?',
  annualTitle: 'Yearly events', annualLead: 'We celebrate them every year. Save the dates.',
  everyYear: 'Every year', nameTbc: 'Name to be confirmed', today: 'It\u2019s today!', inNDays: '{n} days to go',
  priceTbc: 'Ticket price to be confirmed', notifyMe: 'Notify me', notifySet: 'We will let you know when tickets open (simulated).',
  nextAnnual: 'Next event',
  quoteOfDay: 'Quote of the day',
  englishEdition: 'English edition',
  chapterN: 'Chapter {n}',
  buyTickets: 'Buy tickets',
  eventDetails: 'See details',
  waTicketsFor: 'Hello, I would like to buy tickets for {event} ({date}).',
  officialSite: 'Official site',
  bookOn: 'Book on {provider}', buyOn: 'Buy {price} on {provider}', bookWhatsApp: 'Book via WhatsApp',
  buyWhatsApp: 'Buy {price} via WhatsApp', waTour: 'Hello, I would like to book a visit to Museo Abreu.',
  waClass: 'Hello, I would like to book: {name}.', waTicket: 'Hello, I would like to buy {name} for {event}.',
  includedBenefits: 'Included benefits', buyNow: 'Buy now',
  passesLabel: 'Passes', singleLabel: 'Single tickets', fromPrice: 'From {price} (approx.)',
  vipFreePro: 'VIP All-Access free for Pro members, with up to 3 guests', getProPass: 'Get my free {name}',
  includedInPass: 'Included in your VIP pass', includedInPro: 'Included with Pro (get your VIP All-Access)',
  gabangiSource: 'Approximate prices, based on the 2026 edition (gabangi.com); they may change for the next edition.', daysLabel: 'days', nth: '{n}th anniversary',
});

Object.assign(I18N.fr, {
  navClasses: 'Cours',
  navEvents: 'Événements',
  navCollection: 'Collection',
  navPro: 'Pro',
  tabCollection: 'Collection',
  example: 'Exemple',
  examplesNote: 'Dates et montants d’exemple ; ce ne sont pas des données réelles.',
  becomePro: 'Devenir Pro',
  youArePro: 'Vous êtes membre Pro',
  moreTitle: 'Profitez davantage du Museo Abreu',
  moreClasses: 'Cours et clubs',
  moreClassesText: 'Peignez et sculptez avec la technique du Psycho-Expressionnisme.',
  moreEvents: 'Événements',
  moreEventsText: 'Vernissages, présentations du livre et soirées de collectionneurs.',
  moreCollection: 'Cercle des collectionneurs',
  moreCollectionText: 'Les œuvres d’Oscar Abreu, sur présentation privée.',
  morePro: 'Adhésion Pro',
  moreProText: 'Entrée gratuite aux événements, 3 invités aux événements VIP, lecture quotidienne et plus encore.',
  classesEyebrow: 'Apprendre',
  classesTitle: 'Cours et clubs',
  classesLead: 'Ateliers au musée pour apprendre les procédés du Psycho-Expressionnisme : couches, grattage, déchirure et matière.',
  classesSection: 'Cours',
  clubsSection: 'Clubs',
  bookClass: 'Réserver un cours',
  perMonth: 'par mois',
  joinClub: 'Rejoindre le club',
  joinedClub: 'Vous avez rejoint le club (simulation). Le musée vous enverra le calendrier par e-mail.',
  clubMember: 'Déjà membre',
  proPriority: 'Les membres Pro sont prioritaires pour les cours et les clubs.',
  sponsorTitle: 'Offrir un cours de peinture',
  sponsorText: 'Parrainez un cours pour un élève qui n’a pas les moyens de le payer. Chaque contribution couvre le matériel et une séance avec un instructeur.',
  sponsorBtn: 'Donner {amount} (simulation)',
  sponsorThanks: 'Merci ! Vos {amount} financent un cours (simulation).',
  eventsEyebrow: 'Au programme',
  eventsTitle: 'Événements du musée',
  eventsLead: 'Les membres Pro entrent gratuitement avec leur code QR et peuvent venir avec jusqu’à 3 invités sans frais à chaque événement VIP.',
  vipEvent: 'Événement VIP',
  freeForPro: 'Gratuit pour les membres Pro',
  guests: 'Personnes',
  guestsHelp: 'Jusqu’à 3 invités sans frais aux événements VIP.',
  getPass: 'Obtenir mon pass',
  buyTicket: 'Acheter un billet {price} (simulation)',
  passReady: 'Votre pass est prêt. Présentez le code QR à l’entrée.',
  passFor: 'Pass pour {n} personne(s)',
  alreadyRegistered: 'Vous avez déjà un pass pour cet événement.',
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  phone: 'Téléphone ou WhatsApp',
  
  proEyebrow: 'Adhésion',
  proTitle: 'Membre Pro',
  proLead: 'La façon la plus proche de vivre l’œuvre d’Oscar Abreu : événements, lecture quotidienne et expériences exclusives.',
  proPrice: 'Adhésion : 25 USD par mois',
  joinPro: 'Devenir Pro (simulation)',
  leavePro: 'Annuler l’adhésion (démo)',
  joinedPro: 'Bienvenue ! Vous êtes maintenant membre Pro (simulation).',
  memberPass: 'Pass membre',
  memberPassHelp: 'Présentez-le à l’entrée de tout événement du musée.',
  compare: 'Ce qui est inclus',
  featureCol: 'Avantage',
  freeCol: 'Utilisateur',
  proCol: 'Pro',
  
  b1: 'Explorer le musée, l’œuvre et le manifeste',
  b2: 'Lecture du jour (extrait du livre)',
  b3: 'Séance complète du livre chaque jour',
  b4: 'Entrée gratuite aux événements du musée avec code QR',
  b5: 'Jusqu’à 3 invités gratuits à chaque événement VIP',
  
  b9: 'Priorité pour les cours et les clubs',
  dailyTitle: 'Lecture du jour',
  dailyFull: 'Séance complète du jour : {ch}',
  dailyProCta: 'Devenez Pro pour la séance quotidienne complète du livre.',
  dailyNote: 'Extrait d’Ecce Homo (édition anglaise).',
  accMembership: 'Mon adhésion',
  accPasses: 'Mes pass d’événements',
  
  noPasses: 'Vous n’avez pas encore de pass.',
  notPro: 'Vous n’êtes pas membre Pro.',
  howManyCouples: 'Combien de couples viennent ?',
  annualTitle: 'Événements annuels',
  annualLead: 'Nous les célébrons chaque année. Notez les dates.',
  everyYear: 'Chaque année',
  nameTbc: 'Nom à confirmer',
  today: 'C’est aujourd’hui !',
  inNDays: 'Dans {n} jours',
  priceTbc: 'Prix du billet à confirmer',
  notifyMe: 'Me prévenir',
  notifySet: 'Nous vous préviendrons à l’ouverture de la billetterie (simulation).',
  nextAnnual: 'Prochain événement',
  quoteOfDay: 'Citation du jour',
  englishEdition: 'édition anglaise',
  chapterN: 'chapitre {n}',
  buyTickets: 'Acheter des billets',
  eventDetails: 'Voir les détails',
  waTicketsFor: 'Bonjour, je souhaite acheter des billets pour {event} ({date}).',
  officialSite: 'Site officiel',
  bookOn: 'Réserver sur {provider}',
  buyOn: 'Acheter {price} sur {provider}',
  bookWhatsApp: 'Réserver par WhatsApp',
  buyWhatsApp: 'Acheter {price} par WhatsApp',
  waTour: 'Bonjour, je souhaite réserver une visite au Museo Abreu.',
  waClass: 'Bonjour, je souhaite réserver : {name}.',
  waTicket: 'Bonjour, je souhaite acheter {name} pour {event}.',
  includedBenefits: 'Avantages inclus', buyNow: 'Acheter',
  passesLabel: 'Pass',
  singleLabel: 'Billets à l’unité',
  fromPrice: 'À partir de {price} (env.)',
  vipFreePro: 'VIP All-Access gratuit pour les membres Pro, avec jusqu’à 3 invités',
  getProPass: 'Obtenir mon {name} gratuit',
  includedInPass: 'Inclus dans votre pass VIP',
  includedInPro: 'Inclus avec Pro (obtenez votre VIP All-Access)',
  gabangiSource: 'Prix approximatifs, basés sur l’édition 2026 (gabangi.com) ; ils peuvent changer pour la prochaine édition.',
  daysLabel: 'jours',
  nth: '{n}e anniversaire',
});

/* ---------- Collectors' Circle wording ---------- */

Object.assign(I18N.es, {
  ciEyebrow: 'Círculo de Coleccionistas', ciTitle: 'La obra de Oscar Abreu, por presentación',
  ciLead: 'Cada obra es única y encuentra a su coleccionista a través de una conversación, no de un carrito de compra. El Círculo de Coleccionistas acompaña a cada persona en privado, desde el primer encuentro con una obra hasta que llega a su colección.',
  ciHowTitle: 'Cómo funciona',
  ciStep1T: 'Solicite una presentación', ciStep1D: 'Cuéntenos sobre usted y lo que le atrae de la obra. Su solicitud es confidencial.',
  ciStep2T: 'Una conversación personal', ciStep2D: 'Un miembro del equipo del museo le contacta para conocerle y entender su colección.',
  ciStep3T: 'Obras presentadas en privado', ciStep3D: 'Le presentamos obras en una visita privada al museo o por video, con todos sus detalles.',
  ciWorksTitle: 'Obras disponibles por presentación', ciByIntro: 'Por presentación', ciNewWork: 'Obra nueva · Círculo',
  ciNewForMembers: 'Las obras nuevas se presentan primero a los miembros del Círculo.',
  ciRequestCta: 'Solicitar una presentación', ciFormTitle: 'Solicitud de presentación', ciFormLead: 'Cada solicitud se revisa personalmente.',
  ciCity: 'Ciudad y país', ciSource: '¿Cómo conoció la obra de Oscar Abreu?',
  ciSrcVisit: 'Visita al museo', ciSrcCollector: 'Recomendación de un coleccionista', ciSrcShow: 'Una exposición o feria', ciSrcPress: 'Prensa o redes sociales', ciSrcOther: 'Otro',
  ciIntent: 'Su interés', ciIntFirst: 'Mi primera obra de Oscar Abreu', ciIntGrow: 'Ampliar mi colección', ciIntCommission: 'Un encargo', ciIntInstitution: 'Una institución o empresa',
  ciWorkOpt: 'Una obra que le haya llamado la atención (opcional)', ciReferral: 'Le refiere (opcional)',
  ciConfidential: 'Sus datos solo los ve el equipo del museo.', ciSubmit: 'Enviar solicitud',
  ciPendingTitle: 'Su solicitud está en manos del equipo', ciPendingText: 'Gracias, {name}. Un miembro del equipo del Museo Abreu le contactará personalmente.',
  ciSimApprove: 'Simular aprobación (demo)', ciResetDemo: 'Restablecer (demo)',
  ciWelcome: 'Le damos la bienvenida al Círculo, {name}', ciMemberSince: 'Miembro desde el {date}',
  ciAdvisorTitle: 'Su contacto en el museo', ciAdvisorText: 'Un miembro del equipo le acompaña en cada paso. Escríbale cuando lo desee.', ciWriteAdvisor: 'Escribir por WhatsApp',
  ciInterest: 'Me interesa esta obra', ciInterested: 'Interés enviado', ciInterestSent: 'Su contacto en el museo le escribirá sobre esta obra (simulación).',
  ciViewingTitle: 'Visita privada o cena con el artista', ciViewingLead: 'Reservado a los miembros del Círculo. El equipo confirma la fecha y el formato.',
  ciViewingType: 'Formato', ciViewing: 'Visita privada al museo', ciVideo: 'Presentación por video', ciDinner: 'Cena privada con Oscar Abreu',
  ciSendRequest: 'Enviar solicitud', ciViewingSent: 'Solicitud enviada (simulación). El equipo le confirmará la fecha.',
  ciEveningsTitle: 'Veladas privadas', ciEveningsLead: 'Algunas obras se presentan en veladas de subasta privadas, solo por invitación.',
  ciEveningsLocked: 'Las veladas privadas se comparten con los miembros del Círculo.', ciByInvitation: 'Por invitación',
  ciRequestInvite: 'Solicitar invitación', ciInviteAsked: 'Invitación solicitada', ciInviteSent: 'Solicitud enviada (simulación). El equipo le confirmará la invitación.',
  ciAccNone: 'Las obras de Oscar Abreu se adquieren por presentación.', ciAccPending: 'Su solicitud de presentación está en revisión.', ciAccMember: 'Usted es miembro del Círculo.', ciAccLink: 'Ver el Círculo',
  waCircleRequest: 'Hola, solicito una presentación al Círculo de Coleccionistas del Museo Abreu. Nombre: {name}. Email: {email}. Teléfono: {phone}. Ciudad: {city}. Conocí la obra por: {source}. Interés: {intent}. Obra: {work}. Me refiere: {referral}. {msg}',
  waCircleInterest: 'Hola, soy {name}, del Círculo de Coleccionistas. Me interesa la obra "{title}" de Oscar Abreu.',
  waCircleViewing: 'Hola, soy {name}, del Círculo de Coleccionistas. Solicito: {type}. Obra: {work}. Fecha preferida: {date}. {msg}',
  waCircleInvite: 'Hola, soy {name}, del Círculo de Coleccionistas. Solicito una invitación a la velada privada de "{title}".',
  waCircleAdvisor: 'Hola, soy {name}, del Círculo de Coleccionistas del Museo Abreu.',
});
Object.assign(I18N.en, {
  ciEyebrow: 'Collectors’ Circle', ciTitle: 'The work of Oscar Abreu, by introduction',
  ciLead: 'Each work is one of a kind and finds its collector through a conversation, not a shopping cart. The Collectors’ Circle accompanies each person privately, from the first encounter with a work to its arrival in their collection.',
  ciHowTitle: 'How it works',
  ciStep1T: 'Request an introduction', ciStep1D: 'Tell us about yourself and what draws you to the work. Your request is confidential.',
  ciStep2T: 'A personal conversation', ciStep2D: 'A member of the museum team contacts you to get to know you and your collection.',
  ciStep3T: 'Works presented privately', ciStep3D: 'We present works to you at a private viewing at the museum or by video, with all their details.',
  ciWorksTitle: 'Works available by introduction', ciByIntro: 'By introduction', ciNewWork: 'New work · Circle',
  ciNewForMembers: 'New works are presented first to members of the Circle.',
  ciRequestCta: 'Request an introduction', ciFormTitle: 'Introduction request', ciFormLead: 'Each request is reviewed personally.',
  ciCity: 'City and country', ciSource: 'How did you come to know Oscar Abreu’s work?',
  ciSrcVisit: 'A visit to the museum', ciSrcCollector: 'A collector’s recommendation', ciSrcShow: 'An exhibition or fair', ciSrcPress: 'Press or social media', ciSrcOther: 'Other',
  ciIntent: 'Your interest', ciIntFirst: 'My first work by Oscar Abreu', ciIntGrow: 'Adding to my collection', ciIntCommission: 'A commission', ciIntInstitution: 'An institution or company',
  ciWorkOpt: 'A work that caught your eye (optional)', ciReferral: 'Referred by (optional)',
  ciConfidential: 'Only the museum team sees your details.', ciSubmit: 'Send request',
  ciPendingTitle: 'Your request is with our team', ciPendingText: 'Thank you, {name}. A member of the Museo Abreu team will contact you personally.',
  ciSimApprove: 'Simulate approval (demo)', ciResetDemo: 'Reset (demo)',
  ciWelcome: 'Welcome to the Circle, {name}', ciMemberSince: 'Member since {date}',
  ciAdvisorTitle: 'Your contact at the museum', ciAdvisorText: 'A member of the team accompanies you at every step. Write whenever you wish.', ciWriteAdvisor: 'Write on WhatsApp',
  ciInterest: 'I’m interested in this work', ciInterested: 'Interest sent', ciInterestSent: 'Your contact at the museum will write to you about this work (simulated).',
  ciViewingTitle: 'Private viewing or dinner with the artist', ciViewingLead: 'Reserved for Circle members. The team confirms the date and format.',
  ciViewingType: 'Format', ciViewing: 'Private viewing at the museum', ciVideo: 'Presentation by video', ciDinner: 'Private dinner with Oscar Abreu',
  ciSendRequest: 'Send request', ciViewingSent: 'Request sent (simulated). The team will confirm the date.',
  ciEveningsTitle: 'Private evenings', ciEveningsLead: 'Some works are presented at private auction evenings, by invitation only.',
  ciEveningsLocked: 'Private evenings are shared with members of the Circle.', ciByInvitation: 'By invitation',
  ciRequestInvite: 'Request an invitation', ciInviteAsked: 'Invitation requested', ciInviteSent: 'Request sent (simulated). The team will confirm your invitation.',
  ciAccNone: 'Works by Oscar Abreu are acquired by introduction.', ciAccPending: 'Your introduction request is under review.', ciAccMember: 'You are a member of the Circle.', ciAccLink: 'See the Circle',
  waCircleRequest: 'Hello, I am requesting an introduction to the Museo Abreu Collectors’ Circle. Name: {name}. Email: {email}. Phone: {phone}. City: {city}. I came to know the work through: {source}. Interest: {intent}. Work: {work}. Referred by: {referral}. {msg}',
  waCircleInterest: 'Hello, this is {name}, from the Collectors’ Circle. I am interested in the work "{title}" by Oscar Abreu.',
  waCircleViewing: 'Hello, this is {name}, from the Collectors’ Circle. I would like: {type}. Work: {work}. Preferred date: {date}. {msg}',
  waCircleInvite: 'Hello, this is {name}, from the Collectors’ Circle. I would like an invitation to the private evening for "{title}".',
  waCircleAdvisor: 'Hello, this is {name}, from the Museo Abreu Collectors’ Circle.',
});
Object.assign(I18N.fr, {
  ciEyebrow: 'Cercle des collectionneurs', ciTitle: 'L’œuvre d’Oscar Abreu, sur présentation',
  ciLead: 'Chaque œuvre est unique et trouve son collectionneur au fil d’une conversation, pas d’un panier d’achat. Le Cercle des collectionneurs accompagne chacun en privé, de la première rencontre avec une œuvre jusqu’à son arrivée dans sa collection.',
  ciHowTitle: 'Comment cela se passe',
  ciStep1T: 'Demandez une présentation', ciStep1D: 'Parlez-nous de vous et de ce qui vous attire dans l’œuvre. Votre demande est confidentielle.',
  ciStep2T: 'Une conversation personnelle', ciStep2D: 'Un membre de l’équipe du musée vous contacte pour faire votre connaissance et comprendre votre collection.',
  ciStep3T: 'Des œuvres présentées en privé', ciStep3D: 'Nous vous présentons des œuvres lors d’une visite privée au musée ou par vidéo, avec tous leurs détails.',
  ciWorksTitle: 'Œuvres disponibles sur présentation', ciByIntro: 'Sur présentation', ciNewWork: 'Nouvelle œuvre · Cercle',
  ciNewForMembers: 'Les nouvelles œuvres sont présentées en priorité aux membres du Cercle.',
  ciRequestCta: 'Demander une présentation', ciFormTitle: 'Demande de présentation', ciFormLead: 'Chaque demande est examinée personnellement.',
  ciCity: 'Ville et pays', ciSource: 'Comment avez-vous découvert l’œuvre d’Oscar Abreu ?',
  ciSrcVisit: 'Une visite au musée', ciSrcCollector: 'La recommandation d’un collectionneur', ciSrcShow: 'Une exposition ou une foire', ciSrcPress: 'La presse ou les réseaux sociaux', ciSrcOther: 'Autre',
  ciIntent: 'Votre intérêt', ciIntFirst: 'Ma première œuvre d’Oscar Abreu', ciIntGrow: 'Enrichir ma collection', ciIntCommission: 'Une commande', ciIntInstitution: 'Une institution ou une entreprise',
  ciWorkOpt: 'Une œuvre qui a retenu votre attention (facultatif)', ciReferral: 'Recommandé par (facultatif)',
  ciConfidential: 'Seule l’équipe du musée voit vos informations.', ciSubmit: 'Envoyer la demande',
  ciPendingTitle: 'Votre demande est entre les mains de l’équipe', ciPendingText: 'Merci, {name}. Un membre de l’équipe du Museo Abreu vous contactera personnellement.',
  ciSimApprove: 'Simuler l’approbation (démo)', ciResetDemo: 'Réinitialiser (démo)',
  ciWelcome: 'Bienvenue au Cercle, {name}', ciMemberSince: 'Membre depuis le {date}',
  ciAdvisorTitle: 'Votre interlocuteur au musée', ciAdvisorText: 'Un membre de l’équipe vous accompagne à chaque étape. Écrivez-lui quand vous le souhaitez.', ciWriteAdvisor: 'Écrire sur WhatsApp',
  ciInterest: 'Cette œuvre m’intéresse', ciInterested: 'Intérêt transmis', ciInterestSent: 'Votre interlocuteur au musée vous écrira au sujet de cette œuvre (simulation).',
  ciViewingTitle: 'Visite privée ou dîner avec l’artiste', ciViewingLead: 'Réservé aux membres du Cercle. L’équipe confirme la date et le format.',
  ciViewingType: 'Format', ciViewing: 'Visite privée au musée', ciVideo: 'Présentation par vidéo', ciDinner: 'Dîner privé avec Oscar Abreu',
  ciSendRequest: 'Envoyer la demande', ciViewingSent: 'Demande envoyée (simulation). L’équipe vous confirmera la date.',
  ciEveningsTitle: 'Soirées privées', ciEveningsLead: 'Certaines œuvres sont présentées lors de soirées de vente privées, uniquement sur invitation.',
  ciEveningsLocked: 'Les soirées privées sont réservées aux membres du Cercle.', ciByInvitation: 'Sur invitation',
  ciRequestInvite: 'Demander une invitation', ciInviteAsked: 'Invitation demandée', ciInviteSent: 'Demande envoyée (simulation). L’équipe vous confirmera l’invitation.',
  ciAccNone: 'Les œuvres d’Oscar Abreu s’acquièrent sur présentation.', ciAccPending: 'Votre demande de présentation est en cours d’examen.', ciAccMember: 'Vous êtes membre du Cercle.', ciAccLink: 'Voir le Cercle',
  waCircleRequest: 'Bonjour, je demande une présentation au Cercle des collectionneurs du Museo Abreu. Nom : {name}. E-mail : {email}. Téléphone : {phone}. Ville : {city}. J’ai découvert l’œuvre par : {source}. Intérêt : {intent}. Œuvre : {work}. Recommandé par : {referral}. {msg}',
  waCircleInterest: 'Bonjour, ici {name}, du Cercle des collectionneurs. L’œuvre « {title} » d’Oscar Abreu m’intéresse.',
  waCircleViewing: 'Bonjour, ici {name}, du Cercle des collectionneurs. Je souhaite : {type}. Œuvre : {work}. Date souhaitée : {date}. {msg}',
  waCircleInvite: 'Bonjour, ici {name}, du Cercle des collectionneurs. Je souhaite une invitation à la soirée privée de « {title} ».',
  waCircleAdvisor: 'Bonjour, ici {name}, du Cercle des collectionneurs du Museo Abreu.',
});

/* ---------- Data ---------- */

EXPERIENCES.splice(1, 0, {
  id: 'couple', cat: 'tour', price: 50, capacity: 10, seatsPer: 2, minutes: 75,
  perLabel: { es: 'por pareja', en: 'per couple', fr: 'par couple' },
  name: { es: 'VIP Tour para parejas', en: 'VIP Tour for couples', fr: 'VIP Tour pour couples' },
  desc: { es: 'El VIP Tour para dos personas, a precio de pareja.', en: 'The VIP Tour for two people, at a couple’s price.', fr: 'Le VIP Tour pour deux personnes, à un prix pour couple.' },
});
EXPERIENCES.push(
  {
    id: 'painting-class', cat: 'class', price: 45, capacity: 12, minutes: 120,
    name: { es: 'Clase de pintura Psico-Expresionista', en: 'Psycho-Expressionist painting class', fr: 'Cours de peinture psycho-expressionniste' },
    desc: { es: 'Capas, raspado y rasgado sobre lienzo. Materiales incluidos. 2 horas.', en: 'Layers, scraping and tearing on canvas. Materials included. 2 hours.', fr: 'Couches, grattage et déchirure sur toile. Matériel inclus. 2 heures.' },
  },
  {
    id: 'sculpture-class', cat: 'class', price: 55, capacity: 8, minutes: 150,
    name: { es: 'Clase de escultura', en: 'Sculpture class', fr: 'Cours de sculpture' },
    desc: { es: 'Forma y materia en tres dimensiones, a partir del rostro. 2 h 30 min.', en: 'Form and matter in three dimensions, starting from the face. 2 h 30 min.', fr: 'La forme et la matière en trois dimensions, à partir du visage. 2 h 30.' },
  },
);
SCHEDULE.couple = SCHEDULE.vip;
SCHEDULE['painting-class'] = [{ time: '10:00', langs: ['es', 'en'], days: [2, 4, 6] }];
SCHEDULE['sculpture-class'] = [{ time: '15:00', langs: ['es'], days: [3, 6] }];

// The book price requested by the family.
EDITIONS.forEach(e => { e.price = 60; });

const CLUBS = [
  { id: 'painting-club', price: 80, name: { es: 'Club de pintura', en: 'Painting club', fr: 'Club de peinture' },
    when: { es: 'Cada sábado · 2 horas', en: 'Every Saturday · 2 hours', fr: 'Chaque samedi · 2 heures' },
    desc: { es: 'Pinta cada semana en el museo con un instructor y otros miembros.', en: 'Paint every week at the museum with an instructor and other members.', fr: 'Peignez chaque semaine au musée avec un instructeur et d’autres membres.' } },
  { id: 'art-club', price: 30, name: { es: 'Club de arte', en: 'Art club', fr: 'Club d’art' },
    when: { es: 'Una vez al mes', en: 'Once a month', fr: 'Une fois par mois' },
    desc: { es: 'Charlas, visitas a talleres y lectura de obras con artistas invitados.', en: 'Talks, studio visits and readings of works with guest artists.', fr: 'Conférences, visites d’ateliers et lectures d’œuvres avec des artistes invités.' } },
];

// Yearly museum events (month, day). Their next date is computed automatically.
const ANNUAL_EVENTS = [
  { id: 'anniversary', annual: { m: 11, d: 17 }, since: 2021, vip: true, price: null, time: '19:00',
    name: { es: 'Aniversario del Museo Abreu', en: 'Museo Abreu anniversary', fr: 'Anniversaire du Museo Abreu' },
    // The Spanish edition of Ecce Homo is "published in commemoration of the anniversary of Museo Abreu" (its credits).
    launch: { es: 'y la presentación del libro Ecce Homo: El arte me salvó la vida, de Oscar Abreu',
      en: 'and the launch of the book Ecce Homo: Art Saved My Life, by Oscar Abreu',
      fr: 'et la présentation du livre Ecce Homo : L’art m’a sauvé la vie, d’Oscar Abreu' },
    launchCard: { es: 'Con la presentación del libro Ecce Homo: El arte me salvó la vida, de Oscar Abreu.',
      en: 'With the launch of the book Ecce Homo: Art Saved My Life, by Oscar Abreu.',
      fr: 'Avec la présentation du livre Ecce Homo : L’art m’a sauvé la vie, d’Oscar Abreu.' },
    // Invitation wording for the 2026 card (5th anniversary + Ecce Homo launch), English as written by the museum.
    invitation: {
      2026: {
        request: { es: 'le invita cordialmente a celebrar su', en: 'cordially invites you to celebrate its', fr: 'vous invite cordialement à célébrer son' },
        title: { es: 'Quinto aniversario', en: 'Fifth Anniversary', fr: 'Cinquième anniversaire' },
        launchOf: { es: 'y la presentación de', en: 'and the launch of', fr: 'et le lancement de' },
        sub1: { es: 'El arte me salvó la vida', en: 'Art Saved My Life', fr: 'L’art m’a sauvé la vie' },
        sub2: { es: 'El nacimiento del Psico-Expresionismo', en: 'The Birth of Psycho-Expressionism', fr: 'La naissance du Psycho-Expressionnisme' },
        by: { es: 'de Oscar Abreu', en: 'by Oscar Abreu', fr: 'd’Oscar Abreu' },
        lead: { es: 'Una velada para celebrar el arte, un extraordinario recorrido personal y cinco años del Museo Abreu.', en: 'An evening celebrating art, a remarkable personal journey, and five years of Museo Abreu.', fr: 'Une soirée pour célébrer l’art, un parcours personnel remarquable et cinq années du Museo Abreu.' },
        country: { es: 'República Dominicana', en: 'Dominican Republic', fr: 'République dominicaine' },
        close: { es: 'Acompáñenos a celebrar este hito y el comienzo de un nuevo capítulo.', en: 'Join us as we celebrate this milestone and the beginning of a new chapter.', fr: 'Joignez-vous à nous pour célébrer cette étape et le début d’un nouveau chapitre.' }
      },
    },
    launchShort: { es: 'presentación del libro Ecce Homo', en: 'Ecce Homo book launch', fr: 'présentation du livre Ecce Homo' },
    desc: { es: 'Celebramos la apertura del museo, inaugurado el 17 de noviembre de 2021 con la retrospectiva Memoria del Psico-Expresionismo.',
      en: 'We celebrate the opening of the museum, inaugurated on November 17, 2021 with the retrospective Memoria del Psico-Expresionismo.', fr: 'Nous célébrons l’ouverture du musée, inauguré le 17 novembre 2021 avec la rétrospective Memoria del Psico-Expresionismo.' } },
  { id: 'group-exhibition', annual: { m: 6, d: 13 }, vip: true, price: null, time: '19:00',
    name: { es: 'Exposición colectiva', en: 'Group exhibition', fr: 'Exposition collective' },
    desc: { es: 'Cada año el Museo Abreu reúne en una exposición colectiva a artistas dominicanos y obras de Oscar Abreu.',
      en: 'Every year Museo Abreu brings together Dominican artists and works by Oscar Abreu in a group exhibition.', fr: 'Chaque année, le Museo Abreu réunit des artistes dominicains et des œuvres d’Oscar Abreu dans une exposition collective.' } },
  { id: 'art-gabangi', annual: { m: 7, d: 6 }, vip: true, price: null, time: '18:00', lastDay: 8, tiers: [
    // Ticket options as published on gabangi.com for ART GABANGI 2026. "day" counts from July 6.
    { id: 'festival', time: '10:00', group: 'pass', price: 50, day: 1, img: 'img/petrichor.jpg', art: 'petrichor',
      lead: { es: 'Siete días de ART GABANGI, del 7 al 14 de julio, con acceso diario a la feria.', en: 'Seven days of ART GABANGI, July 7 to 14, with daily access to the fair.', fr: 'Sept jours d’ART GABANGI, du 7 au 14 juillet, avec un accès quotidien à la foire.' },
      name: { es: 'Festival Pass', en: 'Festival Pass', fr: 'Festival Pass' },
      tag: { es: '7 días · sin gala', en: '7 days · no gala', fr: '7 jours · sans gala' },
      items: { es: ['Válido del 7 al 14 de julio', 'Acceso diario 10:00 a. m. – 8:00 p. m.', 'El 14 de julio la feria cierra a las 5:00 p. m.', 'No incluye la Gala Premier'],
        en: ['Valid July 7–14', 'Daily access 10:00 AM – 8:00 PM', 'On July 14 the fair closes at 5:00 PM', 'Does not include the Gala Premier'], fr: ['Valable du 7 au 14 juillet', 'Accès quotidien de 10 h à 20 h', 'Le 14 juillet, la foire ferme à 17 h', 'N’inclut pas la Gala Premier'] } },
    { id: 'vip', time: '18:00', group: 'pass', price: 140, day: 0, proFree: true, img: 'img/passion.jpg', art: 'passion',
      lead: { es: 'ART GABANGI completo: la Gala Premier del 6 de julio y los siete días del festival.', en: 'The complete ART GABANGI: the Gala Premier on July 6 and all seven festival days.', fr: 'ART GABANGI au complet : la Gala Premier du 6 juillet et les sept jours du festival.' },
      name: { es: 'VIP All-Access', en: 'VIP All-Access', fr: 'VIP All-Access' },
      tag: { es: 'Gala + 7 días', en: 'Gala + 7 days', fr: 'Gala + 7 jours' },
      items: { es: ['Incluye la Gala Premier del 6 de julio', 'Puertas 6:00 p. m. · evento principal 8:00 p. m.', 'Incluye el Festival Pass (7 al 14 de julio)'],
        en: ['Includes the Gala Premier on July 6', 'Doors 6:00 PM · main event 8:00 PM', 'Includes the Festival Pass (July 7–14)'], fr: ['Inclut la Gala Premier du 6 juillet', 'Portes 18 h · événement principal 20 h', 'Inclut le Festival Pass (7–14 juillet)'] } },
    { id: 'dinner', time: '19:00', group: 'pass', price: 200, day: 8, img: 'img/limerence.jpg', art: 'limerence',
      lead: { es: 'La velada de clausura del 14 de julio: cena, subasta en vivo y el Premio Artista del Año.', en: 'The closing evening on July 14: dinner, a live auction and the Artist of the Year Award.', fr: 'La soirée de clôture du 14 juillet : dîner, vente aux enchères en direct et Prix de l’Artiste de l’année.' },
      name: { es: 'Cena de Subasta y Premios', en: 'Auction & Awards Dinner', fr: 'Dîner de vente aux enchères et remise des prix' },
      tag: { es: '14 de julio · cena incluida', en: 'July 14 · dinner included', fr: '14 juillet · dîner inclus' },
      items: { es: ['Obras en exhibición del 6 al 14 de julio', 'La cena comienza a las 7:00 p. m.', 'Subasta en vivo durante la cena', 'Premio Artista del Año', 'Reconocimiento a líderes políticos, sociales y culturales'],
        en: ['Works on view July 6–14', 'Dinner starts 7:00 PM', 'Live auction during dinner', 'Artist of the Year Award', 'Recognition of political, social and cultural leaders'], fr: ['Œuvres exposées du 6 au 14 juillet', 'Le dîner commence à 19 h', 'Vente aux enchères en direct pendant le dîner', 'Prix de l’Artiste de l’année', 'Hommage à des personnalités politiques, sociales et culturelles'] } },
    { id: 'gala', time: '18:00', group: 'single', price: 100, day: 0, img: 'img/resilience.jpg', art: 'resilience',
      lead: { es: 'La noche de apertura de ART GABANGI, el 6 de julio.', en: 'The opening night of ART GABANGI on July 6.', fr: 'La soirée d’ouverture d’ART GABANGI, le 6 juillet.' },
      name: { es: 'Gala Premier', en: 'Gala Premier', fr: 'Gala Premier' },
      tag: { es: '6 de julio', en: 'July 6', fr: '6 juillet' },
      items: { es: ['Puertas 6:00 p. m.', 'Evento principal 8:00 p. m.', 'Celebración de apertura'], en: ['Doors open 6:00 PM', 'Main event starts 8:00 PM', 'Opening celebration'], fr: ['Ouverture des portes à 18 h', 'Début de l’événement principal à 20 h', 'Célébration d’ouverture'] } },
    { id: 'regular', time: '10:00', group: 'single', price: 10, day: 1, img: 'img/echoes-of-memory.jpg', art: 'echoes-of-memory',
      lead: { es: 'Un día en la feria, cualquier día del 7 al 14 de julio.', en: 'One day at the fair, any day from July 7 to 14.', fr: 'Une journée à la foire, au choix du 7 au 14 juillet.' },
      name: { es: 'Día regular', en: 'Regular Day', fr: 'Journée' },
      tag: { es: '7 al 14 de julio', en: 'July 7–14', fr: '7–14 juillet' },
      items: { es: ['Acceso diario 10:00 a. m. – 8:00 p. m.', 'El 14 de julio cierra a las 5:00 p. m.'], en: ['Daily access 10:00 AM – 8:00 PM', 'July 14 closes 5:00 PM'], fr: ['Accès quotidien de 10 h à 20 h', 'Le 14 juillet, fermeture à 17 h'] } },
  ],
    name: { es: 'ART GABANGI', en: 'ART GABANGI', fr: 'ART GABANGI' },
    desc: { es: 'Encuentro anual de artistas, críticos, coleccionistas y público en el Museo Abreu: exposiciones, conferencias, talleres y mercado del arte.',
      en: 'Annual gathering of artists, critics, collectors and visitors at Museo Abreu: exhibitions, lectures, workshops and the art market.', fr: 'Rencontre annuelle d’artistes, de critiques, de collectionneurs et de visiteurs au Museo Abreu : expositions, conférences, ateliers et marché de l’art.' } },
];

const EVENTS = [
  ...ANNUAL_EVENTS,
  { id: 'book-launch', vip: true, price: 40, inDays: 10, time: '19:00',
    name: { es: 'Presentación del libro Ecce Homo', en: 'Ecce Homo book presentation', fr: 'Présentation du livre Ecce Homo' },
    desc: { es: 'Oscar Abreu presenta su autobiografía y firma ejemplares.', en: 'Oscar Abreu presents his autobiography and signs copies.', fr: 'Oscar Abreu présente son autobiographie et dédicace des exemplaires.' } },
  { id: 'collectors-night', vip: true, price: 75, inDays: 17, time: '20:00',
    name: { es: 'Noche de coleccionistas', en: 'Collectors’ night', fr: 'Soirée des collectionneurs' },
    desc: { es: 'Obras nuevas y disponibles, con el artista presente.', en: 'New and available works, with the artist present.', fr: 'Œuvres nouvelles et disponibles, en présence de l’artiste.' } },
  { id: 'opening', vip: false, price: 20, inDays: 24, time: '18:30',
    name: { es: 'Inauguración de exposición', en: 'Exhibition opening', fr: 'Vernissage d’exposition' },
    desc: { es: 'Apertura de la nueva sala del museo.', en: 'Opening of the museum’s new gallery.', fr: 'Ouverture de la nouvelle salle du musée.' } },
  { id: 'artist-talk', vip: true, price: 35, inDays: 31, time: '18:00',
    name: { es: 'Conversatorio con Oscar Abreu', en: 'A conversation with Oscar Abreu', fr: 'Une conversation avec Oscar Abreu' },
    desc: { es: 'El artista habla sobre el Psico-Expresionismo y responde preguntas.', en: 'The artist talks about Psycho-Expressionism and answers questions.', fr: 'L’artiste parle du Psycho-Expressionnisme et répond aux questions.' } },
];

// Collectors' Circle: works are acquired by introduction, never bought from the page, and
// no price is shown; the museum shares it privately. isNew works are presented to Circle
// members first. Passion is not listed: oscarabreu.com marks it as sold.
const CIRCLE_WORKS = [
  { work: 'escaping-being', isNew: true },
  { work: 'limerence' },
  { work: 'petrichor' },
];

// Works the museum may present at private auction evenings, by invitation (demo examples).
const CIRCLE_EVENINGS = ['resilience', 'echoes-of-memory'];

/* ---------- State ---------- */

const fx = {
  get: (k, d) => store.get(k, d),
  set: (k, v) => store.set(k, v),
};
const member = () => fx.get('member', null);
const isPro = () => !!member();
// Circle status on this device: none → pending (request sent) → member (approved by the museum).
// In the live app approval happens outside it, over WhatsApp; real member accounts are Phase 2.
const circle = () => fx.get('circle', null);
const circleStatus = () => (circle() && circle().status) || 'none';

/* ---------- Pages ---------- */

function nextAnnualEvent() {
  return ANNUAL_EVENTS.slice().sort((a, b) => eventDate(a).localeCompare(eventDate(b))).at(0);
}

function homeExtras() {
  const ev = nextAnnualEvent();
  const d = eventDate(ev), n = daysUntil(d);
  // Tickets: the event's booking link when there is one, else WhatsApp with the request written;
  // ART GABANGI has several ticket types, so it goes to its tickets on the events page.
  const ext = bookingLink(ev.id) || (ev.tiers ? '' : whatsappLink(t('waTicketsFor', { event: eventTitle(ev), date: fmtDate(d) })));
  // The museum's own invitations (no ticket price) take an RSVP instead of tickets.
  const buy = !bookingLink(ev.id) && !ev.tiers && !ev.price ? `<a class="btn primary" href="#/rsvp/${ev.id}">${t('rsvp')}</a>`
    : ext ? `<a class="btn primary" href="${ext}" target="_blank" rel="noopener">${t('buyTickets')}</a>`
    : `<a class="btn primary" href="#/eventos">${t('buyTickets')}</a>`;
  const promo = `<section class="section"><div class="promo">
    <span class="promo-count"><strong>${n}</strong><small>${t('daysLabel')}</small></span>
    <span class="promo-text"><span class="eyebrow">${t('nextAnnual')}</span>
      <a class="promo-title" href="#/eventos">${eventTitle(ev)}</a>
      <span>${fmtDate(d)} · ${t('freeForPro')}</span>
      <span class="promo-all">${ANNUAL_EVENTS.map(a => `${String(a.annual.d)}/${String(a.annual.m)}`).join(' · ')} · ${t('everyYear')}</span>
      <span class="btn-row promo-actions">${buy}<a class="btn light" href="#/eventos">${t('eventDetails')}</a></span></span>
  </div></section>`;
  const tiles = [
    ['#/clases', 'moreClasses', 'moreClassesText'], ['#/eventos', 'moreEvents', 'moreEventsText'],
    ['#/coleccion', 'moreCollection', 'moreCollectionText'], ['#/pro', 'morePro', 'moreProText'],
    ['#/galeria', 'navFineArt', 'moreFineArtText'], ['#/biblioteca/top100', 'moreTop100', 'moreTop100Text'],
  ];
  return promo + `<section class="section"><h2>${t('moreTitle')}</h2><div class="grid three">${tiles.map(([h, a, b]) =>
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
        <div class="btn-row">${clubs.includes(c.id) ? `<span class="status ok">${t('clubMember')}</span>` : `<button class="btn" data-action="joinClub" data-id="${c.id}">${t(BOOKING.live || whopLink(c.id) ? 'joinClubOnline' : 'joinClub')}</button>`}</div></div>`).join('')}</div></section>
    <section class="section"><div class="card" style="max-width:640px">
      <h2>${t('sponsorTitle')}</h2><p>${t('sponsorText')}</p>
      <div class="btn-row">${[25, 50, 100].map(a => `<button class="btn ${a === 50 ? 'primary' : ''}" data-action="sponsor" data-amount="${a}">${t(BOOKING.live || whopLink('sponsor-' + a) ? 'sponsorOnline' : 'sponsorBtn', { amount: usd(a) })}</button>`).join('')}</div>
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
    ${BOOKING.live ? '' : `<section class="section"><h2>${t('moreEvents')}</h2><div class="grid two">${sortedEvents().filter(ev => !ev.annual).map(ev => eventCard(ev, passes)).join('')}</div></section>`}
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
    // Art Basel-style call to action: a quiet "Buy now ›"; it opens the checkout sheet (checkout.js).
    action = `<button class="buy-now" data-action="buyEvent" data-id="${ev.id}" data-tier="${tier.id}" aria-label="${t('buyNow')} · ${L(tier.name)} · ${usd(tier.price)}">${t('buyNow')} <span class="arr" aria-hidden="true">›</span></button>`;
  }
  const art = tier.art && WORKS.find(w => w.id === tier.art);
  return `<article class="tier pass-card ${tier.proFree ? 'tier-vip' : ''}">
    ${art ? `<figure class="pass-img"><img src="${tier.img}" alt="" loading="lazy" width="1400" height="1400"><figcaption>Oscar Abreu · ${L(art.title)}</figcaption></figure>` : ''}
    <h5 class="pass-name">${L(tier.name)}</h5>
    <p class="pass-price">USD ${tier.price.toLocaleString('en-US')}${tier.proFree ? ` <span class="status ok">${t('freeForPro')}</span>` : ''}</p>
    ${tier.lead ? `<p class="pass-lead">${L(tier.lead)}</p>` : `<span class="chip">${L(tier.tag)}</span>`}
    <p class="pass-benefits">${t('includedBenefits')}</p>
    <ul>${L(tier.items).map(i => `<li>${i}</li>`).join('')}</ul>
    ${action}
  </article>`;
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
      <div class="btn-row">${location.hash.startsWith('#/gabangi') ? '' : `<a class="btn primary" href="#/gabangi">${t('gabangiMore')}</a>`}<a class="btn dark" href="https://gabangi.com" target="_blank" rel="noopener">${t('officialSite')} · gabangi.com ↗</a></div>
      <p class="muted" style="margin-top:.8rem">${t('gabangiSource')}</p>
    </article>`;
  }
  {
      const pass = passes.find(p => p.event === ev.id);
      const d = eventDate(ev), n = daysUntil(d);
      const invite = ev.annual && !ev.price && !ev.tiers; // the museum's own invitation: RSVP (rsvp.js)
      return `<article class="card event ${ev.annual ? 'annual' : ''}">
        <div class="chips" style="margin:0 0 .5rem">${ev.vip ? `<span class="chip vip">${t('vipEvent')}</span>` : ''}${ev.annual ? `<span class="chip annual-chip">${t('everyYear')}</span>` : `<span class="chip">${t('example')}</span>`}${ev.pendingName ? `<span class="pending">${t('nameTbc')}</span>` : ''}</div>
        <h3>${eventTitle(ev)}</h3>
        <p class="muted">${fmtDate(d)} · ${ev.time} (UTC−4)${ev.annual ? ` · <strong>${n === 0 ? t('today') : t('inNDays', { n })}</strong>` : ''}</p>
        <p style="margin-top:.4rem">${L(ev.desc)}</p>
        ${ev.launchCard ? `<p class="event-launch">${L(ev.launchCard)}</p>` : ''}
        <p style="margin-top:.6rem"><strong>${ev.price ? usd(ev.price) : invite ? t('ciByInvitation') : t('priceTbc')}</strong> · <span class="status ok">${t('freeForPro')}</span></p>
        ${pass ? `<div style="margin-top:.8rem">${passHTML(pass)}</div>` : isPro() ? `
          <div class="event-form" style="margin-top:.8rem">
            ${ev.vip ? `<label class="field"><span>${t('guests')}</span>
              <select id="g-${ev.id}">${[0, 1, 2, 3].map(n => `<option value="${n}">${n}</option>`).join('')}</select>
              <small class="muted">${t('guestsHelp')}</small></label>` : ''}
            <button class="btn primary" data-action="getPass" data-id="${ev.id}">${t('getPass')}</button>
            ${invite ? `<a class="btn" href="#/rsvp/${ev.id}">${t('rsvp')}</a>` : ''}
          </div>` : invite ? `
          <div class="btn-row"><a class="btn primary" href="#/rsvp/${ev.id}">${t('rsvp')}</a><a class="btn" href="#/pro">${t('becomePro')}</a></div>` : `
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
    <div class="ticket-head"><p class="eyebrow ticket-kicker">${p.member ? 'Pro' : 'Museo Abreu'}</p><h3>${eventTitle(ev)}${tier ? ` · ${L(tier.name)}` : ''}</h3></div>
    <div class="ticket-body"><div class="qr" data-qr="${p.code}"></div><p class="code">${p.code}</p>
      <p class="muted" style="text-align:center">${fmtDate(p.date)} · ${(tier && tier.time) || ev.time} · ${t('passFor', { n: 1 + p.guests })}</p></div></div>`;
}

function workById(id) { return WORKS.find(w => w.id === id); }

function circleWorkCard(c, status) {
  const w = workById(c.work);
  const asked = (circle() && circle().interests || []).includes(c.work);
  const action = status === 'member'
    ? (asked ? `<p class="status ok">${t('ciInterested')}</p>` : `<button class="btn primary" data-action="circleInterest" data-work="${c.work}">${t('ciInterest')}</button>`)
    : status === 'pending' ? '' : `<button class="btn" data-action="circleRequest" data-work="${c.work}">${t('ciRequestCta')}</button>`;
  return `<article class="card ci-work"><button type="button" class="art-frame ci-art" data-action="work" data-id="${w.id}" aria-label="${esc(L(w.title))}">${workImg(w)}</button>
    <p class="ci-mark">${c.isNew ? t('ciNewWork') : t('ciByIntro')}</p>
    <h2 class="h3">${L(w.title)}</h2>
    <p class="muted">Oscar Abreu${w.spec ? ` · ${L(w.spec).join(' · ')}` : ''}</p>
    <div class="btn-row">${action}</div></article>`;
}

function pageCollection() {
  const status = circleStatus(), c = circle();
  const works = CIRCLE_WORKS.filter(x => status === 'member' || !x.isNew);
  const opt = (v, k) => `<option value="${v}">${t(k)}</option>`;
  const steps = [1, 2, 3].map(n => `<li><span class="ci-num">${['I', 'II', 'III'][n - 1]}</span><div><h3>${t('ciStep' + n + 'T')}</h3><p class="muted">${t('ciStep' + n + 'D')}</p></div></li>`).join('');
  const state = status === 'member'
    ? `<div class="ci-panel"><p class="ci-kicker">${t('ciEyebrow')}</p><h2>${t('ciWelcome', { name: esc(c.name) })}</h2>
        <p class="ci-since">${t('ciMemberSince', { date: fmtDate(c.since.slice(0, 10), { day: 'numeric', month: 'long', year: 'numeric' }) })}</p>
        <div class="ci-advisor"><h3>${t('ciAdvisorTitle')}</h3><p>${t('ciAdvisorText')}</p>
          <div class="btn-row"><button class="btn light" data-action="circleAdvisor">${t('ciWriteAdvisor')}</button></div></div>
        ${BOOKING.live ? '' : `<button class="ci-reset" data-action="circleReset">${t('ciResetDemo')}</button>`}</div>`
    : status === 'pending'
    ? `<div class="ci-panel"><p class="ci-kicker">${t('ciEyebrow')}</p><h2>${t('ciPendingTitle')}</h2><p>${t('ciPendingText', { name: esc(c.name) })}</p>
        ${BOOKING.live ? '' : `<div class="btn-row"><button class="btn light" data-action="circleApprove">${t('ciSimApprove')}</button></div>`}</div>`
    : '';
  const form = status !== 'none' ? '' : `<section class="section" id="circulo">
      <h2>${t('ciFormTitle')}</h2><p class="muted" style="margin-bottom:1rem">${t('ciFormLead')}</p>
      <form class="card ci-form" data-form="circleRequest" style="max-width:680px">
        <div class="grid two">
          <div class="field"><label for="ci-name">${t('name')}</label><input id="ci-name" required autocomplete="name" value="${esc(profile.name)}"></div>
          <div class="field"><label for="ci-email">${t('email')}</label><input id="ci-email" type="email" required autocomplete="email" value="${esc(profile.email)}"></div>
          <div class="field"><label for="ci-phone">${t('phone')}</label><input id="ci-phone" type="tel" required autocomplete="tel"></div>
          <div class="field"><label for="ci-city">${t('ciCity')}</label><input id="ci-city" autocomplete="address-level2"></div>
          <div class="field"><label for="ci-source">${t('ciSource')}</label><select id="ci-source">${opt('visit', 'ciSrcVisit')}${opt('collector', 'ciSrcCollector')}${opt('show', 'ciSrcShow')}${opt('press', 'ciSrcPress')}${opt('other', 'ciSrcOther')}</select></div>
          <div class="field"><label for="ci-intent">${t('ciIntent')}</label><select id="ci-intent">${opt('first', 'ciIntFirst')}${opt('grow', 'ciIntGrow')}${opt('commission', 'ciIntCommission')}${opt('institution', 'ciIntInstitution')}</select></div>
        </div>
        <div class="field"><label for="ci-work">${t('ciWorkOpt')}</label><select id="ci-work"><option value="">—</option>${WORKS.filter(w => !w.sold).map(w => `<option value="${w.id}">${L(w.title)}</option>`).join('')}</select></div>
        <div class="field"><label for="ci-ref">${t('ciReferral')}</label><input id="ci-ref"></div>
        <div class="field"><label for="ci-msg">${t('message')}</label><textarea id="ci-msg" rows="3"></textarea></div>
        <p class="muted" style="font-size:.85rem">${t('ciConfidential')}</p>
        <div class="btn-row"><button class="btn primary">${t('ciSubmit')}</button></div>
      </form>
    </section>`;
  const evenings = `<section class="section"><h2>${t('ciEveningsTitle')}</h2><p class="muted" style="margin-bottom:1rem">${t('ciEveningsLead')}</p>
      ${status === 'member' ? `<div class="grid two">${CIRCLE_EVENINGS.map(id => { const w = workById(id); const asked = (c.invites || []).includes(id);
        return `<article class="card ci-work"><div class="art-frame">${workImg(w)}</div><p class="ci-mark">${t('ciByInvitation')}</p><h3>${L(w.title)}</h3>
          <div class="btn-row">${asked ? `<p class="status ok">${t('ciInviteAsked')}</p>` : `<button class="btn" data-action="circleInvite" data-work="${id}">${t('ciRequestInvite')}</button>`}</div></article>`; }).join('')}</div>`
        : `<p class="ci-note">${t('ciEveningsLocked')}</p>`}</section>`;
  const viewing = status !== 'member' ? '' : `<section class="section"><h2>${t('ciViewingTitle')}</h2><p class="muted" style="margin-bottom:1rem">${t('ciViewingLead')}</p>
      <form class="card" data-form="circleViewing" style="max-width:640px">
        <div class="grid two">
          <div class="field"><label for="cv-type">${t('ciViewingType')}</label><select id="cv-type">${opt('viewing', 'ciViewing')}${opt('video', 'ciVideo')}${opt('dinner', 'ciDinner')}</select></div>
          <div class="field"><label for="cv-date">${t('preferredDate')}</label><input id="cv-date" type="date" min="${addDays(todayPC(), 1)}"></div>
        </div>
        <div class="field"><label for="cv-work">${t('ciWorkOpt')}</label><select id="cv-work"><option value="">—</option>${WORKS.filter(w => !w.sold).map(w => `<option value="${w.id}">${L(w.title)}</option>`).join('')}</select></div>
        <div class="field"><label for="cv-msg">${t('message')}</label><textarea id="cv-msg" rows="3"></textarea></div>
        <div class="btn-row"><button class="btn primary">${t('ciSendRequest')}</button></div>
      </form></section>`;
  return `<div class="wrap">
    <section class="section ci-hero">
      <p class="eyebrow">${t('ciEyebrow')}</p><h1>${t('ciTitle')}</h1>
      <p class="lead" style="margin-top:.8rem">${t('ciLead')}</p>
      ${status === 'none' ? `<div class="btn-row"><button type="button" class="btn primary" data-action="circleRequest">${t('ciRequestCta')}</button></div>` : ''}
    </section>
    ${state ? `<section class="section">${state}</section>` : ''}
    ${status === 'member' ? '' : `<section class="section"><h2>${t('ciHowTitle')}</h2><ol class="ci-steps">${steps}</ol></section>`}
    <section class="section"><h2>${t('ciWorksTitle')}</h2>
      <div class="grid two" style="margin-top:1rem">${works.map(x => circleWorkCard(x, status)).join('')}</div>
      ${status === 'member' ? '' : `<p class="ci-note" style="margin-top:1rem">${t('ciNewForMembers')}</p>`}
    </section>
    ${viewing}
    ${evenings}
    ${form}
  </div>`;
}

function pagePro() {
  const m = member();
  const rows = [['b1', 1, 1], ['b2', 1, 1], ['b3', 0, 1], ['b4', 0, 1], ['b5', 0, 1], ['b9', 0, 1]];
  const cell = v => v ? '<span class="yes" aria-label="✓">✓</span>' : '<span class="muted" aria-label="—">—</span>';
  return `<div class="wrap">
    <section class="section pro-hero">
      <p class="eyebrow">${t('proEyebrow')}</p><h1>${t('proTitle')}</h1>
      <p class="lead" style="margin-top:.8rem">${t('proLead')}</p>
      <p style="margin-top:.8rem"><strong>${t('proPrice')}</strong></p>
      ${m ? `<p class="status ok" style="margin-top:.8rem">${t('youArePro')} · ${m.id}</p>` : `<div class="btn-row"><button class="btn primary" data-action="joinPro">${t(BOOKING.live || whopLink('pro') ? 'joinProOnline' : 'joinPro')}</button></div>`}
    </section>
    ${m ? `<section class="section"><h2>${t('memberPass')}</h2><p class="muted" style="margin-bottom:1rem">${t('memberPassHelp')}</p>${memberCard(m)}
      <div class="btn-row"><a class="btn dark" href="#/eventos">${t('navEvents')}</a><button class="btn small" data-action="leavePro">${t('leavePro')}</button></div></section>` : ''}
    <section class="section"><h2>${t('compare')}</h2>
      <div class="table-wrap"><table class="compare"><thead><tr><th>${t('featureCol')}</th><th>${t('freeCol')}</th><th>${t('proCol')}</th></tr></thead>
      <tbody>${rows.map(([k, a, b]) => `<tr><td>${t(k)}</td><td>${cell(a)}</td><td>${cell(b)}</td></tr>`).join('')}</tbody></table></div>
    </section>
  </div>`;
}

function memberCard(m) {
  return `<div class="ticket member-card" style="max-width:340px">
    <div class="ticket-head"><p class="eyebrow ticket-kicker">Museo Abreu · Pro</p><h3>${esc(m.name)}</h3></div>
    <div class="ticket-body"><div class="qr" data-qr="${m.id}"></div><p class="code">${m.id}</p></div></div>`;
}

function dailyReading() {
  const S = lang === 'es' ? SAMPLE_ES : SAMPLE_EN;
  const paras = S.intro.concat(S.ch1);
  const today = todayPC();
  const day = Math.floor(Date.parse(today) / 864e5);
  const passage = paras.at(day % paras.length);
  const ch = 1 + (day % 70);
  return `<section class="section daily">
    <p class="eyebrow">${t('dailyTitle')} · ${fmtDate(today)}</p>
    <blockquote lang="${lang === 'es' ? 'es' : 'en'}">${esc(passage)}</blockquote>
    <p class="muted" style="margin-top:.6rem">${t('dailyNote')}</p>
    <div class="btn-row">${isPro()
      ? `<a class="btn primary" href="#/leer/en/${ch}">${t('dailyFull', { ch: chTitle(CHAPTERS.at(ch), 'en') })}</a>`
      : `<a class="btn" href="#/pro">${t('dailyProCta')}</a>`}</div>
  </section>`;
}

function accountExtras() {
  const m = member();
  const passes = fx.get('passes', []);
  const status = circleStatus();
  return `<section class="section grid two">
    <div><h2>${t('accMembership')}</h2>${m ? memberCard(m) : `<p class="empty">${t('notPro')} <a href="#/pro">${t('becomePro')}</a></p>`}</div>
    <div><h2>${t('accPasses')}</h2>${passes.length ? `<div class="grid">${passes.map(passHTML).join('')}</div>` : `<p class="empty">${t('noPasses')}</p>`}</div>
  </section>
  <section class="section"><h2>${t('ciEyebrow')}</h2>
    <p>${status === 'member' ? t('ciAccMember') : status === 'pending' ? t('ciAccPending') : t('ciAccNone')} <a href="#/coleccion">${t('ciAccLink')}</a></p>
  </section>`;
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
    const club = CLUBS.find(c => c.id === el.dataset.id);
    if (BOOKING.live || whopLink(club.id)) return checkout({ title: L(club.name), sub: L(club.when), price: club.price, period: 'month', link: whopLink(club.id), provider: 'Whop' });
    const clubs = fx.get('clubs', []);
    if (!clubs.includes(el.dataset.id)) clubs.push(el.dataset.id);
    fx.set('clubs', clubs);
    toast(t('joinedClub'));
    route();
  },
  sponsor: el => {
    const link = whopLink('sponsor-' + el.dataset.amount);
    if (BOOKING.live || link) return checkout({ title: t('sponsorTitle'), price: Number(el.dataset.amount), link, provider: 'Whop' });
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
    const key = tier ? 'gabangi-' + tier.id : ev.id, whop = whopLink(key), link = whop || bookingLink(key);
    if (BOOKING.live || link) return checkout({ title: tier ? L(tier.name) : eventTitle(ev), sub: tier ? eventTitle(ev) : '',
      when: tier ? L(tier.tag) : fmtDate(eventDate(ev)), img: tier && tier.img, price: tier ? tier.price : ev.price, qty: true, link, provider: whop ? 'Whop' : BOOKING.provider });
    const passes = fx.get('passes', []);
    if (passes.some(p => p.event === ev.id && (p.tier || null) === (tier ? tier.id : null))) return toast(t('alreadyRegistered'));
    passes.push({ code: newCode().replace('MA-', 'EV-'), event: ev.id, tier: tier ? tier.id : null, date: tier ? addDays(eventDate(ev), tier.day) : eventDate(ev), guests: 0, member: isPro(), paid: tier ? tier.price : ev.price });
    fx.set('passes', passes);
    toast(t('passReady'));
    route();
  },
  notifyEvent: el => {
    if (BOOKING.live) return openWhatsApp(t('waNotify', { event: eventTitle(EVENTS.find(e => e.id === el.dataset.id)) }));
    const list = fx.get('eventAlerts', []);
    if (!list.includes(el.dataset.id)) list.push(el.dataset.id);
    fx.set('eventAlerts', list);
    toast(t('notifySet'));
  },
  circleRequest: el => {
    const go = () => {
      const sel = document.getElementById('ci-work');
      if (sel && el.dataset.work) sel.value = el.dataset.work;
      const f = document.getElementById('circulo');
      if (f) { f.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => document.getElementById('ci-name').focus({ preventScroll: true }), 400); }
    };
    if (location.hash.startsWith('#/coleccion')) go(); else { location.hash = '#/coleccion'; setTimeout(go, 150); }
  },
  circleInterest: el => {
    const c = circle(), w = workById(el.dataset.work);
    if (BOOKING.live) openWhatsApp(t('waCircleInterest', { name: c.name, title: L(w.title) }));
    else toast(t('ciInterestSent'));
    fx.set('circle', { ...c, interests: [...(c.interests || []), el.dataset.work] });
    route();
  },
  circleInvite: el => {
    const c = circle(), w = workById(el.dataset.work);
    if (BOOKING.live) openWhatsApp(t('waCircleInvite', { name: c.name, title: L(w.title) }));
    else toast(t('ciInviteSent'));
    fx.set('circle', { ...c, invites: [...(c.invites || []), el.dataset.work] });
    route();
  },
  circleAdvisor: () => {
    if (!openWhatsApp(t('waCircleAdvisor', { name: circle().name }))) toast(t('ciAdvisorText'));
  },
  circleApprove: () => { fx.set('circle', { ...circle(), status: 'member', since: new Date().toISOString() }); route(); },
  circleReset: () => { fx.set('circle', null); route(); },
  joinPro: () => {
    if (BOOKING.live || whopLink('pro')) return checkout({ title: 'Museo Abreu Pro', price: 25, period: 'month', link: whopLink('pro'), provider: 'Whop' });
    const name = profile.name.trim() || 'Miembro Pro';
    fx.set('member', { id: proCode(), name, since: new Date().toISOString() });
    toast(t('joinedPro'));
    route();
  },
  leavePro: () => { fx.set('member', null); route(); },
};

const EXTRA_FORMS = {
  circleRequest: () => {
    const v = id => document.getElementById(id).value.trim();
    const opt = id => { const el = document.getElementById(id); return el.options[el.selectedIndex].text; };
    profile.name = v('ci-name'); profile.email = v('ci-email'); save();
    if (BOOKING.live) {
      openWhatsApp(t('waCircleRequest', { name: v('ci-name'), email: v('ci-email'), phone: v('ci-phone'), city: v('ci-city') || '—',
        source: opt('ci-source'), intent: opt('ci-intent'), work: v('ci-work') ? L(workById(v('ci-work')).title) : '—', referral: v('ci-ref') || '—', msg: v('ci-msg') }));
    }
    fx.set('circle', { status: 'pending', name: v('ci-name'), email: v('ci-email'), phone: v('ci-phone'), city: v('ci-city'), source: v('ci-source'),
      intent: v('ci-intent'), work: v('ci-work'), referral: v('ci-ref'), message: v('ci-msg'), at: new Date().toISOString() });
    window.scrollTo(0, 0);
    route();
  },
  circleViewing: () => {
    const v = id => document.getElementById(id).value.trim();
    const el = document.getElementById('cv-type'), type = el.options[el.selectedIndex].text, c = circle();
    if (BOOKING.live) openWhatsApp(t('waCircleViewing', { name: c.name, type, work: v('cv-work') ? L(workById(v('cv-work')).title) : '—', date: v('cv-date') || '—', msg: v('cv-msg') }));
    else toast(t('ciViewingSent'));
    fx.set('circle', { ...c, viewings: [...(c.viewings || []), { type: v('cv-type'), work: v('cv-work'), date: v('cv-date'), message: v('cv-msg'), at: new Date().toISOString() }] });
    route();
  },
};

/* ---------- Public (live) wording ---------- */

Object.assign(I18N.es, {
  sendWhatsApp: 'Enviar reserva por WhatsApp', requestedTitle: '¡Solicitud enviada!',
  requestedText: 'Te abrimos WhatsApp con tu reserva. El museo te confirmará la disponibilidad y la forma de pago.',
  openWAagain: 'Abrir WhatsApp otra vez', couplesN: '{n} pareja(s)', peopleN: '{n} persona(s)',
  waBookMsg: 'Hola, quiero reservar: {exp} · {date} a las {time} · guía en {glang} · {qty} · Total aprox. {total}. Nombre: {name}. Email: {email}.',
  waBuyBook: 'Hola, quiero comprar el libro Ecce Homo de Oscar Abreu, edición en {lang} ({price}).',
  waPrivateTour: 'Hola, quiero un tour privado para {size} personas. Fecha preferida: {date}. Nombre: {name}. {msg}',
  waPro: 'Hola, quiero hacerme miembro Pro del Museo Abreu.',
  waClub: 'Hola, quiero unirme al {club} del Museo Abreu.',
  waSponsor: 'Hola, quiero patrocinar una clase de pintura con {amount}.',
  waNotify: 'Hola, avísenme cuando abran las entradas de {event}.',
});
Object.assign(I18N.en, {
  sendWhatsApp: 'Send booking via WhatsApp', requestedTitle: 'Request sent!',
  requestedText: 'We opened WhatsApp with your booking. The museum will confirm availability and how to pay.',
  openWAagain: 'Open WhatsApp again', couplesN: '{n} couple(s)', peopleN: '{n} person(s)',
  waBookMsg: 'Hello, I would like to book: {exp} · {date} at {time} · guide in {glang} · {qty} · Approx. total {total}. Name: {name}. Email: {email}.',
  waBuyBook: 'Hello, I would like to buy the book Ecce Homo by Oscar Abreu, {lang} edition ({price}).',
  waPrivateTour: 'Hello, I would like a private tour for {size} people. Preferred date: {date}. Name: {name}. {msg}',
  waPro: 'Hello, I would like to become a Pro member of Museo Abreu.',
  waClub: 'Hello, I would like to join the Museo Abreu {club}.',
  waSponsor: 'Hello, I would like to sponsor a painting class with {amount}.',
  waNotify: 'Hello, please let me know when tickets open for {event}.',
});
Object.assign(I18N.fr, {
  sendWhatsApp: 'Envoyer la réservation par WhatsApp', requestedTitle: 'Demande envoyée !',
  requestedText: 'Nous avons ouvert WhatsApp avec votre réservation. Le musée confirmera la disponibilité et le mode de paiement.',
  openWAagain: 'Rouvrir WhatsApp', couplesN: '{n} couple(s)', peopleN: '{n} personne(s)',
  waBookMsg: 'Bonjour, je souhaite réserver : {exp} · {date} à {time} · guide en {glang} · {qty} · Total env. {total}. Nom : {name}. E-mail : {email}.',
  waBuyBook: 'Bonjour, je souhaite acheter le livre Ecce Homo d’Oscar Abreu, édition en {lang} ({price}).',
  waPrivateTour: 'Bonjour, je souhaite une visite privée pour {size} personnes. Date souhaitée : {date}. Nom : {name}. {msg}',
  waPro: 'Bonjour, je souhaite devenir membre Pro du Museo Abreu.',
  waClub: 'Bonjour, je souhaite rejoindre le {club} du Museo Abreu.',
  waSponsor: 'Bonjour, je souhaite offrir un cours de peinture avec {amount}.',
  waNotify: 'Bonjour, prévenez-moi à l’ouverture de la billetterie de {event}.',
});

if (BOOKING.live) {
  Object.assign(I18N.es, {
    illustrative: 'Precios sujetos a confirmación del museo', sponsorBtn: 'Aportar {amount} por WhatsApp',
    joinPro: 'Solicitar membresía Pro por WhatsApp', joinClub: 'Unirme por WhatsApp', notifyMe: 'Avísame por WhatsApp',
    sendRequest: 'Enviar por WhatsApp',
    requestSent: 'Abrimos WhatsApp para enviar tu solicitud.', 
    buy: 'Comprar {price} por WhatsApp', 
  });
  Object.assign(I18N.en, {
    illustrative: 'Prices subject to confirmation by the museum', sponsorBtn: 'Give {amount} via WhatsApp',
    joinPro: 'Request Pro membership via WhatsApp', joinClub: 'Join via WhatsApp', notifyMe: 'Notify me via WhatsApp',
    sendRequest: 'Send via WhatsApp',
    requestSent: 'We opened WhatsApp to send your request.', 
    buy: 'Buy {price} via WhatsApp', 
  });
  Object.assign(I18N.fr, {
    illustrative: 'Prix sous réserve de confirmation par le musée', sponsorBtn: 'Donner {amount} par WhatsApp',
    joinPro: 'Demander l’adhésion Pro par WhatsApp', joinClub: 'Rejoindre par WhatsApp', notifyMe: 'Me prévenir par WhatsApp',
    sendRequest: 'Envoyer par WhatsApp',
    requestSent: 'Nous avons ouvert WhatsApp pour envoyer votre demande.', 
    buy: 'Acheter {price} par WhatsApp', 
  });
}
