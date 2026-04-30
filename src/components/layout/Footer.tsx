import Link from 'next/link';
import Image from 'next/image';
import { COMPANY } from '@/lib/content/company';

const SERVICE_LINKS = [
  { href: '/services/sealing', label: 'Sealing' },
  { href: '/services/pothole-repair', label: 'Pothole Repair' },
  { href: '/services/line-marking', label: 'Line Marking' },
  { href: '/services/signage-physical', label: 'Sign Erection' },
  { href: '/services/signage-painted', label: 'Painted Signage' },
  { href: '/pricing', label: 'Pricing Calculator' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/gallery', label: 'Project Gallery' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Resources' },
];

const AREA_LINKS = [
  { href: '/areas/johannesburg', label: 'Johannesburg' },
  { href: '/areas/pretoria', label: 'Pretoria' },
  { href: '/areas/cape-town', label: 'Cape Town' },
  { href: '/areas/durban', label: 'Durban' },
  { href: '/areas', label: 'All Areas →' },
];

export function Footer() {
  return (
    <footer className="border-t border-charcoal-700 bg-charcoal-900 text-sand-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div>
            <Image
              src={COMPANY.logo}
              alt={`${COMPANY.name} logo`}
              width={2239}
              height={2064}
              className="h-14 w-auto"
            />
            <p className="mt-3 text-sm leading-relaxed">{COMPANY.description}</p>
            <div className="mt-4 space-y-1 text-sm">
              <a href={`tel:${COMPANY.phone}`} className="block hover:text-ember-400 transition-colors">
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="block hover:text-ember-400 transition-colors">
                {COMPANY.email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-400">Services</p>
            <ul className="mt-3 space-y-2">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-ember-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-400">Company</p>
            <ul className="mt-3 space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-ember-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-400">Areas Served</p>
            <ul className="mt-3 space-y-2">
              {AREA_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-ember-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-charcoal-700 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-sand-400">
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-sand-400">
            Estimates are indicative and subject to on-site inspection. Prices include VAT at 15%.
          </p>
        </div>
      </div>
    </footer>
  );
}
