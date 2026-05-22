import { create } from 'zustand';

const AUTH_KEY = 'mfe_auth';

export const useAuthStore = create<any>((set) => ({
  user: null,
  token: null,
  setAuth: (user: any, token: string) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ user, token }));
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    set({ user: null, token: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/products';
    }
  },
  hydrate: () => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.user && data.token) set({ user: data.user, token: data.token });
    } catch {
      localStorage.removeItem(AUTH_KEY);
    }
  },
}));

export function isLoggedIn() {
  return !!getToken();
}

export function getToken() {
  const s = useAuthStore.getState();
  if (s.token) return s.token;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw).token;
  } catch {
    return null;
  }
}
