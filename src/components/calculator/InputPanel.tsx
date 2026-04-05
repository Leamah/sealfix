import type { CalculatorInput, ServiceMode } from '@/lib/pricing/types';
import { AREAS } from '@/lib/content/areas';
import { Label } from '@/components/ui/label';

interface InputPanelProps {
  input: CalculatorInput;
  onChange: (updates: Partial<CalculatorInput>) => void;
}

const UNIT_LABELS: Record<ServiceMode, string> = {
  sealing: 'Square metres (m²)',
  surfacing: 'Square metres (m²)',
  'line-marking': 'Linear metres (lm)',
  pothole: 'Number of potholes',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-semibold uppercase tracking-wider text-sand-400">{label}</Label>
      {children}
    </div>
  );
}

const selectClass =
  'w-full rounded border border-charcoal-600 bg-charcoal-700 px-3 py-2 text-sm text-sand-100 focus:border-ember-500 focus:outline-none focus:ring-1 focus:ring-ember-500';

export function InputPanel({ input, onChange }: InputPanelProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label={UNIT_LABELS[input.mode]}>
        <input
          type="number"
          min={1}
          max={100000}
          value={input.quantity}
          onChange={(e) => onChange({ quantity: Math.max(1, Number(e.target.value)) })}
          className={selectClass}
          aria-label={UNIT_LABELS[input.mode]}
        />
      </Field>

      <Field label="Job size">
        <select
          value={input.jobSizeTier}
          onChange={(e) => onChange({ jobSizeTier: e.target.value as CalculatorInput['jobSizeTier'] })}
          className={selectClass}
        >
          <option value="small">Small (&lt;200 units)</option>
          <option value="medium">Medium (200–1 000)</option>
          <option value="large">Large (1 000–5 000)</option>
          <option value="major">Major (&gt;5 000)</option>
        </select>
      </Field>

      <Field label="Region">
        <select
          value={input.region}
          onChange={(e) => onChange({ region: e.target.value })}
          className={selectClass}
        >
          {AREAS.map((area) => (
            <option key={area.regionKey} value={area.regionKey}>
              {area.name}
            </option>
          ))}
          <option value="default">Other / National</option>
        </select>
      </Field>

      <Field label="Urgency">
        <select
          value={input.urgency}
          onChange={(e) => onChange({ urgency: e.target.value as CalculatorInput['urgency'] })}
          className={selectClass}
        >
          <option value="standard">Standard scheduling</option>
          <option value="expedited">Expedited (+20%)</option>
          <option value="emergency">Emergency (+50%)</option>
        </select>
      </Field>

      <Field label="Access difficulty">
        <select
          value={input.accessDifficulty}
          onChange={(e) => onChange({ accessDifficulty: e.target.value as CalculatorInput['accessDifficulty'] })}
          className={selectClass}
        >
          <option value="easy">Easy — open site</option>
          <option value="moderate">Moderate — some restrictions</option>
          <option value="restricted">Restricted — confined access</option>
          <option value="crane">Crane / special lift required</option>
        </select>
      </Field>

      <Field label="Surface preparation">
        <select
          value={input.prepLevel}
          onChange={(e) => onChange({ prepLevel: e.target.value as CalculatorInput['prepLevel'] })}
          className={selectClass}
        >
          <option value="light">Light — clean only</option>
          <option value="medium">Medium — crack repair + clean</option>
          <option value="heavy">Heavy — patching + repair</option>
          <option value="demolition">Full demolition / reconstruction</option>
        </select>
      </Field>

      <Field label="Service tier">
        <select
          value={input.serviceTier}
          onChange={(e) => onChange({ serviceTier: e.target.value as CalculatorInput['serviceTier'] })}
          className={selectClass}
        >
          <option value="economy">Economy</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </Field>
    </div>
  );
}
