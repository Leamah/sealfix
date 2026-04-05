const STEPS = [
  {
    number: '01',
    title: 'Get an estimate',
    description: 'Use our online calculator for an instant indicative price based on your area, service type, and site conditions.',
  },
  {
    number: '02',
    title: 'Site inspection',
    description: 'We visit your site to confirm measurements, assess surface condition, and provide a binding written quote.',
  },
  {
    number: '03',
    title: 'Scheduled works',
    description: 'Works are scheduled to suit your operations. We handle traffic management, surface prep, and all plant.',
  },
  {
    number: '04',
    title: 'Completion & handover',
    description: 'Finished works are inspected before handover. We provide a workmanship guarantee and aftercare schedule.',
  },
];

export function ProcessSteps() {
  return (
    <section className="bg-charcoal-800 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-sand-100">How It Works</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.number} className="relative">
              <span className="font-display text-5xl font-bold text-ember-500/30">{step.number}</span>
              <h3 className="mt-2 font-display text-lg font-bold uppercase text-sand-100">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
