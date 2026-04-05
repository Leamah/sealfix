import { NextRequest, NextResponse } from 'next/server';
import { calculatorInputSchema } from '@/lib/pricing/validators';
import { calculate } from '@/lib/pricing/calculator';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = calculatorInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const result = calculate(parsed.data);
  return NextResponse.json(result);
}
