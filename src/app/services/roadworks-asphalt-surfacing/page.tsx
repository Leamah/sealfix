import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getServiceBySlug } from '@/lib/content/services';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustBar } from '@/components/sections/TrustBar';
import { RequestAssessmentSection } from '@/components/sections/RequestAssessmentSection';
import { PricingFactors } from '@/components/sections/PricingFactors';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

const service = getServiceBySlug('roadworks-asphalt-surfacing')!;

export const metadata: Metadata = buildMetadata({
  title: 'Roadworks and Asphalt Surfacing Contractors South Africa | SealFix SA',
  description:
    'SealFix SA provides roadworks, asphalt surfacing, access road repairs, parking area surfacing, and pavement rehabilitation for commercial, industrial, estate, and municipal sites.',
  path: '/services/roadworks-asphalt-surfacing',
});

export default function RoadworksAsphaltSurfacingPage() {
  return (
    <>
      <ServiceSchema name={service.title} description={service.description} url="/services/roadworks-asphalt-surfacing" />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }, { name: 'Roadworks and Asphalt Surfacing', path: '/services/roadworks-asphalt-surfacing' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Roadworks and Asphalt Surfacing
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            SealFix SA provides roadworks and asphalt surfacing for commercial, industrial, estate, and selected
            municipal sites. Services include access road works, parking area surfacing, surface rehabilitation,
            asphalt repairs, pothole repair, sealing, line marking, and signage.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Roadworks scope depends on existing surface condition, drainage, base failure, traffic load, access,
            material selection, work area size, safety requirements, and whether the site must remain
            operational during the works.
          </p>
        </div>
      </div>

      <TrustBar />
      <RequestAssessmentSection
        title="Request a Site Assessment"
        subtitle="Send us your roadworks or surfacing requirements and SealFix will review the scope, arrange a site inspection where required, and provide a written quote."
        defaultService={service.title}
      />
      <PricingFactors
        factors={service.pricingFactors}
        title="What Affects the Scope?"
        subtitle="Every site assessment considers the following variables:"
      />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Roadworks and Surfacing FAQs" />
      <Testimonials />
      <CtaBanner
        title="Need roadworks or asphalt surfacing?"
        subtitle="Request a site assessment for roadworks, asphalt surfacing, or access road repairs."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
