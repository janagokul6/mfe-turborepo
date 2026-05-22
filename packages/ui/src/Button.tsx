import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'success';
type Size = 'sm' | 'md' | 'lg';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-sm disabled:opacity-50',
  secondary:
    'bg-slate-800 text-white hover:bg-slate-900 disabled:opacity-50',
  outline:
    'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-50',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  success:
    'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm disabled:opacity-50',
};

const sizes: Record<Size, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
