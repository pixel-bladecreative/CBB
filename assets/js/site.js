/* CBB site: mobile menu + year. Works with or without motion.js. */
(() => {
  const btn = document.querySelector('.nav__menu');
  const drawer = document.getElementById('drawer');
  if (btn && drawer) {
    const set = (open) => {
      drawer.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      drawer.inert = !open;
    };
    drawer.inert = true;
    btn.addEventListener('click', () => set(!drawer.classList.contains('is-open')));
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  }
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
