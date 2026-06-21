import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = buildMetadata({
  title: 'Civil Engineering, Roadworks and Surface Infrastructure Resources | SealFix SA',
  description:
    'Practical guides from SealFix SA on roadworks, asphalt surfacing, parking areas, pothole repair, sealing, line marking, signage, and site maintenance.',
  path: '/blog',
});

const PLANNED_ARTICLES = [
  'How to plan a parking area resurfacing project in South Africa',
  'Asphalt resurfacing vs sealing: which option does your site need?',
  'Pothole repair methods for commercial and industrial sites',
  'Line marking requirements for shopping centres, estates, and warehouses',
  'Roadworks contractor checklist for property managers',
  'Parking area maintenance plan for commercial sites',
  'How drainage affects asphalt failure and potholes',
  'What to include in a roadworks quote request',
  'Estate road maintenance guide for body corporates',
  'Warehouse yard surfacing guide for logistics operators',
];

export default function BlogPage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Resources', path: '/blog' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100">
            Resources for Civil Works, Roadworks and Surface Infrastructure
          </h1>
          <p className="mt-3 text-sand-300 max-w-2xl">
            Practical guides for property owners, facilities managers, estate managers, developers, and public
            sector teams responsible for roads, parking areas, yards, access routes, and surface infrastructure.
          </p>
          <p className="mt-3 text-sand-300 max-w-2xl">
            Use these resources to understand maintenance planning, surface preparation, asphalt repairs,
            sealing, road markings, signage, traffic flow, parking area rehabilitation, and contractor
            selection.
          </p>

          <div className="mt-12">
            <h2 className="font-display text-lg font-bold uppercase text-sand-100">Coming Soon</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PLANNED_ARTICLES.map((title) => (
                <div key={title} className="rounded border border-charcoal-700 bg-charcoal-800 p-4 text-sm text-sand-300">
                  {title}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-sand-400">
              Have a question that isn&apos;t covered yet?{' '}
              <a href="/contact" className="text-ember-400 underline hover:text-ember-300">Contact us</a> directly.
            </p>
          </div>
        </div>
      </div>
      <CtaBanner
        title="Need help with a site issue now?"
        subtitle="Send SealFix your project details for review."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
