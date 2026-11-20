// Light or dark: the ☾ / ☀ button in the top bar. Light is the museum's own look and the default; the choice is
// kept on this phone (ma.theme). The page is set before it is drawn by a line in index.html's <head>.
function thApply(dark) {
  document.documentElement.toggleAttribute('data-theme', false);
  if (dark) document.documentElement.setAttribute('data-theme', 'dark');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#121110' : '#16120f');
  const b = document.getElementById('theme-btn');
  if (b) {
    b.setAttribute('aria-pressed', String(dark));
    b.setAttribute('aria-label', t('thDark'));
    b.title = t('thDark');
    // The icon shows what a tap brings: the moon by day, the sun by night (SVG has no .hidden, so the attribute).
    b.querySelector('.th-moon').toggleAttribute('hidden', dark); b.querySelector('.th-sun').toggleAttribute('hidden', !dark);
  }
}
const thIsDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
document.addEventListener('click', e => {
  if (!e.target.closest('#theme-btn')) return;
  const dark = !thIsDark();
  try { localStorage.setItem('ma.theme', dark ? 'dark' : 'light'); } catch (x) {}
  thApply(dark);
});
// The button's label follows the language.
document.getElementById('lang-select')?.addEventListener('change', () => setTimeout(() => thApply(thIsDark()), 0));
addEventListener('DOMContentLoaded', () => thApply(thIsDark()));
