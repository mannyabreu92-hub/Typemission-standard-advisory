// Press & collectors page (#/kit): one page to send to journalists, galleries and collectors, made only
// from what the app already publishes: biography, key dates of the book's chronology, a quote from
// Ecce Homo, the critics, selected works with their image to download, the book and its editions, the
// next events, links (auction, Circle, press, reviews) and contacts. "Save as PDF" prints a clean page.

Object.assign(I18N.es, {
  kitEyebrow: 'Prensa y coleccionistas', kitPdf: 'Guardar como PDF', kitWords: 'En sus palabras', kitDates: 'Fechas clave',
  kitDownload: 'Descargar imagen', kitDownloadT: 'Descargar la imagen de «{title}»', kitCredit: 'Para publicar, acredite: © Oscar Abreu y el título de la obra.',
  kitBook: 'El libro', kitEditions: 'Ediciones: {list}.', kitEvents: 'Próximos eventos', kitMore: 'Más información',
  kitShareText: 'Oscar Abreu · Prensa y coleccionistas · Museo Abreu', moreKit: 'Prensa y coleccionistas', moreKitText: 'La trayectoria, obras para descargar, el libro y los eventos en una página.',
});
Object.assign(I18N.en, {
  kitEyebrow: 'Press & collectors', kitPdf: 'Save as PDF', kitWords: 'In his words', kitDates: 'Key dates',
  kitDownload: 'Download image', kitDownloadT: 'Download the image of “{title}”', kitCredit: 'For publication, please credit: © Oscar Abreu and the title of the work.',
  kitBook: 'The book', kitEditions: 'Editions: {list}.', kitEvents: 'Upcoming events', kitMore: 'More information',
  kitShareText: 'Oscar Abreu · Press & collectors · Museo Abreu', moreKit: 'Press & collectors', moreKitText: 'His career, works to download, the book and the events on one page.',
});
Object.assign(I18N.fr, {
  kitEyebrow: 'Presse et collectionneurs', kitPdf: 'Enregistrer en PDF', kitWords: 'Dans ses mots', kitDates: 'Dates clés',
  kitDownload: 'Télécharger l’image', kitDownloadT: 'Télécharger l’image de « {title} »', kitCredit: 'Pour publication, merci de créditer : © Oscar Abreu et le titre de l’œuvre.',
  kitBook: 'Le livre', kitEditions: 'Éditions : {list}.', kitEvents: 'Prochains événements', kitMore: 'En savoir plus',
  kitShareText: 'Oscar Abreu · Presse et collectionneurs · Museo Abreu', moreKit: 'Presse et collectionneurs', moreKitText: 'Son parcours, des œuvres à télécharger, le livre et les événements sur une page.',
});

const KIT_YEARS = ['1978', '1994', '1996', '1998', '2004', '2011', '2016', '2021', '2023', '2025', '2026'];

