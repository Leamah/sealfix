import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { AREAS } from '@/lib/content/areas';

export const metadata: Metadata = buildMetadata({
  title: 'Areas Served | South Africa Sealing & Surfacing Contractor',
  description:
    'SealFix SA operates across all major South African provinces: Gauteng, Western Cape, KwaZulu-Natal, Eastern Cape, and more. Find your nearest service area.',
  path: '/areas',
});

const PROVINCES = [...new Set(AREAS.map((a) => a.province))];

export default function AreasPage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Areas Served', path: '/areas' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100 sm:text-5xl">
            Service Areas
          </h1>
          <p className="mt-3 max-w-2xl text-sand-300">
            We operate across all major South African provinces. Select your area below for local pricing,
            a pre-filled calculator, and regional contact details.
          </p>

          {PROVINCES.map((province) => (
            <div key={province} className="mt-10">
              <h2 className="font-display text-xl font-bold uppercase text-sand-400 border-b border-charcoal-700 pb-2">
                {province}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {AREAS.filter((a) => a.province === province).map((area) => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    className="rounded border border-charcoal-700 bg-charcoal-800 p-4 transition-colors hover:border-ember-500"
                  >
                    <p className="font-semibold text-sand-100 hover:text-ember-400 transition-colors">
                      {area.name}
                    </p>
                    <p className="mt-1 text-xs text-sand-400 line-clamp-2">{area.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
