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
  title: 'Road Sign Supply & Erection South Africa | Instant Cost Estimate',
  description:
    'Professional supply and erection of road signs, speed limit signs, parking signs, and directional signs for residential estates, commercial sites, and industrial yards.',
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
            Physical Sign Supply & Erection
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            We supply and erect road signs, speed limit signs, parking restriction signs, and directional
            signage for residential estates, commercial properties, and industrial yards. Every sign
            is SANS 1519 compliant and installed to specification using the correct post type and
            foundation for the surface.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Our team handles everything from site survey and sign selection through to post installation,
            sign mounting, and final inspection. We can install in both paved and unpaved surfaces and
            work alongside line marking and sealing teams on combined projects.
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
