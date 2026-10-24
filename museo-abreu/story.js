// "Instagram image": a 1080 × 1920 story image for an event, an auction lot or the book, drawn in the
// browser (painting, title, date, place, link) in the app's look. On phones it opens the share sheet
// with the image (straight to Instagram, WhatsApp…); elsewhere it downloads the PNG.

Object.assign(I18N.es, { igBtn: 'Imagen para Instagram', igReady: 'Imagen lista: compártala o guárdela.', igErr: 'No se pudo crear la imagen.' });
Object.assign(I18N.en, { igBtn: 'Instagram image', igReady: 'Image ready: share or save it.', igErr: 'The image could not be created.' });
Object.assign(I18N.fr, { igBtn: 'Image pour Instagram', igReady: 'Image prête : partagez-la ou enregistrez-la.', igErr: 'L’image n’a pas pu être créée.' });

const STORY = { w: 1080, h: 1920, ink: '#16120f', paper: '#f6f1e9', gold: '#c4a76c', soft: '#d8c196' };

function storyFonts() {
  const ar = lang === 'ar', ru = lang === 'ru';
  return { serif: ar ? '"Noto Naskh Arabic", "Cormorant Garamond", Georgia, serif' : '"Cormorant Garamond", Georgia, serif',
    sans: ar ? '"Noto Sans Arabic", "Work Sans", system-ui, sans-serif' : ru ? '"Golos Text", "Work Sans", system-ui, sans-serif' : '"Work Sans", system-ui, sans-serif' };
}

// Breaks text into lines that fit `max` pixels (at most `limit` lines, the last one shortened with …).
const CJK = /[\u3040-\u30ff\u3400-\u9fff\uff00-\uffef]/;
function storyLines(ctx, text, max, limit) {
  // Japanese has no spaces: it breaks between characters, but not before closing punctuation (、。」…).
  const cjk = CJK.test(text), sep = cjk ? '' : ' ';
  const words = cjk ? String(text).match(/.[、。，．・：；！？」』）】〉》ー…]*/gu) : String(text).split(/\s+/), lines = [];
  let line = '';
  for (const w of words) {
    const next = line ? line + sep + w : w;
    if (ctx.measureText(next).width <= max || !line) line = next;
    else { lines.push(line); line = w; }
  }
  if (line) lines.push(line);
  if (lines.length > limit) { lines.length = limit; lines[limit - 1] = (cjk ? lines[limit - 1].slice(0, -1) : lines[limit - 1].replace(/\s*\S*$/, '')) + '…'; }
  return lines;
}

async function drawStory(s) {
  const { w, h } = STORY, f = storyFonts(), rtl = lang === 'ar';
  await Promise.all([`600 96px ${f.serif}`, `italic 400 52px ${f.serif}`, `500 30px ${f.sans}`].map(x => document.fonts.load(x).catch(() => {})));
  const img = await new Promise((ok, fail) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fail; i.src = s.img; });
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = STORY.ink; ctx.fillRect(0, 0, w, h);
  // The painting fills the top, cropped to cover.
  const ih = 1060, scale = Math.max(w / img.width, ih / img.height);
  const sw = w / scale, sh = ih / scale;
  ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, w, ih);
  const fade = ctx.createLinearGradient(0, ih - 260, 0, ih);
  fade.addColorStop(0, 'rgba(22,18,15,0)'); fade.addColorStop(1, STORY.ink);
  ctx.fillStyle = fade; ctx.fillRect(0, ih - 260, w, 260);
  ctx.font = `400 24px ${f.sans}`; ctx.fillStyle = 'rgba(246,241,233,.75)';
  ctx.textAlign = rtl ? 'left' : 'right'; ctx.direction = rtl ? 'rtl' : 'ltr';
  if (s.credit) ctx.fillText(s.credit, rtl ? 60 : w - 60, ih - 30);
  // Text block, centred.
  ctx.textAlign = 'center';
  let y = ih + 110;
  ctx.fillStyle = STORY.gold; ctx.font = `500 30px ${f.sans}`;
  if (!rtl) ctx.letterSpacing = '8px';
  ctx.fillText(s.eyebrow.toUpperCase(), w / 2, y);
  ctx.letterSpacing = '0px';
  y += 110;
  ctx.fillStyle = STORY.paper; ctx.font = `600 ${s.title.length > 30 ? 80 : 96}px ${f.serif}`;
  for (const line of storyLines(ctx, s.title, w - 160, 3)) { ctx.fillText(line, w / 2, y); y += s.title.length > 30 ? 88 : 104; }
  if (s.sub) { ctx.font = `italic 400 52px ${f.serif}`; ctx.fillStyle = STORY.soft; for (const line of storyLines(ctx, s.sub, w - 200, 2)) { ctx.fillText(line, w / 2, y); y += 64; } }
  y += 30;
  ctx.strokeStyle = STORY.gold; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(w / 2 - 140, y); ctx.lineTo(w / 2 - 22, y); ctx.moveTo(w / 2 + 22, y); ctx.lineTo(w / 2 + 140, y); ctx.stroke();
  ctx.save(); ctx.translate(w / 2, y); ctx.rotate(Math.PI / 4); ctx.strokeRect(-9, -9, 18, 18); ctx.restore();
  y += 90;
  ctx.fillStyle = STORY.paper; ctx.font = `500 40px ${f.sans}`;
  for (const line of s.lines) { for (const l of storyLines(ctx, line, w - 160, 2)) { ctx.fillText(l, w / 2, y); y += 56; } }
  // Footer: the share link.
  ctx.fillStyle = STORY.gold; ctx.font = `500 30px ${f.sans}`;
  ctx.fillText(s.link, w / 2, h - 120);
  ctx.fillStyle = 'rgba(246,241,233,.6)'; ctx.font = `400 26px ${f.sans}`;
  ctx.fillText('Museo Abreu · Art Experiences', w / 2, h - 72);
  return new Promise(ok => c.toBlob(ok, 'image/png'));
}

