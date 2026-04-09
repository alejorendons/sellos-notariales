// Lógica del formulario Registro Civil (registroCivil.html)

// Mostrar / ocultar campo de texto libre cuando se elige "Otro"
document.getElementById('copia-para').addEventListener('change', function () {
    document.getElementById('custom-copy-container').style.display =
        this.value === 'otro' ? 'block' : 'none';
});

document.getElementById('print-button').addEventListener('click', function () {
    const dateInput  = document.getElementById('date').value;
    const registroDe = document.getElementById('registro-de').value;
    const copiaPara  = document.getElementById('copia-para').value;
    const customCopy = document.getElementById('custom-copy').value.trim();
    const notary     = document.getElementById('notary').value;

    if (!dateInput || !registroDe || !copiaPara || !notary || (copiaPara === 'otro' && !customCopy)) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    const formattedDate = formatDate(dateInput);

    const registroMayus = registroDe.toUpperCase();
    const copiaTexto    = copiaPara === 'interesado' ? 'INTERESADO' : customCopy.toUpperCase();

    const notaryTitle = notary === 'notary1'
        ? 'NOTARIA ÚNICA DEL CÍRCULO DEL RETIRO, ANTIOQUIA.'
        : 'NOTARIA ENCARGADA DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.';

    const bodyContent = `
        <strong>NOTARIA ÚNICA DEL RETIRO, ANTIOQUIA.</strong><br><br>
        ES FIEL COPIA TOMADA DEL FOLIO ORIGINAL DEL REGISTRO CIVIL DE
        <strong>${registroMayus}</strong> QUE REPOSA EN NUESTRO ARCHIVO DEBIDAMENTE PROTOCOLIZADO.<br><br>
        COPIA PARA:<br>
        ${copiaTexto}<br><br>
        ARTÍCULO 115. DECRETO 1260/70<br><br>
        ${formattedDate}.<br><br>
        <img src="img/logo.png" alt="Logo" style="width:100px;"><br><br>
        ${CONFIG.NOTARY_NAMES[notary]}<br>
        ${notaryTitle}
    `;

    const stampHTML = '<div class="stamp-body">' + bodyContent + '</div>';

    openPrintPreview(stampHTML);
});
