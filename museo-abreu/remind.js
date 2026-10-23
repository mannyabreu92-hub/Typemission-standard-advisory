// "Remind me the day before": after replying yes to an invitation, a guest can get a phone notification
// the day before the event (Web Push, api/push.js; sent by api/push-cron.js at 10:00 Punta Cana time).
// The reminder is written here, in the guest's language, and stored with the subscription. A first
// notification arrives straight away so the guest sees it works. On iPhone, notifications need the app
// added to the Home Screen first; the button says so.

Object.assign(I18N.es, {
  rmBtn: 'Recordarme el día antes', rmOn: 'Recordatorio activado ✓', rmOff: 'Quitar recordatorio',
  rmHelp: 'Le enviaremos una notificación a este teléfono el día antes, a las 10 de la mañana.',
  rmIos: 'En iPhone: toque Compartir › «Agregar a inicio», abra la app desde la pantalla de inicio y vuelva a tocar este botón.',
  rmBlocked: 'Las notificaciones están bloqueadas para este sitio. Actívelas en los ajustes del navegador.',
  rmErr: 'No se pudo activar el recordatorio. Inténtelo de nuevo.', rmRemoved: 'Recordatorio quitado.',
  rmNowTitle: 'Recordatorio activado', rmNowBody: 'Le avisaremos el día antes: {event}.',
  rmTitle: 'Mañana: {event}', rmBody: '{date} a las {time} · Museo Abreu, Bávaro, Punta Cana. ¡Le esperamos!',
});
Object.assign(I18N.en, {
  rmBtn: 'Remind me the day before', rmOn: 'Reminder on ✓', rmOff: 'Turn off reminder',
  rmHelp: 'We’ll send a notification to this phone the day before, at 10 a.m.',
  rmIos: 'On iPhone: tap Share › “Add to Home Screen”, open the app from the Home Screen and tap this button again.',
  rmBlocked: 'Notifications are blocked for this site. Turn them on in the browser settings.',
  rmErr: 'The reminder could not be set. Please try again.', rmRemoved: 'Reminder turned off.',
  rmNowTitle: 'Reminder set', rmNowBody: 'We’ll remind you the day before: {event}.',
  rmTitle: 'Tomorrow: {event}', rmBody: '{date} at {time} · Museo Abreu, Bávaro, Punta Cana. We look forward to welcoming you!',
});
Object.assign(I18N.fr, {
  rmBtn: 'Me le rappeler la veille', rmOn: 'Rappel activé ✓', rmOff: 'Désactiver le rappel',
  rmHelp: 'Nous enverrons une notification sur ce téléphone la veille, à 10 h.',
  rmIos: 'Sur iPhone : touchez Partager › « Sur l’écran d’accueil », ouvrez l’app depuis l’écran d’accueil et touchez à nouveau ce bouton.',
  rmBlocked: 'Les notifications sont bloquées pour ce site. Activez-les dans les réglages du navigateur.',
  rmErr: 'Le rappel n’a pas pu être activé. Réessayez.', rmRemoved: 'Rappel désactivé.',
  rmNowTitle: 'Rappel activé', rmNowBody: 'Nous vous le rappellerons la veille : {event}.',
  rmTitle: 'Demain : {event}', rmBody: '{date} à {time} · Museo Abreu, Bávaro, Punta Cana. Au plaisir de vous accueillir !',
});

const rmCanPush = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
// iPhone and iPad Safari only offer notifications to an app opened from the Home Screen.
const rmIosTab = () => /iPhone|iPad|iPod/.test(navigator.userAgent) && !navigator.standalone;
const rmList = () => { try { return JSON.parse(localStorage.getItem('ma.reminders') || '[]'); } catch (e) { return []; } };
const rmSave = list => { try { localStorage.setItem('ma.reminders', JSON.stringify(list)); } catch (e) {} };

