// Configuración y utilidades compartidas entre todos los formularios

const CONFIG = {
    MONTH_NAMES: [
        'ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO',
        'JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'
    ],
    NOTARY_NAMES: {
        notary1: 'FRANCISCO JAVIER HINCAPIE AGUDELO',
        notary2: 'LUZ HELIDA OCAMPO VILLA',
        notary3: 'SARA LUZ ARBOLEDA CARMONA'
    },
    // Notarios que actúan como encargadas (usan género femenino en el sello)
    ENCARGADAS: ['notary2', 'notary3'],
};

// Formatea una cadena "YYYY-MM-DD" a "D DE MES DE YYYY" en hora local
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.getDate() + ' DE ' + CONFIG.MONTH_NAMES[date.getMonth()] + ' DE ' + date.getFullYear();
}

// Formatea la fecha de hoy a "D DE MES DE YYYY" en hora local
function formatToday() {
    const today = new Date();
    return today.getDate() + ' DE ' + CONFIG.MONTH_NAMES[today.getMonth()] + ' DE ' + today.getFullYear();
}

// Determina si el notario seleccionado actúa como encargada
function isEncargada(notary) {
    return CONFIG.ENCARGADAS.includes(notary);
}

// Retorna el texto del rol del notario para el cuerpo del sello
function getNotaryRole(notary) {
    return isEncargada(notary) ? 'LA NOTARIA ENCARGADA' : 'EL NOTARIO ÚNICO';
}

// Retorna el título que aparece bajo el nombre del notario
function getNotaryTitle(notary) {
    return isEncargada(notary)
        ? 'NOTARIA ENCARGADA DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.'
        : 'NOTARIO ÚNICO DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.';
}

// Pre-llenar campo de fecha con la fecha de hoy
document.addEventListener('DOMContentLoaded', function () {
    var dateField = document.getElementById('date');
    if (dateField) {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        dateField.value = yyyy + '-' + mm + '-' + dd;
    }
});
