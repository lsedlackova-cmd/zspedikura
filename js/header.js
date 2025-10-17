// header.js — načtení hlavičky a chování menu (finalní verze)
(function () {
  function initHeaderInteractions(root) {
    const hamburger = root.querySelector('.hamburger');
    const nav = root.querySelector('#site-nav');
    const dropdownToggle = root.querySelector('.dropdown-toggle');
    const dropdown = root.querySelector('.dropdown');

    const isMobile = () => window.innerWidth <= 767;

    const openDropdown = () => {
      if (dropdown) {
        dropdown.style.display = 'block';
        dropdownToggle?.setAttribute('aria-expanded', 'true');
      }
    };

    const closeDropdown = () => {
      if (dropdown) {
        dropdown.style.display = 'none';
        dropdownToggle?.setAttribute('aria-expanded', 'false');
      }
    };

    const toggleDropdown = () => {
      if (!dropdown) return;
      const expanded = dropdownToggle?.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeDropdown();
      } else {
        openDropdown();
        // ⬇️ po otevření submenu posuň menu nahoru, aby bylo vidět i "Domů"
        if (nav) nav.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const closeMobileMenu = () => {
      if (!nav) return;
      nav.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      closeDropdown();
      nav.scrollTop = 0;
    };

    // ===== Hamburger toggle (mobil) =====
    hamburger?.addEventListener('click', () => {
      if (!nav) return;
      const isOpen = nav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
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
        closeMobileMenu();
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
  fetch('html/header.html')
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











