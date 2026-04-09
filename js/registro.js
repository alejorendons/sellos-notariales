// Lógica del formulario Registro / Acreedor (registro.html)

// --- Poblar selector de departamentos desde OFICINAS ---
(function poblarDepartamentos() {
    const depSelect = document.getElementById('department');
    Object.keys(OFICINAS).forEach(function (dep) {
        const opt = document.createElement('option');
        opt.value = dep;
        opt.textContent = dep.charAt(0) + dep.slice(1).toLowerCase(); // Ej: "Antioquia"
        depSelect.appendChild(opt);
    });
})();

// Al cambiar departamento → poblar oficinas
document.getElementById('department').addEventListener('change', function () {
    const officeSelect    = document.getElementById('office');
    const officeContainer = document.getElementById('office-container');
    const dep             = this.value;

    // Limpiar selector de oficinas
    officeSelect.innerHTML = '<option value="">Seleccione una oficina</option>';

    if (!dep) {
        officeContainer.style.display = 'none';
        return;
    }

    OFICINAS[dep].forEach(function (oficina) {
        const opt = document.createElement('option');
        opt.value = oficina;          // el valor ES el texto del sello
        opt.textContent = oficina.charAt(0) + oficina.slice(1).toLowerCase();
        officeSelect.appendChild(opt);
    });

    officeContainer.style.display = 'block';
});

// Mostrar / ocultar secciones según destino
document.getElementById('copy-to').addEventListener('change', function () {
    document.getElementById('office-fields').style.display = this.value === 'oficina'  ? 'block' : 'none';
    document.getElementById('value-fields').style.display  = this.value === 'acreedor' ? 'block' : 'none';

    // Resetear selección de oficina al cambiar destino
    if (this.value !== 'oficina') {
        document.getElementById('department').value = '';
        document.getElementById('office').innerHTML = '<option value="">Seleccione una oficina</option>';
        document.getElementById('office-container').style.display = 'none';
    }
});

document.getElementById('print-button').addEventListener('click', function () {
    const number    = document.getElementById('number').value.trim();
    const dateInput = document.getElementById('date').value;
    const folios    = document.getElementById('folios').value;
    const annexes   = document.getElementById('annexes').value || '0';
    const notary    = document.getElementById('notary').value;
    const copyToSel = document.getElementById('copy-to').value;

    // Validación
    if (!number || !dateInput || !folios || !notary || !copyToSel) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }
    if (Number(folios) < 1) {
        alert('El número de folios debe ser al menos 1.');
        return;
    }
    if (copyToSel === 'oficina') {
        if (!document.getElementById('department').value) {
            alert('Por favor, seleccione el departamento.');
            return;
        }
        if (!document.getElementById('office').value) {
            alert('Por favor, seleccione la oficina.');
            return;
        }
    }
    if (copyToSel === 'acreedor' && !document.getElementById('value').value.trim()) {
        alert('Por favor, ingrese el nombre del acreedor hipotecario.');
        return;
    }

    // Construir texto del destinatario
    let copyTo;
    if (copyToSel === 'oficina') {
        // El valor del selector ya ES el texto exacto del sello
        copyTo = 'OFICINA DE INSTRUMENTOS PUBLICOS DE ' + document.getElementById('office').value;
    } else {
        copyTo = 'ACREEDOR HIPOTECARIO (' + document.getElementById('value').value.trim().toUpperCase() + ')';
    }

    const formattedDate  = formatDate(dateInput);
    const formattedToday = formatToday();

    const foliosInWords  = numberToWords(Number(folios));
    const annexesInWords = annexes !== '0' ? ' Y ' + numberToWords(Number(annexes)) + ' (' + annexes + ') ANEXOS' : '';

    const notaryRole  = getNotaryRole(notary);
    const notaryTitle = getNotaryTitle(notary);

    const headerContent = `
        NOTARIA ÚNICA DEL MUNICIPIO<br>
        DE EL RETIRO ANTIOQUIA<br><br>
        ES FIEL COPIA TOMADA DEL ORIGINAL DE LA ESCRITURA PÚBLICA N°${number} DEL DÍA ${formattedDate}
    `;

    let bodyContent;
    if (copyToSel === 'oficina') {
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
            CONSTA DE ${foliosInWords} (${folios}) FOLIOS ${annexesInWords} <br><br>
            CON DESTINO A: <br> ${copyTo}.<br><br>
            <img src="img/logo.png" alt="Logo" style="width:100px;height:auto;"><br><br>
        `;
    }

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
