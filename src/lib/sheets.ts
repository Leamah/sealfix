/**
 * Appends a lead row to Google Sheets via a Google Apps Script web app.
 *
 * No service account key required — uses a simple HTTP POST to your Apps Script URL.
 *
 * Setup (one time):
 *   1. Open your Google Sheet > Extensions > Apps Script
 *   2. Paste the doPost() function from the project README / .env.local.example
 *   3. Deploy > New deployment > Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   4. Copy the deployment URL and add it as:
 *      GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/...../exec
 *
 * The sheet should have a tab named "Leads" (or the first tab will be used).
 */
export async function appendLeadToSheet(row: string[]): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('[sheets] GOOGLE_SHEETS_WEBHOOK_URL not set — skipping sheet write');
    return;
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ row }),
  });

  if (!res.ok) {
    throw new Error(`Sheets webhook responded with ${res.status}`);
  }
}
