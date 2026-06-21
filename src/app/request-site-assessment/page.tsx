import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { RequestAssessmentSection } from '@/components/sections/RequestAssessmentSection';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Testimonials } from '@/components/sections/Testimonials';

export const metadata: Metadata = buildMetadata({
  title: 'Request a Site Assessment | SealFix SA Civil Engineering and Roadworks Contractor',
  description:
    'Request a site assessment from SealFix SA for civil works, construction support, roadworks, surfacing, sealing, pothole repair, line marking, and signage.',
  path: '/request-site-assessment',
});

export default function RequestSiteAssessmentPage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Request a Site Assessment', path: '/request-site-assessment' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Request a Site Assessment
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">
            Every site is different. Surface condition, drainage, access, traffic flow, preparation requirements,
            material choice, and project timing can all affect the final scope and cost.
          </p>
          <p className="mt-3 max-w-2xl text-sand-300">
            Use the form below to send SealFix your project details. We will review the information, confirm
            whether a site inspection is needed, and provide a written quote based on the confirmed scope.
          </p>

          <div className="mt-10 max-w-2xl">
            <h2 className="font-display text-lg font-bold uppercase text-sand-100">What SealFix can quote on</h2>
            <ul className="mt-4 grid gap-2 text-sm text-sand-300 sm:grid-cols-2">
              {[
                'Civil engineering works',
                'Construction and site works',
                'Roadworks and asphalt surfacing',
                'Parking area construction and rehabilitation',
                'Industrial yard surfacing',
                'Pothole and pavement repair',
                'Asphalt sealing and surface protection',
                'Line marking and road markings',
                'Road sign supply and erection',
                'Painted road symbols',
                'Kerbing, speed humps and traffic calming',
                'Drainage support and related external works',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <RequestAssessmentSection />

      <ProcessSteps />
      <Testimonials />
    </>
  );
}
