import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-sand-400">
        <Link href="/" className="hover:text-ember-400 transition-colors">Home</Link>
        {items.map((item, i) => (
          <span key={item.path} className="flex items-center gap-2">
            <span>/</span>
            {i === items.length - 1 ? (
              <span className="text-sand-200">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-ember-400 transition-colors">{item.name}</Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
