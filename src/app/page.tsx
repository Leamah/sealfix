import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { CivilServiceCards } from '@/components/sections/CivilServiceCards';
import { ServiceCards } from '@/components/sections/ServiceCards';
import { SimpleCalculatorShell } from '@/components/calculator/SimpleCalculatorShell';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'Civil Engineering, Construction and Roadworks Contractors South Africa | SealFix SA',
  description:
    'SealFix SA delivers civil engineering, construction, roadworks, asphalt surfacing, sealing, pothole repair, line marking, and signage across South Africa.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Civil Engineering, Construction and Surface Infrastructure Contractors"
        subtitle="SealFix SA delivers civil engineering, construction, and surface infrastructure works for commercial, industrial, residential estate, and municipal sites: roadworks, asphalt surfacing, pavement rehabilitation, pothole repair, sealing, line marking, road signage, and painted road symbols."
        ctaLabel="Get Free Estimate"
        ctaHref="#calculator"
        secondaryCtaLabel="Request a Site Assessment"
        secondaryCtaHref="/request-site-assessment"
        imageSrc="/62384ee6-dedb-49ec-9dff-00162b92e28a.png"
        imageAlt="SealFix civil engineering and roadworks team on a South African commercial site"
      />
      <TrustBar />
      <CivilServiceCards />
      <ServiceCards />
      <SimpleCalculatorShell />
      <ProcessSteps />
      <Testimonials />
      <CtaBanner
        title="Ready to start your project?"
        subtitle="Use our online calculator for an instant estimate on sealing, line marking, or repairs, or request a site assessment for civil works, roadworks, and construction support."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
