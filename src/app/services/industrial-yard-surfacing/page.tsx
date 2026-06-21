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

const service = getServiceBySlug('industrial-yard-surfacing')!;

export const metadata: Metadata = buildMetadata({
  title: 'Industrial Yard Surfacing Contractors South Africa | SealFix SA',
  description:
    'SealFix SA provides industrial yard surfacing, pothole repair, asphalt repairs, sealing, traffic markings, and signage for warehouses, logistics sites, and industrial properties.',
  path: '/services/industrial-yard-surfacing',
});

export default function IndustrialYardSurfacingPage() {
  return (
    <>
      <ServiceSchema name={service.title} description={service.description} url="/services/industrial-yard-surfacing" />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }, { name: 'Industrial Yard Surfacing', path: '/services/industrial-yard-surfacing' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Industrial Yard Surfacing
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            SealFix SA provides industrial yard surfacing and surface maintenance for warehouses, logistics
            facilities, factories, workshops, loading areas, and industrial parks. Industrial yards carry heavy
            traffic, turning vehicles, forklifts, delivery trucks, and daily operational pressure, and surface
            failure can slow operations and create safety risks.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Work can be planned around operating hours where possible. The scope considers access, delivery
            schedules, heavy vehicle movement, loading bays, traffic control, and phased completion.
          </p>
        </div>
      </div>

      <TrustBar />
      <RequestAssessmentSection
        title="Request a Site Assessment"
        subtitle="Send us your industrial yard requirements and SealFix will review the scope, arrange a site inspection where required, and provide a written quote."
        defaultService={service.title}
      />
      <PricingFactors
        factors={service.pricingFactors}
        title="What Affects the Scope?"
        subtitle="Every site assessment considers the following variables:"
      />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Industrial Yard Surfacing FAQs" />
      <Testimonials />
      <CtaBanner
        title="Need industrial yard surfacing or repair?"
        subtitle="Request a site assessment for industrial yard surfacing, repair, or marking."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
