// Wexford Saunas — shared site script
// Loaded on every page. Each block checks the element exists before wiring up,
// so this same file works on pages that don't have that element (e.g. no hero on contact.html).

document.addEventListener('DOMContentLoaded', () => {

  // Sticky nav: adds a background/shadow once you scroll down
  const nav = document.getElementById('nav');
  const heroImg = document.getElementById('hero-img');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    if (heroImg) heroImg.style.transform = 'translateY(' + (window.scrollY * 0.12) + 'px)';
  });

  // Fade-and-rise animation for elements marked data-reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  // "Saunas" dropdown in the nav
  const ddWrap = document.getElementById('nav-dropdown');
  const ddToggle = document.getElementById('nav-dropdown-toggle');
  if (ddWrap && ddToggle) {
    ddToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      ddWrap.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!ddWrap.contains(e.target)) ddWrap.classList.remove('open');
    });
  }

  // Product gallery thumbnails (product pages only)
  const thumbs = document.getElementById('gallery-thumbs');
  const galMain = document.getElementById('gal-main');
  if (thumbs && galMain) {
    thumbs.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      galMain.src = btn.dataset.src;
      thumbs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  }

  // Contact form (contact.html only) — demo success message, no real backend yet
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('success-msg');
      if (msg) msg.style.display = 'block';
      form.reset();
    });
  }

});
