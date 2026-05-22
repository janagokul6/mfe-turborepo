import React, { useState } from 'react';
import { useAuthStore } from '@mfe/shared';
import { Alert, Button, Card, Input, PageHeader } from '@mfe/ui';

const AUTH_API =
  process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:4001';

export default function Login({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const r = await fetch(`${AUTH_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username }),
      });
      const data = await r.json();
      if (!r.ok) {
        setErr(data.error || 'login failed');
        return;
      }
      setAuth(data.user, data.token);
      onSuccess?.();
      window.location.href = '/products';
    } catch {
      setErr('network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <PageHeader title="Sign in" subtitle="email + username from demo users api" />
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Username"
            type="text"
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        {err && (
          <div className="mt-4">
            <Alert>{err}</Alert>
          </div>
        )}
        <p className="mt-4 text-center text-xs text-slate-400">
          john.doe@example.com / johndoe
        </p>
      </Card>
    </div>
  );
}
