// Spolehlivé načtení footeru + logování chyb a cache-busting
(function(){
  function mountFooter(html){
    const el = document.getElementById('footer');
    if (!el) return console.warn('[footer] #footer nenalezen v DOMu');
    el.innerHTML = html;
  }

  // cache-buster, aby prohlížeč netahal starý fragment
  const url = `html/footer.html?v=${Date.now()}`;

  fetch(url, { cache: 'no-store' })
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status} při načítání ${url}`);
      return r.text();
    })
    .then(mountFooter)
    .catch(err => {
      console.error('[footer] Chyba načítání fragmentu:', err);
      // Zobrazíme aspoň nouzovou verzi, aby byl text vždy vidět
      mountFooter(`
        <footer class="site-footer">
          <div class="container footer-inner">
            <div class="footer-left">
              <span class="icon" aria-hidden="true">IG</span>
              <span class="icon" aria-hidden="true">FB</span>
            </div>
            <div class="footer-right">
              <div class="rights">© ZS Pedikúra 2025. Všechna práva vyhrazena.</div>
              <div class="made-by">Made by Lucie</div>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="rights">© ZS Pedikúra 2025. Všechna práva vyhrazena.</div>
          </div>
        </footer>
      `);
    });
})();



