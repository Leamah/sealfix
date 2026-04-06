import type { ServicePage } from '@/types/content';

export const SERVICES: ServicePage[] = [
  {
    slug: 'sealing',
    title: 'Asphalt & Pavement Sealing',
    shortTitle: 'Sealing',
    description:
      'Professional sealing for driveways, parking lots, warehouse yards, and industrial surfaces. Extends asphalt life by up to 5 years.',
    heroImage: '/images/hero-sealing.jpg',
    calculatorMode: 'sealing',
    useCases: [
      'Parking lot sealing',
      'Warehouse yard sealing',
      'Industrial estate roads',
      'Shopping centre forecourts',
      'Airport aprons',
      'Municipal roads',
    ],
    pricingFactors: [
      'Total surface area (m²)',
      'Current pavement condition',
      'Prep and repair requirements',
      'Access difficulty',
      'Urgency of works',
      'Service tier (economy, standard, premium)',
    ],
    faqs: [
      {
        question: 'How long does sealing last?',
        answer:
          'A quality seal coat applied to well-prepared asphalt lasts 3–5 years in South African conditions. Parking lots with heavy truck traffic may require resealing every 2–3 years.',
      },
      {
        question: 'Can sealing be done in wet weather?',
        answer:
          'No. Sealing requires dry conditions and surface temperatures above 10°C. We monitor weather forecasts and schedule jobs accordingly.',
      },
      {
        question: 'What is the minimum area you seal?',
        answer:
          'Our minimum charge covers jobs up to approximately 100 m². Smaller areas may be quoted at the minimum rate.',
      },
      {
        question: 'How soon after sealing can vehicles drive on the surface?',
        answer:
          'Typically 24 hours for light vehicles and 48–72 hours for heavy trucks, depending on temperature and humidity.',
      },
    ],
  },
  {
    slug: 'surfacing',
    title: 'Asphalt & Paving Surfacing',
    shortTitle: 'Surfacing',
    description:
      'New asphalt surfacing, overlay, and reconstruction for commercial roads, parking areas, and industrial yards. Full design-to-completion service.',
    heroImage: '/images/hero-surfacing.jpg',
    calculatorMode: 'surfacing',
    useCases: [
      'New parking lot construction',
      'Asphalt overlay on existing surface',
      'Industrial road construction',
      'Logistics yard surfacing',
      'Retail park roads',
      'Estate internal roads',
    ],
    pricingFactors: [
      'Total area (m²)',
      'Base preparation required',
      'Asphalt depth specification',
      'Sub-base condition',
      'Drainage requirements',
      'Access for plant and equipment',
    ],
    faqs: [
      {
        question: 'What thickness of asphalt do you lay?',
        answer:
          'Standard car parks use 30–40 mm wearing course over a prepared base. Heavy vehicle areas typically require 50–70 mm. We specify the correct depth based on expected axle loads.',
      },
      {
        question: 'Do you supply the design or just lay the asphalt?',
        answer:
          'We provide a complete service: site survey, design, base preparation, asphalt laying, and compaction. We can also work from an engineer\'s specification.',
      },
      {
        question: 'How long does a new asphalt surface last?',
        answer:
          'A properly constructed and maintained asphalt surface lasts 15–25 years. Regular sealing every 3–5 years significantly extends its life.',
      },
      {
        question: 'Can you surface around existing infrastructure?',
        answer:
          'Yes. We work around drains, kerbs, services, and fixed plant. Complex layouts are priced accordingly.',
      },
    ],
  },
  {
    slug: 'line-marking',
    title: 'Parking & Road Line Marking',
    shortTitle: 'Line Marking',
    description:
      'Crisp, durable line marking for parking bays, road markings, safety zones, and sports courts. Thermoplastic and road paint options.',
    heroImage: '/images/hero-linemarking.jpg',
    calculatorMode: 'line-marking',
    useCases: [
      'Parking bay marking',
      'Disabled bay marking (SANS compliant)',
      'Warehouse floor markings',
      'Safety walkways',
      'Sports court markings',
      'Road centre lines and edge lines',
    ],
    pricingFactors: [
      'Total linear metres',
      'Number of bays or symbols',
      'Paint type (road paint vs thermoplastic)',
      'Surface preparation required',
      'Number of colours',
      'Access and working hours',
    ],
    faqs: [
      {
        question: 'What is the difference between road paint and thermoplastic?',
        answer:
          'Road paint is a solvent-based paint applied by brush or spray. Thermoplastic is a heated material that bonds to the surface; it is thicker, more durable, and lasts 3 to 5 times longer. We recommend thermoplastic for high-traffic areas.',
      },
      {
        question: 'How long does line marking last?',
        answer:
          'Road paint typically lasts 1–2 years under heavy traffic. Thermoplastic lasts 5–7 years. Both are affected by vehicle turning movements and UV exposure.',
      },
      {
        question: 'Do you mark disabled bays to SANS standards?',
        answer:
          'Yes. All disabled bay markings comply with SANS 10400-S and include the correct dimensions, symbols, and access aisle widths.',
      },
      {
        question: 'Can you remark over existing faded markings?',
        answer:
          'Yes. We can apply new markings over faded existing lines. Where old markings are in incorrect positions, we can blast-clean them before remarking.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
