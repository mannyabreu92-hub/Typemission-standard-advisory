// Museo Abreu — content brought in from oscarabreu.com and gabangi.com:
// the Paintings, Drawings, Sculpture and Photos galleries (#/pinturas, #/dibujos,
// #/escultura, #/fotos), the 23 manifestos (#/manifiestos), reviews (#/resenas), press (#/prensa),
// exhibitions (#/exposiciones), contact (#/contacto) and
// the ART GABANGI page (#/gabangi) with its sub-pages from gabangi.js.
// Loaded after features.js; adds to EXTRA_ROUTES and EXTRA_ACTIONS, the artist
// section menu (sectionNav) and the home page highlights (homeHighlights).

Object.assign(I18N.es, {
  paintingsEyebrow: 'Obra', paintingsTitle: 'Pinturas',
  paintingsLead: 'Las pinturas que Oscar Abreu publica en oscarabreu.com, identificadas por número.',
  drawingsTitle: 'Dibujos', drawingsLead: 'Los dibujos que Oscar Abreu publica en oscarabreu.com, identificados por número.',
  sculptureTitle: 'Escultura', sculptureLead: 'Las esculturas que Oscar Abreu publica en oscarabreu.com, identificadas por número.',
  galleryNote: 'oscarabreu.com publica estas obras solo con su número; título, año, técnica y medidas están pendientes.',
  photosTitle: 'Fotos', photosLead: 'Fotos de Oscar Abreu en inauguraciones y encuentros, publicadas en oscarabreu.com.',
  photosNote: 'oscarabreu.com publica estas fotos sin pie de foto, fecha ni nombres.', photosN: 'Foto {n}',
  paintingsN: 'Pintura {n}', drawingsN: 'Dibujo {n}', sculptureN: 'Escultura {n}',
  waGallery: 'Hola, me interesa la obra "{name}" de Oscar Abreu ({site}).',
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
  navExhibits: 'Exposiciones', exhibitsLead: 'Exposiciones principales de Oscar Abreu, de oscarabreu.com/biography, y el catálogo publicado en oscarabreu.com/exhibits.',
  catalogueTitle: 'Catálogo', catalogueDates: 'Fechas', catalogueFormat: 'Formato', catalogueEssays: 'Ensayos',
  catalogueQuote: 'Texto original en oscarabreu.com/exhibits (en inglés):',
  catalogueWorks: 'En oscarabreu.com, este catálogo enlaza a una galería de 48 imágenes: son las mismas 36 pinturas y 12 esculturas de las secciones Pinturas y Escultura.',
  navWork: 'Obra', hlTitle: 'Descubre a Oscar Abreu', hlWork: '{p} pinturas, {d} dibujos, {s} esculturas y {f} fotos',
  hlManifestos: 'Los {n} manifiestos del Psico-Expresionismo, en español e inglés', hlTopTen: 'Diez artistas caribeños destacados por GABANGI',
  hlReviews: '{r} reseñas de la crítica y {p} artículos de prensa sobre su obra', hlPress: 'Reseñas y prensa',
  navContact: 'Contacto', contactLead: 'Contacto de Oscar Abreu, tal como aparece en oscarabreu.com.',
  navPress: 'Prensa', pressCta: 'Prensa ({n})', readArticle: 'Leer en {outlet}',
  navReviews: 'Reseñas', reviewsCta: 'Reseñas de la crítica ({n})', fullReview: 'Leer la reseña completa', reviewsNote: 'Fragmentos tal como aparecen en oscarabreu.com/reviews.', imagePending: 'imagen no disponible en oscarabreu.com',
});

