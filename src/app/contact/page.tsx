import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { RequestAssessmentSection } from '@/components/sections/RequestAssessmentSection';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import { COMPANY } from '@/lib/content/company';

export const metadata: Metadata = buildMetadata({
  title: 'Contact SealFix SA | Civil Engineering, Construction, Roadworks and Surfacing Contractor',
  description:
    'Contact SealFix SA for civil engineering works, construction support, roadworks, asphalt surfacing, pothole repair, sealing, line marking, and signage enquiries.',
  path: '/contact',
});

const ENQUIRY_CHECKLIST = [
  'Site address or nearest suburb',
  'Type of site, such as warehouse, estate, shopping centre, school, office park, road, or parking area',
  'Work required, such as roadworks, resurfacing, pothole repair, sealing, line marking, or signage',
  'Approximate size of the affected area',
  'Current condition of the surface',
  'Preferred timeline',
  'Photos if available',
];

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Contact SealFix SA
          </h1>
          <p className="mt-3 text-sand-300">
            Contact SealFix SA to discuss civil engineering works, construction support, roadworks, asphalt
            surfacing, parking area rehabilitation, pothole repair, sealing, line marking, road signage, or
            related external works.
          </p>
          <p className="mt-3 text-sand-300">
            For the fastest response, include your site location, the type of work required, the approximate
            size of the area, and any photos that show the current condition. For a quick indicative price on
            sealing, line marking, or repairs, you can also use our{' '}
            <a href="/pricing" className="text-ember-400 underline hover:text-ember-300">online calculator</a>.
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

          <div className="mt-12">
            <h2 className="font-display text-lg font-bold uppercase text-sand-100">What to Include in Your Message</h2>
            <ul className="mt-4 grid gap-2 text-sm text-sand-300 sm:grid-cols-2">
              {ENQUIRY_CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded border border-charcoal-700 bg-charcoal-800 p-6">
            <h2 className="font-display text-lg font-bold uppercase text-sand-100">Emergency and Urgent Work</h2>
            <p className="mt-2 text-sm text-sand-300 leading-relaxed">
              For urgent pothole repair, access route damage, traffic safety concerns, or surface failures,
              call the support line above directly.
            </p>
          </div>
        </div>
      </div>

      <RequestAssessmentSection
        title="Project Enquiries"
        subtitle="Use this form for commercial, industrial, estate, municipal, and residential site enquiries. SealFix will review the information and contact you to confirm whether a site inspection is required before a written quote can be issued."
      />
    </>
  );
}
