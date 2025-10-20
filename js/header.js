// header.js — načtení hlavičky + Elegant Glass mobilní menu (bez změn na desktopu)
(function () {
  function initHeaderInteractions(root) {
    const hamburger = root.querySelector('.hamburger');
    const nav = root.querySelector('#site-nav');
    const dropdownWrap = root.querySelector('.has-dropdown');
    const dropdownToggle = root.querySelector('.dropdown-toggle');

    const isMobile = () => window.innerWidth <= 767;

    // --- vytvoř "Quick actions" (WhatsApp/Zavolat) jen jednou a jen na mobilu ---
    function ensureQuickCTA() {
      if (!nav || nav.querySelector('.quick-cta')) return;
      const cta = document.createElement('div');
      cta.className = 'quick-cta';
      cta.innerHTML = `
        <a class="chip" href="https://wa.me/420608331380" target="_blank" rel="noopener">WhatsApp</a>
        <a class="chip" href="tel:+420608331380">Zavolat</a>
      `;
      nav.appendChild(cta);
    }

    // --- stav submenu (třída .open na <li.has-dropdown>) ---
    function openDropdown() {
      if (!dropdownWrap) return;
      dropdownWrap.classList.add('open');
      dropdownToggle?.setAttribute('aria-expanded', 'true');
    }
    function closeDropdown() {
      if (!dropdownWrap) return;
      dropdownWrap.classList.remove('open');
      dropdownToggle?.setAttribute('aria-expanded', 'false');
    }
    function toggleDropdown() {
      if (!dropdownWrap) return;
      const isOpen = dropdownWrap.classList.toggle('open');
      dropdownToggle?.setAttribute('aria-expanded', String(isOpen));
      if (nav && isOpen) nav.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function closeMobileMenu() {
      if (!nav) return;
      nav.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      closeDropdown();
      nav.scrollTop = 0;
    }

    // ===== Hamburger toggle (mobil) =====
    hamburger?.addEventListener('click', () => {
      if (!nav) return;
      const isOpen = nav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        ensureQuickCTA();
        nav.scrollTop = 0;
      }
    });

    // ===== Toggle submenu (nezavírá hlavní menu) =====
    dropdownToggle?.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown();
    });

    // ===== Klik mimo header zavře menu i submenu =====
    document.addEventListener('click', (e) => {
      if (!root.contains(e.target)) {
        closeDropdown();
        if (isMobile()) closeMobileMenu();
      }
    });

    // ===== Klik na jakýkoli odkaz zavře mobilní menu =====
    root.querySelectorAll('a.nav-link, a.dropdown-link').forEach((a) => {
      a.addEventListener('click', () => {
        if (isMobile()) closeMobileMenu();
        // volitelně zvýrazni aktivní sekci (mobilní náznak)
        root.querySelectorAll('a.nav-link.is-active').forEach(x => x.classList.remove('is-active'));
        a.classList.add('is-active');
      });
    });

    // ===== Reset při změně velikosti okna =====
    window.addEventListener('resize', () => {
      if (!isMobile()) {
        closeDropdown();
        nav?.classList.remove('open');
        hamburger?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== Načti fragment hlavičky a inicializuj =====
  fetch('html/header.html?v=3') // malé verzování proti cache
    .then((r) => r.text())
    .then((html) => {
      const mount = document.getElementById('header');
      if (mount) {
        mount.innerHTML = html;
        initHeaderInteractions(mount);
      }
    })
    .catch(console.error);
})();













