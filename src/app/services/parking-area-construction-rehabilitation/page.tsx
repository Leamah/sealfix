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

const service = getServiceBySlug('parking-area-construction-rehabilitation')!;

export const metadata: Metadata = buildMetadata({
  title: 'Parking Area Construction and Rehabilitation South Africa | SealFix SA',
  description:
    'SealFix SA constructs, repairs, and rehabilitates commercial parking areas with asphalt surfacing, pothole repair, sealing, line marking, signage, and traffic flow improvements.',
  path: '/services/parking-area-construction-rehabilitation',
});

export default function ParkingAreaConstructionPage() {
  return (
    <>
      <ServiceSchema name={service.title} description={service.description} url="/services/parking-area-construction-rehabilitation" />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }, { name: 'Parking Area Construction', path: '/services/parking-area-construction-rehabilitation' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Parking Area Construction and Rehabilitation
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            SealFix SA constructs, repairs, and rehabilitates parking areas for commercial, industrial,
            residential estate, school, healthcare, and retail sites. A parking area is more than a surface. It
            needs drainage, access, safe vehicle flow, pedestrian movement, clear bay markings, signage, and
            durable finishing.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            The project process includes scope review, site assessment, surface condition review, layout
            planning where required, preparation, repairs or surfacing, sealing where suitable, line marking,
            signage, and handover.
          </p>
        </div>
      </div>

      <TrustBar />
      <RequestAssessmentSection
        title="Request a Site Assessment"
        subtitle="Send us your parking area requirements and SealFix will review the scope, arrange a site inspection where required, and provide a written quote."
        defaultService={service.title}
      />
      <PricingFactors
        factors={service.pricingFactors}
        title="What Affects the Scope?"
        subtitle="Every site assessment considers the following variables:"
      />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Parking Area FAQs" />
      <Testimonials />
      <CtaBanner
        title="Need a parking area built, repaired, or upgraded?"
        subtitle="Request a site assessment for parking area construction, rehabilitation, or upgrades."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
