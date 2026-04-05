import type { CalculatorInput, CalculatorResult, CalculatorLineItem } from './types';
import {
  BASE_RATES,
  JOB_SIZE_MULTIPLIERS,
  REGION_MULTIPLIERS,
  URGENCY_MULTIPLIERS,
  ACCESS_MULTIPLIERS,
  PREP_RATES,
  SERVICE_TIER_MULTIPLIERS,
  OVERHEAD_PERCENTAGE,
  CONTINGENCY_PERCENTAGE,
  VAT_RATE,
  MINIMUM_CHARGE,
} from './rates';
import { formatZAR } from '@/lib/utils';

export function calculate(input: CalculatorInput): CalculatorResult {
  const {
    mode,
    quantity,
    jobSizeTier,
    region,
    urgency,
    accessDifficulty,
    prepLevel,
    serviceTier,
  } = input;

  const lines: CalculatorLineItem[] = [];

  // 1. Base amount
  const baseRate = BASE_RATES[mode];
  const baseAmount = baseRate * quantity;
  lines.push({
    label: 'Base rate',
    value: baseAmount,
    note: `${formatZAR(baseRate)} × ${quantity.toLocaleString('en-ZA')} units`,
  });

  // 2. Job size tier adjustment
  const sizeMultiplier = JOB_SIZE_MULTIPLIERS[jobSizeTier];
  const sizeAdjusted = baseAmount * sizeMultiplier;
  const tierAdjustment = sizeAdjusted - baseAmount;
  if (tierAdjustment !== 0) {
    lines.push({
      label: 'Job size adjustment',
      value: tierAdjustment,
      note: `${jobSizeTier} tier (×${sizeMultiplier})`,
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
      note: `${region} region (×${regionMultiplier})`,
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
      note: `${serviceTier} (×${tierMultiplier})`,
    });
  }

  // 5. Prep cost
  const prepRate = PREP_RATES[mode][prepLevel];
  const prepCost = prepRate * quantity;
  lines.push({
    label: 'Surface preparation',
    value: prepCost,
    note: `${prepLevel} prep — ${formatZAR(prepRate)}/unit`,
  });

  // 6. Access adjustment
  const accessMultiplier = ACCESS_MULTIPLIERS[accessDifficulty];
  const accessAdjustment = tierAdjusted * (accessMultiplier - 1);
  if (accessAdjustment > 0) {
    lines.push({
      label: 'Access surcharge',
      value: accessAdjustment,
      note: `${accessDifficulty} access`,
    });
  }

  // 7. Urgency adjustment
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
  const overhead = materialTotal * OVERHEAD_PERCENTAGE;
  lines.push({
    label: 'Overhead & management',
    value: overhead,
    note: `${(OVERHEAD_PERCENTAGE * 100).toFixed(0)}%`,
  });

  // 9. Contingency
  const contingency = materialTotal * CONTINGENCY_PERCENTAGE;
  lines.push({
    label: 'Contingency',
    value: contingency,
    note: `${(CONTINGENCY_PERCENTAGE * 100).toFixed(0)}%`,
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
