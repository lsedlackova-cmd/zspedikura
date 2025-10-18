(function () {
  function buildVCard() {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Zuzka Schölerová',
      'N:Schölerová;Zuzka;;;',
      'ORG:ZS Pedikúra',
      'TEL;TYPE=CELL,VOICE:+420608331380',
      'EMAIL;TYPE=INTERNET:zspedikura@zspedikura.cz',
      'ADR;TYPE=WORK:;;;;;;',
      'URL:https://www.zspedikura.cz',
      'END:VCARD'
    ];
    const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard' });
    return URL.createObjectURL(blob);
  }

  function enhance(root){
    const v = root.querySelector('#vcard-download');
    if (v){
      v.href = buildVCard();
      v.setAttribute('download', 'ZS-Pedikura_Zuzka-Scholerova.vcf');
    }
  }

  fetch('html/kontakt.html')
    .then(r => r.text())
    .then(html => {
      const el = document.getElementById('kontakt');
      if (el) {
        el.outerHTML = html;
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



