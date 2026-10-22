// Museo Abreu — content brought in from oscarabreu.com and gabangi.com:
// the Paintings, Drawings, Sculpture and Photos galleries (#/pinturas, #/dibujos,
// #/escultura, #/fotos), the 23 manifestos (#/manifiestos), reviews (#/resenas), press (#/prensa),
// exhibitions (#/exposiciones), contact (#/contacto) and
// the ART GABANGI page (#/gabangi) with its sub-pages from gabangi.js.
// Loaded after features.js; adds to EXTRA_ROUTES and EXTRA_ACTIONS, the artist
// section menu (sectionNav) and the home page highlights (homeHighlights).

Object.assign(I18N.es, {
  joinProOnline: 'Hacerme Pro',
  joinClubOnline: 'Unirme al club',
  sponsorOnline: 'Aportar {amount}',
  buyOnline: 'Comprar {price}',
  navFineArt: 'Abreu Fine Art',
  faEyebrow: 'Galería · Los Corales, Bávaro',
  faLead: 'La galería de los proyectos de Oscar Abreu: representación, promoción, ventas y exposiciones temporales, junto al Museo Abreu.',
  faWhere: 'Greenfit Wellness Club, Edificio Gardenia, Los Corales, Bávaro',
  faOpened: 'Abrió el 17 de octubre de 2026',
  faInaugural: 'Exposición inaugural',
  faShowText: 'Pinturas abstractas construidas con capas, gestos y relaciones de color, en torno a los vínculos entre África y el Caribe, la música y el movimiento. Entre las obras: Ecos del tambor ancestral, La danza de los vientos yoruba y El llamado de la kalimba azul.',
  faArtist: 'Julieta Prissell, antigua alumna de Oscar Abreu, vive y trabaja en Chicago. Trabajadora social clínica licenciada y doctora en Trabajo Social, fundó RIMYA, una organización de salud conductual para niños, jóvenes y familias, y tiene formación en arteterapia.',
  faOpening: 'La exposición abrió el 17 de octubre de 2026 a las 3:00 p. m., junto con Top 100 Artists: ART GABANGI 2026, cuya portada muestra una de sus obras.',
  faHistoryTitle: 'De Broadway a Bávaro',
  faHistory: 'El primer Abreu Fine Art abrió en noviembre de 2011 en el 4394 de Broadway, Washington Heights, Nueva York, con la exposición colectiva Memoria/Arte Dominicano. El plan ahora es una sede permanente junto al Museo Abreu: el museo para la trayectoria de Oscar Abreu y el Psico-Expresionismo; la galería para exposiciones temporales, nuevas propuestas y obras disponibles para adquisición.',
  faAsk: 'Consultar obras disponibles',
  faBookNote: 'En palabras de Oscar Abreu, de Ecce Homo (edición en inglés):',
  waFineArt: 'Hola, quiero información sobre las obras de Abreu Fine Art.',
  moreFineArtText: 'La nueva galería en Los Corales: El ritmo de lo invisible, de Julieta Prissell.',
  t100Eyebrow: 'Publicación · ART GABANGI',
  t100Title: 'Top 100 Artists: ART GABANGI 2026',
  t100Text: 'Una publicación de colección que documenta a cien artistas dominicanos de distintas generaciones, con reproducciones de su obra, ensayos y documentos. Su edición principal es en inglés, para que el arte dominicano pueda viajar más allá del país.',
  t100Details: 'Presentado en ART GABANGI 2026 (6–14 de julio) y el 4 de agosto en los Magazines Awards, Universidad Católica Nordestana, San Francisco de Macorís. Diez artistas tienen portadas especiales, cada una vinculada a una exposición individual.',
  t100Ask: 'Solicitar un ejemplar',
  waTop100: 'Hola, quiero un ejemplar de Top 100 Artists: ART GABANGI 2026.',
  moreTop100: 'Top 100 Artists',
  moreTop100Text: 'Cien artistas dominicanos en un libro de colección.',
  paintingsEyebrow: 'Obra', paintingsTitle: 'Pinturas',
  paintingsLead: 'Las pinturas que Oscar Abreu publica en oscarabreu.com, identificadas por número.',
  drawingsTitle: 'Dibujos', drawingsLead: 'Los dibujos que Oscar Abreu publica en oscarabreu.com, identificados por número.',
  sculptureTitle: 'Escultura', sculptureLead: 'Las esculturas que Oscar Abreu publica en oscarabreu.com, identificadas por número.',
  galleryNote: 'oscarabreu.com publica estas obras solo con su número; título, año, técnica y medidas están pendientes.',
  photosTitle: 'Fotos', photosLead: 'Fotos de Oscar Abreu en inauguraciones y encuentros, publicadas en oscarabreu.com.',
  photosNote: 'oscarabreu.com publica estas fotos sin pie de foto, fecha ni nombres.', photosN: 'Foto {n}',
  paintingsN: 'Pintura {n}', drawingsN: 'Dibujo {n}', sculptureN: 'Escultura {n}',
  prev: 'Anterior', next: 'Siguiente',
  gabangiMore: 'Programa y artistas', gabangiEyebrow: 'Feria de arte · Punta Cana',
  gabangiLead: 'ART GABANGI 2026 · Punta Cana · 6–14 de julio. Gala de apertura, feria abierta al público, subasta y premios.',
  gabangiEdition: 'Datos de la edición 2026 publicados en gabangi.com. Las fechas de la próxima edición aún no se han anunciado.',
  gabangiArtists: 'Artistas', gabangiQuotesNote: 'Palabras de Oscar Abreu sobre cada artista, tal como aparecen (en inglés) en gabangi.com.',
  gabangiProgram: 'Programa', gabangiTickets: 'Entradas', gabangiTeam: 'Equipo',
  gabangiTeamLead: 'ART GABANGI está dirigido por un equipo internacional con responsabilidad directa sobre la dirección ejecutiva, las operaciones curatoriales y el desarrollo de mercado en las Américas y Europa.',
  gabangiContact: 'Contactos en gabangi.com',
  gabangiExhibit: 'Exponer en ART GABANGI', gabangiExhibitLead: 'Espacios de exposición para artistas, galerías e instituciones. Todas las solicitudes se revisan con criterios curatoriales y de producción.',
  gbTabFounder: 'Fundador', gbTabClub: 'Club', gbTabEssay: 'Revista', gbTab2025: 'Edición 2025',
  gbFounderNote: 'Texto de Oscar Abreu en su perfil de gabangi.com.',
  gbEssayBy: 'Por Oscar Abreu · Revista GABANGI', gbEssayNote: 'Ensayo publicado en gabangi.com/magazine.',
  gb2025Note: 'Comunicado de noviembre de 2025 publicado en gabangi.com. La edición 2025 (11–17 de diciembre de 2025) ya se celebró.',
  gbTopTen: 'Top Ten GABANGI 2025', gbGGCover: 'Portada de la edición especial de GG Magazine',
  gbClubNote: 'Datos de gabangi.com/club. Para exponer en el festival o participar en la subasta se requiere ser miembro.',
  gbClubJoin: 'Hacerse miembro', gbFaq: 'Preguntas frecuentes',
  gbPackages: 'Paquetes de patrocinio 2026', gbCustom: 'Patrocinio a medida: pantallas, hospitalidad, experiencias curadas o activaciones de marca.',
  gbOfficialSponsors: 'Patrocinadores oficiales',
  gabangiApply: 'Solicitar espacio', gabangiSponsor: 'Patrocinar',
  space: 'Espacio', size: 'Medidas (pies)', price: 'Precio',
  manifestosTitle: 'Los {n} manifiestos', manifestosLead: 'Oscar Abreu escribe sobre el origen, los principios y el futuro del Psico-Expresionismo. Textos completos de oscarabreu.com.',
  allManifestos: 'Todos los manifiestos', navManifestos: 'Manifiestos',
  loadingText: 'Cargando el texto…', manifestoOffline: 'No se pudo cargar el manifiesto. Revise su conexión.', stepsLabel: 'Pasos de la reserva',
  navExhibits: 'Exposiciones', exhibitsLead: 'Exposiciones principales de Oscar Abreu, de oscarabreu.com/biography, y el catálogo publicado en oscarabreu.com/exhibits.',
  catalogueTitle: 'Catálogo', catalogueDates: 'Fechas', catalogueFormat: 'Formato', catalogueEssays: 'Ensayos',
  catalogueQuote: 'Texto original en oscarabreu.com/exhibits (en inglés):',
  catalogueWorks: 'En oscarabreu.com, este catálogo enlaza a una galería de 48 imágenes: son las mismas 36 pinturas y 12 esculturas de las secciones Pinturas y Escultura.',
  navWork: 'Obra', hlTitle: 'Descubre a Oscar Abreu', hlWork: '{p} pinturas, {d} dibujos, {s} esculturas y {f} fotos',
  hlManifestos: 'Los {n} manifiestos del Psico-Expresionismo, en seis idiomas', hlTopTen: 'Diez artistas caribeños destacados por GABANGI',
  hlReviews: '{r} reseñas de la crítica y {p} artículos de prensa sobre su obra', hlPress: 'Reseñas y prensa',
  navContact: 'Contacto', contactLead: 'Contacto de Oscar Abreu, tal como aparece en oscarabreu.com.',
  navPress: 'Prensa', pressCta: 'Prensa ({n})', readArticle: 'Leer en {outlet}',
  navReviews: 'Reseñas', reviewsCta: 'Reseñas de la crítica ({n})', fullReview: 'Leer la reseña completa', langOffline: 'No se pudo cargar el idioma. Revise su conexión.', essayFull: 'Ensayo completo', readEssay: 'Leer el ensayo', backReviews: 'Volver a reseñas', essayWorks: 'Obras del ensayo', essayNote: 'Ensayo publicado en oscarabreu.com/gamalmichelen.', reviewsNote: 'Fragmentos tal como aparecen en oscarabreu.com/reviews.', imagePending: 'imagen no disponible en oscarabreu.com',
});

