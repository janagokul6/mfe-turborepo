import React from 'react';

type Props = {
  title: string;
  message?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, message, action }: Props) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-6 py-12 text-center">
      <p className="text-lg font-medium text-slate-700">{title}</p>
      {message && <p className="mt-2 text-sm text-slate-500">{message}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
