import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/pricing/validators';
import { appendLeadToSheet } from '@/lib/sheets';
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

  console.log('[LEAD]', JSON.stringify(lead, null, 2));

  // Write to Google Sheets (leamahgroup@gmail.com)
  try {
    await appendLeadToSheet([
      lead.id,
      lead.createdAt,
      lead.name,
      lead.company ?? '',
      lead.phone,
      lead.email,
      lead.calculatorMode,
      String(lead.estimateTotal),
      String(lead.estimateSubtotal),
      lead.region,
      String(lead.quantity),
      lead.unit,
      lead.notes ?? '',
    ]);
  } catch (err) {
    // Log but don't fail the request — lead is already captured in console
    console.error('[LEAD] Google Sheets write failed:', err);
  }

  return NextResponse.json({ success: true, id: lead.id });
}
