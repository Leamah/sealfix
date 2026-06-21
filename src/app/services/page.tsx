import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { SERVICES } from '@/lib/content/services';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = buildMetadata({
  title: 'Civil Engineering, Construction, Roadworks and Surface Infrastructure Services | SealFix SA',
  description:
    'Explore SealFix SA services including civil engineering works, construction support, roadworks, asphalt surfacing, sealing, pothole repair, line marking, and signage.',
  path: '/services',
});

const civilServices = SERVICES.filter((s) => s.category === 'civil');
const surfaceServices = SERVICES.filter((s) => s.category === 'surface');

export default function ServicesPage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100">
            Civil Engineering, Construction and Surface Infrastructure Services
          </h1>
          <p className="mt-3 max-w-2xl text-sand-300">
            SealFix SA provides civil engineering, construction, and surface infrastructure services for
            commercial, industrial, residential estate, and municipal sites across South Africa. Our work
            covers both new works and maintenance projects, including roadworks, asphalt surfacing, parking
            area construction, pavement rehabilitation, pothole repair, sealing, line marking, road signage,
            painted symbols, kerbing, traffic calming, drainage support, and related external works.
          </p>

          {/* Civil Engineering & Construction */}
          <h2 className="mt-12 font-display text-2xl font-bold uppercase text-sand-100">
            Civil Engineering &amp; Construction
          </h2>
          <p className="mt-2 text-sm text-sand-400">New works, upgrades, and broader site infrastructure</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {civilServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded border border-charcoal-700 bg-charcoal-800 p-6 transition-colors hover:border-ember-500"
              >
                <h3 className="font-display text-lg font-bold uppercase text-sand-100 group-hover:text-ember-400 transition-colors">
                  {service.shortTitle}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-sand-300">{service.description}</p>
                <span className="mt-4 text-sm font-semibold text-ember-400">Learn more &rarr;</span>
              </Link>
            ))}
          </div>

          {/* Surface Infrastructure & Maintenance */}
          <h2 className="mt-16 font-display text-2xl font-bold uppercase text-sand-100">
            Surface Infrastructure &amp; Maintenance
          </h2>
          <p className="mt-2 text-sm text-sand-400">Sealing, repair, marking, and signage for existing surfaces</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {surfaceServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded border border-charcoal-700 bg-charcoal-800 p-6 transition-colors hover:border-ember-500"
              >
                <h3 className="font-display text-lg font-bold uppercase text-sand-100 group-hover:text-ember-400 transition-colors">
                  {service.shortTitle}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-sand-300">{service.description}</p>
                <span className="mt-4 text-sm font-semibold text-ember-400">Learn more &rarr;</span>
              </Link>
            ))}
          </div>

          {/* Who we serve */}
          <div className="mt-16 max-w-2xl">
            <h2 className="font-display text-xl font-bold uppercase text-sand-100">Who We Serve</h2>
            <p className="mt-3 text-sand-300">
              SealFix serves property owners, facilities managers, body corporates, estate managers,
              developers, contractors, industrial operators, schools, hospitals, shopping centres, office
              parks, and public sector clients. The company is suitable for clients that need one contractor
              to manage practical external works, surface preparation, roadworks, repairs, markings, signage,
              and handover.
            </p>
          </div>
        </div>
      </div>
      <CtaBanner
        title="Need a contractor for civil works, roadworks, or surfacing?"
        subtitle="Request a site assessment and SealFix will confirm the best next step."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
