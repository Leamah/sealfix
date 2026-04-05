import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CalculatorShell } from '@/components/calculator/CalculatorShell';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing Calculator | Instant Sealing & Surfacing Estimate',
  description:
    'Get an instant cost estimate for sealing, surfacing, line marking, or pothole repair in South Africa. No call required. All prices include VAT.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Pricing Calculator', path: '/pricing' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Instant Cost Estimate
          </h1>
          <p className="mt-3 max-w-2xl text-sand-300">
            Select your service, enter your measurements, and see a full itemised cost breakdown instantly.
            Accept the estimate and submit your details to receive a written quote within one business day.
          </p>
        </div>
      </div>
      <CalculatorShell title="Your Estimate" />
      <CtaBanner
        title="Need a binding quote?"
        subtitle="Submit your details through the calculator above and we will confirm pricing after a free site inspection."
      />
    </>
  );
}
