// app/admin/page.tsx
'use client';

import React from 'react';
import AdminProtected from '@/components/templates/AdminProtected';

export default function AdminDashboard() {
  return (
    <AdminProtected>
      {(user) => (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">
                  Welcome, Admin {user.name}. Manage your platform here.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Admin Email: {user.email}</p>
                  <p>Username: {user.username}</p>
                </div>
              </div>
            </div>

            {/* Admin Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
                      <p className="mt-1 text-3xl font-semibold text-gray-900">2,845</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add more stat cards */}
            </div>

            {/* Admin Actions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Admin Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100">
                    Manage Users
                  </button>
                  <button className="w-full text-left px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100">
                    View Analytics
                  </button>
                  <button className="w-full text-left px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100">
                    System Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminProtected>
  );
}
