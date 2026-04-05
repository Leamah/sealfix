import { JsonLd } from './JsonLd';

interface FaqSchemaProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FaqSchema({ faqs }: FaqSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
