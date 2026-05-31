import { BrevoClient, BrevoEnvironment } from '@getbrevo/brevo';

const FROM_EMAIL = 'noreply@mail.sealfix.co.za';
const FROM_NAME = 'SealFix SA';

function getClient(): BrevoClient {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error('BREVO_API_KEY env var is not set');
  return new BrevoClient({ apiKey, environment: BrevoEnvironment.Default });
}

export interface LeadEmailData {
  id: string;
  createdAt: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  calculatorMode: string;
  estimateTotal: number;
  estimateSubtotal: number;
  region: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export async function sendLeadNotification(lead: LeadEmailData): Promise<void> {
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;
  if (!notifyEmail) throw new Error('LEAD_NOTIFY_EMAIL env var is not set');

  const client = getClient();

  const vatAmount = lead.estimateTotal - lead.estimateSubtotal;
  const modeLabel = lead.calculatorMode
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #1a1a1a; background: #f5f5f5; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { background: #1c1c1e; padding: 24px 32px; }
    .header h1 { color: #f5a623; margin: 0; font-size: 20px; }
    .header p { color: #a0a0a0; margin: 4px 0 0; font-size: 13px; }
    .body { padding: 32px; }
    .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin: 24px 0 8px; }
    .section-title:first-child { margin-top: 0; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px 0; font-size: 14px; vertical-align: top; }
    td:first-child { color: #666; width: 140px; }
    td:last-child { font-weight: 500; }
    .divider { border: none; border-top: 1px solid #e8e8e8; margin: 20px 0; }
    .estimate-row td { font-size: 15px; }
    .estimate-row.total td { font-size: 17px; font-weight: 700; color: #1c1c1e; }
    .footer { background: #f5f5f5; padding: 16px 32px; font-size: 12px; color: #999; text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Lead &mdash; SealFix SA</h1>
      <p>${lead.createdAt} &nbsp;&middot;&nbsp; ID: ${lead.id}</p>
    </div>
    <div class="body">
      <p class="section-title">Contact</p>
      <table>
        <tr><td>Name</td><td>${lead.name}</td></tr>
        ${lead.company ? `<tr><td>Company</td><td>${lead.company}</td></tr>` : ''}
        <tr><td>Phone</td><td><a href="tel:${lead.phone}" style="color:#f5a623">${lead.phone}</a></td></tr>
        <tr><td>Email</td><td><a href="mailto:${lead.email}" style="color:#f5a623">${lead.email}</a></td></tr>
      </table>

      <hr class="divider" />

      <p class="section-title">Job Details</p>
      <table>
        <tr><td>Service</td><td>${modeLabel}</td></tr>
        <tr><td>Region</td><td>${lead.region}</td></tr>
        <tr><td>Quantity</td><td>${lead.quantity} ${lead.unit}</td></tr>
        ${lead.notes ? `<tr><td>Notes</td><td>${lead.notes}</td></tr>` : ''}
      </table>

      <hr class="divider" />

      <p class="section-title">Estimate</p>
      <table>
        <tr class="estimate-row"><td>Subtotal</td><td>R ${lead.estimateSubtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</td></tr>
        <tr class="estimate-row"><td>VAT (15%)</td><td>R ${vatAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</td></tr>
        <tr class="estimate-row total"><td>Total</td><td>R ${lead.estimateTotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</td></tr>
      </table>
    </div>
    <div class="footer">SealFix SA &nbsp;&middot;&nbsp; sealfix.co.za &nbsp;&middot;&nbsp; This is an automated notification.</div>
  </div>
</body>
</html>
`.trim();

  const textContent = [
    `New Lead — SealFix SA`,
    `ID: ${lead.id}  |  ${lead.createdAt}`,
    ``,
    `CONTACT`,
    `Name:    ${lead.name}`,
    lead.company ? `Company: ${lead.company}` : null,
    `Phone:   ${lead.phone}`,
    `Email:   ${lead.email}`,
    ``,
    `JOB`,
    `Service:  ${modeLabel}`,
    `Region:   ${lead.region}`,
    `Quantity: ${lead.quantity} ${lead.unit}`,
    lead.notes ? `Notes:    ${lead.notes}` : null,
    ``,
    `ESTIMATE`,
    `Subtotal: R ${lead.estimateSubtotal.toFixed(2)}`,
    `VAT 15%:  R ${vatAmount.toFixed(2)}`,
    `Total:    R ${lead.estimateTotal.toFixed(2)}`,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [{ email: notifyEmail }],
    replyTo: { email: lead.email, name: lead.name },
    subject: `New Lead: ${lead.name} — ${modeLabel} (R ${lead.estimateTotal.toLocaleString('en-ZA')})`,
    htmlContent,
    textContent,
  });
}
