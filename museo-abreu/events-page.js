// One page per yearly event (#/evento/<id>), made to be shared: image, live countdown, date and
// place, programme, tickets or RSVP, "Add to calendar" and a share link. The share link
// (/e/<id>, api/event-share.js) gives WhatsApp and Instagram a preview with the event's own
// title, date and image, then opens this page.

Object.assign(I18N.es, {
  evDays: 'días', evHours: 'horas', evMins: 'min', evSecs: 'seg', evWhen: 'Cuándo', evWhere: 'Dónde',
  evProgram: 'Programa', evShare: 'Compartir', evCopy: 'Copiar enlace', evCopied: 'Enlace copiado',
  evAll: 'Todos los eventos', evOpen: 'Ver evento', evSeeInvite: 'Ver la invitación', evTickets: 'Entradas',
  evShareText: '{event} · {date} · Museo Abreu, Punta Cana',
});
Object.assign(I18N.en, {
  evDays: 'days', evHours: 'hours', evMins: 'min', evSecs: 'sec', evWhen: 'When', evWhere: 'Where',
  evProgram: 'Programme', evShare: 'Share', evCopy: 'Copy link', evCopied: 'Link copied',
  evAll: 'All events', evOpen: 'View event', evSeeInvite: 'See the invitation', evTickets: 'Tickets',
  evShareText: '{event} · {date} · Museo Abreu, Punta Cana',
});
Object.assign(I18N.fr, {
  evDays: 'jours', evHours: 'heures', evMins: 'min', evSecs: 's', evWhen: 'Quand', evWhere: 'Où',
  evProgram: 'Programme', evShare: 'Partager', evCopy: 'Copier le lien', evCopied: 'Lien copié',
  evAll: 'Tous les événements', evOpen: 'Voir l’événement', evSeeInvite: 'Voir l’invitation', evTickets: 'Billets',
  evShareText: '{event} · {date} · Museo Abreu, Punta Cana',
});

// The image on each event page (and in its share preview), with its credit.
const EVENT_ART = {
  anniversary: { img: 'img/escaping-being.jpg', cap: { es: 'Oscar Abreu · El Ser que se Escapa', en: 'Oscar Abreu · The Escaping Being', fr: 'Oscar Abreu · L’Être qui s’échappe' } },
  'group-exhibition': { img: 'img/resilience.jpg', cap: { es: 'Oscar Abreu · Resiliencia', en: 'Oscar Abreu · Resilience', fr: 'Oscar Abreu · Résilience' } },
  'uasd-psico': { img: 'img/uasd-2026-art.jpg', cap: { es: 'Oscar Abreu', en: 'Oscar Abreu', fr: 'Oscar Abreu' } },
  'art-gabangi': { img: 'img/gabangi/gg-magazine-2025.jpg', cap: { es: 'GG Magazine · GABANGI 2025 Top 10', en: 'GG Magazine · GABANGI 2025 Top 10', fr: 'GG Magazine · GABANGI 2025 Top 10' } },
};

// Shares a link: the phone's share menu when there is one, otherwise copy the link and open WhatsApp.
async function shareLink(title, text, url, statusId, data) {
  if (typeof trackEvent === 'function') trackEvent('Share', data);
  if (navigator.share) { try { await navigator.share({ title, text, url }); return; } catch (e) { if (e.name === 'AbortError') return; } }
  const out = document.getElementById(statusId);
  try { await navigator.clipboard.writeText(text + ' ' + url); if (out) out.textContent = t('evCopied'); }
  catch (e) { if (out) out.textContent = url; }
  if (out) out.hidden = false;
  window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + url), '_blank');
}

const eventShareURL = ev => `${location.origin}/e/${ev.id}?l=${lang}`;
const eventStart = ev => `${eventDate(ev)}T${ev.time}:00-04:00`; // Punta Cana time

function countdownHTML(ev) {
  return `<div class="countdown" data-target="${eventStart(ev)}" role="timer" aria-label="${esc(eventTitle(ev))}">
    ${['evDays', 'evHours', 'evMins', 'evSecs'].map(k => `<span><strong data-u="${k}">–</strong><small>${t(k)}</small></span>`).join('')}
  </div>`;
}
function tickCountdowns() {
  document.querySelectorAll('.countdown').forEach(el => {
    let s = Math.max(0, Math.floor((Date.parse(el.dataset.target) - Date.now()) / 1000));
    const parts = { evDays: Math.floor(s / 86400), evHours: Math.floor(s % 86400 / 3600), evMins: Math.floor(s % 3600 / 60), evSecs: s % 60 };
    for (const [k, v] of Object.entries(parts)) { const n = el.querySelector(`[data-u="${k}"]`); if (n) n.textContent = String(v).padStart(k === 'evDays' ? 1 : 2, '0'); }
  });
}

