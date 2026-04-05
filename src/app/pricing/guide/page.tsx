import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = buildMetadata({
  title: 'Sealing & Surfacing Pricing Guide South Africa 2024',
  description:
    'Complete pricing guide for sealing, surfacing, and line marking in South Africa. Typical costs per m², what affects price, and how to budget your project.',
  path: '/pricing/guide',
});

const PRICE_TABLE = [
  { service: 'Sealing (economy)', unit: 'per m²', low: 'R38', high: 'R52', notes: 'Clean, good condition surface' },
  { service: 'Sealing (standard)', unit: 'per m²', low: 'R45', high: 'R65', notes: 'Standard prep and sealer' },
  { service: 'Sealing (premium)', unit: 'per m²', low: 'R55', high: 'R80', notes: 'Rubberised sealer, high-traffic' },
  { service: 'Surfacing — overlay', unit: 'per m²', low: 'R150', high: 'R250', notes: '30–40 mm wear course' },
  { service: 'Surfacing — new construction', unit: 'per m²', low: 'R200', high: 'R380', notes: 'Including base preparation' },
  { service: 'Line marking (road paint)', unit: 'per lm', low: 'R18', high: 'R28', notes: 'Standard road paint' },
  { service: 'Line marking (thermoplastic)', unit: 'per lm', low: 'R35', high: 'R55', notes: 'Heated thermoplastic' },
  { service: 'Pothole repair', unit: 'per pothole', low: 'R280', high: 'R550', notes: 'Depending on size and depth' },
];

export default function PricingGuidePage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Pricing', path: '/pricing' },
              { name: 'Pricing Guide', path: '/pricing/guide' },
            ]}
          />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            South African Sealing & Surfacing Price Guide
          </h1>
          <p className="mt-4 text-sand-300 max-w-2xl">
            All prices are indicative ranges in ZAR including VAT at 15%, based on typical South African commercial
            projects in 2024. Final pricing depends on site conditions, access, prep requirements, and location.
            Use our{' '}
            <Link href="/pricing" className="text-ember-400 hover:text-ember-300 underline">
              online calculator
            </Link>{' '}
            for a site-specific estimate.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal-700">
                  <th className="py-3 text-left font-semibold text-sand-400 uppercase tracking-wider">Service</th>
                  <th className="py-3 text-left font-semibold text-sand-400 uppercase tracking-wider">Unit</th>
                  <th className="py-3 text-right font-semibold text-sand-400 uppercase tracking-wider">Low</th>
                  <th className="py-3 text-right font-semibold text-sand-400 uppercase tracking-wider">High</th>
                  <th className="py-3 text-left font-semibold text-sand-400 uppercase tracking-wider pl-4 hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-700">
                {PRICE_TABLE.map((row) => (
                  <tr key={row.service} className="hover:bg-charcoal-800 transition-colors">
                    <td className="py-3 text-sand-100">{row.service}</td>
                    <td className="py-3 text-sand-400">{row.unit}</td>
                    <td className="py-3 text-right text-ember-400 font-medium">{row.low}</td>
                    <td className="py-3 text-right text-ember-400 font-medium">{row.high}</td>
                    <td className="py-3 pl-4 text-sand-400 hidden md:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs text-sand-400">
            * All prices include VAT at 15%. Minimum charges apply. Regional adjustments may apply outside Gauteng.
            Prices correct at time of publication — use the calculator for a current estimate.
          </p>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
