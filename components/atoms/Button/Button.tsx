'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const styles = cva(
  'inline-flex items-center justify-center rounded-[var(--radius-xl)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:rgb(var(--brand-500))] disabled:opacity-50 transition',
  {
    variants: {
      variant: {
        primary: 'bg-[color:rgb(var(--brand-600))] hover:bg-[color:rgb(var(--brand-500))] text-white',
        secondary: 'border border-slate-300 bg-white/5 hover:bg-white/10 text-slate-900',
        ghost: 'bg-transparent hover:bg-black/5'
      },
      size: { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4', lg: 'h-12 px-6 text-lg' }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
);

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof styles>;
export default function Button({ className, variant, size, ...props }: Props) {
  return <button className={clsx(styles({ variant, size }), className)} {...props} />;
}
