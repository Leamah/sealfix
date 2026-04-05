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

const service = getServiceBySlug('surfacing')!;

export const metadata: Metadata = buildMetadata({
  title: 'Asphalt Surfacing Contractors South Africa | New & Overlay',
  description:
    'New asphalt surfacing, overlay, and reconstruction for commercial roads, parking areas, and industrial yards. Design-to-completion service across South Africa.',
  path: '/services/surfacing',
});

export default function SurfacingPage() {
  return (
    <>
      <ServiceSchema
        name={service.title}
        description={service.description}
        url="/services/surfacing"
      />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Services', path: '/services' },
              { name: 'Surfacing', path: '/services/surfacing' },
            ]}
          />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Asphalt & Paving Surfacing
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            From new parking lot construction to full reconstruction of deteriorated industrial yards, we provide a
            complete asphalt surfacing service. Our team handles site survey, sub-base assessment, design,
            base preparation, asphalt laying, and compaction, with a workmanship guarantee on every job.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            We specify the correct asphalt depth for your expected axle loads: 30–40 mm wearing course for standard
            car parks, 50–70 mm for heavy vehicle areas. All work is compacted to specification and tested before
            handover.
          </p>
        </div>
      </div>

      <TrustBar />
      <CalculatorShell mode="surfacing" title="Surfacing Cost Estimate" />
      <PricingFactors factors={service.pricingFactors} />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Surfacing FAQs" />
      <Testimonials />
      <CtaBanner
        title="Pricing for your surfacing project"
        subtitle="Use the calculator above for an instant estimate, or call us for a site visit."
      />
    </>
  );
}
