import '@mfe/ui/dist/styles.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Orders from './Orders';
import { useAuthStore, useCartStore } from '@mfe/shared';

const el = document.getElementById('root');
if (el) {
  useAuthStore.getState().hydrate();
  useCartStore.getState().hydrate();
  createRoot(el).render(<Orders />);
}
