// The app's three money sections: Auction (#/subasta), Shop (#/tienda) and the events already in
// features.js. The bottom menu is Home · Events · Auction · Shop · Account.
//
// Auction: online bidding through api/auction.js until each lot's close, then the auction ends
// live in the room when AUCTION.live names an event (auction-config.js); otherwise online only. Shop: the printed and digital Ecce Homo.

Object.assign(I18N.es, {
  navAuction: 'Subasta', navShop: 'Tienda',
  auEyebrow: 'Subasta · Museo Abreu', auTitle: 'Subasta de obras de Oscar Abreu',
  auLead: 'Pinturas y esculturas en subasta. Puje en línea hasta el cierre; la subasta termina en vivo en la {event}.',
  auExampleNote: 'Obras de ejemplo: el museo publicará los lotes reales, sus precios de salida y la fecha de cierre.',
  auExample: 'Ejemplo', auLot: 'Lote {n}', auPainting: 'Pintura', auSculpture: 'Escultura', auSculptureN: 'Escultura n.º {n}', auDrawing: 'Dibujo', auDrawingN: 'Dibujo n.º {n}', auGalleryN: 'Pintura de la galería n.º {n}',
  auStart: 'Precio de salida', auCurrent: 'Puja actual', auBidsN: '{n} pujas', auBid1: '1 puja', auNoBids: 'Sin pujas todavía', auTba: 'Por anunciar',
  auClosesIn: 'Cierra {time}', auClosesOn: 'Puja en línea hasta el {date}',
  auClosed: 'Puja en línea cerrada. La puja más alta pasa a la sala.', auClosedOnline: 'Subasta cerrada. Gana la puja más alta.',
  auLeadOnline: 'Pinturas y esculturas en subasta. Puje en línea hasta el cierre; gana la puja más alta.', auLiveAt: 'Final en vivo: {event}, {date}',
  auView: 'Ver lote', auYourBid: 'Su puja (USD)', auMin: 'Mínimo {amount}', auBidBtn: 'Pujar',
  auTerms: 'Entiendo que mi puja es un compromiso de compra si resulta ganadora. El museo me contactará para confirmar.',
  auThanks: 'Puja registrada: {amount}. Usted es el mejor postor.', auTooLow: 'Otra persona pujó más. La puja mínima ahora es {amount}.',
  auErr: 'No se pudo registrar la puja. Inténtelo de nuevo.', auAccept: 'Marque la casilla para confirmar su puja.',
  auNotOpen: 'La puja en línea abrirá cuando el museo publique el precio de salida y la fecha de cierre.',
  auInterest: 'Avisarme cuando abra', waAuInterest: 'Hola, me interesa el {lot} de la subasta: {title}.',
  auHistory: 'Pujas', auWinner: 'El museo contacta al ganador para el pago y la entrega.', auBack: 'Todos los lotes',
  auLiveOff: 'Las pujas en vivo no están disponibles ahora.',
  shTitle: 'Tienda', shLead: 'El libro Ecce Homo, impreso y digital, y las obras en subasta.', shLeadBook: 'El libro Ecce Homo, impreso y digital.',
  shDigitalAll: 'En {n} idiomas · Para leer en esta app.', shChoose: 'Elegir edición', auSoon: 'El museo publicará aquí las obras, sus precios de salida y la fecha de cierre.',
  shBook: 'El libro', shPrint: 'Libro impreso', shPrintSub: 'Edición en español · Ediciones ARTFORO',
  shPrintNote: 'Recogida en el museo o envío; el museo confirma la entrega.',
  shDigital: 'Edición digital', shDigitalNote: 'Para leer en esta app.', shOrder: 'Pedir',
  shAuctionTitle: 'En subasta', shAllLots: 'Ver la subasta',
});
Object.assign(I18N.en, {
  navAuction: 'Auction', navShop: 'Shop',
  auEyebrow: 'Auction · Museo Abreu', auTitle: 'Auction of works by Oscar Abreu',
  auLead: 'Paintings and sculptures at auction. Bid online until the close; the auction ends live at the {event}.',
  auExampleNote: 'Example lots: the museum will publish the real lots, their starting bids and the closing date.',
  auExample: 'Example', auLot: 'Lot {n}', auPainting: 'Painting', auSculpture: 'Sculpture', auSculptureN: 'Sculpture no. {n}', auDrawing: 'Drawing', auDrawingN: 'Drawing no. {n}', auGalleryN: 'Gallery painting no. {n}',
  auStart: 'Starting bid', auCurrent: 'Current bid', auBidsN: '{n} bids', auBid1: '1 bid', auNoBids: 'No bids yet', auTba: 'To be announced',
  auClosesIn: 'Closes {time}', auClosesOn: 'Online bidding until {date}',
  auClosed: 'Online bidding closed. The highest bid carries into the room.', auClosedOnline: 'Bidding closed. The highest bid wins.',
  auLeadOnline: 'Paintings and sculptures at auction. Bid online until the close; the highest bid wins.', auLiveAt: 'Live finale: {event}, {date}',
  auView: 'View lot', auYourBid: 'Your bid (USD)', auMin: 'Minimum {amount}', auBidBtn: 'Place bid',
  auTerms: 'I understand my bid is a commitment to buy if it wins. The museum will contact me to confirm.',
  auThanks: 'Bid placed: {amount}. You are the highest bidder.', auTooLow: 'Someone bid higher. The minimum bid is now {amount}.',
  auErr: 'Your bid could not be placed. Please try again.', auAccept: 'Tick the box to confirm your bid.',
  auNotOpen: 'Online bidding opens when the museum publishes the starting bid and closing date.',
  auInterest: 'Notify me when it opens', waAuInterest: 'Hello, I am interested in auction {lot}: {title}.',
  auHistory: 'Bids', auWinner: 'The museum contacts the winner to arrange payment and delivery.', auBack: 'All lots',
  auLiveOff: 'Live bids are unavailable right now.',
  shTitle: 'Shop', shLead: 'The book Ecce Homo, in print and digital, and the works at auction.', shLeadBook: 'The book Ecce Homo, in print and digital.',
  shDigitalAll: 'In {n} languages · To read in this app.', shChoose: 'Choose your edition', auSoon: 'The museum will publish the works, their starting bids and the closing date here.',
  shBook: 'The book', shPrint: 'Printed book', shPrintSub: 'Spanish edition · Ediciones ARTFORO',
  shPrintNote: 'Pick up at the museum or have it shipped; the museum confirms delivery.',
  shDigital: 'Digital edition', shDigitalNote: 'To read in this app.', shOrder: 'Order',
  shAuctionTitle: 'At auction', shAllLots: 'See the auction',
});
Object.assign(I18N.fr, {
  navAuction: 'Enchères', navShop: 'Boutique',
  auEyebrow: 'Enchères · Museo Abreu', auTitle: 'Vente aux enchères d’œuvres d’Oscar Abreu',
  auLead: 'Peintures et sculptures aux enchères. Enchérissez en ligne jusqu’à la clôture ; la vente se termine en direct lors du {event}.',
  auExampleNote: 'Lots d’exemple : le musée publiera les lots réels, leurs mises à prix et la date de clôture.',
  auExample: 'Exemple', auLot: 'Lot {n}', auPainting: 'Peinture', auSculpture: 'Sculpture', auSculptureN: 'Sculpture n° {n}', auDrawing: 'Dessin', auDrawingN: 'Dessin n° {n}', auGalleryN: 'Peinture de la galerie n° {n}',
  auStart: 'Mise à prix', auCurrent: 'Enchère actuelle', auBidsN: '{n} enchères', auBid1: '1 enchère', auNoBids: 'Aucune enchère pour l’instant', auTba: 'À annoncer',
  auClosesIn: 'Clôture {time}', auClosesOn: 'Enchères en ligne jusqu’au {date}',
  auClosed: 'Enchères en ligne closes. L’enchère la plus haute est reprise en salle.', auClosedOnline: 'Enchères closes. L’enchère la plus haute l’emporte.',
  auLeadOnline: 'Peintures et sculptures aux enchères. Enchérissez en ligne jusqu’à la clôture ; l’enchère la plus haute l’emporte.', auLiveAt: 'Finale en direct : {event}, {date}',
  auView: 'Voir le lot', auYourBid: 'Votre enchère (USD)', auMin: 'Minimum {amount}', auBidBtn: 'Enchérir',
  auTerms: 'Je comprends que mon enchère est un engagement d’achat si elle l’emporte. Le musée me contactera pour confirmer.',
  auThanks: 'Enchère enregistrée : {amount}. Vous êtes le meilleur enchérisseur.', auTooLow: 'Quelqu’un a enchéri plus haut. L’enchère minimale est maintenant de {amount}.',
  auErr: 'Votre enchère n’a pas pu être enregistrée. Réessayez.', auAccept: 'Cochez la case pour confirmer votre enchère.',
  auNotOpen: 'Les enchères en ligne ouvriront quand le musée publiera la mise à prix et la date de clôture.',
  auInterest: 'Me prévenir à l’ouverture', waAuInterest: 'Bonjour, le {lot} de la vente m’intéresse : {title}.',
  auHistory: 'Enchères', auWinner: 'Le musée contacte le gagnant pour le paiement et la livraison.', auBack: 'Tous les lots',
  auLiveOff: 'Les enchères en direct sont indisponibles pour le moment.',
  shTitle: 'Boutique', shLead: 'Le livre Ecce Homo, imprimé et numérique, et les œuvres aux enchères.', shLeadBook: 'Le livre Ecce Homo, imprimé et numérique.',
  shDigitalAll: 'En {n} langues · À lire dans cette app.', shChoose: 'Choisir l’édition', auSoon: 'Le musée publiera ici les œuvres, leurs mises à prix et la date de clôture.',
  shBook: 'Le livre', shPrint: 'Livre imprimé', shPrintSub: 'Édition espagnole · Ediciones ARTFORO',
  shPrintNote: 'Retrait au musée ou envoi ; le musée confirme la livraison.',
  shDigital: 'Édition numérique', shDigitalNote: 'À lire dans cette app.', shOrder: 'Commander',
  shAuctionTitle: 'Aux enchères', shAllLots: 'Voir la vente',
});

// The printed Ecce Homo (Spanish, French, German, Russian, Italian, Portuguese and Japanese editions, all printed by Amigo del Hogar
// per their credits pages). Prices pending: until set, orders go to WhatsApp with "Price confirmed by
// the museum". Whop keys: book-print-es, book-print-fr, book-print-de, book-print-ru, book-print-it, book-print-pt, book-print-ja.
const PRINT_EDITIONS = [
  { lang: 'es', price: 149.99, key: 'book-print-es', name: { es: 'Edición en español', en: 'Spanish edition', fr: 'Édition espagnole' } },
  { lang: 'fr', price: 149.99, key: 'book-print-fr', name: { es: 'Edición en francés', en: 'French edition', fr: 'Édition française' } },
  { lang: 'de', price: 149.99, key: 'book-print-de', name: { es: 'Edición en alemán', en: 'German edition', fr: 'Édition allemande' } },
  { lang: 'ru', price: 149.99, key: 'book-print-ru', name: { es: 'Edición en ruso', en: 'Russian edition', fr: 'Édition russe' } },
  { lang: 'it', price: 149.99, key: 'book-print-it', name: { es: 'Edición en italiano', en: 'Italian edition', fr: 'Édition italienne' } },
  { lang: 'pt', price: 149.99, key: 'book-print-pt', name: { es: 'Edición en portugués', en: 'Portuguese edition', fr: 'Édition portugaise' } },
  { lang: 'ja', price: 149.99, key: 'book-print-ja', name: { es: 'Edición en japonés', en: 'Japanese edition', fr: 'Édition japonaise' } },
];
const printSub = p => L(p.name) + ' · Ediciones ARTFORO';

/* ---------- Auction ---------- */

const auUSD = n => 'USD ' + money(Number(n));
let auState = null, auFailed = false, auTimer = null;

