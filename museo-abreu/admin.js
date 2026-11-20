// Museum dashboard (#/admin, not in the menus): auction bids with bidder contacts, Whop purchases and
// RSVPs, from api/admin.js. The password (ADMIN_PASSWORD in Vercel) is kept for this browser tab only.
// Staff texts are in Spanish, English and French; other languages show English.

Object.assign(I18N.es, {
  adTitle: 'Panel del museo', adLead: 'Pujas, compras y confirmaciones de asistencia. Solo para el equipo del museo.',
  adPass: 'Contraseña', adEnter: 'Entrar', adWrong: 'Contraseña incorrecta.', adOff: 'El panel aún no está activado: falta ADMIN_PASSWORD en Vercel.',
  adErr: 'No se pudieron cargar los datos. Inténtelo de nuevo.', adRefresh: 'Actualizar', adLogout: 'Salir', adCsv: 'Descargar CSV',
  adBids: 'Pujas', adPurchases: 'Compras en Whop', adRsvps: 'Asistencia', adNone: 'Nada todavía.',
  adHigh: 'Puja más alta', adWhen: 'Fecha', adAmount: 'Importe', adProduct: 'Producto', adEvent: 'Evento', adAtt: 'Asiste',
  adYes: 'Sí', adNo: 'No', adGuests: 'Invitados', adNote: 'Nota', adAttending: '{n} personas confirmadas', adUpdated: 'Actualizado {time}',
});
Object.assign(I18N.en, {
  adTitle: 'Museum dashboard', adLead: 'Bids, purchases and RSVPs. For the museum team only.',
  adPass: 'Password', adEnter: 'Sign in', adWrong: 'Wrong password.', adOff: 'The dashboard is not switched on yet: ADMIN_PASSWORD is missing in Vercel.',
  adErr: 'Could not load the data. Please try again.', adRefresh: 'Refresh', adLogout: 'Sign out', adCsv: 'Download CSV',
  adBids: 'Bids', adPurchases: 'Whop purchases', adRsvps: 'RSVPs', adNone: 'Nothing yet.',
  adHigh: 'Highest bid', adWhen: 'Date', adAmount: 'Amount', adProduct: 'Product', adEvent: 'Event', adAtt: 'Attending',
  adYes: 'Yes', adNo: 'No', adGuests: 'Guests', adNote: 'Note', adAttending: '{n} people confirmed', adUpdated: 'Updated {time}',
});
Object.assign(I18N.fr, {
  adTitle: 'Tableau de bord du musée', adLead: 'Enchères, achats et réponses aux invitations. Réservé à l’équipe du musée.',
  adPass: 'Mot de passe', adEnter: 'Entrer', adWrong: 'Mot de passe incorrect.', adOff: 'Le tableau de bord n’est pas encore activé : ADMIN_PASSWORD manque dans Vercel.',
  adErr: 'Impossible de charger les données. Réessayez.', adRefresh: 'Actualiser', adLogout: 'Se déconnecter', adCsv: 'Télécharger le CSV',
  adBids: 'Enchères', adPurchases: 'Achats sur Whop', adRsvps: 'Réponses', adNone: 'Rien pour l’instant.',
  adHigh: 'Enchère la plus haute', adWhen: 'Date', adAmount: 'Montant', adProduct: 'Produit', adEvent: 'Événement', adAtt: 'Présent',
  adYes: 'Oui', adNo: 'Non', adGuests: 'Invités', adNote: 'Note', adAttending: '{n} personnes confirmées', adUpdated: 'Mis à jour {time}',
});

let adData = null, adMsg = '', adTried = false; // adTried: load once per visit, so a failure does not loop
const adPassword = () => { try { return sessionStorage.getItem('ma.admin') || ''; } catch (e) { return ''; } };
const adStamp = iso => iso ? new Date(iso).toLocaleString(lang, { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'America/Santo_Domingo' }) : '—';
const adContact = (phone, email) => `${phone ? `<a href="tel:${esc(phone.replace(/[^\d+]/g, ''))}">${esc(phone)}</a> · <a href="https://wa.me/${esc(phone.replace(/\D/g, ''))}" target="_blank" rel="noopener">WhatsApp</a>` : ''}${phone && email ? '<br>' : ''}${email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : ''}`;
const adProductName = key => (key && purchaseInfo(key).item) || key || '—';
const adEventName = id => { const ev = ANNUAL_EVENTS.find(e => e.id === id); return ev ? eventTitle(ev) : id; };

