'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { apiFetch } from '@/lib/api';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { useToast } from '@/components/providers/ToastProvider';
import { useRouter } from 'next/navigation';
import SocialLoginButtons from '@/components/molecules/SocialLoginButtons';

export default function SignupForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { show } = useToast();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      setToken(null);
      
      const res = await apiFetch<{ message: string; token?: string }>('/api/auth/pre-signup', {
        method: 'POST',
        json: { name, email, password }
      });

      setMessage(res.message);
      show({ type: 'success', title: 'Signup started', description: res.message });

      if (res.token) {
        setToken(res.token); // dev mode
        const href = `/auth/account/activate/${encodeURIComponent(res.token)}` as Route;
        router.push(href);
      }
    } catch (e: any) {
      setError(e.message || 'Signup failed');
      show({ type: 'error', title: 'Signup failed', description: e.message });
    } finally {
      setLoading(false);
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Attempting ${provider} login`);
    // Custom logic before redirect if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--surface-2))] via-white to-[color:rgb(var(--secondary-400))]/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 gradient-success rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-[color:rgb(var(--secondary-600))] to-[color:rgb(var(--primary-600))] rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 gradient-warning rounded-full opacity-5 blur-2xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[color:rgb(var(--success-600))] to-[color:rgb(var(--primary-600))] rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[color:rgb(var(--text))] mb-2">
            Join CareerPlus
          </h1>
          <p className="text-[color:rgb(var(--text-secondary))] text-sm">
            Start building your dream career in minutes
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[var(--radius-2xl)] shadow-xl border border-white/20 p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-[color:rgb(var(--text))]">
                Full Name
              </label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[color:rgb(var(--neutral-300))] focus:border-[color:rgb(var(--success-600))] focus:ring-4 focus:ring-[color:rgb(var(--success-600))]/10 transition-all duration-200 bg-white/50 backdrop-blur-sm pl-12"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[color:rgb(var(--text-secondary))]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

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
                  className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[color:rgb(var(--neutral-300))] focus:border-[color:rgb(var(--success-600))] focus:ring-4 focus:ring-[color:rgb(var(--success-600))]/10 transition-all duration-200 bg-white/50 backdrop-blur-sm pl-12"
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
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[color:rgb(var(--neutral-300))] focus:border-[color:rgb(var(--success-600))] focus:ring-4 focus:ring-[color:rgb(var(--success-600))]/10 transition-all duration-200 bg-white/50 backdrop-blur-sm pl-12"
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

            {/* Success Message */}
            {message && (
              <div className="flex items-center gap-2 p-3 rounded-[var(--radius-lg)] bg-[color:rgb(var(--success-400))]/10 border border-[color:rgb(var(--success-400))]/20 text-[color:rgb(var(--success-600))] text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {message}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradient-success"
              size="lg"
              fullWidth
              loading={loading}
              loadingText="Creating account..."
              className="font-semibold"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

            {/* Terms */}
            <p className="text-xs text-[color:rgb(var(--text-secondary))] text-center">
              By creating an account, you agree to our{' '}
              <Link href={"/terms" as Route} className="text-[color:rgb(var(--success-600))] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href={"/privacy" as Route} className="text-[color:rgb(var(--success-600))] hover:underline">
                Privacy Policy
              </Link>
            </p>
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

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[color:rgb(var(--text-secondary))]">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="text-[color:rgb(var(--success-600))] hover:text-[color:rgb(var(--success-500))] font-semibold transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Benefits Preview */}
        <div className="mt-8 space-y-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-[color:rgb(var(--text))] mb-3">
              What you'll get with Career A+
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-[var(--radius-lg)] bg-white/40 backdrop-blur-sm border border-white/30">
              <div className="w-8 h-8 gradient-success rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[color:rgb(var(--text))]">Visual Resume Builder</p>
                <p className="text-xs text-[color:rgb(var(--text-secondary))]">Create stunning resumes in 15 minutes</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-[var(--radius-lg)] bg-white/40 backdrop-blur-sm border border-white/30">
              <div className="w-8 h-8 bg-gradient-to-r from-[color:rgb(var(--secondary-600))] to-[color:rgb(var(--primary-600))] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[color:rgb(var(--text))]">Exam Preparation</p>
                <p className="text-xs text-[color:rgb(var(--text-secondary))]">GATE, ESE & PSC study plans</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-[var(--radius-lg)] bg-white/40 backdrop-blur-sm border border-white/30">
              <div className="w-8 h-8 gradient-warning rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[color:rgb(var(--text))]">Career Guidance</p>
                <p className="text-xs text-[color:rgb(var(--text-secondary))]">Expert advice & skill development</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dev Token Display (if exists) */}
        {token && (
          <div className="mt-6 p-4 rounded-[var(--radius-lg)] bg-[color:rgb(var(--warning-400))]/10 border border-[color:rgb(var(--warning-400))]/20">
            <p className="text-sm font-medium text-[color:rgb(var(--warning-600))] mb-2">
              Dev Mode - Activation Token:
            </p>
            <code className="text-xs text-[color:rgb(var(--text))] bg-white/50 px-2 py-1 rounded break-all">
              {token}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
