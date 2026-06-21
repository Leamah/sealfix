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
    category: 'surface',
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
    category: 'surface',
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
    category: 'surface',
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
    category: 'surface',
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
    category: 'surface',
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
  {
    slug: 'civil-engineering-works',
    title: 'Civil Engineering Works',
    shortTitle: 'Civil Engineering',
    description:
      'Practical civil engineering works for commercial, industrial, residential estate, and municipal sites: roadworks, parking areas, pavement rehabilitation, kerbing, traffic calming, and drainage support.',
    heroImage: '/images/hero-civil-engineering.jpg',
    category: 'civil',
    useCases: [
      'Roadworks and asphalt surfacing',
      'Parking area construction and rehabilitation',
      'Industrial yard surfacing',
      'Kerbing and edge restraints',
      'Speed humps and traffic calming',
      'Drainage support and water flow improvements',
    ],
    pricingFactors: [
      'Scope and size of the works',
      'Site access and operational constraints',
      'Existing surface and base condition',
      'Drainage and water flow requirements',
      'Required materials and finishes',
    ],
    faqs: [
      {
        question: 'Does SealFix only do line marking and sealing?',
        answer:
          'No. SealFix still provides line marking, sealing, pothole repair, and signage, but the company also supports broader civil engineering, construction, and surface infrastructure works, including roadworks, parking area rehabilitation, kerbing, traffic calming, and drainage support.',
      },
      {
        question: 'Can SealFix assist with commercial and industrial sites?',
        answer:
          'Yes. SealFix works with commercial, industrial, estate, municipal, and selected residential sites, including shopping centres, warehouse yards, office parks, schools, hospitals, access roads, and parking areas.',
      },
      {
        question: 'Do you provide written quotes for civil works?',
        answer:
          'Yes. A written quote is provided once the scope, measurements, and site conditions are confirmed. For larger works, a site inspection is usually required first.',
      },
    ],
  },
  {
    slug: 'construction-site-works',
    title: 'Construction and Site Works',
    shortTitle: 'Construction & Site Works',
    description:
      'Construction and site works support for commercial, industrial, estate, and municipal projects, focused on external works, surface infrastructure, access routes, parking areas, kerbing, drainage support, and concrete works.',
    heroImage: '/images/hero-construction.jpg',
    category: 'civil',
    useCases: [
      'Site preparation support',
      'Access road and parking area works',
      'Surface preparation and repairs',
      'Asphalt surfacing and sealing',
      'Kerbing and traffic calming',
      'Concrete works and minor civils',
    ],
    pricingFactors: [
      'Scope of external works required',
      'Site condition and preparation needed',
      'Access and operational constraints',
      'Materials and finishes specified',
      'Timing relative to other site contractors',
    ],
    faqs: [
      {
        question: 'Is SealFix a full building contractor?',
        answer:
          'No. SealFix focuses on external works and site infrastructure rather than structural building work. We support developers, main contractors, and property owners with the access, surfacing, and surface infrastructure needed to make a site usable and ready for handover.',
      },
      {
        question: 'Can SealFix work alongside our main contractor?',
        answer:
          'Yes. We regularly support developers and main contractors by completing the external works portion of a project, including parking areas, access routes, kerbing, drainage support, markings, and signage.',
      },
      {
        question: 'What happens if the scope changes once work has started?',
        answer:
          'Any variation to the agreed scope is priced separately and confirmed in writing before it proceeds, so there are no surprises on the final invoice.',
      },
    ],
  },
  {
    slug: 'roadworks-asphalt-surfacing',
    title: 'Roadworks and Asphalt Surfacing',
    shortTitle: 'Roadworks & Surfacing',
    description:
      'Roadworks and asphalt surfacing for commercial, industrial, estate, and selected municipal sites, including access road works, parking area surfacing, surface rehabilitation, asphalt repairs, and related sealing, marking, and signage.',
    heroImage: '/images/hero-roadworks.jpg',
    category: 'civil',
    useCases: [
      'Access road surfacing',
      'Internal road repairs',
      'Asphalt surface rehabilitation',
      'Pothole and failed area repairs',
      'Parking area resurfacing',
      'Road markings and signage after resurfacing',
    ],
    pricingFactors: [
      'Existing surface condition and base failure',
      'Drainage and water flow',
      'Traffic load and vehicle type',
      'Access and site operating hours',
      'Material selection and work area size',
    ],
    faqs: [
      {
        question: 'What is the difference between resurfacing and sealing?',
        answer:
          'Sealing protects and refreshes an existing asphalt surface that is still structurally sound. Resurfacing is more substantial and may be required when the surface has deeper wear, widespread cracking, potholes, or failed areas.',
      },
      {
        question: 'Can SealFix repair only the damaged sections of a road or yard?',
        answer:
          'Yes. Where suitable, we repair specific failed areas rather than resurfacing the entire site. The right method depends on the depth of damage, traffic levels, drainage, and surrounding surface condition.',
      },
      {
        question: 'Can roadworks be scheduled to avoid disrupting operations?',
        answer:
          'After-hours or weekend scheduling may be available for sites where downtime must be reduced. This is confirmed during the quote process based on the confirmed scope and site requirements.',
      },
    ],
  },
  {
    slug: 'parking-area-construction-rehabilitation',
    title: 'Parking Area Construction and Rehabilitation',
    shortTitle: 'Parking Area Construction',
    description:
      'Construction, repair, and rehabilitation of parking areas for commercial, industrial, residential estate, school, healthcare, and retail sites, from surfacing and pothole repair through to bay layout, line marking, and signage.',
    heroImage: '/images/hero-parking.jpg',
    category: 'civil',
    useCases: [
      'New parking area surfacing',
      'Parking area resurfacing',
      'Pothole and failed area repair',
      'Bay layout and line marking',
      'Disabled bay markings and pedestrian crossings',
      'Parking signs and traffic calming',
    ],
    pricingFactors: [
      'Total parking area size',
      'Existing surface and drainage condition',
      'Bay layout and traffic flow requirements',
      'Marking and signage scope',
      'Site access during works',
    ],
    faqs: [
      {
        question: 'What problems can SealFix solve in a parking area?',
        answer:
          'We help with faded markings, broken asphalt, potholes, poor traffic flow, unsafe pedestrian movement, unclear bays, water ponding, and outdated signage, either as individual repairs or as part of a full rehabilitation project.',
      },
      {
        question: 'Do you handle bay layout planning as well as the surfacing?',
        answer:
          'Yes. Layout planning, surface preparation, repairs or resurfacing, sealing where suitable, line marking, and signage can all be managed as one project.',
      },
      {
        question: 'Can disabled bays and pedestrian crossings be included?',
        answer:
          'Yes. Disabled bay markings and pedestrian crossings can be planned and marked as part of the parking area scope, with dimensions and symbols suited to the site.',
      },
    ],
  },
  {
    slug: 'industrial-yard-surfacing',
    title: 'Industrial Yard Surfacing',
    shortTitle: 'Industrial Yard Surfacing',
    description:
      'Industrial yard surfacing and surface maintenance for warehouses, logistics facilities, factories, workshops, loading areas, and industrial parks that carry heavy traffic and daily operational pressure.',
    heroImage: '/images/hero-industrial.jpg',
    category: 'civil',
    useCases: [
      'Yard surfacing and resurfacing',
      'Heavy traffic pothole repair',
      'Access route repair',
      'Loading area surface repairs',
      'Warehouse yard line marking',
      'Safety walkways and traffic control markings',
    ],
    pricingFactors: [
      'Yard size and traffic volume',
      'Vehicle and forklift turning movements',
      'Existing surface and drainage condition',
      'Operational hours and access constraints',
      'Phasing required to keep the yard operating',
    ],
    faqs: [
      {
        question: 'Can work be planned around our operating hours?',
        answer:
          'Yes, where possible. We plan around access, delivery schedules, heavy vehicle movement, loading bays, and traffic control, and can phase the work to limit disruption.',
      },
      {
        question: 'When should we request an assessment for our yard?',
        answer:
          'Request an assessment if the yard has potholes, water ponding, broken edges, faded markings, unsafe pedestrian routes, damaged loading areas, or repeated surface failure.',
      },
      {
        question: 'Can line marking and signage be added after resurfacing?',
        answer:
          'Yes. Warehouse line marking, safety walkways, directional arrows, and signage are commonly completed as the final stage after surface repairs or resurfacing.',
      },
    ],
  },
  {
    slug: 'kerbing-traffic-calming',
    title: 'Kerbing, Speed Humps and Traffic Calming',
    shortTitle: 'Kerbing & Traffic Calming',
    description:
      'Kerbing, speed humps, and traffic calming works for estates, parking areas, schools, commercial sites, industrial yards, and access roads, to help control vehicle movement and protect pedestrians.',
    heroImage: '/images/hero-traffic-calming.jpg',
    category: 'civil',
    useCases: [
      'Kerbing support and edge restraints',
      'Speed humps and speed hump markings',
      'Pedestrian crossings',
      'Directional arrows and speed signs',
      'Warning signs',
      'Parking and traffic flow markings',
    ],
    pricingFactors: [
      'Number and type of traffic calming measures',
      'Site layout and traffic volume',
      'Existing surface condition',
      'Signage and marking requirements',
      'Site access during installation',
    ],
    faqs: [
      {
        question: 'What sites typically need traffic calming?',
        answer:
          'Residential estates, schools, hospitals, shopping centres, office parks, industrial yards, business parks, and private access roads are the most common sites we work on.',
      },
      {
        question: 'Can traffic calming be combined with other works?',
        answer:
          'Yes. It is often delivered together with line marking, road signs, pothole repair, resurfacing, sealing, and parking area layout improvements as part of one project.',
      },
      {
        question: 'Will the speed humps be marked and signed correctly?',
        answer:
          'Speed humps are paired with the appropriate markings and warning signage so they are clearly visible to approaching vehicles, designed and installed according to the applicable project requirements.',
      },
    ],
  },
  {
    slug: 'stormwater-drainage-support',
    title: 'Stormwater and Drainage Support',
    shortTitle: 'Drainage Support',
    description:
      'Drainage related surface infrastructure support for parking areas, access roads, industrial yards, and paved sites, helping to identify and address one of the leading causes of pavement failure.',
    heroImage: '/images/hero-drainage.jpg',
    category: 'civil',
    useCases: [
      'Surface water flow review',
      'Ponding problem identification',
      'Drainage support linked to surface repairs',
      'Channel and edge condition review',
      'Surface falls and access route review',
      'Repairs connected to drainage affected asphalt',
    ],
    pricingFactors: [
      'Extent of the drainage related damage',
      'Site falls and existing channel condition',
      'Surface repair work required alongside drainage support',
      'Access and site constraints',
      'Whether specialist engineering input is required',
    ],
    faqs: [
      {
        question: 'When should drainage be checked on a site?',
        answer:
          'Drainage should be checked when potholes return in the same place, water stands on the surface, edges break repeatedly, cracks spread after rain, or surface repairs fail faster than expected.',
      },
      {
        question: 'Does SealFix design stormwater systems?',
        answer:
          'SealFix supports drainage related surface infrastructure work connected to parking areas, access roads, and paved sites. For specialist stormwater design or regulated engineering work, this is confirmed by the appropriate professional where required.',
      },
      {
        question: 'Can drainage work be combined with resurfacing?',
        answer:
          'Yes. Where water is contributing to surface failure, correcting the drainage alongside the repair or resurfacing gives a more durable result than repairing the surface alone.',
      },
    ],
  },
  {
    slug: 'concrete-works-minor-civils',
    title: 'Concrete Works and Minor Civils',
    shortTitle: 'Concrete & Minor Civils',
    description:
      'Concrete works and minor civils connected to external site works, parking areas, access routes, kerbing, traffic calming, signage bases, and surface infrastructure.',
    heroImage: '/images/hero-concrete.jpg',
    category: 'civil',
    useCases: [
      'Small concrete repairs',
      'Kerbing related works',
      'Signage bases',
      'Speed hump support works',
      'Edge repairs',
      'Surface interface repairs linked to parking and roads',
    ],
    pricingFactors: [
      'Scope and size of concrete work required',
      'Site access and existing surface condition',
      'Reinforcement and finish requirements',
      'Curing time and scheduling',
      'Whether the work is linked to a wider surfacing or roadworks project',
    ],
    faqs: [
      {
        question: 'Does SealFix do structural concrete or building foundations?',
        answer:
          'No. This service covers practical, non structural concrete works linked to external site infrastructure, such as kerbing, signage bases, and edge repairs. Structural concrete or building work is only carried out where SealFix is qualified and insured to deliver it directly or through approved specialist partners.',
      },
      {
        question: 'Can concrete works be included in a larger surfacing project?',
        answer:
          'Yes. Small concrete repairs and minor civils are often completed alongside roadworks, parking area rehabilitation, kerbing, or traffic calming projects rather than as a standalone job.',
      },
      {
        question: 'Who is this service best suited to?',
        answer:
          'Property managers, estate managers, facilities teams, and contractors who need small external works completed as part of a broader surfacing, roadworks, marking, or signage project.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
