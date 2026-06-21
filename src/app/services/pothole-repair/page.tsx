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
  title: 'Pothole and Pavement Repair Contractors South Africa | SealFix SA',
  description:
    'SealFix SA provides pothole repair and pavement repair for commercial parking areas, roads, warehouse yards, estates, and industrial sites across South Africa.',
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
            Pothole and Pavement Repair
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            Potholes create safety risks, vehicle damage, water ponding, customer complaints, and operational
            disruption. SealFix provides pothole and pavement repair for commercial parking areas, industrial
            yards, estate roads, access routes, warehouse sites, schools, healthcare facilities, and selected
            municipal environments.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            The aim is not only to fill a hole. The aim is to identify why the surface failed, prepare the
            damaged area correctly, and apply a repair method suited to the traffic load and site condition.
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
