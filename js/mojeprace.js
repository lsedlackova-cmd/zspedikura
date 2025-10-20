// mojeprace.js — načte HTML fragment a vykreslí karty Před/Po po trojicích
(function () {
  // 1) Načti HTML fragment
  fetch('html/mojeprace.html')
    .then(r => r.text())
    .then(html => {
      const mount = document.getElementById('mojeprace');
      if (mount) {
        mount.outerHTML = html;
        initWorks(); // až po vložení HTML
      } else {
        // fallback
        (document.getElementById('main') || document.body)
          .insertAdjacentHTML('beforeend', html);
        initWorks();
      }
    })
    .catch(console.error);

  // 2) Data — první tři máš reálné, další tři jsou připravené (můžeš si je upravit)
  const PRACE = [
    {
      id: 1,
      imgPred: 'img/mojeprace-1-pred.png',
      imgPo:   'img/mojeprace-1-po.png',
      popis: 'Ošetření ztvrdlé kůže a úprava nehtů.',
      datum: '2025-09-14',
      reference: 'Výsledek je krásný a bez bolesti.',
      klient: 'Jana K.'
    },
    {
      id: 2,
      imgPred: 'img/mojeprace-2-pred.png',
      imgPo:   'img/mojeprace-2-po.png',
      popis: 'Zjemnění popraskaných pat a vyrovnání tvaru nehtů.',
      datum: '2025-09-20',
      reference: 'Pocit úlevy hned po ošetření.',
      klient: 'Petra N.'
    },
    {
      id: 3,
      imgPred: 'img/mojeprace-3-pred.png',
      imgPo:   'img/mojeprace-3-po.png',
      popis: 'Ošetření zarůstajícího nehtu, lokální citlivý přístup.',
      datum: '2025-10-05',
      reference: 'Konečně bez bolesti, děkuji.',
      klient: 'Lenka V.'
    },
    // Připravené (zatím klidně bez fotek — skript vloží placeholder, pokud soubory chybí)
    {
      id: 4,
      imgPred: 'img/mojeprace-4-pred.png',
      imgPo:   'img/mojeprace-4-po.png',
      popis: 'Příklad práce – bude doplněno.',
      datum: '2025-10-10',
      reference: 'Krátká reference — bude doplněno.',
      klient: '—'
    },
    {
      id: 5,
      imgPred: 'img/mojeprace-5-pred.png',
      imgPo:   'img/mojeprace-5-po.png',
      popis: 'Příklad práce – bude doplněno.',
      datum: '2025-10-10',
      reference: 'Krátká reference — bude doplněno.',
      klient: '—'
    },
    {
      id: 6,
      imgPred: 'img/mojeprace-6-pred.png',
      imgPo:   'img/mojeprace-6-po.png',
      popis: 'Příklad práce – bude doplněno.',
      datum: '2025-10-10',
      reference: 'Krátká reference — bude doplněno.',
      klient: '—'
    }
  ];

  // 3) Placeholder obrázek (SVG) — použije se, když reálný chybí
  const PH = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 450'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#E6D7C2'/>
          <stop offset='100%' stop-color='#f2e7d9'/>
        </linearGradient>
      </defs>
      <rect width='600' height='450' fill='url(#g)'/>
      <text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle'
            font-family='Lato, Arial, sans-serif' font-size='24' fill='#8E7358'>
        Před / Po (bude doplněno)
      </text>
    </svg>`
  );
  const PH_SRC = `data:image/svg+xml;charset=utf-8,${PH}`;

  function imgWithFallback(src, alt) {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = alt || '';
    img.src = src;
    img.addEventListener('error', () => { img.src = PH_SRC; }, { once: true });
    return img;
  }

  // 4) Render
  function createCard(item) {
    const art = document.createElement('article');
    art.className = 'work-card';

    const media = document.createElement('div');
    media.className = 'work-media';

    const figBefore = document.createElement('figure');
    figBefore.className = 'shot shot-before';
    figBefore.appendChild(imgWithFallback(item.imgPred, `Práce ${item.id} — Před`));
    const badgeBefore = document.createElement('figcaption');
    badgeBefore.className = 'badge badge-before';
    badgeBefore.textContent = 'Před';
    figBefore.appendChild(badgeBefore);

    const divider = document.createElement('span');
    divider.className = 'divider';
    divider.setAttribute('aria-hidden', 'true');

    const figAfter = document.createElement('figure');
    figAfter.className = 'shot shot-after';
    figAfter.appendChild(imgWithFallback(item.imgPo, `Práce ${item.id} — Po`));
    const badgeAfter = document.createElement('figcaption');
    badgeAfter.className = 'badge badge-after';
    badgeAfter.textContent = 'Po';
    figAfter.appendChild(badgeAfter);

    media.appendChild(figBefore);
    media.appendChild(divider);
    media.appendChild(figAfter);

    const body = document.createElement('div');
    body.className = 'work-body';

    const desc = document.createElement('p');
    desc.className = 'work-desc';
    desc.textContent = item.popis;

    const meta = document.createElement('div');
    meta.className = 'work-meta';
    const t = document.createElement('time');
    t.dateTime = item.datum;
    // formát DD. MM. RRRR
    const d = new Date(item.datum.replace(/-/g, '/'));
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    t.textContent = `${dd}. ${mm}. ${yyyy}`;
    meta.appendChild(t);

    const ref = document.createElement('blockquote');
    ref.className = 'work-ref';
    ref.innerHTML = `„${escapeHtml(item.reference)}“ <cite>— ${escapeHtml(item.klient)}</cite>`;

    body.appendChild(desc);
    body.appendChild(meta);
    body.appendChild(ref);

    art.appendChild(media);
    art.appendChild(body);

    return art;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  let rendered = 0;
  const STEP = 3;

  function renderNext() {
    const grid = document.getElementById('works-grid');
    const btn = document.getElementById('works-loadmore');
    if (!grid) return;

    const slice = PRACE.slice(rendered, rendered + STEP);
    slice.forEach(item => grid.appendChild(createCard(item)));
    rendered += slice.length;

    if (rendered >= PRACE.length) {
      btn?.classList.add('is-hidden');
      if (btn) btn.style.display = 'none';
    }
  }

  function initWorks() {
    renderNext(); // první tři
    const btn = document.getElementById('works-loadmore');
    btn?.addEventListener('click', renderNext);
  }
})();