// The auction as a live room: the work with the highest bid leads the page, a countdown runs to each close,
// and a leaderboard names the highest bidders (by name if they chose so, by initials otherwise).
Object.assign(I18N.es, { auFromFR: 'Francia', auFromES: 'España', auEssayNoteEs: 'Texto publicado en ART GABANGI · Top 100 Artist.', auEssayNoteTrEs: 'Texto publicado en ART GABANGI · Top 100 Artist.', auFromCU: 'Cuba', auFromPE: 'Perú', auPrevArtist: 'Artista anterior', auNextArtists: 'Siguientes artistas', auToArtist: 'Ir a {name}', auNextArtist: 'Siguiente artista', auEssayNoteTr: 'Traducción del museo del texto publicado en inglés en ART GABANGI · Top 100 Artist.', auCritique: 'Crítica', auStory: 'La historia de {name}', auStoryPrev: 'Anterior', auStoryNext: 'Siguiente', auPause: 'Pausa', auPlay: 'Reproducir', auSeeWorks: 'Ver sus obras', auStartAt: 'Pujas desde',
  auFromPR: 'Puerto Rico', auBio: 'Biografía', auSources: 'Fuentes',
  auAboutArtist: 'Sobre el artista', auReadAll: 'Leer el texto completo', auEssayNote: 'Texto publicado en ART GABANGI · Top 100 Artist (en inglés).', auBioNote: 'Biografía publicada en oscarabreu.com.',
  auPrev: 'Obra anterior', auNext: 'Obra siguiente', auOfN: 'Obra {i} de {n}', auWorksOf: 'Obras de {name}', auAboutWork: 'Sobre la obra', auBidThis: 'Pujar por esta obra',
  auArtistsH: 'Los artistas', auArtistsLead: '{n} artistas. Elija uno para entrar en su sala y ver sus obras en subasta.', auWorksN: '{n} obras', auWork1: '1 obra', auBackArtists: 'Todos los artistas', auRoom: 'Sala', auAllWorks: 'Ver todas las obras ({n})', auAllWorksH: 'Todas las obras', auPaintings: 'Pinturas', auSculptures: 'Esculturas', auDrawings: 'Dibujos', auRoomBoard: 'Pujas más altas en esta sala', auEnterRoom: 'Ver sus obras',
  auCatBook: 'Top 100 Artist', auCatOscar: 'Pinturas · Oscar Abreu', auCatSculpture: 'Esculturas · Oscar Abreu', auCatDrawing: 'Dibujos · Oscar Abreu', auCatAll: 'Todas', auCats: 'Ver obras', auAllArtists: 'Todos los artistas', auArtistPick: 'Artista', auMore: 'Ver más ({n})', auShowing: '{a} de {b} obras', auBoardAll: 'Ver la tabla completa', auAllClose: 'Todas las obras cierran el {date}.', auFindH: "Buscar en la subasta", auFindLead: "{n} obras de {a} artistas", auFindLabel: "Buscar entre las obras", auFindPh: "Artista, título, color, año…", auFindGo: "Buscar", auColor: "Color", auSizeF: "Tamaño", auSizeS: "Pequeña", auSizeM: "Mediana", auSizeL: "Grande", auSort: "Ordenar", auSortBook: "Orden del libro", auSortBids: "Más pujas", auSortNew: "Más recientes", auSortOld: "Más antiguas", auSortBig: "Más grandes", auSortSmall: "Más pequeñas", auSortAZ: "Artista A–Z", auUnderstood: "Buscando:", auClear: "Borrar filtros", auSurprise: "Descubrir una obra", auNone: "Ninguna obra coincide. Pruebe con menos palabras o borre los filtros.", auDecade: "Años {d}", auPriceMax: "Hasta {p}", auPriceMin: "Desde {p}", auColRed: "Rojo", auColOrange: "Naranja", auColYellow: "Amarillo", auColGreen: "Verde", auColBlue: "Azul", auColPink: "Rosa", auColBrown: "Marrón", auColBlack: "Negro", auColWhite: "Blanco", auColGrey: "Gris",
  auInfo: 'Detalles', auAsk: 'Preguntar por esta obra', auFrom: 'República Dominicana', auBorn: 'n. {y}', auArtist: 'Artista', auType: 'Tipo', auMedium: 'Técnica', auSize: 'Medidas', auAboutOscar: 'Sobre Oscar Abreu', auOpenLot: 'Ver lote y pujar', auSrcBook: 'ART GABANGI · Top 100 Artist',
  auTitleAll: 'Subasta Museo Abreu', auFeatured: 'Obra destacada', auTopBid: 'La puja más alta', auLeader: 'Lidera: {name}', auFirst: 'Sea el primero en pujar',
  auBidNow: 'Pujar ahora', auBoard: 'Tabla de líderes', auBoardLead: 'Los mayores pujadores, reconocidos por su nombre.',
  auBoardEmpty: 'Aún no hay pujas. La primera puja abre la tabla.', auShowName: 'Mostrar mi nombre en la tabla de líderes (si no, solo mis iniciales)',
  auQuick: 'Puja rápida', auEndsIn: 'Cierra en', auD: 'días', auH: 'horas', auM: 'min', auS: 'seg', auEnded: 'Cerrada',
  auSoft: 'Una puja en los últimos 2 minutos extiende el cierre 2 minutos.', auIncr: 'Pujas desde {start}, en incrementos de {inc}.' });
Object.assign(I18N.en, { auFromFR: 'France', auFromES: 'Spain', auEssayNoteEs: 'Published in Spanish in ART GABANGI · Top 100 Artist.', auEssayNoteTrEs: 'The museum’s translation of the text published in Spanish in ART GABANGI · Top 100 Artist.', auFromCU: 'Cuba', auFromPE: 'Peru', auPrevArtist: 'Previous artist', auNextArtists: 'Next artists', auToArtist: 'Go to {name}', auNextArtist: 'Next artist', auEssayNoteTr: 'As published in ART GABANGI · Top 100 Artist.', auCritique: 'Critique', auStory: 'The story of {name}', auStoryPrev: 'Previous', auStoryNext: 'Next', auPause: 'Pause', auPlay: 'Play', auSeeWorks: 'See the works', auStartAt: 'Bids from',
  auFromPR: 'Puerto Rico', auBio: 'Biography', auSources: 'Sources',
  auAboutArtist: 'About the artist', auReadAll: 'Read the full text', auEssayNote: 'As published in ART GABANGI · Top 100 Artist.', auBioNote: 'Biography as published on oscarabreu.com.',
  auPrev: 'Previous work', auNext: 'Next work', auOfN: 'Work {i} of {n}', auWorksOf: 'Works by {name}', auAboutWork: 'About the work', auBidThis: 'Bid on this work',
  auArtistsH: 'The artists', auArtistsLead: '{n} artists. Choose one to enter their room and see their works at auction.', auWorksN: '{n} works', auWork1: '1 work', auBackArtists: 'All artists', auRoom: 'Room', auAllWorks: 'See all works ({n})', auAllWorksH: 'All works', auPaintings: 'Paintings', auSculptures: 'Sculptures', auDrawings: 'Drawings', auRoomBoard: 'Highest bids in this room', auEnterRoom: 'See their works',
  auCatBook: 'Top 100 Artist', auCatOscar: 'Paintings · Oscar Abreu', auCatSculpture: 'Sculptures · Oscar Abreu', auCatDrawing: 'Drawings · Oscar Abreu', auCatAll: 'All', auCats: 'Browse works', auAllArtists: 'All artists', auArtistPick: 'Artist', auMore: 'Show more ({n})', auShowing: '{a} of {b} works', auBoardAll: 'See the full leaderboard', auAllClose: 'All works close on {date}.', auFindH: "Search the sale", auFindLead: "{n} works by {a} artists", auFindLabel: "Search the works", auFindPh: "Artist, title, colour, year…", auFindGo: "Search", auColor: "Colour", auSizeF: "Size", auSizeS: "Small", auSizeM: "Medium", auSizeL: "Large", auSort: "Sort", auSortBook: "Book order", auSortBids: "Most bids", auSortNew: "Newest", auSortOld: "Oldest", auSortBig: "Largest", auSortSmall: "Smallest", auSortAZ: "Artist A–Z", auUnderstood: "Looking for:", auClear: "Clear filters", auSurprise: "Discover a work", auNone: "No work matches. Try fewer words or clear the filters.", auDecade: "{d}s", auPriceMax: "Up to {p}", auPriceMin: "From {p}", auColRed: "Red", auColOrange: "Orange", auColYellow: "Yellow", auColGreen: "Green", auColBlue: "Blue", auColPink: "Pink", auColBrown: "Brown", auColBlack: "Black", auColWhite: "White", auColGrey: "Grey",
  auInfo: 'Details', auAsk: 'Ask about this work', auFrom: 'Dominican Republic', auBorn: 'b. {y}', auArtist: 'Artist', auType: 'Type', auMedium: 'Medium', auSize: 'Size', auAboutOscar: 'About Oscar Abreu', auOpenLot: 'View lot and bid', auSrcBook: 'ART GABANGI · Top 100 Artist',
  auTitleAll: 'Museo Abreu Auction', auFeatured: 'Featured work', auTopBid: 'Highest bid', auLeader: 'Leading: {name}', auFirst: 'Be the first to bid',
  auBidNow: 'Bid now', auBoard: 'Leaderboard', auBoardLead: 'The highest bidders, recognized by name.',
  auBoardEmpty: 'No bids yet. The first bid opens the board.', auShowName: 'Show my name on the leaderboard (otherwise only my initials)',
  auQuick: 'Quick bid', auEndsIn: 'Ends in', auD: 'days', auH: 'hrs', auM: 'min', auS: 'sec', auEnded: 'Closed',
  auSoft: 'A bid in the last 2 minutes extends the close by 2 minutes.', auIncr: 'Bids from {start}, in steps of {inc}.' });
