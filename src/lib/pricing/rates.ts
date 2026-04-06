import type { ServiceMode, MeasurementUnit } from './types';

export const BASE_RATES: Record<ServiceMode, number> = {
  sealing: 45,
  'line-marking': 22,
  pothole: 350,
  'signage-physical': 2800,
  'signage-painted': 650,
};

export const JOB_SIZE_MULTIPLIERS = {
  small: 1.25,
  medium: 1.00,
  large: 0.90,
  major: 0.80,
} as const;

export const JOB_SIZE_THRESHOLDS: Record<MeasurementUnit, { small: number; medium: number; large: number }> = {
  sqm:              { small: 200,  medium: 1000, large: 5000 },
  'linear-meters':  { small: 100,  medium: 500,  large: 2000 },
  each:             { small: 5,    medium: 20,   large: 50   },
};

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

export const URGENCY_MULTIPLIERS = {
  standard: 1.00,
  expedited: 1.20,
  emergency: 1.50,
} as const;

export const PREP_RATES: Record<ServiceMode, Record<string, number>> = {
  sealing:            { light: 8,  medium: 18,  heavy: 35,  demolition: 65  },
  'line-marking':     { light: 3,  medium: 6,   heavy: 12,  demolition: 20  },
  pothole:            { light: 50, medium: 120, heavy: 250, demolition: 400 },
  'signage-physical': { light: 0,  medium: 0,   heavy: 50,  demolition: 200 },
  'signage-painted':  { light: 5,  medium: 15,  heavy: 30,  demolition: 80  },
};

export const OVERHEAD_PERCENTAGE = 0.12;
export const CONTINGENCY_PERCENTAGE = 0.05;
export const VAT_RATE = 0.15;

export const MINIMUM_CHARGE: Record<ServiceMode, number> = {
  sealing: 3500,
  'line-marking': 2500,
  pothole: 1500,
  'signage-physical': 5000,
  'signage-painted': 2500,
};
