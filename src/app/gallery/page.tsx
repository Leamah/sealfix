import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = buildMetadata({
  title: 'Project Gallery | SealFix SA',
  description:
    'Photos of completed sealing, surfacing, and line marking projects across South Africa. Commercial parking lots, warehouse yards, and industrial roads.',
  path: '/gallery',
});

export default function GalleryPage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Gallery', path: '/gallery' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100">Project Gallery</h1>
          <p className="mt-3 text-sand-300">
            A selection of completed sealing, pothole repair, and line marking projects across South Africa.
            Photography and full case studies coming soon.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded border border-charcoal-700 bg-charcoal-800 flex items-center justify-center"
              >
                <span className="text-xs text-sand-400">Project photo (coming soon)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
