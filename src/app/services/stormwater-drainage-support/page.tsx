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

const service = getServiceBySlug('stormwater-drainage-support')!;

export const metadata: Metadata = buildMetadata({
  title: 'Stormwater and Drainage Support for Surface Infrastructure | SealFix SA',
  description:
    'SealFix SA supports stormwater and drainage related surface infrastructure work for parking areas, access roads, yards, and paved sites.',
  path: '/services/stormwater-drainage-support',
});

export default function StormwaterDrainageSupportPage() {
  return (
    <>
      <ServiceSchema name={service.title} description={service.description} url="/services/stormwater-drainage-support" />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }, { name: 'Stormwater and Drainage Support', path: '/services/stormwater-drainage-support' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Stormwater and Drainage Support
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            Water is one of the main causes of surface failure. Poor drainage can lead to potholes, edge break,
            base failure, ponding, cracks, and repeated asphalt damage. SealFix supports drainage related
            surface infrastructure work connected to parking areas, access roads, industrial yards, and paved
            sites.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Specialist drainage design or regulated engineering work is confirmed by the appropriate
            professional where required. Only services SealFix can legally and practically deliver are offered
            on this page.
          </p>
        </div>
      </div>

      <TrustBar />
      <RequestAssessmentSection
        title="Request a Site Assessment"
        subtitle="Send us your drainage related surface issue and SealFix will review the scope, arrange a site inspection where required, and provide a written quote."
        defaultService={service.title}
      />
      <PricingFactors
        factors={service.pricingFactors}
        title="What Affects the Scope?"
        subtitle="Every site assessment considers the following variables:"
      />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Drainage Support FAQs" />
      <Testimonials />
      <CtaBanner
        title="Dealing with water related surface failure?"
        subtitle="Request a site assessment for water related surface failure or drainage support."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
