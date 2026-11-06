// Animations de la page : apparitions au défilement, titres mot à mot, chiffres qui défilent,
// cartes qui suivent le curseur, éléments en parallaxe et barre de progression de lecture.
// Tout est désactivé si le visiteur a demandé à réduire les animations.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ---- Titres mot à mot -------------------------------------------------------
// Chaque mot monte depuis sous une ligne invisible ; le texte reste lu d'un bloc par les lecteurs d'écran.
document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
  if (reduced) return;
  const text = el.textContent?.trim() ?? '';
  el.setAttribute('aria-label', text);
  el.innerHTML = text
    .split(/\s+/)
    .map((w, i) => `<span class="w" aria-hidden="true"><span style="--wi:${i}">${w.replace(/</g, '&lt;')}</span></span>`)
    .join(' ');
  el.setAttribute('data-reveal', '');
});

// ---- Apparitions ------------------------------------------------------------
const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (!('IntersectionObserver' in window)) {
  els.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));
}

// ---- Chiffres qui défilent --------------------------------------------------
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
if (!reduced && counters.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? '';
      const t0 = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        const v = Math.round(end * (1 - Math.pow(1 - k, 4)));
        el.textContent = `${v}${suffix}`;
        if (k < 1) requestAnimationFrame(tick);
      };
      el.textContent = `0${suffix}`;
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.6 });
  counters.forEach((c) => io.observe(c));
}

// ---- Cartes qui suivent le curseur -----------------------------------------
if (!reduced && finePointer) {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    let raf = 0;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateZ(0)`;
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    });
  });
}

// ---- Parallaxe et progression de lecture -----------------------------------
const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
const progress = document.querySelector<HTMLElement>('[data-progress]');
if (!reduced && (parallax.length || progress)) {
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const el of parallax) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const speed = Number(el.dataset.parallax) || 0.15;
      const offset = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
    if (progress) {
      const max = document.documentElement.scrollHeight - vh;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    }
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}
