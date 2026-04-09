// Convierte un número entero (0–999 999) a su representación en palabras en español mayúsculas.
function numberToWords(num) {
    num = Math.floor(num);
    if (!Number.isFinite(num) || num < 0 || num > 999999) {
        return 'NÚMERO FUERA DE RANGO';
    }

    const UNIDADES = [
        'CERO','UNO','DOS','TRES','CUATRO','CINCO','SEIS','SIETE','OCHO','NUEVE',
        'DIEZ','ONCE','DOCE','TRECE','CATORCE','QUINCE','DIECISÉIS',
        'DIECISIETE','DIECIOCHO','DIECINUEVE','VEINTE',
        'VEINTIUNO','VEINTIDÓS','VEINTITRÉS','VEINTICUATRO',
        'VEINTICINCO','VEINTISÉIS','VEINTISIETE','VEINTIOCHO','VEINTINUEVE'
    ];
    const DECENAS  = ['','','','TREINTA','CUARENTA','CINCUENTA','SESENTA','SETENTA','OCHENTA','NOVENTA'];
    const CENTENAS = ['','CIENTO','DOSCIENTOS','TRESCIENTOS','CUATROCIENTOS',
        'QUINIENTOS','SEISCIENTOS','SETECIENTOS','OCHOCIENTOS','NOVECIENTOS'];

    // Convierte números de 0 a 999
    function menorMil(n) {
        if (n === 0) return '';
        if (n === 100) return 'CIEN';
        if (n <= 29) return UNIDADES[n];
        if (n < 100) {
            const d = Math.floor(n / 10), u = n % 10;
            return u === 0 ? DECENAS[d] : DECENAS[d] + ' Y ' + UNIDADES[u];
        }
        // 101–999
        const c = Math.floor(n / 100), rest = n % 100;
        return rest === 0 ? CENTENAS[c] : CENTENAS[c] + ' ' + menorMil(rest);
    }

    if (num === 0) return 'CERO';

    const miles = Math.floor(num / 1000);
    const resto = num % 1000;

    if (miles === 0) return menorMil(num);

    const parteMillar = miles === 1 ? 'MIL' : menorMil(miles) + ' MIL';

    return resto === 0 ? parteMillar : parteMillar + ' ' + menorMil(resto);
}
