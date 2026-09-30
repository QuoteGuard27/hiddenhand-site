/* ==========================================================================
   SITE CONFIG — change the business name and placeholders HERE (one place).
   --------------------------------------------------------------------------
   name          Shown in every element marked data-brand, the page title,
                 the meta description and "{brand}" aria-labels.
   domain        Candidate domain (NOT bought yet). Not shown on the page;
                 kept here only so it's easy to find later.
   bookingUrl    Leave '' until you have a real booking link (e.g. Calendly).
   contactEmail  Leave '' until you have a real address.
   ========================================================================== */
var SITE_CONFIG = {
  name: 'Hidden Hand',
  domain: 'hiddenhand.com.au', // placeholder / candidate only
  bookingUrl: '',
  contactEmail: ''
};

(function applyConfig(cfg) {
  var FALLBACK = 'Hidden Hand'; // must match the static text in index.html
  var name = cfg.name || FALLBACK;
  var swap = function (s) { return s.split(FALLBACK).join(name); };

  // Brand name everywhere
  document.querySelectorAll('[data-brand]').forEach(function (el) { el.textContent = name; });
  document.querySelectorAll('[data-brand-aria]').forEach(function (el) {
    el.setAttribute('aria-label', el.getAttribute('data-brand-aria').replace('{brand}', name));
  });
  document.title = swap(document.title);
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', swap(desc.getAttribute('content')));

  // Booking link (placeholder until set)
  if (cfg.bookingUrl) {
    document.querySelectorAll('[data-booking]').forEach(function (a) {
      a.setAttribute('href', cfg.bookingUrl);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
    document.querySelectorAll('[data-booking-label]').forEach(function (a) { a.textContent = 'Book a setup call'; });
  }

  // Contact email (placeholder until set)
  if (cfg.contactEmail) {
    document.querySelectorAll('[data-contact-email]').forEach(function (a) {
      a.setAttribute('href', 'mailto:' + cfg.contactEmail);
      a.textContent = cfg.contactEmail;
    });
  }

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})(SITE_CONFIG);

// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }
  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', function (mq) {
    if (mq.matches) setOpen(false);
  });
})();
