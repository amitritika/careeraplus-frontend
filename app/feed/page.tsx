'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function FeedPage() {
  const router = useRouter();
  const [state, setState] = React.useState<{ loading: boolean; user?: any; error?: string }>({ loading: true });

  React.useEffect(() => {
    (async () => {
      try {
        const user = await apiFetch('/api/user/profile', { method: 'GET' });
        setState({ loading: false, user });
      } catch (e: any) {
        setState({ loading: false, error: e.message || 'Unauthorized' });
        router.push('/login');
      }
    })();
  }, [router]);

  if (state.loading) return <p>Loading feed…</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Your Feed</h1>
      {state.user && <p className="text-slate-300">Welcome back, {state.user.name || state.user.username}.</p>}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <p className="text-slate-400">This is a placeholder feed. Once we add posts & groups, they’ll show up here.</p>
      </div>
    </div>
  );
}
