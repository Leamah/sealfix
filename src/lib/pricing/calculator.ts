import type { CalculatorInput, CalculatorResult, CalculatorLineItem } from './types';
import {
  REGION_MULTIPLIERS,
  URGENCY_MULTIPLIERS,
  ACCESS_MULTIPLIERS,
  SERVICE_TIER_MULTIPLIERS,
  VAT_RATE,
  MINIMUM_CHARGE,
} from './rates';
import { getEffectiveRates, calcJobSizeTier } from './rate-store';
import { formatZAR } from '@/lib/utils';

export function calculate(input: CalculatorInput): CalculatorResult {
  const {
    mode,
    quantity,
    unit,
    region,
    urgency,
    accessDifficulty,
    prepLevel,
    serviceTier,
  } = input;

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

  // 2. Job size tier (auto-calculated from quantity)
  const jobSizeTier = calcJobSizeTier(unit, quantity);
  const sizeMultiplier = rates.jobSizeMultipliers[jobSizeTier];
  const sizeAdjusted = baseAmount * sizeMultiplier;
  const tierAdjustment = sizeAdjusted - baseAmount;
  if (tierAdjustment !== 0) {
    lines.push({
      label: 'Job size adjustment',
      value: tierAdjustment,
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

  // 4. Service tier
  const tierMultiplier = SERVICE_TIER_MULTIPLIERS[serviceTier];
  const tierAdjusted = regionAdjusted * tierMultiplier;
  const serviceTierAdjustment = tierAdjusted - regionAdjusted;
  if (serviceTierAdjustment !== 0) {
    lines.push({
      label: 'Service tier',
      value: serviceTierAdjustment,
      note: `${serviceTier} (x${tierMultiplier})`,
    });
  }

  // 5. Surface preparation
  const prepRate = rates.prepRates[mode][prepLevel];
  const prepCost = prepRate * quantity;
  lines.push({
    label: 'Surface preparation',
    value: prepCost,
    note: `${prepLevel} prep at ${formatZAR(prepRate)}/unit`,
  });

  // 6. Access surcharge
  const accessMultiplier = ACCESS_MULTIPLIERS[accessDifficulty];
  const accessAdjustment = tierAdjusted * (accessMultiplier - 1);
  if (accessAdjustment > 0) {
    lines.push({
      label: 'Access surcharge',
      value: accessAdjustment,
      note: `${accessDifficulty} access`,
    });
  }

  // 7. Urgency surcharge
  const urgencyMultiplier = URGENCY_MULTIPLIERS[urgency];
  const urgencyAdjustment = tierAdjusted * (urgencyMultiplier - 1);
  if (urgencyAdjustment > 0) {
    lines.push({
      label: 'Urgency surcharge',
      value: urgencyAdjustment,
      note: `${urgency} scheduling`,
    });
  }

  const materialTotal = tierAdjusted + prepCost + accessAdjustment + urgencyAdjustment;

  // 8. Overhead
  const overhead = materialTotal * rates.overheadPct;
  lines.push({
    label: 'Overhead & management',
    value: overhead,
    note: `${(rates.overheadPct * 100).toFixed(0)}%`,
  });

  // 9. Contingency
  const contingency = materialTotal * rates.contingencyPct;
  lines.push({
    label: 'Contingency',
    value: contingency,
    note: `${(rates.contingencyPct * 100).toFixed(0)}%`,
  });

  // 10. Subtotal (enforce minimum)
  const rawSubtotal = materialTotal + overhead + contingency;
  const minimum = MINIMUM_CHARGE[mode];
  const subtotal = Math.max(rawSubtotal, minimum);

  // 11. VAT
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
