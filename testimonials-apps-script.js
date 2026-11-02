// Google Apps Script template for sharing testimonials from your portfolio site.
// Steps:
// 1. Create a new Google Sheet and name the first row columns:
//    Name | Email | Role | Message | Rating | Date | Status
// 2. Copy this script into Apps Script (script.google.com), replace SPREADSHEET_ID,
//    then deploy as a Web App with "Execute as: Me" and "Who has access: Anyone".
// 3. Paste the Web App URL into the testimonial form's data-testimonials-endpoint attribute.

const SPREADSHEET_ID = '1_j_6kMrGyPBwzubXc7qNHCUEiKee5wMAzVWP_-xw35I';
const SHEET_NAME = 'Testimonials';

function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['Name', 'Email', 'Role', 'Message', 'Rating', 'Date', 'Status']);
  }
  return sheet;
}

function doGet(e) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getDisplayValues();
  if (!rows.length) {
    return ContentService.createTextOutput('[]').setMimeType(ContentService.MimeType.JSON);
  }

  const headers = rows[0];
  const testimonials = rows.slice(1)
    .filter(row => row.some(cell => String(cell).trim()))
    .map(row => {
      const item = {};
      headers.forEach((header, index) => {
        item[header.toLowerCase().replace(/\s+/g, '_')] = row[index] || '';
      });
      return item;
    })
    .filter(item => String(item.status || '').toLowerCase() !== 'rejected')
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return ContentService.createTextOutput(JSON.stringify(testimonials))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const payload = parsePayload(e);
  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim();
  const role = String(payload.role || '').trim() || 'Client';
  const message = String(payload.message || '').trim();
  const rating = String(payload.rating || '5').trim();
  const date = String(payload.date || new Date().toISOString()).trim();
  const status = 'approved';

  if (!name || !email || !message) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'Missing required fields' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = getSheet();
  sheet.appendRow([name, email, role, message, rating, date, status]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  try {
    const parsed = JSON.parse(e.postData.contents);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch (err) {
    // fall through to form parameters
  }

  const params = e.parameter || {};
  const result = {};
  Object.keys(params).forEach(key => {
    const value = params[key];
    result[key] = Array.isArray(value) ? value[0] : value;
  });
  return result;
}
