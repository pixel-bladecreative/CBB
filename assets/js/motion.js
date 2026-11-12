/* =========================================================================
   CBB Motion
   Declarative scroll motion via data attributes. Requires GSAP,
   ScrollTrigger, SplitText and Lenis (vendored in assets/vendor).

   data-reveal                 fade + rise when entering view
   data-reveal-group           children with [data-reveal] stagger together
   data-split                  headline lines rise from a mask
   data-parallax="0.12"        image drifts inside its frame (strength 0–0.3)
   data-clip                   media frame opens from inset to full, scrubbed
   data-count="20"             number counts up (data-suffix optional)
   data-horizontal             section pins and its [data-track] scrolls sideways
   data-index-preview          .index-list rows show a cursor-following image
   ========================================================================= */
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ready = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (reduce || !ready) { root.classList.remove('js-motion'); initNav(null); return; }

  gsap.registerPlugin(ScrollTrigger, ...(typeof SplitText !== 'undefined' ? [SplitText] : []));
  const EASE = 'expo.out';

  /* ---- Smooth scroll -------------------------------------------------- */
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -76, duration: 1.4 }); }
      }));
  }

  /* ---- Reveal --------------------------------------------------------- */
  const grouped = new Set();
  document.querySelectorAll('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll('[data-reveal]');
    items.forEach((el) => grouped.add(el));
    gsap.to(items, {
      opacity: 1, y: 0, duration: 1.1, ease: EASE, stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (grouped.has(el)) return;
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1.1, ease: EASE,
      delay: parseFloat(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  /* ---- Split headlines ----------------------------------------------- */
  const splitAll = () => document.querySelectorAll('[data-split]').forEach((el) => {
    gsap.set(el, { opacity: 1 });
    if (typeof SplitText === 'undefined') return;
    SplitText.create(el, {
      type: 'lines', mask: 'lines', linesClass: 'split-line-inner', autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 110, duration: 1.3, ease: EASE, stagger: 0.09,
          delay: parseFloat(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
  });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(splitAll);

  /* ---- Parallax ------------------------------------------------------- */
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const s = parseFloat(el.dataset.parallax || 0.12);
    gsap.set(el, { scale: 1 + s * 1.6 });
    gsap.fromTo(el, { yPercent: -s * 50 }, {
      yPercent: s * 50, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  /* ---- Clip open ------------------------------------------------------ */
  document.querySelectorAll('[data-clip]').forEach((el) => {
    gsap.to(el, {
      clipPath: 'inset(0% 0% 0% 0% round 10px)', ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 25%', scrub: 0.6 },
    });
  });

  /* ---- Counters ------------------------------------------------------- */
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count); const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration: 2, ease: 'power3.out',
      onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  /* ---- Horizontal pinned track --------------------------------------- */
  ScrollTrigger.matchMedia({
    '(min-width: 861px)': () => {
      document.querySelectorAll('[data-horizontal]').forEach((section) => {
        const track = section.querySelector('[data-track]');
        if (!track) return;
        const dist = () => track.scrollWidth - section.clientWidth;
        gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true },
        });
      });
    },
  });

  /* ---- Index preview -------------------------------------------------- */
  document.querySelectorAll('[data-index-preview]').forEach((list) => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const box = document.createElement('div'); box.className = 'index-preview';
    const img = document.createElement('img'); img.alt = ''; box.appendChild(img);
    document.body.appendChild(box);
    const xTo = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3' });
    list.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); });
    list.querySelectorAll('[data-image]').forEach((row) => {
      row.addEventListener('pointerenter', () => {
        img.src = row.dataset.image; box.classList.add('is-on');
        gsap.to(box, { scale: 1, rotate: gsap.utils.random(-3, 3), duration: 0.6, ease: EASE });
      });
      row.addEventListener('pointerleave', () => {
        box.classList.remove('is-on'); gsap.to(box, { scale: 0.85, duration: 0.4 });
      });
    });
  });

  /* ---- Scroll progress ------------------------------------------------ */
  const bar = document.querySelector('.progress');
  if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  initNav(lenis);
  window.CBBMotionReady = true;

  /* ---- Nav: tint after scrolling, hide on the way down --------------- */
  function initNav(lenisInstance) {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 40);
      nav.classList.toggle('is-hidden', y > 400 && y > last);
      last = y;
    };
    (lenisInstance ? lenisInstance.on.bind(lenisInstance, 'scroll') : (fn) => window.addEventListener('scroll', fn, { passive: true }))(onScroll);
    onScroll();
  }
})();
