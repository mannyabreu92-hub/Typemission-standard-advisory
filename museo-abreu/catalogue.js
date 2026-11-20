// Three tools for a lot and the sale:
// · "Remind me 1 hour before it closes": a calendar event in the last hour of bidding, with an alarm when it
//   starts (an .ics file, which iPhone, Android, Mac and Outlook all open; no account and no app needed).
// · "Share as image": a portrait card (1080 × 1350, Instagram's size) drawn on the phone — the work in its black
//   frame, the lot number, the artist and the title — shared straight to Instagram or WhatsApp, or saved.
// · The sale catalogue (#/subasta/catalogo): every lot by artist, with its picture and the book's facts, laid out
//   to print or to save as a PDF from the browser.

/* ---------- The reminder ---------- */
const crmStamp = d => new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
const crmICS = s => String(s).replace(/[\\;,]/g, m => '\\' + m).replace(/\n/g, '\\n');
function crmBtn(lot) {
  const c = auCloses(lot);
  return c && auOpen(lot) && Date.parse(c) - Date.now() > 36e5 ? `<button type="button" class="lot-more" data-action="crmCal" data-lot="${lot.id}">${t('crmBtn')}</button>` : '';
}
EXTRA_ACTIONS.crmCal = el => {
  const lot = AUCTION.lots.find(l => l.id === el.dataset.lot), c = lot && auCloses(lot);
  if (!c) return;
  const end = Date.parse(c), url = `${location.origin}/l/${lot.id}?l=${lang}`, title = lotTitle(lot);
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Museo Abreu//ES', 'BEGIN:VEVENT',
    `UID:lot-${lot.id}-${crmStamp(end)}@museoabreu`, 'DTSTAMP:' + crmStamp(Date.now()),
    'DTSTART:' + crmStamp(end - 36e5), 'DTEND:' + crmStamp(end),
    'SUMMARY:' + crmICS(t('crmCalTitle', { title })), 'DESCRIPTION:' + crmICS(t('crmCalBody', { title, lot: t('auLot', { n: lotNumber(lot) }) }) + '\n' + url),
    'URL:' + url, 'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + crmICS(t('crmCalTitle', { title })), 'TRIGGER:PT0M', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = `museo-abreu-lot-${lotNumber(lot)}.ics`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  if (typeof trackEvent === 'function') trackEvent('Lot reminder', { lot: lot.id });
};

/* ---------- The share card ---------- */
const scBtn = lot => `<button type="button" class="lot-more" data-action="scShare" data-lot="${lot.id}">${t('scBtn')}</button>`;
// Lines of at most `max` pixels, at most `n` of them (the last ends with … when cut).
function scWrap(ctx, text, max, n) {
  const words = String(text).split(/\s+/), lines = [];
  let cur = '';
  for (const w of words) { const next = cur ? cur + ' ' + w : w; if (ctx.measureText(next).width <= max || !cur) cur = next; else { lines.push(cur); cur = w; } }
  if (cur) lines.push(cur);
  if (lines.length > n) { lines.length = n; lines[n - 1] = lines[n - 1].replace(/\s*\S*$/, '') + '…'; }
  return lines;
}
async function scDraw(lot) {
  const W = 1080, H = 1350, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  try { await Promise.all(['500 italic 64px "Cormorant Garamond"', '600 28px "Work Sans"', '600 22px "Work Sans"'].map(f => document.fonts.load(f))); } catch (e) {}
  const img = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = lot.img; });
  ctx.fillStyle = '#f6f1e9'; ctx.fillRect(0, 0, W, H);
  // The work in its black frame, as large as the card allows above the words.
  const boxW = W - 160, boxH = 860, pad = 26, r = Math.min((boxW - pad * 2) / img.width, (boxH - pad * 2) / img.height);
  const iw = img.width * r, ih = img.height * r, fw = iw + pad * 2, fh = ih + pad * 2, fx = (W - fw) / 2, fy = 90 + (boxH - fh) / 2;
  ctx.save(); ctx.shadowColor = 'rgba(22,18,15,.28)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
  ctx.fillStyle = '#0d0c0b'; ctx.fillRect(fx, fy, fw, fh); ctx.restore();
  ctx.drawImage(img, fx + pad, fy + pad, iw, ih);
  // The words, centred: lot, artist, title; the museum at the foot.
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  const spaced = px => { ctx.letterSpacing = px; };
  let y = 90 + boxH + 90;
  ctx.fillStyle = '#75602f'; ctx.font = '600 24px "Work Sans", sans-serif'; spaced('6px');
  ctx.fillText((t('auLot', { n: lotNumber(lot) }) + ' · ' + t('auEyebrow')).toUpperCase(), W / 2, y);
  y += 58; ctx.fillStyle = '#16120f'; ctx.font = '600 30px "Work Sans", sans-serif'; spaced('4px');
  ctx.fillText(lotArtist(lot).toUpperCase(), W / 2, y);
  spaced('0px'); ctx.font = 'italic 500 60px "Cormorant Garamond", Georgia, serif';
  for (const line of scWrap(ctx, lotTitle(lot), W - 180, 2)) { y += 72; ctx.fillText(line, W / 2, y); }
  ctx.fillStyle = '#6b6159'; ctx.font = '600 22px "Work Sans", sans-serif'; spaced('6px');
  ctx.fillText(('Museo Abreu · ' + location.host).toUpperCase(), W / 2, H - 56);
  spaced('0px');
  return new Promise(ok => cv.toBlob(ok, 'image/png'));
}
EXTRA_ACTIONS.scShare = async el => {
  const lot = AUCTION.lots.find(l => l.id === el.dataset.lot);
  if (!lot) return;
  el.disabled = true;
  try {
    const blob = await scDraw(lot), name = `museo-abreu-lot-${lotNumber(lot)}.png`;
    const file = new File([blob], name, { type: 'image/png' }), url = `${location.origin}/l/${lot.id}?l=${lang}`;
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: lotTitle(lot), text: `${lotTitle(lot)} · ${lotArtist(lot)} · ${url}` }); } catch (e) { if (e.name !== 'AbortError') throw e; }
    } else {
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      const s = document.getElementById('share-status'); if (s) { s.textContent = t('scSaved'); s.hidden = false; }
    }
    if (typeof trackEvent === 'function') trackEvent('Share image', { lot: lot.id });
  } catch (e) { const s = document.getElementById('share-status'); if (s) { s.textContent = t('auErr'); s.hidden = false; } }
  el.disabled = false;
};

