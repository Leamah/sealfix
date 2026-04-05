import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/pricing/validators';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed.data,
  };

  // Log to console (Phase 2: replace with database / email service)
  console.log('[LEAD]', JSON.stringify(lead, null, 2));

  // TODO Phase 2: send email via Resend or nodemailer
  // await sendLeadEmail(lead);

  return NextResponse.json({ success: true, id: lead.id });
}
