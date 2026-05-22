import React, { useEffect, useState } from 'react';
import { isLoggedIn, useCartStore } from '@mfe/shared';
import {
  Alert,
  PageHeader,
  ProductCard,
  ProductGrid,
  ProductGridItem,
  Spinner,
} from '@mfe/ui';

const PRODUCTS_URL =
  process.env.PRODUCTS_API_URL ||
  'https://api.jsoning.com/mock/public/products';

export default function Products() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const [list, setList] = useState<any[]>([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  const [flashId, setFlashId] = useState<string | null>(null);

  useEffect(() => {
    useCartStore.getState().hydrate();
    fetch(PRODUCTS_URL)
      .then((r) => {
        if (!r.ok) throw new Error('fail');
        return r.json();
      })
      .then((data) => {
        setList(Array.isArray(data) ? data : data.data || data.products || []);
      })
      .catch(() => setErr('could not load products'))
      .finally(() => setLoading(false));
  }, []);

  function addToCart(p: any) {
    if (!isLoggedIn()) {
      window.location.href = '/login';
      return;
    }
    const id = String(p.id ?? p._id ?? p.title);
    addItem({
      productId: id,
      title: p.title || p.name || 'item',
      price: Number(p.price) || 0,
    });
    setFlashId(id);
    setTimeout(() => setFlashId(null), 1800);
  }

  return (
    <div>
      <PageHeader title="Products" subtitle="Browse and add items to your cart" />
      {loading && <Spinner label="Loading products..." />}
      {err && <Alert>{err}</Alert>}
      {!loading && !err && list.length === 0 && (
        <p className="text-slate-500">No products found</p>
      )}
      {!loading && !err && list.length > 0 && (
        <ProductGrid>
          {list.map((p) => {
            const id = String(p.id ?? p._id ?? p.title);
            const row = items.find((i) => i.productId === id);
            const qty = row ? row.qty : 0;
            return (
              <ProductGridItem key={id}>
                <ProductCard
                  title={p.title || p.name || 'item'}
                  price={Number(p.price) || 0}
                  onAdd={() => addToCart(p)}
                  cartQty={qty}
                  justAdded={flashId === id}
                />
              </ProductGridItem>
            );
          })}
        </ProductGrid>
      )}
    </div>
  );
}
