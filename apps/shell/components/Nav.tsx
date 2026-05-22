'use client';

import { useEffect } from 'react';
import { AppNav, Button } from '@mfe/ui';
import { useAuthStore, useCartStore } from '@mfe/shared';

export default function Nav() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const cartCount = useCartStore((s) =>
    s.items.reduce((n: number, i: any) => n + i.qty, 0)
  );

  useEffect(() => {
    useAuthStore.getState().hydrate();
    useCartStore.getState().hydrate();
  }, []);

  const links = [
    { href: '/products', label: 'Products' },
    { href: '/cart', label: cartCount > 0 ? `Cart (${cartCount})` : 'Cart' },
    { href: '/orders', label: 'Orders' },
  ];

  const right = user ? (
    <>
      <span className="hidden text-sm text-slate-500 sm:inline">{user.email}</span>
      <Button variant="outline" size="sm" onClick={logout}>
        Logout
      </Button>
    </>
  ) : (
    <Button
      variant="primary"
      size="sm"
      onClick={() => (window.location.href = '/login')}
    >
      Login
    </Button>
  );

  return <AppNav brand="MFE Shop" links={links} right={right} />;
}