Object.assign(I18N.en, {
  paintingsEyebrow: 'Work', paintingsTitle: 'Paintings',
  paintingsLead: 'The paintings Oscar Abreu publishes on oscarabreu.com, identified by number.',
  drawingsTitle: 'Drawings', drawingsLead: 'The drawings Oscar Abreu publishes on oscarabreu.com, identified by number.',
  sculptureTitle: 'Sculpture', sculptureLead: 'The sculptures Oscar Abreu publishes on oscarabreu.com, identified by number.',
  galleryNote: 'oscarabreu.com publishes these works by number only; title, year, technique and size are pending.',
  photosTitle: 'Photos', photosLead: 'Photos of Oscar Abreu at openings and gatherings, published on oscarabreu.com.',
  photosNote: 'oscarabreu.com publishes these photos without captions, dates or names.', photosN: 'Photo {n}',
  paintingsN: 'Painting {n}', drawingsN: 'Drawing {n}', sculptureN: 'Sculpture {n}',
  waGallery: 'Hello, I am interested in the work "{name}" by Oscar Abreu ({site}).',
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
  navExhibits: 'Exhibitions', exhibitsLead: 'Oscar Abreu’s major exhibitions, from oscarabreu.com/biography, and the catalogue published on oscarabreu.com/exhibits.',
  catalogueTitle: 'Catalogue', catalogueDates: 'Dates', catalogueFormat: 'Format', catalogueEssays: 'Essays',
  catalogueQuote: 'Original text on oscarabreu.com/exhibits:',
  catalogueWorks: 'On oscarabreu.com, this catalogue links to a gallery of 48 images: the same 36 paintings and 12 sculptures as in the Paintings and Sculpture sections.',
  navWork: 'Work', hlTitle: 'Discover Oscar Abreu', hlWork: '{p} paintings, {d} drawings, {s} sculptures and {f} photos',
  hlManifestos: 'The {n} manifestos of Psycho-Expressionism, in Spanish and English', hlTopTen: 'Ten Caribbean artists highlighted by GABANGI',
  hlReviews: '{r} critics’ reviews and {p} press articles on his work', hlPress: 'Reviews and press',
  navContact: 'Contact', contactLead: 'Oscar Abreu’s contact details, as published on oscarabreu.com.',
  navPress: 'Press', pressCta: 'Press ({n})', readArticle: 'Read on {outlet}',
  navReviews: 'Reviews', reviewsCta: 'Critics’ reviews ({n})', fullReview: 'Read the full review', reviewsNote: 'Excerpts as published on oscarabreu.com/reviews.', imagePending: 'image not available on oscarabreu.com',
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
    { date: { es: '6 de julio', en: 'July 6' }, name: 'Gala Premier',
      items: { es: ['Puertas 6:00 p. m.', 'Evento principal 8:00 p. m.', 'Celebración de apertura'],
        en: ['Doors 6:00 PM', 'Main event 8:00 PM', 'Opening celebration'] } },
    { date: { es: '7–14 de julio', en: 'July 7–14' }, name: { es: 'Feria abierta al público', en: 'Public Fair' },
      items: { es: ['10:00 a. m. – 8:00 p. m.', 'El 14 de julio cierra a las 5:00 p. m.'],
        en: ['10:00 AM – 8:00 PM', 'July 14 closes 5:00 PM'] } },
    { date: { es: '14 de julio', en: 'July 14' }, name: { es: 'Cena de Subasta y Premios', en: 'Auction & Awards Dinner' },
      items: { es: ['Cena 7:00 p. m.', 'Subasta en vivo durante la cena', 'Premio Artista del Año', 'Reconocimiento a líderes políticos, sociales y culturales'],
        en: ['Dinner 7:00 PM', 'Live auction during dinner', 'Artist of the Year Award', 'Recognition of political, social & cultural leaders'] } },
  ],
  team: [
    { name: 'Oscar Abreu', role: { es: 'Director Ejecutivo · CEO', en: 'Executive Director · CEO' } },
    { name: 'Reed Newhall', role: { es: 'Director de Operaciones Curatoriales en EE. UU.', en: 'Director of U.S. Curatorial Operations' } },
    { name: 'Thomas Rehberger', role: { es: 'Representante de Ventas para Europa', en: 'European Sales Representative' } },
    { name: 'Karima Boutaleb', role: { es: 'Representante Curatorial Internacional', en: 'International Curatorial Representative' } },
  ],
  // gabangi.com/sponsor, "Sponsorship Packages" (ART GABANGI 2026).
  sponsors: [
    { name: 'Supporter', price: 3000, items: { es: ['Catálogo: 1 página completa', 'Logo en la línea de patrocinadores de la web', 'Mención en la lista digital de patrocinadores', '2 entradas de Día regular'],
      en: ['Catalog: 1 full page', 'Logo on website sponsor line', 'Mention on digital sponsor roll', '2 Regular Day tickets'] } },
    { name: 'Official Sponsor', price: 5000, items: { es: ['Catálogo: 1 doble página', 'Logo en la web (posición superior)', 'Logo en materiales impresos seleccionados', '4 entradas de Día regular'],
      en: ['Catalog: 1 double-page spread', 'Logo on website (top placement)', 'Logo in selected printed materials', '4 Regular Day tickets'] } },
    { name: 'Partner', price: 10000, items: { es: ['Catálogo: 1 doble página', 'Reportaje editorial: 3 páginas', 'Logo destacado (web y en el lugar)', '2 pases VIP All-Access', '2 puestos en la Cena de Subasta y Premios'],
      en: ['Catalog: 1 double-page spread', 'Editorial feature: 3 pages', 'Premium logo placement (web + onsite)', '2 VIP All-Access passes', '2 Auction & Awards Dinner seats'] } },
    { name: 'Title Sponsor', price: 30000, items: { es: ['Catálogo: 1 doble página', 'Reportaje editorial: 5 páginas', 'Reconocimiento oficial como Patrocinador Oficial', 'Logo principal en los materiales clave', 'Reconocimiento en tarima en la Gala y la Cena de Premios', '4 pases VIP All-Access', '6 puestos en la Cena de Subasta y Premios'],
      en: ['Catalog: 1 double-page spread', 'Editorial feature: 5 pages', 'Official recognition as an Official Sponsor', 'Top logo placement across key assets', 'On-stage recognition at Gala & Awards Dinner', '4 VIP All-Access passes', '6 Auction & Awards Dinner seats'] } },
  ],
  // Home page sponsor line.
  officialSponsors: [['Centro Abreu', 'https://centroabreu.com'], ['ARTFORO', 'https://artforo.com']],
  // gabangi.com/apply, "Exhibition Spaces & Pricing" (USD).
  spaces: [
    ['Compact Booth', '5 × 10', 2800], ['Standard Booth', '10 × 10', 5000], ['Extended Booth', '15 × 15', 8500],
    ['Panoramic Booth', '10 × 20', 9500], ['Signature Pavilion', '20 × 20', 15000],
  ],
};

