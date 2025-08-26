'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { useToast } from '@/components/providers/ToastProvider';

export default function NavAuthLinks() {
  const router = useRouter();
  const { show } = useToast();
  const [role, setRole] = React.useState<number | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        // GET profile using apiFetch
        const { user } = await apiFetch<{ user: { role?: number } }>(
          '/api/user/profile',
          { method: 'GET' }
        );
        setRole(user?.role ?? null);
      } catch {
        setRole(null);
      }
    })();
  }, []);

  async function onSignout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      // Use apiFetch and the correct route
      await apiFetch('/api/auth/signout', { method: 'GET' });
      show({ type: 'success', title: 'Signed out' });
    } catch (err: any) {
      show({ type: 'error', title: 'Signout failed', description: err?.message });
    } finally {
      // Ensure UI resets regardless
      router.replace('/login');
    }
  }

  return (
    <>
      {/* Keep Admin link simple; no Route typing needed */}
      {role === 1 && (
        <Link href={'/admin' as Route} className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">
          Admin
        </Link>
      )}

      <button
        type="button"
        onClick={onSignout}
        className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-black"
        aria-label="Sign out"
      >
        Sign out
      </button>
    </>
  );
}