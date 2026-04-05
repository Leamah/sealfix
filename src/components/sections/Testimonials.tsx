const TESTIMONIALS = [
  {
    name: 'Riaan Botha',
    location: 'Kempton Park',
    quote: 'Had our small yard sealed and bays marked. Good price, turned up on time, and the finish looks neat. Would use again.',
  },
  {
    name: 'Nomsa K.',
    location: 'Pretoria',
    quote: 'They resealed our complex parking area over a weekend so tenants were not affected. No mess, no fuss. Happy with the result.',
  },
  {
    name: 'André van Wyk',
    location: 'Cape Town',
    quote: 'Pothole repairs and line marking done in one visit. Straight lines, good quality paint. The online quote was close to the final price which I appreciated.',
  },
];

export function Testimonials() {
  return (
    <section className="bg-charcoal-800 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-sand-100">What Clients Say</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="flex flex-col rounded border border-charcoal-700 bg-charcoal-900 p-6"
            >
              <p className="flex-1 text-sm leading-relaxed text-sand-300 before:content-['\u201c'] after:content-['\u201d']">
                {t.quote}
              </p>
              <footer className="mt-4 border-t border-charcoal-700 pt-4">
                <p className="text-sm font-semibold text-sand-100">{t.name}</p>
                <p className="text-xs text-ember-400">{t.location}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
