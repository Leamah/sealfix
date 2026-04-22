import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaLabel = 'Get Free Estimate',
  ctaHref = '/pricing',
  secondaryCtaLabel = 'Call Us Now',
  secondaryCtaHref = 'tel:+27218913999',
  imageSrc,
  imageAlt = 'SealFix team on site',
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-charcoal-900 py-20 sm:py-28 lg:py-36">
      {/* Diagonal accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-charcoal-800 via-charcoal-900 to-charcoal-900"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-1/2 bg-ember-600/5"
        style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />

      {/* Optional hero image — right half, faded into the background */}
      {imageSrc && (
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 hidden h-full w-1/2 lg:block"
          style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover opacity-25"
            priority
            sizes="50vw"
          />
          {/* Gradient fade from left to hide the hard edge */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-900/40 to-transparent" />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-sand-100 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-sand-300 sm:text-xl">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={ctaHref}
              className="rounded bg-ember-500 px-6 py-3 font-semibold text-charcoal-900 transition-colors hover:bg-ember-400"
            >
              {ctaLabel}
            </Link>
            <a
              href={secondaryCtaHref}
              className="rounded border border-sand-400 px-6 py-3 font-semibold text-sand-200 transition-colors hover:border-ember-400 hover:text-ember-400"
            >
              {secondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
