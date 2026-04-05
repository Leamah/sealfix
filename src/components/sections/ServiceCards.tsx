import Link from 'next/link';

const SERVICES = [
  {
    title: 'Sealing',
    href: '/services/sealing',
    description: 'Extend pavement life by up to 10 years with professional coal-tar-free seal coating for parking lots, yards, and roads.',
    icon: '🛡️',
    cta: 'Sealing prices →',
  },
  {
    title: 'Surfacing',
    href: '/services/surfacing',
    description: 'New asphalt construction and overlay for commercial roads, parking areas, and industrial yards. Full design-to-completion.',
    icon: '🏗️',
    cta: 'Surfacing prices →',
  },
  {
    title: 'Line Marking',
    href: '/services/line-marking',
    description: 'Durable parking bay marking, safety lines, and road markings. Thermoplastic and road-paint options. SANS compliant.',
    icon: '📐',
    cta: 'Marking prices →',
  },
];

export function ServiceCards() {
  return (
    <section className="bg-charcoal-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-sand-100">Our Services</h2>
        <p className="mt-2 text-sand-400">South African commercial and industrial specialist</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.href}
              className="flex flex-col rounded border border-charcoal-700 bg-charcoal-800 p-6 transition-colors hover:border-ember-500"
            >
              <span className="text-3xl" role="img" aria-label={service.title}>{service.icon}</span>
              <h3 className="mt-4 font-display text-xl font-bold uppercase text-sand-100">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sand-300">{service.description}</p>
              <Link href={service.href} className="mt-4 text-sm font-semibold text-ember-400 hover:text-ember-300 transition-colors">
                {service.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
