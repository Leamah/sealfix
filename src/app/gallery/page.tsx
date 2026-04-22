import type { Metadata } from 'next';
import Image from 'next/image';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = buildMetadata({
  title: 'Project Gallery | SealFix SA',
  description:
    'Photos of completed sealing, surfacing, and line marking projects across South Africa. Commercial parking lots, warehouse yards, and industrial roads.',
  path: '/gallery',
});

const PROJECTS = [
  {
    src: '/projects/project-collage.png',
    alt: 'Completed sealing, surfacing and line marking projects',
    caption: 'Recent completed works — surfacing, pothole repair and line marking',
    aspect: 'aspect-[4/3]',
    span: 'sm:col-span-2 lg:col-span-3',
  },
  {
    src: '/projects/surfacing-driveway.jpg',
    alt: 'Freshly surfaced commercial driveway and access road',
    caption: 'Commercial access road — full surfacing',
    aspect: 'aspect-video',
    span: '',
  },
  {
    src: '/projects/pothole-repair-picknpay.jpg',
    alt: 'Pothole repair completed on main road outside Pick n Pay',
    caption: 'Pothole repair — retail precinct main road',
    aspect: 'aspect-video',
    span: '',
  },
  {
    src: '/projects/line-marking-crew.jpg',
    alt: 'SealFix crew painting pedestrian crossing line markings',
    caption: 'Pedestrian crossing — line marking crew on site',
    aspect: 'aspect-video',
    span: '',
  },
];

export default function GalleryPage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Gallery', path: '/gallery' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100">Project Gallery</h1>
          <p className="mt-3 text-sand-300">
            A selection of completed sealing, pothole repair, and line marking projects across South Africa.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <figure
                key={p.src}
                className={`${p.span} overflow-hidden rounded border border-charcoal-700 bg-charcoal-800`}
              >
                <div className={`relative ${p.aspect} w-full`}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <figcaption className="px-3 py-2 text-xs text-sand-400">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
