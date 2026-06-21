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

const service = getServiceBySlug('concrete-works-minor-civils')!;

export const metadata: Metadata = buildMetadata({
  title: 'Concrete Works and Minor Civils South Africa | SealFix SA',
  description:
    'SealFix SA supports concrete works and minor civils connected to external works, access routes, parking areas, kerbing, traffic calming, and site infrastructure.',
  path: '/services/concrete-works-minor-civils',
});

export default function ConcreteWorksMinorCivilsPage() {
  return (
    <>
      <ServiceSchema name={service.title} description={service.description} url="/services/concrete-works-minor-civils" />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }, { name: 'Concrete Works and Minor Civils', path: '/services/concrete-works-minor-civils' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Concrete Works and Minor Civils
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            SealFix SA supports concrete works and minor civils connected to external site works, parking
            areas, access routes, kerbing, traffic calming, signage bases, and surface infrastructure. This
            service focuses on practical non structural works.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Structural concrete, building foundations, or engineered concrete work is only carried out where
            SealFix is qualified and insured to deliver it directly or through approved specialist partners.
            This service is suitable for property managers, estate managers, facilities teams, and contractors
            who need small external works completed as part of a broader surfacing, roadworks, marking, or
            signage project.
          </p>
        </div>
      </div>

      <TrustBar />
      <RequestAssessmentSection
        title="Request a Site Assessment"
        subtitle="Send us your concrete works or minor civils requirements and SealFix will review the scope, arrange a site inspection where required, and provide a written quote."
        defaultService={service.title}
      />
      <PricingFactors
        factors={service.pricingFactors}
        title="What Affects the Scope?"
        subtitle="Every site assessment considers the following variables:"
      />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Concrete Works and Minor Civils FAQs" />
      <Testimonials />
      <CtaBanner
        title="Need concrete works or minor civils?"
        subtitle="Request a site assessment for concrete works or minor civils linked to external site infrastructure."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
