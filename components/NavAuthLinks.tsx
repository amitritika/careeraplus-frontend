'use client';
import React from 'react';
import Link from 'next/link';
import { useToast } from './providers/ToastProvider';
import { API_BASE } from '@/lib/api';

export default function NavAuthLinks() {
  const [role, setRole] = React.useState<number | null>(null);
  const { show } = useToast();

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/user/profile`, { credentials: 'include' });
        if (!res.ok) return;
        const json = await res.json();
        if (typeof json?.role === 'number') setRole(json.role);
      } catch {}
    })();
  }, []);

  async function signout(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await fetch(`${API_BASE}/api/auth/signout`, { credentials: 'include' });
      show({ type: 'success', title: 'Signed out' });
      window.location.href = '/login';
    } catch (e:any) {
      show({ type: 'error', title: 'Signout failed', description: e.message });
    }
  }

  return (
    <>
      {role === 1 && <Link href="/admin">Admin</Link>}
      <a href="#" onClick={signout}>Sign out</a>
    </>
  );
}