Object.assign(I18N.fr, { auFromFR: 'France', auFromES: 'Espagne', auEssayNoteEs: 'Texte publié dans ART GABANGI · Top 100 Artist (en espagnol).', auEssayNoteTrEs: 'Traduction du musée du texte publié en espagnol dans ART GABANGI · Top 100 Artist.', auFromCU: 'Cuba', auFromPE: 'Pérou', auPrevArtist: 'Artiste précédent', auNextArtists: 'Artistes suivants', auToArtist: 'Aller à {name}', auNextArtist: 'Artiste suivant', auEssayNoteTr: 'Traduction du musée du texte publié en anglais dans ART GABANGI · Top 100 Artist.', auCritique: 'Critique', auStory: 'L’histoire de {name}', auStoryPrev: 'Précédent', auStoryNext: 'Suivant', auPause: 'Pause', auPlay: 'Lecture', auSeeWorks: 'Voir les œuvres', auStartAt: 'Enchères dès',
  auFromPR: 'Porto Rico', auBio: 'Biographie', auSources: 'Sources',
  auAboutArtist: 'À propos de l’artiste', auReadAll: 'Lire le texte intégral', auEssayNote: 'Texte publié dans ART GABANGI · Top 100 Artist (en anglais).', auBioNote: 'Biographie publiée sur oscarabreu.com.',
  auPrev: 'Œuvre précédente', auNext: 'Œuvre suivante', auOfN: 'Œuvre {i} sur {n}', auWorksOf: 'Œuvres de {name}', auAboutWork: 'À propos de l’œuvre', auBidThis: 'Enchérir sur cette œuvre',
  auArtistsH: 'Les artistes', auArtistsLead: '{n} artistes. Choisissez-en un pour entrer dans sa salle et voir ses œuvres aux enchères.', auWorksN: '{n} œuvres', auWork1: '1 œuvre', auBackArtists: 'Tous les artistes', auRoom: 'Salle', auAllWorks: 'Voir toutes les œuvres ({n})', auAllWorksH: 'Toutes les œuvres', auPaintings: 'Peintures', auSculptures: 'Sculptures', auDrawings: 'Dessins', auRoomBoard: 'Enchères les plus hautes de cette salle', auEnterRoom: 'Voir ses œuvres',
  auCatBook: 'Top 100 Artist', auCatOscar: 'Peintures · Oscar Abreu', auCatSculpture: 'Sculptures · Oscar Abreu', auCatDrawing: 'Dessins · Oscar Abreu', auCatAll: 'Toutes', auCats: 'Parcourir les œuvres', auAllArtists: 'Tous les artistes', auArtistPick: 'Artiste', auMore: 'Voir plus ({n})', auShowing: '{a} sur {b} œuvres', auBoardAll: 'Voir le classement complet', auAllClose: 'Toutes les œuvres ferment le {date}.', auFindH: "Rechercher dans la vente", auFindLead: "{n} œuvres de {a} artistes", auFindLabel: "Rechercher parmi les œuvres", auFindPh: "Artiste, titre, couleur, année…", auFindGo: "Rechercher", auColor: "Couleur", auSizeF: "Taille", auSizeS: "Petite", auSizeM: "Moyenne", auSizeL: "Grande", auSort: "Trier", auSortBook: "Ordre du livre", auSortBids: "Plus d’enchères", auSortNew: "Plus récentes", auSortOld: "Plus anciennes", auSortBig: "Plus grandes", auSortSmall: "Plus petites", auSortAZ: "Artiste A–Z", auUnderstood: "Recherche :", auClear: "Effacer les filtres", auSurprise: "Découvrir une œuvre", auNone: "Aucune œuvre ne correspond. Essayez avec moins de mots ou effacez les filtres.", auDecade: "Années {d}", auPriceMax: "Jusqu’à {p}", auPriceMin: "À partir de {p}", auColRed: "Rouge", auColOrange: "Orange", auColYellow: "Jaune", auColGreen: "Vert", auColBlue: "Bleu", auColPink: "Rose", auColBrown: "Brun", auColBlack: "Noir", auColWhite: "Blanc", auColGrey: "Gris",
  auInfo: 'Détails', auAsk: 'Se renseigner sur cette œuvre', auFrom: 'République dominicaine', auBorn: 'né(e) en {y}', auArtist: 'Artiste', auType: 'Type', auMedium: 'Technique', auSize: 'Dimensions', auAboutOscar: 'À propos d’Oscar Abreu', auOpenLot: 'Voir le lot et enchérir', auSrcBook: 'ART GABANGI · Top 100 Artist',
  auTitleAll: 'Vente aux enchères Museo Abreu', auFeatured: 'Œuvre à la une', auTopBid: 'Enchère la plus haute', auLeader: 'En tête : {name}', auFirst: 'Soyez le premier à enchérir',
  auBidNow: 'Enchérir', auBoard: 'Classement', auBoardLead: 'Les meilleurs enchérisseurs, cités par leur nom.',
  auBoardEmpty: 'Aucune enchère pour l’instant. La première ouvre le classement.', auShowName: 'Afficher mon nom au classement (sinon, seulement mes initiales)',
  auQuick: 'Enchère rapide', auEndsIn: 'Clôture dans', auD: 'jours', auH: 'h', auM: 'min', auS: 's', auEnded: 'Close',
  auSoft: 'Une enchère dans les 2 dernières minutes prolonge la clôture de 2 minutes.', auIncr: 'Enchères à partir de {start}, par paliers de {inc}.' });

const auSt = lot => (auState && auState[lot.id]) || null;
const auCloses = lot => lotCloses(lot, auSt(lot));
const auOpen = lot => lotOpen(lot, Date.now(), auSt(lot));
const lotValue = lot => (auSt(lot) && auSt(lot).high) || lot.startBid || 0;
// The work that leads the page: the open lot with the highest bid (or opening bid); with none open, the highest of all.
function auFeatured() {
  const open = auLots().filter(auOpen), pool = open.length ? open : auLots();
  return pool.slice().sort((a, b) => lotValue(b) - lotValue(a))[0];
}

// Countdowns: every [data-cd] element shows the time left to its close and is refreshed each second; when a
// close passes, the bids are fetched again (a soft close may have moved it) and the page redrawn.
function cdHTML(iso, big) {
  return `<span class="cd${big ? ' cd-big' : ''}" data-cd="${iso}" role="timer">${cdText(iso, big)}</span>`;
}
function cdText(iso, big) {
  const ms = Date.parse(iso) - Date.now();
  if (ms <= 0) return `<span class="cd-end">${t('auEnded')}</span>`;
  const s = Math.floor(ms / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
  const two = n => String(n).padStart(2, '0');
  if (!big) return (d ? `${d} ${t('auD')} ` : '') + `${two(h)}:${two(m)}:${two(x)}`;
  return [[d, 'auD'], [h, 'auH'], [m, 'auM'], [x, 'auS']].filter((p, i) => i || d).map(([n, k]) => `<span class="cd-u"><b>${two(n)}</b><small>${t(k)}</small></span>`).join('');
}
let cdBusy = false;
setInterval(() => {
  let ended = false;
  document.querySelectorAll('[data-cd]').forEach(el => {
    const left = Date.parse(el.dataset.cd) - Date.now();
    el.innerHTML = cdText(el.dataset.cd, el.classList.contains('cd-big'));
    el.classList.toggle('cd-soon', left > 0 && left < 3.6e6);
    if (left <= 0 && !el.dataset.done) { el.dataset.done = '1'; ended = true; }
  });
  if (ended && !cdBusy) { cdBusy = true; fetchAuction().then(() => { cdBusy = false; if (!document.activeElement || !document.activeElement.closest('form')) route(); }); }
}, 1000);

// The leaderboard: rank, name (or initials), best bid, and on the auction page the work it is for.
function auBoardHTML(rows, withLot, top) {
  if (!rows.length) return `<p class="muted">${t('auBoardEmpty')}</p>`;
  const li = (r, i) => `<li class="au-rank${i < 3 ? ' r' + (i + 1) : ''}">
    <span class="au-pos" aria-hidden="true">${i + 1}</span>
    <span class="au-who">${esc(r.who || '—')}${withLot ? `<small>${esc(r.lot)}</small>` : ''}</span>
    <strong class="au-amt">${auUSD(r.amount)}</strong></li>`;
  // With `top`, the first rows show and the rest fold away.
  if (!top || rows.length <= top) return `<ol class="au-board">${rows.map(li).join('')}</ol>`;
  return `<ol class="au-board">${rows.slice(0, top).map(li).join('')}</ol>
    <details class="au-board-more"><summary>${t('auBoardAll')}</summary><ol class="au-board" start="${top + 1}">${rows.slice(top).map((r, i) => li(r, i + top)).join('')}</ol></details>`;
}
function auAllLeaders() {
  return auLots().flatMap(l => ((auSt(l) && auSt(l).leaders) || []).map(r => ({ ...r, lot: lotTitle(l) })))
    .sort((a, b) => b.amount - a.amount).slice(0, 10);
}
// The featured work: large picture, current bid, who leads, the countdown and the way to bid.
function auFeatureHTML(lot, h = 'h2') {
  if (!lot) return '';
  if (!auState && !auFailed) fetchAuction().then(() => { if (document.querySelector('.au-feature')) route(); });
  const s = auSt(lot) || {}, c = auCloses(lot), open = auOpen(lot), lead = s.leaders && s.leaders[0];
  // The countdown lives in the top bar; once bidding closes, the card says so on top. Under the title, its year; under that, its size (or medium when the size is not known).
  const [year, medium, size] = lotFacts(lot), title = lotTitle(lot).replace(/\s*\([^)]*\)\s*$/, '');
  return `<article class="au-feature">
    ${c && !open ? `<div class="au-feature-cd au-feature-top"><span class="cd-end">${t(auClosedKey())}</span></div>` : ''}
    <a class="au-feature-img" href="#/subasta/${lot.id}" tabindex="-1" aria-hidden="true"><img src="${lot.img}" alt="" width="${lot.w || 1000}" height="${lot.h || 1000}"></a>
    <div class="au-feature-body">
      <p class="eyebrow">${t(s.count ? 'auTopBid' : 'auFeatured')} · ${t('auLot', { n: lotNumber(lot) })}</p>
      <${h} class="au-feature-title"><a href="#/subasta/${lot.id}">${esc(title)}</a>${year ? ` <span class="au-feature-year">${esc(String(year))}</span>` : ''}</${h}>
      ${size || medium ? `<p class="au-feature-size">${esc(size || medium)}</p>` : ''}
      <p class="au-feature-price"><small>${t(s.count ? 'auCurrent' : 'auStart')}</small>${auUSD(s.count ? s.high : lot.startBid)}</p>
      <p class="au-feature-lead">${lead ? `<span class="au-crown" aria-hidden="true">♛</span> ${esc(t('auLeader', { name: lead.who }))}` : t('auFirst')}</p>
      <div class="btn-row"><button class="btn primary" data-action="lotInfo" data-lot="${lot.id}" aria-label="${esc(t('auInfo') + ': ' + lotTitle(lot))}">${t('auInfo')}</button>
        ${open ? `<a class="btn primary au-bid-now" href="#/subasta/${lot.id}">${t('auBidNow')}</a>` : ''}</div>
    </div>
  </article>`;
}

function lotTitle(lot) {
  const w = lot.work && workById(lot.work);
  if (w) return L(w.title);
  if (lot.gallery) return t('auGalleryN', { n: lot.gallery });
  return lot.title ? L(lot.title) : t(lot.kind === 'drawing' ? 'auDrawingN' : 'auSculptureN', { n: lot.n });
}
const lotArtist = lot => lot.artist || 'Oscar Abreu';
// A picture that is far from square (a diptych, a tall canvas) is shown whole rather than cropped.
const lotFit = lot => lot.w && lot.h && Math.abs(lot.w / lot.h - 1) > .15 ? ' class="contain"' : '';
// The auction's title names Oscar Abreu while every work is his; with other artists' works, the museum's.
const auTitleText = () => t(auLots().some(l => l.artist) ? 'auTitleAll' : 'auTitle');
// Numbered among the published lots (the example ones are left out), in the order of auction-config.js.
const lotNumber = lot => (lot.example ? AUCTION.lots : auLots()).indexOf(lot) + 1;
// Lots shown to visitors: the real ones. Example lots (example: true in auction-config.js) appear nowhere, and
// until a real lot is published the auction is out of the menus (the bottom tab opens the book instead).
const auLots = () => AUCTION.lots.filter(l => !l.example);
const shLeadText = () => t(auLots().length ? 'shLead' : 'shLeadBook');
if (!auLots().length) {
  document.querySelectorAll('header [data-route="subasta"]').forEach(a => a.remove());
  const tab = document.querySelector('.tabbar [data-route="subasta"]');
  if (tab) { tab.href = '#/biblioteca'; tab.dataset.route = 'biblioteca'; tab.innerHTML = '<span class="ti">✦</span><span data-i18n="tabLibrary">Libro</span>'; }
}
const lotKind = lot => t({ sculpture: 'auSculpture', drawing: 'auDrawing' }[lot.kind] || 'auPainting');
function liveFinale() {
  if (!AUCTION.live) return null;
  const gb = EVENTS.find(e => e.id === AUCTION.live.event), tier = gb.tiers.find(x => x.id === AUCTION.live.tier);
  return { name: `${L(tier.name)} · ${eventTitle(gb)}`, date: addDays(eventDate(gb), tier.day), time: tier.time };
}
function relTime(iso) {
  const ms = Date.parse(iso) - Date.now(), rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  const d = ms / 864e5, h = ms / 36e5;
  return Math.abs(d) >= 1 ? rtf.format(Math.round(d), 'day') : Math.abs(h) >= 1 ? rtf.format(Math.round(h), 'hour') : rtf.format(Math.round(ms / 6e4), 'minute');
}
const auClosedKey = () => AUCTION.live ? 'auClosed' : 'auClosedOnline';
const liveLine = fin => fin ? `<p class="lot-live">${t('auLiveAt', { event: esc(fin.name), date: fmtDate(fin.date) + ' · ' + rsvpTime(fin.time) })}</p>` : '';
const dateTime = iso => fmtDate(iso.slice(0, 10), { day: 'numeric', month: 'long' }) + ' · ' + new Date(iso).toLocaleTimeString(lang, { hour: 'numeric', minute: '2-digit', timeZone: 'America/Santo_Domingo' });

async function fetchAuction() {
  try {
    const r = await fetch('/api/auction', { cache: 'no-store' });
    if (!r.ok) throw new Error(r.status);
    auState = (await r.json()).lots; auFailed = false;
  } catch (e) { auFailed = true; }
}
// Refreshes the bids every 20 s while an auction page is open and nobody is typing in the form.
function auPoll() {
  clearInterval(auTimer);
  if (!location.hash.startsWith('#/subasta') || !AUCTION.lots.some(l => auOpen(l))) return;
  auTimer = setInterval(async () => {
    if (!location.hash.startsWith('#/subasta')) return clearInterval(auTimer);
    await fetchAuction();
    if (!document.activeElement || !document.activeElement.closest('form')) route();
  }, 10000);
}

