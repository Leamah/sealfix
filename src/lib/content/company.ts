export const COMPANY = {
  name: 'SealFix SA',
  legalName: 'SealFix SA (Pty) Ltd',
  description:
    'South African specialist contractor for sealing, surfacing, and line marking. Serving commercial, industrial, and municipal clients across all major provinces.',
  phone: '+27 11 000 0000',
  email: 'info@sealfixsa.co.za',
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
  foundingYear: 2010,
  priceRange: 'ZAR',
  serviceArea: 'South Africa',
  socialLinks: {
    facebook: 'https://facebook.com/sealfixsa',
    linkedin: 'https://linkedin.com/company/sealfixsa',
  },
} as const;
