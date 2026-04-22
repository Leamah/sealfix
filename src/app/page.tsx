import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { ServiceCards } from '@/components/sections/ServiceCards';
import { SimpleCalculatorShell } from '@/components/calculator/SimpleCalculatorShell';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'Sealing, Pothole Repair & Line Marking Contractors | Instant Price Estimate',
  description:
    'South African specialist contractor for residential and commercial sealing, pothole repair, line marking, and signage. Instant online cost estimate. Serving Johannesburg, Cape Town, Durban, and all major cities.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Sealing. Surfacing. Line Marking."
        subtitle="South Africa's specialist residential and commercial contractor. Get an instant cost estimate for your driveway, parking lot, warehouse yard, or road. No call required."
        ctaLabel="Get Free Estimate"
        ctaHref="#calculator"
        secondaryCtaLabel="Call Us Now"
        secondaryCtaHref="tel:+27218913999"
        imageSrc="/62384ee6-dedb-49ec-9dff-00162b92e28a.png"
        imageAlt="SealFix team working on a road surfacing project"
      />
      <TrustBar />
      <ServiceCards />
      <SimpleCalculatorShell />
      <ProcessSteps />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
