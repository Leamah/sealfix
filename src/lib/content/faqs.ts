import type { FaqItem } from '@/types/content';

export const FAQS: FaqItem[] = [
  // Pricing
  {
    category: 'pricing',
    question: 'How accurate is the online estimate?',
    answer:
      'Our calculator gives you a realistic indicative range based on typical project variables. The final price is confirmed after a site inspection, where we assess surface condition, access, drainage, and exact dimensions. The estimate is usually within 10–20% of the final quote.',
  },
  {
    category: 'pricing',
    question: 'What is included in the price?',
    answer:
      'Our quotes include materials, labour, plant hire, site preparation (as specified), and VAT. Mobilisation costs are included for sites within our standard service areas. Traffic management or special access equipment may be quoted separately.',
  },
  {
    category: 'pricing',
    question: 'Do you charge for a site visit?',
    answer:
      'No. Site visits for quoting purposes are free of charge for sites within our service areas.',
  },
  {
    category: 'pricing',
    question: 'What payment terms do you offer?',
    answer:
      'We typically require a 50% deposit on acceptance of the written quote, with the balance due within 7 days of job completion. Terms for large contracts and government clients are negotiated individually.',
  },

  // Process
  {
    category: 'process',
    question: 'How do I get started?',
    answer:
      'Use our online calculator for an immediate estimate, then submit the lead form. We will contact you within one business day to discuss your requirements and arrange a site visit.',
  },
  {
    category: 'process',
    question: 'How long does a typical job take?',
    answer:
      'Sealing a standard 1 000 m² car park takes 1–2 days including prep and curing. New asphalt surfacing of the same area takes 3–5 days. Line marking a fully marked 50-bay car park takes 4–8 hours.',
  },
  {
    category: 'process',
    question: 'Do you work after hours or on weekends?',
    answer:
      'Yes. We offer after-hours and weekend scheduling for sites that cannot be taken out of service during business hours. An urgency surcharge applies.',
  },

  // Sealing
  {
    category: 'sealing',
    question: 'What types of sealer do you use?',
    answer:
      'We use coal-tar-free acrylic-modified sealers that comply with South African environmental regulations. For heavy-traffic commercial sites, we use rubberised sealers with superior flexibility and wear resistance.',
  },
  {
    category: 'sealing',
    question: 'Do I need to seal new asphalt?',
    answer:
      'New asphalt should cure for 90 to 180 days before sealing. After curing, sealing is highly recommended: it closes the surface pores, prevents oxidation, and significantly extends pavement life.',
  },

  // Surfacing
  {
    category: 'surfacing',
    question: 'Can you repair only part of a parking lot?',
    answer:
      'Yes. We can patch and overlay specific damaged sections. For widespread deterioration, full reconstruction is usually more cost-effective in the long run.',
  },
  {
    category: 'surfacing',
    question: 'What base preparation is required for new asphalt?',
    answer:
      'We require a compacted granular sub-base of adequate depth for the expected loading. We assess existing base conditions during the site visit and advise on any remediation needed.',
  },

  // Line Marking
  {
    category: 'line-marking',
    question: 'How many parking bays fit in 1 000 m²?',
    answer:
      'A standard 2.5 m × 5 m bay with 6 m drive aisle requires approximately 28–30 m² of total parking area. So 1 000 m² accommodates roughly 30–35 standard bays, depending on layout and access.',
  },
  {
    category: 'line-marking',
    question: 'Can you mark sports courts?',
    answer:
      'Yes. We mark tennis courts, netball courts, basketball courts, and multi-sport surfaces. We use specialist sports-grade paints and can provide multiple court layouts on a single surface.',
  },
];

export function getFaqsByCategory(category: string): FaqItem[] {
  return FAQS.filter((f) => f.category === category);
}
