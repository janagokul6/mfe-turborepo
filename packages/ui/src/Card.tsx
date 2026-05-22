import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
};

export function Card({ children, className = '', padding = true }: Props) {
  return (
    <div
      className={`rounded-xl border border-slate-200/80 bg-white shadow-sm ${padding ? 'p-5' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
