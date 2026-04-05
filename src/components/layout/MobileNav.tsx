'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { COMPANY } from '@/lib/content/company';

interface NavLink {
  href: string;
  label: string;
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
        className="p-2 text-sand-200 hover:text-ember-400 transition-colors"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-charcoal-900" onClick={() => setOpen(false)}>
          <div className="flex flex-col gap-2 px-6 pt-20" onClick={(e) => e.stopPropagation()}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-charcoal-700 py-4 font-display text-lg uppercase tracking-wide text-sand-100 hover:text-ember-400"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${COMPANY.phone}`}
              className="mt-4 text-ember-400 font-medium"
              onClick={() => setOpen(false)}
            >
              {COMPANY.phone}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
