// The book on a screen (#/presentacion/<edition>): a full-screen slideshow for presenting Fundamentos del
// Psico-Expresionismo on a projector or TV — the cover, the edition, the book's question, its four parts, three
// passages in Oscar Abreu's own words (found by their text in the free sample, never written here), the event,
// and a QR code that opens the book on the audience's phones. Arrows, a tap on either half of the screen, or a
// swipe move between slides; F or the button fills the screen; Esc leaves it.

let prI = 0;
const prSentence = (text, pick) => (String(text).match(/[^.!?¿¡]*[¿¡]?[^.!?]*[.!?]+/g) || [text]).map(s => s.trim()).find(pick) || '';
function prSlides(l) {
  const e = FUND_EDITIONS[l], s = e.sample, para = (sec, rx) => (s[sec] || []).find(b => b[0] === 'p' && rx.test(b[1]));
  const q = (sec, rx) => { const b = para(sec, rx); return b ? prSentence(b[1], x => rx.test(x)) : ''; };
  const ev = typeof ANNUAL_EVENTS !== 'undefined' && ANNUAL_EVENTS.find(x => x.id === 'uasd-psico');
  const url = `${location.host}/fundamentos/${l}`;
  const parts = []; e.toc.forEach(x => { if (!x.part) return; const g = parts.at(-1); if (g && g.part === x.part) g.items.push(x.title); else parts.push({ part: x.part, items: [x.title] }); });
  const quote = (text, img) => text ? `<section class="pr-slide pr-quote" style="--pr-img:url('${img}')"><blockquote lang="${l}">“${esc(text)}”</blockquote><p class="pr-cite">— Oscar Abreu · <i lang="${l}">${esc(e.title)}</i></p></section>` : '';
  return [
    `<section class="pr-slide pr-cover"><div class="pr-book">${fuCover(l)}</div><div><p class="pr-kicker">${t('evBookLaunch')}</p><h1 lang="${l}">${esc(e.title)}</h1><p class="pr-sub" lang="${l}">${esc(e.subtitle)}</p><p class="pr-author">Oscar Abreu</p></div></section>`,
    e.collector ? `<section class="pr-slide pr-text"><p class="pr-kicker" lang="${l}">${esc(e.credits[0])}</p><p class="pr-big" lang="${l}">${esc(e.collector)}</p></section>` : '',
    quote(q('s0', /^¿|\?$/), 'img/fundamentos-cover-art.jpg'),
    `<section class="pr-slide pr-parts"><h2 lang="${l}">${esc(e.title)}</h2><ol>${parts.map(g => `<li><span class="pr-num" lang="${l}">${esc(g.part.split(' · ')[0])}</span><strong lang="${l}">${esc(g.part.split(' · ')[1] || g.part)}</strong><span class="pr-ch" lang="${l}">${g.items.map(esc).join(' · ')}</span></li>`).join('')}</ol></section>`,
    quote(q('s1', /antes de saber formularlas|before (I )?knew how to/i), PAINTINGS[8].img),
    quote(q('s2', /nació antes de que yo pudiera nombrarlo/i), PAINTINGS[5].img),
    quote(q('s1', /Una voz propia/i), PAINTINGS[22].img),
    ev ? `<section class="pr-slide pr-text"><p class="pr-kicker">${esc(L(ev.name))}</p><p class="pr-big">${esc(L(ev.sub))}</p><p class="pr-line">${fmtDate(eventDate(ev))} · ${rsvpTime(ev.time)} · ${esc(L(ev.place))}</p><p class="pr-line">${t('evAnalysis')} M.A. Albacelis Acosta · M.A. Juan Elías Rodríguez Morel</p></section>` : '',
    `<section class="pr-slide pr-qr"><div class="pr-qr-code" data-qr="https://${url}" role="img" aria-label="QR · ${esc(url)}"></div><div><p class="pr-kicker">${typeof fuOpen === 'function' && fuOpen() ? t('fuOpenNote', { date: fuOpenDate() }) : t('readSample')}</p><p class="pr-big">${typeof fuOpen === 'function' && fuOpen() ? t('fuReadAll') : t('readSample')}</p><p class="pr-url">${esc(url)}</p></div></section>`,
  ].filter(Boolean);
}
function pagePresent(lArg) {
  const l = FUND_EDITIONS[lArg] ? lArg : 'es', slides = prSlides(l);
  prI = Math.max(0, Math.min(prI, slides.length - 1));
  return `<div class="pr" id="pr" data-l="${l}" role="region" aria-roledescription="carousel" aria-label="${esc(FUND_EDITIONS[l].title)}">
    <div class="pr-stage">${slides.map((x, i) => x.replace('<section class="pr-slide', `<section aria-hidden="${i !== prI}" data-i="${i}" class="pr-slide${i === prI ? ' on' : ''}`)).join('')}</div>
    <div class="pr-bar">
      <a class="pr-btn" href="#/fundamentos/${l}" aria-label="${esc(t('vwClose'))}">×</a>
      <button type="button" class="pr-btn" data-action="prGo" data-d="-1" aria-label="${esc(t('vwPrev'))}">‹</button>
      <span class="pr-count" aria-live="polite">${prI + 1} / ${slides.length}</span>
      <button type="button" class="pr-btn" data-action="prGo" data-d="1" aria-label="${esc(t('vwNext'))}">›</button>
      <button type="button" class="pr-btn pr-full" data-action="prFull" aria-label="${esc(t('vwOpen'))}">⤢</button>
    </div>
  </div>`;
}
function prShow(i) {
  const all = document.querySelectorAll('#pr .pr-slide'); if (!all.length) return;
  prI = (i + all.length) % all.length;
  all.forEach((s, k) => { s.classList.toggle('on', k === prI); s.setAttribute('aria-hidden', String(k !== prI)); });
  const c = document.querySelector('#pr .pr-count'); if (c) c.textContent = `${prI + 1} / ${all.length}`;
}
EXTRA_ACTIONS.prGo = el => prShow(prI + Number(el.dataset.d));
EXTRA_ACTIONS.prFull = () => { const el = document.documentElement; if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen().catch(() => {}); };
EXTRA_ROUTES.presentacion = pagePresent;
if (typeof ROUTE_SECTION !== 'undefined') ROUTE_SECTION.presentacion = 'biblioteca';
document.addEventListener('keydown', e => {
  if (!document.getElementById('pr') || e.target.matches('input, select, textarea')) return;
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); prShow(prI + 1); }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prShow(prI - 1); }
  if (e.key === 'f' || e.key === 'F') EXTRA_ACTIONS.prFull();
});
// A tap on the right or left of a slide moves on or back; a sideways swipe too.
{
  let x0 = null;
  document.addEventListener('pointerdown', e => { if (e.target.closest && e.target.closest('.pr-stage')) x0 = e.clientX; });
  document.addEventListener('pointerup', e => {
    if (x0 === null || !e.target.closest || !e.target.closest('.pr-stage')) { x0 = null; return; }
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) prShow(prI + (dx < 0 ? 1 : -1));
    else prShow(prI + (e.clientX > innerWidth / 2 ? 1 : -1));
  });
}
