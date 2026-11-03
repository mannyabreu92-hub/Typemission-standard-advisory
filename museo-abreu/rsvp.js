// Museo Abreu — RSVP for the museum's own invitations (#/rsvp/<event id>): the yearly events
// without a ticket price (the anniversary, the group exhibition). An engraved-style invitation,
// then a formal reply. Live mode sends the reply to the museum by WhatsApp; the reply is kept on
// this device so the guest sees it, can change it and add it to a calendar.
// Loaded after content.js and before app.js.

Object.assign(I18N.es, {
  rsvpShareTitle: 'Invite a un amigo', rsvpShareLead: 'Envíele la invitación para que también confirme su asistencia.', rsvpShareMsg: 'Le invito a {event} en el Museo Abreu, {date}. Confirme su asistencia aquí: {link}',
  rsvp: 'Confirmar asistencia', rsvpEyebrow: 'Invitación', rsvpHost: 'Museo Abreu',
  rsvpRequests: 'tiene el honor de invitarle a', rsvpAtTime: 'a las {time}', rsvpPlace: 'Bávaro, Punta Cana',
  rsvpKindly: 'Se ruega confirmar asistencia', rsvpFormTitle: 'Su respuesta', rsvpAccept: 'Asistiré con mucho gusto',
  rsvpDecline: 'Lamento no poder asistir', rsvpGuests: 'Invitados que le acompañan', rsvpGuestNames: 'Nombres de sus invitados',
  rsvpNote: 'Una nota para los anfitriones (opcional)', rsvpNotePh: 'Alimentación, accesibilidad, una ocasión especial',
  rsvpSend: 'Enviar mi respuesta', rsvpPrivate: 'Su respuesta llega directamente al equipo del museo.',
  rsvpThanksYes: 'Gracias, {name}. Será un placer recibirle.', rsvpThanksNo: 'Gracias, {name}. Le echaremos de menos.',
  rsvpConfirmNote: 'El museo confirma cada lugar personalmente por WhatsApp.', rsvpChange: 'Cambiar mi respuesta',
  rsvpYourReply: 'Su respuesta', rsvpAttending: 'Asiste', rsvpNotAttending: 'No asiste', rsvpWith: 'Con {n} invitado(s)',
  rsvpChooseAtt: 'Elija si asistirá.', rsvpOnlyInvites: 'Esta invitación no está disponible.',
  waRsvpYes: 'Confirmación de asistencia · {event}, {date} — {name} asistirá con mucho gusto{guests}. Email: {email}. WhatsApp: {phone}. {note}',
  waRsvpNo: 'Confirmación de asistencia · {event}, {date} — {name} lamenta no poder asistir. {note}',
  rsvpWithGuests: ', acompañado(a) de {n} invitado(s): {names}',
});
Object.assign(I18N.en, {
  rsvpShareTitle: 'Invite a friend', rsvpShareLead: 'Send them the invitation so they can reply too.', rsvpShareMsg: 'You are invited to {event} at Museo Abreu, {date}. RSVP here: {link}',
  rsvp: 'RSVP', rsvpEyebrow: 'Invitation', rsvpHost: 'Museo Abreu',
  rsvpRequests: 'requests the pleasure of your company at', rsvpAtTime: 'at {time}', rsvpPlace: 'Bávaro, Punta Cana',
  rsvpKindly: 'The favour of a reply is requested', rsvpFormTitle: 'Your reply', rsvpAccept: 'Accepts with pleasure',
  rsvpDecline: 'Declines with regret', rsvpGuests: 'Guests accompanying you', rsvpGuestNames: 'Their names',
  rsvpNote: 'A note for the hosts (optional)', rsvpNotePh: 'Dietary needs, accessibility, a special occasion',
  rsvpSend: 'Send my reply', rsvpPrivate: 'Your reply goes directly to the museum team.',
  rsvpThanksYes: 'Thank you, {name}. We look forward to receiving you.', rsvpThanksNo: 'Thank you, {name}. You will be missed.',
  rsvpConfirmNote: 'The museum confirms each place personally by WhatsApp.', rsvpChange: 'Change my reply',
  rsvpYourReply: 'Your reply', rsvpAttending: 'Attending', rsvpNotAttending: 'Not attending', rsvpWith: 'With {n} guest(s)',
  rsvpChooseAtt: 'Choose whether you will attend.', rsvpOnlyInvites: 'This invitation is not available.',
  waRsvpYes: 'RSVP · {event}, {date} — {name} accepts with pleasure{guests}. Email: {email}. WhatsApp: {phone}. {note}',
  waRsvpNo: 'RSVP · {event}, {date} — {name} regretfully declines. {note}',
  rsvpWithGuests: ', accompanied by {n} guest(s): {names}',
});
Object.assign(I18N.fr, {
  rsvpShareTitle: 'Inviter un ami', rsvpShareLead: 'Envoyez-lui l’invitation pour qu’il puisse répondre aussi.', rsvpShareMsg: 'Vous êtes invité à {event} au Museo Abreu, {date}. Répondez ici : {link}',
  rsvp: 'Répondre', rsvpEyebrow: 'Invitation', rsvpHost: 'Museo Abreu',
  rsvpRequests: 'a le plaisir de vous convier à', rsvpAtTime: 'à {time}', rsvpPlace: 'Bávaro, Punta Cana',
  rsvpKindly: 'R.S.V.P.', rsvpFormTitle: 'Votre réponse', rsvpAccept: 'Accepte avec plaisir',
  rsvpDecline: 'Regrette de ne pouvoir venir', rsvpGuests: 'Invités qui vous accompagnent', rsvpGuestNames: 'Leurs noms',
  rsvpNote: 'Un mot pour les hôtes (facultatif)', rsvpNotePh: 'Régime alimentaire, accessibilité, une occasion particulière',
  rsvpSend: 'Envoyer ma réponse', rsvpPrivate: 'Votre réponse parvient directement à l’équipe du musée.',
  rsvpThanksYes: 'Merci, {name}. Nous serons ravis de vous accueillir.', rsvpThanksNo: 'Merci, {name}. Vous nous manquerez.',
  rsvpConfirmNote: 'Le musée confirme chaque place personnellement par WhatsApp.', rsvpChange: 'Modifier ma réponse',
  rsvpYourReply: 'Votre réponse', rsvpAttending: 'Présent(e)', rsvpNotAttending: 'Absent(e)', rsvpWith: 'Avec {n} invité(s)',
  rsvpChooseAtt: 'Indiquez si vous serez présent(e).', rsvpOnlyInvites: 'Cette invitation n’est pas disponible.',
  waRsvpYes: 'R.S.V.P. · {event}, {date} — {name} accepte avec plaisir{guests}. Email : {email}. WhatsApp : {phone}. {note}',
  waRsvpNo: 'R.S.V.P. · {event}, {date} — {name} regrette de ne pouvoir venir. {note}',
  rsvpWithGuests: ', accompagné(e) de {n} invité(s) : {names}',
});

