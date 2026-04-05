// Lógica del formulario Registro / Acreedor (registro.html)

const MONTH_NAMES = [
    'enero','febrero','marzo','abril','mayo','junio',
    'julio','agosto','septiembre','octubre','noviembre','diciembre'
];

const NOTARY_NAMES = {
    notary1: 'FRANCISCO JAVIER HINCAPIE AGUDELO',
    notary2: 'LUZ HELIDA OCAMPO VILLA',
    notary3: 'SARA LUZ ARBOLEDA CARMONA'
};

// Mostrar / ocultar campos adicionales según destino
document.getElementById('copy-to').addEventListener('change', function () {
    document.getElementById('office-fields').style.display = this.value === 'oficina'  ? 'block' : 'none';
    document.getElementById('value-fields').style.display  = this.value === 'acreedor' ? 'block' : 'none';
});

document.getElementById('print-button').addEventListener('click', function () {
    const number    = document.getElementById('number').value;
    const dateInput = document.getElementById('date').value;
    const folios    = document.getElementById('folios').value;
    const annexes   = document.getElementById('annexes').value || '0';
    const notary    = document.getElementById('notary').value;
    let   copyTo    = document.getElementById('copy-to').value;

    // Construir texto del destinatario
    if (copyTo === 'oficina') {
        const office = document.getElementById('office').value;
        let   label  = office.replace(/_/g, ' ').toUpperCase();
        copyTo = 'OFICINA DE INSTRUMENTOS PUBLICOS DE ' + label + ' ANTIOQUIA';
        // Medellín no lleva "ANTIOQUIA" al final
        if (copyTo.includes('MEDELLIN ZONA SUR') || copyTo.includes('MEDELLIN ZONA NORTE')) {
            copyTo = copyTo.replace(' ANTIOQUIA', '');
        }
    } else if (copyTo === 'acreedor') {
        const valor = document.getElementById('value').value;
        copyTo = 'ACREEDOR HIPOTECARIO (' + valor.toUpperCase() + ')';
    }

    const date          = new Date(dateInput + 'T00:00:00');
    const formattedDate = date.getUTCDate() + ' DE ' + MONTH_NAMES[date.getUTCMonth()].toUpperCase() + ' DE ' + date.getUTCFullYear();

    const today         = new Date();
    const formattedToday = today.getUTCDate() + ' DE ' + MONTH_NAMES[today.getUTCMonth()].toUpperCase() + ' DE ' + today.getUTCFullYear();

    const foliosInWords  = numberToWords(Number(folios));
    const annexesInWords = annexes !== '0' ? ' Y ' + numberToWords(Number(annexes)) + ' (' + annexes + ') ANEXOS' : '';

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

    let bodyContent;
    if (copyTo.includes('OFICINA DE INSTRUMENTOS PUBLICOS')) {
        bodyContent = `
            COPIA A FAVOR DE: ${copyTo}.<br><br>
            CONSTA DE ${foliosInWords} (${folios}) FOLIOS${annexesInWords}<br>
            RUBRICADOS POR ${notaryRole} DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.<br><br>
            <img src="img/logo.png" alt="Logo" style="width:100px;height:auto;"><br><br>
        `;
    } else {
        bodyContent = `
            ES FIEL Y PRIMERA (01) COPIA EN REPRODUCCION FOTOSTATICA DEL ORIGINAL <br><br>
            QUE PRESTA MERITO EJECUTIVO PARA EXIGIR EL CUMPLIMIENTO DE LAS OBLIGACIONES <br><br>
            EL CUAL SE EXPIDE HOY ${formattedToday}. <br><br>
            CONSTA DE ${foliosInWords} (${folios}) FOLIOS ${annexesInWords} <br><br>
            CON DESTINO A: <br> ${copyTo}.<br><br>
            <img src="img/logo.png" alt="Logo" style="width:100px;height:auto;"><br><br>
        `;
    }

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
