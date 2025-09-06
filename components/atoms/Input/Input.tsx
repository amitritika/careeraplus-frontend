import * as React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function Input({ className = '', ...props }: Props) {
  return (
    <input
      {...props}
      className={`block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors duration-200 ${className}`}
    />
  );
}
