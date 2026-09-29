/* ------------------------------------------------------------------
   CarConnect24 — site-wide settings.

   👉 TO SET THE WHATSAPP NUMBER: change WHATSAPP below to the number in
      international format, digits only, no +, no spaces.
      Example: Belgian number +32 470 12 34 56  ->  '32470123456'
      That one line switches on every WhatsApp button on the site.
   ------------------------------------------------------------------ */
window.SITE = {
  WHATSAPP: '',                       // <-- put the number here
  FACEBOOK: '',                       // full https:// link
  TIKTOK:   '',                       // full https:// link
  EMAIL:    '',                       // shown in the footer
  VAT:      ''                        // BTW / VAT number, shown in the footer
};

/* Build a wa.me link with an optional prefilled message. */
window.waHref = function (msg) {
  var n = (window.SITE.WHATSAPP || '').replace(/\D/g, '');
  if (!n) return '#no-whatsapp';
  return 'https://wa.me/' + n + (msg ? '?text=' + encodeURIComponent(msg) : '');
};

/* Until the number is set, tell the visitor politely instead of a dead link. */
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href="#no-whatsapp"]');
  if (!a) return;
  e.preventDefault();
  alert('WhatsApp is not connected yet.\n\nThe site owner still needs to add the number in site.js.');
});

/* Fill any element that should show a configured value. */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.setAttribute('href', window.waHref(a.getAttribute('data-wa') || ''));
  });
  var map = { FACEBOOK: '[data-fb]', TIKTOK: '[data-tt]' };
  Object.keys(map).forEach(function (k) {
    document.querySelectorAll(map[k]).forEach(function (el) {
      if (window.SITE[k]) el.setAttribute('href', window.SITE[k]);
      else el.style.display = 'none';       // hide rather than link nowhere
    });
  });
  document.querySelectorAll('[data-email]').forEach(function (el) {
    if (window.SITE.EMAIL) { el.textContent = window.SITE.EMAIL; el.setAttribute('href', 'mailto:' + window.SITE.EMAIL); }
    else el.style.display = 'none';
  });
  document.querySelectorAll('[data-vat]').forEach(function (el) {
    if (window.SITE.VAT) el.textContent = window.SITE.VAT; else el.style.display = 'none';
  });
});
