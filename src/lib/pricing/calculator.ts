import type { CalculatorInput, CalculatorResult, CalculatorLineItem } from './types';
import {
  REGION_MULTIPLIERS,
  URGENCY_MULTIPLIERS,
  VAT_RATE,
  MINIMUM_CHARGE,
} from './rates';
import { getEffectiveRates, calcJobSizeTier } from './rate-store';
import { formatZAR } from '@/lib/utils';

export function calculate(input: CalculatorInput): CalculatorResult {
  const { mode, quantity, unit, region, urgency, prepLevel } = input;

  const rates = getEffectiveRates();
  const lines: CalculatorLineItem[] = [];

  // 1. Base amount
  const baseRate = rates.baseRates[mode];
  const baseAmount = baseRate * quantity;
  lines.push({
    label: 'Base rate',
    value: baseAmount,
    note: `${formatZAR(baseRate)} x ${quantity.toLocaleString('en-ZA')} units`,
  });

  // 2. Job size tier (auto-calculated)
  const jobSizeTier = calcJobSizeTier(unit, quantity);
  const sizeMultiplier = rates.jobSizeMultipliers[jobSizeTier];
  const sizeAdjusted = baseAmount * sizeMultiplier;
  const sizeAdjustment = sizeAdjusted - baseAmount;
  if (sizeAdjustment !== 0) {
    lines.push({
      label: 'Job size adjustment',
      value: sizeAdjustment,
      note: `${jobSizeTier} job (x${sizeMultiplier})`,
    });
  }

  // 3. Region adjustment
  const regionMultiplier = REGION_MULTIPLIERS[region] ?? REGION_MULTIPLIERS['default'];
  const regionAdjusted = sizeAdjusted * regionMultiplier;
  const regionAdjustment = regionAdjusted - sizeAdjusted;
  if (Math.abs(regionAdjustment) > 0) {
    lines.push({
      label: 'Regional adjustment',
      value: regionAdjustment,
      note: `${region} (x${regionMultiplier})`,
    });
  }

  // 4. Surface preparation
  const prepRate = rates.prepRates[mode][prepLevel];
  const prepCost = prepRate * quantity;
  lines.push({
    label: 'Surface preparation',
    value: prepCost,
    note: `${prepLevel} prep at ${formatZAR(prepRate)}/unit`,
  });

  // 5. Urgency surcharge
  const urgencyMultiplier = URGENCY_MULTIPLIERS[urgency];
  const urgencyAdjustment = regionAdjusted * (urgencyMultiplier - 1);
  if (urgencyAdjustment > 0) {
    lines.push({
      label: 'Urgency surcharge',
      value: urgencyAdjustment,
      note: `${urgency} scheduling`,
    });
  }

  const materialTotal = regionAdjusted + prepCost + urgencyAdjustment;

  // 6. Overhead
  const overhead = materialTotal * rates.overheadPct;
  lines.push({
    label: 'Overhead & management',
    value: overhead,
    note: `${(rates.overheadPct * 100).toFixed(0)}%`,
  });

  // 7. Contingency
  const contingency = materialTotal * rates.contingencyPct;
  lines.push({
    label: 'Contingency',
    value: contingency,
    note: `${(rates.contingencyPct * 100).toFixed(0)}%`,
  });

  // 8. Subtotal (enforce minimum)
  const rawSubtotal = materialTotal + overhead + contingency;
  const minimum = MINIMUM_CHARGE[mode];
  const subtotal = Math.max(rawSubtotal, minimum);

  // 9. VAT
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;
  const perUnitRate = subtotal / quantity;

  return {
    lines,
    subtotal,
    vat,
    total,
    perUnitRate,
    disclaimer:
      'This estimate is indicative only and subject to on-site inspection. Final pricing will be confirmed in a written quote. All prices include VAT at 15%.',
  };
}

/** Upper-bound estimate: emergency urgency + heavy prep, for range display */
export function calculateHigh(input: CalculatorInput): CalculatorResult {
  return calculate({ ...input, urgency: 'emergency', prepLevel: 'heavy' });
}

/** True when the input is already at the highest settings — no range needed */
export function isAtHighEnd(input: CalculatorInput): boolean {
  return input.urgency === 'emergency' && input.prepLevel === 'heavy';
}
