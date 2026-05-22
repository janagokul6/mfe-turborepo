'use client';

import { useEffect, useState } from 'react';
import { loadMf } from '../lib/mf';
import { Alert, Spinner } from '@mfe/ui';

export default function Remote({ scope, module }: { scope: string; module: string }) {
  const [Comp, setComp] = useState<any>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    loadMf(scope, module)
      .then((C) => setComp(() => C))
      .catch(() => setErr('remote failed to load - are all apps running?'));
  }, [scope, module]);

  return (
    <div>
      {err && <Alert>{err}</Alert>}
      {!err && !Comp && <Spinner label="Loading module..." />}
      {!err && Comp && <Comp />}
    </div>
  );
}
