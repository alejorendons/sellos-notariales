# Sellos Notariales - Imprimir

Este proyecto permite generar un documento que simula un sello notarial basado en la información proporcionada por el usuario a través de un formulario HTML. El código utiliza JavaScript para recopilar los datos y formatearlos adecuadamente para su impresión.

## Funcionalidad

Cuando el usuario hace clic en el botón de imprimir, el siguiente proceso ocurre:

1. **Recopilación de Datos:**
   - El código obtiene los valores de varios campos del formulario:
     - Número del documento.
     - Fecha de emisión.
     - Número de folios.
     - Número de anexos.
     - Notario seleccionado.
     - Destinatario de la copia.

2. **Formato de Fecha:**
   - La fecha se formatea en un formato legible, usando los nombres de los meses en español.

3. **Conversión de Números a Palabras:**
   - Se implementa una función `numberToWords` que convierte números en su representación en palabras en español, para ser utilizada en la descripción del número de folios y anexos.

4. **Generación del Contenido del Documento:**
   - Se construye el contenido del documento que incluye:
     - Encabezado con información del notariado y fecha.
     - Cuerpo del documento que detalla la cantidad de folios y anexos.
     - Firma del notario o de la notaría encargada.

5. **Apertura de Ventana de Impresión:**
   - Se crea una nueva ventana en el navegador que contiene el documento formateado.
   - Se aplica un estilo básico para el documento y se oculta inicialmente el contenido.
   - Una vez cargado, se muestra el contenido y se llama a la función de impresión del navegador.

## Estilo

El documento impreso tiene un estilo simple, centrado y bien estructurado. Se utilizan márgenes y espaciado para garantizar que la presentación sea clara y profesional.

## Uso

Para utilizar este código, simplemente integra el JavaScript en tu archivo HTML donde tengas el formulario correspondiente. Asegúrate de que los elementos del formulario tengan los IDs correctos para que el código pueda acceder a ellos.
