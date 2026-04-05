import { NextRequest, NextResponse } from 'next/server';
import { BASE_RATES } from '@/lib/pricing/rates';
import type { ServiceMode } from '@/lib/pricing/types';

// In-process cache — lasts for the lifetime of the serverless function instance.
// For persistent overrides, set RATE_OVERRIDE_* env vars (see .env.local.example).
// Re-deploy after changing env vars to apply them globally.
let runtimeOverrides: Partial<Record<ServiceMode, number>> = {};

function getRates(): Record<ServiceMode, number> {
  const rates = { ...BASE_RATES };
  const modes: ServiceMode[] = ['sealing', 'surfacing', 'line-marking', 'pothole', 'signage'];
  for (const mode of modes) {
    const envKey = `RATE_OVERRIDE_${mode.toUpperCase().replace('-', '_')}`;
    const envVal = process.env[envKey];
    if (envVal) {
      const parsed = parseFloat(envVal);
      if (!isNaN(parsed)) rates[mode] = parsed;
    }
    if (runtimeOverrides[mode] !== undefined) {
      rates[mode] = runtimeOverrides[mode]!;
    }
  }
  return rates;
}

function checkAuth(request: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false; // must set ADMIN_PASSWORD env var
  const authHeader = request.headers.get('x-admin-password');
  return authHeader === adminPassword;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ rates: getRates(), runtimeOverrides });
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.rates !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const modes: ServiceMode[] = ['sealing', 'surfacing', 'line-marking', 'pothole', 'signage'];
  for (const mode of modes) {
    if (body.rates[mode] !== undefined) {
      const val = parseFloat(body.rates[mode]);
      if (!isNaN(val) && val > 0) {
        runtimeOverrides[mode] = val;
      }
    }
  }

  return NextResponse.json({ success: true, rates: getRates() });
}
