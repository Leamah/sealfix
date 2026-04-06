export const COMPANY = {
  name: 'SealFix SA',
  legalName: 'SealFix SA (Pty) Ltd',
  description:
    'South African specialist contractor for sealing, surfacing, line marking, and signage. Serving residential, commercial, industrial, and municipal clients across 8 provinces.',
  phone: '+27 11 000 0000',
  supportPhone: '+27 11 000 0000',
  email: 'sealfix@leamah.co.za',
  address: {
    streetAddress: '123 Industrial Road',
    addressLocality: 'Johannesburg',
    addressRegion: 'Gauteng',
    postalCode: '2000',
    addressCountry: 'ZA',
  },
  geo: {
    latitude: -26.2041,
    longitude: 28.0473,
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sealfixsa.co.za',
  logo: '/images/logo.png',
  foundingYear: 2018,
  priceRange: 'ZAR',
  serviceArea: 'South Africa',
  hours: {
    office: 'Monday to Saturday, 07:00 to 17:00',
    support: '24-hour support line available',
    emergency: 'Emergency callouts available after hours',
  },
  socialLinks: {
    facebook: 'https://facebook.com/sealfixsa',
    linkedin: 'https://linkedin.com/company/sealfixsa',
  },
} as const;
