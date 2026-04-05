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

const service = getServiceBySlug('sealing')!;

export const metadata: Metadata = buildMetadata({
  title: 'Sealing Contractors South Africa | Instant Cost Estimate',
  description:
    'Professional asphalt and pavement sealing for parking lots, warehouse yards, and industrial roads. Get an instant online price estimate. South Africa-wide service.',
  path: '/services/sealing',
});

export default function SealingPage() {
  return (
    <>
      <ServiceSchema
        name={service.title}
        description={service.description}
        url="/services/sealing"
      />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Services', path: '/services' },
              { name: 'Sealing', path: '/services/sealing' },
            ]}
          />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Asphalt & Pavement Sealing
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            Extend the life of your asphalt by up to 10 years with professional seal coating. We seal parking lots,
            warehouse yards, industrial estate roads, and commercial driveways using coal-tar-free acrylic-modified
            sealers that comply with South African environmental regulations.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Sealing fills surface pores, prevents water ingress, resists fuel and oil spills, and restores a clean,
            professional appearance. Our rubberised sealers for high-traffic sites provide superior flexibility and
            wear resistance compared to standard road paint formulations.
          </p>
        </div>
      </div>

      <TrustBar />
      <CalculatorShell mode="sealing" title="Sealing Cost Estimate" />
      <PricingFactors factors={service.pricingFactors} />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Sealing FAQs" />
      <Testimonials />
      <CtaBanner
        title="Ready to seal your surface?"
        subtitle="Get an instant estimate above or call us to discuss your site."
      />
    </>
  );
}
