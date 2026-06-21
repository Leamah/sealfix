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
  title: 'Painted Road Symbols and Site Markings South Africa | SealFix SA',
  description:
    'SealFix SA paints road symbols, arrows, STOP lettering, speed markings, disabled bay symbols, pedestrian markings, and site safety markings across South Africa.',
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
            Painted Road Symbols and Site Markings
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            SealFix paints road symbols, directional arrows, STOP and SLOW lettering, speed numbers,
            disabled bay symbols, pedestrian crossings, loading zone markings, and other site markings on
            asphalt and concrete surfaces.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Painted symbols help drivers and pedestrians understand how to move through a site. They are
            especially important in parking areas, estates, schools, hospitals, warehouses, retail centres,
            and industrial yards.
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
