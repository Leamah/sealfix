import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { FAQS } from '@/lib/content/faqs';

export const metadata: Metadata = buildMetadata({
  title: 'SealFix FAQ | Civil Engineering, Roadworks, Surfacing, Sealing and Line Marking',
  description:
    'Answers to common questions about SealFix SA civil engineering works, construction support, roadworks, asphalt surfacing, pothole repair, sealing, line marking, and signage.',
  path: '/faq',
});

const CATEGORIES = [
  { key: 'civil-construction', label: 'Civil Engineering & Construction' },
  { key: 'roadworks-surfacing', label: 'Roadworks & Surfacing' },
  { key: 'marking-signage', label: 'Line Marking & Signage' },
  { key: 'pricing', label: 'Pricing & Quotes' },
  { key: 'process', label: 'Process & Scheduling' },
  { key: 'sealing', label: 'Sealing' },
  { key: 'pothole', label: 'Pothole Repair' },
  { key: 'line-marking', label: 'Line Marking' },
];

export default function FaqPage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'FAQ', path: '/faq' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sand-300">
            Find answers to common questions about SealFix civil engineering works, construction support,
            roadworks, asphalt surfacing, parking area rehabilitation, pothole repair, sealing, line marking,
            road signage, and painted road symbols.
          </p>
        </div>
      </div>
      {CATEGORIES.map((cat) => {
        const faqs = FAQS.filter((f) => f.category === cat.key);
        if (faqs.length === 0) return null;
        return <FaqAccordion key={cat.key} faqs={faqs} title={cat.label} />;
      })}
      <CtaBanner
        title="Still have questions?"
        subtitle="Send SealFix your site details and the team will confirm the next step."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
