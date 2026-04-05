import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/content/company';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${COMPANY.url}/sitemap.xml`,
  };
}
