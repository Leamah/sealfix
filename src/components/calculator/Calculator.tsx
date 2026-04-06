'use client';

import { useState, useMemo } from 'react';
import type { CalculatorInput, ServiceMode, CalculatorResult } from '@/lib/pricing/types';
import { calculate } from '@/lib/pricing/calculator';
import { ModeSelector } from './ModeSelector';
import { InputPanel } from './InputPanel';
import { ResultsPanel } from './ResultsPanel';
import { TandCsGate } from './TandCsGate';
import { LeadCaptureForm } from './LeadCaptureForm';
import { formatZAR } from '@/lib/utils';

const UNIT_FOR_MODE: Record<ServiceMode, CalculatorInput['unit']> = {
  sealing: 'sqm',
  surfacing: 'sqm',
  'line-marking': 'linear-meters',
  pothole: 'each',
  signage: 'each',
};

function buildDefaultInput(mode: ServiceMode, region?: string): CalculatorInput {
  return {
    mode,
    quantity: mode === 'signage' ? 5 : mode === 'pothole' ? 3 : 500,
    unit: UNIT_FOR_MODE[mode],
    region: region ?? 'johannesburg',
    urgency: 'standard',
    accessDifficulty: 'easy',
    prepLevel: 'light',
    serviceTier: 'standard',
  };
}

interface CalculatorProps {
  initialMode?: ServiceMode;
  initialRegion?: string;
}

export function Calculator({ initialMode, initialRegion }: CalculatorProps) {
  const firstMode = initialMode ?? 'sealing';
  const [selectedModes, setSelectedModes] = useState<ServiceMode[]>([firstMode]);

  // Shared base input (region, urgency, access, prep, tier) keyed to first mode
  const [baseInput, setBaseInput] = useState<CalculatorInput>(
    buildDefaultInput(firstMode, initialRegion)
  );

  // Per-mode quantities (primary mode uses baseInput.quantity)
  const [extraQuantities, setExtraQuantities] = useState<Partial<Record<ServiceMode, number>>>({});

  const [accepted, setAccepted] = useState(false);
  const [showLead, setShowLead] = useState(false);

  const primaryMode = selectedModes[0];
  const extraModes = selectedModes.slice(1);

  function handleModesChange(modes: ServiceMode[]) {
    setSelectedModes(modes);
    // Reset primary input mode if primary changed
    const newPrimary = modes[0];
    if (newPrimary !== primaryMode) {
      setBaseInput((prev) => ({
        ...prev,
        mode: newPrimary,
        unit: UNIT_FOR_MODE[newPrimary],
        quantity: newPrimary === 'signage' ? 5 : newPrimary === 'pothole' ? 3 : prev.quantity,
      }));
    }
    setAccepted(false);
    setShowLead(false);
  }

  function handleExtraQuantityChange(mode: ServiceMode, qty: number) {
    setExtraQuantities((prev) => ({ ...prev, [mode]: qty }));
  }

  // Calculate for each selected mode
  const perModeResults = useMemo<Array<{ mode: ServiceMode; result: CalculatorResult }>>(() => {
    return selectedModes.map((mode) => {
      const input: CalculatorInput = {
        ...baseInput,
        mode,
        unit: UNIT_FOR_MODE[mode],
        quantity:
          mode === primaryMode
            ? baseInput.quantity
            : (extraQuantities[mode] ?? (mode === 'signage' ? 5 : mode === 'pothole' ? 3 : 100)),
      };
      return { mode, result: calculate(input) };
    });
  }, [selectedModes, baseInput, extraQuantities, primaryMode]);

  const combinedTotal = perModeResults.reduce((sum, r) => sum + r.result.total, 0);
  const combinedSubtotal = perModeResults.reduce((sum, r) => sum + r.result.subtotal, 0);

  // For single-mode, show the full breakdown; for multi-mode, show per-service summary
  const primaryResult = perModeResults[0].result;
  const isCombo = selectedModes.length > 1;

  return (
    <div className="space-y-6">
      <ModeSelector selected={selectedModes} onChange={handleModesChange} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <InputPanel
            input={baseInput}
            onChange={(updates) => setBaseInput((prev) => ({ ...prev, ...updates }))}
            extraModes={extraModes}
            extraQuantities={extraQuantities}
            onExtraQuantityChange={handleExtraQuantityChange}
          />
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
              combinedTotal={isCombo ? combinedTotal : undefined}
              combinedSubtotal={isCombo ? combinedSubtotal : undefined}
              selectedModes={selectedModes}
              input={baseInput}
              onSuccess={() => setShowLead(false)}
            />
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {isCombo ? (
            <>
              {perModeResults.map(({ mode, result }) => (
                <div key={mode} className="rounded border border-charcoal-700 bg-charcoal-800 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sand-400 mb-2">
                    {mode.replace('-', ' ')}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-sand-300">Subtotal (excl. VAT)</span>
                    <span className="font-medium text-sand-100">{formatZAR(result.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-sand-300">VAT (15%)</span>
                    <span className="font-medium text-sand-100">{formatZAR(result.vat)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold mt-2 pt-2 border-t border-charcoal-700">
                    <span className="text-sand-100">Total</span>
                    <span className="text-ember-400">{formatZAR(result.total)}</span>
                  </div>
                </div>
              ))}
              <div className="rounded border border-ember-500 bg-ember-600/10 p-4">
                <div className="flex justify-between font-bold text-base">
                  <span className="text-sand-100">Combined Total (incl. VAT)</span>
                  <span className="text-ember-400">{formatZAR(combinedTotal)}</span>
                </div>
                <p className="mt-1 text-xs text-sand-400 italic">
                  Combined estimate across {selectedModes.length} services. Subject to on-site inspection.
                </p>
              </div>
            </>
          ) : (
            <ResultsPanel result={primaryResult} />
          )}
        </div>
      </div>
    </div>
  );
}
