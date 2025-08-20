'use client';
import React from 'react';
import { Button } from './ui/Button';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { useToast } from './providers/ToastProvider';

export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const { show } = useToast();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch('/api/auth/signin', {
        json: { email, password },
        method: 'POST',
      });
      show({ type: 'success', title: 'Welcome back!' });
      router.push('/feed');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      show({ type: 'error', title: 'Login failed', description: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <h2 className="text-xl font-semibold">Login</h2>
      {error && <div className="rounded-md bg-red-900/40 px-3 py-2 text-sm text-red-200">{error}</div>}
      <div className="space-y-1.5">
        <label className="text-sm text-slate-300">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm text-slate-300">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
          required
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
      <p className="text-xs text-slate-400">By continuing, you agree to our terms.</p>
    </form>
  );
}