/* ---------- The sale catalogue ---------- */
function pageCatalogue() {
  if (typeof auTimer !== 'undefined') clearInterval(auTimer); // the catalogue does not refresh with the bids
  const list = auArtists(), lots = auLots();
  const fact = (k, v) => v ? `<div><dt>${k}</dt><dd>${esc(String(v))}</dd></div>` : '';
  return `<div class="wrap ct-page">
    <p class="ct-noprint"><a href="#/subasta" class="lot-back"><span class="arr" aria-hidden="true">←</span> ${t('auBack')}</a></p>
    <section class="ct-cover">
      <p class="eyebrow">Museo Abreu · Bávaro, Punta Cana</p>
      <h1 class="ct-h1">${t('ctTitle')}</h1>
      <p class="shop-lead">${t('auFindLead', { n: lots.length, a: list.length })}</p>
      ${AUCTION.closesAt ? `<p class="ct-close">${t('auAllClose', { date: dateTime(AUCTION.closesAt) })}</p>` : ''}
      <p class="ct-src">${t('ctSrc')}</p>
      <p class="ct-noprint"><button type="button" class="au-v-bid" data-action="ctPrint">${t('ctPrint')}</button> <a class="lot-go" href="#/subasta/qr">${t('qrNav')} <span class="arr" aria-hidden="true">→</span></a></p>
    </section>
    ${list.map(a => {
      const e = auEssay(a.name);
      return `<section class="ct-artist">
        <div class="ct-artist-head"><h2 class="ct-name">${esc(a.name)}${auNameYears(a.name)}</h2>
        ${e.head ? `<p class="ct-head" lang="${e.headLang}">${esc(e.head)}</p>` : ''}
        ${artistLine(a.lots[0], true) ? `<p class="ct-line">${esc(artistLine(a.lots[0], true))}</p>` : ''}</div>
        <div class="ct-lots">${a.lots.map(l => { const [y, m, s] = lotFacts(l); return `<article class="ct-lot">
          <img src="${l.thumb || l.img}" alt="${esc(lotTitle(l))}" width="600" height="600" loading="eager" decoding="async">
          <div><p class="lot-meta">${t('auLot', { n: lotNumber(l) })}</p><h3 class="ct-title">${esc(lotTitle(l))}</h3>
            <dl>${fact(t('auType'), lotKind(l))}${fact(t('year'), y)}${fact(t('auMedium'), m)}${fact(t('auSize'), s)}${fact(t('auStart'), l.startBid != null ? auUSD(l.startBid) : '')}</dl></div>
        </article>`; }).join('')}</div>
      </section>`;
    }).join('')}
  </div>`;
}
/* ---------- Wall labels with QR codes (#/subasta/qr) ---------- */
// One label per work for the museum's walls: lot, artist, title, size, and a QR code to the work's page (its
// share link, /l/<lot>, which opens the lot in the app). Printed eight to an A4 page.
function pageLabels() {
  if (typeof auTimer !== 'undefined') clearInterval(auTimer);
  return `<div class="wrap ct-page qr-page">
    <p class="ct-noprint"><a href="#/subasta/catalogo" class="lot-back"><span class="arr" aria-hidden="true">←</span> ${t('ctTitle')}</a></p>
    <section class="ct-noprint qr-head"><h1 class="shop-h1">${t('qrH')}</h1><p class="shop-lead">${t('qrLead')}</p>
      <p><button type="button" class="au-v-bid" data-action="ctPrint">${t('ctPrint')}</button></p></section>
    <div class="qr-labels">${auLots().map(l => { const [, , s] = lotFacts(l); return `<article class="qr-label">
      <div class="qr-text"><p class="lot-meta">${t('auLot', { n: lotNumber(l) })}</p>
        <p class="qr-artist">${esc(lotArtist(l))}</p><p class="qr-title">${esc(lotTitle(l))}</p>
        ${s ? `<p class="qr-size">${esc(s)}</p>` : ''}<p class="qr-scan">${t('qrScan')}</p></div>
      <div class="qr-code" data-qr="${location.origin}/l/${l.id}" role="img" aria-label="QR · ${esc(lotTitle(l))}"></div>
    </article>`; }).join('')}</div>
  </div>`;
}
EXTRA_ACTIONS.ctPrint = () => { if (typeof trackEvent === 'function') trackEvent('Catalogue print', {}); print(); };
{
  // Wraps pageAuction itself, as the other auction add-ons do, so the ones loaded later keep it.
  const auction = pageAuction;
  pageAuction = id => id === 'catalogo' && auLots().length ? pageCatalogue() : id === 'qr' && auLots().length ? pageLabels() : auction(id);
  EXTRA_ROUTES.subasta = pageAuction;
}
