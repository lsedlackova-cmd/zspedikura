// footer.js — vloží footer (bez fetch)
(function () {
  const mount = document.getElementById('footer');
  if (!mount) return;

  mount.innerHTML = `
    <footer class="site-footer" aria-labelledby="footer-title">
      <h2 id="footer-title" class="sr-only">Patička webu</h2>
      <div class="container footer-inner">
        <div class="footer-left">
          <p class="rights">© 2025 ZS Pedikúra — Všechna práva vyhrazena.</p>
          <p class="credit">Made by Lucie</p>
        </div>

        <div class="footer-social" aria-label="Sociální sítě">
          <a class="footer-social-link" href="#" aria-label="Instagram" title="Instagram">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fill="currentColor" d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.6A2.9 2.9 0 1 1 12 9.4a2.9 2.9 0 0 1 0 5.8Zm6-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 2.5c3 0 3.4 0 4.6.1 1.2.1 2 .3 2.7.7.7.4 1.4 1 1.8 1.8.4.7.6 1.5.7 2.7.1 1.2.1 1.6.1 4.6s0 3.4-.1 4.6c-.1 1.2-.3 2-.7 2.7a4.3 4.3 0 0 1-1.8 1.8c-.7.4-1.5.6-2.7.7-1.2.1-1.6.1-4.6.1s-3.4 0-4.6-.1c-1.2-.1-2-.3-2.7-.7a4.3 4.3 0 0 1-1.8-1.8c-.4-.7-.6-1.5-.7-2.7C3 15.4 3 15 3 12s0-3.4.1-4.6c.1-1.2.3-2 .7-2.7.4-.7 1-1.4 1.8-1.8.7-.4 1.5-.6 2.7-.7C8.6 2.5 9 2.5 12 2.5Z"/>
            </svg>
          </a>

          <a class="footer-social-link" href="#" aria-label="Facebook" title="Facebook">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fill="currentColor" d="M13.2 21.5v-7.3h2.4l.4-2.8h-2.8V9.6c0-.8.2-1.3 1.3-1.3h1.5V5.7c-.3 0-1.2-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2.1H8v2.8h2.4v7.4h2.8Z"/>
            </svg>
          </a>

          <a class="footer-social-link" href="https://wa.me/420777111222" target="_blank" aria-label="WhatsApp" title="WhatsApp">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fill="currentColor" d="M16.7 13.5c-.3-.2-1.7-.8-1.9-.9s-.4-.1-.6.2c-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.1-.4-2.1-1.3a7.5 7.5 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.5-.6.2-.4c.1-.1 0-.3 0-.4l-.9-2.3c-.2-.5-.3-.5-.5-.5h-.4a.8.8 0 0 0-.6.3 2.6 2.6 0 0 0-.8 2 4.6 4.6 0 0 0 .9 2.4 9.5 9.5 0 0 0 3.5 3.4c.5.3 1.4.7 2.3.8a3.8 3.8 0 0 0 2.2-.6 2.6 2.6 0 0 0 1.1-1.7c.1-.5 0-.8-.2-.9ZM12 2a10 10 0 0 0-8.6 15.1L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1Z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  `;
})();

























