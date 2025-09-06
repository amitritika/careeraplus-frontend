// components/layouts/AdminProtected.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { useToast } from '@/components/providers/ToastProvider';

interface AdminProtectedProps {
  children: (user: any) => React.ReactNode;
}

export default function AdminProtected({ children }: AdminProtectedProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { show } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not authenticated at all - redirect to login
        router.replace('/login');
      } else if (user.role !== 1) {
        // Authenticated but not admin - redirect to feed with error
        show({
          type: 'error',
          title: 'Access Denied',
          description: 'Admin access required. You do not have permission to access this area.',
        });
        router.replace('/feed');
      }
    }
  }, [user, loading, router, show]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Verifying admin access...</div>
        </div>
      </div>
    );
  }

  // Show redirecting state if no user or not admin
  if (!user || user.role !== 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {!user ? (
            <div className="text-lg text-gray-600">Redirecting to login...</div>
          ) : (
            <div>
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="text-lg text-gray-600">Redirecting to dashboard...</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render children with user data
  return <>{children(user)}</>;
}
