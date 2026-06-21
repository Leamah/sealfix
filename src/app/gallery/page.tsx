import type { Metadata } from 'next';
import Image from 'next/image';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = buildMetadata({
  title: 'SealFix SA Projects | Roadworks, Surfacing, Line Marking and Civil Works',
  description:
    'View SealFix SA project examples across roadworks, asphalt surfacing, pothole repair, sealing, line marking, signage, and surface infrastructure works.',
  path: '/gallery',
});

interface ProjectCase {
  projectType: string;
  location: string;
  siteType: string;
  scope: string;
  result: string;
  image: string;
  imageAlt: string;
}

const CASE_STUDIES: ProjectCase[] = [
  {
    projectType: 'Commercial Parking Area Rehabilitation',
    location: 'Retail precinct',
    siteType: 'Shopping centre',
    scope:
      'Surface preparation, pothole repair, asphalt resurfacing, bay layout review, line marking, and signage installation.',
    result: 'Improved traffic flow, safer pedestrian movement, and a cleaner parking environment for tenants and customers.',
    image: '/projects/pothole-repair-picknpay.jpg',
    imageAlt: 'Pothole repair completed on main road outside a retail precinct',
  },
  {
    projectType: 'Industrial Yard Surface Repair',
    location: 'Warehouse / logistics facility',
    siteType: 'Industrial yard',
    scope:
      'Damaged surface repair, pothole patching, access route preparation, sealing, and safety line marking.',
    result: 'Better vehicle movement, reduced surface hazards, and improved operational safety.',
    image: '/projects/surfacing-driveway.jpg',
    imageAlt: 'Freshly surfaced commercial access road',
  },
  {
    projectType: 'Estate Road and Traffic Marking Upgrade',
    location: 'Residential estate',
    siteType: 'Estate road',
    scope:
      'Road surface repairs, speed hump marking, road signs, pedestrian markings, and parking bay demarcation.',
    result: 'Clearer road use, improved traffic control, and a more professional estate environment.',
    image: '/projects/line-marking-crew.jpg',
    imageAlt: 'SealFix crew painting pedestrian crossing line markings',
  },
];

export default function GalleryPage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Projects', path: '/gallery' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100">
            SealFix Projects and Site Work Examples
          </h1>
          <p className="mt-3 max-w-2xl text-sand-300">
            View examples of SealFix projects across roadworks, asphalt surfacing, pavement repair, sealing,
            line marking, road signage, painted road symbols, and related surface infrastructure works.
            These examples show the type of sites SealFix works on, the problems solved, and the practical
            steps used to complete each project.
          </p>

          {/* Hero collage */}
          <div className="mt-10 relative aspect-[16/7] w-full overflow-hidden rounded border border-charcoal-700">
            <Image
              src="/projects/project-collage.png"
              alt="Completed sealing, surfacing, and line marking projects"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          {/* Case studies */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {CASE_STUDIES.map((project) => (
              <article
                key={project.projectType}
                className="overflow-hidden rounded border border-charcoal-700 bg-charcoal-800"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-display text-lg font-bold uppercase text-sand-100">{project.projectType}</h2>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-semibold text-sand-400">Location:</dt>
                      <dd className="text-sand-300">{project.location}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-semibold text-sand-400">Site type:</dt>
                      <dd className="text-sand-300">{project.siteType}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-semibold text-sand-400">Scope:</dt>
                      <dd className="text-sand-300">{project.scope}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-semibold text-sand-400">Result:</dt>
                      <dd className="text-sand-300">{project.result}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-sm text-sand-400">
            Have a similar site? Send SealFix your project details and we will confirm the best next step.
          </p>
        </div>
      </div>
      <CtaBanner
        title="Have a similar site?"
        subtitle="Send SealFix your project details and we will confirm the best next step."
        primaryLabel="Request a Site Assessment"
        primaryHref="/request-site-assessment"
      />
    </>
  );
}