function lotPriceLine(lot) {
  const s = auState && auState[lot.id];
  if (s && s.count) return `<span class="lot-price"><small>${t('auCurrent')}</small>${auUSD(s.high)}</span><span class="muted">${s.count === 1 ? t('auBid1') : t('auBidsN', { n: s.count })}${s.leaders && s.leaders[0] ? ' · ' + esc(t('auLeader', { name: s.leaders[0].who })) : ''}</span>`;
  return `<span class="lot-price"><small>${t('auStart')}</small>${lot.startBid != null ? auUSD(lot.startBid) : t('auTba')}</span>${lot.startBid != null ? `<span class="muted">${t('auNoBids')}</span>` : ''}`;
}
function lotCloseLine(lot, compact) {
  const c = auCloses(lot);
  if (!c) return '';
  // In the list, a lot that closes with all the others says nothing (the page says it once); one a late bid extended says so.
  if (compact && auOpen(lot) && AUCTION.closesAt && Date.parse(c) === Date.parse(AUCTION.closesAt)) return '';
  return auOpen(lot) ? `<p class="lot-close">${t('auEndsIn')} ${cdHTML(c)} · ${t('auClosesOn', { date: dateTime(c) })}</p>` : `<p class="lot-close">${t(auClosedKey())}</p>`;
}
function lotCard(lot, h = 'h3') {
  // Laid out like a sale catalogue: lot number, artist, the title in italics, the facts, then the bid.
  const facts = [lotKind(lot), lot.year].filter(Boolean).join(' · ');
  return `<article class="lot-card">
    <a href="#/subasta/${lot.id}" class="lot-img" tabindex="-1" aria-hidden="true"><img src="${lot.thumb || lot.img}" alt=""${lotFit(lot)} loading="lazy" width="600" height="600"></a>
    <p class="lot-meta">${t('auLot', { n: lotNumber(lot) })}${lot.example ? ` · <span class="chip">${t('auExample')}</span>` : ''}</p>
    <p class="lot-artist">${esc(lotArtist(lot))}</p>
    <${h} class="lot-title"><a href="#/subasta/${lot.id}">${esc(lotTitle(lot))}</a></${h}>
    <p class="lot-facts">${esc(facts)}</p>
    <p class="lot-state">${lotPriceLine(lot)}</p>
    ${lotCloseLine(lot, true)}
    <div class="lot-actions"><a class="lot-go" href="#/subasta/${lot.id}">${t('auView')} <span class="arr" aria-hidden="true">→</span></a>
      <button class="lot-more" data-action="lotInfo" data-lot="${lot.id}" aria-label="${esc(t('auInfo') + ': ' + lotTitle(lot))}">${t('auInfo')}</button></div>
  </article>`;
}

// The auction as a homage to its artists: the page leads with their names; each opens the artist's room, with
// their works (by kind when there are several, twelve at a time with "Show more"). #/subasta/artista-<slug> is a
// room, #/subasta/obras every work.
const auSlug = name => name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// The artists in the order of auction-config.js (the book's, then Oscar Abreu), each with their works.
function auArtists() {
  const by = new Map();
  auLots().forEach(l => { const a = lotArtist(l); if (!by.has(a)) by.set(a, []); by.get(a).push(l); });
  return [...by].map(([name, lots]) => ({ name, slug: auSlug(name), lots }));
}
const auWorksText = n => n === 1 ? t('auWork1') : t('auWorksN', { n });
const auRoomHref = name => `#/subasta/artista-${auSlug(name)}`;
function auArtistsHTML() {
  const list = auArtists();
  return `<section class="section au-artists" id="artistas">
    <h2>${t('auArtistsH')}</h2><p class="muted">${t('auArtistsLead', { n: list.length })}</p>
    <ol class="au-artist-list">${list.map(a => `<li><a class="au-artist" href="${auRoomHref(a.name)}">
      <span class="au-artist-text"><span class="au-artist-name">${esc(a.name)}${auNameYears(a.name)}</span>
        ${artistLine(a.lots[0], true) ? `<span class="au-artist-line">${esc(artistLine(a.lots[0], true))}</span>` : ''}
        ${auEssay(a.name).head ? `<span class="au-artist-head" lang="${auEssay(a.name).headLang}">${esc(auEssay(a.name).head)}</span>` : ''}
        <span class="au-artist-n">${auWorksText(a.lots.length)}</span></span>
      <span class="au-artist-strip" aria-hidden="true">${a.lots.slice(0, 3).map(l => `<img src="${l.thumb || l.img}" alt="" loading="lazy" width="120" height="120">`).join('')}</span>
      <span class="arr" aria-hidden="true">›</span></a></li>`).join('')}</ol>
    <p style="margin-top:1.2rem"><a class="btn" href="#/subasta/obras">${t('auAllWorks', { n: auLots().length })}</a></p>
  </section>`;
}

// A room's works, by kind when it holds several; twelve at a time. The choice lasts while the visitor stays in the
// room (the page re-renders every few seconds with new bids) and starts over in another one.
const AU_KINDS = [['all', 'auCatAll', () => true], ['painting', 'auPaintings', l => l.kind === 'painting'],
  ['sculpture', 'auSculptures', l => l.kind === 'sculpture'], ['drawing', 'auDrawings', l => l.kind === 'drawing']];
const AU_PAGE = 12;
let auScope = '', auCat = 'all', auShow = AU_PAGE, auScopeLots = () => [];
function auBrowseHTML(scope, lots) {
  if (scope !== auScope) { auScope = scope; auCat = 'all'; auShow = AU_PAGE; }
  auScopeLots = () => lots;
  const kinds = AU_KINDS.map(([id, key, f]) => [id, key, lots.filter(f).length]).filter(k => k[2]);
  const multi = kinds.length > 2, cat = multi ? (AU_KINDS.find(k => k[0] === auCat && kinds.some(x => x[0] === k[0])) || AU_KINDS[0]) : AU_KINDS[0];
  const list = lots.filter(cat[2]), shown = list.slice(0, auShow);
  const closes = AUCTION.closesAt && lots.some(auOpen) ? `<p class="muted au-allclose">${t('auAllClose', { date: dateTime(AUCTION.closesAt) })}</p>` : '';
  return `<section class="section au-browse" id="au-browse">
    ${multi ? `<div class="au-cats" role="group" aria-label="${t('auCats')}">${kinds.map(([id, key, n]) =>
      `<button class="au-cat" data-action="auCat" data-cat="${id}" aria-pressed="${id === cat[0]}">${t(key)} <span class="au-n">${n}</span></button>`).join('')}</div>` : ''}
    ${closes}
    <p class="muted au-count" aria-live="polite">${list.length ? t('auShowing', { a: shown.length, b: list.length }) : t('auNone')}</p>
    <div class="lots">${shown.map(l => lotCard(l, 'h2')).join('')}</div>
    ${list.length > shown.length ? `<div class="au-more-row"><button class="btn" data-action="auMore">${t('auMore', { n: list.length - shown.length })}</button></div>` : ''}
  </section>`;
}
// Redraws only the works, keeping the visitor's place and focus.
function auBrowseRedraw(focusSel) {
  const el = document.getElementById('au-browse'); if (!el) return;
  el.outerHTML = auBrowseHTML(auScope, auScope === 'all' ? auFound() : auScopeLots());
  if (typeof loadImagesSoon === 'function') loadImagesSoon();
  const f = focusSel && document.querySelector(focusSel); if (f) f.focus();
}
EXTRA_ACTIONS.auCat = el => { auCat = el.dataset.cat; auShow = AU_PAGE; auBrowseRedraw(`.au-cat[data-cat="${auCat}"]`); };
EXTRA_ACTIONS.auMore = () => {
  const before = auShow; auShow += AU_PAGE; auBrowseRedraw();
  // Focus moves to the first new work, so keyboard and screen-reader users carry on where the list grew.
  const next = document.querySelectorAll('#au-browse .lot-card .lot-title a')[before]; if (next) next.focus();
};

// The finder: one box that understands plain words in any of the app's languages (an artist, a title, a colour,
// a size, a kind of work, a country, a year or decade, a price), colour swatches from each picture's main colours
// (auction-colors.js), sizes from the inches in each work's description, and a sort. It lives on
// #/subasta/obras; the auction page's search box and swatches lead there.
const auNorm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const AU_COLS = [['red', '#b3261e'], ['orange', '#e0782a'], ['yellow', '#e8c22e'], ['green', '#3f8a4a'], ['blue', '#2a5db0'],
  ['pink', '#d9709b'], ['brown', '#7a4e2d'], ['black', '#141210'], ['white', '#f6f3ee'], ['grey', '#8d8a86']];
