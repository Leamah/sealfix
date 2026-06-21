import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getServiceBySlug } from '@/lib/content/services';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustBar } from '@/components/sections/TrustBar';
import { CalculatorShell } from '@/components/calculator/CalculatorShell';
import { PricingFactors } from '@/components/sections/PricingFactors';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

const service = getServiceBySlug('line-marking')!;

export const metadata: Metadata = buildMetadata({
  title: 'Line Marking and Road Marking Contractors South Africa | SealFix SA',
  description:
    'SealFix SA provides parking bay line marking, road markings, warehouse markings, pedestrian crossings, disabled bays, and safety markings across South Africa.',
  path: '/services/line-marking',
});

export default function LineMarkingPage() {
  return (
    <>
      <ServiceSchema
        name={service.title}
        description={service.description}
        url="/services/line-marking"
      />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Services', path: '/services' },
              { name: 'Line Marking', path: '/services/line-marking' },
            ]}
          />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Line Marking and Road Markings
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            SealFix provides line marking and road markings for parking areas, commercial sites, industrial
            yards, estate roads, warehouse floors, schools, healthcare facilities, and selected road
            environments.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Line marking remains a core SealFix service. It is also a natural final stage after surfacing,
            sealing, pothole repair, parking area rehabilitation, or traffic flow upgrades.
          </p>
        </div>
      </div>

      <TrustBar />
      <CalculatorShell mode="line-marking" title="Line Marking Cost Estimate" />
      <PricingFactors factors={service.pricingFactors} />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Line Marking FAQs" />
      <Testimonials />
      <CtaBanner
        title="Get your line marking quote"
        subtitle="Online estimate above, or call us to discuss your layout requirements."
      />
    </>
  );
}
