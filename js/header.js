// header.js — načtení hlavičky a chování menu (upraveno pro přesný scroll na mobilu)
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
      if (isOpen) nav.scrollTop = 0;
    });

    // ===== Toggle submenu =====
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

    // ===== Klik na odkazy: přesný scroll s kompenzací výšky headeru (jen hash) =====
    root.querySelectorAll('a.nav-link, a.dropdown-link').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href') || '';
        if (href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const headerH = document.querySelector('.site-header')?.offsetHeight || 96;
            const y = target.getBoundingClientRect().top + window.pageYOffset - headerH;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
          closeMobileMenu();
        } else {
          closeMobileMenu();
        }
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