async function adLoad() {
  try {
    const r = await fetch('/api/admin', { headers: { Authorization: 'Bearer ' + adPassword() }, cache: 'no-store' });
    if (r.status === 401) { try { sessionStorage.removeItem('ma.admin'); } catch (e) {} adData = null; adMsg = t('adWrong'); }
    else if (r.status === 503) { adData = null; adMsg = t('adOff'); }
    else if (!r.ok) throw new Error(r.status);
    else { adData = await r.json(); adMsg = ''; }
  } catch (e) { adMsg = t('adErr'); }
  if (location.hash.startsWith('#/admin')) route();
}

function adTable(head, rows) {
  if (!rows.length) return `<p class="muted">${t('adNone')}</p>`;
  return `<div class="table-wrap" tabindex="0"><table class="ad-table"><thead><tr>${head.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function pageAdmin() {
  if (!adData) return `<div class="wrap"><section class="section" style="max-width:440px">
      <p class="eyebrow">Museo Abreu</p><h1>${t('adTitle')}</h1><p class="muted" style="margin:.6rem 0 1rem">${t('adLead')}</p>
      <form data-form="admin" class="unlock" novalidate>
        <label for="ad-pass">${t('adPass')}</label>
        <div class="unlock-row"><input id="ad-pass" type="password" autocomplete="current-password" required>
          <button class="btn primary" type="submit">${t('adEnter')}</button></div>
        <p class="status" role="status" aria-live="polite"${adMsg ? '' : ' hidden'}>${esc(adMsg)}</p>
      </form></section></div>`;
  const d = adData;
  const bids = d.auction.reduce((n, l) => n + l.bids.length, 0);
  const yes = d.rsvps.filter(r => r.att === 'yes'), people = yes.reduce((n, r) => n + 1 + (r.guests || 0), 0);
  const lots = d.auction.map(l => {
    const lot = AUCTION.lots.find(x => x.id === l.lot);
    return `<article class="ad-lot"><h3>${t('auLot', { n: lotNumber(lot) })} · ${esc(lotTitle(lot))}${l.example ? ` <span class="chip">${t('auExample')}</span>` : ''}</h3>
      <p class="muted">${t('auStart')}: ${l.startBid != null ? auUSD(l.startBid) : t('auTba')}${l.bids.length ? ` · ${t('adHigh')}: <strong>${auUSD(l.bids[0].amount)}</strong>` : ''}</p>
      ${adTable([t('adAmount'), t('adWhen'), t('name'), t('contact')], l.bids.map(b => [`<strong>${auUSD(b.amount)}</strong>`, adStamp(b.at), esc(b.name), adContact(b.phone, b.email)]))}</article>`;
  }).join('');
  const groups = {};
  d.rsvps.forEach(r => { (groups[r.event + ' ' + r.date] ||= []).push(r); });
  const rsvps = Object.entries(groups).map(([k, rs]) => {
    const [ev, date] = k.split(' '), n = rs.filter(r => r.att === 'yes').reduce((s, r) => s + 1 + (r.guests || 0), 0);
    const arrived = rs.reduce((s, r) => s + (r.arrived || 0), 0);
    return `<article class="ad-lot"><h3>${esc(adEventName(ev))} · ${fmtDate(date)}</h3>
      <p class="muted">${t('adAttending', { n })}${arrived ? ` · ${t('adArrivedN', { a: arrived, b: n })}` : ''}</p>
      <div class="btn-row"><a class="btn small primary" href="#/admin/puerta/${ev}/${date}">${t('adDoor')}</a></div>
      <p class="muted ad-help">${t('adRemindHelp')}</p>
      ${adTable([t('name'), t('adAtt'), t('adGuests'), t('contact'), t('adRemind')], rs.map(r => [esc(r.name) + (r.note ? `<br><small class="muted">${esc(r.note)}</small>` : ''), r.att === 'yes' ? t('adYes') : t('adNo'),
        r.guests ? `${r.guests}${r.guestNames ? ` · ${esc(r.guestNames)}` : ''}` : '—', adContact(r.phone, r.email), adRemindCell(r)]))}</article>`;
  }).join('') || `<p class="muted">${t('adNone')}</p>`;
  return `<div class="wrap admin">
    <section class="section"><p class="eyebrow">Museo Abreu</p><h1>${t('adTitle')}</h1>
      <p class="muted">${t('adUpdated', { time: adStamp(d.now) })}${adMsg ? ` · ${esc(adMsg)}` : ''}</p>
      <div class="ad-tiles">
        <div><strong>${bids}</strong><span>${t('adBids')}</span></div>
        <div><strong>${d.purchases.length}</strong><span>${t('adPurchases')}</span></div>
        <div><strong>${people}</strong><span>${t('adRsvps')}</span></div>
      </div>
      <div class="btn-row"><button class="btn" data-action="adRefresh">${t('adRefresh')}</button><button class="btn" data-action="adLogout">${t('adLogout')}</button></div>
    </section>
    <section class="section"><div class="section-head"><h2>${t('adBids')}</h2><button class="btn small" data-action="adCsv" data-what="bids">${t('adCsv')}</button></div>${lots}</section>
    <section class="section"><div class="section-head"><h2>${t('adPurchases')}</h2><button class="btn small" data-action="adCsv" data-what="purchases">${t('adCsv')}</button></div>
      ${adTable([t('adWhen'), t('adProduct'), t('email'), t('adAmount'), 'Whop'], d.purchases.map(p => [adStamp(p.at), esc(adProductName(p.product)),
        p.email ? `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : '—', p.amount != null ? auUSD(p.amount) : '—', `<small>${esc(p.type)}</small>`]))}</section>
    <section class="section"><div class="section-head"><h2>${t('adRsvps')}</h2><button class="btn small" data-action="adCsv" data-what="rsvps">${t('adCsv')}</button></div>${rsvps}</section>
  </div>`;
}

function adCsv(what) {
  const d = adData, q = v => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
  const rows = what === 'bids' ? [['lot', 'amount_usd', 'at', 'name', 'email', 'phone'], ...d.auction.flatMap(l => l.bids.map(b => [l.lot, b.amount, b.at, b.name, b.email, b.phone]))]
    : what === 'purchases' ? [['at', 'product', 'email', 'amount', 'whop_event'], ...d.purchases.map(p => [p.at, p.product, p.email, p.amount, p.type])]
    : [['event', 'date', 'attending', 'name', 'email', 'phone', 'guests', 'guest_names', 'note', 'at'], ...d.rsvps.map(r => [r.event, r.date, r.att, r.name, r.email, r.phone, r.guests, r.guestNames, r.note, r.at])];
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + rows.map(r => r.map(q).join(',')).join('\r\n')], { type: 'text/csv' }));
  a.download = `museo-abreu-${what}-${todayPC()}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

EXTRA_FORMS.admin = form => {
  const v = $('#ad-pass', form).value;
  if (!v) return $('#ad-pass', form).focus();
  try { sessionStorage.setItem('ma.admin', v); } catch (e) {}
  adMsg = ''; adTried = true; adLoad();
};
Object.assign(EXTRA_ACTIONS, {
  adRefresh: () => adLoad(),
  adLogout: () => { try { sessionStorage.removeItem('ma.admin'); } catch (e) {} adData = null; adMsg = ''; route(); },
  adCsv: el => adCsv(el.dataset.what),
});
Object.assign(EXTRA_ROUTES, { admin: (sub, ev, date) => { if (!adData && adPassword() && !adTried) { adTried = true; setTimeout(adLoad, 0); }
  return sub === 'puerta' && adData ? pageDoor(ev, date) : pageAdmin(); } });

/* ---------- Reminders and the door list ---------- */

Object.assign(I18N.es, {
  adRemind: 'Recordatorio', adRemindBtn: 'Enviar por WhatsApp', adSent: 'Enviado ✓', adNoPhone: 'Sin teléfono',
  adRemindHelp: 'El día antes, toque «Enviar por WhatsApp» en cada invitado: el mensaje va escrito en su idioma.',
  adDoor: 'Lista en la puerta', adSearch: 'Buscar por nombre', adArrived: 'Llegó', adUndo: 'Deshacer',
  adArrivedN: '{a} de {b} han llegado', adParty: '{n} pers.', adBack: 'Volver al panel', adSaveErr: 'No se guardó. Revise la conexión.',
});
Object.assign(I18N.en, {
  adRemind: 'Reminder', adRemindBtn: 'Send on WhatsApp', adSent: 'Sent ✓', adNoPhone: 'No phone',
  adRemindHelp: 'The day before, tap “Send on WhatsApp” for each guest: the message is written in their language.',
  adDoor: 'Door list', adSearch: 'Search by name', adArrived: 'Arrived', adUndo: 'Undo',
  adArrivedN: '{a} of {b} have arrived', adParty: '{n} ppl', adBack: 'Back to the dashboard', adSaveErr: 'Not saved. Check the connection.',
});
Object.assign(I18N.fr, {
  adRemind: 'Rappel', adRemindBtn: 'Envoyer sur WhatsApp', adSent: 'Envoyé ✓', adNoPhone: 'Pas de téléphone',
  adRemindHelp: 'La veille, touchez « Envoyer sur WhatsApp » pour chaque invité : le message est rédigé dans sa langue.',
  adDoor: 'Liste à l’entrée', adSearch: 'Rechercher par nom', adArrived: 'Arrivé', adUndo: 'Annuler',
  adArrivedN: '{a} sur {b} sont arrivés', adParty: '{n} pers.', adBack: 'Retour au tableau de bord', adSaveErr: 'Non enregistré. Vérifiez la connexion.',
});

// The reminder is written in the guest's own language (saved with the RSVP); German, Italian and
// Arabic guests get English.
const REMIND = {
  es: { one: 'Hola {name}, le recordamos con gusto: {event}, {date} a las {time}, en el Museo Abreu, Bávaro, Punta Cana. Su confirmación es para 1 persona. ¡Le esperamos!',
    many: 'Hola {name}, le recordamos con gusto: {event}, {date} a las {time}, en el Museo Abreu, Bávaro, Punta Cana. Su confirmación es para {n} personas. ¡Les esperamos!' },
  en: { one: 'Hello {name}, a kind reminder: {event}, {date} at {time}, at Museo Abreu, Bávaro, Punta Cana. Your reply is for 1 person. We look forward to welcoming you!',
    many: 'Hello {name}, a kind reminder: {event}, {date} at {time}, at Museo Abreu, Bávaro, Punta Cana. Your reply is for {n} people. We look forward to welcoming you!' },
  fr: { one: 'Bonjour {name}, petit rappel : {event}, le {date} à {time}, au Museo Abreu, Bávaro, Punta Cana. Votre réponse concerne 1 personne. Au plaisir de vous accueillir !',
    many: 'Bonjour {name}, petit rappel : {event}, le {date} à {time}, au Museo Abreu, Bávaro, Punta Cana. Votre réponse concerne {n} personnes. Au plaisir de vous accueillir !' },
};
const LOCALE = { es: 'es-DO', en: 'en-US', fr: 'fr-FR' };
// An event's title, date and time written in a guest's language (es, en or fr), for WhatsApp messages.
function eventWords(eventId, isoDate, gl) {
  const ev = ANNUAL_EVENTS.find(e => e.id === eventId), inv = ev && ev.invitation && ev.invitation[isoDate.slice(0, 4)];
  const title = inv && inv.cardTitle ? inv.cardTitle[gl] : ev ? ev.name[gl] + (ev.id === 'group-exhibition' ? ' ' + isoDate.slice(0, 4) : '') : eventId;
  const date = new Date(isoDate + 'T12:00:00').toLocaleDateString(LOCALE[gl], { weekday: 'long', day: 'numeric', month: 'long' });
  const [h, m] = (ev ? ev.time : '19:00').split(':').map(Number), mm = String(m).padStart(2, '0');
  const time = gl === 'fr' ? `${h} h${m ? ' ' + mm : ''}` : `${h % 12 || 12}:${mm} ${h < 12 ? (gl === 'es' ? 'a. m.' : 'AM') : (gl === 'es' ? 'p. m.' : 'PM')}`;
  return { title, date, time };
}
function reminderText(r) {
  const gl = REMIND[r.lang] ? r.lang : 'en', w = eventWords(r.event, r.date, gl);
  const n = 1 + (r.guests || 0), tpl = n === 1 ? REMIND[gl].one : REMIND[gl].many;
  return tpl.replace('{name}', (r.name || '').split(' ')[0]).replace('{event}', w.title).replace('{date}', w.date).replace('{time}', w.time).replace('{n}', n);
}
// "Sent" marks are kept on this device, so the person sending can see where they left off.
const adSentList = () => { try { return JSON.parse(localStorage.getItem('ma.adminSent') || '[]'); } catch (e) { return []; } };
function adRemindCell(r) {
  if (r.att !== 'yes') return '—';
  const phone = (r.phone || '').replace(/\D/g, '');
  if (!phone) return `<small class="muted">${t('adNoPhone')}</small>`;
  const sent = adSentList().includes(r.id);
  return `<a class="btn small ${sent ? '' : 'wa'}" data-action="adRemind" data-id="${esc(r.id)}" href="https://wa.me/${phone}?text=${encodeURIComponent(reminderText(r))}" target="_blank" rel="noopener">${sent ? t('adSent') : t('adRemindBtn')}</a>`;
}

let doorQuery = '';
function doorRow(r) {
  const party = 1 + (r.guests || 0), here = r.arrived || 0;
  return `<li class="door-row${here ? ' here' : ''}" data-name="${esc((r.name + ' ' + (r.guestNames || '')).toLowerCase())}">
    <div><strong>${esc(r.name)}</strong> <span class="muted">· ${t('adParty', { n: party })}</span>${r.walkin ? ` <span class="chip">${t('adWalkinTag')}</span>` : ''}
      ${r.guestNames ? `<br><small class="muted">${esc(r.guestNames)}</small>` : ''}${r.note ? `<br><small class="muted">${esc(r.note)}</small>` : ''}</div>
    <button class="btn small ${here ? '' : 'primary'}" data-action="adCheckin" data-id="${esc(r.id)}" data-n="${here ? 0 : party}">${here ? t('adUndo') : t('adArrived')}</button>
  </li>`;
}
function pageDoor(ev, date) {
  const rs = adData.rsvps.filter(r => r.event === ev && r.date === date && r.att === 'yes').sort((a, b) => a.name.localeCompare(b.name));
  const total = rs.reduce((s, r) => s + 1 + (r.guests || 0), 0), here = rs.reduce((s, r) => s + (r.arrived || 0), 0);
  return `<div class="wrap admin door">
    <a href="#/admin" class="btn small"><span class="arr">←</span> ${t('adBack')}</a>
    <section class="section"><p class="eyebrow">${t('adDoor')}</p><h1 class="h2">${esc(adEventName(ev))}</h1><p class="muted">${fmtDate(date)}</p>
      <p class="door-count" id="door-count">${t('adArrivedN', { a: here, b: total })}</p>
      <label class="visually-hidden" for="door-q">${t('adSearch')}</label>
      <input id="door-q" type="search" placeholder="${t('adSearch')}" value="${esc(doorQuery)}" autocomplete="off">
      <p class="status" id="door-err" role="status" aria-live="polite" hidden></p>
      <ul class="door-list">${rs.map(doorRow).join('') || `<li class="muted">${t('adNone')}</li>`}</ul>
      <details class="door-walkin"><summary>${t('adWalkin')}</summary>
        <form data-form="walkin" data-event="${esc(ev)}" data-date="${esc(date)}" class="unlock" novalidate>
          <div class="field"><label for="wi-name">${t('name')}</label><input id="wi-name" required autocomplete="off"></div>
          <div class="grid two">
            <div class="field"><label for="wi-party">${t('adPartySize')}</label><select id="wi-party">${[1, 2, 3, 4, 5, 6].map(n => `<option>${n}</option>`).join('')}</select></div>
            <div class="field"><label for="wi-phone">${t('phone')}</label><input id="wi-phone" type="tel" autocomplete="off"></div>
          </div>
          <button class="btn primary" type="submit">${t('adAdd')}</button>
        </form></details>
      <div class="btn-row"><button class="btn" data-action="adRefresh">${t('adRefresh')}</button></div>
    </section></div>`;
}
function doorFilter() {
  const q = doorQuery.trim().toLowerCase();
  document.querySelectorAll('.door-row').forEach(li => { li.hidden = q && !li.dataset.name.includes(q); });
}
document.addEventListener('input', e => { if (e.target.id === 'door-q') { doorQuery = e.target.value; doorFilter(); } });

Object.assign(EXTRA_ACTIONS, {
  adRemind: el => {
    const list = adSentList();
    if (!list.includes(el.dataset.id)) { list.push(el.dataset.id); try { localStorage.setItem('ma.adminSent', JSON.stringify(list)); } catch (e) {} }
    setTimeout(() => { el.textContent = t('adSent'); el.classList.remove('wa'); }, 300);
  },
  adCheckin: async el => {
    el.disabled = true;
    try {
      const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adPassword() },
        body: JSON.stringify({ action: 'checkin', id: el.dataset.id, arrived: Number(el.dataset.n) }) });
      if (!r.ok) throw new Error(r.status);
      const rec = await r.json(), i = adData.rsvps.findIndex(x => x.id === rec.id);
      if (i >= 0) adData.rsvps[i] = rec;
      route(); doorFilter();
      const q = document.getElementById('door-q'); if (q && doorQuery) q.focus();
    } catch (e) { const out = document.getElementById('door-err'); if (out) { out.textContent = t('adSaveErr'); out.hidden = false; } el.disabled = false; }
  },
});

Object.assign(I18N.es, { adWalkin: 'Añadir invitado sin confirmación', adWalkinTag: 'Sin RSVP', adPartySize: 'Personas', adAdd: 'Añadir y marcar llegada' });
Object.assign(I18N.en, { adWalkin: 'Add a walk-in guest', adWalkinTag: 'Walk-in', adPartySize: 'People', adAdd: 'Add and check in' });
Object.assign(I18N.fr, { adWalkin: 'Ajouter un invité sans réponse', adWalkinTag: 'Sans réponse', adPartySize: 'Personnes', adAdd: 'Ajouter et marquer l’arrivée' });

EXTRA_FORMS.walkin = async form => {
  const name = $('#wi-name', form);
  if (name.value.trim().length < 2) { name.focus(); return; }
  const btn = form.querySelector('button'); btn.disabled = true;
  try {
    const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adPassword() },
      body: JSON.stringify({ action: 'walkin', event: form.dataset.event, date: form.dataset.date, name: name.value.trim(), party: Number($('#wi-party', form).value), phone: $('#wi-phone', form).value.trim() }) });
    if (!r.ok) throw new Error(r.status);
    adData.rsvps.push(await r.json());
    doorQuery = ''; route();
  } catch (e) { const out = document.getElementById('door-err'); if (out) { out.textContent = t('adSaveErr'); out.hidden = false; } btn.disabled = false; }
};

/* ---------- Invitations (#/admin/invitar/<event>/<date>) ----------
   The museum pastes its guest list (a name and a phone per line, e.g. copied from a spreadsheet);
   each guest gets a "Send invitation" button that opens WhatsApp with a personal invitation in
   their language and the event's RSVP link. The list is kept on the server; replies are matched
   to RSVPs by phone number (or name). */

Object.assign(I18N.es, {
  inTitle: 'Invitaciones', inLead: 'Pegue su lista de invitados: un nombre y un teléfono por línea (por ejemplo, copiados de una hoja de cálculo). Puede añadir es, en o fr al final para el idioma.',
  inPaste: 'Lista de invitados', inLang: 'Idioma por defecto', inAdd: 'Añadir a la lista', inSend: 'Enviar invitación', inResend: 'Reenviar',
  inInvited: '{n} invitados', inSentN: '{n} enviadas', inReplied: '{n} respondieron', inComing: '{n} personas vienen',
  inStatusYes: 'Viene ({n})', inStatusNo: 'No viene', inStatusSent: 'Enviada', inStatusNew: 'Sin enviar', inRemove: 'Quitar',
  inActions: 'Acciones', inSkipped: '{n} líneas sin nombre o teléfono válido, o repetidas.', inOpen: 'Invitar',
  waInvite: '{name}, el Museo Abreu tiene el honor de invitarle a {event}, el {date} a las {time}, en Bávaro, Punta Cana. Por favor, confirme su asistencia aquí: {link}',
});
Object.assign(I18N.en, {
  inTitle: 'Invitations', inLead: 'Paste your guest list: a name and a phone number per line (for example, copied from a spreadsheet). Add es, en or fr at the end for the language.',
  inPaste: 'Guest list', inLang: 'Default language', inAdd: 'Add to the list', inSend: 'Send invitation', inResend: 'Send again',
  inInvited: '{n} guests', inSentN: '{n} sent', inReplied: '{n} replied', inComing: '{n} people coming',
  inStatusYes: 'Coming ({n})', inStatusNo: 'Not coming', inStatusSent: 'Sent', inStatusNew: 'Not sent', inRemove: 'Remove',
  inActions: 'Actions', inSkipped: '{n} lines without a valid name or phone, or repeated.', inOpen: 'Invite',
  waInvite: 'Dear {name}, Museo Abreu cordially invites you to {event}, {date} at {time}, in Bávaro, Punta Cana. Kindly RSVP here: {link}',
});
Object.assign(I18N.fr, {
  inTitle: 'Invitations', inLead: 'Collez votre liste d’invités : un nom et un téléphone par ligne (par exemple copiés d’un tableur). Ajoutez es, en ou fr à la fin pour la langue.',
  inPaste: 'Liste d’invités', inLang: 'Langue par défaut', inAdd: 'Ajouter à la liste', inSend: 'Envoyer l’invitation', inResend: 'Renvoyer',
  inInvited: '{n} invités', inSentN: '{n} envoyées', inReplied: '{n} ont répondu', inComing: '{n} personnes viennent',
  inStatusYes: 'Vient ({n})', inStatusNo: 'Ne vient pas', inStatusSent: 'Envoyée', inStatusNew: 'Non envoyée', inRemove: 'Retirer',
  inActions: 'Actions', inSkipped: '{n} lignes sans nom ou téléphone valide, ou en double.', inOpen: 'Inviter',
  waInvite: '{name}, le Museo Abreu a le plaisir de vous convier à {event}, le {date} à {time}, à Bávaro, Punta Cana. Merci de confirmer votre présence ici : {link}',
});
// The invitation text in the guest's language (I18N of that language, not the dashboard's).
const INVITE_TPL = { es: I18N.es.waInvite, en: I18N.en.waInvite, fr: I18N.fr.waInvite };

let inNote = '';
const inDigits = p => String(p || '').replace(/\D/g, '');
const inNorm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

// One guest per line: "Name, phone[, lang]" or tab/semicolon separated (spreadsheet copy).
function parseGuests(text, defLang) {
  const out = []; let skipped = 0;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim(); if (!line) continue;
    const parts = line.split(/\t|;|,(?=\s*[+\d(])|,\s*(?=(?:es|en|fr)\s*$)/i).map(x => x.trim()).filter(Boolean);
    const phone = parts.find(p => inDigits(p).length >= 7 && /^[+\d\s().-]+$/.test(p));
    const lang = parts.find(p => /^(es|en|fr)$/i.test(p));
    let name = parts.filter(p => p !== phone && p !== lang).join(' ').trim();
    const flip = name.match(/^([^,]+),\s*([^,]+)$/); // "Pérez, Luis" → "Luis Pérez"
    if (flip) name = `${flip[2]} ${flip[1]}`;
    if (!phone || name.length < 2) { skipped++; continue; }
    out.push({ name, phone, lang: lang ? lang.toLowerCase() : defLang });
  }
  return { list: out, skipped };
}
function inviteReply(g, ev, date) {
  return adData.rsvps.find(r => r.event === ev && r.date === date && !r.walkin &&
    ((inDigits(r.phone).length >= 7 && inDigits(r.phone).slice(-8) === inDigits(g.phone).slice(-8)) || inNorm(r.name) === inNorm(g.name)));
}
function inviteText(g, ev, date) {
  const w = eventWords(ev, date, g.lang);
  return INVITE_TPL[g.lang].replace('{name}', g.name.split(' ')[0]).replace('{event}', w.title).replace('{date}', w.date)
    .replace('{time}', w.time).replace('{link}', `${location.origin}/e/${ev}?l=${g.lang}`);
}

function pageInvite(ev, date) {
  const doc = (adData.invites || []).find(x => x.event === ev && x.date === date) || { list: [] };
  const rows = doc.list.map(g => ({ g, r: inviteReply(g, ev, date) }));
  const sent = rows.filter(x => x.g.sentAt).length, replied = rows.filter(x => x.r).length;
  const coming = rows.filter(x => x.r && x.r.att === 'yes').reduce((s, x) => s + 1 + (x.r.guests || 0), 0);
  return `<div class="wrap admin invite-page">
    <a href="#/admin" class="btn small"><span class="arr">←</span> ${t('adBack')}</a>
    <section class="section"><p class="eyebrow">${t('inTitle')}</p><h1 class="h2">${esc(adEventName(ev))}</h1><p class="muted">${fmtDate(date)}</p>
      <div class="ad-tiles">
        <div><strong>${doc.list.length}</strong><span>${t('inInvited', { n: '' }).trim()}</span></div>
        <div><strong>${sent}</strong><span>${t('inSentN', { n: '' }).trim()}</span></div>
        <div><strong>${coming}</strong><span>${t('inComing', { n: '' }).trim()}</span></div>
      </div>
      <p class="muted">${t('inReplied', { n: replied })}</p>
    </section>
    <section class="section">
      <form data-form="invites" data-event="${esc(ev)}" data-date="${esc(date)}" class="unlock" novalidate>
        <p class="muted">${t('inLead')}</p>
        <label for="in-list">${t('inPaste')}</label>
        <textarea id="in-list" rows="6" placeholder="Ana Pérez, +1 809 555 0100&#10;John Smith, +1 305 555 0199, en"></textarea>
        <div class="unlock-row"><label for="in-lang" class="visually-hidden">${t('inLang')}</label>
          <select id="in-lang">${['es', 'en', 'fr'].map(l => `<option value="${l}">${t('inLang')}: ${L(LANG_NAMES[l])}</option>`).join('')}</select>
          <button class="btn primary" type="submit">${t('inAdd')}</button></div>
        <p class="status" id="in-status" role="status" aria-live="polite"${inNote ? '' : ' hidden'}>${esc(inNote)}</p>
      </form>
    </section>
    <section class="section">
      <ul class="door-list invite-list">${rows.map(({ g, r }) => {
        const status = r ? (r.att === 'yes' ? `<span class="status ok">${t('inStatusYes', { n: 1 + (r.guests || 0) })}</span>` : t('inStatusNo'))
          : g.sentAt ? `${t('inStatusSent')} · ${adStamp(g.sentAt)}` : `<span class="muted">${t('inStatusNew')}</span>`;
        const wa = `https://wa.me/${inDigits(g.phone)}?text=${encodeURIComponent(inviteText(g, ev, date))}`;
        return `<li class="door-row${r && r.att === 'yes' ? ' here' : ''}">
          <div><strong>${esc(g.name)}</strong> <small class="muted">${g.lang.toUpperCase()}</small><br><small>${esc(g.phone)}</small><br><small>${status}</small></div>
          <div class="ad-actions">${r ? '' : `<a class="btn small ${g.sentAt ? '' : 'wa'}" href="${wa}" target="_blank" rel="noopener" data-action="inSent" data-id="${g.id}" data-event="${esc(ev)}" data-date="${esc(date)}">${g.sentAt ? t('inResend') : t('inSend')}</a>`}
            <button class="btn small" data-action="inRemove" data-id="${g.id}" data-event="${esc(ev)}" data-date="${esc(date)}" aria-label="${t('inRemove')} ${esc(g.name)}">×</button></div>
        </li>`;
      }).join('') || `<li class="muted">${t('adNone')}</li>`}</ul>
    </section>
  </div>`;
}

async function inPost(body) {
  const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + adPassword() }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(r.status);
  const doc = await r.json();
  adData.invites = [...(adData.invites || []).filter(x => !(x.event === doc.event && x.date === doc.date)), { event: doc.event, date: doc.date, list: doc.list }];
}
EXTRA_FORMS.invites = async form => {
  const { list, skipped } = parseGuests($('#in-list', form).value, $('#in-lang', form).value);
  const btn = form.querySelector('button[type=submit]'); btn.disabled = true;
  try {
    const before = ((adData.invites || []).find(x => x.event === form.dataset.event && x.date === form.dataset.date) || { list: [] }).list.length;
    await inPost({ action: 'invite-add', event: form.dataset.event, date: form.dataset.date, list });
    const after = adData.invites.find(x => x.event === form.dataset.event && x.date === form.dataset.date).list.length;
    const dup = list.length - (after - before), bad = skipped + dup;
    inNote = bad ? t('inSkipped', { n: bad }) : '';
    route();
  } catch (e) { inNote = t('adSaveErr'); route(); }
};
Object.assign(EXTRA_ACTIONS, {
  inSent: el => { inPost({ action: 'invite-sent', event: el.dataset.event, date: el.dataset.date, id: el.dataset.id }).then(() => setTimeout(route, 400)).catch(() => {}); },
  inRemove: el => { inPost({ action: 'invite-remove', event: el.dataset.event, date: el.dataset.date, id: el.dataset.id }).then(route).catch(() => {}); },
});

// Dashboard: an "Invitations" block with one button per upcoming invitation event; route for the page.
{
  const admin = pageAdmin;
  pageAdmin = () => {
    const html = admin();
    if (!adData) return html;
    const evs = rsvpEvents().map(ev => ({ ev, d: eventDate(ev) }));
    const block = `<section class="section"><h2>${t('inTitle')}</h2><div class="btn-row">${evs.map(({ ev, d }) => {
      const doc = (adData.invites || []).find(x => x.event === ev.id && x.date === d);
      return `<a class="btn" href="#/admin/invitar/${ev.id}/${d}">${t('inOpen')}: ${esc(eventTitle(ev))}${doc ? ` · ${doc.list.length}` : ''}</a>`;
    }).join('')}</div></section>`;
    const at = html.indexOf(`<section class="section"><div class="section-head"><h2>${t('adBids')}`);
    return at > 0 ? html.slice(0, at) + block + html.slice(at) : html + block;
  };
  const route0 = EXTRA_ROUTES.admin;
  EXTRA_ROUTES.admin = (sub, ev, date) => sub === 'invitar' && adData ? pageInvite(ev, date) : route0(sub, ev, date);
}
