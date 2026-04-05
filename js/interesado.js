// Lógica del formulario Interesado / Catastro (index.html)

const MONTH_NAMES = [
    'enero','febrero','marzo','abril','mayo','junio',
    'julio','agosto','septiembre','octubre','noviembre','diciembre'
];

const NOTARY_NAMES = {
    notary1: 'FRANCISCO JAVIER HINCAPIE AGUDELO',
    notary2: 'LUZ HELIDA OCAMPO VILLA',
    notary3: 'SARA LUZ ARBOLEDA CARMONA'
};

// Mostrar / ocultar campo de texto libre cuando se elige "Otro"
document.getElementById('copy-to').addEventListener('change', function () {
    document.getElementById('custom-copy-container').style.display =
        this.value === 'otro' ? 'block' : 'none';
});

document.getElementById('print-button').addEventListener('click', function () {
    const number     = document.getElementById('number').value;
    const dateInput  = document.getElementById('date').value;
    const folios     = document.getElementById('folios').value;
    const annexes    = document.getElementById('annexes').value || '0';
    const notary     = document.getElementById('notary').value;
    const copyTo     = document.getElementById('copy-to').value;
    const customCopy = document.getElementById('custom-copy').value;

    const date           = new Date(dateInput + 'T00:00:00');
    const formattedDate  = date.getUTCDate() + ' DE ' + MONTH_NAMES[date.getUTCMonth()].toUpperCase() + ' DE ' + date.getUTCFullYear();

    const today              = new Date();
    const formattedToday     = today.getUTCDate() + ' DE ' + MONTH_NAMES[today.getUTCMonth()].toUpperCase() + ' DE ' + today.getUTCFullYear();

    const foliosInWords  = numberToWords(Number(folios));
    const annexesInWords = annexes !== '0' ? ' y ' + numberToWords(Number(annexes)) + ' (' + annexes + ') ANEXOS' : '';

    let copyFor;
    if (copyTo === 'otro' && customCopy) {
        copyFor = customCopy.toUpperCase();
    } else {
        copyFor = copyTo === 'interesado' ? 'INTERESADO' : 'CATASTRO';
    }

    const isEncargada = notary === 'notary2' || notary === 'notary3';
    const notaryRole  = isEncargada ? 'LA NOTARIA ENCARGADA' : 'EL NOTARIO UNICO';
    const notaryTitle = isEncargada
        ? 'NOTARIA ENCARGADA DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.'
        : 'NOTARIO ÚNICO DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.';

    const headerContent = `
        NOTARIA ÚNICA DEL MUNICIPIO<br>
        DE EL RETIRO ANTIOQUIA<br><br>
        ES FIEL COPIA TOMADA DEL ORIGINAL DE LA ESCRITURA PÚBLICA N°${number} DEL DÍA ${formattedDate}
    `;

    const bodyContent = `
        COPIA A FAVOR DE: ${copyFor}.<br><br>
        CONSTA DE ${foliosInWords} (${folios}) FOLIOS${annexesInWords}<br>
        RUBRICADOS POR ${notaryRole} DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.<br><br>
        <img src="img/logo.png" alt="Logo" style="width:100px;height:auto;"><br><br>
    `;

    const signatureContent = `
        ${NOTARY_NAMES[notary]}<br>
        ${notaryTitle}<br><br>
        SE EXPIDIÓ HOY: ${formattedToday}
    `;

    const stampHTML =
        '<div class="stamp-header">' + headerContent + '</div>' +
        '<div class="stamp-body">' + bodyContent + '<br>' + signatureContent + '</div>';

    openPrintPreview(stampHTML);
});
