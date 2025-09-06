'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import Button from '@/components/atoms/Button';
import { useToast } from '@/components/providers/ToastProvider';
import Input from '@/components/atoms/Input';
import SocialLoginButtons from '@/components/molecules/SocialLoginButtons';

export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { show } = useToast();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await apiFetch('/api/auth/signin', { method: 'POST', json: { email, password } });
      show({ type: 'success', title: 'Signed in' });
      router.replace('/feed' as Route);
    } catch (e: any) {
      console.log('Login error:', e);
      setError(e.message || 'Login failed');
      show({ type: 'error', title: 'Login failed', description: e.message });
    } finally {
      setLoading(false);
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Attempting ${provider} login`);
    // Custom logic before redirect if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--surface-2))] via-white to-[color:rgb(var(--primary-400))]/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 gradient-primary rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 gradient-success rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[color:rgb(var(--secondary-400))] to-[color:rgb(var(--primary-400))] rounded-full opacity-5 blur-2xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[color:rgb(var(--text))] mb-2">
            Welcome Back
          </h1>
          <p className="text-[color:rgb(var(--text-secondary))] text-sm">
            Sign in to continue your career journey
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[var(--radius-2xl)] shadow-xl border border-white/20 p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-[color:rgb(var(--text))]">
                Email Address
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[color:rgb(var(--neutral-300))] focus:border-[color:rgb(var(--primary-600))] focus:ring-4 focus:ring-[color:rgb(var(--primary-600))]/10 transition-all duration-200 bg-white/50 backdrop-blur-sm pl-12"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[color:rgb(var(--text-secondary))]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-[color:rgb(var(--text))]">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[color:rgb(var(--neutral-300))] focus:border-[color:rgb(var(--primary-600))] focus:ring-4 focus:ring-[color:rgb(var(--primary-600))]/10 transition-all duration-200 bg-white/50 backdrop-blur-sm pl-12"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[color:rgb(var(--text-secondary))]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-[var(--radius-lg)] bg-[color:rgb(var(--error-400))]/10 border border-[color:rgb(var(--error-400))]/20 text-[color:rgb(var(--error-600))] text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              loadingText="Signing in..."
              className="font-semibold"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link 
                href={"/auth/password/forgot" as Route}
                className="text-sm text-[color:rgb(var(--primary-600))] hover:text-[color:rgb(var(--primary-500))] font-medium transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[color:rgb(var(--neutral-300))] to-transparent"></div>
            <span className="px-4 text-sm text-[color:rgb(var(--text-secondary))] bg-white/80">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[color:rgb(var(--neutral-300))] to-transparent"></div>
          </div>

          {/* Social Login */}
          <SocialLoginButtons onProviderClick={handleSocialLogin} />
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[color:rgb(var(--text-secondary))]">
            Don't have an account?{' '}
            <Link 
              href={"/signup" as Route}
              className="text-[color:rgb(var(--primary-600))] hover:text-[color:rgb(var(--primary-500))] font-semibold transition-colors duration-200"
            >
              Create one now
            </Link>
          </p>
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-2 gap-4 opacity-80">
          <div className="flex items-center gap-2 text-xs text-[color:rgb(var(--text-secondary))]">
            <div className="w-2 h-2 gradient-primary rounded-full"></div>
            Visual Resume Builder
          </div>
          <div className="flex items-center gap-2 text-xs text-[color:rgb(var(--text-secondary))]">
            <div className="w-2 h-2 gradient-success rounded-full"></div>
            Career Guidance
          </div>
          <div className="flex items-center gap-2 text-xs text-[color:rgb(var(--text-secondary))]">
            <div className="w-2 h-2 bg-gradient-to-r from-[color:rgb(var(--secondary-600))] to-[color:rgb(var(--primary-600))] rounded-full"></div>
            Exam Preparation
          </div>
          <div className="flex items-center gap-2 text-xs text-[color:rgb(var(--text-secondary))]">
            <div className="w-2 h-2 gradient-warning rounded-full"></div>
            Instant Sharing
          </div>
        </div>
      </div>
    </div>
  );
}