Object.assign(I18N.en, {
  joinProOnline: 'Become Pro',
  joinClubOnline: 'Join the club',
  sponsorOnline: 'Give {amount}',
  buyOnline: 'Buy {price}',
  navFineArt: 'Abreu Fine Art',
  faEyebrow: 'Gallery · Los Corales, Bávaro',
  faLead: 'The gallery of Oscar Abreu’s projects: representation, promotion, sales and temporary exhibitions, alongside Museo Abreu.',
  faWhere: 'Greenfit Wellness Club, Edificio Gardenia, Los Corales, Bávaro',
  faOpened: 'Opened on October 17, 2026',
  faInaugural: 'Inaugural exhibition',
  faShowText: 'Abstract paintings built from layers, gestures and color relationships, around the bonds between Africa and the Caribbean, music and movement. Among the works: Ecos del tambor ancestral, La danza de los vientos yoruba and El llamado de la kalimba azul.',
  faArtist: 'Julieta Prissell, a former student of Oscar Abreu, lives and works in Chicago. A licensed clinical social worker with a Doctorate in Social Work, she founded RIMYA, a behavioral health organization for children, young people and families, and is trained in art therapy.',
  faOpening: 'The exhibition opened on October 17, 2026 at 3:00 PM, together with Top 100 Artists: ART GABANGI 2026, whose cover features one of her works.',
  faHistoryTitle: 'From Broadway to Bávaro',
  faHistory: 'The first Abreu Fine Art opened in November 2011 at 4394 Broadway, Washington Heights, New York, with the group exhibition Memoria/Arte Dominicano. The plan now is a permanent home next to Museo Abreu: the museum for Oscar Abreu’s career and Psycho-Expressionism, the gallery for temporary exhibitions, new proposals and works available for acquisition.',
  faAsk: 'Ask about available works',
  faBookNote: 'In Oscar Abreu’s words, from Ecce Homo (English edition):',
  waFineArt: 'Hello, I would like information about the works at Abreu Fine Art.',
  moreFineArtText: 'The new gallery in Los Corales: El ritmo de lo invisible by Julieta Prissell.',
  t100Eyebrow: 'Publication · ART GABANGI',
  t100Title: 'Top 100 Artists: ART GABANGI 2026',
  t100Text: 'A collectible publication that documents one hundred Dominican artists from different generations, with reproductions of their work, essays and documents. Its primary edition is in English, so that Dominican art can travel beyond the country.',
  t100Details: 'Presented at ART GABANGI 2026 (July 6–14) and on August 4 at the Magazines Awards, Universidad Católica Nordestana, San Francisco de Macorís. Ten artists have special covers, each linked to a solo exhibition.',
  t100Ask: 'Request a copy',
  waTop100: 'Hello, I would like a copy of Top 100 Artists: ART GABANGI 2026.',
  moreTop100: 'Top 100 Artists',
  moreTop100Text: 'One hundred Dominican artists in one collectible book.',
  paintingsEyebrow: 'Work', paintingsTitle: 'Paintings',
  paintingsLead: 'The paintings Oscar Abreu publishes on oscarabreu.com, identified by number.',
  drawingsTitle: 'Drawings', drawingsLead: 'The drawings Oscar Abreu publishes on oscarabreu.com, identified by number.',
  sculptureTitle: 'Sculpture', sculptureLead: 'The sculptures Oscar Abreu publishes on oscarabreu.com, identified by number.',
  galleryNote: 'oscarabreu.com publishes these works by number only; title, year, technique and size are pending.',
  photosTitle: 'Photos', photosLead: 'Photos of Oscar Abreu at openings and gatherings, published on oscarabreu.com.',
  photosNote: 'oscarabreu.com publishes these photos without captions, dates or names.', photosN: 'Photo {n}',
  paintingsN: 'Painting {n}', drawingsN: 'Drawing {n}', sculptureN: 'Sculpture {n}',
  prev: 'Previous', next: 'Next',
  gabangiMore: 'Programme and artists', gabangiEyebrow: 'Art fair · Punta Cana',
  gabangiLead: 'ART GABANGI 2026 · Punta Cana · July 6–14. Opening gala, public fair, auction and awards.',
  gabangiEdition: 'Details of the 2026 edition as published on gabangi.com. Dates for the next edition have not been announced yet.',
  gabangiArtists: 'Artists', gabangiQuotesNote: 'Oscar Abreu’s words on each artist, as published on gabangi.com.',
  gabangiProgram: 'Programme', gabangiTickets: 'Tickets', gabangiTeam: 'Team',
  gabangiTeamLead: 'ART GABANGI is led by an international team with direct responsibility for executive direction, curatorial operations, and market development across the Americas and Europe.',
  gabangiContact: 'Contacts on gabangi.com',
  gabangiExhibit: 'Exhibit at ART GABANGI', gabangiExhibitLead: 'Exhibition spaces for artists, galleries and institutions. All applications are reviewed under curatorial and production criteria.',
  gbTabFounder: 'Founder', gbTabClub: 'Club', gbTabEssay: 'Magazine', gbTab2025: '2025 edition',
  gbFounderNote: 'Text by Oscar Abreu on his gabangi.com profile.',
  gbEssayBy: 'By Oscar Abreu · GABANGI Magazine', gbEssayNote: 'Essay published on gabangi.com/magazine.',
  gb2025Note: 'November 2025 press release published on gabangi.com. The 2025 edition (December 11–17, 2025) has already taken place.',
  gbTopTen: 'GABANGI 2025 Top Ten', gbGGCover: 'Cover of the GG Magazine special edition',
  gbClubNote: 'Details from gabangi.com/club. Membership is required to exhibit at the festival or take part in the auction.',
  gbClubJoin: 'Become a member', gbFaq: 'FAQ',
  gbPackages: '2026 sponsorship packages', gbCustom: 'Custom sponsorship: screens, hospitality, curated experiences or brand activations.',
  gbOfficialSponsors: 'Official sponsors',
  gabangiApply: 'Apply to exhibit', gabangiSponsor: 'Become a sponsor',
  space: 'Space', size: 'Size (ft)', price: 'Price',
  manifestosTitle: 'The {n} manifestos', manifestosLead: 'Oscar Abreu writes about the origin, principles and future of Psycho-Expressionism. Full texts from oscarabreu.com.',
  allManifestos: 'All manifestos', navManifestos: 'Manifestos',
  loadingText: 'Loading the text…', manifestoOffline: 'The manifesto could not be loaded. Check your connection.', stepsLabel: 'Booking steps',
  navExhibits: 'Exhibitions', exhibitsLead: 'Oscar Abreu’s major exhibitions, from oscarabreu.com/biography, and the catalogue published on oscarabreu.com/exhibits.',
  catalogueTitle: 'Catalogue', catalogueDates: 'Dates', catalogueFormat: 'Format', catalogueEssays: 'Essays',
  catalogueQuote: 'Original text on oscarabreu.com/exhibits:',
  catalogueWorks: 'On oscarabreu.com, this catalogue links to a gallery of 48 images: the same 36 paintings and 12 sculptures as in the Paintings and Sculpture sections.',
  navWork: 'Work', hlTitle: 'Discover Oscar Abreu', hlWork: '{p} paintings, {d} drawings, {s} sculptures and {f} photos',
  hlManifestos: 'The {n} manifestos of Psycho-Expressionism, in six languages', hlTopTen: 'Ten Caribbean artists highlighted by GABANGI',
  hlReviews: '{r} critics’ reviews and {p} press articles on his work', hlPress: 'Reviews and press',
  navContact: 'Contact', contactLead: 'Oscar Abreu’s contact details, as published on oscarabreu.com.',
  navPress: 'Press', pressCta: 'Press ({n})', readArticle: 'Read on {outlet}',
  navReviews: 'Reviews', reviewsCta: 'Critics’ reviews ({n})', fullReview: 'Read the full review', langOffline: 'The language could not be loaded. Check your connection.', essayFull: 'Full essay', readEssay: 'Read the essay', backReviews: 'Back to reviews', essayWorks: 'Works in the essay', essayNote: 'Essay published on oscarabreu.com/gamalmichelen.', reviewsNote: 'Excerpts as published on oscarabreu.com/reviews.', imagePending: 'image not available on oscarabreu.com',
});

