import { JsonLd } from './JsonLd';
import { COMPANY } from '@/lib/content/company';

interface LocalBusinessSchemaProps {
  city?: string;
  province?: string;
}

export function LocalBusinessSchema({ city, province }: LocalBusinessSchemaProps) {
  const address = city
    ? { ...COMPANY.address, addressLocality: city, addressRegion: province ?? COMPANY.address.addressRegion }
    : COMPANY.address;

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: COMPANY.name,
        url: COMPANY.url,
        telephone: COMPANY.phone,
        email: COMPANY.email,
        priceRange: COMPANY.priceRange,
        image: `${COMPANY.url}${COMPANY.logo}`,
        address: {
          '@type': 'PostalAddress',
          ...address,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: COMPANY.geo.latitude,
          longitude: COMPANY.geo.longitude,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '07:00',
            closes: '17:00',
          },
        ],
      }}
    />
  );
}
