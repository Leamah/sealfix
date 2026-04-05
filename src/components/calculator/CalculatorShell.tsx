'use client';

import dynamic from 'next/dynamic';
import type { ServiceMode } from '@/lib/pricing/types';

const Calculator = dynamic(() => import('./Calculator').then((m) => m.Calculator), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center rounded border border-charcoal-700 bg-charcoal-800">
      <span className="text-sm text-sand-400">Loading calculator…</span>
    </div>
  ),
});

interface CalculatorShellProps {
  mode?: ServiceMode;
  region?: string;
  title?: string;
}

export function CalculatorShell({
  mode,
  region,
  title = 'Instant Cost Estimate',
}: CalculatorShellProps) {
  return (
    <section id="calculator" className="bg-charcoal-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-sand-100">{title}</h2>
        <p className="mt-2 text-sm text-sand-400">
          Indicative pricing, subject to on-site inspection. Accept the estimate and request a written quote below.
        </p>
        <div className="mt-8">
          <Calculator initialMode={mode} initialRegion={region} />
        </div>
      </div>
    </section>
  );
}
