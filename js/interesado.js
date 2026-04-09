// Lógica del formulario Interesado / Catastro (index.html)

// Mostrar / ocultar campo de texto libre cuando se elige "Otro"
document.getElementById('copy-to').addEventListener('change', function () {
    document.getElementById('custom-copy-container').style.display =
        this.value === 'otro' ? 'block' : 'none';
});

document.getElementById('print-button').addEventListener('click', function () {
    const number     = document.getElementById('number').value.trim();
    const dateInput  = document.getElementById('date').value;
    const folios     = document.getElementById('folios').value;
    const annexes    = document.getElementById('annexes').value || '0';
    const notary     = document.getElementById('notary').value;
    const copyTo     = document.getElementById('copy-to').value;
    const customCopy = document.getElementById('custom-copy').value.trim();

    // Validación
    if (!number || !dateInput || !folios || !notary || !copyTo) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }
    if (copyTo === 'otro' && !customCopy) {
        alert('Por favor, ingrese el nombre del destinatario.');
        return;
    }
    if (Number(folios) < 1) {
        alert('El número de folios debe ser al menos 1.');
        return;
    }

    const formattedDate  = formatDate(dateInput);
    const formattedToday = formatToday();

    const foliosInWords  = numberToWords(Number(folios));
    const annexesInWords = annexes !== '0' ? ' Y ' + numberToWords(Number(annexes)) + ' (' + annexes + ') ANEXOS' : '';

    let copyFor;
    if (copyTo === 'otro') {
        copyFor = customCopy.toUpperCase();
    } else {
        copyFor = copyTo === 'interesado' ? 'INTERESADO' : 'CATASTRO';
    }

    const notaryRole  = getNotaryRole(notary);
    const notaryTitle = getNotaryTitle(notary);

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
        ${CONFIG.NOTARY_NAMES[notary]}<br>
        ${notaryTitle}<br><br>
        SE EXPIDIÓ HOY: ${formattedToday}
    `;

    const stampHTML =
        '<div class="stamp-header">' + headerContent + '</div>' +
        '<div class="stamp-body">' + bodyContent + '<br>' + signatureContent + '</div>';

    openPrintPreview(stampHTML);
});
