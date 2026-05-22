import React, { useEffect, useState } from 'react';
import { getToken, useAuthStore } from '@mfe/shared';
import { Alert, OrderCard, PageHeader, Spinner } from '@mfe/ui';

const ORDER_API = process.env.ORDER_API_URL || 'http://localhost:4002';
const PRODUCTS_URL = 'https://api.jsoning.com/mock/public/products';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useAuthStore.getState().hydrate();
    const token = getToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${ORDER_API}/orders`, { headers }),
      fetch(PRODUCTS_URL),
    ])
      .then(async ([ordersRes, productsRes]) => {
        if (ordersRes.status === 401) {
          useAuthStore.getState().logout();
          window.location.href = '/login';
          return;
        }
        if (!ordersRes.ok) {
          const data = await ordersRes.json().catch(() => ({}));
          throw new Error(data.error || 'could not load orders');
        }

        const ordersData = await ordersRes.json();
        let catalog: Record<string, any> = {};
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          const arr = Array.isArray(productsData)
            ? productsData
            : productsData.data || productsData.products || [];
          for (const p of arr) {
            catalog[String(p.id ?? p._id)] = p;
          }
        }

        setOrders(
          ordersData.map((o: any) => ({
            ...o,
            items: (o.items || []).map((it: any) => {
              const p = catalog[it.productId];
              return {
                title: p?.title || p?.name || it.title,
                price: p?.price != null ? Number(p.price) : it.price,
                qty: it.qty,
                description: p?.description,
              };
            }),
          }))
        );
      })
      .catch((e) => setErr(e.message || 'could not load orders'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle={orders.length ? `${orders.length} order(s)` : undefined}
      />
      {loading && <Spinner label="Loading orders..." />}
      {err && <Alert>{err}</Alert>}
      {!loading && !err && orders.length === 0 && (
        <p className="text-slate-500">No orders yet — checkout from cart</p>
      )}
      {!loading && !err && orders.length > 0 && (
        <div className="space-y-4">
          {orders.map((o) => (
            <OrderCard
              key={o._id}
              id={o._id}
              total={o.total}
              createdAt={o.createdAt}
              items={o.items}
            />
          ))}
        </div>
      )}
    </div>
  );
}
