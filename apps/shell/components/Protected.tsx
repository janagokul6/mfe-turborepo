'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, useAuthStore } from '@mfe/shared';
import { Spinner } from '@mfe/ui';

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    useAuthStore.getState().hydrate();
    if (getToken()) {
      setOk(true);
    } else {
      router.replace('/products');
    }
  }, [router]);

  useEffect(() => {
    if (!ok) return;
    if (!getToken()) {
      setOk(false);
      router.replace('/products');
    }
  }, [token, ok, router]);

  return (
    <>
      {!ok && <Spinner />}
      {ok && children}
    </>
  );
}
