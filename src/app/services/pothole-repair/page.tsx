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

const service = getServiceBySlug('pothole-repair')!;

export const metadata: Metadata = buildMetadata({
  title: 'Pothole Repair Contractors South Africa | Instant Cost Estimate',
  description:
    'Fast, durable pothole repair for residential driveways, commercial parking areas, and industrial yards. Cold-mix and hot-mix options. Instant online estimate.',
  path: '/services/pothole-repair',
});

export default function PotholeRepairPage() {
  return (
    <>
      <ServiceSchema
        name={service.title}
        description={service.description}
        url="/services/pothole-repair"
      />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Services', path: '/services' },
              { name: 'Pothole Repair', path: '/services/pothole-repair' },
            ]}
          />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Pothole & Pavement Repair
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            Potholes cause tyre damage, vehicle claims, and safety hazards. We patch and repair potholes in
            residential driveways, commercial parking areas, warehouse yards, and industrial roads using
            cold-mix for quick fixes and hot-mix asphalt for permanent, high-traffic repairs.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Every repair starts with proper preparation: saw-cutting square edges, removing loose material,
            and applying a tack coat before laying and compacting new asphalt. This ensures the patch bonds
            correctly and does not fail prematurely. Emergency callouts are available 24 hours.
          </p>
        </div>
      </div>

      <TrustBar />
      <CalculatorShell mode="pothole" title="Pothole Repair Cost Estimate" />
      <PricingFactors factors={service.pricingFactors} />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Pothole Repair FAQs" />
      <Testimonials />
      <CtaBanner
        title="Get your potholes fixed fast"
        subtitle="Use the calculator above for an instant estimate, or call us for an emergency callout."
      />
    </>
  );
}
