// footer.js — načtení footeru + rok + (volitelně) URL sociálních sítí
(function () {
  const mount = document.getElementById('footer');
  if (!mount) return;

  fetch('html/footer.html', { cache: 'no-cache' })
    .then(r => r.text())
    .then(html => {
      mount.innerHTML = html;

      // Rok do copyrightu
      const yearEl = mount.querySelector('#footer-year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();

      // (Volitelné) doplň sem své URL profilů:
      // const [insta, fb] = mount.querySelectorAll('.social-link');
      // if (insta) insta.href = 'https://instagram.com/TVŮJ_PROFIL';
      // if (fb)   fb.href   = 'https://facebook.com/TVŮJ_PROFIL';
    })
    .catch(err => console.error('Footer load failed:', err));
})();

















