// Auction alerts on the phone (Web Push, api/push.js): on a piece's page, "Alert me on this phone" sends
// a notification when bidding opens, on the last day to bid, and, once the guest has bid, when someone
// outbids them. The messages are written here in the guest's language; the server fills in the amount
// and the closing time. Uses the push helpers in remind.js.

Object.assign(I18N.es, {
  alTitle: 'Alertas en su teléfono', alBtn: 'Avisarme en este teléfono', alOn: 'Alertas activadas ✓', alOff: 'Quitar alertas', alRemoved: 'Alertas quitadas.',
  alHelpSoon: 'Le avisaremos cuando abran las pujas y el último día para pujar.',
  alHelpOpen: 'Le avisaremos si alguien supera su puja y el último día para pujar.',
  alNowTitle: 'Alertas activadas', alNowBody: 'Le avisaremos sobre «{title}».',
  alOutTitle: 'Su puja fue superada', alOutBody: '«{title}»: nueva puja de {amount}. Toque para pujar de nuevo.',
  alOpenTitle: 'Pujas abiertas', alOpenBody: '«{title}» ya acepta pujas en línea hasta el {when}',
  alCloseTitle: 'Último día para pujar', alCloseBody: 'Las pujas en línea por «{title}» cierran el {when}',
});
Object.assign(I18N.en, {
  alTitle: 'Alerts on your phone', alBtn: 'Alert me on this phone', alOn: 'Alerts on ✓', alOff: 'Turn off alerts', alRemoved: 'Alerts turned off.',
  alHelpSoon: 'We’ll tell you when bidding opens and on the last day to bid.',
  alHelpOpen: 'We’ll tell you if someone outbids you and on the last day to bid.',
  alNowTitle: 'Alerts on', alNowBody: 'We’ll keep you posted about “{title}”.',
  alOutTitle: 'You’ve been outbid', alOutBody: '“{title}”: new bid of {amount}. Tap to bid again.',
  alOpenTitle: 'Bidding is open', alOpenBody: '“{title}” is now open for online bids until {when}',
  alCloseTitle: 'Last day to bid', alCloseBody: 'Online bidding for “{title}” closes {when}',
});
Object.assign(I18N.fr, {
  alTitle: 'Alertes sur votre téléphone', alBtn: 'M’alerter sur ce téléphone', alOn: 'Alertes activées ✓', alOff: 'Désactiver les alertes', alRemoved: 'Alertes désactivées.',
  alHelpSoon: 'Nous vous préviendrons à l’ouverture des enchères et le dernier jour pour enchérir.',
  alHelpOpen: 'Nous vous préviendrons si quelqu’un surenchérit et le dernier jour pour enchérir.',
  alNowTitle: 'Alertes activées', alNowBody: 'Nous vous tiendrons au courant pour « {title} ».',
  alOutTitle: 'Votre enchère a été dépassée', alOutBody: '« {title} » : nouvelle enchère de {amount}. Touchez pour enchérir à nouveau.',
  alOpenTitle: 'Les enchères sont ouvertes', alOpenBody: '« {title} » est ouverte aux enchères en ligne jusqu’au {when}',
  alCloseTitle: 'Dernier jour pour enchérir', alCloseBody: 'Les enchères en ligne pour « {title} » se terminent le {when}',
});

const AL_LOCALE = { es: 'es-DO', en: 'en-US', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', ar: 'ar' };
const alList = () => { try { return JSON.parse(localStorage.getItem('ma.lotAlerts') || '[]'); } catch (e) { return []; } };
const alSave = list => { try { localStorage.setItem('ma.lotAlerts', JSON.stringify(list)); } catch (e) {} };
// Pieces closed online get no alerts.
const alClosed = lot => lotCloses(lot) && !lotOpen(lot);

function alertsBlock(lot) {
  if (alClosed(lot) || (!rmCanPush() && !rmIosTab())) return '';
  const on = alList().includes(lot.id);
  return `<div class="remind lot-alerts"><h2 class="h3">${t('alTitle')}</h2>
    ${on ? `<p class="remind-on">${t('alOn')}</p><button class="btn small" data-action="alOff" data-lot="${lot.id}">${t('alOff')}</button>`
      : `<button class="btn" data-action="alOn" data-lot="${lot.id}">${t('alBtn')}</button>`}
    <p class="muted remind-help">${t(lotOpen(lot) ? 'alHelpOpen' : 'alHelpSoon')}</p>
    <p class="status" id="rm-status" role="status" aria-live="polite" hidden></p>
  </div>`;
}

// quiet: refresh an existing subscription (e.g. with the email just used to bid) without a new notification.
async function alTurnOn(lot, quiet, email) {
  const title = lotTitle(lot);
  try {
    const sub = quiet ? await (await navigator.serviceWorker.ready).pushManager.getSubscription() : await pushSubscription();
    if (!sub) return;
    const r = await rmPost({ action: 'lot-add', lot: lot.id, sub: sub.toJSON(), email: email || profile.email || '', locale: AL_LOCALE[lang] || 'en-US',
      msg: { outbid: { title: t('alOutTitle'), body: t('alOutBody', { title }) }, open: { title: t('alOpenTitle'), body: t('alOpenBody', { title }) },
        closing: { title: t('alCloseTitle'), body: t('alCloseBody', { title }) } },
      now: quiet ? null : { title: t('alNowTitle'), body: t('alNowBody', { title }) } });
    if (!r.ok) throw new Error(r.status);
    if (quiet) return;
    alSave([...alList().filter(x => x !== lot.id), lot.id]);
    if (typeof trackEvent === 'function') trackEvent('Auction alerts on', { lot: lot.id });
    route();
  } catch (e) { if (!quiet) rmSay(t('rmErr')); }
}
async function alTurnOff(lot) {
  alSave(alList().filter(x => x !== lot.id));
  try {
    const sub = rmCanPush() && await (await navigator.serviceWorker.ready).pushManager.getSubscription();
    if (sub) await rmPost({ action: 'lot-remove', lot: lot.id, endpoint: sub.endpoint });
  } catch (e) {}
  route(); rmSay(t('alRemoved'));
}

Object.assign(EXTRA_ACTIONS, {
  alOn: el => alTurnOn(AUCTION.lots.find(l => l.id === el.dataset.lot)),
  alOff: el => alTurnOff(AUCTION.lots.find(l => l.id === el.dataset.lot)),
});

{
  // On each piece's page, above the note about the winner.
  const auction = pageAuction;
  pageAuction = id => {
    const html = auction(id), lot = id && AUCTION.lots.find(l => l.id === id);
    const mark = `<p class="muted" style="margin-top:1rem">${t('auWinner')}</p>`;
    return lot ? html.replace(mark, alertsBlock(lot) + mark) : html;
  };
  EXTRA_ROUTES.subasta = pageAuction;
  // After a bid, an existing alert learns the bidder's email, so "outbid" can reach them.
  const bid = EXTRA_FORMS.bid;
  EXTRA_FORMS.bid = async form => {
    const email = (form.querySelector('#bid-email') || {}).value;
    await bid(form);
    if (alList().includes(form.dataset.lot) && rmCanPush()) alTurnOn(AUCTION.lots.find(l => l.id === form.dataset.lot), true, email);
  };
}