// Manifestos 1–2 (data.js) are paragraph lists; 3–23 (manifestos.js) are blocks.
const paraBlocks = ps => ps.map(p => /^[«“]/.test(p) ? { q: p } : p);
const MANIFESTOS = [
  { ...MANIFESTO, n: 1, es: paraBlocks(MANIFESTO.es), en: paraBlocks(MANIFESTO.en) },
  { ...MANIFESTO2, n: 2, es: paraBlocks(MANIFESTO2.es), en: paraBlocks(MANIFESTO2.en) },
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

function pageManifestos(nStr) {
  const n = Number(nStr), m = MANIFESTOS.find(x => x.n === n);
  if (!m) return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('navPsico')}</p><h1>${t('manifestosTitle', { n: MANIFESTOS.length })}</h1>
      <p class="lead" style="margin-top:.8rem">${t('manifestosLead')}</p>
    </section>
    <section class="section">${manifestoList()}</section>
  </div>`;
  const prev = MANIFESTOS.find(x => x.n === n - 1), next = MANIFESTOS.find(x => x.n === n + 1);
  return `<div class="wrap">
    ${manifestoSection(m)}
    <nav class="m-nav" aria-label="${t('allManifestos')}">
      ${prev ? `<a class="btn" href="#/manifiestos/${prev.n}">← ${prev.n}. ${L(prev.title)}</a>` : '<span></span>'}
      ${next ? `<a class="btn" href="#/manifiestos/${next.n}">${next.n}. ${L(next.title)} →</a>` : '<span></span>'}
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
    `<a class="tab" href="#/${k}" aria-selected="${k === name || also.includes(name)}">${label === 'Oscar Abreu' ? label : t(label)}</a>`).join('')}</div></nav>`;
}

function homeHighlights() {
  const card = (href, img, title, text) => `<a class="card hl" href="${href}"><img src="${img}" alt="" loading="lazy"><h3>${title}</h3><p class="muted">${text}</p></a>`;
  return `<section class="section"><h2>${t('hlTitle')}</h2>
    <div class="grid four" style="margin-top:1rem">
      ${card('#/pinturas', PAINTINGS[5].img, t('navWork'), t('hlWork', { p: PAINTINGS.length, d: DRAWINGS.length, s: SCULPTURES.length, f: PHOTOS.length }))}
      ${card('#/manifiestos', 'img/escaping-being.jpg', t('navManifestos'), t('hlManifestos', { n: MANIFESTOS.length }))}
      ${card('#/gabangi/2025', GB_2025.topTen[1].img, t('gbTopTen'), t('hlTopTen'))}
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
      <div class="tabs gallery-tabs" role="tablist" style="margin-top:1rem">${Object.entries(GALLERIES).map(([k, x]) =>
        `<a role="tab" class="tab" href="#/${k}" aria-selected="${k === id}">${t(x.key + 'Title')} · ${x.items.length}</a>`).join('')}</div>
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
        <button class="btn small" data-dlg="prev" aria-label="${t('prev')}">←</button>
        <button class="btn small" data-dlg="next" aria-label="${t('next')}">→</button>
        ${g.photos ? '' : `<button class="btn dark small" data-dlg="acquire">${t('acquire')}</button>`}
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
      if (!(BOOKING.live && openWhatsApp(t('waGallery', { name: t(g.key + 'N', { n }), site: g.site })))) toast(t('acquireSent'));
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

