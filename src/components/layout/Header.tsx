import Link from 'next/link';
import { COMPANY } from '@/lib/content/company';
import { MobileNav } from './MobileNav';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Get a Quote' },
  { href: '/areas', label: 'Areas Served' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-charcoal-700 bg-charcoal-900/95 backdrop-blur supports-[backdrop-filter]:bg-charcoal-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold uppercase tracking-wider text-sand-100">
          {COMPANY.name}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-sand-300 transition-colors hover:text-ember-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${COMPANY.phone}`}
            className="hidden sm:block text-sm font-medium text-ember-400 hover:text-ember-300 transition-colors"
          >
            {COMPANY.phone}
          </a>
          <Link
            href="/pricing"
            className="rounded bg-ember-500 px-4 py-2 text-sm font-semibold text-charcoal-900 transition-colors hover:bg-ember-400"
          >
            Free Estimate
          </Link>
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
