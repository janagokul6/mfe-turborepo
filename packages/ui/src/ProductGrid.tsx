import React from 'react';

export function ProductGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-6">{children}</div>
  );
}

export function ProductGridItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-w-[240px] flex-none sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
      {children}
    </div>
  );
}