// The block under a "yes" reply: the button, or "Reminder on ✓" with a way to turn it off.
function remindBlock(ev) {
  const d = eventDate(ev);
  if (d <= todayPC() || (!rmCanPush() && !rmIosTab())) return '';
  const on = rmList().includes(`${ev.id}:${d}`);
  return `<div class="remind">
    ${on ? `<p class="remind-on">${t('rmOn')}</p><button class="btn small" data-action="rmOff" data-id="${ev.id}">${t('rmOff')}</button>`
      : `<button class="btn" data-action="rmOn" data-id="${ev.id}">${t('rmBtn')}</button>`}
    <p class="muted remind-help">${t('rmHelp')}</p>
    <p class="status" id="rm-status" role="status" aria-live="polite" hidden></p>
  </div>`;
}
const rmSay = msg => { const s = document.getElementById('rm-status'); if (s) { s.textContent = msg; s.hidden = false; } };
const rmKey = b64 => { const s = atob((b64 + '='.repeat((4 - b64.length % 4) % 4)).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(s, c => c.charCodeAt(0)); };
const rmPost = body => fetch('/api/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

async function rmTurnOn(ev) {
  if (rmIosTab() && !rmCanPush()) return rmSay(t('rmIos'));
  const d = eventDate(ev), title = eventTitle(ev);
  try {
    if (await Notification.requestPermission() !== 'granted') return rmSay(t('rmBlocked'));
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      const { key } = await (await fetch('/api/push', { cache: 'no-store' })).json();
      sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: rmKey(key) });
    }
    const r = await rmPost({ action: 'add', sub: sub.toJSON(), event: ev.id, date: d, url: `#/evento/${ev.id}`,
      title: t('rmTitle', { event: title }), body: t('rmBody', { date: fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long' }), time: rsvpTime(ev.time) }),
      now: { title: t('rmNowTitle'), body: t('rmNowBody', { event: title }) } });
    if (!r.ok) throw new Error(r.status);
    rmSave([...rmList().filter(x => x !== `${ev.id}:${d}`), `${ev.id}:${d}`]);
    if (typeof trackEvent === 'function') trackEvent('Reminder on', { event: ev.id });
    route();
  } catch (e) { rmSay(t('rmErr')); }
}
async function rmTurnOff(ev, quiet) {
  const d = eventDate(ev);
  rmSave(rmList().filter(x => x !== `${ev.id}:${d}`));
  try {
    const sub = rmCanPush() && await (await navigator.serviceWorker.ready).pushManager.getSubscription();
    if (sub) await rmPost({ action: 'remove', endpoint: sub.endpoint, event: ev.id, date: d });
  } catch (e) {}
  if (!quiet) { route(); rmSay(t('rmRemoved')); }
}

Object.assign(EXTRA_ACTIONS, {
  rmOn: el => rmTurnOn(ANNUAL_EVENTS.find(e => e.id === el.dataset.id)),
  rmOff: el => rmTurnOff(ANNUAL_EVENTS.find(e => e.id === el.dataset.id)),
});

{
  // Under the reply on the invitation page…
  const rsvp = pageRsvp;
  pageRsvp = id => {
    const html = rsvp(id), ev = ANNUAL_EVENTS.find(e => e.id === id), reply = rsvpReplies()[id];
    if (!ev || !reply || reply.att !== 'yes' || reply.date !== eventDate(ev) || rsvpEditing.has(id)) return html;
    const at = html.indexOf('</section>', html.indexOf('rsvp-reply'));
    return at > 0 ? html.slice(0, at) + remindBlock(ev) + html.slice(at) : html;
  };
  EXTRA_ROUTES.rsvp = pageRsvp;
  // …and on the event page for a guest who said yes.
  const evPage = pageEvent;
  pageEvent = id => {
    const html = evPage(id), ev = ANNUAL_EVENTS.find(e => e.id === id), reply = ev && rsvpReplies()[id];
    if (!reply || reply.att !== 'yes' || reply.date !== eventDate(ev)) return html;
    const mark = '<p class="status" id="ev-status"';
    return html.replace(mark, remindBlock(ev) + mark);
  };
  EXTRA_ROUTES.evento = pageEvent;
  // Changing the reply to "no" turns the reminder off.
  const form = EXTRA_FORMS.rsvp;
  EXTRA_FORMS.rsvp = f => {
    const att = (f.querySelector('input[name="rs-att"]:checked') || {}).value, ev = ANNUAL_EVENTS.find(e => e.id === f.dataset.id);
    form(f);
    if (att === 'no' && ev && rmList().includes(`${ev.id}:${eventDate(ev)}`)) rmTurnOff(ev, true);
  };
}
