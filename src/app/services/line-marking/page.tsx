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
  title: 'Line Marking Contractors South Africa | Parking & Road Markings',
  description:
    'Professional parking bay marking, road markings, warehouse floor lines, and sports court markings. Thermoplastic and road-paint options. SANS compliant. South Africa-wide.',
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
            Parking & Road Line Marking
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            Crisp, durable line marking for parking bays, road centre lines, safety walkways, warehouse floor zones,
            and sports courts. We offer thermoplastic marking (heated, bonded to surface, 5–7 year lifespan) and
            solvent road paint (1–2 year lifespan) depending on your traffic levels and budget.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            All disabled bay markings comply with SANS 10400-S, including correct dimensions, access aisle widths,
            and the international symbol of access. We can remove incorrect existing markings by blast-cleaning before
            remarking.
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
