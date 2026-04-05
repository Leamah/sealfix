'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TandCsGateProps {
  accepted: boolean;
  onAccept: (accepted: boolean) => void;
}

export function TandCsGate({ accepted, onAccept }: TandCsGateProps) {
  return (
    <div className="rounded border border-charcoal-600 bg-charcoal-800 p-4">
      <p className="mb-3 text-sm font-semibold text-sand-100">Before requesting your quote</p>
      <p className="text-xs leading-relaxed text-sand-300">
        This estimate is indicative only and is subject to an on-site inspection. Actual pricing may vary based on
        conditions found during inspection. Final pricing will be confirmed in a written quote.
        All prices include VAT at 15%.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <Checkbox
          id="tandc"
          checked={accepted}
          onCheckedChange={(checked) => onAccept(checked === true)}
          className="border-sand-400 data-[state=checked]:border-ember-500 data-[state=checked]:bg-ember-500"
        />
        <Label htmlFor="tandc" className="text-sm text-sand-200 cursor-pointer">
          I understand this is an estimate and accept the above terms.
        </Label>
      </div>
    </div>
  );
}
