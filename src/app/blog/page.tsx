import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = buildMetadata({
  title: 'Resources & Articles | SealFix SA',
  description:
    'Guides, articles, and resources on sealing, surfacing, and line marking for South African commercial and industrial property managers.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Resources', path: '/blog' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100">Resources & Articles</h1>
          <p className="mt-3 text-sand-300 max-w-2xl">
            Practical guides for property and facilities managers on pavement maintenance, sealing schedules,
            surfacing specifications, and line marking standards.
          </p>
          <p className="mt-6 text-sm text-sand-400">
            Articles coming in Phase 2. Subscribe to updates or{' '}
            <a href="/contact" className="text-ember-400 underline hover:text-ember-300">contact us</a> with questions.
          </p>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
