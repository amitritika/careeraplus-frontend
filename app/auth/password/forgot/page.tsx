'use client';

import React from 'react';
import { apiFetch } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [showForm, setShowForm] = React.useState(true);
  const [devResetLink, setDevResetLink] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    setError('');
    setDevResetLink(null);

    try {
      // Backend route: PUT /api/auth/forgot-password  body: { email }
      const res = await apiFetch<{ message: string; token?: string }>(
        '/api/auth/forgot-password',
        { method: 'PUT', json: { email } }
      );

      setMessage(res.message || 'If your email exists, a reset link has been sent.');
      setShowForm(false);

      // Convenience for dev: when SEND_EMAILS=false backend returns token;
      // we surface a direct link to continue the flow locally.
      if (res.token && process.env.NODE_ENV !== 'production') {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        setDevResetLink(`${origin}/auth/password/reset/${res.token}`);
      }
      setEmail('');
    } catch (err: any) {
      setError(err?.message || 'Failed to start password reset');
    }
  }

  return (
    <div className="mx-auto max-w-md py-8">
      <h1 className="mb-2 text-2xl font-semibold">Forgot password</h1>
      <p className="mb-6 text-sm text-gray-600">
        Enter your account email and we’ll send you a password reset link.
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

      {devResetLink ? (
        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          <strong>Dev shortcut:</strong>{' '}
          <a className="underline" href={devResetLink}>
            Reset now
          </a>
        </div>
      ) : null}

      {showForm && (
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Type your email"
            required
            className="w-full rounded-md border px-3 py-2"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
          >
            Send password reset link
          </button>
        </form>
      )}
    </div>
  );
}
