document.addEventListener("DOMContentLoaded", function () {
    const copiaParaSelect = document.getElementById("copia-para");
    const customCopyContainer = document.getElementById("custom-copy-container");
  
    // Mostrar u ocultar campo personalizado
    copiaParaSelect.addEventListener("change", function () {
      customCopyContainer.style.display = copiaParaSelect.value === "otro" ? "block" : "none";
    });
  
    document.getElementById("print-button").addEventListener("click", function () {
      const dateInput = document.getElementById("date").value;
      const registroDe = document.getElementById("registro-de").value;
      const copiaPara = document.getElementById("copia-para").value;
      const customCopy = document.getElementById("custom-copy").value;
      const notary = document.getElementById("notary").value;
  
      if (!dateInput || !registroDe || !copiaPara || !notary || (copiaPara === "otro" && !customCopy)) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
      }
  
      const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];
  
      const currentDate = new Date();
      const formattedDate = `${currentDate.getUTCDate()} DE ${monthNames[currentDate.getUTCMonth()].toUpperCase()} DE ${currentDate.getUTCFullYear()}`;
  
      const notaryNames = {
        notary1: "FRANCISCO JAVIER HINCAPIE AGUDELO",
        notary2: "LUZ HELIDA OCAMPO VILLA",
        notary3: "SARA LUZ ARBOLEDA CARMONA"
      };
  
      const notaryTitle = notary === "notary1"
        ? "NOTARIA ÚNICA DEL CÍRCULO DEL RETIRO, ANTIOQUIA."
        : "NOTARIA ENCARGADA DEL MUNICIPIO DE EL RETIRO ANTIOQUIA.";
  
      const registroMayus = registroDe.toUpperCase();
      const copiaTexto = copiaPara === "interesado"
        ? "INTERESADO"
        : customCopy.toUpperCase();
  
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Sello Notarial</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 12px;
              text-align: center;
              margin: 40px;
            }
            .container {
              border: 1px solid #000;
              padding: 30px;
              width: 70%;
              margin: auto;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <strong>NOTARIA ÚNICA DEL RETIRO, ANTIOQUIA.</strong><br><br>
            ES FIEL COPIA TOMADA DEL FOLIO ORIGINAL DEL REGISTRO CIVIL DE <strong>${registroMayus}</strong> QUE REPOSA EN NUESTRO ARCHIVO DEBIDAMENTE PROTOCOLIZADO.<br>
            SE EXPIDE PARA EFECTOS CIVILES, LEGALES Y/O JUDICIALES.<br><br>
            COPIA PARA:<br>
            ${copiaTexto}<br><br>
            DESTINADO: CIVILES, LEGALES Y/O JUDICIALES<br>
            ARTÍCULO 115. DECRETO 1260/70<br><br>
            ${formattedDate}.<br><br>
            <img src="img/logo.png" alt="Logo" style="width: 100px;"><br><br>
            ${notaryNames[notary]}<br>
            ${notaryTitle}
          </div>
  
          <script>
            window.onload = function () {
              window.print();
            }
          </script>
        </body>
        </html>
      `;
  
      const printWindow = window.open('', '_blank');
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    });
  });
  