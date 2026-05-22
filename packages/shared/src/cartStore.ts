import { create } from 'zustand';

const CART_KEY = 'mfe_cart';

export const useCartStore = create<any>((set, get) => ({
  items: [],
  addItem: (item: any, qty = 1) => {
    const items = [...get().items];
    const idx = items.findIndex((i: any) => i.productId === item.productId);
    if (idx >= 0) {
      items[idx].qty += qty;
    } else {
      items.push({ ...item, qty });
    }
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    set({ items });
  },
  removeItem: (productId: string) => {
    const items = get().items.filter((i: any) => i.productId !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    set({ items });
  },
  updateQty: (productId: string, qty: number) => {
    if (qty < 1) {
      get().removeItem(productId);
      return;
    }
    const items = get().items.map((i: any) =>
      i.productId === productId ? { ...i, qty } : i
    );
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    set({ items });
  },
  clearCart: () => {
    localStorage.removeItem(CART_KEY);
    set({ items: [] });
  },
  total: () => {
    return get().items.reduce((sum: number, i: any) => sum + i.price * i.qty, 0);
  },
  hydrate: () => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return;
      const items = JSON.parse(raw);
      if (Array.isArray(items)) set({ items });
    } catch {
      localStorage.removeItem(CART_KEY);
    }
  },
}));
