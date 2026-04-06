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

const service = getServiceBySlug('signage-painted')!;

export const metadata: Metadata = buildMetadata({
  title: 'Painted Road Symbols & Signage South Africa | Instant Cost Estimate',
  description:
    'Professional painting of disabled parking symbols, arrows, STOP lettering, speed numbers, and other road symbols on asphalt and concrete. SANS 10400-S compliant.',
  path: '/services/signage-painted',
});

export default function SignagePaintedPage() {
  return (
    <>
      <ServiceSchema
        name={service.title}
        description={service.description}
        url="/services/signage-painted"
      />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Services', path: '/services' },
              { name: 'Painted Signage', path: '/services/signage-painted' },
            ]}
          />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Painted Road Symbols & Signage
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            We paint disabled parking symbols, directional arrows, STOP and SLOW lettering, speed limit
            numbers, and pedestrian crossing markings directly onto asphalt and concrete surfaces. All
            disabled bay symbols comply with SANS 10400-S and are painted to the correct dimensions
            and wheelchair symbol specification.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            We offer both road paint and thermoplastic options. Thermoplastic symbols are heated and
            fused to the surface for a durable, long-lasting finish ideal for high-traffic car parks
            and roads. Road paint is a cost-effective option for lower-traffic areas and estates.
          </p>
        </div>
      </div>

      <TrustBar />
      <CalculatorShell mode="signage-painted" title="Painted Signage Cost Estimate" />
      <PricingFactors factors={service.pricingFactors} />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Painted Signage FAQs" />
      <Testimonials />
      <CtaBanner
        title="Get a quote for painted signage"
        subtitle="Use the calculator above for an instant estimate, or call us to discuss your site."
      />
    </>
  );
}
