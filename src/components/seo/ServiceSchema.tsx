import { JsonLd } from './JsonLd';
import { COMPANY } from '@/lib/content/company';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function ServiceSchema({ name, description, url }: ServiceSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url: `${COMPANY.url}${url}`,
        provider: {
          '@type': 'Organization',
          name: COMPANY.legalName,
          url: COMPANY.url,
        },
        areaServed: {
          '@type': 'Country',
          name: 'South Africa',
        },
      }}
    />
  );
}
