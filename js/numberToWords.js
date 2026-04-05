// Convierte un número entero (0–999) a su representación en palabras en español mayúsculas.
function numberToWords(num) {
    const unidades = {
        0:'CERO', 1:'UNO', 2:'DOS', 3:'TRES', 4:'CUATRO', 5:'CINCO',
        6:'SEIS', 7:'SIETE', 8:'OCHO', 9:'NUEVE', 10:'DIEZ', 11:'ONCE',
        12:'DOCE', 13:'TRECE', 14:'CATORCE', 15:'QUINCE', 16:'DIECISÉIS',
        17:'DIECISIETE', 18:'DIECIOCHO', 19:'DIECINUEVE', 20:'VEINTE',
        21:'VEINTIUNO', 22:'VEINTIDÓS', 23:'VEINTITRÉS', 24:'VEINTICUATRO',
        25:'VEINTICINCO', 26:'VEINTISÉIS', 27:'VEINTISIETE', 28:'VEINTIOCHO',
        29:'VEINTINUEVE'
    };
    const decenas = {
        3:'TREINTA', 4:'CUARENTA', 5:'CINCUENTA',
        6:'SESENTA', 7:'SETENTA', 8:'OCHENTA', 9:'NOVENTA'
    };
    const centenas = {
        1:'CIENTO', 2:'DOSCIENTOS', 3:'TRESCIENTOS', 4:'CUATROCIENTOS',
        5:'QUINIENTOS', 6:'SEISCIENTOS', 7:'SETECIENTOS',
        8:'OCHOCIENTOS', 9:'NOVECIENTOS'
    };

    if (num >= 0 && num <= 29) {
        return unidades[num];
    }
    if (num >= 30 && num <= 99) {
        const d = Math.floor(num / 10), u = num % 10;
        return u === 0 ? decenas[d] : decenas[d] + ' Y ' + unidades[u];
    }
    if (num >= 100 && num <= 999) {
        const c = Math.floor(num / 100), rest = num % 100;
        if (rest === 0) return centenas[c];
        if (rest <= 29) return centenas[c] + ' ' + unidades[rest];
        const d = Math.floor(rest / 10), u = rest % 10;
        return u === 0
            ? centenas[c] + ' ' + decenas[d]
            : centenas[c] + ' ' + decenas[d] + ' Y ' + unidades[u];
    }
    return 'NÚMERO FUERA DE RANGO';
}