function pageReviews() {
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">Oscar Abreu</p><h1>${L(REVIEWS.title)}</h1>
      <p class="lead" style="margin-top:.8rem">${L(REVIEWS.intro)}</p>
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
        <h3 lang="es">${esc(b.title)}</h3>
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
      <ul class="timeline">${EXHIBITIONS.slice().reverse().map(e => `<li><strong><i>${e.t}</i></strong><br><span class="muted">${lang === 'es' && e.pes ? e.pes : e.p} · ${e.y}</span></li>`).join('')}</ul>
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
const gbTabs = sub => `<div class="tabs gallery-tabs" role="tablist" style="margin-top:1rem">${GB_TABS.map(([k, label]) =>
  `<a role="tab" class="tab" href="#/gabangi${k ? '/' + k : ''}" aria-selected="${k === (sub || '')}">${k ? t(label) : label}</a>`).join('')}</div>`;

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

Object.assign(EXTRA_ROUTES, {
  pinturas: () => pageGallery('pinturas'), dibujos: () => pageGallery('dibujos'), escultura: () => pageGallery('escultura'), fotos: () => pageGallery('fotos'),
  manifiestos: pageManifestos, resenas: pageReviews, prensa: pageBibliography, exposiciones: pageExhibits, contacto: pageContact, gabangi: pageGabangi,
});
Object.assign(EXTRA_ACTIONS, { galleryItem: el => openGalleryItem(el.dataset.g, Number(el.dataset.n)) });
