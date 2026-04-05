import { JsonLd } from './JsonLd';
import { COMPANY } from '@/lib/content/company';

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: COMPANY.legalName,
        url: COMPANY.url,
        logo: `${COMPANY.url}${COMPANY.logo}`,
        telephone: COMPANY.phone,
        email: COMPANY.email,
        address: {
          '@type': 'PostalAddress',
          ...COMPANY.address,
        },
        sameAs: Object.values(COMPANY.socialLinks),
        foundingDate: String(COMPANY.foundingYear),
        areaServed: COMPANY.serviceArea,
      }}
    />
  );
}
