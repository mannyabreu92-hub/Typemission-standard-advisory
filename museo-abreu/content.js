// Museo Abreu — content brought in from oscarabreu.com and gabangi.com:
// the Paintings, Drawings and Sculpture galleries (#/pinturas, #/dibujos,
// #/escultura), the 23 manifestos (#/manifiestos), reviews (#/resenas), press (#/prensa),
// contact (#/contacto) and
// the ART GABANGI page (#/gabangi).
// Loaded after features.js; adds to EXTRA_ROUTES and EXTRA_ACTIONS.

Object.assign(I18N.es, {
  paintingsEyebrow: 'Obra', paintingsTitle: 'Pinturas',
  paintingsLead: 'Las pinturas que Oscar Abreu publica en oscarabreu.com, identificadas por número.',
  drawingsTitle: 'Dibujos', drawingsLead: 'Los dibujos que Oscar Abreu publica en oscarabreu.com, identificados por número.',
  sculptureTitle: 'Escultura', sculptureLead: 'Las esculturas que Oscar Abreu publica en oscarabreu.com, identificadas por número.',
  galleryNote: 'oscarabreu.com publica estas obras solo con su número; título, año, técnica y medidas están pendientes.',
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
  gabangiApply: 'Solicitar espacio', gabangiSponsor: 'Patrocinar', gabangiSponsorLead: 'Paquetes de patrocinio desde US$3,000, con presencia en el Catálogo Oficial de la Feria.',
  space: 'Espacio', size: 'Medidas (pies)', price: 'Precio',
  manifestosTitle: 'Los {n} manifiestos', manifestosLead: 'Oscar Abreu escribe sobre el origen, los principios y el futuro del Psico-Expresionismo. Textos completos de oscarabreu.com.',
  allManifestos: 'Todos los manifiestos', navManifestos: 'Manifiestos',
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
  gabangiApply: 'Apply to exhibit', gabangiSponsor: 'Become a sponsor', gabangiSponsorLead: 'Sponsorship packages from US$3,000, with placement in the Official Fair Catalog.',
  space: 'Space', size: 'Size (ft)', price: 'Price',
  manifestosTitle: 'The {n} manifestos', manifestosLead: 'Oscar Abreu writes about the origin, principles and future of Psycho-Expressionism. Full texts from oscarabreu.com.',
  allManifestos: 'All manifestos', navManifestos: 'Manifestos',
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

// The three numbered galleries of oscarabreu.com share one page and lightbox.
const GALLERIES = {
  pinturas: { items: PAINTINGS, key: 'paintings', site: 'oscarabreu.com/paintings' },
  dibujos: { items: DRAWINGS, key: 'drawings', site: 'oscarabreu.com/drawings' },
  escultura: { items: SCULPTURES, key: 'sculpture', site: 'oscarabreu.com/sculpture' },
};

function pageGallery(id) {
  const g = GALLERIES[id];
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('paintingsEyebrow')}</p><h1>${t(g.key + 'Title')}</h1>
      <div class="tabs" role="tablist" style="margin-top:1rem">${Object.entries(GALLERIES).map(([k, x]) =>
        `<a role="tab" class="tab" href="#/${k}" aria-selected="${k === id}">${t(x.key + 'Title')} · ${x.items.length}</a>`).join('')}</div>
      <p class="lead" style="margin-top:1rem">${t(g.key + 'Lead')}</p>
      <p class="muted" style="margin-top:.5rem">${t('galleryNote')}</p>
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
      <p class="muted">${t('galleryNote')}</p>
      <div class="btn-row">
        <button class="btn small" data-dlg="prev" aria-label="${t('prev')}">←</button>
        <button class="btn small" data-dlg="next" aria-label="${t('next')}">→</button>
        <button class="btn dark small" data-dlg="acquire">${t('acquire')}</button>
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

function pageGabangi() {
  const ev = EVENTS.find(e => e.id === 'art-gabangi');
  return `<div class="wrap">
    <section class="section">
      <p class="eyebrow">${t('gabangiEyebrow')}</p><h1>ART GABANGI</h1>
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
        <p style="margin-top:1.2rem">${t('gabangiSponsorLead')}</p>
        <div class="btn-row"><a class="btn" href="https://gabangi.com/sponsor/" target="_blank" rel="noopener">${t('gabangiSponsor')} ↗</a></div>
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
  pinturas: () => pageGallery('pinturas'), dibujos: () => pageGallery('dibujos'), escultura: () => pageGallery('escultura'),
  manifiestos: pageManifestos, resenas: pageReviews, prensa: pageBibliography, contacto: pageContact, gabangi: pageGabangi,
});
Object.assign(EXTRA_ACTIONS, { galleryItem: el => openGalleryItem(el.dataset.g, Number(el.dataset.n)) });
