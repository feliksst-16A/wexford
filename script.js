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

  // Contact form (contact.html only) — submits to Formspree (see form's action="") and shows
  // inline success/error messages without leaving the page.
  const form = document.getElementById('contact-form');
  if (form) {
    const msg = document.getElementById('success-msg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          if (msg) {
            msg.textContent = "Message sent. We'll reply within one business day.";
            msg.style.color = '';
            msg.style.display = 'block';
          }
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        if (msg) {
          msg.textContent = 'Something went wrong sending your message — please email us directly at info@wexfordsaunas.com.';
          msg.style.color = '#a94435';
          msg.style.display = 'block';
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

});
