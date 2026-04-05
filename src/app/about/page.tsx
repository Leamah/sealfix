import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustBar } from '@/components/sections/TrustBar';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import { COMPANY } from '@/lib/content/company';

export const metadata: Metadata = buildMetadata({
  title: 'About SealFix SA | South African Sealing & Surfacing Specialist',
  description:
    'Over 15 years of specialist sealing, surfacing, and line marking across South Africa. Commercial and industrial contractor serving all major provinces.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <LocalBusinessSchema />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'About', path: '/about' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            About {COMPANY.name}
          </h1>
          <div className="mt-6 space-y-4 text-sand-300 leading-relaxed">
            <p>
              {COMPANY.name} is a South African specialist contractor for asphalt sealing, surfacing, and line marking.
              Founded in {COMPANY.foundingYear}, we have built our reputation on delivering reliable, high-quality
              pavement works for commercial, industrial, and municipal clients across all major provinces.
            </p>
            <p>
              Our team includes experienced site managers, qualified plant operators, and dedicated crews who understand
              the demands of working in live commercial environments. We manage our own fleet of plant and equipment,
              which means we control scheduling, quality, and cost — and can respond rapidly to urgent requirements.
            </p>
            <p>
              We believe pricing should be transparent. That is why we built South Africa&apos;s first real-time
              sealing and surfacing cost calculator — so clients can get an indicative price before picking up the phone.
              No obligation, no call required.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold uppercase text-sand-100">Why clients choose us</h2>
            <ul className="mt-4 space-y-3">
              {[
                'Fixed-price written quotes — no surprises',
                'Own fleet of compactors, pavers, and line marking machines',
                'After-hours and weekend scheduling available',
                'Workmanship guarantee on every job',
                'SANS-compliant disabled bay markings',
                'Coal-tar-free sealers — environmentally responsible',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sand-300">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ember-400" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <TrustBar />
      <CtaBanner />
    </>
  );
}
