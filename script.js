        // Mostrar/ocultar campo de texto para interesado manual
        document.getElementById('copy-to').addEventListener('change', function() {
            const customCopyContainer = document.getElementById('custom-copy-container');
            if (this.value === 'otro') {
                customCopyContainer.style.display = 'block';
            } else {
                customCopyContainer.style.display = 'none';
            }
        });

        // Función para convertir números a palabras (de tu script.js original)
        function numberToWords(num) {
            const unidades = {
                0: "CERO",
                1: "UNO",
                2: "DOS",
                3: "TRES",
                4: "CUATRO",
                5: "CINCO",
                6: "SEIS",
                7: "SIETE",
                8: "OCHO",
                9: "NUEVE",
                10: "DIEZ",
                11: "ONCE",
                12: "DOCE",
                13: "TRECE",
                14: "CATORCE",
                15: "QUINCE",
                16: "DIECISÉIS",
                17: "DIECISIETE",
                18: "DIECIOCHO",
                19: "DIECINUEVE",
                20: "VEINTE",
                21: "VEINTIUNO",
                22: "VEINTIDÓS",
                23: "VEINTITRÉS",
                24: "VEINTICUATRO",
                25: "VEINTICINCO",
                26: "VEINTISÉIS",
                27: "VEINTISIETE",
                28: "VEINTIOCHO",
                29: "VEINTINUEVE",
            };

            const decenas = {
                3: "TREINTA",
                4: "CUARENTA",
                5: "CINCUENTA",
                6: "SESENTA",
                7: "SETENTA",
                8: "OCHENTA",
                9: "NOVENTA",
            };

            const centenas = {
                1: "CIENTO",
                2: "DOSCIENTOS",
                3: "TRESCIENTOS",
                4: "CUATROCIENTOS",
                5: "QUINIENTOS",
                6: "SEISCIENTOS",
                7: "SETECIENTOS",
                8: "OCHOCIENTOS",
                9: "NOVECIENTOS",
            };

            if (num >= 0 && num <= 29) {
                return unidades[num];
            } else if (num >= 30 && num <= 99) {
                let firstDigit = Math.floor(num / 10);
                let secondDigit = num % 10;

                if (secondDigit === 0) {
                    return decenas[firstDigit];
                } else {
                    return decenas[firstDigit] + " Y " + unidades[secondDigit];
                }
            } else if (num >= 100 && num <= 999) {
                let firstDigit = Math.floor(num / 100);
                let remainingDigits = num % 100;

                if (remainingDigits === 0) {
                    return centenas[firstDigit];
                } else if (remainingDigits <= 29) {
                    return centenas[firstDigit] + " " + unidades[remainingDigits];
                } else {
                    let secondDigit = Math.floor(remainingDigits / 10);
                    let thirdDigit = remainingDigits % 10;

                    if (thirdDigit === 0) {
                        return centenas[firstDigit] + " " + decenas[secondDigit];
                    } else {
                        return (
                            centenas[firstDigit] +
                            " " +
                            decenas[secondDigit] +
                            " Y " +
                            unidades[thirdDigit]
                        );
                    }
                }
            } else {
                return "NÚMERO FUERA DE RANGO";
            }
        }

        // Función para imprimir (modificada para manejar el interesado manual)
        document.getElementById('print-button').addEventListener('click', function() {
            const number = document.getElementById('number').value;
            const dateInput = document.getElementById('date').value;
            const date = new Date(dateInput + 'T00:00:00');
            const folios = document.getElementById('folios').value;
            const annexes = document.getElementById('annexes').value || '0';
            const notary = document.getElementById('notary').value;
            const copyTo = document.getElementById('copy-to').value;
            const customCopy = document.getElementById('custom-copy').value;
            
            const notaryNames = {
                notary1: "FRANCISCO JAVIER HINCAPIE AGUDELO",
                notary2: "LUZ HELIDA OCAMPO VILLA",
                notary3: "SARA LUZ ARBOLEDA CARMONA"
            };
            
            const monthNames = [
                "enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
            ];

            const formattedDate = `${date.getUTCDate()} DE ${monthNames[date.getUTCMonth()].toUpperCase()} DE ${date.getUTCFullYear()}`;

            const foliosInWords = numberToWords(Number(folios));
            const annexesInWords = annexes !== '0' ? ` y ${numberToWords(Number(annexes))} (${annexes}) ANEXOS` : '';

            // Determinar el destinatario de la copia
            let copyFor;
            if (copyTo === 'otro' && customCopy) {
                copyFor = customCopy.toUpperCase();
            } else {
                copyFor = copyTo === 'interesado' ? 'INTERESADO' : 'CATASTRO';
            }

            let bodyContent = `
                COPIA A FAVOR DE: ${copyFor}.<br><br>
                CONSTA DE ${foliosInWords} (${folios}) FOLIOS${annexesInWords}<br>
                RUBRICADOS POR EL NOTARIO UNICO DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.<br><br>
                <img src="img/logo.png" alt="Logo" style="width: 100px; height: auto;"><br><br>
            `;

            const currentDate = new Date();
            const formattedCurrentDate = `${currentDate.getUTCDate()} DE ${monthNames[currentDate.getUTCMonth()].toUpperCase()} DE ${currentDate.getUTCFullYear()}`;

            let signatureContent = `
                ${notaryNames[notary].toUpperCase()}<br>
                NOTARIO ÚNICO DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.<br><br>
                SE EXPIDIÓ HOY: ${formattedCurrentDate}
            `;

            if (notary === 'notary2' || notary === 'notary3') {
                bodyContent = `
                    COPIA A FAVOR DE: ${copyFor}.<br><br>            
                    CONSTA DE ${foliosInWords} (${folios}) FOLIOS${annexesInWords}<br>            
                    RUBRICADOS POR LA NOTARIA ENCARGADA DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.<br><br>
                    <img src="img/logo.png" alt="Logo" style="width: 100px; height: auto;"><br><br>
                `;
                
                signatureContent = `
                    ${notaryNames[notary].toUpperCase()}<br>
                    NOTARIA ENCARGADA DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.<br><br>
                    SE EXPIDIÓ HOY: ${formattedCurrentDate}
                `;
            }

            const headerContent = `
                NOTARIA ÚNICA DEL MUNICIPIO<br>
                DE EL RETIRO ANTIOQUIA<br><br>
                ES FIEL COPIA TOMADA DEL ORIGINAL DE LA ESCRITURA PÚBLICA N°${number} DEL DÍA ${formattedDate}
            `;

            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Sellos Notariales - Imprimir</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                            width: 100%;
                            font-size: 12px;
                        }
                        #output-container {
                            border: 1px solid #000;
                            padding: 10px;
                            width: 70%;
                            margin-right: auto;
                            margin-left: auto;
                        }
                        #header-cell, #signature-cell {
                            text-align: center;
                            padding: 20px;
                            border-bottom: 1px solid #000;
                        }

                        #body-cell{
                            text-align: center;
                            padding: 20px;
                            border-bottom: none;
                        }

                        .hidden {
                            display: none;
                        }
                    </style>
                </head>
                <body>
                    <div id="output-container" class="hidden">
                        <div id="header-cell">${headerContent}</div>
                        <div id="body-cell">
                        ${bodyContent}
                        <br />
                        ${signatureContent}
                        </div>
                    </div>
                    <script>
                        window.onload = function() {
                            document.querySelector('#output-container').classList.remove('hidden');
                            window.print();
                        }
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        });