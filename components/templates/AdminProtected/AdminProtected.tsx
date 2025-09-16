'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';
import { useAuth } from '@/components/providers/AuthProvider';
import { useToast } from '@/components/providers/ToastProvider';
import { LoadingSpinner } from '@/components/atoms/Icons';

interface AdminProtectedProps {
  children: React.ReactNode; // ✅ was: (user: any) => React.ReactNode
}

export default function AdminProtected({ children }: AdminProtectedProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { show } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login' as Route);
      } else if (user.role !== 1) {
        show({
          type: 'error',
          title: 'Access Denied',
          description: 'Admin access required. You do not have permission to access this area.',
        });
        router.replace('/feed' as Route);
      }
    }
  }, [user, loading, router, show]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-[color:rgb(var(--neutral-600))]">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 1) return null;

  // ✅ just render the children (no function call)
  return <>{children}</>;
}
