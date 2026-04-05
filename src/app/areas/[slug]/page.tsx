import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/metadata';
import { AREAS, getAreaBySlug } from '@/lib/content/areas';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TrustBar } from '@/components/sections/TrustBar';
import { CalculatorShell } from '@/components/calculator/CalculatorShell';
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
    title: `Sealing & Surfacing Contractor ${area.name} | Instant Price`,
    description: `Professional sealing, surfacing, and line marking in ${area.name}, ${area.province}. Get an instant cost estimate online. Local specialist contractor.`,
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
            Sealing & Surfacing in {area.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sand-300">{area.description}</p>
          <p className="mt-3 text-xs text-sand-400">
            Province: {area.province} · Population: {area.population}
          </p>
        </div>
      </div>
      <TrustBar />
      <CalculatorShell
        region={area.regionKey}
        title={`Cost Estimate for ${area.name}`}
      />
      <CtaBanner
        title={`Get a quote in ${area.name}`}
        subtitle="Local scheduling and pricing. Free site visit. Call or submit your details above."
      />
    </>
  );
}
