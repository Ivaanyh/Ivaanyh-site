/**
 * IVAANYH — nav.js v2
 * Navigation scroll · Menu mobile · Vidéos · Lightbox
 */
(function () {
  'use strict';

  /* ---- Nav scroll ---- */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Menu mobile ---- */
  const toggle  = document.getElementById('nav-toggle');
  const menu    = document.getElementById('nav-menu');
  const overlay = document.getElementById('nav-overlay');

  function openMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    overlay && overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    overlay && overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle && toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  overlay && overlay.addEventListener('click', closeMenu);
  menu && menu.querySelectorAll('.nav-link, .nav-cta').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ---- Vidéos (façade : iframe chargé au clic) ---- */
  document.querySelectorAll('.video-thumb').forEach(thumb => {
    const card   = thumb.closest('.video-card');
    const frame  = card && card.querySelector('.video-frame');
    const url    = thumb.dataset.url;
    const title  = thumb.dataset.title || 'Ivaanyh — vidéo';

    if (!frame || !url) return;

    thumb.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = url + '?autoplay=1&rel=0';
      iframe.title = title;
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      frame.appendChild(iframe);
      frame.classList.add('on');
      thumb.style.display = 'none';
    });

    /* Accessibilité : Entrée/Espace sur le thumb */
    thumb.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); thumb.click(); }
    });
  });

  /* ---- Lightbox photos ---- */
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');

  function openLb(src, alt) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lb.focus();
  }
  function closeLb() {
    if (!lb) return;
    lb.classList.remove('open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.g-item[data-src]').forEach(item => {
    item.addEventListener('click', () => openLb(item.dataset.src, item.dataset.alt));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(item.dataset.src, item.dataset.alt); }
    });
  });

  lbClose && lbClose.addEventListener('click', closeLb);
  lb && lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb && lb.classList.contains('open')) closeLb(); });

})();
