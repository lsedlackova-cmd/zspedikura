// Načti 'Domů' a obsluž jediné tlačítko pro ztlumení
fetch('html/domu.html')
  .then(r => r.text())
  .then(html => {
    const mount = document.getElementById('domu');
    mount.innerHTML = html;

    const video = mount.querySelector('#introVideo');
    const btn = mount.querySelector('#muteToggle');

    if (!video || !btn) return;

    // Výchozí stav: muted (kvůli autoplay na mobilech)
    video.muted = true;
    btn.setAttribute('aria-pressed', 'true');

    // Toggle mute/unmute
    btn.addEventListener('click', () => {
      video.muted = !video.muted;
      btn.setAttribute('aria-pressed', video.muted ? 'true' : 'false');
      // volitelné: malá vizuální odezva změnou průhlednosti
      btn.style.opacity = video.muted ? '1' : '0.9';
    });
  })
  .catch(console.error);

