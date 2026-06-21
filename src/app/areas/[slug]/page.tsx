import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/metadata';
import { AREAS, getAreaBySlug } from '@/lib/content/areas';
import { ASSESSMENT_SERVICE_LIST } from '@/lib/content/services';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustBar } from '@/components/sections/TrustBar';
import { CalculatorShell } from '@/components/calculator/CalculatorShell';
import { RequestAssessmentSection } from '@/components/sections/RequestAssessmentSection';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';

export function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return buildMetadata({
    title: `Civil Engineering, Roadworks and Surfacing in ${area.name} | SealFix SA`,
    description: `SealFix SA provides civil engineering works, roadworks, asphalt surfacing, pothole repair, sealing, line marking, and signage in ${area.name} and surrounding areas.`,
    path: `/areas/${area.slug}`,
  });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  return (
    <>
      <LocalBusinessSchema city={area.name} province={area.province} />
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Areas', path: '/areas' },
              { name: area.name, path: `/areas/${area.slug}` },
            ]}
          />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Civil Engineering, Roadworks and Surfacing in {area.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sand-300">{area.intro}</p>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-lg font-bold uppercase text-sand-100">
                Services Available in {area.name}
              </h2>
              <ul className="mt-4 grid gap-2 text-sm text-sand-300">
                {ASSESSMENT_SERVICE_LIST.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-display text-lg font-bold uppercase text-sand-100">
                  Sites We Work On in {area.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-sand-300">
                  SealFix works on {area.sitesServed}. The team can assist with practical external works, surface
                  repair, parking area upgrades, traffic flow improvements, markings, and signage.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-bold uppercase text-sand-100">
                  Common Problems SealFix Solves in {area.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-sand-300">
                  Common site issues include potholes, failed asphalt, faded parking bay markings, unclear
                  traffic flow, unsafe pedestrian movement, damaged signs, worn road markings, water ponding,
                  broken access routes, and tired parking areas. SealFix can assess the site and recommend
                  whether the work requires patching, resurfacing, sealing, marking, signage, traffic calming,
                  or a broader civil works solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrustBar />
      <CalculatorShell region={area.regionKey} title={`Cost Estimate for ${area.name}`} />
      <RequestAssessmentSection
        title={`Request a Site Assessment in ${area.name}`}
        subtitle={`Submit your site location, project type, photos if available, and a short description of the work required. SealFix will review the information and confirm whether a site inspection is needed before issuing a written quote for work in ${area.name}.`}
      />
      <CtaBanner
        title={`Ready to start your project in ${area.name}?`}
        subtitle="Use the calculator above for sealing, line marking, or repairs, or request a site assessment for civil works, roadworks, and construction support."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
