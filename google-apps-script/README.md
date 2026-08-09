# Conectar el formulario de contacto a Google Sheets

Esta guía te permite conectar el formulario de contacto (y la suscripción de
novedades del footer) del sitio de TI.MO SOLUTIONS a una hoja de cálculo de
Google, sin necesidad de un backend tradicional.

## 1. Crear la hoja de cálculo

1. Entra a [Google Sheets](https://sheets.google.com) con la cuenta de
   Google que quieras usar para la empresa.
2. Crea una hoja de cálculo nueva y ponle un nombre, por ejemplo
   `TI.MO SOLUTIONS - Contactos`.

## 2. Pegar el script

1. Dentro de la hoja de cálculo, ve a **Extensiones → Apps Script**.
2. Borra el contenido de `Code.gs` que aparece por defecto.
3. Copia y pega el contenido del archivo [`Code.gs`](./Code.gs) de esta
   carpeta.
4. Guarda el proyecto (ícono de disquete o `Ctrl+S`). Puedes ponerle un
   nombre como "TI.MO Contacto".

El script crea automáticamente dos pestañas la primera vez que recibe un
envío: `Contactos` (formulario de contacto) y `Suscripciones` (novedades del
footer), cada una con sus encabezados.

## 3. Publicar como aplicación web

1. En el editor de Apps Script, haz clic en **Implementar → Nueva
   implementación**.
2. En "Selecciona el tipo", elige **Aplicación web**.
3. Configura:
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** Cualquier usuario
4. Haz clic en **Implementar**.
5. Google te pedirá autorizar permisos la primera vez — acepta los
   permisos solicitados (son necesarios para que el script pueda escribir
   en tu hoja de cálculo).
6. Copia la **URL de la aplicación web** que te entrega Google al finalizar
   (termina en `/exec`).

## 4. Configurar el sitio web

1. En la raíz del proyecto, crea (o edita) el archivo `.env` a partir de
   `.env.example`.
2. Pega la URL copiada en la variable:

   ```
   VITE_GOOGLE_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
   ```

3. Si vas a publicar el sitio con GitHub Actions, agrega esta misma URL
   como *secret* del repositorio con el nombre
   `VITE_GOOGLE_SHEETS_ENDPOINT` (Settings → Secrets and variables →
   Actions), junto con `VITE_WHATSAPP_NUMBER`.
4. Reinicia el servidor de desarrollo (`npm run dev`) o vuelve a construir
   el sitio (`npm run build`) para que tome la nueva variable.

## 5. Volver a implementar tras cambios en el script

Si en el futuro modificas `Code.gs`, debes crear una **nueva versión** de
la implementación (Implementar → Gestionar implementaciones → ✏️ → Versión:
Nueva versión → Implementar) para que los cambios entren en efecto; guardar
el archivo por sí solo no actualiza la URL publicada.
