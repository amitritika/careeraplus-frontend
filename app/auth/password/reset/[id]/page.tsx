'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function ResetPasswordPage() {
  const { id } = useParams<{ id: string }>(); // token in the URL
  const [newPassword, setNewPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [showForm, setShowForm] = React.useState(true);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Backend route: PUT /api/auth/reset-password
      // body: { resetPasswordLink: <token>, newPassword: <pwd> }
      const res = await apiFetch<{ message: string }>(
        '/api/auth/reset-password',
        {
          method: 'PUT',
          json:{
            resetPasswordLink: id,
            newPassword,
          },
        }
      );

      setMessage(res.message || 'Password updated. Please sign in.');
      setShowForm(false);
      setNewPassword('');
    } catch (err: any) {
      setError(err?.message || 'Failed to reset password');
      setShowForm(false);
      setNewPassword('');
    }
  }

  return (
    <div className="mx-auto max-w-md py-8">
      <h1 className="mb-2 text-2xl font-semibold">Reset password</h1>
      <p className="mb-6 text-sm text-gray-600">
        Choose a new password for your account.
      </p>

      {error ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          {message}
        </div>
      ) : null}

      {showForm && (
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
            placeholder="Type new password"
            required
            className="w-full rounded-md border px-3 py-2"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
          >
            Change password
          </button>
        </form>
      )}

      {!showForm && (
        <div className="mt-4">
          <Link
            href="/login"
            className="inline-block rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Go to Sign in
          </Link>
        </div>
      )}
    </div>
  );
}