function pageKit() {
  // The quote in the visitor's own edition where there is one (Spanish, French, German, Russian), else English.
  const own = { es: DAILY_QUOTES_ES, fr: DAILY_QUOTES_FR, de: DAILY_QUOTES_DE, ru: DAILY_QUOTES_RU, it: DAILY_QUOTES_IT }[lang], q = (own || DAILY_QUOTES)[0];
  const editions = EDITIONS.filter(e => e.status === 'available').map(e => L(LANG_NAMES[e.lang])).join(', ');
  const events = ANNUAL_EVENTS.slice().sort((a, b) => eventDate(a).localeCompare(eventDate(b)));
  return `<div class="wrap kit">
    <section class="section kit-hero">
      <img class="contact-photo" src="${CONTACT.photo}" alt="Oscar Abreu" width="600" height="600">
      <div>
        <p class="eyebrow">${t('kitEyebrow')}</p>
        <h1>Oscar Abreu</h1>
        <p class="lead" style="margin-top:.6rem">${t('artistLead')}</p>
        <p style="margin-top:.8rem">${t('bioPlaceholder')}</p>
        <div class="btn-row kit-actions">
          <button class="btn primary" data-action="kitPdf">${t('kitPdf')}</button>
          <button class="btn" data-action="kitShare">${t('evShare')}</button>
          <a class="btn wa" href="${CONTACT.whatsapp.url}" target="_blank" rel="noopener">WhatsApp ↗</a>
        </div>
        <p class="status" id="kit-status" role="status" aria-live="polite" hidden></p>
      </div>
    </section>
    <section class="section">
      <h2>${t('kitWords')}</h2>
      <figure class="kit-quote"><blockquote lang="${own ? lang : 'en'}" dir="ltr">“${esc(q.q)}”</blockquote>
        <figcaption>— Oscar Abreu · <cite>Ecce Homo</cite>${own || lang === 'en' ? '' : ` · ${t('englishEdition')}`}</figcaption></figure>
    </section>
    <section class="section">
      <h2>${t('kitDates')}</h2>
      <ol class="timeline">${TIMELINE.filter(x => KIT_YEARS.includes(x.y)).map(x => `<li><strong>${x.y}</strong> · ${L(x)}</li>`).join('')}</ol>
      <p class="muted" style="margin-top:.6rem">${t('sourceNote')}</p>
    </section>
    <section class="section">
      <h2>${t('quotesTitle')}</h2>
      <div class="grid two">${QUOTES.map(c => `<figure class="card quote"><blockquote lang="en">“${c.q}”</blockquote><figcaption>— ${c.a}<br><span class="muted">${c.r}</span></figcaption></figure>`).join('')}</div>
      <p class="muted" style="margin-top:.6rem">${t('quotesNote')} <a href="#/resenas">${t('reviewsCta', { n: REVIEWS.items.length })}</a></p>
    </section>
    <section class="section">
      <h2>${t('homeWorks')}</h2>
      <p class="muted" style="margin-bottom:1rem">${t('kitCredit')}</p>
      <div class="grid three kit-works">${WORKS.filter(w => w.img).map(w => `<figure class="kit-work">
        <img src="${w.img}" alt="${esc(L(w.title))}, Oscar Abreu" loading="lazy">
        <figcaption><strong>${L(w.title)}</strong>${w.spec ? `<br><span class="muted">${L(w.spec).join(' · ')}</span>` : ''}
          <br><a href="${w.img}" download="Oscar-Abreu-${w.id}.jpg" aria-label="${esc(t('kitDownloadT', { title: L(w.title) }))}">${t('kitDownload')}</a></figcaption></figure>`).join('')}</div>
    </section>
    <section class="section">
      <h2>${t('kitBook')}</h2>
      <p class="kit-book"><strong>Ecce Homo</strong> · <em>${t('bookSub')}</em> · ${t('bookSub2')}</p>
      <p style="margin-top:.6rem">${t('synopsisText')}</p>
      <p class="muted" style="margin-top:.6rem">${t('kitEditions', { list: editions })} ${t('credits')}</p>
      <div class="btn-row"><a class="btn" href="#/biblioteca">${t('readSample')}</a><a class="btn" href="#/tienda">${t('navShop')}</a></div>
    </section>
    <section class="section">
      <h2>${t('kitEvents')}</h2>
      <ul class="kit-events">${events.map(ev => `<li><a href="#/evento/${ev.id}"><strong>${eventTitle(ev)}</strong></a> · ${fmtDate(eventDate(ev))}</li>`).join('')}</ul>
    </section>
    <section class="section">
      <h2>${t('kitMore')}</h2>
      <div class="btn-row">
        <a class="btn" href="#/subasta">${t('navAuction')}</a><a class="btn" href="#/coleccion">${t('ciEyebrow')}</a>
        <a class="btn" href="#/prensa">${t('navPress')}</a><a class="btn" href="#/resenas">${t('navReviews')}</a><a class="btn" href="#/exposiciones">${t('navExhibits')}</a>
      </div>
    </section>
    <section class="section">
      <h2>${t('navContact')}</h2>
      <ul class="contact-list">
        <li><span class="muted">WhatsApp</span><a href="${CONTACT.whatsapp.url}" target="_blank" rel="noopener">${CONTACT.whatsapp.label}</a></li>
        <li><span class="muted">Instagram</span><a href="${CONTACT.instagram.url}" target="_blank" rel="noopener">${CONTACT.instagram.label}</a></li>
        <li><span class="muted">Email</span><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li><span class="muted">Museo Abreu</span><span>${t('homeEyebrow')}</span></li>
      </ul>
    </section>
    ${typeof nlSection === 'function' ? nlSection('kit') : ''}
  </div>`;
}

Object.assign(EXTRA_ACTIONS, {
  kitPdf: () => { if (typeof trackEvent === 'function') trackEvent('Press kit PDF'); window.print(); },
  kitShare: () => shareLink('Oscar Abreu', t('kitShareText'), `${location.origin}/#/kit`, 'kit-status', { page: 'kit' }),
});
Object.assign(EXTRA_ROUTES, { kit: pageKit });
Object.assign(ROUTE_SECTION, { kit: 'artista' });

// A tile under "More of Museo Abreu" on the home page, and a link on the Contact page.
{
  const home = homeExtras;
  homeExtras = () => home().replace(`<a class="card" href="#/galeria"`, `<a class="card" href="#/kit" style="text-decoration:none"><h3>${t('moreKit')}</h3><p class="muted">${t('moreKitText')}</p></a><a class="card" href="#/galeria"`);
  const contact = pageContact;
  pageContact = () => contact().replace(`<div class="btn-row"><a class="btn wa"`, `<div class="btn-row"><a class="btn" href="#/kit">${t('moreKit')}</a><a class="btn wa"`);
  EXTRA_ROUTES.contacto = pageContact;
}
