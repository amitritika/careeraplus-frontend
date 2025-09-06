'use client';

import * as React from 'react';

type SocialProvider = 'google' | 'facebook' | 'linkedin' | 'twitter' | 'github';

interface SocialLoginButtonProps {
  provider: SocialProvider;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const providerConfig = {
  google: {
    name: 'Google',
    color: '#4285F4',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" fill="#1877F2" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
        />
      </svg>
    ),
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0077B5',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" fill="#0077B5" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 0h-18c-0.552 0-1 0.448-1 1v18c0 0.552 0.448 1 1 1h18c0.552 0 1-0.448 1-1v-18c0-0.552-0.448-1-1-1zM6 17h-3v-9h3v9zM4.5 6.3c-0.966 0-1.75-0.784-1.75-1.75s0.784-1.75 1.75-1.75 1.75 0.784 1.75 1.75-0.784 1.75-1.75 1.75zM17 17h-3v-4.39c0-1.049-0.019-2.399-1.46-2.399-1.461 0-1.685 1.141-1.685 2.323v4.466h-3v-9h2.88v1.322h0.04c0.401-0.762 1.381-1.562 2.84-1.562 3.039 0 3.6 1.999 3.6 4.598v5.232z"
        />
      </svg>
    ),
  },
  twitter: {
    name: 'Twitter',
    color: '#1DA1F2',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" fill="#1DA1F2" viewBox="0 0 20 20">
        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  github: {
    name: 'GitHub',
    color: '#333333',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" fill="#333333" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 0C4.477 0 0 4.477 0 10c0 4.425 2.865 8.165 6.837 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.577.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z"
        />
      </svg>
    ),
  },
};

const sizeConfig = {
  sm: 'py-1.5 px-3 text-xs',
  md: 'py-2 px-4 text-sm',
  lg: 'py-3 px-6 text-base',
};

export default function SocialLoginButton({
  provider,
  onClick,
  disabled = false,
  className = '',
  size = 'md',
}: SocialLoginButtonProps) {
  const config = providerConfig[provider];

  if (!config) {
    console.warn(`Unsupported social provider: ${provider}`);
    return null;
  }

  const baseClasses = `
    inline-flex w-full justify-center items-center rounded-md border border-slate-300 
    bg-white font-medium text-slate-500 shadow-sm 
    hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    transition-colors duration-200
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
  `;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeConfig[size]} ${className}`.trim()}
      aria-label={`Sign in with ${config.name}`}
    >
      <span className="sr-only">Sign in with {config.name}</span>
      {config.icon}
    </button>
  );
}
