import React from 'react';
import { Button } from './Button';
import { Card } from './Card';

type Props = {
  title: string;
  price: number;
  onAdd: () => void;
  cartQty?: number;
  justAdded?: boolean;
};

export function ProductCard({
  title,
  price,
  onAdd,
  cartQty = 0,
  justAdded = false,
}: Props) {
  const inCart = cartQty > 0;

  let btnLabel = 'Add to cart';
  let btnVariant: 'primary' | 'outline' | 'success' = 'primary';
  if (justAdded) {
    btnLabel = 'Added!';
    btnVariant = 'success';
  } else if (inCart) {
    btnLabel = `In cart (${cartQty})`;
    btnVariant = 'outline';
  }

  return (
    <Card
      className={`flex h-full flex-col transition-all duration-300 hover:shadow-md ${
        justAdded ? 'ring-2 ring-emerald-400 ring-offset-2' : ''
      } ${inCart && !justAdded ? 'border-emerald-200' : ''}`}
    >
      <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-brand-50 to-slate-100">
        <span className="text-3xl opacity-40">📦</span>
      </div>
      <h3 className="flex-1 font-semibold text-slate-900 line-clamp-2">{title}</h3>
      <p className="mt-2 text-xl font-bold text-brand-600">${price.toFixed(2)}</p>
      {inCart && !justAdded && (
        <p className="mt-1 text-xs font-medium text-emerald-600">Already in your cart</p>
      )}
      {justAdded && (
        <p className="mt-1 text-xs font-medium text-emerald-600">Added to cart</p>
      )}
      <Button
        className={`mt-4 ${justAdded ? 'scale-95' : ''}`}
        variant={btnVariant}
        fullWidth
        onClick={onAdd}
      >
        {btnLabel}
      </Button>
    </Card>
  );
}