function eventProgram(ev) {
  if (ev.id === 'art-gabangi') return GABANGI.program.map(p => `<li><strong>${L(p.date)}</strong> · ${typeof p.name === 'string' ? p.name : L(p.name)}
    <ul>${L(p.items).map(i => `<li>${i}</li>`).join('')}</ul></li>`).join('');
  if (ev.id === 'uasd-psico') return `<li><strong>${rsvpTime(ev.time)}</strong> · ${esc(L(ev.name))} · ${esc(L(ev.sub))}</li>
    <li><strong>${t('evAnalysis')}</strong> M.A. Albacelis Acosta · M.A. Juan Elías Rodríguez Morel</li>
    <li><strong>${t('evBookLaunch')}</strong> <span lang="es">${esc(FUND_EDITIONS.es.title)} · ${esc(FUND_EDITIONS.es.subtitle)}</span></li>`;
  const inv = ev.invitation && ev.invitation[eventDate(ev).slice(0, 4)];
  if (inv) return `<li><strong>${rsvpTime(ev.time)}</strong> · ${L(inv.title)}</li>
    <li><strong>${L(inv.launchOf)}</strong> Ecce Homo · ${L(inv.sub1)} — ${L(inv.by)}</li>`;
  return '';
}

// Pass cards sit under an h3 here, so their names are h4.
const passCard = (ev, x, passes) => tierBlock(ev, x, passes).replace(/<h5 class="pass-name">(.*?)<\/h5>/, '<h4 class="pass-name">$1</h4>');

// The book presented at an event: its cover, the first lines of its note and the way to read the free sample.
function evBookHTML() {
  const l = typeof fuDefault === 'function' ? fuDefault() : 'es', e = FUND_EDITIONS[l];
  return `<a class="ev-book" href="#/fundamentos/${l}"><span class="ev-book-cover">${typeof fuCover === 'function' ? fuCover(l) : ''}</span>
    <span><span class="eyebrow">${t('evBookLaunch')}</span><span class="ev-book-title" lang="${l}">${esc(e.title)}</span>
      <span class="ev-book-sub" lang="${l}">${esc(e.subtitle)}</span><span class="lot-go">${t('readSample')} <span class="arr" aria-hidden="true">→</span></span></span></a>`;
}
function pageEvent(id) {
  const ev = ANNUAL_EVENTS.find(e => e.id === id);
  if (!ev) return pageEvents();
  const d = eventDate(ev), art = EVENT_ART[ev.id], passes = fx.get('passes', []);
  const end = ev.lastDay ? addDays(d, ev.lastDay) : null;
  const inv = ev.invitation && ev.invitation[d.slice(0, 4)];
  const when = end ? `${fmtDate(d, { day: 'numeric', month: 'long' })} – ${fmtDate(end, { day: 'numeric', month: 'long', year: 'numeric' })}` : `${fmtDate(d)} · ${rsvpTime(ev.time)}`;
  const program = eventProgram(ev);
  const invite = !ev.price && !ev.tiers && !ev.free;
  const cta = ev.free ? `<a class="btn primary" href="${ev.map}" target="_blank" rel="noopener">${t('evDirections')}</a>`
    : ev.tiers
    ? `<button class="btn primary" data-action="evTickets">${t('buyTickets')}</button>`
    : invite && rsvpEvents().some(e => e.id === ev.id) ? `<a class="btn primary" href="#/rsvp/${ev.id}">${t('rsvp')}</a>`
    : `<button class="btn primary" data-action="notifyEvent" data-id="${ev.id}">${t('notifyMe')}</button>`;
  setTimeout(() => { tickCountdowns(); clearInterval(holdTimer); holdTimer = setInterval(tickCountdowns, 1000); }, 0);
  return `<div class="wrap event-page">
    <a href="#/eventos" class="btn small"><span class="arr">←</span> ${t('evAll')}</a>
    <section class="section ev-hero">
      <figure class="ev-figure"><img src="${art.img}" alt="" width="1200" height="900"><figcaption>${L(art.cap)}</figcaption></figure>
      <div class="ev-head">
        <div class="chips">${ev.free ? `<span class="chip">${t('evFree')}</span>` : `<span class="chip vip">${t('vipEvent')}</span><span class="chip annual-chip">${t('everyYear')}</span>`}${invite ? `<span class="chip">${t('ciByInvitation')}</span>` : ''}</div>
        <h1 class="ev-title">${eventTitle(ev)}</h1>
        ${inv ? `<p class="ev-sub">Ecce Homo · ${L(inv.sub1)}</p>` : ev.sub ? `<p class="ev-sub">${esc(L(ev.sub))}</p>` : ''}
        ${countdownHTML(ev)}
        <dl class="ev-facts"><div><dt>${t('evWhen')}</dt><dd>${when}</dd></div><div><dt>${t('evWhere')}</dt><dd>${ev.place ? esc(L(ev.place)) : 'Museo Abreu · Bávaro, Punta Cana'}</dd></div>${ev.host ? `<div><dt>${t('evHost')}</dt><dd lang="es">${esc(ev.host)}</dd></div>` : ''}</dl>
        <div class="btn-row">${cta}<button class="btn" data-action="evCal" data-id="${ev.id}">${t('addCal')}</button>
          <button class="btn" data-action="evShare" data-id="${ev.id}">${t('evShare')}</button></div>
        <p class="status" id="ev-status" role="status" aria-live="polite" hidden></p>
      </div>
    </section>
    <section class="section ev-body">
      <p class="lead">${inv ? L(inv.lead) : L(ev.desc)}</p>
      ${program ? `<h2>${t('evProgram')}</h2><ol class="timeline ev-program">${program}</ol>` : ''}
      ${inv ? `<div class="btn-row"><a class="btn" href="#/rsvp/${ev.id}">${t('evSeeInvite')}</a></div>` : ''}
      ${ev.book === 'fundamentos' && typeof FUND_EDITIONS !== 'undefined' ? evBookHTML() : ''}
      ${ev.poster ? `<figure class="ev-poster"><img src="${ev.poster}" alt="${esc(t('evPosterAlt', { event: eventTitle(ev) }))}" loading="lazy" width="989" height="1280"></figure>` : ''}
    </section>
    ${ev.tiers ? `<section class="section" id="ev-tickets"><h2>${t('evTickets')}</h2>
      <h3 class="tier-group">${t('passesLabel')}</h3><div class="tiers">${ev.tiers.filter(x => x.group === 'pass').map(x => passCard(ev, x, passes)).join('')}</div>
      <h3 class="tier-group">${t('singleLabel')}</h3><div class="tiers">${ev.tiers.filter(x => x.group === 'single').map(x => passCard(ev, x, passes)).join('')}</div>
      <p class="muted" style="margin-top:.8rem">${t('gabangiSource')}</p></section>` : ''}
  </div>`;
}

