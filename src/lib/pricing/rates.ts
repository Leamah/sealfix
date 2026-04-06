import type { ServiceMode, MeasurementUnit } from './types';

// Base rates in ZAR per unit (sqm or linear metre or each)
export const BASE_RATES: Record<ServiceMode, number> = {
  sealing: 45,
  surfacing: 180,
  'line-marking': 22,
  pothole: 350,
  signage: 1800,
};

// Job size tier multipliers (volume discounts — auto-applied based on quantity)
export const JOB_SIZE_MULTIPLIERS = {
  small: 1.25,
  medium: 1.00,
  large: 0.90,
  major: 0.80,
} as const;

// Thresholds for auto-calculating job size tier from quantity
export const JOB_SIZE_THRESHOLDS: Record<MeasurementUnit, { small: number; medium: number; large: number }> = {
  sqm:              { small: 200,  medium: 1000, large: 5000 },
  'linear-meters':  { small: 100,  medium: 500,  large: 2000 },
  each:             { small: 5,    medium: 20,   large: 50   },
};

// Regional logistics and cost-of-living adjustments
export const REGION_MULTIPLIERS: Record<string, number> = {
  johannesburg: 1.00,
  pretoria: 0.98,
  'cape-town': 1.08,
  durban: 1.05,
  'port-elizabeth': 0.95,
  bloemfontein: 0.92,
  'east-london': 0.94,
  polokwane: 0.96,
  nelspruit: 0.97,
  kimberley: 0.93,
  default: 1.00,
};

// Urgency surcharges
export const URGENCY_MULTIPLIERS = {
  standard: 1.00,
  expedited: 1.20,
  emergency: 1.50,
} as const;

// Access difficulty multipliers
export const ACCESS_MULTIPLIERS = {
  easy: 1.00,
  moderate: 1.10,
  restricted: 1.25,
  crane: 1.45,
} as const;

// Prep rates per unit in ZAR (added on top of base)
export const PREP_RATES: Record<ServiceMode, Record<string, number>> = {
  sealing: { light: 8, medium: 18, heavy: 35, demolition: 65 },
  surfacing: { light: 12, medium: 25, heavy: 50, demolition: 90 },
  'line-marking': { light: 3, medium: 6, heavy: 12, demolition: 20 },
  pothole: { light: 50, medium: 120, heavy: 250, demolition: 400 },
  signage: { light: 0, medium: 50, heavy: 150, demolition: 300 },
};

// Service tier multipliers
export const SERVICE_TIER_MULTIPLIERS = {
  economy: 0.85,
  standard: 1.00,
  premium: 1.20,
} as const;

// Overhead and contingency
export const OVERHEAD_PERCENTAGE = 0.12;
export const CONTINGENCY_PERCENTAGE = 0.05;
export const VAT_RATE = 0.15;

// Minimum charge per job (ZAR excl. VAT)
export const MINIMUM_CHARGE: Record<ServiceMode, number> = {
  sealing: 3500,
  surfacing: 8000,
  'line-marking': 2500,
  pothole: 1500,
  signage: 4000,
};
