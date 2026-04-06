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
      'Residential driveway sealing',
      'Parking lot sealing',
      'Warehouse yard sealing',
      'Industrial estate roads',
      'Shopping centre forecourts',
      'Municipal roads',
    ],
    pricingFactors: [
      'Total surface area (m²)',
      'Current pavement condition',
      'Prep and repair requirements',
      'Urgency of works',
    ],
    faqs: [
      {
        question: 'How long does sealing last?',
        answer:
          'A quality seal coat applied to well-prepared asphalt lasts 3 to 5 years in South African conditions. Parking lots with heavy truck traffic may require resealing every 2 to 3 years.',
      },
      {
        question: 'Can sealing be done in wet weather?',
        answer:
          'No. Sealing requires dry conditions and surface temperatures above 10 degrees Celsius. We monitor weather forecasts and schedule jobs accordingly.',
      },
      {
        question: 'What is the minimum area you seal?',
        answer:
          'Our minimum charge covers jobs up to approximately 100 m². Smaller areas may be quoted at the minimum rate.',
      },
      {
        question: 'How soon after sealing can vehicles drive on the surface?',
        answer:
          'Typically 24 hours for light vehicles and 48 to 72 hours for heavy trucks, depending on temperature and humidity.',
      },
    ],
  },
  {
    slug: 'pothole-repair',
    title: 'Pothole & Pavement Repair',
    shortTitle: 'Pothole Repair',
    description:
      'Fast, durable pothole patching for residential driveways, commercial parking areas, and industrial yards. Cold-mix and hot-mix options.',
    heroImage: '/images/hero-pothole.jpg',
    calculatorMode: 'pothole',
    useCases: [
      'Residential driveway potholes',
      'Parking lot pothole repair',
      'Industrial yard repairs',
      'Road edge and kerb repairs',
      'General pavement crack sealing',
      'Emergency callout repairs',
    ],
    pricingFactors: [
      'Number of potholes',
      'Size and depth of each pothole',
      'Mix type required (cold-mix vs hot-mix)',
      'Surface preparation required',
      'Urgency (standard vs emergency callout)',
    ],
    faqs: [
      {
        question: 'What is the difference between cold-mix and hot-mix repair?',
        answer:
          'Cold-mix is a pre-mixed product applied at ambient temperature. It is suitable for temporary and light-duty repairs. Hot-mix uses heated asphalt compacted in place and provides a permanent, durable repair for high-traffic areas.',
      },
      {
        question: 'How long does a pothole repair last?',
        answer:
          'A properly prepared and compacted hot-mix repair lasts 5 to 10 years or more. Cold-mix repairs are considered temporary and may need follow-up within 1 to 2 years.',
      },
      {
        question: 'Do you do emergency pothole repairs?',
        answer:
          'Yes. We offer 24-hour emergency callouts for safety-critical pothole situations. An emergency surcharge applies.',
      },
      {
        question: 'Can you repair a single pothole?',
        answer:
          'Yes, though our minimum call-out charge applies. For a single small pothole, it may be more economical to group repairs across your site.',
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
          'Road paint typically lasts 1 to 2 years under heavy traffic. Thermoplastic lasts 5 to 7 years. Both are affected by vehicle turning movements and UV exposure.',
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
  {
    slug: 'signage-physical',
    title: 'Physical Sign Supply & Erection',
    shortTitle: 'Sign Erection',
    description:
      'Supply and erection of road signs, parking signs, speed limit signs, and directional signs for residential estates, commercial sites, and industrial yards.',
    heroImage: '/images/hero-signage.jpg',
    calculatorMode: 'signage-physical',
    useCases: [
      'Stop signs and yield signs',
      'Speed limit signs',
      'Directional and wayfinding signs',
      'Parking restriction signs',
      'Estate entrance signage',
      'Safety and hazard signs',
    ],
    pricingFactors: [
      'Number of signs',
      'Sign type and size',
      'Post supply and installation',
      'Surface or ground conditions',
      'Site access',
    ],
    faqs: [
      {
        question: 'Do you supply the signs or do I need to provide them?',
        answer:
          'We supply and install. Our price includes the sign face, post, fixings, and erection. If you have signs already, we can install them at a reduced rate.',
      },
      {
        question: 'Do your signs comply with South African road sign standards?',
        answer:
          'Yes. All road signs comply with SANS 1519 and the South African Road Traffic Signs Manual (SARTSM). Parking and estate signs follow the relevant municipal by-laws.',
      },
      {
        question: 'How long does installation take?',
        answer:
          'Most sign installations are completed in a single day. Larger sites with many signs may require two days. We will advise during quoting.',
      },
      {
        question: 'Can signs be installed in paved or concrete surfaces?',
        answer:
          'Yes. We use appropriate core-drill and sleeve anchor techniques for hard surfaces, or direct burial for unpaved areas.',
      },
    ],
  },
  {
    slug: 'signage-painted',
    title: 'Painted Road Symbols & Signage',
    shortTitle: 'Painted Signage',
    description:
      'Professional painting of disabled parking symbols, arrows, speed numbers, STOP lettering, and other road symbols on asphalt and concrete surfaces.',
    heroImage: '/images/hero-signage.jpg',
    calculatorMode: 'signage-painted',
    useCases: [
      'Disabled parking bay symbols (SANS compliant)',
      'STOP and SLOW lettering',
      'Speed limit numbers on road surface',
      'Directional arrows',
      'No-parking zones',
      'Pedestrian crossing symbols',
    ],
    pricingFactors: [
      'Number of symbols',
      'Symbol type and size',
      'Paint type (road paint vs thermoplastic)',
      'Surface preparation required',
      'Number of colours',
    ],
    faqs: [
      {
        question: 'What is the difference between painted symbols and physical signs?',
        answer:
          'Painted symbols are applied directly onto the road or parking surface. Physical signs are mounted on posts above ground level. Many projects require both for full compliance.',
      },
      {
        question: 'How long does painted signage last?',
        answer:
          'Road paint symbols last 1 to 2 years under normal traffic. Thermoplastic symbols last 4 to 7 years and are more durable. We recommend thermoplastic for high-traffic areas.',
      },
      {
        question: 'Do disabled parking symbols comply with SANS standards?',
        answer:
          'Yes. We paint disabled bay symbols to SANS 10400-S dimensions and specifications. The correct wheelchair symbol, bay dimensions, and colour are applied.',
      },
      {
        question: 'Can you repaint over existing faded symbols?',
        answer:
          'Yes. Faded symbols can be overpainted. Where old symbols are in the wrong position, we can apply blackout paint first to mask them before repainting.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
