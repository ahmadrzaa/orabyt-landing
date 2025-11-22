document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.nav');

  // keep CSS var in sync with actual header height
  const setNavHeight = () => {
    if (!header) return;
    document.documentElement.style.setProperty('--nav-h', header.offsetHeight + 'px');
  };
  setNavHeight();
  window.addEventListener('resize', setNavHeight);
  window.addEventListener('orientationchange', setNavHeight);

  // ---------- DESKTOP DROPDOWN ----------
  const groups = document.querySelectorAll('.has-dd');

  const closeAll = () => {
    groups.forEach(g => {
      g.classList.remove('open');
      const btn = g.querySelector('.menu__btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  };

  groups.forEach(g => {
    const btn = g.querySelector('.menu__btn');
    const panel = g.querySelector('.dd');

    const setOpen = (v) => {
      g.classList.toggle('open', v);
      if (btn) btn.setAttribute('aria-expanded', String(v));
    };

    btn && btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = g.classList.contains('open');
      closeAll();
      setOpen(!isOpen);
    });

    panel && panel.addEventListener('mouseenter', () => setOpen(true));
    panel && panel.addEventListener('mouseleave', () => setOpen(false));
  });

  document.addEventListener('click', (e) => {
    if (header && !header.contains(e.target)) closeAll();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  window.addEventListener('scroll', () => closeAll(), { passive: true });

  // ---------- MOBILE DRAWER ----------
  const burger  = document.querySelector('.burger');
  const drawer  = document.getElementById('drawer');
  const panel   = drawer?.querySelector('.drawer__panel');
  const closeBtn = drawer?.querySelector('.drawer__close');

  const setDrawer = (v) => {
    if (!drawer) return;
    drawer.classList.toggle('open', v);
    drawer.setAttribute('aria-hidden', String(!v));
    if (burger) burger.setAttribute('aria-expanded', String(v));
    document.body.style.overflow = v ? 'hidden' : '';
    if (v) closeAll();
  };

  burger && burger.addEventListener('click', () => setDrawer(true));
  closeBtn && closeBtn.addEventListener('click', () => setDrawer(false));

  drawer && drawer.addEventListener('click', (e) => {
    if (e.target === drawer) setDrawer(false);
  });

  // close drawer when any link clicked
  panel && panel.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setDrawer(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setDrawer(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setDrawer(false);
  });
});
