import * as React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;
export default function Input({ className = '', ...props }: Props) {
  return (
    <input
      className={`w-full h-10 rounded-[var(--radius-xl)] border border-slate-300 bg-white/80 px-3 outline-none focus:ring-2 focus:ring-[color:rgb(var(--brand-500))] ${className}`}
      {...props}
    />
  );
}