Object.assign(I18N.fr, {
  joinProOnline: 'Devenir Pro',
  joinClubOnline: 'Rejoindre le club',
  sponsorOnline: 'Donner {amount}',
  buyOnline: 'Acheter {price}',
  navFineArt: 'Abreu Fine Art',
  faEyebrow: 'Galerie · Los Corales, Bávaro',
  faLead: 'La galerie des projets d’Oscar Abreu : représentation, promotion, ventes et expositions temporaires, aux côtés du Museo Abreu.',
  faWhere: 'Greenfit Wellness Club, Edificio Gardenia, Los Corales, Bávaro',
  faOpened: 'Ouverte le 17 octobre 2026',
  faInaugural: 'Exposition inaugurale',
  faShowText: 'Des peintures abstraites construites par couches, gestes et relations de couleur, autour des liens entre l’Afrique et les Caraïbes, la musique et le mouvement. Parmi les œuvres : Ecos del tambor ancestral, La danza de los vientos yoruba et El llamado de la kalimba azul.',
  faArtist: 'Julieta Prissell, ancienne élève d’Oscar Abreu, vit et travaille à Chicago. Travailleuse sociale clinicienne diplômée et docteure en travail social, elle a fondé RIMYA, une organisation de santé comportementale pour les enfants, les jeunes et les familles, et est formée à l’art-thérapie.',
  faOpening: 'L’exposition a ouvert le 17 octobre 2026 à 15 h, avec Top 100 Artists : ART GABANGI 2026, dont la couverture reproduit l’une de ses œuvres.',
  faHistoryTitle: 'De Broadway à Bávaro',
  faHistory: 'Le premier Abreu Fine Art a ouvert en novembre 2011 au 4394 Broadway, à Washington Heights, New York, avec l’exposition collective Memoria/Arte Dominicano. Le projet est désormais un lieu permanent à côté du Museo Abreu : le musée pour la carrière d’Oscar Abreu et le Psycho-Expressionnisme, la galerie pour les expositions temporaires, les nouvelles propositions et les œuvres disponibles à l’acquisition.',
  faAsk: 'Se renseigner sur les œuvres disponibles',
  faBookNote: 'Dans les mots d’Oscar Abreu, extraits d’Ecce Homo (édition anglaise) :',
  waFineArt: 'Bonjour, je souhaite des informations sur les œuvres d’Abreu Fine Art.',
  moreFineArtText: 'La nouvelle galerie à Los Corales : El ritmo de lo invisible de Julieta Prissell.',
  t100Eyebrow: 'Publication · ART GABANGI',
  t100Title: 'Top 100 Artists : ART GABANGI 2026',
  t100Text: 'Une publication de collection qui documente cent artistes dominicains de différentes générations, avec des reproductions de leurs œuvres, des essais et des documents. Son édition principale est en anglais, pour que l’art dominicain puisse voyager au-delà du pays.',
  t100Details: 'Présentée à ART GABANGI 2026 (6–14 juillet) et le 4 août aux Magazines Awards, Universidad Católica Nordestana, San Francisco de Macorís. Dix artistes ont des couvertures spéciales, chacune liée à une exposition personnelle.',
  t100Ask: 'Demander un exemplaire',
  waTop100: 'Bonjour, je souhaite un exemplaire de Top 100 Artists : ART GABANGI 2026.',
  moreTop100: 'Top 100 Artists',
  moreTop100Text: 'Cent artistes dominicains dans un livre de collection.',
  paintingsEyebrow: 'Œuvre',
  paintingsTitle: 'Peintures',
  paintingsLead: 'Les peintures qu’Oscar Abreu publie sur oscarabreu.com, identifiées par leur numéro.',
  drawingsTitle: 'Dessins',
  drawingsLead: 'Les dessins qu’Oscar Abreu publie sur oscarabreu.com, identifiés par leur numéro.',
  sculptureTitle: 'Sculpture',
  sculptureLead: 'Les sculptures qu’Oscar Abreu publie sur oscarabreu.com, identifiées par leur numéro.',
  galleryNote: 'oscarabreu.com publie ces œuvres uniquement avec leur numéro ; titre, année, technique et dimensions à venir.',
  photosTitle: 'Photos',
  photosLead: 'Photos d’Oscar Abreu lors de vernissages et de rencontres, publiées sur oscarabreu.com.',
  photosNote: 'oscarabreu.com publie ces photos sans légende, date ni noms.',
  photosN: 'Photo {n}',
  paintingsN: 'Peinture {n}',
  drawingsN: 'Dessin {n}',
  sculptureN: 'Sculpture {n}',
  prev: 'Précédent',
  next: 'Suivant',
  gabangiMore: 'Programme et artistes',
  gabangiEyebrow: 'Foire d’art · Punta Cana',
  gabangiLead: 'ART GABANGI 2026 · Punta Cana · 6–14 juillet. Gala d’ouverture, foire ouverte au public, vente aux enchères et prix.',
  gabangiEdition: 'Informations de l’édition 2026 publiées sur gabangi.com. Les dates de la prochaine édition n’ont pas encore été annoncées.',
  gabangiArtists: 'Artistes',
  gabangiQuotesNote: 'Les mots d’Oscar Abreu sur chaque artiste, tels que publiés (en anglais) sur gabangi.com.',
  gabangiProgram: 'Programme',
  gabangiTickets: 'Billets',
  gabangiTeam: 'Équipe',
  gabangiTeamLead: 'ART GABANGI est dirigé par une équipe internationale directement responsable de la direction exécutive, des opérations curatoriales et du développement du marché dans les Amériques et en Europe.',
  gabangiContact: 'Contacts sur gabangi.com',
  gabangiExhibit: 'Exposer à ART GABANGI',
  gabangiExhibitLead: 'Espaces d’exposition pour artistes, galeries et institutions. Toutes les candidatures sont examinées selon des critères curatoriaux et de production.',
  gbTabFounder: 'Fondateur',
  gbTabClub: 'Club',
  gbTabEssay: 'Revue',
  gbTab2025: 'Édition 2025',
  gbFounderNote: 'Texte d’Oscar Abreu sur son profil gabangi.com.',
  gbEssayBy: 'Par Oscar Abreu · Revue GABANGI',
  gbEssayNote: 'Essai publié sur gabangi.com/magazine.',
  gb2025Note: 'Communiqué de novembre 2025 publié sur gabangi.com. L’édition 2025 (11–17 décembre 2025) a déjà eu lieu.',
  gbTopTen: 'Top Ten GABANGI 2025',
  gbGGCover: 'Couverture de l’édition spéciale de GG Magazine',
  gbClubNote: 'Informations de gabangi.com/club. L’adhésion est requise pour exposer au festival ou participer à la vente aux enchères.',
  gbClubJoin: 'Devenir membre',
  gbFaq: 'Questions fréquentes',
  gbPackages: 'Formules de parrainage 2026',
  gbCustom: 'Parrainage sur mesure : écrans, hospitalité, expériences curatoriales ou activations de marque.',
  gbOfficialSponsors: 'Partenaires officiels',
  gabangiApply: 'Demander un espace',
  gabangiSponsor: 'Devenir partenaire',
  space: 'Espace',
  size: 'Dimensions (pieds)',
  price: 'Prix',
  manifestosTitle: 'Les {n} manifestes',
  manifestosLead: 'Oscar Abreu écrit sur l’origine, les principes et l’avenir du Psycho-Expressionnisme. Textes complets d’oscarabreu.com.',
  allManifestos: 'Tous les manifestes',
  navManifestos: 'Manifestes',
  loadingText: 'Chargement du texte…',
  manifestoOffline: 'Le manifeste n’a pas pu être chargé. Vérifiez votre connexion.',
  stepsLabel: 'Étapes de la réservation',
  navExhibits: 'Expositions',
  exhibitsLead: 'Les principales expositions d’Oscar Abreu, d’après oscarabreu.com/biography, et le catalogue publié sur oscarabreu.com/exhibits.',
  catalogueTitle: 'Catalogue',
  catalogueDates: 'Dates',
  catalogueFormat: 'Format',
  catalogueEssays: 'Essais',
  catalogueQuote: 'Texte original sur oscarabreu.com/exhibits (en anglais) :',
  catalogueWorks: 'Sur oscarabreu.com, ce catalogue renvoie à une galerie de 48 images : les mêmes 36 peintures et 12 sculptures que dans les sections Peintures et Sculpture.',
  navWork: 'Œuvre',
  hlTitle: 'Découvrir Oscar Abreu',
  hlWork: '{p} peintures, {d} dessins, {s} sculptures et {f} photos',
  hlManifestos: 'Les {n} manifestes du Psycho-Expressionnisme, en six langues',
  hlTopTen: 'Dix artistes caribéens mis en avant par GABANGI',
  hlReviews: '{r} critiques et {p} articles de presse sur son œuvre',
  hlPress: 'Critiques et presse',
  navContact: 'Contact',
  contactLead: 'Les coordonnées d’Oscar Abreu, telles que publiées sur oscarabreu.com.',
  navPress: 'Presse',
  pressCta: 'Presse ({n})',
  readArticle: 'Lire sur {outlet}',
  navReviews: 'Critiques',
  reviewsCta: 'Critiques ({n})',
  fullReview: 'Lire la critique complète',
  langOffline: 'La langue n’a pas pu être chargée. Vérifiez votre connexion.',
  essayFull: 'Essai complet',
  readEssay: 'Lire l’essai',
  backReviews: 'Retour aux critiques',
  essayWorks: 'Œuvres de l’essai',
  essayNote: 'Essai publié sur oscarabreu.com/gamalmichelen.',
  reviewsNote: 'Extraits tels que publiés sur oscarabreu.com/reviews.',
  imagePending: 'image non disponible sur oscarabreu.com',
});

