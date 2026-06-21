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

const service = getServiceBySlug('signage-physical')!;

export const metadata: Metadata = buildMetadata({
  title: 'Road Sign Supply and Erection South Africa | SealFix SA',
  description:
    'SealFix SA supplies and erects road signs, parking signs, speed signs, directional signs, and site safety signage for commercial, industrial, and estate environments.',
  path: '/services/signage-physical',
});

export default function SignagePhysicalPage() {
  return (
    <>
      <ServiceSchema
        name={service.title}
        description={service.description}
        url="/services/signage-physical"
      />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Services', path: '/services' },
              { name: 'Sign Erection', path: '/services/signage-physical' },
            ]}
          />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Road Sign Supply and Erection
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            SealFix supplies and erects selected road signs, parking signs, speed signs, directional signs,
            and site safety signage for commercial, industrial, estate, and road environments.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Signage supports safe vehicle movement, pedestrian control, parking management, access control,
            and traffic flow. It is often delivered together with line marking, painted road symbols, traffic
            calming, sealing, or resurfacing works.
          </p>
        </div>
      </div>

      <TrustBar />
      <CalculatorShell mode="signage-physical" title="Sign Erection Cost Estimate" />
      <PricingFactors factors={service.pricingFactors} />
      <ProcessSteps />
      <FaqAccordion faqs={service.faqs} title="Sign Erection FAQs" />
      <Testimonials />
      <CtaBanner
        title="Get a quote for your signage project"
        subtitle="Use the calculator above for an instant estimate, or call us to discuss your requirements."
      />
    </>
  );
}