Object.assign(EXTRA_ACTIONS, {
  // The hash is the router, so the tickets button scrolls instead of linking to #ev-tickets.
  evTickets: () => document.getElementById('ev-tickets').scrollIntoView({ behavior: 'smooth' }),
  evCal: el => rsvpICS(ANNUAL_EVENTS.find(e => e.id === el.dataset.id)),
  evShare: el => {
    const ev = ANNUAL_EVENTS.find(e => e.id === el.dataset.id);
    shareLink(eventTitle(ev), t('evShareText', { event: eventTitle(ev), date: fmtDate(eventDate(ev)) }), eventShareURL(ev), 'ev-status', { event: ev.id });
  },
  // Auction lots and the book share links with their own preview (api/share-item.js).
  lotShare: el => {
    const lot = AUCTION.lots.find(l => l.id === el.dataset.lot);
    const title = `${t('auLot', { n: lotNumber(lot) })} · ${lotTitle(lot)}`;
    shareLink(title, `${title} · ${lotArtist(lot)} · ${t('auEyebrow')}`, `${location.origin}/l/${lot.id}?l=${lang}`, 'share-status', { lot: lot.id });
  },
  bookShare: () => shareLink(`${t('bookTitle')} · ${t('bookSub')}`, `${t('bookTitle')} · ${t('bookSub')} · Oscar Abreu`, `${location.origin}/b?l=${lang}`, 'share-status', { item: 'book' }),
});
Object.assign(EXTRA_ROUTES, { evento: pageEvent });
Object.assign(ROUTE_SECTION, { evento: 'eventos' });

// Event titles on the events page and the home card open the event's own page.
{
  const card = eventCard;
  eventCard = (ev, passes) => ev.annual ? card(ev, passes).replace(`<h3>${eventTitle(ev)}</h3>`, `<h3><a href="#/evento/${ev.id}">${eventTitle(ev)}</a></h3>`) : card(ev, passes);
  const home = homeExtras;
  homeExtras = () => {
    const ev = nextAnnualEvent();
    return home().replace(`<a class="promo-title" href="#/eventos">`, `<a class="promo-title" href="#/evento/${ev.id}">`)
      .replace(`<a class="btn light" href="#/eventos">${t('eventDetails')}</a>`, `<a class="btn light" href="#/evento/${ev.id}">${t('eventDetails')}</a>`);
  };
}
