import React, { useState } from 'react';
import { getToken, useAuthStore, useCartStore } from '@mfe/shared';
import {
  Alert,
  Button,
  Card,
  CartLine,
  PageHeader,
} from '@mfe/ui';

const ORDER_API = process.env.ORDER_API_URL || 'http://localhost:4002';

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) => s.total());
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function checkout() {
    setErr('');
    if (!items.length) {
      setErr('cart is empty');
      return;
    }
    useAuthStore.getState().hydrate();
    const token = getToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }
    setBusy(true);
    try {
      const r = await fetch(`${ORDER_API}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items, total }),
      });
      if (r.status === 401) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return;
      }
      if (!r.ok) {
        const data = await r.json();
        setErr(data.error || 'checkout failed');
        return;
      }
      clearCart();
      window.location.href = '/orders';
    } catch {
      setErr('network error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Cart"
        subtitle={items.length ? `${items.length} item(s)` : undefined}
      />
      {items.length === 0 && (
        <p className="text-slate-500">
          Cart is empty.{' '}
          <button
            type="button"
            className="text-brand-600 underline"
            onClick={() => (window.location.href = '/products')}
          >
            Browse products
          </button>
        </p>
      )}
      {items.length > 0 && (
        <>
          <Card padding={false} className="overflow-hidden">
            <ul>
              {items.map((i) => (
                <CartLine
                  key={i.productId}
                  title={i.title}
                  qty={i.qty}
                  lineTotal={i.price * i.qty}
                  onMinus={() => updateQty(i.productId, i.qty - 1)}
                  onPlus={() => updateQty(i.productId, i.qty + 1)}
                  onRemove={() => removeItem(i.productId)}
                />
              ))}
            </ul>
          </Card>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xl font-bold text-slate-900">
              Total: <span className="text-brand-600">${total.toFixed(2)}</span>
            </p>
            <Button size="lg" onClick={checkout} disabled={busy}>
              {busy ? 'Processing...' : 'Checkout'}
            </Button>
          </div>
        </>
      )}
      {err && (
        <div className="mt-4">
          <Alert>{err}</Alert>
        </div>
      )}
    </div>
  );
}
