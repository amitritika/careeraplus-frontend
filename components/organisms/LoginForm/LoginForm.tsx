'use client';
import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import Button from '@/components/atoms/Button'; // your per-component Button
import { useToast } from '@/components/providers/ToastProvider';
import Input from '@/components/atoms/Input';
import FormField from '@/components/molecules/FormField';
import Card from '@/components/molecules/Card';
import SocialLoginButtons from '@/components/organisms/SocialLoginButtons';

export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { show } = useToast();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true); setError(null);
      await apiFetch('/api/auth/signin', { method: 'POST', json: { email, password } });
      show({ type: 'success', title: 'Signed in' });
      router.replace('/feed');
    } catch (e: any) {
        console.log('Login error:', e);
      setError(e.message || 'Login failed');
      show({ type: 'error', title: 'Login failed', description: e.message });
    } finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <Card title="Welcome back">
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField label="Email" htmlFor="email">
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
          </FormField>
          <FormField label="Password" htmlFor="password">
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required />
          </FormField>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</Button>
        </form>
      </Card>

      <div className="my-2 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-800" />
        <span className="text-xs text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-800" />
      </div>

      <div className="mx-auto max-w-sm">
        <SocialLoginButtons />
      </div>
      <div className="mt-1 flex justify-end">
          <Link href={'/auth/password/forgot' as Route} className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
    </div>
  );
}
