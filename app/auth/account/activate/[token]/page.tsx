'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/providers/ToastProvider';

export default function ActivatePage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [status, setStatus] = React.useState<'idle'|'ok'|'err'|'loading'>('idle');
  const { show } = useToast();
  const [message, setMessage] = React.useState<string>('');

  async function activate() {
    setStatus('loading'); setMessage('Activating…');
    try {
      const res = await apiFetch<{ message: string }>('/api/auth/signup', {
        json: { token }, method: 'POST'
      });
      setStatus('ok'); setMessage(res.message || 'Activated! You can now login.');
      show({ type: 'success', title: 'Account activated' });
    } catch (e: any) {
      setStatus('err'); setMessage(e.message || 'Activation failed');
      show({ type: 'error', title: 'Activation failed', description: e.message });
    }
  }

  React.useEffect(() => { activate(); }, []);

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Account activation</h1>
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <p className="text-slate-300">{message}</p>
        {status === 'ok' && <Button className="mt-4" onClick={()=>router.push('/login')}>Go to login</Button>}
      </div>
    </div>
  );
}
