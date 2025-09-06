// components/layouts/PublicLayout.tsx
'use client';

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';

interface PublicLayoutProps {
  children: (user: any | null, loading: boolean) => React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const { user, loading } = useAuth();

  // Always render children, passing user data (which could be null) and loading state
  return <>{children(user, loading)}</>;
}
