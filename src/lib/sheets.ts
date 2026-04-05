import { google } from 'googleapis';

/**
 * Appends a row to the leads Google Sheet.
 *
 * Required environment variables:
 *   GOOGLE_SHEETS_SPREADSHEET_ID  — the ID from the Sheet URL
 *   GOOGLE_SERVICE_ACCOUNT_JSON   — base64-encoded service account JSON key
 *
 * Setup:
 *   1. Create a Google Sheet and share it (Editor access) with the service account email.
 *   2. Note the spreadsheet ID from the URL.
 *   3. base64-encode the service account JSON:
 *        node -e "console.log(Buffer.from(require('fs').readFileSync('sa.json')).toString('base64'))"
 *   4. Add both env vars to .env.local (dev) or Vercel dashboard (prod).
 */
export async function appendLeadToSheet(row: string[]): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const saJsonB64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!spreadsheetId || !saJsonB64) {
    console.warn('[sheets] Missing GOOGLE_SHEETS_SPREADSHEET_ID or GOOGLE_SERVICE_ACCOUNT_JSON — skipping sheet write');
    return;
  }

  const saJson = JSON.parse(Buffer.from(saJsonB64, 'base64').toString('utf-8'));

  const auth = new google.auth.GoogleAuth({
    credentials: saJson,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Leads!A:Z',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  });
}
