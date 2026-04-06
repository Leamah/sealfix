import { NextRequest, NextResponse } from 'next/server';
import { getEffectiveRates, getRateOverrides, setRateOverrides } from '@/lib/pricing/rate-store';
import type { EffectiveRates } from '@/lib/pricing/rate-store';

function checkAuth(request: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return request.headers.get('x-admin-password') === adminPassword;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({
    effective: getEffectiveRates(),
    overrides: getRateOverrides(),
  });
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: Partial<EffectiveRates> = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // Merge incoming payload with existing overrides
  const existing = getRateOverrides();

  const next: Partial<EffectiveRates> = { ...existing };

  if (body.baseRates) {
    next.baseRates = { ...(existing.baseRates ?? {}), ...body.baseRates } as EffectiveRates['baseRates'];
  }
  if (body.prepRates) {
    const merged = { ...(existing.prepRates ?? {}) };
    for (const [mode, levels] of Object.entries(body.prepRates)) {
      merged[mode as keyof typeof merged] = {
        ...((existing.prepRates as Record<string, unknown> | undefined)?.[mode] as object ?? {}),
        ...levels,
      } as EffectiveRates['prepRates'][keyof EffectiveRates['prepRates']];
    }
    next.prepRates = merged as EffectiveRates['prepRates'];
  }
  if (typeof body.overheadPct === 'number' && body.overheadPct > 0) {
    next.overheadPct = body.overheadPct;
  }
  if (typeof body.contingencyPct === 'number' && body.contingencyPct >= 0) {
    next.contingencyPct = body.contingencyPct;
  }
  if (body.jobSizeMultipliers) {
    next.jobSizeMultipliers = {
      ...(existing.jobSizeMultipliers ?? {}),
      ...body.jobSizeMultipliers,
    } as EffectiveRates['jobSizeMultipliers'];
  }
  if (body.jobSizeThresholds) {
    const merged = { ...(existing.jobSizeThresholds ?? {}) };
    for (const [unit, thresholds] of Object.entries(body.jobSizeThresholds)) {
      merged[unit as keyof typeof merged] = {
        ...((existing.jobSizeThresholds as Record<string, unknown> | undefined)?.[unit] as object ?? {}),
        ...thresholds,
      } as EffectiveRates['jobSizeThresholds'][keyof EffectiveRates['jobSizeThresholds']];
    }
    next.jobSizeThresholds = merged as EffectiveRates['jobSizeThresholds'];
  }

  setRateOverrides(next);

  return NextResponse.json({ success: true, effective: getEffectiveRates() });
}
