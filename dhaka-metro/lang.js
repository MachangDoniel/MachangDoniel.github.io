// English/Bangla toggle. The app opens pages with #bn for Bangla.
(function () {
  var stored = null;
  try { stored = localStorage.getItem('lang'); } catch (e) {}
  var lang = location.hash === '#bn' ? 'bn' : location.hash === '#en' ? 'en' : stored || 'en';

  function apply(l) {
    document.body.classList.toggle('bn', l === 'bn');
    document.documentElement.lang = l;
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === l));
    });
    try { localStorage.setItem('lang', l); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.setLang); });
    });
    apply(lang);
  });
})();
