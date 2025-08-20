'use client';
import React from 'react';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/providers/ToastProvider';

export default function SignupPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { show } = useToast();
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setMessage(null); setToken(null);
    try {
      const res = await apiFetch<{ message: string; token?: string }>('/api/auth/pre-signup', {
        json: { name, email, password },
        method: 'POST'
      });
      setMessage(res.message);
      show({ type: 'success', title: 'Signup started', description: res.message });
      if (res.token) setToken(res.token);
    } catch (e: any) {
      setError(e.message || 'Failed');
      show({ type: 'error', title: 'Signup failed', description: e.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        {error && <div className="rounded-md bg-red-900/40 px-3 py-2 text-sm text-red-200">{error}</div>}
        {message && <div className="rounded-md bg-emerald-900/30 px-3 py-2 text-sm text-emerald-200">{message}</div>}
        <div className="space-y-1.5">
          <label className="text-sm text-slate-300">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-slate-300">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-slate-300">Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2" required />
        </div>
        <Button type="submit" disabled={loading} className="w-full">{loading ? 'Sending…' : 'Create account'}</Button>
      </form>

      {token && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-300">
          <div className="mb-2 font-semibold text-slate-200">Dev token (paste into activation):</div>
          <code className="break-all">{token}</code>
        </div>
      )}
    </div>
  );
}
