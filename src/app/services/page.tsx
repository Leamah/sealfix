import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = buildMetadata({
  title: 'Services | Sealing, Pothole Repair & Line Marking South Africa',
  description:
    'Specialist sealing, pothole repair, line marking, and signage services for residential, commercial, industrial, and municipal clients across South Africa.',
  path: '/services',
});

const SERVICES = [
  {
    href: '/services/sealing',
    title: 'Sealing',
    description:
      'Professional seal coating for driveways, parking lots, yards, and roads. Extends asphalt life by up to 5 years using coal-tar-free sealers.',
    from: 'From R45/m²',
  },
  {
    href: '/services/pothole-repair',
    title: 'Pothole Repair',
    description:
      'Fast, durable pothole patching for residential driveways, parking areas, and commercial yards. Cold-mix and hot-mix options. Minimal disruption.',
    from: 'From R350/pothole',
  },
  {
    href: '/services/line-marking',
    title: 'Line Marking',
    description:
      'Durable parking bay marking, road markings, and safety lines. Thermoplastic and road-paint options. SANS 10400-S compliant disabled bays.',
    from: 'From R22/lm',
  },
  {
    href: '/services/signage-physical',
    title: 'Sign Erection',
    description:
      'Supply and erection of road signs, speed limit signs, parking signs, and directional signs. Compliant with SANS 1519 and SARTSM.',
    from: 'From R2 800/sign',
  },
  {
    href: '/services/signage-painted',
    title: 'Painted Signage',
    description:
      'Disabled bay symbols, arrows, STOP lettering, and speed numbers painted onto asphalt or concrete. SANS 10400-S compliant.',
    from: 'From R650/symbol',
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className="bg-charcoal-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-sand-100">Our Services</h1>
          <p className="mt-3 max-w-2xl text-sand-300">
            South African specialist contractor for residential and commercial sealing, pothole repair, and line marking.
            Over 8 years experience. Serving 8 provinces.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {SERVICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex flex-col rounded border border-charcoal-700 bg-charcoal-800 p-6 transition-colors hover:border-ember-500"
              >
                <h2 className="font-display text-xl font-bold uppercase text-sand-100 group-hover:text-ember-400 transition-colors">
                  {service.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-sand-300">{service.description}</p>
                <p className="mt-4 text-sm font-semibold text-ember-400">{service.from}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
