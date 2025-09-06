// atoms/Typography.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const headingStyles = cva('font-bold leading-tight', {
  variants: {
    variant: {
      h1: 'text-4xl md:text-6xl',
      h2: 'text-3xl md:text-4xl',
      h3: 'text-xl md:text-2xl',
      h4: 'text-lg md:text-xl',
    },
    color: {
      gradient: 'bg-gradient-to-r from-[color:rgb(var(--primary-600))] to-[color:rgb(var(--secondary-600))] bg-clip-text text-transparent',
      primary: 'text-[color:rgb(var(--primary-600))]',
      secondary: 'text-[color:rgb(var(--secondary-600))]',
      dark: 'text-[color:rgb(var(--neutral-900))]',
      light: 'text-white',
      muted: 'text-[color:rgb(var(--neutral-600))]',
    },
  },
  defaultVariants: {
    color: 'dark',
  },
});

const bodyStyles = cva('leading-relaxed', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    color: {
      primary: 'text-[color:rgb(var(--text))]',
      secondary: 'text-[color:rgb(var(--text-secondary))]',
      muted: 'text-[color:rgb(var(--neutral-500))]',
      light: 'text-[color:rgb(var(--neutral-300))]',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'base',
    color: 'primary',
  },
});

interface HeadingProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>, VariantProps<typeof headingStyles> {
  children: React.ReactNode;
}

interface BodyProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>, VariantProps<typeof bodyStyles> {
  children: React.ReactNode;
}

export const H1: React.FC<HeadingProps> = ({ children, variant = 'h1', color, className, ...props }) => (
  <h1 className={clsx(headingStyles({ variant, color }), className)} {...props}>
    {children}
  </h1>
);

export const H2: React.FC<HeadingProps> = ({ children, variant = 'h2', color, className, ...props }) => (
  <h2 className={clsx(headingStyles({ variant, color }), className)} {...props}>
    {children}
  </h2>
);

export const H3: React.FC<HeadingProps> = ({ children, variant = 'h3', color, className, ...props }) => (
  <h3 className={clsx(headingStyles({ variant, color }), className)} {...props}>
    {children}
  </h3>
);

export const BodyText: React.FC<BodyProps> = ({ children, size, color, className, ...props }) => (
  <p className={clsx(bodyStyles({ size, color }), className)} {...props}>
    {children}
  </p>
);
