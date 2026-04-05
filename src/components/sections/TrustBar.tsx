const STATS = [
  { value: '8+', label: 'Years in business' },
  { value: '500+', label: 'Projects completed' },
  { value: '8', label: 'Provinces serviced' },
  { value: '4.9★', label: 'Average rating' },
];

export function TrustBar() {
  return (
    <div className="border-y border-charcoal-700 bg-charcoal-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="font-display text-3xl font-bold text-ember-400">{stat.value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-sand-400">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
