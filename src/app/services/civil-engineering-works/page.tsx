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

const service = getServiceBySlug('civil-engineering-works')!;

export const metadata: Metadata = buildMetadata({
  title: 'Civil Engineering Works South Africa | SealFix SA',
  description:
    'Civil engineering works for commercial, industrial, estate, and municipal sites including roadworks, parking areas, drainage support, kerbing, and surface infrastructure.',
  path: '/services/civil-engineering-works',
});

export default function CivilEngineeringWorksPage() {
  return (
    <>
      <ServiceSchema name={service.title} description={service.description} url="/services/civil-engineering-works" />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }, { name: 'Civil Engineering Works', path: '/services/civil-engineering-works' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Civil Engineering Works
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            SealFix SA provides practical civil engineering works for commercial, industrial, residential estate,
            and municipal sites. The focus is on external works and surface infrastructure: roadworks, access
            routes, parking areas, pavement rehabilitation, kerbing, traffic calming, drainage support, concrete
            works, and related site improvements.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            SealFix is best suited to practical civil works linked to roads, surfaces, parking areas, yards,
            access routes, and external site functionality. For structural engineering, major buildings, or
            regulated specialist works, SealFix only delivers services it can legally and operationally provide
            directly or through approved specialist partners.
          </p>
        </div>
      </div>

      <TrustBar />
      <RequestAssessmentSection
        title="Request a Site Assessment"
        subtitle="Send us your civil works requirements and SealFix will review the scope, arrange a site inspection where required, and provide a written quote."
        defaultService={service.title}
      />
      <PricingFactors
        factors={service.pricingFactors}
        title="What Affects the Scope?"
        subtitle="Every site assessment considers the following variables:"
      />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Civil Engineering FAQs" />
      <Testimonials />
      <CtaBanner
        title="Need a contractor for civil works?"
        subtitle="Request a site assessment and SealFix will confirm the best next step."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