const auColKey = c => 'auCol' + c[0].toUpperCase() + c.slice(1);
// Words the box understands, by what they mean (accents and capitals do not matter).
const AU_WORDS = {
  col: { red: 'red rojo roja rojos rojas rouge rouges rot rote rosso rossa rossi красный красная أحمر حمراء',
    orange: 'orange orangen naranja naranjas anaranjado anaranjada arancione arancio оранжевый برتقالي',
    yellow: 'yellow amarillo amarilla amarillos jaune jaunes gelb giallo gialla желтый жёлтый أصفر',
    green: 'green verde verdes vert verte grun grün grune оливковый зеленый зелёный أخضر',
    blue: 'blue azul azules bleu bleue bleus blau blu azzurro celeste turquesa turquoise синий голубой أزرق',
    pink: 'pink rosa rosado rosada rose roses fucsia magenta morado morada purple violet violeta lila viola розовый фиолетовый وردي بنفسجي',
    brown: 'brown marron cafe castano brun brune braun marrone коричневый بني',
    black: 'black negro negra negros noir noire schwarz nero nera черный чёрный أسود',
    white: 'white blanco blanca blancos blanc blanche weiss weiß bianco bianca белый أبيض',
    grey: 'grey gray gris grau grigio серый رمادي' },
  size: { S: 'small little pequeno pequena pequenos pequenas chico chica petit petite petits petites klein kleine piccolo piccola mini маленький صغير',
    M: 'medium mediano mediana medianos medianas moyen moyenne mittel mittlere средний متوسط',
    L: 'large big huge grande grandes grand gros enorme gross groß grosse große большой كبير' },
  kind: { painting: 'painting paintings pintura pinturas cuadro cuadros peinture peintures tableau tableaux gemalde gemälde dipinto dipinti quadro картина живопись لوحة',
    sculpture: 'sculpture sculptures escultura esculturas skulptur scultura sculture скульптура منحوتة',
    drawing: 'drawing drawings dibujo dibujos dessin dessins zeichnung disegno disegni рисунок رسم' },
  country: { pr: 'boricua puertorriqueno puertorriquena portoricain', cu: 'cuba cuban cubano cubana cubain cubaine', pe: 'peru peruvian peruano peruana peruvien',
    es: 'spain spanish espana espanol espanola espagne espagnol spanien spagna', fr: 'france french frances francesa francais francaise frankreich francia',
    do: 'dominican dominicano dominicana dominicaine dominicain dominikanisch rd quisqueya' },
  stop: 'the a an of de del la el los las lo en on in with con et le les du des y and or o by por par di da und mit me i im want quiero busco looking for something algo un una une show muestrame works work obra obras art arte from desde que with sin ano anos annee annees anni jahre years year decade decada'
};
const auDict = (() => { const m = new Map(); for (const [k, g] of Object.entries(AU_WORDS)) if (k !== 'stop') for (const [v, w] of Object.entries(g)) auNorm(w).split(' ').forEach(x => m.set(x, [k, v])); auNorm(AU_WORDS.stop).split(' ').forEach(x => m.has(x) || m.set(x, ['stop'])); return m; })();
// The longest side, in inches, from "… · 30 × 40 in (…)"; null when the book gives no size.
const auInches = l => { const r = ((l.spec && l.spec.en) || '').match(/(\d+(?:\.\d+)?)\s*×\s*(\d+(?:\.\d+)?)(?:\s*×\s*(\d+(?:\.\d+)?))?\s*in/); return r ? Math.max(+r[1], +r[2], +(r[3] || 0)) : null; };
const auSizeOf = l => { const n = auInches(l); return n == null ? '' : n <= 24 ? 'S' : n <= 40 ? 'M' : 'L'; };
const auCountry = l => ((AUCTION.artists && AUCTION.artists[lotArtist(l)]) || {}).country || 'do';
const auPrice = l => { const s = auSt(l); return s && s.count ? s.high : l.startBid; };
const auHay = new Map();
const auHaystack = l => {
  if (!auHay.has(l.id)) auHay.set(l.id, auNorm([lotArtist(l), ...Object.values(l.title || {}), ...Object.values(l.spec || {}), l.year, l.id].join(' ')).split(/[^\p{L}\p{N}]+/u).join(' '));
  return auHay.get(l.id);
};
let auF = { q: '', cols: [], size: '', sort: 'book' };
// Reads the box: returns what it understood (colours, size, kind, country, years, price) and the words left over.
function auParse(q) {
  const out = { cols: [], size: '', kind: '', country: '', from: 0, to: 0, max: 0, min: 0, words: [] };
  let s = auNorm(q).replace(/puerto\s+rico/g, ' boricua ').replace(/republica\s+dominicana|dominican\s+republic|republique\s+dominicaine/g, ' dominicana ');
  // Years: "since 2010", "antes de 2000".
  s = s.replace(/(since|after|desde|depuis|apres|seit|nach|dal|dopo)\s+(19\d\d|20[0-3]\d)\b/g, (_, w, y) => { out.from = +y; out.to = 2099; return ' '; });
  s = s.replace(/(before|antes de|antes del|avant|vor|prima del|prima)\s+(19\d\d|20[0-3]\d)\b/g, (_, w, y) => { out.from = 1; out.to = +y - 1; return ' '; });
  // Prices: "under 2000", "menos de $1.500", "over 3k".
  s = s.replace(/(under|below|less than|max|up to|menos de|hasta|bajo|moins de|jusqu'?a|unter|bis|sotto|fino a|<)\s*(?:us)?\$?\s*(\d[\d.,]*)\s*(k)?/g, (_, w, n, k) => { out.max = +n.replace(/[.,]/g, '') * (k ? 1000 : 1); return ' '; });
  s = s.replace(/(over|above|more than|min|mas de|desde|plus de|a partir de|uber|über|ab|oltre|piu di|>)\s*(?:us)?\$?\s*(\d[\d.,]*)\s*(k)?/g, (_, w, n, k) => { out.min = +n.replace(/[.,]/g, '') * (k ? 1000 : 1); return ' '; });
  for (const tok of s.split(/[^\p{L}\p{N}'’]+/u).filter(Boolean)) {
    let m;
    if ((m = tok.match(/^(19|20)?(\d)0s?$/)) && (m[1] || /s$/.test(tok) || /\b(anos|annees|anni|decada)\s+$/.test(s.slice(0, s.indexOf(tok))))) {
      const d = m[1] ? +(m[1] + m[2] + '0') : (+m[2] >= 3 ? 1900 : 2000) + +m[2] * 10;
      if (/^\d{4}$/.test(tok) && !/s$/.test(tok)) { out.from = out.to = d; } else { out.from = d; out.to = d + 9; }
      continue;
    }
    if (/^(19[5-9]\d|20[0-3]\d)$/.test(tok)) { out.from = out.to = +tok; continue; }
    const hit = auDict.get(tok);
    if (hit) {
      if (hit[0] === 'col' && !out.cols.includes(hit[1])) out.cols.push(hit[1]);
      if (hit[0] === 'size') out.size = hit[1];
      if (hit[0] === 'kind') out.kind = hit[1];
      if (hit[0] === 'country') out.country = hit[1];
      continue;
    }
    if (tok.length > 1) out.words.push(tok);
  }
  return out;
}
function auFound() {
  const p = auParse(auF.q), cols = [...new Set([...auF.cols, ...p.cols])], size = auF.size || p.size;
  let list = auLots().filter(l => (!cols.length || cols.every(c => ((typeof AU_COLORS !== 'undefined' && AU_COLORS[l.id]) || []).includes(c)))
    && (!size || auSizeOf(l) === size) && (!p.kind || l.kind === p.kind) && (!p.country || auCountry(l) === p.country)
    && (!p.from || (l.year >= p.from && l.year <= p.to)) && (!p.max || auPrice(l) <= p.max) && (!p.min || auPrice(l) >= p.min)
    && p.words.every(w => (' ' + auHaystack(l)).includes(' ' + w)));
  const by = {
    bids: (a, b) => ((auSt(b) || {}).count || 0) - ((auSt(a) || {}).count || 0),
    new: (a, b) => (b.year || 0) - (a.year || 0), old: (a, b) => (a.year || 1e4) - (b.year || 1e4),
    big: (a, b) => (auInches(b) || 0) - (auInches(a) || 0), small: (a, b) => (auInches(a) || 1e4) - (auInches(b) || 1e4),
    az: (a, b) => lotArtist(a).localeCompare(lotArtist(b), lang)
  }[auF.sort];
  return by ? list.slice().sort(by) : list;
}
// What the box understood, in the visitor's language.
function auUnderstoodHTML() {
  const p = auParse(auF.q), bits = [];
  p.cols.forEach(c => bits.push(t(auColKey(c))));
  if (p.size) bits.push(t('auSize' + p.size));
  if (p.kind) bits.push(t({ painting: 'auPaintings', sculpture: 'auSculptures', drawing: 'auDrawings' }[p.kind]));
  if (p.country) bits.push(t({ pr: 'auFromPR', cu: 'auFromCU', pe: 'auFromPE', es: 'auFromES', fr: 'auFromFR', do: 'auFrom' }[p.country]));
  if (p.from) bits.push(p.from === p.to ? String(p.from) : p.to - p.from === 9 ? t('auDecade', { d: p.from }) : `${p.from > 1 ? p.from : ''}–${p.to < 2099 ? p.to : ''}`);
  if (p.max) bits.push(t('auPriceMax', { p: auUSD(p.max) }));
  if (p.min) bits.push(t('auPriceMin', { p: auUSD(p.min) }));
  p.words.forEach(w => bits.push('“' + w + '”'));
  return `<p class="au-understood" id="au-understood"${bits.length ? '' : ' hidden'}>${t('auUnderstood')} ${bits.map(b => `<span class="au-u-bit">${esc(b)}</span>`).join(' ')}</p>`;
}
const auSwatches = (act, on) => {
  const n = c => auLots().filter(l => ((typeof AU_COLORS !== 'undefined' && AU_COLORS[l.id]) || []).includes(c)).length;
  return `<div class="au-swatches" role="group" aria-labelledby="au-fl-col">${AU_COLS.filter(([c]) => n(c) >= 5).map(([c, hex]) =>
    `<button type="button" class="au-swatch" data-action="${act}" data-col="${c}" style="--sw:${hex}" aria-pressed="${on.includes(c)}" aria-label="${esc(t(auColKey(c)))}" title="${esc(t(auColKey(c)))}"><span aria-hidden="true"></span></button>`).join('')}</div>`;
};
function auFinderHTML(full) {
  const inches = { S: '≤ 24 in', M: '25–40 in', L: '> 40 in' };
  return `<section class="au-finder${full ? ' au-finder-full' : ''}" id="au-finder" aria-labelledby="au-find-h">
    <div class="au-find-top"><h2 id="au-find-h" class="au-find-h">${t('auFindH')}</h2>
      <p class="au-find-meta">${t('auFindLead', { n: auLots().length, a: auArtists().length })}</p></div>
    <form class="au-find-form" data-form="auFind" role="search">
      <svg class="au-find-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>
      <label class="visually-hidden" for="au-q">${t('auFindLabel')}</label>
      <input id="au-q" type="search" name="q" value="${esc(auF.q)}" placeholder="${esc(t('auFindPh'))}" autocomplete="off" enterkeyhint="search">
      <button class="au-find-go" type="submit">${t('auFindGo')}</button>
    </form>
    <div class="au-facets">
      <div class="au-facet"><span class="au-facet-l" id="au-fl-col">${t('auColor')}</span>${auSwatches(full ? 'auFCol' : 'auGoCol', auF.cols)}</div>
      ${full ? `<div class="au-facet"><span class="au-facet-l" id="au-fl-size">${t('auSizeF')}</span>
        <div class="au-sizes" role="group" aria-labelledby="au-fl-size">${['S', 'M', 'L'].map(z => `<button type="button" class="au-size" data-action="auFSize" data-size="${z}" aria-pressed="${auF.size === z}">${t('auSize' + z)}<small>${inches[z]}</small></button>`).join('')}</div></div>
      <div class="au-facet"><label class="au-facet-l" for="au-sort">${t('auSort')}</label>
        <select id="au-sort" class="au-sort-sel" data-finder="sort">${[['book', 'auSortBook'], ['bids', 'auSortBids'], ['new', 'auSortNew'], ['old', 'auSortOld'], ['big', 'auSortBig'], ['small', 'auSortSmall'], ['az', 'auSortAZ']].map(([v, k]) => `<option value="${v}"${auF.sort === v ? ' selected' : ''}>${t(k)}</option>`).join('')}</select></div>` : ''}
    </div>
    ${full ? auUnderstoodHTML() : ''}
    <div class="au-find-actions"><button type="button" class="au-link" data-action="auSurprise">${t('auSurprise')} <span class="arr" aria-hidden="true">→</span></button>${full ? `<button type="button" class="au-link au-link-quiet" data-action="auFClear">${t('auClear')}</button>` : ''}</div>
  </section>`;
}
// Redraws the finder's controls (when asked) and the works, keeping focus where it was.
function auFinderRedraw(controls, focusSel) {
  auShow = AU_PAGE;
  if (controls) { const f = document.getElementById('au-finder'); if (f) f.outerHTML = auFinderHTML(true); }
  else { const u = document.getElementById('au-understood'); if (u) u.outerHTML = auUnderstoodHTML(); }
  auBrowseRedraw(focusSel);
}
EXTRA_FORMS.auFind = form => {
  auF.q = form.q.value.trim();
  if (!location.hash.startsWith('#/subasta/obras')) { location.hash = '#/subasta/obras'; return; }
  auFinderRedraw(true);
  const c = document.querySelector('#au-browse .au-count'); if (c) { c.setAttribute('tabindex', '-1'); c.focus(); }
};
EXTRA_ACTIONS.auFCol = el => { const c = el.dataset.col; auF.cols = auF.cols.includes(c) ? auF.cols.filter(x => x !== c) : [...auF.cols, c]; auFinderRedraw(true, `.au-swatch[data-col="${c}"]`); };
EXTRA_ACTIONS.auGoCol = el => { auF = { q: '', cols: [el.dataset.col], size: '', sort: 'book' }; location.hash = '#/subasta/obras'; };
EXTRA_ACTIONS.auFSize = el => { auF.size = auF.size === el.dataset.size ? '' : el.dataset.size; auFinderRedraw(true, `[data-action=auFSize][data-size="${el.dataset.size}"]`); };
EXTRA_ACTIONS.auFClear = () => { auF = { q: '', cols: [], size: '', sort: 'book' }; auCat = 'all'; auFinderRedraw(true, '#au-q'); };
// A random work among those the visitor is looking at (all of them on the auction page).
EXTRA_ACTIONS.auSurprise = () => {
  const list = location.hash.startsWith('#/subasta/obras') ? auFound() : auLots();
  if (list.length) location.hash = '#/subasta/' + list[Math.floor(Math.random() * list.length)].id;
};
// Results follow the typing (after a short pause); the box keeps its focus.
let auFTimer;
document.addEventListener('input', e => {
  if (e.target.id !== 'au-q' || !document.getElementById('au-browse')) return;
  clearTimeout(auFTimer);
  auFTimer = setTimeout(() => { auF.q = e.target.value.trim(); auFinderRedraw(false); }, 220);
});
document.addEventListener('change', e => {
  if (e.target.dataset && e.target.dataset.finder === 'sort') { auF.sort = e.target.value; auFinderRedraw(true, '#au-sort'); }
});

// An artist's room shows one work at a time, large, with everything known about it and room for its description
// (lot.desc, by language, when the museum provides it); arrows, a swipe or the thumbnails move between works. The
// place in the room lasts while the visitor stays in it (the page re-renders every few seconds with new bids).
let auVScope = '', auVIdx = 0, auVLots = () => [];
function auViewerHTML(scope, name, lots) {
  if (scope !== auVScope) { auVScope = scope; auVIdx = auVStartLast ? 1e9 : 0; auVStartLast = false; auCat = 'all'; }
  auVLots = () => lots;
  const kinds = AU_KINDS.map(([id, key, f]) => [id, key, lots.filter(f).length]).filter(k => k[2]);
  const multi = kinds.length > 2, cat = multi ? (AU_KINDS.find(k => k[0] === auCat) || AU_KINDS[0]) : AU_KINDS[0];
  const list = lots.filter(cat[2]);
  if (!list.length) return '';
  auVIdx = Math.max(0, Math.min(auVIdx, list.length - 1));
  const lot = list[auVIdx], s = auSt(lot) || {}, open = auOpen(lot), lead = s.leaders && s.leaders[0], c = auCloses(lot);
  const [year, medium, size] = lotFacts(lot), desc = lot.desc && L(lot.desc);
  const row = (k, v) => v ? `<dt>${k}</dt><dd>${esc(String(v))}</dd>` : '';
  // Past the first or last work, the arrows lead to the previous or next artist's room.
  const nb = auNeighbour(scope), atStart = !auVIdx, atEnd = auVIdx >= list.length - 1;
  const navBtn = (act, sym, edge, other) => `<button class="au-v-btn${edge ? ' au-v-btn-artist' : ''}" data-action="${act}" aria-label="${edge ? esc(t('auToArtist', { name: other })) : t(act === 'auPrev' ? 'auPrev' : 'auNext')}"${edge && !other ? ' disabled' : ''}><span aria-hidden="true">${sym}</span></button>`;
  const nav = `<div class="au-v-nav">
      ${navBtn('auPrev', '‹', atStart, nb.prev && nb.prev.name)}
      <span class="au-v-count" aria-live="polite">${t('auOfN', { i: auVIdx + 1, n: list.length })}${atEnd && nb.next ? `<small class="au-v-nextname">${t('auNextArtist')}: ${esc(nb.next.name)}</small>` : ''}</span>
      ${navBtn('auNext', '›', atEnd, nb.next && nb.next.name)}</div>`;
  return `<section class="section au-viewer" id="au-viewer" data-name="${esc(name)}" aria-roledescription="carousel" aria-label="${esc(t('auWorksOf', { name }))}">
    ${multi ? `<div class="au-cats" role="group" aria-label="${t('auCats')}">${kinds.map(([id, key, n]) =>
      `<button class="au-cat" data-action="auVCat" data-cat="${id}" aria-pressed="${id === cat[0]}">${t(key)} <span class="au-n">${n}</span></button>`).join('')}</div>` : ''}
    ${nav}
    <article class="au-v-work" aria-roledescription="slide" aria-label="${esc(t('auOfN', { i: auVIdx + 1, n: list.length }))}">
      <figure class="au-v-fig"><img src="${lot.img}" alt="${esc(lotTitle(lot))}" width="${lot.w || 1000}" height="${lot.h || 1000}"></figure>
      <p class="eyebrow">${t('auLot', { n: lotNumber(lot) })} · ${lotKind(lot)}</p>
      <h2 class="au-v-title">${esc(lotTitle(lot))}</h2>
      <dl class="specs">${row(t('year'), year)}${row(t('auMedium'), medium)}${row(t('auSize'), size)}</dl>
      ${desc ? `<div class="au-v-desc"><h3 class="eyebrow">${t('auCritique')}</h3>${String(desc).split(/\n\s*\n/).map(p => `<p>${esc(p)}</p>`).join('')}</div>` : ''}
      <div class="au-v-price">
        <p class="au-feature-price"><small>${t(s.count ? 'auCurrent' : 'auStart')}</small>${auUSD(s.count ? s.high : lot.startBid)}</p>
        <p class="muted">${s.count ? (s.count === 1 ? t('auBid1') : t('auBidsN', { n: s.count })) + (lead ? ' · ' + esc(t('auLeader', { name: lead.who })) : '') : t('auFirst')}</p>
        ${c ? `<p class="muted">${open ? `${t('auEndsIn')} ${cdHTML(c)}` : t(auClosedKey())}</p>` : ''}
      </div>
      <div class="btn-row">${open ? `<a class="btn primary" href="#/subasta/${lot.id}">${t('auBidThis')}</a>` : `<a class="btn" href="#/subasta/${lot.id}">${t('auView')}</a>`}
        <button class="btn" data-action="lotInterest" data-lot="${lot.id}">${t('auAsk')}</button></div>
    </article>
    ${list.length > 1 ? nav.replace('au-v-nav', 'au-v-nav au-v-nav-low') : ''}
    ${list.length > 1 ? `<div class="au-v-thumbs">${list.map((l, i) => `<button class="au-v-thumb" data-action="auGo" data-i="${i}" aria-label="${esc(lotTitle(l))}"${i === auVIdx ? ' aria-current="true"' : ''}><img src="${l.thumb || l.img}" alt="" loading="lazy" width="72" height="72"></button>`).join('')}</div>` : ''}
  </section>`;
}
// Redraws only the viewer, keeping the visitor's place; focus stays on the control used (or the work's title).
function auViewerRedraw(focusSel) {
  const el = document.getElementById('au-viewer'); if (!el) return;
  el.outerHTML = auViewerHTML(auVScope, el.dataset.name || '', auVLots());
  const v = document.getElementById('au-viewer');
  if (typeof loadImagesSoon === 'function') loadImagesSoon();
  const f = (focusSel && v.querySelector(focusSel + ':not([disabled])')) || v.querySelector('.au-v-title');
  if (f) { if (!f.matches('button, a')) f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true }); }
  // On a phone the work's picture comes back into view when it changes.
  const top = v.querySelector('.au-v-nav').getBoundingClientRect().top;
  if (top < 0) v.querySelector('.au-v-nav').scrollIntoView({ block: 'start' });
}
let auVStartLast = false;
// The artists before and after this room, in the order of the artists list (wrapping around).
function auNeighbour(scope) {
  const list = auArtists(), i = list.findIndex(a => 'artist:' + a.slug === scope);
  if (i < 0 || list.length < 2) return {};
  return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
}
const auVMove = d => {
  const n = auVLots().filter((AU_KINDS.find(k => k[0] === auCat) || AU_KINDS[0])[2]).length, i = auVIdx + d;
  if (i >= 0 && i < n) { auVIdx = i; auViewerRedraw(d < 0 ? '[data-action=auPrev]' : '[data-action=auNext]'); return; }
  const nb = auNeighbour(auVScope), to = d < 0 ? nb.prev : nb.next;
  if (!to) return;
  auVStartLast = d < 0;
  location.hash = `#/subasta/artista-${to.slug}`;
  // The new room opens at its top: the artist's name, biography and critique, then the works.
  requestAnimationFrame(() => { scrollTo(0, 0); const h = document.querySelector('.au-room-name'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } });
};
EXTRA_ACTIONS.auPrev = () => auVMove(-1);
EXTRA_ACTIONS.auNext = () => auVMove(1);
EXTRA_ACTIONS.auGo = el => { auVIdx = +el.dataset.i; auViewerRedraw(`.au-v-thumb[data-i="${auVIdx}"]`); };
EXTRA_ACTIONS.auVCat = el => { auCat = el.dataset.cat; auVIdx = 0; auViewerRedraw(`.au-cat[data-cat="${auCat}"]`); };
// Arrow keys inside the viewer, and a sideways swipe on the picture.
document.addEventListener('keydown', e => {
  if (!e.target.closest || !e.target.closest('#au-viewer') || e.target.matches('input, select, textarea')) return;
  const rtl = document.documentElement.dir === 'rtl';
  if (e.key === 'ArrowRight') { e.preventDefault(); auVMove(rtl ? -1 : 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); auVMove(rtl ? 1 : -1); }
});
{
  let x0 = null, y0 = 0;
  document.addEventListener('touchstart', e => { x0 = e.target.closest && e.target.closest('.au-v-fig') ? e.touches[0].clientX : null; y0 = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', e => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) auVMove((dx < 0) !== (document.documentElement.dir === 'rtl') ? 1 : -1);
  }, { passive: true });
}

// "About the artist": the book's essay in its own words (English, as printed), its first paragraphs open and the
// rest a tap away; for Oscar Abreu, his biography from oscarabreu.com in the visitor's language where published.
// An artist's headline and critique in the visitor's language: the museum's translation where there is one
// (AUCTION.essaysTr), else the book's English. `lang` and `tr` say which.
const auEssay = name => {
  const en = (AUCTION.essays && AUCTION.essays[name]) || {}, dl = document.documentElement.lang;
  const tr = AUCTION.essaysTr && AUCTION.essaysTr[name] && AUCTION.essaysTr[name][dl];
  // The book prints most essays in English; one it prints in Spanish carries lang: 'es' (its notes say so).
  const base = en.lang || 'en';
  return tr ? { head: tr.head || en.head, text: tr.text || en.text, lang: tr.text ? dl : base, headLang: tr.head ? dl : base, tr: !!tr.text, src: base } : { ...en, lang: base, headLang: base, src: base };
};
function auBioHTML(name) {
  const a = AUCTION.artists && AUCTION.artists[name], b = a && a.bio;
  if (!b) return '';
  const dl = document.documentElement.lang, bl = b[dl] ? dl : 'en';
  return `<div class="au-bio"><p lang="${bl}">${esc(b[bl])}</p>
    <p class="muted au-bio-src">${t('auSources')}: ${b.srcNames ? b.srcNames.map(esc).join(' · ') : b.src.map(u => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(new URL(u).hostname.replace(/^www\./, ''))}</a>`).join(' · ')}</p></div>`;
}
function auAboutHTML(name) {
  // First the biography (researched, or Oscar Abreu's own from oscarabreu.com), then the critique: the essay ART
  // GABANGI · Top 100 Artist prints on the artist, word for word.
  const e = auEssay(name);
  let bio = auBioHTML(name);
  if (!bio && name === 'Oscar Abreu' && typeof BIO_SITE !== 'undefined') {
    const dl = document.documentElement.lang, bl = BIO_SITE[dl] ? dl : 'en', b = BIO_SITE[bl];
    bio = `<div class="au-bio" lang="${bl}">${[b.intro, b.circuit].filter(Boolean).map(x => `<p>${esc(x)}</p>`).join('')}<p class="muted au-bio-src">${t('auBioNote')}</p></div>`;
  }
  const paras = e.text ? e.text.split(/\n\s*\n/) : [];
  const P = x => `<p>${esc(x).replace(/\n/g, '<br>')}</p>`, first = paras.slice(0, 3), rest = paras.slice(3);
  return (bio ? `<section class="section au-about"><h2 class="au-about-h">${t('auBio')}</h2>${bio}</section>` : '')
    + (paras.length ? `<section class="section au-about"><h2 class="au-about-h">${t('auCritique')}</h2>
      <div class="au-about-text" lang="${e.lang}">${first.map(P).join('')}
        ${rest.length ? `<details class="au-about-more"><summary>${t('auReadAll')}</summary>${rest.map(P).join('')}</details>` : ''}</div>
      <p class="muted au-room-src">${t(e.src === 'es' ? (e.tr ? 'auEssayNoteTrEs' : 'auEssayNoteEs') : (e.tr ? 'auEssayNoteTr' : 'auEssayNote'))}</p></section>` : '');
}

// An artist's room: the name large, the line the book prints, their works, and the highest bids among them.
// The end of a room: the next two artists, as on the artists list, one tap away.
function auNextArtistHTML(a) {
  const list = auArtists(), i = list.findIndex(x => x.slug === a.slug);
  if (i < 0 || list.length < 2) return '';
  const next = [1, 2].map(k => list[(i + k) % list.length]).filter((x, j, arr) => x.slug !== a.slug && arr.indexOf(x) === j);
  return `<section class="section au-next"><h2 class="au-about-h">${t('auNextArtists')}</h2>
    <ol class="au-artist-list">${next.map(n => `<li><a class="au-artist" href="${auRoomHref(n.name)}">
      <span class="au-artist-text"><span class="au-artist-name">${esc(n.name)}${auNameYears(n.name)}</span>
        ${auEssay(n.name).head ? `<span class="au-artist-head" lang="${auEssay(n.name).headLang}">${esc(auEssay(n.name).head)}</span>` : ''}
        <span class="au-artist-n">${auWorksText(n.lots.length)}</span></span>
      <span class="au-artist-strip" aria-hidden="true">${n.lots.slice(0, 3).map(l => `<img src="${l.thumb || l.img}" alt="" loading="lazy" width="120" height="120">`).join('')}</span>
      <span class="arr" aria-hidden="true">›</span></a></li>`).join('')}</ol>
    <p style="margin-top:1rem"><a class="btn small" href="#/subasta/artistas">${t('auBackArtists')}</a></p></section>`;
}
// The top of a room: previous artist · all artists · next artist, and a sideways swipe on the room's heading,
// anywhere in a room moves between artists (on the painting it moves between works), so nobody has to scroll
// to change room.
function auArtNavHTML(a) {
  const nb = auNeighbour('artist:' + a.slug);
  const link = (n, dir) => n ? `<a class="au-artnav-${dir}" href="${auRoomHref(n.name)}" aria-label="${esc(t(dir === 'prev' ? 'auPrevArtist' : 'auNextArtist') + ': ' + n.name)}">
      ${dir === 'prev' ? '<span class="arr" aria-hidden="true">‹</span>' : ''}<span><small>${t(dir === 'prev' ? 'auPrevArtist' : 'auNextArtist')}</small>${esc(n.name)}</span>${dir === 'next' ? '<span class="arr" aria-hidden="true">›</span>' : ''}</a>` : '<span></span>';
  return `<nav class="au-artnav" aria-label="${t('auArtistsH')}">${link(nb.prev, 'prev')}
    <a class="au-artnav-all" href="#/subasta/artistas" aria-label="${t('auBackArtists')}"><span aria-hidden="true">☰</span></a>${link(nb.next, 'next')}</nav>`;
}
{
  let x0 = null, y0 = 0;
  document.addEventListener('touchstart', e => { const t0 = e.target.closest ? e.target : null, el = t0 && t0.closest('.au-room') && !t0.closest('.au-v-fig, .au-v-thumbs, .au-cats, input, select, textarea, dialog'); x0 = el ? e.touches[0].clientX : null; y0 = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', e => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 2) return;
    const rtl = document.documentElement.dir === 'rtl', fwd = (dx < 0) !== rtl;
    const to = auNeighbour(auVScope)[fwd ? 'next' : 'prev'];
    if (to) location.hash = `#/subasta/artista-${to.slug}`;
  }, { passive: true });
}
function pageArtistRoom(a) {
  const leaders = a.lots.flatMap(l => ((auSt(l) && auSt(l).leaders) || []).map(r => ({ ...r, lot: lotTitle(l) }))).sort((x, y) => y.amount - x.amount).slice(0, 10);
  return `<div class="wrap au-room">
    ${auArtNavHTML(a)}
    <section class="section au-room-head">
      <p class="eyebrow">${t('auEyebrow')} · ${t('auRoom')}</p>
      <h1 class="au-room-name">${esc(a.name)}${auNameYears(a.name)}</h1>
      ${auEssay(a.name).head ? `<p class="au-room-head-line" lang="${auEssay(a.name).headLang}">${esc(auEssay(a.name).head)}</p>` : ''}
      <p class="au-room-line">${[artistLine(a.lots[0], true), auWorksText(a.lots.length)].filter(Boolean).map(esc).join(' · ')}</p>
      ${a.lots[0].artist ? '' : `<p><a class="btn small" href="#/artista">${t('auAboutOscar')}</a></p>`}
    </section>
    ${auViewerHTML('artist:' + a.slug, a.name, a.lots)}
    ${auAboutHTML(a.name)}
    ${leaders.length ? `<section class="section au-board-wrap"><h2>${t('auRoomBoard')}</h2>${auBoardHTML(leaders, true, 3)}</section>` : ''}
    ${auNextArtistHTML(a)}
  </div>`;
}
function pageAllWorks() {
  return `<div class="wrap">
    <a href="#/subasta" class="btn small"><span class="arr">←</span> ${t('auBackArtists')}</a>
    <section class="section au-room-head"><p class="eyebrow">${t('auEyebrow')}</p><h1 class="au-room-name">${t('auAllWorksH')}</h1></section>
    ${auFinderHTML(true)}
    ${auBrowseHTML('all', auFound())}
  </div>`;
}

