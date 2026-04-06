/**
 * Central runtime rate store.
 * Defaults come from rates.ts; admin can override at runtime via /api/admin/rates.
 * Overrides live in-process (lost on redeploy). Set RATE_OVERRIDE_* env vars to persist.
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

// In-process override cache
let _overrides: Partial<EffectiveRates> = {};

export function setRateOverrides(overrides: Partial<EffectiveRates>): void {
  _overrides = overrides;
}

export function getRateOverrides(): Partial<EffectiveRates> {
  return _overrides;
}

export function getEffectiveRates(): EffectiveRates {
  const MODES: ServiceMode[] = ['sealing', 'line-marking', 'pothole', 'signage-physical', 'signage-painted'];

  const baseRates = { ...BASE_RATES, ..._overrides.baseRates };

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

  return {
    baseRates,
    prepRates,
    overheadPct: _overrides.overheadPct ?? OVERHEAD_PERCENTAGE,
    contingencyPct: _overrides.contingencyPct ?? CONTINGENCY_PERCENTAGE,
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
