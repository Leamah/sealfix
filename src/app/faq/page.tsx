import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { FAQS } from '@/lib/content/faqs';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ | Sealing, Pothole Repair & Line Marking South Africa',
  description:
    'Answers to frequently asked questions about sealing, pothole repair, and line marking costs, processes, materials, and scheduling in South Africa.',
  path: '/faq',
});

const CATEGORIES = [
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
            Everything you need to know about sealing, pothole repair, and line marking in South Africa.
          </p>
        </div>
      </div>
      {CATEGORIES.map((cat) => {
        const faqs = FAQS.filter((f) => f.category === cat.key);
        if (faqs.length === 0) return null;
        return <FaqAccordion key={cat.key} faqs={faqs} title={cat.label} />;
      })}
      <CtaBanner />
    </>
  );
}
