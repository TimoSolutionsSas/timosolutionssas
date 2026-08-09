/**
 * TI.MO SOLUTIONS — recibe los envíos del formulario de contacto y de la
 * suscripción de novedades del sitio web, y los guarda en Google Sheets.
 *
 * Instalación: ver README.md en esta misma carpeta.
 */

var CONTACT_SHEET_NAME = "Contactos";
var NEWSLETTER_SHEET_NAME = "Suscripciones";

var CONTACT_HEADERS = [
  "Fecha",
  "Hora",
  "Nombre",
  "Apellido",
  "Correo",
  "Celular",
  "Ciudad",
  "Tipo de equipo",
  "Mensaje",
  "IP",
];

var NEWSLETTER_HEADERS = ["Fecha", "Hora", "Correo"];

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    if (payload.type === "newsletter") {
      appendNewsletterRow(payload);
    } else {
      appendContactRow(payload);
    }

    return jsonResponse({ result: "success" });
  } catch (error) {
    return jsonResponse({ result: "error", message: error.message });
  }
}

function appendContactRow(payload) {
  var sheet = getOrCreateSheet(CONTACT_SHEET_NAME, CONTACT_HEADERS);
  sheet.appendRow([
    payload.date || "",
    payload.time || "",
    payload.firstName || "",
    payload.lastName || "",
    payload.email || "",
    payload.phone || "",
    payload.city || "",
    payload.equipmentType || "",
    payload.message || "",
    payload.ip || "",
  ]);
}

function appendNewsletterRow(payload) {
  var sheet = getOrCreateSheet(NEWSLETTER_SHEET_NAME, NEWSLETTER_HEADERS);
  sheet.appendRow([payload.date || "", payload.time || "", payload.email || ""]);
}

function getOrCreateSheet(name, headers) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }

  return sheet;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
