'use client';

import dynamic from 'next/dynamic';

const SimpleCalculator = dynamic(
  () => import('./SimpleCalculator').then((m) => m.SimpleCalculator),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-48 items-center justify-center rounded border border-charcoal-700 bg-charcoal-800">
        <span className="text-sm text-sand-400">Loading estimator…</span>
      </div>
    ),
  }
);

export function SimpleCalculatorShell() {
  return (
    <section id="calculator" className="bg-charcoal-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-sand-100">
          Get Your Instant Estimate
        </h2>
        <p className="mt-2 text-sm text-sand-400">
          Select your service, enter your job size, and get a price in seconds.
          Accept the estimate to request a written quote.
        </p>
        <div className="mt-8">
          <SimpleCalculator />
        </div>
      </div>
    </section>
  );
}
