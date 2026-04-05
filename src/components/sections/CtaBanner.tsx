import Link from 'next/link';
import { COMPANY } from '@/lib/content/company';

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
}

export function CtaBanner({
  title = 'Ready to get a price?',
  subtitle = 'Use our online calculator for an instant estimate, or call us to discuss your project.',
}: CtaBannerProps) {
  return (
    <section className="bg-ember-600 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl font-bold uppercase text-charcoal-900 sm:text-4xl">{title}</h2>
        <p className="mt-3 text-charcoal-800">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/pricing"
            className="rounded bg-charcoal-900 px-6 py-3 font-semibold text-sand-100 transition-colors hover:bg-charcoal-800"
          >
            Online Estimate
          </Link>
          <a
            href={`tel:${COMPANY.phone}`}
            className="rounded border-2 border-charcoal-900 px-6 py-3 font-semibold text-charcoal-900 transition-colors hover:bg-charcoal-900 hover:text-sand-100"
          >
            {COMPANY.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
