// Every page of the app has a real address (/subasta/sajoma, /shop, /evento/uasd-psico…), so a link shared from
// the address bar shows that page in WhatsApp, Instagram or Messages: api/page.js serves each address with its
// own title, description and picture. Inside the app the pages still change by "#/…" links; after each page the
// address bar is set to the page's own address (app.js, route). The main pages keep their English addresses
// from seo/paths.json (kept in step with it here); every other page's address is its route.
const ROUTE_PATHS = {"oscar-abreu": "artista", "psycho-expressionism": "psico", "events": "eventos", "events/anniversary": "evento/anniversary", "events/group-exhibition": "evento/group-exhibition", "art-gabangi": "gabangi", "visit": "visita", "membership": "membresia", "books/ecce-homo": "biblioteca", "books/fundamentos": "fundamentos", "exhibitions": "exposiciones", "manifestos": "manifiestos", "paintings": "pinturas", "collectors-circle": "coleccion", "shop": "tienda", "press": "prensa", "contact": "contacto"};
const ROUTE_PRETTY = Object.fromEntries(Object.entries(ROUTE_PATHS).map(([p, r]) => [r, p]));
// The page being shown: from "#/…" while a link has just been followed, else from the address itself.
function routeOf() {
  if (/^#\//.test(location.hash)) return location.hash.slice(2);
  const p = decodeURIComponent(location.pathname).replace(/^\/+|\/+$/g, '');
  if (!p || p === 'index.html') return window.SEO_ROUTE || '';
  return ROUTE_PATHS[p] ?? p;
}
const routeHash = () => '#/' + routeOf();
// The address for a route, in the visitor's language (?lang=, so the link's preview is in it too).
function routeURL(r, l) {
  const q = new URLSearchParams(location.search);
  if (l && l !== 'en') q.set('lang', l); else q.delete('lang');
  const s = q.toString();
  return '/' + (ROUTE_PRETTY[r] ?? r) + (s ? '?' + s : '');
}
// The page's base is "/", so a "#/…" link would leave a page with its own address and load the site again: links
// to "#…" stay on this page instead (a new tab still opens the link as it is). "#main" (the skip link) and other
// "#id" links move to that part of the page.
document.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
  const href = a.getAttribute('href');
  e.preventDefault();
  if (href.startsWith('#/')) { if (location.hash === href) window.dispatchEvent(new HashChangeEvent('hashchange')); else location.hash = href; return; }
  const el = href.length > 1 && document.getElementById(href.slice(1));
  if (el) { if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1'); el.focus(); el.scrollIntoView(); }
});
