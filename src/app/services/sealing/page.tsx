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
  title: 'Asphalt Sealing and Surface Protection Contractors South Africa | SealFix SA',
  description:
    'SealFix SA provides asphalt sealing and surface protection for parking areas, estate roads, warehouse yards, access roads, and commercial sites across South Africa.',
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
            Asphalt Sealing and Surface Protection
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            Asphalt sealing protects existing asphalt surfaces from water ingress, surface wear, fuel staining,
            UV exposure, and early deterioration. SealFix provides asphalt sealing and surface protection for
            parking areas, warehouse yards, estate roads, access routes, commercial driveways, and selected
            road environments.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Sealing remains one of the most important SealFix services. Under our broader civil engineering and
            construction offer, sealing is positioned as a pavement maintenance service that helps extend the
            useful life of a surface before more expensive rehabilitation is required.
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
