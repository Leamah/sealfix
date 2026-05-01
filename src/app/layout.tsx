import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { COMPANY } from '@/lib/content/company';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.name} | Sealing, Pothole Repair & Line Marking`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    'South African specialist contractor for sealing, pothole repair, line marking, and signage. Residential and commercial. Get an instant online estimate. Serving 8 provinces.',
  metadataBase: new URL(COMPANY.url),
  openGraph: {
    siteName: COMPANY.name,
    locale: 'en_ZA',
    type: 'website',
    images: [
      {
        url: COMPANY.logo,
        width: 1536,
        height: 1024,
        alt: `${COMPANY.name} logo`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-charcoal-900 text-sand-100">
        <OrganizationSchema />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
