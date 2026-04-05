'use client';

import { useState, useMemo } from 'react';
import type { CalculatorInput, ServiceMode } from '@/lib/pricing/types';
import { calculate } from '@/lib/pricing/calculator';
import { ModeSelector } from './ModeSelector';
import { InputPanel } from './InputPanel';
import { ResultsPanel } from './ResultsPanel';
import { TandCsGate } from './TandCsGate';
import { LeadCaptureForm } from './LeadCaptureForm';

const DEFAULT_INPUT: CalculatorInput = {
  mode: 'sealing',
  quantity: 500,
  unit: 'sqm',
  jobSizeTier: 'medium',
  region: 'johannesburg',
  urgency: 'standard',
  accessDifficulty: 'easy',
  prepLevel: 'light',
  serviceTier: 'standard',
};

const UNIT_FOR_MODE: Record<ServiceMode, CalculatorInput['unit']> = {
  sealing: 'sqm',
  surfacing: 'sqm',
  'line-marking': 'linear-meters',
  pothole: 'each',
};

interface CalculatorProps {
  initialMode?: ServiceMode;
  initialRegion?: string;
}

export function Calculator({ initialMode, initialRegion }: CalculatorProps) {
  const [input, setInput] = useState<CalculatorInput>({
    ...DEFAULT_INPUT,
    ...(initialMode && { mode: initialMode, unit: UNIT_FOR_MODE[initialMode] }),
    ...(initialRegion && { region: initialRegion }),
  });
  const [accepted, setAccepted] = useState(false);
  const [showLead, setShowLead] = useState(false);

  const result = useMemo(() => calculate(input), [input]);

  function handleModeChange(mode: ServiceMode) {
    setInput((prev) => ({ ...prev, mode, unit: UNIT_FOR_MODE[mode] }));
    setAccepted(false);
    setShowLead(false);
  }

  function handleInputChange(updates: Partial<CalculatorInput>) {
    setInput((prev) => ({ ...prev, ...updates }));
  }

  return (
    <div className="space-y-6">
      <ModeSelector value={input.mode} onChange={handleModeChange} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <InputPanel input={input} onChange={handleInputChange} />
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
              result={result}
              input={input}
              onSuccess={() => setShowLead(false)}
            />
          )}
        </div>
        <ResultsPanel result={result} />
      </div>
    </div>
  );
}
