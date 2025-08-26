'use client';
import React from 'react';
import type { Route } from 'next';
import { apiFetch } from '@/lib/api';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import FormField from '@/components/molecules/FormField';
import Card from '@/components/molecules/Card';
import { useToast } from '@/components/providers/ToastProvider';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { show } = useToast();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true); setError(null); setMessage(null); setToken(null);
      const res = await apiFetch<{ message: string; token?: string }>('/api/auth/pre-signup', {
        method: 'POST',
        json: { name, email, password }
      });
      setMessage(res.message);
      show({ type: 'success', title: 'Signup started', description: res.message });
      if (res.token) {
        setToken(res.token); // dev mode
        const href = `/auth/account/activate/${encodeURIComponent(res.token)}` as Route;
        router.push(href);
      }
    } catch (e: any) {
      setError(e.message || 'Signup failed');
      show({ type: 'error', title: 'Signup failed', description: e.message });
    } finally { setLoading(false); }
  }

  return (
    <Card title="Create your account">
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField label="Name" htmlFor="name"><Input id="name" value={name} onChange={e=>setName(e.target.value)} required /></FormField>
        <FormField label="Email" htmlFor="email"><Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></FormField>
        <FormField label="Password" htmlFor="password" hint="At least 8 characters">
          <Input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </FormField>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-emerald-400">{message}</p>}
        <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Sending…' : 'Create account'}</Button>
      </form>

      {token && (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-xs text-slate-300">
          <div className="mb-2 font-semibold text-slate-200">Dev token (paste into activation if needed):</div>
          <code className="break-all">{token}</code>
        </div>
      )}
    </Card>
  );
}