function pageAuction(id) {
  if (!auState && !auFailed) fetchAuction().then(() => { if (location.hash.startsWith('#/subasta')) route(); });
  setTimeout(auPoll, 0);
  const fin = liveFinale();
  const lot = id && auLots().find(l => l.id === id);
  if (lot) return pageLot(lot, fin);
  if (id === 'obras' && auLots().length) return pageAllWorks();
  const room = id && id.startsWith('artista-') && auArtists().find(a => 'artista-' + a.slug === id);
  if (room) return pageArtistRoom(room);
  if (!auLots().length) return `<div class="wrap"><section class="section">
      <p class="eyebrow">${t('auEyebrow')}</p><h1>${t('auTitle')}</h1>
      <p class="lead" style="margin-top:.8rem">${t('auSoon')}</p>
      ${liveLine(fin)}</section></div>`;
  return `<div class="wrap">
    ${auFinderHTML(false)}
    <section class="section au-top">
      <p class="eyebrow">${t('auEyebrow')}</p><h1 class="au-h1 au-h1-artist">${auFeatured() ? `<a href="${auRoomHref(lotArtist(auFeatured()))}">${esc(lotArtist(auFeatured()))}</a>${auNameYears(lotArtist(auFeatured()))}` : auTitleText()}</h1>
      ${auFailed && AUCTION.lots.some(l => auOpen(l)) ? `<p class="status">${t('auLiveOff')}</p>` : ''}
      ${auFeatureHTML(auFeatured())}
    </section>
    <section class="section au-board-wrap"><h2>${t('auBoard')}</h2><p class="muted">${t('auBoardLead')}</p>${auBoardHTML(auAllLeaders(), true, 3)}</section>
    ${auArtistsHTML()}
    <section class="section"><p class="lead">${fin ? t('auLead', { event: esc(fin.name) }) : t('auLeadOnline')}</p>
      ${liveLine(fin)}</section>
  </div>`;
}

