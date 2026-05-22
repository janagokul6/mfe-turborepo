import React from 'react';

type Props = {
  children: React.ReactNode;
  variant?: 'error' | 'info' | 'success';
};

const styles = {
  error: 'border-red-200 bg-red-50 text-red-800',
  info: 'border-slate-200 bg-slate-50 text-slate-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
};

export function Alert({ children, variant = 'error' }: Props) {
  return (
    <p
      className={`rounded-lg border px-3 py-2 text-sm ${styles[variant]}`}
      role="alert"
    >
      {children}
    </p>
  );
}
