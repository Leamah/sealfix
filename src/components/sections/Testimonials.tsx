const TESTIMONIALS = [
  {
    name: 'Pieter van der Berg',
    title: 'Facilities Manager, Growthpoint Properties',
    location: 'Johannesburg',
    quote: 'SealFix sealed our 8 000 m² distribution centre yard on time and within budget. The preparation work was thorough and the finish is excellent. We\'ve already scheduled them for three more sites.',
  },
  {
    name: 'Thandi Mokoena',
    title: 'Operations Director, Shoprite Holdings',
    location: 'Cape Town',
    quote: 'We needed line marking across six retail park sites in the Western Cape. SealFix coordinated the entire programme over two weekends with zero disruption to trading. Professional team from start to finish.',
  },
  {
    name: 'Bruce Naidoo',
    title: 'General Manager, Transnet Freight Rail',
    location: 'Durban',
    quote: 'The pothole repairs and reseal on our logistics yard in Durban Harbour were completed under very tight access conditions. SealFix managed the scheduling and safety requirements without a hitch.',
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
                <p className="text-xs text-sand-400">{t.title}</p>
                <p className="text-xs text-ember-400">{t.location}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
