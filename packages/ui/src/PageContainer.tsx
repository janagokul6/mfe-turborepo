import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function PageContainer({ children, className = '' }: Props) {
  return (
    <main className={`mx-auto max-w-6xl px-4 py-8 sm:px-6 ${className}`}>
      {children}
    </main>
  );
}
