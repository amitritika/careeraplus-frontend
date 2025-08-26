'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import DashboardLayout from '@/components/templates/DashboardLayout';
import Card from '@/components/molecules/Card';
import Button from '@/components/atoms/Button';

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
        router.replace('/login');
      }
    })();
  }, [router]);

  if (state.loading) return <p>Loading feed…</p>;

  return (
    <DashboardLayout>
      <div className="grid md:grid-cols-3 gap-4">
        <Card title={`Hi, ${state.user?.name || state.user?.username || 'there'}`} actions={<Button size="sm">Refresh</Button>}>
          <p className="text-sm text-slate-600">Welcome to your dashboard.</p>
        </Card>
        <Card title="Recent Activity">
          <ul className="text-sm space-y-2">
            <li>• User signed up</li>
            <li>• Profile updated</li>
            <li>• Admin created a tag</li>
          </ul>
        </Card>
        <Card title="Notes"><p className="text-sm">Replace with your widgets.</p></Card>
      </div>
    </DashboardLayout>
  );
}
