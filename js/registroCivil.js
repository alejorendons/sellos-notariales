// Lógica del formulario Registro Civil (registroCivil.html)

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
document.getElementById('copia-para').addEventListener('change', function () {
    document.getElementById('custom-copy-container').style.display =
        this.value === 'otro' ? 'block' : 'none';
});

document.getElementById('print-button').addEventListener('click', function () {
    const dateInput  = document.getElementById('date').value;
    const registroDe = document.getElementById('registro-de').value;
    const copiaPara  = document.getElementById('copia-para').value;
    const customCopy = document.getElementById('custom-copy').value;
    const notary     = document.getElementById('notary').value;

    if (!dateInput || !registroDe || !copiaPara || !notary || (copiaPara === 'otro' && !customCopy)) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    const date          = new Date(dateInput + 'T00:00:00');
    const formattedDate = date.getUTCDate() + ' DE ' + MONTH_NAMES[date.getUTCMonth()].toUpperCase() + ' DE ' + date.getUTCFullYear();

    const registroMayus = registroDe.toUpperCase();
    const copiaTexto    = copiaPara === 'interesado' ? 'INTERESADO' : customCopy.toUpperCase();

    const notaryTitle = notary === 'notary1'
        ? 'NOTARIA ÚNICA DEL CÍRCULO DEL RETIRO, ANTIOQUIA.'
        : 'NOTARIA ENCARGADA DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.';

    const bodyContent = `
        <strong>NOTARIA ÚNICA DEL RETIRO, ANTIOQUIA.</strong><br><br>
        ES FIEL COPIA TOMADA DEL FOLIO ORIGINAL DEL REGISTRO CIVIL DE
        <strong>${registroMayus}</strong> QUE REPOSA EN NUESTRO ARCHIVO DEBIDAMENTE PROTOCOLIZADO.<br>
        SE EXPIDE PARA EFECTOS CIVILES, LEGALES Y/O JUDICIALES.<br><br>
        COPIA PARA:<br>
        ${copiaTexto}<br><br>
        DESTINADO: CIVILES, LEGALES Y/O JUDICIALES<br>
        ARTÍCULO 115. DECRETO 1260/70<br><br>
        ${formattedDate}.<br><br>
        <img src="img/logo.png" alt="Logo" style="width:100px;"><br><br>
        ${NOTARY_NAMES[notary]}<br>
        ${notaryTitle}
    `;

    const stampHTML = '<div class="stamp-body">' + bodyContent + '</div>';

    openPrintPreview(stampHTML);
});
