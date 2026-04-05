import type { ServiceMode } from '@/lib/pricing/types';

const MODES: Array<{ value: ServiceMode; label: string }> = [
  { value: 'sealing', label: 'Sealing' },
  { value: 'surfacing', label: 'Surfacing' },
  { value: 'line-marking', label: 'Line Marking' },
  { value: 'pothole', label: 'Pothole Repair' },
];

interface ModeSelectorProps {
  value: ServiceMode;
  onChange: (mode: ServiceMode) => void;
}

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div role="tablist" aria-label="Service type" className="flex flex-wrap gap-2">
      {MODES.map((mode) => (
        <button
          key={mode.value}
          role="tab"
          aria-selected={value === mode.value}
          onClick={() => onChange(mode.value)}
          className={`rounded px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400 ${
            value === mode.value
              ? 'bg-ember-500 text-charcoal-900'
              : 'bg-charcoal-700 text-sand-200 hover:bg-charcoal-600'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