/* ---------- Data (gabangi.com, ART GABANGI 2026) ---------- */

const GABANGI = {
  artists: [
    { name: 'Engel Segura', img: 'img/gabangi/engel-segura.jpg',
      quote: 'In the work of Engel Segura, painting becomes a territory of tension and silence, where the image does not seek to please but to confront.' },
    { name: 'Héctor Reynoso', img: 'img/gabangi/hector-reynoso.jpg',
      quote: 'Héctor Reynoso constructs a surreal universe in which the Caribbean subconscious unfolds through symbols and psychological tension.' },
    { name: 'Carlos Santiago', img: 'img/gabangi/carlos-santiago.jpg',
      quote: 'Carlos Santiago advances a disciplined pictorial language where form and emotion negotiate in silence.' },
  ],
  // "Key Dates" on gabangi.com/sponsor, with details from /tickets.
  program: [
    { date: { es: '6 de julio', en: 'July 6', fr: '6 juillet' }, name: 'Gala Premier',
      items: { es: ['Puertas 6:00 p. m.', 'Evento principal 8:00 p. m.', 'Celebración de apertura'],
        en: ['Doors 6:00 PM', 'Main event 8:00 PM', 'Opening celebration'], fr: ['Portes 18 h', 'Événement principal 20 h', 'Célébration d’ouverture'] } },
    { date: { es: '7–14 de julio', en: 'July 7–14', fr: '7–14 juillet' }, name: { es: 'Feria abierta al público', en: 'Public Fair', fr: 'Foire ouverte au public' },
      items: { es: ['10:00 a. m. – 8:00 p. m.', 'El 14 de julio cierra a las 5:00 p. m.'],
        en: ['10:00 AM – 8:00 PM', 'July 14 closes 5:00 PM'], fr: ['10 h – 20 h', 'Le 14 juillet, fermeture à 17 h'] } },
    { date: { es: '14 de julio', en: 'July 14', fr: '14 juillet' }, name: { es: 'Cena de Subasta y Premios', en: 'Auction & Awards Dinner', fr: 'Dîner de vente aux enchères et remise des prix' },
      items: { es: ['Cena 7:00 p. m.', 'Subasta en vivo durante la cena', 'Premio Artista del Año', 'Reconocimiento a líderes políticos, sociales y culturales'],
        en: ['Dinner 7:00 PM', 'Live auction during dinner', 'Artist of the Year Award', 'Recognition of political, social & cultural leaders'], fr: ['Dîner 19 h', 'Vente aux enchères en direct pendant le dîner', 'Prix de l’Artiste de l’année', 'Hommage à des personnalités politiques, sociales et culturelles'] } },
  ],
  team: [
    { name: 'Oscar Abreu', role: { es: 'Director Ejecutivo · CEO', en: 'Executive Director · CEO', fr: 'Directeur exécutif · CEO' } },
    { name: 'Reed Newhall', role: { es: 'Director de Operaciones Curatoriales en EE. UU.', en: 'Director of U.S. Curatorial Operations', fr: 'Directeur des opérations curatoriales aux États-Unis' } },
    { name: 'Thomas Rehberger', role: { es: 'Representante de Ventas para Europa', en: 'European Sales Representative', fr: 'Représentant commercial pour l’Europe' } },
    { name: 'Karima Boutaleb', role: { es: 'Representante Curatorial Internacional', en: 'International Curatorial Representative', fr: 'Représentante curatoriale internationale' } },
  ],
  // gabangi.com/sponsor, "Sponsorship Packages" (ART GABANGI 2026).
  sponsors: [
    { name: 'Supporter', price: 3000, items: { es: ['Catálogo: 1 página completa', 'Logo en la línea de patrocinadores de la web', 'Mención en la lista digital de patrocinadores', '2 entradas de Día regular'],
      en: ['Catalog: 1 full page', 'Logo on website sponsor line', 'Mention on digital sponsor roll', '2 Regular Day tickets'], fr: ['Catalogue : 1 page entière', 'Logo sur la ligne des partenaires du site', 'Mention dans la liste numérique des partenaires', '2 billets Journée'] } },
    { name: 'Official Sponsor', price: 5000, items: { es: ['Catálogo: 1 doble página', 'Logo en la web (posición superior)', 'Logo en materiales impresos seleccionados', '4 entradas de Día regular'],
      en: ['Catalog: 1 double-page spread', 'Logo on website (top placement)', 'Logo in selected printed materials', '4 Regular Day tickets'], fr: ['Catalogue : 1 double page', 'Logo sur le site (position principale)', 'Logo sur une sélection de supports imprimés', '4 billets Journée'] } },
    { name: 'Partner', price: 10000, items: { es: ['Catálogo: 1 doble página', 'Reportaje editorial: 3 páginas', 'Logo destacado (web y en el lugar)', '2 pases VIP All-Access', '2 puestos en la Cena de Subasta y Premios'],
      en: ['Catalog: 1 double-page spread', 'Editorial feature: 3 pages', 'Premium logo placement (web + onsite)', '2 VIP All-Access passes', '2 Auction & Awards Dinner seats'], fr: ['Catalogue : 1 double page', 'Reportage éditorial : 3 pages', 'Logo en position premium (site et sur place)', '2 pass VIP All-Access', '2 places au Dîner de vente aux enchères et remise des prix'] } },
    { name: 'Title Sponsor', price: 30000, items: { es: ['Catálogo: 1 doble página', 'Reportaje editorial: 5 páginas', 'Reconocimiento oficial como Patrocinador Oficial', 'Logo principal en los materiales clave', 'Reconocimiento en tarima en la Gala y la Cena de Premios', '4 pases VIP All-Access', '6 puestos en la Cena de Subasta y Premios'],
      en: ['Catalog: 1 double-page spread', 'Editorial feature: 5 pages', 'Official recognition as an Official Sponsor', 'Top logo placement across key assets', 'On-stage recognition at Gala & Awards Dinner', '4 VIP All-Access passes', '6 Auction & Awards Dinner seats'], fr: ['Catalogue : 1 double page', 'Reportage éditorial : 5 pages', 'Reconnaissance officielle comme partenaire officiel', 'Logo principal sur les supports clés', 'Hommage sur scène lors du Gala et du Dîner des prix', '4 pass VIP All-Access', '6 places au Dîner de vente aux enchères et remise des prix'] } },
  ],
  // Home page sponsor line.
  officialSponsors: [['Centro Abreu', 'https://centroabreu.com'], ['ARTFORO', 'https://artforo.com']],
  // gabangi.com/apply, "Exhibition Spaces & Pricing" (USD).
  spaces: [
    ['Compact Booth', '5 × 10', 2800], ['Standard Booth', '10 × 10', 5000], ['Extended Booth', '15 × 15', 8500],
    ['Panoramic Booth', '10 × 20', 9500], ['Signature Pavilion', '20 × 20', 15000],
  ],
};

