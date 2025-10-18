// Vloží footer a nastaví aktuální rok
(function () {
  function initFooter(root){
    const y = root.querySelector('#footer-year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  fetch('html/footer.html')
    .then(r => r.text())
    .then(html => {
      const mount = document.getElementById('footer');
      if (mount){
        mount.innerHTML = html;
        initFooter(mount);
      }
    })
    .catch(console.error);
})();



