async function storyShare(s, file, statusId) {
  const out = document.getElementById(statusId);
  try {
    const blob = await drawStory(s), f = new File([blob], file, { type: 'image/png' });
    if (typeof trackEvent === 'function') trackEvent('Instagram image', { item: file });
    if (navigator.canShare && navigator.canShare({ files: [f] })) {
      try { await navigator.share({ files: [f], title: s.title }); return; } catch (e) { if (e.name === 'AbortError') return; }
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = file; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    if (out) { out.textContent = t('igReady'); out.hidden = false; }
  } catch (e) { if (out) { out.textContent = t('igErr'); out.hidden = false; } }
}

const storyHost = () => location.host || 'museo-abreu.vercel.app';

Object.assign(EXTRA_ACTIONS, {
  evStory: el => {
    const ev = ANNUAL_EVENTS.find(e => e.id === el.dataset.id), d = eventDate(ev), art = EVENT_ART[ev.id];
    const inv = ev.invitation && ev.invitation[d.slice(0, 4)];
    const when = ev.lastDay ? `${fmtDate(d, { day: 'numeric', month: 'long' })} – ${fmtDate(addDays(d, ev.lastDay), { day: 'numeric', month: 'long', year: 'numeric' })}`
      : `${fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · ${rsvpTime(ev.time)}`;
    storyShare({ img: art.img, credit: L(art.cap), eyebrow: 'Museo Abreu', title: eventTitle(ev), sub: inv ? `Ecce Homo · ${L(inv.sub1)}` : '',
      lines: [when, 'Bávaro, Punta Cana'], link: `${storyHost()}/e/${ev.id}` }, `museo-abreu-${ev.id}.png`, 'ev-status');
  },
  lotStory: el => {
    const lot = AUCTION.lots.find(l => l.id === el.dataset.lot), fin = liveFinale();
    storyShare({ img: lot.img, credit: `Oscar Abreu · ${lotTitle(lot)}`, eyebrow: t('auEyebrow'), title: lotTitle(lot),
      sub: `${t('auLot', { n: lotNumber(lot) })} · ${lotKind(lot)}`,
      lines: [t('auLiveAt', { event: fin.name, date: fmtDate(fin.date, { day: 'numeric', month: 'long', year: 'numeric' }) })],
      link: `${storyHost()}/l/${lot.id}` }, `museo-abreu-${lot.id}.png`, 'share-status');
  },
  bookStory: () => storyShare({ img: 'img/time-on-my-face.jpg', credit: `Oscar Abreu · ${L(workById('time-on-my-face').title)}`, eyebrow: 'Oscar Abreu',
    title: 'Ecce Homo', sub: t('bookSub'), lines: [t('bookSub2')], link: `${storyHost()}/b` }, 'museo-abreu-ecce-homo.png', 'share-status'),
});

// The button sits next to each Share button (events, lots, the book).
{
  const addBtn = (html, share, story) => html.replace(share, share + story);
  const ev = pageEvent;
  pageEvent = id => {
    const html = ev(id), btn = `<button class="btn" data-action="evShare" data-id="${id}">${t('evShare')}</button>`;
    return addBtn(html, btn, `<button class="btn" data-action="evStory" data-id="${id}">${t('igBtn')}</button>`);
  };
  EXTRA_ROUTES.evento = pageEvent;
  const shop = pageShop;
  pageShop = () => addBtn(shop(), `<button class="btn small" data-action="bookShare">${t('evShare')}</button>`, ` <button class="btn small" data-action="bookStory">${t('igBtn')}</button>`);
  EXTRA_ROUTES.tienda = pageShop;
  const auction = pageAuction;
  pageAuction = id => {
    const html = auction(id);
    return id ? addBtn(html, `<button class="btn" data-action="lotShare" data-lot="${id}">${t('evShare')}</button>`, `<button class="btn" data-action="lotStory" data-lot="${id}">${t('igBtn')}</button>`) : html;
  };
  EXTRA_ROUTES.subasta = pageAuction;
}