// Manifestos 1–2 (data.js) are paragraph lists; 3–23 are blocks whose text
// (manifestos-text.js) loads the first time one of them is opened.
const paraBlocks = ps => ps.map(p => /^[«“]/.test(p) ? { q: p } : p);
const MANIFESTOS = [
  { ...MANIFESTO, n: 1, es: paraBlocks(MANIFESTO.es), en: paraBlocks(MANIFESTO.en), fr: paraBlocks(MANIFESTO.fr) },
  { ...MANIFESTO2, n: 2, es: paraBlocks(MANIFESTO2.es), en: paraBlocks(MANIFESTO2.en), fr: paraBlocks(MANIFESTO2.fr) },
  ...MANIFESTOS_MORE,
];

/* ---------- Pages ---------- */

function manifestoList() {
  return `<ol class="m-index">${MANIFESTOS.map(m => {
    const w = findWork(m.work);
    return `<li><a href="#/manifiestos/${m.n}">${w.img ? `<img src="${w.img}" alt="" loading="lazy">` : '<span class="m-noimg"></span>'}
      <span><small>${m.n}</small><strong>${L(m.title)}</strong></span></a></li>`;
  }).join('')}</ol>`;
}

let manifestoTextLoad = null;
function loadManifestoText() {
  if (!manifestoTextLoad) manifestoTextLoad = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'manifestos-text.js';
    s.onload = () => { for (const m of MANIFESTOS) Object.assign(m, MANIFESTO_TEXT[m.n]); resolve(); };
    s.onerror = () => { manifestoTextLoad = null; s.remove(); reject(); };
    document.head.appendChild(s);
  });
  return manifestoTextLoad;
}

// German, Italian and Arabic text of manifestos 3–23 (lang/<code>-manifestos.js adds it to TR).
const MANIFESTO_LANGS = new Set();
const manifestoLangLoad = {};
function loadManifestoLang(l) {
  if (!LAZY_LANGS.includes(l) || MANIFESTO_LANGS.has(l)) return Promise.resolve();
  return manifestoLangLoad[l] ||= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `lang/${l}-manifestos.js`;
    s.onload = resolve;
    s.onerror = () => { delete manifestoLangLoad[l]; s.remove(); reject(); };
    document.head.appendChild(s);
  });
}

function pageManifestos(nStr) {
  const n = Number(nStr), m = MANIFESTOS.find(x => x.n === n);
  if (m && m.n > 2 && (!m.es || (LAZY_LANGS.includes(lang) && !MANIFESTO_LANGS.has(lang)))) {
    Promise.all([loadManifestoText(), loadManifestoLang(lang)])
      .then(() => { if (location.hash === '#/manifiestos/' + n) route(); }, () => toast(t('manifestoOffline')));
    return `<div class="wrap"><section class="section"><p class="eyebrow">${t('manifestoEyebrow')} ${n}/${MANIFESTOS.length}</p>
      <h1>${L(m.title)}</h1><p class="muted" style="margin-top:1rem">${t('loadingText')}</p></section></div>`;
  }
  if (!m) return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('navPsico')}</p><h1>${t('manifestosTitle', { n: MANIFESTOS.length })}</h1>
      <p class="lead" style="margin-top:.8rem">${t('manifestosLead')}</p>
    </section>
    <section class="section">${manifestoList()}</section>
  </div>`;
  const prev = MANIFESTOS.find(x => x.n === n - 1), next = MANIFESTOS.find(x => x.n === n + 1);
  return `<div class="wrap">
    ${manifestoSection(m, true)}
    <nav class="m-nav" aria-label="${t('allManifestos')}">
      ${prev ? `<a class="btn" href="#/manifiestos/${prev.n}"><span class="arr">←</span> ${prev.n}. ${L(prev.title)}</a>` : '<span></span>'}
      ${next ? `<a class="btn" href="#/manifiestos/${next.n}">${next.n}. ${L(next.title)} <span class="arr">→</span></a>` : '<span></span>'}
    </nav>
    <div class="btn-row"><a class="btn dark" href="#/manifiestos">${t('allManifestos')}</a></div>
  </div>`;
}

// Artist section: one menu above every page about Oscar Abreu, and the top
// menu's "Oscar Abreu" link stays active on all of them (see route() in app.js).
const SECTION_TABS = [['artista', 'Oscar Abreu'], ['psico', 'navPsico'], ['pinturas', 'navWork', ['dibujos', 'escultura', 'fotos']],
  ['manifiestos', 'navManifestos'], ['resenas', 'navReviews'], ['prensa', 'navPress'], ['exposiciones', 'navExhibits'], ['contacto', 'navContact']];
const ROUTE_SECTION = Object.fromEntries(SECTION_TABS.flatMap(([k, , also = []]) => [k, ...also].map(r => [r, 'artista'])));
function sectionNav(name) {
  if (ROUTE_SECTION[name] !== 'artista') return '';
  return `<nav class="section-nav" aria-label="Oscar Abreu"><div class="wrap tabs">${SECTION_TABS.map(([k, label, also = []]) =>
    `<a class="tab" href="#/${k}"${k === name || also.includes(name) ? ' aria-current="page"' : ''}>${label === 'Oscar Abreu' ? label : t(label)}</a>`).join('')}</div></nav>`;
}

function homeHighlights() {
  const card = (href, img, title, text) => `<a class="card hl" href="${href}"><img src="${img}" alt="" loading="lazy"><h3>${title}</h3><p class="muted">${text}</p></a>`;
  return `<section class="section"><h2>${t('hlTitle')}</h2>
    <div class="grid four" style="margin-top:1rem">
      ${card('#/pinturas', PAINTINGS[5].img, t('navWork'), t('hlWork', { p: PAINTINGS.length, d: DRAWINGS.length, s: SCULPTURES.length, f: PHOTOS.length }))}
      ${card('#/manifiestos', 'img/escaping-being.jpg', t('navManifestos'), t('hlManifestos', { n: MANIFESTOS.length }))}
      ${card('#/gabangi/2025', 'img/petrichor.jpg', t('gbTopTen'), t('hlTopTen'))}
      ${card('#/resenas', CONTACT.photo, t('hlPress'), t('hlReviews', { r: REVIEWS.items.length, p: BIBLIOGRAPHY.items.length }))}
    </div></section>`;
}

// The three numbered galleries of oscarabreu.com share one page and lightbox.
const GALLERIES = {
  pinturas: { items: PAINTINGS, key: 'paintings', site: 'oscarabreu.com/paintings' },
  dibujos: { items: DRAWINGS, key: 'drawings', site: 'oscarabreu.com/drawings' },
  escultura: { items: SCULPTURES, key: 'sculpture', site: 'oscarabreu.com/sculpture' },
  fotos: { items: PHOTOS, key: 'photos', site: 'oscarabreu.com/photos', photos: true },
};

function pageGallery(id) {
  const g = GALLERIES[id];
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${g.photos ? 'Oscar Abreu' : t('paintingsEyebrow')}</p><h1>${t(g.key + 'Title')}</h1>
      <nav class="tabs gallery-tabs" aria-label="${t('navWork')}" style="margin-top:1rem">${Object.entries(GALLERIES).map(([k, x]) =>
        `<a class="tab" href="#/${k}"${k === id ? ' aria-current="page"' : ''}>${t(x.key + 'Title')} · ${x.items.length}</a>`).join('')}</nav>
      <p class="lead" style="margin-top:1rem">${t(g.key + 'Lead')}</p>
      <p class="muted" style="margin-top:.5rem">${t(g.photos ? 'photosNote' : 'galleryNote')}</p>
    </section>
    <section class="section">
      <div class="paintings">${g.items.map(p => `<button type="button" class="painting" data-action="galleryItem" data-g="${id}" data-n="${p.n}" aria-label="${t(g.key + 'N', { n: p.n })}">
        <img src="${p.img}" alt="" loading="lazy"><span>${p.n}</span></button>`).join('')}</div>
      <p class="muted" style="margin-top:1rem">${t('sourceLabel')}: <a href="https://${g.site}" target="_blank" rel="noopener">${g.site} ↗</a></p>
    </section>
  </div>`;
}

