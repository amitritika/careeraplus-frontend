// components/templates/DashboardLayout.tsx
import React from 'react';
import Navbar from '@/components/organisms/Navbar';

type Photo = {
  contentType?: string;
  data?: string;
};

type User = {
  username: string;
  name: string;
  email: string;
  role?: number;
  photo?: Photo;
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
