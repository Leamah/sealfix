import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import { COMPANY } from '@/lib/content/company';

export const metadata: Metadata = buildMetadata({
  title: 'Contact SealFix SA | Sealing & Surfacing Contractor',
  description:
    'Get in touch with SealFix SA for sealing, pothole repair, line marking, and signage enquiries. Phone, email, or use the online quote calculator for an instant estimate.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">Contact Us</h1>
          <p className="mt-3 text-sand-300">
            For an instant estimate, use our{' '}
            <a href="/pricing" className="text-ember-400 underline hover:text-ember-300">online calculator</a>.
            For all other enquiries, reach us by phone or email.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded border border-charcoal-700 bg-charcoal-800 p-6">
              <h2 className="font-display text-lg font-bold uppercase text-sand-100">Office Phone</h2>
              <a
                href={`tel:${COMPANY.phone}`}
                className="mt-2 block text-xl font-semibold text-ember-400 hover:text-ember-300 transition-colors"
              >
                {COMPANY.phone}
              </a>
              <p className="mt-1 text-xs text-sand-400">{COMPANY.hours.office}</p>
            </div>

            <div className="rounded border border-charcoal-700 bg-charcoal-800 p-6">
              <h2 className="font-display text-lg font-bold uppercase text-sand-100">24-Hour Support Line</h2>
              <a
                href={`tel:${COMPANY.supportPhone}`}
                className="mt-2 block text-xl font-semibold text-ember-400 hover:text-ember-300 transition-colors"
              >
                {COMPANY.supportPhone}
              </a>
              <p className="mt-1 text-xs text-sand-400">{COMPANY.hours.support}</p>
              <p className="mt-0.5 text-xs text-sand-400">{COMPANY.hours.emergency}</p>
            </div>

            <div className="rounded border border-charcoal-700 bg-charcoal-800 p-6">
              <h2 className="font-display text-lg font-bold uppercase text-sand-100">Email</h2>
              <a
                href={`mailto:${COMPANY.email}`}
                className="mt-2 block text-ember-400 hover:text-ember-300 transition-colors"
              >
                {COMPANY.email}
              </a>
              <p className="mt-1 text-xs text-sand-400">We aim to respond within one business day</p>
            </div>

            <div className="rounded border border-charcoal-700 bg-charcoal-800 p-6">
              <h2 className="font-display text-lg font-bold uppercase text-sand-100">Head Office</h2>
              <address className="mt-2 not-italic text-sm text-sand-300 leading-relaxed">
                {COMPANY.address.streetAddress}<br />
                {COMPANY.address.addressLocality}, {COMPANY.address.addressRegion}<br />
                {COMPANY.address.postalCode}<br />
                {COMPANY.address.addressCountry}
              </address>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
