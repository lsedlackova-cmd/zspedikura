// Načti footer fragment do #footer
fetch('html/footer.html')
  .then(r => r.text())
  .then(html => {
    const mount = document.getElementById('footer');
    if (mount) mount.innerHTML = html;
  })
  .catch(console.error);


