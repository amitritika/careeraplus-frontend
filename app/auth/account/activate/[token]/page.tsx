'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import Button from '@/components/atoms/Button';
import AuthLayout from '@/components/templates/AuthLayout';

export default function ActivatePage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [state, setState] = React.useState<{ status: 'idle'|'ok'|'err'|'loading'; message: string }>({
    status: 'idle', message: ''
  });

  React.useEffect(() => {
    (async () => {
      try {
        setState({ status: 'loading', message: 'Activating…' });
        const res = await apiFetch<{ message: string }>('/api/auth/signup', { method: 'POST', json: { token: decodeURIComponent(token) } });
        setState({ status: 'ok', message: res.message || 'Account activated! You can sign in.' });
      } catch (e: any) {
        setState({ status: 'err', message: e.message || 'Activation failed' });
      }
    })();
  }, [token]);

  return (
    <AuthLayout title="Account activation">
      <div className="mx-auto max-w-md rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <p className="text-slate-300">{state.message}</p>
        <Button className="mt-4" onClick={()=>router.push('/login')}>
          Go to login
        </Button>
      </div>
    </AuthLayout>
  );
}
