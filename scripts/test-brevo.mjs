// Quick Brevo send test — run with:
//   BREVO_API_KEY=xkeysib-... LEAD_NOTIFY_EMAIL=you@example.com node scripts/test-brevo.mjs

import { BrevoClient, BrevoEnvironment } from '@getbrevo/brevo';

const apiKey = process.env.BREVO_API_KEY;
const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;

if (!apiKey) { console.error('❌  Set BREVO_API_KEY env var'); process.exit(1); }
if (!notifyEmail) { console.error('❌  Set LEAD_NOTIFY_EMAIL env var'); process.exit(1); }

console.log(`🔑  Key prefix : ${apiKey.slice(0, 16)}…`);
console.log(`📬  Sending to : ${notifyEmail}`);

const client = new BrevoClient({ apiKey, environment: BrevoEnvironment.Default });

try {
  const res = await client.transactionalEmails.sendTransacEmail({
    sender: { name: 'SealFix SA', email: 'noreply@mail.sealfix.co.za' },
    to: [{ email: notifyEmail }],
    subject: 'SealFix SA — Brevo test ✅',
    htmlContent: '<p>Brevo integration is working correctly. This is a test email from SealFix SA.</p>',
    textContent: 'Brevo integration is working correctly. This is a test email from SealFix SA.',
  });
  console.log('✅  Sent! Message ID:', res.data?.messageId ?? JSON.stringify(res.data));
} catch (err) {
  console.error('❌  Send failed:');
  console.error(err?.message ?? err);
  if (err?.body) console.error('    Response body:', JSON.stringify(err.body, null, 2));
}
