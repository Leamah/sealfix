import type { Metadata } from 'next';
import { COMPANY } from './content/company';

const SITE_URL = COMPANY.url;
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;

export function buildMetadata({
  title,
  description,
  path,
  imageUrl,
}: {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = imageUrl ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: COMPANY.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: 'en_ZA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}