// Lightbox with previous/next, swipe and arrow keys.
function openGalleryItem(id, n) {
  const g = GALLERIES[id], items = g.items;
  const dlg = document.createElement('dialog');
  const show = k => {
    n = (k + items.length - 1) % items.length + 1;
    const name = t(g.key + 'N', { n });
    dlg.setAttribute('aria-label', name);
    dlg.innerHTML = `<div class="dlg-body">
      <div class="dlg-art"><img src="${items[n - 1].img}" alt="${name}, Oscar Abreu"></div>
      <h3 style="margin-top:1rem">${name} <span class="muted">· ${n}/${items.length}</span></h3>
      <p class="muted">${t(g.photos ? 'photosNote' : 'galleryNote')}</p>
      <div class="btn-row">
        <button class="btn small" data-dlg="prev" aria-label="${t('prev')}"><span class="arr">←</span></button>
        <button class="btn small" data-dlg="next" aria-label="${t('next')}"><span class="arr">→</span></button>
        ${g.photos ? '' : `<button class="btn dark small" data-dlg="acquire">${circleStatus() === 'member' ? t('ciInterest') : t('ciRequestCta')}</button>`}
        <button class="btn small" data-dlg="close">${t('close')}</button>
      </div></div>`;
  };
  show(n);
  document.body.appendChild(dlg);
  dlg.addEventListener('click', e => {
    const b = e.target.closest('[data-dlg]');
    if (e.target === dlg || (b && b.dataset.dlg === 'close')) dlg.close();
    else if (b && b.dataset.dlg === 'prev') show(n - 1);
    else if (b && b.dataset.dlg === 'next') show(n + 1);
    else if (b && b.dataset.dlg === 'acquire') {
      dlg.close();
      if (circleStatus() !== 'member') actions.circleRequest({ dataset: {} });
      else if (!(BOOKING.live && openWhatsApp(t('waCircleInterest', { name: circle().name, title: `${t(g.key + 'N', { n })} (${g.site})` })))) toast(t('ciInterestSent'));
    }
  });
  dlg.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(n - 1);
    if (e.key === 'ArrowRight') show(n + 1);
  });
  let x0 = null;
  dlg.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) show(dx < 0 ? n + 1 : n - 1);
  }, { passive: true });
  dlg.addEventListener('close', () => dlg.remove());
  dlg.showModal();
}

function pageMichelen() {
  const m = MICHELEN, [hero, ...rest] = m.works;
  const fig = w => `<figure class="gb-fig"><img src="${w.img}" alt="${esc(w.title)}" loading="lazy"><figcaption>${esc(w.title)}</figcaption></figure>`;
  return `<div class="wrap">
    <section class="section"><p class="eyebrow"><a href="#/resenas"><span class="arr">←</span> ${t('backReviews')}</a></p><h1>${L(m.title)}</h1>
      <p class="muted" style="margin-top:.6rem">${L(m.by)}</p></section>
    <section class="section manifesto">${fig(hero)}${L(m).map(p => `<p>${esc(p)}</p>`).join('')}</section>
    <section class="section"><h2>${t('essayWorks')}</h2><div class="gb-figs">${rest.map(fig).join('')}</div>
      <p class="muted" style="margin-top:1rem">${t('essayNote')} <a href="${m.url}" target="_blank" rel="noopener">oscarabreu.com/gamalmichelen ↗</a></p></section>
  </div>`;
}

function pageReviews(sub) {
  if (sub === 'michelen') return pageMichelen();
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">Oscar Abreu</p><h1>${L(REVIEWS.title)}</h1>
      <p class="lead" style="margin-top:.8rem">${L(REVIEWS.intro)}</p>
    </section>
    <section class="section">
      <a class="card essay-card" href="#/resenas/michelen"><img src="${MICHELEN.works[0].img}" alt="" loading="lazy">
        <div><p class="eyebrow">${t('essayFull')}</p><h2>${L(MICHELEN.title)}</h2><p class="muted">${L(MICHELEN.by)}</p>
        <span class="btn" style="margin-top:.8rem">${t('readEssay')} <span class="arr">→</span></span></div></a>
    </section>
    <section class="section">
      <div class="grid two">${REVIEWS.items.map(r => `<figure class="card quote"><blockquote>“${esc(L(r))}”</blockquote>
        <figcaption><strong>${r.critic}</strong><br><span class="muted">${r.year}</span>
        ${r.url ? `<br><a href="${r.url}" target="_blank" rel="noopener">${t('fullReview')} ↗</a>` : ''}</figcaption></figure>`).join('')}</div>
      <p class="muted" style="margin-top:1rem">${t('reviewsNote')} ${t('sourceLabel')}: <a href="https://oscarabreu.com/reviews" target="_blank" rel="noopener">oscarabreu.com/reviews ↗</a></p>
    </section>
  </div>`;
}

function pageBibliography() {
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">Oscar Abreu</p><h1>${L(BIBLIOGRAPHY.title)}</h1>
      <p class="lead" style="margin-top:.8rem">${L(BIBLIOGRAPHY.intro)}</p>
      <p class="muted" style="margin-top:.5rem">${L(BIBLIOGRAPHY.note)}</p>
    </section>
    <section class="section">
      <div class="grid two">${BIBLIOGRAPHY.items.map(b => `<article class="card press">
        <p class="eyebrow" style="margin:0 0 .3rem">${b.outlet}${b.date ? ` · <time datetime="${b.date}">${fmtDate(b.date, { day: 'numeric', month: 'short', year: 'numeric' })}</time>` : ''}</p>
        <h2 class="h3" lang="es">${esc(b.title)}</h2>
        <p style="margin-top:.4rem">${esc(L(b))}</p>
        <a class="press-link" href="${b.url}" target="_blank" rel="noopener">${t('readArticle', { outlet: b.outlet })} ↗</a>
      </article>`).join('')}</div>
      <p class="muted" style="margin-top:1rem">${t('sourceLabel')}: <a href="https://oscarabreu.com/bibliography" target="_blank" rel="noopener">oscarabreu.com/bibliography ↗</a></p>
    </section>
  </div>`;
}

