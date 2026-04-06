'use client';

import { useState, useMemo } from 'react';
import type { CalculatorInput, ServiceMode, CalculatorResult } from '@/lib/pricing/types';
import { calculate, calculateHigh } from '@/lib/pricing/calculator';
import { ModeSelector } from './ModeSelector';
import { TandCsGate } from './TandCsGate';
import { LeadCaptureForm } from './LeadCaptureForm';
import { formatZAR } from '@/lib/utils';
import { AREAS } from '@/lib/content/areas';
import { Label } from '@/components/ui/label';
import { MINIMUM_CHARGE } from '@/lib/pricing/rates';

const UNIT_FOR_MODE: Record<ServiceMode, CalculatorInput['unit']> = {
  sealing: 'sqm',
  'line-marking': 'linear-meters',
  pothole: 'each',
  'signage-physical': 'each',
  'signage-painted': 'each',
};

const UNIT_LABELS: Record<ServiceMode, string> = {
  sealing: 'Sealing area (m²)',
  'line-marking': 'Line marking (linear metres)',
  pothole: 'Number of potholes',
  'signage-physical': 'Number of signs to erect',
  'signage-painted': 'Number of painted symbols',
};

const selectClass =
  'w-full rounded border border-charcoal-600 bg-charcoal-700 px-3 py-2 text-sm text-sand-100 focus:border-ember-500 focus:outline-none focus:ring-1 focus:ring-ember-500';

function buildInput(mode: ServiceMode, region: string, urgency: CalculatorInput['urgency']): CalculatorInput {
  return {
    mode,
    quantity: mode === 'signage-physical' || mode === 'signage-painted' ? 5 : mode === 'pothole' ? 3 : 500,
    unit: UNIT_FOR_MODE[mode],
    region,
    urgency,
    prepLevel: 'light',
  };
}

function RangeLine({ low, high, label, bold }: { low: number; high: number; label: string; bold?: boolean }) {
  const showRange = high > low + 1;
  const valueClass = bold ? 'font-bold text-ember-400' : 'text-sand-100';
  return (
    <div className={`flex justify-between ${bold ? 'rounded bg-ember-600/10 px-2 py-2 text-base' : ''}`}>
      <span className={bold ? 'text-sand-100 font-bold' : 'text-sand-300'}>{label}</span>
      <span className={valueClass}>
        {showRange ? `${formatZAR(low)} – ${formatZAR(high)}` : formatZAR(low)}
      </span>
    </div>
  );
}

interface SimpleResultsProps {
  results: Array<{ mode: ServiceMode; result: CalculatorResult; highResult: CalculatorResult }>;
  combinedTotal: number;
  combinedSubtotal: number;
  combinedHighTotal: number;
}

