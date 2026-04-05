import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaqSchema } from '@/components/seo/FaqSchema';

interface FaqAccordionProps {
  faqs: Array<{ question: string; answer: string }>;
  title?: string;
}

export function FaqAccordion({ faqs, title = 'Frequently Asked Questions' }: FaqAccordionProps) {
  return (
    <section className="bg-charcoal-900 py-16 sm:py-20">
      <FaqSchema faqs={faqs} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-sand-100">{title}</h2>
        <Accordion className="mt-8 space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={i}
              className="rounded border border-charcoal-700 bg-charcoal-800 px-4"
            >
              <AccordionTrigger className="py-4 text-left text-sm font-semibold text-sand-100 hover:text-ember-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-sand-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
