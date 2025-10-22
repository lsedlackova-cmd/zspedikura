// kontakt.js — načte kontakt.html do #kontakt a připraví vCard
(function () {
  function buildVCard() {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Zuzana Schölerová',
      'N:Schölerová;Zuzana;;;',
      'ORG:ZS Pedikúra',
      'TEL;TYPE=CELL,VOICE:+420608331380',
      'EMAIL;TYPE=INTERNET:zspedikura@zspedikura.cz',
      'ADR;TYPE=WORK:;;;;;;', // doplníš adresu
      'URL:https://www.zspedikura.cz',
      'END:VCARD'
    ];
    const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard' });
    return URL.createObjectURL(blob);
  }

  function enhance(root) {
    const vcard = root.querySelector('#vcard-download');
    if (vcard) {
      vcard.href = buildVCard();
      vcard.setAttribute('download', 'ZS-Pedikura_Zuzana-Scholerova.vcf');
    }
  }

  fetch('html/kontakt.html')
    .then(r => r.text())
    .then(html => {
      const placeholder = document.getElementById('kontakt');
      if (placeholder) {
        placeholder.outerHTML = html;
      } else {
        const main = document.getElementById('main') || document.querySelector('main') || document.body;
        const wrap = document.createElement('div');
        wrap.innerHTML = html;
        main.appendChild(wrap.firstElementChild);
      }
      enhance(document);
    })
    .catch(console.error);
})();




