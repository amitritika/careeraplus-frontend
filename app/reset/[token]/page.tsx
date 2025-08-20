'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/providers/ToastProvider';

export default function ResetPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [newPassword, setNewPassword] = React.useState('');
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { show } = useToast();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setMessage(null);
    try {
      const res = await apiFetch<{message:string}>('/api/auth/reset-password', {
        json: { resetPasswordLink: token, newPassword }, method: 'PUT'
      });
      setMessage(res.message);
      show({ type: 'success', title: 'Password reset', description: res.message });
      setTimeout(()=>router.push('/login'), 1200);
    } catch (e: any) {
      setError(e.message || 'Failed');
      show({ type: 'error', title: 'Reset failed', description: e.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        {error && <div className="rounded-md bg-red-900/40 px-3 py-2 text-sm text-red-200">{error}</div>}
        {message && <div className="rounded-md bg-emerald-900/30 px-3 py-2 text-sm text-emerald-200">{message}</div>}
        <div className="space-y-1.5">
          <label className="text-sm text-slate-300">New password</label>
          <input value={newPassword} onChange={e=>setNewPassword(e.target.value)} type="password" className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2" required />
        </div>
        <Button type="submit" disabled={loading} className="w-full">{loading ? 'Resetting…' : 'Reset password'}</Button>
      </form>
    </div>
  );
}