function pageExhibits() {
  const c = CATALOGUE;
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">Oscar Abreu</p><h1>${t('navExhibits')}</h1>
      <p class="lead" style="margin-top:.8rem">${t('exhibitsLead')}</p>
    </section>
    <section class="section">
      <h2>${t('catalogueTitle')}</h2>
      <article class="card catalogue">
        <img src="${c.img}" alt="${esc(c.title)}">
        <div>
          <h3>${c.title}</h3>
          <p class="muted">${c.venue} · ${c.year}</p>
          <dl class="specs">
            <dt>${t('catalogueDates')}</dt><dd>${L(c.dates)}</dd>
            <dt>${t('catalogueFormat')}</dt><dd>${L(c.format)}</dd>
            <dt>${t('catalogueEssays')}</dt><dd>${c.essays}</dd>
          </dl>
        </div>
      </article>
      <p class="muted" style="margin-top:.8rem">${t('catalogueQuote')}</p>
      <blockquote class="m-quote" lang="en">${esc(c.text)}</blockquote>
      <p>${t('catalogueWorks')}</p>
      <div class="btn-row"><a class="btn" href="#/pinturas">${t('paintingsTitle')} · ${PAINTINGS.length}</a><a class="btn" href="#/escultura">${t('sculptureTitle')} · ${SCULPTURES.length}</a></div>
    </section>
    <section class="section">
      <h2>${t('exhibitions')}</h2>
      <ul class="timeline">${EXHIBITIONS.slice().reverse().map(e => `<li><strong><i>${e.t}</i></strong><br><span class="muted">${expoPlace(e)} · ${e.y}</span></li>`).join('')}</ul>
      <p class="muted" style="margin-top:1rem">${t('sourceLabel')}: <a href="https://oscarabreu.com/exhibits" target="_blank" rel="noopener">oscarabreu.com/exhibits ↗</a> · <a href="https://oscarabreu.com/biography" target="_blank" rel="noopener">oscarabreu.com/biography ↗</a></p>
    </section>
  </div>`;
}

function pageContact() {
  return `<div class="wrap">
    <section class="section contact">
      <img class="contact-photo" src="${CONTACT.photo}" alt="Oscar Abreu">
      <div>
        <p class="eyebrow">Oscar Abreu</p><h1>${t('navContact')}</h1>
        <p class="lead" style="margin-top:.8rem">${t('contactLead')}</p>
        <ul class="contact-list">
          <li><span class="muted">WhatsApp</span><a href="${CONTACT.whatsapp.url}" target="_blank" rel="noopener">${CONTACT.whatsapp.label}</a></li>
          <li><span class="muted">Instagram</span><a href="${CONTACT.instagram.url}" target="_blank" rel="noopener">${CONTACT.instagram.label}</a></li>
          <li><span class="muted">Email</span><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        </ul>
        <div class="btn-row"><a class="btn wa" href="${CONTACT.whatsapp.url}" target="_blank" rel="noopener">WhatsApp ↗</a></div>
        <p class="muted" style="margin-top:1rem">${t('sourceLabel')}: <a href="https://oscarabreu.com/contact" target="_blank" rel="noopener">oscarabreu.com/contact ↗</a></p>
      </div>
    </section>
  </div>`;
}

// Site text that carries <em>/<strong> (gabangi.js): escape, then allow those tags back.
const rich = s => esc(s).replace(/&lt;(\/?)(em|strong)&gt;/g, '<$1$2>');
const richParas = ps => ps.map(p => `<p>${rich(p)}</p>`).join('');

const GB_TABS = [['', 'ART GABANGI 2026'], ['fundador', 'gbTabFounder'], ['club', 'gbTabClub'], ['revista', 'gbTabEssay'], ['2025', 'gbTab2025']];
const gbTabs = sub => `<nav class="tabs gallery-tabs" aria-label="GABANGI" style="margin-top:1rem">${GB_TABS.map(([k, label]) =>
  `<a class="tab" href="#/gabangi${k ? '/' + k : ''}"${k === (sub || '') ? ' aria-current="page"' : ''}>${k ? t(label) : label}</a>`).join('')}</nav>`;

function pageGabangiSub(sub) {
  const head = (title, eyebrow) => `<section class="section"><p class="eyebrow">${eyebrow || 'GABANGI'}</p><h1>${title}</h1>${gbTabs(sub)}</section>`;
  if (sub === 'fundador') return `<div class="wrap">${head(L(GB_FOUNDER.subtitle))}
    <section class="section manifesto"><p class="muted" style="margin-bottom:1rem">Oscar Abreu · ${L(GB_FOUNDER.byline)}</p>
      ${richParas(L(GB_FOUNDER))}
      <p class="muted">${t('gbFounderNote')} <a href="https://gabangi.com/artistas/oscar-abreu/" target="_blank" rel="noopener">gabangi.com ↗</a></p></section></div>`;
  if (sub === 'revista') return `<div class="wrap">${head(L(GB_ESSAY.title), t('gbTabEssay'))}
    <section class="section manifesto"><p class="muted" style="margin-bottom:1rem">${t('gbEssayBy')}</p>
      <figure class="gb-fig"><img src="${GB_ESSAY.images[0].img}" alt="" loading="lazy"><figcaption>${esc(L(GB_ESSAY.images[0].cap))}</figcaption></figure>
      ${richParas(L(GB_ESSAY).slice(0, 3))}
      <div class="gb-figs">${GB_ESSAY.images.slice(1).map(i => `<figure class="gb-fig"><img src="${i.img}" alt="" loading="lazy"><figcaption>${esc(L(i.cap))}</figcaption></figure>`).join('')}</div>
      ${richParas(L(GB_ESSAY).slice(3))}
      <p class="muted">${t('gbEssayNote')} <a href="https://gabangi.com/magazine/" target="_blank" rel="noopener">gabangi.com/magazine ↗</a></p></section></div>`;
  if (sub === '2025') return `<div class="wrap">${head(L(GB_2025.title), `${L(GB_2025.eyebrow)} · ${L(GB_2025.meta)}`)}
    <section class="section"><p class="muted">${t('gb2025Note')}</p></section>
    <section class="section manifesto">${richParas(L(GB_2025))}</section>
    <section class="section"><h2>${t('gbTopTen')}</h2>
      <div class="grid two">${GB_2025.topTen.map(a => `<figure class="card gb-artist"><div class="art-frame"><img src="${a.img}" alt="${esc(a.name)}" loading="lazy"></div>
        <figcaption><h3>${a.name}</h3></figcaption></figure>`).join('')}</div>
      <figure class="gb-fig" style="max-width:360px;margin-top:1.4rem"><img src="${GB_2025.cover}" alt="GG Magazine" loading="lazy"><figcaption>${t('gbGGCover')}</figcaption></figure>
      <p class="muted" style="margin-top:1rem">${t('sourceLabel')}: <a href="https://gabangi.com/nota/" target="_blank" rel="noopener">gabangi.com/nota ↗</a></p></section></div>`;
  const c = k => L(GB_CLUB[k]);
  return `<div class="wrap">${head(c('h1'), c('ey'))}
    <section class="section"><p class="lead">${c('lead')}</p><p class="muted" style="margin-top:.5rem">${t('gbClubNote')}</p></section>
    <section class="section"><h2>${c('benefits_h2')} · ${c('per_year')}</h2>
      <div class="grid three">${[1, 2, 3].map(n => `<div class="card"><h3>${c(`b${n}_t`)}</h3><p class="muted">${c(`b${n}_d`)}</p></div>`).join('')}</div></section>
    <section class="section"><h2>${c('how_h2')}</h2>
      <ol class="timeline">${[1, 2, 3].map(n => `<li><strong>${c(`how_${n}_t`)}</strong><br><span class="muted">${c(`how_${n}_d`)}</span></li>`).join('')}</ol>
      <div class="card" style="margin-top:1rem"><strong>${c('req_t')}</strong><p class="muted">${c('req_d')}</p></div></section>
    <section class="section"><h2>${c('faq_h2')}</h2>
      ${[1, 2, 3, 4].map(n => `<details class="card" style="margin-bottom:.6rem"><summary><strong>${c(`q${n}`)}</strong></summary><p style="margin-top:.5rem">${c(`a${n}`)}</p></details>`).join('')}
      <div class="btn-row"><a class="btn primary" href="https://gabangi.com/club/" target="_blank" rel="noopener">${t('gbClubJoin')} ↗</a></div></section></div>`;
}

function pageGabangi(sub) {
  if (sub) return pageGabangiSub(sub);
  const ev = EVENTS.find(e => e.id === 'art-gabangi');
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('gabangiEyebrow')}</p><h1>ART GABANGI</h1>
      ${gbTabs('')}
      <p class="lead" style="margin-top:.8rem">${t('gabangiLead')}</p>
      <p class="muted" style="margin-top:.5rem">${t('gabangiEdition')}</p>
    </section>
    <section class="section">
      <h2>${t('gabangiArtists')}</h2>
      <div class="grid three">${GABANGI.artists.map(a => `<figure class="card gb-artist">
        <div class="art-frame"><img src="${a.img}" alt="${esc(a.name)}" loading="lazy"></div>
        <figcaption><h3>${a.name}</h3><blockquote lang="en">“${esc(a.quote)}”</blockquote><p class="muted">— Oscar Abreu</p></figcaption></figure>`).join('')}</div>
      <p class="muted" style="margin-top:.8rem">${t('gabangiQuotesNote')}</p>
    </section>
    <section class="section">
      <h2>${t('gabangiProgram')}</h2>
      <ol class="timeline">${GABANGI.program.map(p => `<li><strong>${L(p.date)}</strong> · ${typeof p.name === 'string' ? p.name : L(p.name)}<br>
        <span class="muted">${L(p.items).join(' · ')}</span></li>`).join('')}</ol>
    </section>
    <section class="section">
      <h2>${t('gabangiTickets')}</h2>
      <div class="grid">${eventCard(ev, fx.get('passes', []))}</div>
    </section>
    <section class="section grid two">
      <div>
        <h2>${t('gabangiExhibit')}</h2>
        <p class="muted" style="margin-bottom:.8rem">${t('gabangiExhibitLead')}</p>
        <table class="gb-spaces"><thead><tr><th>${t('space')}</th><th>${t('size')}</th><th>${t('price')}</th></tr></thead>
          <tbody>${GABANGI.spaces.map(([s, d, p]) => `<tr><td lang="en">${s}</td><td>${d}</td><td>${usd(p)}</td></tr>`).join('')}</tbody></table>
        <div class="btn-row"><a class="btn" href="https://gabangi.com/apply/" target="_blank" rel="noopener">${t('gabangiApply')} ↗</a></div>
        <h3 style="margin-top:1.6rem">${t('gbPackages')}</h3>
        <div class="tiers" style="margin-top:.6rem">${GABANGI.sponsors.map(p => `<div class="tier"><div class="tier-head"><strong lang="en">${p.name}</strong><span class="tier-price">${usd(p.price)}</span></div>
          <ul>${L(p.items).map(i => `<li>${i}</li>`).join('')}</ul></div>`).join('')}</div>
        <p class="muted" style="margin-top:.6rem">${t('gbCustom')}</p>
        <div class="btn-row"><a class="btn" href="https://gabangi.com/sponsor/" target="_blank" rel="noopener">${t('gabangiSponsor')} ↗</a></div>
        <p style="margin-top:1.2rem"><span class="muted">${t('gbOfficialSponsors')}:</span> ${GABANGI.officialSponsors.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join(' · ')}</p>
      </div>
      <div>
        <h2 class="gb-team">${t('gabangiTeam')}</h2>
        <p class="muted" style="margin-bottom:.8rem">${t('gabangiTeamLead')}</p>
        <ul class="timeline">${GABANGI.team.map(m => `<li><strong>${m.name}</strong><br><span class="muted">${L(m.role)}</span></li>`).join('')}</ul>
        <div class="btn-row"><a class="btn" href="https://gabangi.com/contact/" target="_blank" rel="noopener">${t('gabangiContact')} ↗</a></div>
      </div>
    </section>
  </div>`;
}


