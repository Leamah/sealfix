import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustBar } from '@/components/sections/TrustBar';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import { COMPANY } from '@/lib/content/company';

export const metadata: Metadata = buildMetadata({
  title: 'About SealFix SA | Civil Engineering, Construction and Surface Infrastructure Contractor',
  description:
    'SealFix SA is a South African civil engineering, construction, and surface infrastructure contractor with experience in roadworks, surfacing, sealing, pothole repair, line marking, and signage.',
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
              {COMPANY.name} is a South African civil engineering, construction, and surface infrastructure
              contractor serving commercial, industrial, residential estate, and municipal clients.
            </p>
            <p>
              The company started in {COMPANY.foundingYear} with specialist pavement works, including asphalt
              sealing, pothole repair, line marking, and signage. That practical surface infrastructure
              experience remains part of the business. SealFix has expanded its scope to support broader civil
              engineering and construction related works, including roadworks, parking area rehabilitation,
              site infrastructure support, kerbing, traffic calming, drainage support, concrete works, and
              external works.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold uppercase text-sand-100">Our Practical Focus</h2>
            <p className="mt-4 text-sand-300 leading-relaxed">
              SealFix is built around practical site execution. We assess the surface, confirm the scope, plan
              the work, prepare the area, manage crews and equipment, and hand over a completed result that is
              functional, safe, and durable.
            </p>
            <p className="mt-3 text-sand-300 leading-relaxed">
              The company is suitable for clients that need work done on active sites where access, safety,
              traffic flow, and disruption need to be managed carefully.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold uppercase text-sand-100">Our Service Scope</h2>
            <p className="mt-4 text-sand-300 leading-relaxed">
              SealFix works across civil engineering, construction support, roadworks, and surface
              infrastructure. Services include roadworks, asphalt surfacing, parking area construction,
              pavement rehabilitation, pothole repair, sealing, line marking, road signage, painted road
              symbols, kerbing, speed humps, traffic calming, drainage support, and related external works.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold uppercase text-sand-100">Our Clients</h2>
            <p className="mt-4 text-sand-300 leading-relaxed">
              We work with property owners, facilities managers, body corporates, estate managers, developers,
              industrial operators, schools, hospitals, shopping centres, office parks, and public sector
              clients.
            </p>
            <p className="mt-3 text-sand-300 leading-relaxed">
              The same client may need a parking area resurfaced, potholes repaired, road markings restored,
              signs installed, and traffic movement improved. SealFix brings those requirements into one
              practical project delivery process.
            </p>
          </div>
        </div>
      </div>
      <TrustBar />
      <CtaBanner
        title="Speak to SealFix about your next project"
        subtitle="Civil works, roadworks, surfacing, repair, line marking, or signage. Request a site assessment and we will confirm the best next step."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
