import Link from 'next/link';

const SERVICES = [
  {
    title: 'Sealing',
    href: '/services/sealing',
    description: 'Extend the life of your driveway, parking lot, or yard by up to 5 years with professional coal-tar-free seal coating.',
    icon: '🛡️',
    cta: 'Sealing prices',
  },
  {
    title: 'Pothole Repair',
    href: '/services/pothole-repair',
    description: 'Fast, durable pothole patching for driveways, parking areas, and commercial yards. Cold-mix and hot-mix options available.',
    icon: '🔧',
    cta: 'Repair prices',
  },
  {
    title: 'Line Marking',
    href: '/services/line-marking',
    description: 'Durable parking bay marking, safety lines, and road markings. Thermoplastic and road-paint options. SANS compliant.',
    icon: '📐',
    cta: 'Marking prices',
  },
  {
    title: 'Sign Erection',
    href: '/services/signage-physical',
    description: 'Supply and erection of road signs, speed limit signs, parking signs, and directional signage for estates and commercial sites.',
    icon: '🚦',
    cta: 'Signage prices',
  },
  {
    title: 'Painted Signage',
    href: '/services/signage-painted',
    description: 'Disabled bay symbols, arrows, STOP lettering, and speed numbers painted on asphalt or concrete. SANS 10400-S compliant.',
    icon: '♿',
    cta: 'Symbol prices',
  },
];

export function ServiceCards() {
  return (
    <section className="bg-charcoal-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-sand-100">Our Services</h2>
        <p className="mt-2 text-sand-400">South African residential and commercial specialist</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.href}
              className="flex flex-col rounded border border-charcoal-700 bg-charcoal-800 p-6 transition-colors hover:border-ember-500"
            >
              <span className="text-3xl" role="img" aria-label={service.title}>{service.icon}</span>
              <h3 className="mt-4 font-display text-xl font-bold uppercase text-sand-100">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sand-300">{service.description}</p>
              <Link href={service.href} className="mt-4 text-sm font-semibold text-ember-400 hover:text-ember-300 transition-colors">
                {service.cta} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
