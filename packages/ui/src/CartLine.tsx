import React from 'react';
import { Button } from './Button';

type Props = {
  title: string;
  qty: number;
  lineTotal: number;
  onMinus: () => void;
  onPlus: () => void;
  onRemove: () => void;
};

export function CartLine({
  title,
  qty,
  lineTotal,
  onMinus,
  onPlus,
  onRemove,
}: Props) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 last:border-0">
      <div>
        <p className="font-medium text-slate-900">{title}</p>
        <p className="text-sm text-slate-500">Qty: {qty}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onMinus}>
          −
        </Button>
        <span className="min-w-[2rem] text-center text-sm font-medium">
          {qty}
        </span>
        <Button variant="outline" size="sm" onClick={onPlus}>
          +
        </Button>
        <span className="ml-4 min-w-[4rem] text-right font-semibold text-slate-900">
          ${lineTotal.toFixed(2)}
        </span>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </li>
  );
}
