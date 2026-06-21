import Link from 'next/link';
import { SERVICES } from '@/lib/content/services';

const FEATURED_SLUGS = [
  'civil-engineering-works',
  'roadworks-asphalt-surfacing',
  'parking-area-construction-rehabilitation',
  'industrial-yard-surfacing',
];

const ICONS: Record<string, string> = {
  'civil-engineering-works': '🏗️',
  'roadworks-asphalt-surfacing': '🛣️',
  'parking-area-construction-rehabilitation': '🅿️',
  'industrial-yard-surfacing': '🏭',
};

export function CivilServiceCards() {
  const services = FEATURED_SLUGS.map((slug) => SERVICES.find((s) => s.slug === slug)!);

  return (
    <section className="bg-charcoal-800 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-sand-100">Civil Engineering &amp; Construction</h2>
        <p className="mt-2 text-sand-400">Practical site works for commercial, industrial, estate, and municipal clients</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.slug}
              className="flex flex-col rounded border border-charcoal-600 bg-charcoal-900 p-6 transition-colors hover:border-ember-500"
            >
              <span className="text-3xl" role="img" aria-label={service.shortTitle}>{ICONS[service.slug]}</span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase text-sand-100">{service.shortTitle}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sand-300">{service.description}</p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-4 text-sm font-semibold text-ember-400 hover:text-ember-300 transition-colors"
              >
                Learn more &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
