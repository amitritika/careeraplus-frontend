// app/feed/page.tsx
'use client';

import React from 'react';
import AuthProtected from '@/components/templates/AuthProtected';
import Card from '@/components/molecules/Card';
import Button from '@/components/atoms/Button';

export default function FeedPage() {
  return (
    <AuthProtected>
      {(user) => (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome back, {user.name || user.username}!
                </h1>
                <p className="text-gray-600">Welcome to your dashboard.</p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Email: {user.email}</p>
                  <p>Role: {user.role === 1 ? 'Admin' : 'User'}</p>
                </div>
              </div>
            </div>

            <Card>
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Your Dashboard
                </h2>
                <p className="text-gray-600 mb-4">
                  Replace with your widgets.
                </p>
                <Button>Get Started</Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </AuthProtected>
  );
}
