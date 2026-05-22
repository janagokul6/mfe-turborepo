'use client';

import { useEffect } from 'react';
import { useAuthStore, useCartStore } from '@mfe/shared';

export default function StoreHydrate() {
  useEffect(() => {
    useAuthStore.getState().hydrate();
    useCartStore.getState().hydrate();
  }, []);
  return null;
}
