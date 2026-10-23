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
  return `<div class="table-wrap"><table class="ad-table"><thead><tr>${head.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead>
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
    return `<article class="ad-lot"><h3>${esc(adEventName(ev))} · ${fmtDate(date)}</h3><p class="muted">${t('adAttending', { n })}</p>
      ${adTable([t('name'), t('adAtt'), t('adGuests'), t('contact'), t('adNote')], rs.map(r => [esc(r.name), r.att === 'yes' ? t('adYes') : t('adNo'),
        r.guests ? `${r.guests}${r.guestNames ? ` · ${esc(r.guestNames)}` : ''}` : '—', adContact(r.phone, r.email), esc(r.note || '')]))}</article>`;
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
Object.assign(EXTRA_ROUTES, { admin: () => { if (!adData && adPassword() && !adTried) { adTried = true; setTimeout(adLoad, 0); } return pageAdmin(); } });