// Abreu Fine Art (reopened October 17, 2026) and Top 100 Artists: ART GABANGI 2026, from the
// book's chapters LXV and LXIX. Quotes are Oscar Abreu's words in the English edition.
const BOOK_QUOTE = (q, note = true) => `<figure class="quote" style="margin:1.2rem 0"><blockquote lang="en" dir="ltr">“${q}”</blockquote>
  <figcaption class="muted">— Oscar Abreu${note && lang !== 'en' ? ` · ${t('englishEdition')}` : ''}</figcaption></figure>`;
const askLink = (key, label) => `<a class="btn primary" href="${whatsappLink(t(key))}" target="_blank" rel="noopener">${t(label)}</a>`;

function pageFineArt() {
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('faEyebrow')}</p><h1>Abreu Fine Art</h1>
      <p class="lead" style="margin-top:.8rem">${t('faLead')}</p>
      ${BOOK_QUOTE('The museum would offer permanence; the gallery, movement.')}
      <dl class="specs">
        <dt>${t('location')}</dt><dd>${t('faWhere')}</dd>
        <dt>${t('hours')}</dt><dd>${pend()}</dd>
        <dt>${t('date')}</dt><dd>${t('faOpened')}</dd>
      </dl>
      <div class="btn-row">${askLink('waFineArt', 'faAsk')}</div>
    </section>
    <section class="section">
      <div class="ci-panel"><p class="ci-kicker">${t('faInaugural')}</p>
        <h2>El ritmo de lo invisible</h2><p class="ci-since">Julieta Prissell</p>
        <p>${t('faShowText')}</p><p style="margin-top:.8rem">${t('faArtist')}</p>
        <p class="ci-since" style="margin-top:.8rem">${t('faOpening')}</p></div>
    </section>
    <section class="section">
      <h2>${t('faHistoryTitle')}</h2>
      <p style="max-width:62ch;margin-top:.6rem">${t('faHistory')}</p>
      ${BOOK_QUOTE('A gallery does not begin when it has walls of its own, but when the works receive dignified conditions, a coherent program, and people willing to stop in front of them.')}
      <div class="btn-row"><a class="btn" href="#/biblioteca/top100">${t('t100Title')}</a></div>
    </section>
  </div>`;
}

function libraryExtras() {
  return `<section class="section top100" id="top100">
    <p class="eyebrow">${t('t100Eyebrow')}</p><h2>${t('t100Title')}</h2>
    <p style="max-width:62ch;margin-top:.6rem">${t('t100Text')}</p>
    <p class="muted" style="max-width:62ch;margin-top:.6rem">${t('t100Details')}</p>
    ${BOOK_QUOTE('The book was not meant to close any artist’s story, but to open a door into it.')}
    <div class="btn-row">${askLink('waTop100', 't100Ask')}<a class="btn" href="#/galeria">Abreu Fine Art</a></div>
  </section>`;
}

Object.assign(EXTRA_ROUTES, {
  pinturas: () => pageGallery('pinturas'), dibujos: () => pageGallery('dibujos'), escultura: () => pageGallery('escultura'), fotos: () => pageGallery('fotos'),
  manifiestos: pageManifestos, resenas: pageReviews, prensa: pageBibliography, exposiciones: pageExhibits, contacto: pageContact, gabangi: pageGabangi, galeria: pageFineArt,
});
Object.assign(EXTRA_ACTIONS, { galleryItem: el => openGalleryItem(el.dataset.g, Number(el.dataset.n)) });
