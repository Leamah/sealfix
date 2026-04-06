export type ServiceMode = 'sealing' | 'line-marking' | 'pothole' | 'signage';
export type MeasurementUnit = 'sqm' | 'linear-meters' | 'each';

export interface CalculatorInput {
  mode: ServiceMode;
  quantity: number;
  unit: MeasurementUnit;
  region: string;
  urgency: 'standard' | 'expedited' | 'emergency';
  accessDifficulty: 'easy' | 'moderate' | 'restricted' | 'crane';
  prepLevel: 'light' | 'medium' | 'heavy' | 'demolition';
  serviceTier: 'economy' | 'standard' | 'premium';
}

export interface CalculatorLineItem {
  label: string;
  value: number;
  note?: string;
}

export interface CalculatorResult {
  lines: CalculatorLineItem[];
  subtotal: number;
  vat: number;
  total: number;
  perUnitRate: number;
  disclaimer: string;
}
