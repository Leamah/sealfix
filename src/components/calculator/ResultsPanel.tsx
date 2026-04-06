import type { CalculatorResult } from '@/lib/pricing/types';
import { formatZAR } from '@/lib/utils';

interface ResultsPanelProps {
  result: CalculatorResult;
  /** When provided and total differs, shows a price range */
  highResult?: CalculatorResult;
}

export function ResultsPanel({ result, highResult }: ResultsPanelProps) {
  const showRange = !!highResult && highResult.total > result.total + 1;

  return (
    <div className="rounded border border-charcoal-700 bg-charcoal-800 p-6">
      <h3 className="font-display text-lg font-bold uppercase text-sand-100">Cost Breakdown</h3>
      <dl className="mt-4 space-y-2 text-sm">
        {result.lines.map((line, i) => (
          <div key={i} className="flex items-start justify-between gap-4">
            <div>
              <dt className="text-sand-200">{line.label}</dt>
              {line.note && <dd className="text-xs text-sand-400">{line.note}</dd>}
            </div>
            <span className={`shrink-0 font-medium ${line.value < 0 ? 'text-moss-400' : 'text-sand-100'}`}>
              {formatZAR(line.value)}
            </span>
          </div>
        ))}
      </dl>

      <div className="mt-4 border-t border-charcoal-700 pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-sand-300">Subtotal (excl. VAT)</span>
          <span className="font-medium text-sand-100">
            {showRange
              ? `${formatZAR(result.subtotal)} – ${formatZAR(highResult!.subtotal)}`
              : formatZAR(result.subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sand-300">VAT (15%)</span>
          <span className="font-medium text-sand-100">
            {showRange
              ? `${formatZAR(result.vat)} – ${formatZAR(highResult!.vat)}`
              : formatZAR(result.vat)}
          </span>
        </div>
        <div className="flex justify-between rounded bg-ember-600/10 px-2 py-2 text-base font-bold">
          <span className="text-sand-100">Total (incl. VAT)</span>
          <span className="text-ember-400">
            {showRange
              ? `${formatZAR(result.total)} – ${formatZAR(highResult!.total)}`
              : formatZAR(result.total)}
          </span>
        </div>
        <p className="text-xs text-sand-400">
          {showRange
            ? `Range: ${formatZAR(result.perUnitRate)} – ${formatZAR(highResult!.perUnitRate)}/unit excl. VAT`
            : `${formatZAR(result.perUnitRate)}/unit excl. VAT`}
        </p>
      </div>

      {showRange && (
        <p className="mt-2 text-xs text-sand-400 italic">
          Lower figure is based on your inputs. Upper figure reflects maximum prep and emergency urgency.
        </p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-sand-400 italic">{result.disclaimer}</p>
    </div>
  );
}
