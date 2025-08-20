'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function AdminPage() {
  const router = useRouter();
  const [state, setState] = React.useState<{ loading: boolean; user?: any; error?: string }>({
    loading: true,
  });

  React.useEffect(() => {
    (async () => {
      try {
        const user = await apiFetch('/api/user/profile', { method: 'GET' });
        if (user.role !== 1) {
          router.replace('/feed');
          return;
        }
        setState({ loading: false, user });
      } catch (e: any) {
        setState({ loading: false, error: e.message || 'Unauthorized' });
        router.replace('/login');
      }
    })();
  }, [router]);

  if (state.loading) return <p>Loading admin…</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p className="text-slate-300">Hello, {state.user?.name}. You have admin access.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="mb-2 font-semibold">Quick actions</h2>
          <ul className="list-inside list-disc text-slate-300">
            <li>Review new signups</li>
            <li>Manage users (stub)</li>
            <li>View system health</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="mb-2 font-semibold">System</h2>
          <div className="text-sm text-slate-400">Add real admin tools later.</div>
        </div>
      </div>
    </div>
  );
}