function pageLot(lot, fin) {
  const w = lot.work && workById(lot.work), s = (auState && auState[lot.id]) || { count: 0, last: [] };
  const spec = w && w.spec ? L(w.spec).join(' · ') : lot.spec ? [lot.year, L(lot.spec)].filter(Boolean).join(' · ') : '';
  const open = auOpen(lot), min = open ? lotMinBid(lot, s) : null;
  const action = open ? `<form class="bid-form" data-form="bid" data-lot="${lot.id}" novalidate>
      <div class="field"><label for="bid-amount">${t('auYourBid')}</label>
        <input id="bid-amount" type="number" inputmode="numeric" min="${min}" step="${AUCTION.increment}" value="${min}" required>
        <small class="muted">${t('auMin', { amount: auUSD(min) })}</small>
        <div class="bid-quick" role="group" aria-label="${t('auQuick')}">${[0, 500, 1000].map(x => `<button type="button" class="btn small" data-action="bidQuick" data-v="${min + x}">${auUSD(min + x)}</button>`).join('')}</div></div>
      <div class="grid two">
        <div class="field"><label for="bid-name">${t('name')}</label><input id="bid-name" required autocomplete="name" value="${esc(profile.name || '')}"></div>
        <div class="field"><label for="bid-email">${t('email')}</label><input id="bid-email" type="email" required autocomplete="email" value="${esc(profile.email || '')}"></div>
      </div>
      <div class="field"><label for="bid-phone">${t('phone')}</label><input id="bid-phone" type="tel" required autocomplete="tel" value="${esc(profile.phone || '')}"></div>
      <label class="bid-accept"><input type="checkbox" id="bid-show" checked> <span>${t('auShowName')}</span></label>
      <label class="bid-accept"><input type="checkbox" id="bid-accept"> <span>${t('auTerms')}</span></label>
      <p class="status" id="bid-status" role="status" aria-live="polite" hidden></p>
      <button class="btn primary co-pay" type="submit">${t('auBidBtn')}</button>
    </form>`
    : auCloses(lot) && lot.startBid != null ? '' // closed online: carries into the room
    : `<p class="muted">${t('auNotOpen')}</p>
       <button class="btn" data-action="lotInterest" data-lot="${lot.id}">${t('auInterest')}</button>`;
  const [fy, fm, fs] = lotFacts(lot), row = (k, v) => v ? `<div><dt>${k}</dt><dd>${esc(String(v))}</dd></div>` : '';
  return `<div class="wrap lot-page">
    <a href="#/subasta" class="lot-back"><span class="arr" aria-hidden="true">←</span> ${t('auBack')}</a>
    <section class="section lot-detail">
      <figure class="lot-figure"><img src="${lot.img}" alt="${esc(lotTitle(lot))}" width="${lot.w || 1400}" height="${lot.h || 1400}"><figcaption>${esc(lotArtist(lot))} · <i>${esc(lotTitle(lot))}</i></figcaption></figure>
      <div class="lot-info">
        <p class="lot-meta">${t('auLot', { n: lotNumber(lot) })}${lot.example ? ` · <span class="chip">${t('auExample')}</span>` : ''}</p>
        <p class="au-feature-artist lot-artist-big"><a href="${auRoomHref(lotArtist(lot))}">${esc(lotArtist(lot))}</a></p>
        ${artistLine(lot) ? `<p class="lot-artist-line">${esc(artistLine(lot))}</p>` : ''}
        <h1 class="lot-h1">${esc(lotTitle(lot))}</h1>
        <dl class="lot-specs">${row(t('auType'), lotKind(lot))}${row(t('year'), fy)}${row(t('auMedium'), fm)}${row(t('auSize'), fs)}</dl>
        <div class="lot-bidbox">
          <p class="lot-state big">${lotPriceLine(lot)}</p>
          ${auCloses(lot) && auOpen(lot) ? `<div class="au-feature-cd"><small>${t('auEndsIn')}</small>${cdHTML(auCloses(lot), true)}</div>` : lotCloseLine(lot)}
          ${liveLine(fin)}
          ${action}
        </div>
        <div class="lot-links"><button class="lot-go" data-action="lotInterest" data-lot="${lot.id}">${t('auAsk')} <span class="arr" aria-hidden="true">→</span></button><button class="lot-more" data-action="lotShare" data-lot="${lot.id}">${t('evShare')}</button></div>
        <p class="status" id="share-status" role="status" aria-live="polite" hidden></p>
        <h2 class="lot-sub">${t('auBoard')}</h2>${auBoardHTML((s.leaders || []).slice(0, 10))}
        <p class="lot-note">${t('auWinner')}</p>
      </div>
    </section>
  </div>`;
}

EXTRA_FORMS.bid = async form => {
  const lot = AUCTION.lots.find(l => l.id === form.dataset.lot);
  const out = $('#bid-status', form), btn = form.querySelector('button[type=submit]');
  const say = (msg, ok) => { out.textContent = msg; out.hidden = false; out.classList.toggle('ok', !!ok); };
  const amt = $('#bid-amount', form);
  if (!amt.checkValidity()) { amt.focus(); return say(t('auMin', { amount: auUSD(amt.min) })); }
  const bad = ['bid-name', 'bid-email', 'bid-phone'].find(id => !document.getElementById(id).checkValidity());
  if (bad) { document.getElementById(bad).focus(); return say(document.getElementById(bad).validationMessage); }
  if (!$('#bid-accept', form).checked) { $('#bid-accept', form).focus(); return say(t('auAccept')); }
  const v = id => document.getElementById(id).value.trim();
  profile.name = v('bid-name'); profile.email = v('bid-email'); profile.phone = v('bid-phone'); save();
  btn.disabled = true;
  try {
    const r = await fetch('/api/auction', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lot: lot.id, amount: Number(v('bid-amount')), name: profile.name, email: profile.email, phone: profile.phone, accept: true, show: $('#bid-show', form).checked }) });
    const data = await r.json().catch(() => ({}));
    if (r.ok) {
      auState = { ...(auState || {}), [lot.id]: data };
      if (typeof trackEvent === 'function') trackEvent('Bid', { lot: lot.id });
      route();
      const s = $('#bid-status'); if (s) { s.textContent = t('auThanks', { amount: auUSD(data.high) }); s.hidden = false; s.classList.add('ok'); }
      return;
    }
    if (data.error === 'low') {
      auState = { ...(auState || {}), [lot.id]: data };
      const input = $('#bid-amount', form); input.min = data.min; input.value = data.min;
      say(t('auTooLow', { amount: auUSD(data.min) }));
    } else if (data.error === 'closed') { auState = { ...(auState || {}), [lot.id]: data }; route(); }
    else say(t('auErr'));
  } catch (e) { say(t('auErr')); }
  btn.disabled = false;
};

