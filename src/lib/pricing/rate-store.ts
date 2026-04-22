/**
 * Central runtime rate store.
 *
 * Priority (highest wins):
 *   1. In-process `_overrides` set by the admin UI (lost on redeploy / new serverless instance)
 *   2. Environment variables (RATE_OVERRIDE_*) — the *persistent* admin channel
 *   3. Hard-coded defaults in rates.ts
 *
 * Env vars recognised (set in Vercel > Project Settings > Environment Variables):
 *   RATE_OVERRIDE_BASE_SEALING           (ZAR/m²)
 *   RATE_OVERRIDE_BASE_LINE_MARKING      (ZAR/lm)
 *   RATE_OVERRIDE_BASE_POTHOLE           (ZAR/each)
 *   RATE_OVERRIDE_BASE_SIGNAGE_PHYSICAL  (ZAR/sign)
 *   RATE_OVERRIDE_BASE_SIGNAGE_PAINTED   (ZAR/symbol)
 *   RATE_OVERRIDE_OVERHEAD_PCT           (e.g. 0.12 for 12%)
 *   RATE_OVERRIDE_CONTINGENCY_PCT        (e.g. 0.05 for 5%)
 */

import type { ServiceMode, MeasurementUnit } from './types';
import {
  BASE_RATES,
  PREP_RATES,
  JOB_SIZE_MULTIPLIERS,
  JOB_SIZE_THRESHOLDS,
  OVERHEAD_PERCENTAGE,
  CONTINGENCY_PERCENTAGE,
} from './rates';

export interface PrepLevels {
  light: number;
  medium: number;
  heavy: number;
  demolition: number;
}

export interface TierMultipliers {
  small: number;
  medium: number;
  large: number;
  major: number;
}

export interface TierThresholds {
  small: number;
  medium: number;
  large: number;
}

export interface EffectiveRates {
  baseRates: Record<ServiceMode, number>;
  prepRates: Record<ServiceMode, PrepLevels>;
  overheadPct: number;
  contingencyPct: number;
  jobSizeMultipliers: TierMultipliers;
  jobSizeThresholds: Record<MeasurementUnit, TierThresholds>;
}

// In-process override cache (session-scoped; lost on redeploy)
let _overrides: Partial<EffectiveRates> = {};

export function setRateOverrides(overrides: Partial<EffectiveRates>): void {
  _overrides = overrides;
}

export function getRateOverrides(): Partial<EffectiveRates> {
  return _overrides;
}

function envNum(key: string): number | undefined {
  const raw = process.env[key];
  if (!raw) return undefined;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : undefined;
}

/** Read base-rate overrides from env vars — returns only the keys that are set. */
function envBaseRates(): Partial<Record<ServiceMode, number>> {
  const out: Partial<Record<ServiceMode, number>> = {};
  const e = {
    sealing: envNum('RATE_OVERRIDE_BASE_SEALING'),
    'line-marking': envNum('RATE_OVERRIDE_BASE_LINE_MARKING'),
    pothole: envNum('RATE_OVERRIDE_BASE_POTHOLE'),
    'signage-physical': envNum('RATE_OVERRIDE_BASE_SIGNAGE_PHYSICAL'),
    'signage-painted': envNum('RATE_OVERRIDE_BASE_SIGNAGE_PAINTED'),
  };
  (Object.keys(e) as ServiceMode[]).forEach((k) => {
    if (e[k] !== undefined) out[k] = e[k];
  });
  return out;
}

export function getEffectiveRates(): EffectiveRates {
  const MODES: ServiceMode[] = ['sealing', 'line-marking', 'pothole', 'signage-physical', 'signage-painted'];

  // Merge order: defaults  <  env vars  <  in-process overrides
  const baseRates = {
    ...BASE_RATES,
    ...envBaseRates(),
    ..._overrides.baseRates,
  } as Record<ServiceMode, number>;

  const prepRates = Object.fromEntries(
    MODES.map((mode) => [
      mode,
      { ...PREP_RATES[mode], ..._overrides.prepRates?.[mode] } as PrepLevels,
    ])
  ) as Record<ServiceMode, PrepLevels>;

  const jobSizeMultipliers: TierMultipliers = {
    ...JOB_SIZE_MULTIPLIERS,
    ..._overrides.jobSizeMultipliers,
  };

  const jobSizeThresholds: Record<MeasurementUnit, TierThresholds> = {
    sqm: { ...JOB_SIZE_THRESHOLDS.sqm, ..._overrides.jobSizeThresholds?.sqm },
    'linear-meters': { ...JOB_SIZE_THRESHOLDS['linear-meters'], ..._overrides.jobSizeThresholds?.['linear-meters'] },
    each: { ...JOB_SIZE_THRESHOLDS.each, ..._overrides.jobSizeThresholds?.each },
  };

  const envOverhead = envNum('RATE_OVERRIDE_OVERHEAD_PCT');
  const envContingency = envNum('RATE_OVERRIDE_CONTINGENCY_PCT');

  return {
    baseRates,
    prepRates,
    overheadPct: _overrides.overheadPct ?? envOverhead ?? OVERHEAD_PERCENTAGE,
    contingencyPct: _overrides.contingencyPct ?? envContingency ?? CONTINGENCY_PERCENTAGE,
    jobSizeMultipliers,
    jobSizeThresholds,
  };
}

/** Auto-determine job size tier from quantity + unit using current effective thresholds */
export function calcJobSizeTier(
  unit: MeasurementUnit,
  quantity: number
): 'small' | 'medium' | 'large' | 'major' {
  const t = getEffectiveRates().jobSizeThresholds[unit];
  if (quantity < t.small) return 'small';
  if (quantity < t.medium) return 'medium';
  if (quantity < t.large) return 'large';
  return 'major';
}
