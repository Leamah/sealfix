import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/content/company';
import { AREAS } from '@/lib/content/areas';

const BASE = COMPANY.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/civil-engineering-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/construction-site-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/roadworks-asphalt-surfacing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/parking-area-construction-rehabilitation`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/industrial-yard-surfacing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/kerbing-traffic-calming`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/stormwater-drainage-support`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/concrete-works-minor-civils`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/sealing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/pothole-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/line-marking`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/signage-physical`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/signage-painted`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/request-site-assessment`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pricing/guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
  ];

  const areaRoutes: MetadataRoute.Sitemap = AREAS.map((area) => ({
    url: `${BASE}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...areaRoutes];
}
