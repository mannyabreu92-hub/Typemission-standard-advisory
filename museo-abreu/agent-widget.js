// Museo Abreu agents: chat widget (guide, booking concierge, shop & collectors).
// Add after app.js in index.html:  <script src="agent-widget.js" defer></script>
// Open from anywhere:  MuseoAgent.open('concierge')  ·  <a href="#" data-agent="sales">…</a>
(function () {
  if (window.MuseoAgent) return;
  const ENDPOINT = window.MUSEO_AGENT_ENDPOINT || '/api/agent';
  const KEY = 'ma-agent-v1';

  const TXT = {
    es: { open: 'Asistente del museo', title: 'Museo Abreu', sub: 'Asistente', guide: 'Guía', concierge: 'Reservar', sales: 'Tienda y colección', ph: 'Escriba su pregunta…', send: 'Enviar', reset: 'Nueva conversación', close: 'Cerrar', err: 'No pudimos responder ahora. Escríbanos por WhatsApp.', checkout: 'Comprar en línea', pay: 'Pagar en línea', whatsapp: 'Continuar por WhatsApp', note: 'Asistente con IA. El equipo del museo confirma reservas y precios.',
      hello: { guide: 'Bienvenido al Museo Abreu. Puedo contarle sobre Oscar Abreu, el Psico-Expresionismo y sus obras.', concierge: 'Le ayudo a elegir y reservar su VIP Tour, una clase o un evento. ¿Cuántas personas vienen y en qué fechas está en Punta Cana?', sales: 'Puedo ayudarle con el libro Ecce Homo, la membresía Pro o una obra original a través del Círculo de Coleccionistas.' },
      chips: { guide: ['¿Qué es el Psico-Expresionismo?', '¿Quién es Oscar Abreu?'], concierge: ['Quiero reservar el VIP Tour', '¿Hay tour en inglés este sábado?'], sales: ['Quiero el libro en español', 'Me interesa una obra original'] } },
    en: { open: 'Museum assistant', title: 'Museo Abreu', sub: 'Assistant', guide: 'Guide', concierge: 'Book', sales: 'Shop & collect', ph: 'Type your question…', send: 'Send', reset: 'New conversation', close: 'Close', err: 'We could not reply right now. Please write to us on WhatsApp.', checkout: 'Buy online', pay: 'Pay online', whatsapp: 'Continue on WhatsApp', note: 'AI assistant. The museum team confirms bookings and prices.',
      hello: { guide: 'Welcome to Museo Abreu. I can tell you about Oscar Abreu, Psycho-Expressionism and his works.', concierge: 'I can help you choose and book a VIP Tour, a class or an event. How many of you are coming, and when are you in Punta Cana?', sales: 'I can help with the book Ecce Homo, Pro membership, or an original work through the Collectors’ Circle.' },
      chips: { guide: ['What is Psycho-Expressionism?', 'Who is Oscar Abreu?'], concierge: ['Book the VIP Tour', 'Is there an English tour this Saturday?'], sales: ['I want the book in English', 'I’m interested in an original work'] } },
    fr: { open: 'Assistant du musée', title: 'Museo Abreu', sub: 'Assistant', guide: 'Guide', concierge: 'Réserver', sales: 'Boutique et collection', ph: 'Écrivez votre question…', send: 'Envoyer', reset: 'Nouvelle conversation', close: 'Fermer', err: 'Nous ne pouvons pas répondre pour le moment. Écrivez-nous sur WhatsApp.', checkout: 'Acheter en ligne', pay: 'Payer en ligne', whatsapp: 'Continuer sur WhatsApp', note: 'Assistant IA. L’équipe du musée confirme réservations et prix.',
      hello: { guide: 'Bienvenue au Museo Abreu. Je peux vous parler d’Oscar Abreu, du Psycho-Expressionnisme et de ses œuvres.', concierge: 'Je vous aide à choisir et réserver un VIP Tour, un cours ou un événement. Combien serez-vous, et à quelles dates êtes-vous à Punta Cana ?', sales: 'Je peux vous aider pour le livre Ecce Homo, l’adhésion Pro ou une œuvre originale via le Cercle des collectionneurs.' },
      chips: { guide: ['Qu’est-ce que le Psycho-Expressionnisme ?', 'Qui est Oscar Abreu ?'], concierge: ['Réserver le VIP Tour', 'Y a-t-il une visite en français ?'], sales: ['Je veux le livre en français', 'Une œuvre originale m’intéresse'] } },
  };
  const curLang = () => {
    const sel = document.getElementById('lang-select');
    return (typeof lang === 'string' && lang) || (sel && sel.value) || document.documentElement.lang || 'es';
  };
  const T = () => TXT[curLang()] || TXT.en;

  // State survives page changes in the same tab.
  let S = { agent: 'guide', messages: [], open: false };
  try { Object.assign(S, JSON.parse(sessionStorage.getItem(KEY)) || {}); } catch (e) {}
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify({ ...S, messages: S.messages.slice(-30) })); } catch (e) {} };

  const css = `
  .ma-fab{position:fixed;inset-inline-end:16px;bottom:calc(84px + env(safe-area-inset-bottom));z-index:80;display:flex;align-items:center;gap:.5rem;background:var(--ink,#16120f);color:var(--paper,#f6f1e9);border:0;border-radius:999px;padding:.7rem 1.05rem;font:500 .9rem var(--sans,'Work Sans',system-ui,sans-serif);box-shadow:0 10px 30px rgba(22,18,15,.25);cursor:pointer}
  .ma-fab:hover{background:#2a231d}.ma-fab svg{width:18px;height:18px}
  @media(min-width:900px){.ma-fab{bottom:24px}}
  .ma-panel{position:fixed;inset-inline-end:16px;bottom:calc(84px + env(safe-area-inset-bottom));z-index:81;width:min(400px,calc(100vw - 32px));height:min(620px,calc(100vh - 120px));display:none;flex-direction:column;background:var(--card,#fffdf9);color:var(--ink,#16120f);border:1px solid var(--line,rgba(22,18,15,.14));border-radius:var(--radius,14px);box-shadow:0 24px 60px rgba(22,18,15,.28);overflow:hidden;font-family:var(--sans,'Work Sans',system-ui,sans-serif)}
  @media(min-width:900px){.ma-panel{bottom:24px}}
  .ma-panel.on{display:flex}
  .ma-head{display:flex;align-items:center;justify-content:space-between;padding:.85rem 1rem;background:var(--ink,#16120f);color:var(--paper,#f6f1e9)}
  .ma-head b{font:600 1.25rem/1 var(--serif,'Cormorant Garamond',Georgia,serif)}.ma-head small{display:block;font-size:.72rem;opacity:.7;letter-spacing:.06em;text-transform:uppercase;margin-top:2px}
  .ma-head button{background:none;border:0;color:inherit;cursor:pointer;font-size:.8rem;opacity:.85;padding:.3rem .4rem}.ma-head button:hover{opacity:1}
  .ma-tabs{display:flex;gap:.35rem;padding:.6rem .75rem;border-bottom:1px solid var(--line,rgba(22,18,15,.14));background:var(--paper,#f6f1e9)}
  .ma-tab{flex:1;border:1px solid var(--line,rgba(22,18,15,.14));background:transparent;border-radius:999px;padding:.38rem .5rem;font-size:.8rem;cursor:pointer;color:var(--ink-2,#4a423b);white-space:nowrap}
  .ma-tab[aria-selected=true]{background:var(--ink,#16120f);color:var(--paper,#f6f1e9);border-color:var(--ink,#16120f)}
  .ma-log{flex:1;overflow-y:auto;padding:1rem .9rem;display:flex;flex-direction:column;gap:.7rem}
  .ma-msg{max-width:88%;padding:.6rem .8rem;border-radius:12px;font-size:.92rem;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere}
  .ma-msg.bot{background:var(--paper-2,#ece4d6);align-self:flex-start;border-end-start-radius:4px}
  .ma-msg.me{background:var(--ink,#16120f);color:var(--paper,#f6f1e9);align-self:flex-end;border-end-end-radius:4px}
  .ma-msg a{color:var(--accent,#c2410c);font-weight:500}.ma-msg.me a{color:#f3d9b9}
  .ma-acts{display:flex;flex-wrap:wrap;gap:.4rem;align-self:flex-start}
  .ma-act{display:inline-block;text-decoration:none;font-size:.82rem;font-weight:500;padding:.45rem .8rem;border-radius:999px;background:var(--accent,#c2410c);color:#fff}
  .ma-act.wa{background:#11652f}
  .ma-chips{display:flex;flex-wrap:wrap;gap:.4rem}
  .ma-chip{border:1px solid var(--line,rgba(22,18,15,.14));background:var(--card,#fffdf9);border-radius:999px;padding:.35rem .7rem;font-size:.8rem;cursor:pointer;color:var(--ink-2,#4a423b)}
  .ma-chip:hover{border-color:var(--ink,#16120f)}
  .ma-typing{align-self:flex-start;color:var(--ink-3,#6b6159);font-size:.85rem;padding:.2rem .3rem}
  .ma-typing i{display:inline-block;width:6px;height:6px;margin:0 2px;border-radius:50%;background:currentColor;animation:ma-b 1s infinite}
  .ma-typing i:nth-child(2){animation-delay:.15s}.ma-typing i:nth-child(3){animation-delay:.3s}
  @keyframes ma-b{0%,80%,100%{opacity:.25}40%{opacity:1}}
  .ma-form{display:flex;gap:.5rem;padding:.7rem;border-top:1px solid var(--line,rgba(22,18,15,.14))}
  .ma-form textarea{flex:1;resize:none;border:1px solid var(--line,rgba(22,18,15,.14));border-radius:10px;padding:.55rem .7rem;font-size:.92rem;max-height:120px;background:#fff}
  .ma-form button{border:0;border-radius:10px;padding:0 1rem;background:var(--accent,#c2410c);color:#fff;font-weight:600;cursor:pointer}
  .ma-form button:disabled{opacity:.5;cursor:default}
  .ma-note{font-size:.7rem;color:var(--ink-3,#6b6159);text-align:center;padding:0 .8rem .55rem}
  @media(max-width:520px){.ma-panel{inset-inline-end:8px;width:calc(100vw - 16px);height:calc(100vh - 110px)}}
  @media(prefers-reduced-motion:reduce){.ma-typing i{animation:none}}`;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  // Minimal safe Markdown: [text](https://…), **bold**, bare URLs.
  const md = s => esc(s)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (m, t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`)
    .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, (m, p, u) => `${p}<a href="${u}" target="_blank" rel="noopener">${u.length > 42 ? u.slice(0, 40) + '…' : u}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  let root, log, ta, btn, busy = false;

  function build() {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    root = document.createElement('div');
    root.innerHTML = `
      <button class="ma-fab" type="button" aria-haspopup="dialog"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/></svg><span class="ma-fab-t"></span></button>
      <section class="ma-panel" role="dialog" aria-modal="false" aria-labelledby="ma-title">
        <header class="ma-head"><div><b id="ma-title"></b><small class="ma-sub"></small></div>
          <div><button type="button" class="ma-reset"></button><button type="button" class="ma-close" aria-label="">✕</button></div></header>
        <div class="ma-tabs" role="tablist">${['guide', 'concierge', 'sales'].map(a => `<button class="ma-tab" role="tab" data-a="${a}"></button>`).join('')}</div>
        <div class="ma-log" aria-live="polite"></div>
        <form class="ma-form"><textarea rows="1" maxlength="2000"></textarea><button type="submit"></button></form>
        <p class="ma-note"></p>
      </section>`;
    document.body.appendChild(root);
    log = root.querySelector('.ma-log'); ta = root.querySelector('textarea'); btn = root.querySelector('.ma-form button');
    root.querySelector('.ma-fab').onclick = () => toggle(true);
    root.querySelector('.ma-close').onclick = () => toggle(false);
    root.querySelector('.ma-reset').onclick = () => { S.messages = []; save(); render(); ta.focus(); };
    root.querySelectorAll('.ma-tab').forEach(b => b.onclick = () => { S.agent = b.dataset.a; save(); render(); ta.focus(); });
    root.querySelector('form').onsubmit = e => { e.preventDefault(); send(ta.value); };
    ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(ta.value); } });
    ta.addEventListener('input', () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && S.open) toggle(false); });
    document.addEventListener('click', e => { const a = e.target.closest('[data-agent]'); if (a && !root.contains(a)) { e.preventDefault(); open(a.dataset.agent, a.dataset.agentAsk); } });
    const sel = document.getElementById('lang-select'); if (sel) sel.addEventListener('change', () => setTimeout(render, 0));
    render();
  }

  function render() {
    const t = T();
    root.dir = curLang() === 'ar' ? 'rtl' : 'ltr';
    root.querySelector('.ma-fab-t').textContent = t.open;
    root.querySelector('#ma-title').textContent = t.title;
    root.querySelector('.ma-sub').textContent = t.sub + ' · ' + t[S.agent];
    root.querySelector('.ma-reset').textContent = t.reset;
    root.querySelector('.ma-close').setAttribute('aria-label', t.close);
    root.querySelector('.ma-note').textContent = t.note;
    ta.placeholder = t.ph; btn.textContent = t.send;
    root.querySelectorAll('.ma-tab').forEach(b => { b.textContent = t[b.dataset.a]; b.setAttribute('aria-selected', b.dataset.a === S.agent); });
    root.querySelector('.ma-panel').classList.toggle('on', S.open);
    root.querySelector('.ma-fab').style.display = S.open ? 'none' : '';
    let h = `<div class="ma-msg bot">${md(t.hello[S.agent])}</div>`;
    if (!S.messages.length) h += `<div class="ma-chips">${t.chips[S.agent].map(c => `<button type="button" class="ma-chip">${esc(c)}</button>`).join('')}</div>`;
    for (const m of S.messages) {
      h += `<div class="ma-msg ${m.role === 'user' ? 'me' : 'bot'}">${md(m.content)}</div>`;
      if (m.actions && m.actions.length) h += `<div class="ma-acts">${m.actions.map(a => `<a class="ma-act${a.label === 'whatsapp' ? ' wa' : ''}" href="${esc(a.url)}" target="_blank" rel="noopener">${esc(t[a.label] || a.label)}</a>`).join('')}</div>`;
    }
    if (busy) h += `<div class="ma-typing" aria-label="…"><i></i><i></i><i></i></div>`;
    log.innerHTML = h;
    log.querySelectorAll('.ma-chip').forEach(c => c.onclick = () => send(c.textContent));
    log.scrollTop = log.scrollHeight;
    btn.disabled = busy;
  }

  function toggle(on) {
    S.open = on; save(); render();
    if (on) { ta.focus(); if (typeof trackEvent === 'function') trackEvent('Agent open', { agent: S.agent }); }
  }

  function open(agent, ask) {
    if (['guide', 'concierge', 'sales'].includes(agent)) S.agent = agent;
    toggle(true);
    if (ask) send(ask);
  }

  async function send(text) {
    text = String(text || '').trim();
    if (!text || busy) return;
    ta.value = ''; ta.style.height = 'auto';
    S.messages.push({ role: 'user', content: text });
    busy = true; save(); render();
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent: S.agent, lang: curLang(), messages: S.messages.map(m => ({ role: m.role, content: m.content })) }) });
      const j = await r.json();
      if (!r.ok || !j.reply) throw new Error(j.error || r.status);
      if (j.agent && j.agent !== S.agent) S.agent = j.agent; // a specialist took over
      S.messages.push({ role: 'assistant', content: j.reply, actions: j.actions || [] });
      if (typeof trackEvent === 'function') trackEvent('Agent reply', { agent: j.agent, actions: (j.actions || []).length });
    } catch (e) {
      const wa = 'https://wa.me/18098409588';
      S.messages.push({ role: 'assistant', content: T().err, actions: [{ label: 'whatsapp', url: wa }] });
    }
    busy = false; save(); render();
  }

  window.MuseoAgent = { open, close: () => toggle(false) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