// The museum's own invitations: yearly events with no ticket price.
const rsvpEvents = () => ANNUAL_EVENTS.filter(ev => !ev.tiers && !ev.price);
const rsvpReplies = () => fx.get('rsvps', {});
const rsvpTime = time => {
  const [h, m] = time.split(':').map(Number);
  const loc = { es: 'es-DO', en: 'en-US', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', ar: 'ar-u-nu-latn', ru: 'ru-RU' }[lang];
  return new Intl.DateTimeFormat(loc, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(Date.UTC(2000, 0, 1, h, m));
};
const rsvpLongDate = iso => fmtDate(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

// Invite a friend: the same RSVP page by WhatsApp or email, in the visitor's language, so the friend replies too.
function rsvpShare(ev) {
  const d = eventDate(ev);
  const link = `${location.origin}/?lang=${lang}#/rsvp/${ev.id}`;
  const msg = t('rsvpShareMsg', { event: eventTitle(ev), date: `${rsvpLongDate(d)} · ${rsvpTime(ev.time)}`, link });
  return `<section class="section rsvp-share"><h2>${t('rsvpShareTitle')}</h2><p class="muted">${t('rsvpShareLead')}</p>
    <div class="btn-row"><a class="btn wa" href="https://wa.me/?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">WhatsApp</a>
      <a class="btn" href="mailto:?subject=${encodeURIComponent(eventTitle(ev) + ' · Museo Abreu')}&body=${encodeURIComponent(msg)}">${t('email')}</a></div></section>`;
}

function pageRsvp(id) {
  const ev = rsvpEvents().find(e => e.id === id);
  if (!ev) return `<div class="wrap"><section class="section"><p class="lead">${t('rsvpOnlyInvites')}</p>
    <div class="btn-row"><a class="btn" href="#/eventos">${t('eventsTitle')}</a></div></section></div>`;
  const d = eventDate(ev), reply = rsvpReplies()[ev.id];
  const current = reply && reply.date === d && !rsvpEditing.has(ev.id) ? reply : null;
  const inv = ev.invitation?.[d.slice(0, 4)];
  const card = inv ? `<div class="invite"><div class="invite-inner">
      <p class="invite-host">${t('rsvpHost')}</p>
      <p class="invite-request">${L(inv.request)}</p>
      <h2 class="invite-title invite-caps">${L(inv.title)}</h2>
      <p class="invite-also">${L(inv.launchOf)}</p>
      <p class="invite-book"><span class="invite-book-title" lang="la">Ecce Homo</span><span>${L(inv.sub1)}</span><span>${L(inv.sub2)}</span></p>
      <p class="invite-by">${L(inv.by)}</p>
      <p class="invite-desc">${L(inv.lead)}</p>
      <div class="invite-rule" aria-hidden="true"><span></span></div>
      <p class="invite-date">${rsvpLongDate(d)}<br>${rsvpTime(ev.time)}</p>
      <p class="invite-place">Museo Abreu<br>Bávaro, Punta Cana<br>${L(inv.country)}</p>
      <p class="invite-close">${L(inv.close)}</p>
    </div></div>` : `<div class="invite"><div class="invite-inner">
      <p class="invite-host">${t('rsvpHost')}</p>
      <p class="invite-request">${t('rsvpRequests')}</p>
      <h2 class="invite-title">${L(ev.name)}</h2>
      ${ev.since ? `<p class="invite-sub">${t('nth', { n: Number(d.slice(0, 4)) - ev.since })}</p>` : ''}
      ${ev.launch ? `<p class="invite-also">${L(ev.launch)}</p>` : ''}
      <div class="invite-rule" aria-hidden="true"><span></span></div>
      <p class="invite-date">${rsvpLongDate(d)}<br>${t('rsvpAtTime', { time: rsvpTime(ev.time) })}</p>
      <p class="invite-place">${t('rsvpPlace')}</p>
      <p class="invite-desc">${L(ev.desc)}</p>
      <p class="invite-kindly">${t('rsvpKindly')}</p>
    </div></div>`;
  const yes = current && current.att === 'yes';
  const replied = current ? `<section class="section rsvp-reply">
      <p class="eyebrow">${t('rsvpYourReply')}</p>
      <h2 class="rsvp-thanks">${t(yes ? 'rsvpThanksYes' : 'rsvpThanksNo', { name: esc(current.name.split(' ')[0]) })}</h2>
      <dl class="specs">
        <dt>${t('name')}</dt><dd>${esc(current.name)}</dd>
        <dt>${t('rsvpYourReply')}</dt><dd>${yes ? t('rsvpAttending') : t('rsvpNotAttending')}</dd>
        ${yes && current.guests ? `<dt>${t('guests')}</dt><dd>${t('rsvpWith', { n: current.guests })}${current.guestNames ? ` · ${esc(current.guestNames)}` : ''}</dd>` : ''}
      </dl>
      ${yes ? `<p class="muted" style="margin-top:.8rem">${t('rsvpConfirmNote')}</p>` : ''}
      <div class="btn-row">${yes ? `<button class="btn primary" data-action="rsvpCal" data-id="${ev.id}">${t('addCal')}</button>` : ''}
        <button class="btn" data-action="rsvpChange" data-id="${ev.id}">${t('rsvpChange')}</button></div>
    </section>` : '';
  const prev = reply && reply.date === d ? reply : {};
  const form = current ? '' : `<section class="section rsvp-form-wrap">
      <h2>${t('rsvpFormTitle')}</h2>
      <form class="rsvp-form" data-form="rsvp" data-id="${ev.id}" novalidate>
        <div class="grid two">
          <div class="field"><label for="rs-name">${t('name')}</label><input id="rs-name" required autocomplete="name" value="${esc(prev.name || profile.name)}"></div>
          <div class="field"><label for="rs-email">${t('email')}</label><input id="rs-email" type="email" required autocomplete="email" value="${esc(prev.email || profile.email)}"></div>
          <div class="field"><label for="rs-phone">${t('phone')}</label><input id="rs-phone" type="tel" required autocomplete="tel" value="${esc(prev.phone || '')}"></div>
        </div>
        <fieldset class="rsvp-att"><legend class="visually-hidden">${t('rsvpFormTitle')}</legend>
          <label class="rsvp-choice"><input type="radio" name="rs-att" id="rs-yes" value="yes" ${prev.att !== 'no' ? 'checked' : ''}><span>${t('rsvpAccept')}</span></label>
          <label class="rsvp-choice"><input type="radio" name="rs-att" id="rs-no" value="no" ${prev.att === 'no' ? 'checked' : ''}><span>${t('rsvpDecline')}</span></label>
        </fieldset>
        <div class="field rsvp-yes-only"><label for="rs-guests">${t('rsvpGuests')}</label>
          <select id="rs-guests">${[0, 1, 2, 3].map(n => `<option value="${n}"${(prev.guests || 0) === n ? ' selected' : ''}>${n}</option>`).join('')}</select></div>
        <div class="field rsvp-yes-only" id="rs-names-wrap"${prev.guests ? '' : ' hidden'}><label for="rs-names">${t('rsvpGuestNames')}</label><input id="rs-names" value="${esc(prev.guestNames || '')}"></div>
        <details class="rsvp-more"${prev.note ? ' open' : ''}><summary>${t('rsvpNote')}</summary>
          <div class="field"><label for="rs-note" class="visually-hidden">${t('rsvpNote')}</label><textarea id="rs-note" rows="2" placeholder="${esc(t('rsvpNotePh'))}">${esc(prev.note || '')}</textarea></div></details>
        <p class="status" id="rs-err" role="alert" hidden></p>
        <div class="btn-row"><button class="btn primary rsvp-send" type="submit">${t('rsvpSend')}</button></div>
        <p class="muted rsvp-private">${t('rsvpPrivate')}</p>
      </form>
    </section>`;
  const head = `<section class="section rsvp-head">
      <h1 class="rsvp-head-title">${inv ? '<span lang="la">Ecce Homo</span>' : L(ev.name)}</h1>
      <p class="rsvp-head-date">${rsvpLongDate(d)}</p><p class="rsvp-head-time">${rsvpTime(ev.time)}</p></section>`;
  return `<div class="wrap rsvp-page">${head}${replied}${form}${rsvpShare(ev)}<section class="section">${card}</section></div>`;
}

const rsvpEditing = new Set();

document.addEventListener('change', e => {
  if (e.target.id === 'rs-guests') { const w = document.getElementById('rs-names-wrap'); if (w) w.hidden = e.target.value === '0'; }
  if (e.target.name === 'rs-att') document.querySelectorAll('.rsvp-yes-only').forEach(el => { el.hidden = e.target.value === 'no'; if (el.id === 'rs-names-wrap' && e.target.value !== 'no') el.hidden = document.getElementById('rs-guests').value === '0'; });
});

function rsvpICS(ev) {
  const d = eventDate(ev), start = d.replace(/-/g, '') + 'T' + ev.time.replace(':', '') + '00';
  const [h, m] = ev.time.split(':').map(Number), endH = h + 3;
  const end = d.replace(/-/g, '') + 'T' + String(endH).padStart(2, '0') + String(m).padStart(2, '0') + '00';
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Museo Abreu//ES', 'BEGIN:VEVENT',
    'UID:rsvp-' + ev.id + '-' + d + '@museoabreu', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z',
    'DTSTART;TZID=' + TZ + ':' + start, 'DTEND;TZID=' + TZ + ':' + end,
    'SUMMARY:' + eventTitle(ev) + ' · Museo Abreu', 'LOCATION:Museo Abreu\\, Bávaro\\, Punta Cana', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'museo-abreu-' + ev.id + '.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

Object.assign(EXTRA_ROUTES, { rsvp: pageRsvp });
Object.assign(EXTRA_ACTIONS, {
  rsvpChange: el => { rsvpEditing.add(el.dataset.id); route(); },
  rsvpCal: el => rsvpICS(rsvpEvents().find(e => e.id === el.dataset.id)),
});
Object.assign(EXTRA_FORMS, {
  rsvp: form => {
    const ev = rsvpEvents().find(e => e.id === form.dataset.id);
    const v = id => document.getElementById(id).value.trim();
    const att = (form.querySelector('input[name="rs-att"]:checked') || {}).value;
    const err = document.getElementById('rs-err');
    const fail = msg => { err.textContent = msg; err.hidden = false; };
    if (!att) return fail(t('rsvpChooseAtt'));
    const bad = ['rs-name', 'rs-email', 'rs-phone'].find(id => !document.getElementById(id).checkValidity());
    if (bad) { document.getElementById(bad).focus(); return fail(document.getElementById(bad).validationMessage); }
    const guests = att === 'yes' ? Number(v('rs-guests')) : 0;
    const reply = { att, name: v('rs-name'), email: v('rs-email'), phone: v('rs-phone'), guests,
      guestNames: guests ? v('rs-names') : '', note: v('rs-note'), date: eventDate(ev), at: new Date().toISOString() };
    profile.name = reply.name; profile.email = reply.email; save();
    if (BOOKING.live) {
      const date = rsvpLongDate(reply.date) + ' · ' + rsvpTime(ev.time);
      const title = eventTitle(ev) + (ev.launchShort && !ev.invitation?.[eventDate(ev).slice(0, 4)]?.cardTitle ? ' · ' + L(ev.launchShort) : '');
      openWhatsApp(att === 'yes'
        ? t('waRsvpYes', { event: title, date, name: reply.name, email: reply.email, phone: reply.phone, note: reply.note,
            guests: guests ? t('rsvpWithGuests', { n: guests, names: reply.guestNames || '—' }) : '' })
        : t('waRsvpNo', { event: title, date, name: reply.name, note: reply.note }));
    }
    // Also saved for the museum's dashboard (api/rsvp.js); the WhatsApp message above stays the main channel.
    fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: ev.id, lang, ...reply }) }).catch(() => {});
    fx.set('rsvps', { ...rsvpReplies(), [ev.id]: reply });
    rsvpEditing.delete(ev.id);
    window.scrollTo(0, 0);
    route();
  },
});
