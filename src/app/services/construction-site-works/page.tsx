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

const service = getServiceBySlug('construction-site-works')!;

export const metadata: Metadata = buildMetadata({
  title: 'Construction and Site Works South Africa | SealFix SA',
  description:
    'SealFix SA supports construction and site works including external works, parking areas, roadworks, surface preparation, kerbing, drainage support, and site infrastructure.',
  path: '/services/construction-site-works',
});

export default function ConstructionSiteWorksPage() {
  return (
    <>
      <ServiceSchema name={service.title} description={service.description} url="/services/construction-site-works" />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }, { name: 'Construction and Site Works', path: '/services/construction-site-works' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Construction and Site Works
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            SealFix SA supports construction and site works for commercial, industrial, estate, and municipal
            projects. The focus is external works, surface infrastructure, access routes, parking areas, yards,
            road surfaces, kerbing, drainage support, concrete works, markings, and signage.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            A completed building or facility still needs functional access, safe parking, clear traffic flow,
            correct markings, stable surfaces, and visible signage. Developers, main contractors, property
            owners, facilities managers, estate managers, and industrial operators use SealFix for the external
            works needed to make a site usable, safe, and ready for handover.
          </p>
        </div>
      </div>

      <TrustBar />
      <RequestAssessmentSection
        title="Request a Site Assessment"
        subtitle="Send us your construction and site works requirements and SealFix will review the scope, arrange a site inspection where required, and provide a written quote."
        defaultService={service.title}
      />
      <PricingFactors
        factors={service.pricingFactors}
        title="What Affects the Scope?"
        subtitle="Every site assessment considers the following variables:"
      />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Construction and Site Works FAQs" />
      <Testimonials />
      <CtaBanner
        title="Need support with construction or site works?"
        subtitle="Request a site assessment and SealFix will confirm the best next step."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
