import React from 'react';
import { Card } from './Card';

export function OrderCard({ id, total, createdAt, items }: any) {
  return (
    <Card>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
        <span className="font-semibold text-slate-900">Order #{id.slice(-6)}</span>
        <span className="text-lg font-bold text-brand-600">
          ${total.toFixed(2)}
        </span>
      </div>
      <p className="py-2 text-xs text-slate-500">
        {new Date(createdAt).toLocaleString()}
      </p>
      <ul className="mt-3 divide-y divide-slate-100">
        {items.map((it: any, idx: number) => (
          <li
            key={idx}
            className="flex flex-wrap items-start justify-between gap-3 py-3 first:pt-0"
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-900">{it.title}</p>
              {it.description ? (
                <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">
                  {it.description}
                </p>
              ) : null}
              <p className="mt-1 text-sm text-slate-500">
                {it.qty} × ${it.price.toFixed(2)}
              </p>
            </div>
            <span className="font-semibold text-slate-900">
              ${(it.price * it.qty).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
