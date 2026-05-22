import React from 'react';

export type NavItem = { href: string; label: string };

type Props = {
  brand: string;
  links: NavItem[];
  right?: React.ReactNode;
};

const linkClass =
  'rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900';

export function AppNav({ brand, links, right }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-1 px-4 py-3 sm:gap-2">
        <a href="/products" className="mr-4 text-lg font-bold text-brand-600">
          {brand}
        </a>
        {links.map((l) => (
          <a key={l.href} href={l.href} className={linkClass}>
            {l.label}
          </a>
        ))}
        <div className="ml-auto flex items-center gap-3">{right}</div>
      </div>
    </header>
  );
}
