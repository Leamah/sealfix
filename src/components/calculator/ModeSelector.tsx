import type { ServiceMode } from '@/lib/pricing/types';

const MODES: Array<{ value: ServiceMode; label: string; unit: string }> = [
  { value: 'sealing', label: 'Sealing', unit: 'per m²' },
  { value: 'line-marking', label: 'Line Marking', unit: 'per lm' },
  { value: 'pothole', label: 'Pothole Repair', unit: 'per pothole' },
  { value: 'signage', label: 'Signage', unit: 'per sign' },
];

interface ModeSelectorProps {
  selected: ServiceMode[];
  onChange: (modes: ServiceMode[]) => void;
}

export function ModeSelector({ selected, onChange }: ModeSelectorProps) {
  function toggle(mode: ServiceMode) {
    if (selected.includes(mode)) {
      if (selected.length === 1) return; // keep at least one selected
      onChange(selected.filter((m) => m !== mode));
    } else {
      onChange([...selected, mode]);
    }
  }

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sand-400">
        Select services (combine for a single quote)
      </p>
      <div role="group" aria-label="Service types" className="flex flex-wrap gap-2">
        {MODES.map((mode) => {
          const active = selected.includes(mode.value);
          return (
            <button
              key={mode.value}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(mode.value)}
              className={`rounded px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-400 ${
                active
                  ? 'bg-ember-500 text-charcoal-900'
                  : 'bg-charcoal-700 text-sand-200 hover:bg-charcoal-600'
              }`}
            >
              {mode.label}
              <span className="ml-1.5 text-xs opacity-70">{mode.unit}</span>
            </button>
          );
        })}
      </div>
      {selected.length > 1 && (
        <p className="mt-2 text-xs text-moss-400">
          Combination quote: {selected.length} services will be combined into one estimate.
        </p>
      )}
    </div>
  );
}
