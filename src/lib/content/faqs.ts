import type { FaqItem } from '@/types/content';

export const FAQS: FaqItem[] = [
  // Civil Engineering & Construction
  {
    category: 'civil-construction',
    question: 'Does SealFix only do line marking and sealing?',
    answer:
      'No. SealFix still provides line marking, sealing, pothole repair, and signage, but the company also supports broader civil engineering, construction, and surface infrastructure works. This includes roadworks, asphalt surfacing, parking area rehabilitation, kerbing, traffic calming, drainage support, concrete works, and related external works.',
  },
  {
    category: 'civil-construction',
    question: 'Can SealFix assist with commercial and industrial sites?',
    answer:
      'Yes. SealFix works with commercial, industrial, estate, municipal, and selected residential sites. Typical sites include shopping centres, warehouse yards, office parks, estates, schools, hospitals, access roads, and parking areas.',
  },
  {
    category: 'civil-construction',
    question: 'Do you provide written quotes?',
    answer:
      'Yes. A written quote is provided after the scope, measurements, and site conditions are confirmed. For larger works, a site inspection is usually required.',
  },

  // Roadworks & Surfacing
  {
    category: 'roadworks-surfacing',
    question: 'What is the difference between resurfacing and sealing?',
    answer:
      'Sealing protects and refreshes an existing asphalt surface that is still structurally sound. Resurfacing is more substantial and may be required when the surface has deeper wear, widespread cracking, potholes, or failed areas.',
  },
  {
    category: 'roadworks-surfacing',
    question: 'Can SealFix repair only damaged sections?',
    answer:
      'Yes. Where suitable, SealFix can repair specific failed areas rather than replacing the entire surface. The method depends on the depth of damage, traffic levels, drainage, and surrounding surface condition.',
  },
  {
    category: 'roadworks-surfacing',
    question: 'Can work be scheduled after hours?',
    answer:
      'After hours or weekend scheduling may be available for sites where downtime must be reduced. This should be confirmed during the quote process.',
  },

  // Line Marking & Signage
  {
    category: 'marking-signage',
    question: 'Do you still do line marking?',
    answer:
      'Yes. Line marking remains a core SealFix service. SealFix can mark parking bays, road lines, pedestrian crossings, arrows, warehouse zones, disabled bays, and safety markings.',
  },
  {
    category: 'marking-signage',
    question: 'Do you install road signs?',
    answer:
      'Yes. SealFix supplies and installs selected road, parking, directional, and safety signs for commercial, industrial, estate, and road environments.',
  },
  {
    category: 'marking-signage',
    question: 'Can line marking be done after resurfacing?',
    answer:
      'Yes. SealFix can combine surface preparation, repair, sealing, surfacing, line marking, and signage into one project plan.',
  },

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
      'Sealing a standard 1 000 m² car park takes 1 to 2 days including prep and curing. Pothole repairs on a typical yard can often be completed in a single day. Line marking a fully marked 50-bay car park takes 4 to 8 hours.',
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

  // Pothole Repair
  {
    category: 'pothole',
    question: 'Can you repair only the damaged sections of a parking lot?',
    answer:
      'Yes. We patch specific potholes and damaged areas without disturbing the rest of the surface. For widespread deterioration, we will advise on whether patching or full re-sealing is more cost-effective.',
  },
  {
    category: 'pothole',
    question: 'How do I know if I need hot-mix or cold-mix repair?',
    answer:
      'For driveways and light-use areas, cold-mix is often sufficient for minor potholes. For commercial yards, parking areas with regular vehicle traffic, or any pothole larger than 200 mm, we recommend hot-mix for a lasting repair.',
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
