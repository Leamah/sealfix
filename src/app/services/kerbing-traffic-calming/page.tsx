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

const service = getServiceBySlug('kerbing-traffic-calming')!;

export const metadata: Metadata = buildMetadata({
  title: 'Kerbing, Speed Humps and Traffic Calming South Africa | SealFix SA',
  description:
    'SealFix SA supports kerbing, speed humps, traffic calming, road markings, and signage for estates, parking areas, schools, commercial sites, and industrial properties.',
  path: '/services/kerbing-traffic-calming',
});

export default function KerbingTrafficCalmingPage() {
  return (
    <>
      <ServiceSchema name={service.title} description={service.description} url="/services/kerbing-traffic-calming" />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }, { name: 'Kerbing and Traffic Calming', path: '/services/kerbing-traffic-calming' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Kerbing, Speed Humps and Traffic Calming
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            SealFix SA supports kerbing, speed humps, and traffic calming works for estates, parking areas,
            schools, commercial sites, industrial yards, and access roads. Traffic calming helps control
            vehicle movement, protect pedestrians, manage parking areas, and improve site safety.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Traffic calming is often delivered together with line marking, road signs, pothole repair,
            resurfacing, sealing, and parking area layout improvements as part of one project.
          </p>
        </div>
      </div>

      <TrustBar />
      <RequestAssessmentSection
        title="Request a Site Assessment"
        subtitle="Send us your kerbing or traffic calming requirements and SealFix will review the scope, arrange a site inspection where required, and provide a written quote."
        defaultService={service.title}
      />
      <PricingFactors
        factors={service.pricingFactors}
        title="What Affects the Scope?"
        subtitle="Every site assessment considers the following variables:"
      />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Kerbing and Traffic Calming FAQs" />
      <Testimonials />
      <CtaBanner
        title="Need kerbing, speed humps, or traffic calming?"
        subtitle="Request a site assessment for kerbing, speed humps, or traffic calming."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
