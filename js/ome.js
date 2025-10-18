// ome.js — načte sekci O mně a vloží ji do stránky
(function () {
  fetch('html/ome.html')
    .then(r => r.text())
    .then(html => {
      const mount = document.getElementById('ome');
      if (mount) {
        mount.outerHTML = html;
      } else {
        (document.getElementById('main') || document.body)
          .insertAdjacentHTML('beforeend', html);
      }
    })
    .catch(console.error);
})();