// "Dominican Republic · b. 1972" (or the years of a late artist), from AUCTION.artists.
function artistLine(lot, noYears) {
  const a = AUCTION.artists && AUCTION.artists[lotArtist(lot)];
  if (!a) return '';
  return [t({ pr: 'auFromPR', cu: 'auFromCU', pe: 'auFromPE', es: 'auFromES', fr: 'auFromFR' }[a.country] || 'auFrom'), noYears ? '' : auYears(lotArtist(lot))].filter(Boolean).join(' · ');
}
// "b. 1972", or "1964–2022" for an artist who has died.
function auYears(name) {
  const a = AUCTION.artists && AUCTION.artists[name];
  return !a ? '' : a.died ? `${a.born}–${a.died}` : a.born ? t('auBorn', { y: a.born }) : '';
}
// The years beside an artist's name, smaller.
const auNameYears = name => auYears(name) ? ` <span class="au-name-years">${esc(auYears(name))}</span>` : '';
// A work's facts as [year, medium, size]: Oscar Abreu's from WORKS, the others from the lot's own spec ("medium · size").
function lotFacts(lot) {
  const w = lot.work && workById(lot.work);
  if (w && w.spec) { const sp = L(w.spec); return [sp[0], sp[1], sp[2]]; }
  const sp = lot.spec ? L(lot.spec).split(' · ') : [];
  return [lot.year || '', sp[0] || '', sp.slice(1).join(' · ')];
}
// The Details panel: everything known about the work, its price and close, and a way to ask the museum about it.
EXTRA_ACTIONS.lotInfo = el => {
  const lot = AUCTION.lots.find(l => l.id === el.dataset.lot);
  if (!lot) return;
  const s = auSt(lot) || {}, c = auCloses(lot), open = auOpen(lot), [year, medium, size] = lotFacts(lot);
  const row = (k, v) => v ? `<dt>${k}</dt><dd>${esc(v)}</dd>` : '';
  const dlg = document.createElement('dialog');
  dlg.setAttribute('aria-label', lotTitle(lot));
  dlg.innerHTML = `<div class="dlg-body">
    <div class="dlg-art"><img src="${lot.img}" alt="${esc(lotTitle(lot))}" width="${lot.w || 1000}" height="${lot.h || 1000}"></div>
    <p class="eyebrow" style="margin-top:1rem">${t('auLot', { n: lotNumber(lot) })} · ${lotKind(lot)}</p>
    <h2 class="h3">${esc(lotTitle(lot))}</h2>
    <dl class="specs">
      <dt>${t('auArtist')}</dt><dd><a href="${auRoomHref(lotArtist(lot))}" data-dlg="close">${esc(lotArtist(lot))}</a></dd>
      ${artistLine(lot) ? `<dt></dt><dd class="muted">${esc(artistLine(lot))}</dd>` : ''}
      ${row(t('auType'), lotKind(lot))}${row(t('year'), String(year || ''))}${row(t('auMedium'), medium)}${row(t('auSize'), size)}
      ${row(t(s.count ? 'auCurrent' : 'auStart'), lot.startBid != null ? auUSD(s.count ? s.high : lot.startBid) : '')}
      ${s.count ? row(t('auHistory'), s.count === 1 ? t('auBid1') : t('auBidsN', { n: s.count })) : ''}
      ${c ? row(open ? t('auEndsIn') : t('auEnded'), open ? dateTime(c) : t(auClosedKey())) : ''}
    </dl>
    ${lot.artist ? `<p class="muted" style="margin-top:.6rem">${t('sourceLabel')}: ${t('auSrcBook')}</p>` : lot.work ? `<p class="muted" style="margin-top:.6rem">${t('sourceLabel')}: oscarabreu.com</p>` : ''}
    <div class="btn-row">
      <a class="btn dark small" href="#/subasta/${lot.id}" data-dlg="close">${t(open ? 'auOpenLot' : 'auView')}</a>
      <button class="btn small" data-dlg="ask">${t('auAsk')}</button>
      ${lot.artist ? '' : `<a class="btn small" href="#/artista" data-dlg="close">${t('auAboutOscar')}</a>`}
      <button class="btn small" data-dlg="close">${t('close')}</button>
    </div></div>`;
  document.body.appendChild(dlg);
  dlg.addEventListener('click', e => {
    const b = e.target.closest('[data-dlg]');
    if (e.target === dlg || (b && b.dataset.dlg === 'close')) dlg.close();
    if (b && b.dataset.dlg === 'ask') { dlg.close(); EXTRA_ACTIONS.lotInterest({ dataset: { lot: lot.id } }); }
  });
  dlg.addEventListener('close', () => dlg.remove());
  dlg.showModal();
};

EXTRA_ACTIONS.bidQuick = el => { const i = $('#bid-amount'); if (i) { i.value = el.dataset.v; i.focus(); } };

EXTRA_ACTIONS.lotInterest = el => {
  const lot = AUCTION.lots.find(l => l.id === el.dataset.lot);
  if (!openWhatsApp(t('waAuInterest', { lot: t('auLot', { n: lotNumber(lot) }), title: lotTitle(lot) }))) toast(t('ciInterestSent'));
};

/* ---------- Shop ---------- */

function pageShop() {
  const digital = editionsMineFirst(EDITIONS.filter(e => e.status === 'available' && LANG_NAMES[e.lang]), myEdition());
  const price = p => p == null ? t('coPriceTbd') : auUSD(p);
  return `<div class="wrap">
    <section class="section"><p class="eyebrow">Museo Abreu</p><h1>${t('shTitle')}</h1><p class="lead" style="margin-top:.8rem">${shLeadText()}</p></section>
    <section class="section"><div class="section-head"><h2 class="tier-group">${t('shBook')}</h2>
        <button class="btn small" data-action="bookShare">${t('evShare')}</button></div>
      <p class="status" id="share-status" role="status" aria-live="polite" hidden></p>
      <div class="shop-grid">
        ${(() => { const ps = PRINT_EDITIONS.filter(p => p.price != null); if (!ps.length) return '';
          const mine = typeof myEdition === 'function' ? myEdition() : lang, first = ps.find(p => p.lang === mine) || ps.find(p => p.lang === lang) || ps[0];
          return `<article class="shop-item">
          <div class="cover">${coverSVG(t('bookTitle'), t('bookSub'))}</div>
          <h3 class="pass-name">${t('shPrint')}</h3>
          <p class="muted">Ediciones ARTFORO</p>
          <p class="pass-price">${price(first.price)}</p>
          <div class="field"><label for="shop-print-lang">${t('bkLang')}</label><select id="shop-print-lang">${ps.map(p => `<option value="${p.lang}"${p === first ? ' selected' : ''}>${L(p.name)}</option>`).join('')}</select></div>
          <p class="muted">${t('shPrintNote')}</p>
          <button class="buy-now" data-action="buyPrint">${t('shOrder')} <span class="arr" aria-hidden="true">›</span></button>
        </article>`; })()}
        <article class="shop-item">
          <div class="cover">${coverSVG(t('bookTitle'), t('bookSub'))}</div>
          <h3 class="pass-name">${t('shDigital')}</h3>
          <p class="muted">${t('bkProLead')}</p>
          <p class="pass-price">${usd(PRO_WEEK)} <span class="muted">${t('perWeek')}</span></p>
          <a class="buy-now" href="#/pro">Pro <span class="arr" aria-hidden="true">›</span></a>
        </article>
      </div>
    </section>
    ${auLots().length ? `<section class="section"><h2 class="tier-group">${t('shAuctionTitle')}</h2>
      <div class="lots">${auLots().slice(0, 3).map(l => lotCard(l)).join('')}</div>
      <div class="btn-row"><a class="btn primary" href="#/subasta">${t('shAllLots')}</a></div>
    </section>` : ''}
  </div>`;
}

EXTRA_ACTIONS.buyPrint = el => {
  const sel = document.getElementById('shop-print-lang'), p = PRINT_EDITIONS.find(x => x.lang === (el.dataset.l || (sel && sel.value)));
  checkout({ title: 'Ecce Homo · ' + t('shPrint'), sub: printSub(p), price: p.price, qty: true, link: whopLink(p.key), provider: 'Whop' });
};

/* ---------- Home: auction and shop right after the next event ---------- */
{
  const home = homeExtras;
  homeExtras = () => {
    const html = home(), cut = html.lastIndexOf('<section class="section"><h2>');
    const strip = (auLots().length ? `<section class="section"><div class="section-head"><h2>${t('shAuctionTitle')}</h2><a class="buy-now" href="#/subasta">${t('shAllLots')} <span class="arr" aria-hidden="true">›</span></a></div>
      <div class="lots">${auLots().slice(0, 3).map(l => lotCard(l)).join('')}</div></section>` : '') + `
      <section class="section"><a class="card shop-banner" href="#/tienda"><div class="cover">${coverSVG(t('bookTitle'), t('bookSub'))}</div>
        <div><p class="eyebrow">${t('shTitle')}</p><h3>${t('bookTitle')}</h3><p class="muted">${shLeadText()}</p></div></a></section>`;
    return cut > 0 ? html.slice(0, cut) + strip + html.slice(cut) : html + strip;
  };
}

Object.assign(EXTRA_ROUTES, { subasta: pageAuction, tienda: pageShop });
Object.assign(ROUTE_SECTION, { rsvp: 'eventos', gracias: 'tienda' });

// Thank-you page wording for the printed books.
{
  const info = purchaseInfo;
  purchaseInfo = key => {
    const p = PRINT_EDITIONS.find(x => x.key === key);
    return p ? { item: 'Ecce Homo · ' + t('shPrint') + ' · ' + L(p.name), text: t('shPrintNote') } : info(key);
  };
}

// The auction's countdown in the top bar, beside the languages, on every page while bidding is open: a sense of
// urgency, one tap from the auction. It ticks each second and follows the visitor's language.
{
  const close = () => AUCTION.closesAt && auLots().some(auOpen) ? AUCTION.closesAt : null;
  const short = iso => {
    const s = Math.max(0, Math.floor((Date.parse(iso) - Date.now()) / 1000)), two = n => String(n).padStart(2, '0');
    const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    const dd = /^(ar|ru)$/.test(document.documentElement.lang) ? ' ' + t('auD') : t('auD').charAt(0);
    return (d ? `${d}${dd} ` : '') + `${two(h)}:${two(m)}:${two(x)}`;
  };
  const lang = document.querySelector('.topbar .lang');
  if (lang) {
    const a = document.createElement('a');
    a.className = 'tb-cd'; a.href = '#/subasta'; a.hidden = true;
    lang.before(a);
    const tick = () => {
      if (typeof t !== 'function') return; // app.js (which defines t) loads after this file
      const c = close();
      a.hidden = !c;
      if (!c) return;
      a.innerHTML = `<small>${t('navAuction')}</small><span>${short(c)}</span>`;
      a.setAttribute('aria-label', `${t('navAuction')}: ${t('auEndsIn')} ${cdText(c).replace(/<[^>]+>/g, '')}`);
      a.classList.toggle('tb-cd-soon', Date.parse(c) - Date.now() < 864e5);
    };
    addEventListener('load', tick); setInterval(tick, 1000);
  }
}