function SimpleResultsPanel({ results, combinedTotal, combinedSubtotal, combinedHighTotal }: SimpleResultsProps) {
  const isCombo = results.length > 1;

  if (isCombo) {
    return (
      <div className="space-y-3">
        {results.map(({ mode, result, highResult }) => {
          const baseAmount = result.lines[0]?.value ?? 0;
          const fees = result.subtotal - baseAmount;
          const highFees = highResult.subtotal - (highResult.lines[0]?.value ?? 0);
          return (
            <div key={mode} className="rounded border border-charcoal-700 bg-charcoal-800 p-4 space-y-2 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-sand-400 mb-1">
                {mode.replace(/-/g, ' ')}
              </p>
              <RangeLine low={baseAmount} high={highResult.lines[0]?.value ?? baseAmount} label="Base rate" />
              <RangeLine low={fees} high={highFees} label="Prep/repair & service fees" />
              <div className="border-t border-charcoal-700 pt-2">
                <RangeLine low={result.subtotal} high={highResult.subtotal} label="Subtotal (excl. VAT)" />
                <RangeLine low={result.vat} high={highResult.vat} label="VAT (15%)" />
                <div className="flex justify-between font-bold mt-1">
                  <span className="text-sand-100">Total</span>
                  <span className="text-ember-400">
                    {highResult.total > result.total + 1
                      ? `${formatZAR(result.total)} – ${formatZAR(highResult.total)}`
                      : formatZAR(result.total)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div className="rounded border border-ember-500 bg-ember-600/10 p-4">
          <div className="flex justify-between font-bold text-base">
            <span className="text-sand-100">Combined Total (incl. VAT)</span>
            <span className="text-ember-400">
              {combinedHighTotal > combinedTotal + 1
                ? `${formatZAR(combinedTotal)} – ${formatZAR(combinedHighTotal)}`
                : formatZAR(combinedTotal)}
            </span>
          </div>
          <p className="mt-1 text-xs text-sand-400 italic">
            Combined estimate across {results.length} services. Subject to on-site inspection.
          </p>
        </div>
        <Disclaimer modes={results.map((r) => r.mode)} />
      </div>
    );
  }

  const { result, highResult, mode } = results[0];
  const baseAmount = result.lines[0]?.value ?? 0;
  const fees = result.subtotal - baseAmount;
  const highBaseAmount = highResult.lines[0]?.value ?? baseAmount;
  const highFees = highResult.subtotal - highBaseAmount;

  return (
    <div className="rounded border border-charcoal-700 bg-charcoal-800 p-6 space-y-3">
      <h3 className="font-display text-lg font-bold uppercase text-sand-100">Your Estimate</h3>
      <div className="space-y-2 text-sm">
        <RangeLine low={baseAmount} high={highBaseAmount} label="Base rate" />
        <RangeLine low={fees} high={highFees} label="Prep/repair & service fees" />
        <div className="border-t border-charcoal-700 pt-3 space-y-2">
          <RangeLine low={result.subtotal} high={highResult.subtotal} label="Subtotal (excl. VAT)" />
          <RangeLine low={result.vat} high={highResult.vat} label="VAT (15%)" />
          <RangeLine low={result.total} high={highResult.total} label="Total (incl. VAT)" bold />
        </div>
      </div>
      {highResult.total > result.total + 1 && (
        <p className="text-xs text-sand-400 italic">
          Lower figure based on your inputs. Upper figure reflects maximum prep requirements and emergency urgency.
        </p>
      )}
      <Disclaimer modes={[mode]} />
    </div>
  );
}

function Disclaimer({ modes }: { modes: ServiceMode[] }) {
  const minimums = modes.map((m) => formatZAR(MINIMUM_CHARGE[m])).join(' / ');
  return (
    <p className="text-xs leading-relaxed text-sand-400 italic">
      Indicative estimate only, subject to on-site inspection. Final pricing confirmed in a written
      quote. Minimum job charge applies (from {minimums} excl. VAT). All prices include VAT at 15%.
    </p>
  );
}

export function SimpleCalculator() {
  const [selectedModes, setSelectedModes] = useState<ServiceMode[]>(['sealing']);
  const [region, setRegion] = useState('johannesburg');
  const [urgency, setUrgency] = useState<CalculatorInput['urgency']>('standard');
  const [quantities, setQuantities] = useState<Partial<Record<ServiceMode, number>>>({});
  const [accepted, setAccepted] = useState(false);
  const [showLead, setShowLead] = useState(false);

  const primaryMode = selectedModes[0];

  function handleModesChange(modes: ServiceMode[]) {
    setSelectedModes(modes);
    setAccepted(false);
    setShowLead(false);
  }

  function getQty(mode: ServiceMode) {
    return quantities[mode] ?? buildInput(mode, region, urgency).quantity;
  }

  function setQty(mode: ServiceMode, val: number) {
    setQuantities((p) => ({ ...p, [mode]: Math.max(1, val) }));
  }

  const perModeResults = useMemo(() => {
    return selectedModes.map((mode) => {
      const input: CalculatorInput = {
        ...buildInput(mode, region, urgency),
        quantity: getQty(mode),
      };
      return { mode, result: calculate(input), highResult: calculateHigh(input) };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModes, region, urgency, quantities]);

  const combinedTotal = perModeResults.reduce((s, r) => s + r.result.total, 0);
  const combinedSubtotal = perModeResults.reduce((s, r) => s + r.result.subtotal, 0);
  const combinedHighTotal = perModeResults.reduce((s, r) => s + r.highResult.total, 0);

  const primaryResult = perModeResults[0].result;
  const primaryInput: CalculatorInput = {
    ...buildInput(primaryMode, region, urgency),
    quantity: getQty(primaryMode),
  };

  return (
    <div className="space-y-6">
      <ModeSelector selected={selectedModes} onChange={handleModesChange} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {selectedModes.map((mode) => (
              <div key={mode} className="space-y-1">
                <Label className="text-xs font-semibold uppercase tracking-wider text-sand-400">
                  {UNIT_LABELS[mode]}
                </Label>
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={getQty(mode)}
                  onChange={(e) => setQty(mode, Number(e.target.value))}
                  className={selectClass}
                />
              </div>
            ))}

            <div className="space-y-1">
              <Label className="text-xs font-semibold uppercase tracking-wider text-sand-400">Region</Label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass}>
                {AREAS.map((area) => (
                  <option key={area.regionKey} value={area.regionKey}>{area.name}</option>
                ))}
                <option value="default">Other / National</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold uppercase tracking-wider text-sand-400">Urgency</Label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as CalculatorInput['urgency'])}
                className={selectClass}
              >
                <option value="standard">Standard scheduling</option>
                <option value="expedited">Expedited (+20%)</option>
                <option value="emergency">Emergency (+50%)</option>
              </select>
            </div>
          </div>

          <TandCsGate accepted={accepted} onAccept={setAccepted} />

          {accepted && !showLead && (
            <button
              onClick={() => setShowLead(true)}
              className="w-full rounded bg-ember-500 py-3 font-semibold text-charcoal-900 transition-colors hover:bg-ember-400"
            >
              Request Written Quote
            </button>
          )}

          {showLead && (
            <LeadCaptureForm
              result={primaryResult}
              combinedTotal={selectedModes.length > 1 ? combinedTotal : undefined}
              combinedSubtotal={selectedModes.length > 1 ? combinedSubtotal : undefined}
              selectedModes={selectedModes}
              input={primaryInput}
              onSuccess={() => setShowLead(false)}
            />
          )}
        </div>

        <div>
          <SimpleResultsPanel
            results={perModeResults}
            combinedTotal={combinedTotal}
            combinedSubtotal={combinedSubtotal}
            combinedHighTotal={combinedHighTotal}
          />
        </div>
      </div>
    </div>
  );
}
