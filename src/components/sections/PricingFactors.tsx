interface PricingFactorsProps {
  factors: string[];
  title?: string;
  subtitle?: string;
}

export function PricingFactors({
  factors,
  title = 'What Affects the Price?',
  subtitle = 'Our calculator accounts for all of the following variables:',
}: PricingFactorsProps) {
  return (
    <section className="bg-charcoal-800 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-sand-100">{title}</h2>
        <p className="mt-2 text-sm text-sand-400">{subtitle}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {factors.map((factor) => (
            <li
              key={factor}
              className="flex items-start gap-3 rounded border border-charcoal-700 bg-charcoal-900 p-4"
            >
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-ember-400" aria-hidden="true" />
              <span className="text-sm text-sand-200">{factor}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
