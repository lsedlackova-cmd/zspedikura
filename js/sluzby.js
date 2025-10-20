// sluzby.js — načte HTML fragment a vloží jej do stránky + obsluha "Objednat"
(function () {
  fetch('html/sluzby.html')
    .then(r => r.text())
    .then(html => {
      const placeholder = document.getElementById('sluzby');
      if (placeholder) {
        placeholder.outerHTML = html;
      } else {
        (document.getElementById('main') || document.body)
          .insertAdjacentHTML('beforeend', html);
      }
      initOrderMenus();
    })
    .catch(console.error);

  function initOrderMenus() {
    const orders = document.querySelectorAll('.order');
    const toggles = document.querySelectorAll('.order-toggle');

    function closeAll(except) {
      orders.forEach(o => {
        if (o !== except) {
          o.classList.remove('open');
          o.querySelector('.order-toggle')?.setAttribute('aria-expanded', 'false');
        }
      });
      document.querySelectorAll('.service-card.order-open')
        .forEach(c => c.classList.remove('order-open'));
    }

    toggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const wrap = btn.closest('.order');
        const card = btn.closest('.service-card');
        const isOpenNow = wrap?.classList.toggle('open');

        btn.setAttribute('aria-expanded', isOpenNow ? 'true' : 'false');
        closeAll(isOpenNow ? wrap : null);

        if (isOpenNow) {
          card?.classList.add('order-open');
          // posuň tlačítko do zorného pole (nejbližší pozice)
          btn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }

        e.stopPropagation();
      });
    });

    // klik mimo zavře
    document.addEventListener('click', () => closeAll(null));

    // ESC zavře
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll(null);
    });
  }
})();


