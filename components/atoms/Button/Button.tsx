// atoms/Button.tsx
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { LoadingSpinner } from '@/components/atoms/Icons';

const buttonStyles = cva(
  'inline-flex items-center justify-center rounded-[var(--radius-xl)] font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed active:transform active:scale-95',
  {
    variants: {
      variant: {
        // Primary brand gradient (Hero/Features style)
        primary: 'gradient-primary hover:gradient-primary-hover text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
        
        // Solid color variants
        blue: 'bg-[color:rgb(var(--primary-600))] hover:bg-[color:rgb(var(--primary-500))] text-white shadow-md hover:shadow-lg focus:ring-blue-500',
        purple: 'bg-[color:rgb(var(--secondary-600))] hover:bg-[color:rgb(var(--secondary-500))] text-white shadow-md hover:shadow-lg focus:ring-purple-500',
        green: 'bg-[color:rgb(var(--success-600))] hover:bg-[color:rgb(var(--success-500))] text-white shadow-md hover:shadow-lg focus:ring-green-500',
        orange: 'bg-[color:rgb(var(--warning-600))] hover:bg-[color:rgb(var(--warning-500))] text-white shadow-md hover:shadow-lg focus:ring-orange-500',
        red: 'bg-[color:rgb(var(--error-600))] hover:bg-[color:rgb(var(--error-500))] text-white shadow-md hover:shadow-lg focus:ring-red-500',
        
        // Outline variants
        'outline-primary': 'border-2 border-[color:rgb(var(--primary-600))] text-[color:rgb(var(--primary-600))] hover:bg-[color:rgb(var(--primary-600))] hover:text-white focus:ring-blue-500',
        'outline-blue': 'border-2 border-[color:rgb(var(--primary-600))] text-[color:rgb(var(--primary-600))] hover:bg-[color:rgb(var(--primary-600))] hover:text-white focus:ring-blue-500',
        'outline-purple': 'border-2 border-[color:rgb(var(--secondary-600))] text-[color:rgb(var(--secondary-600))] hover:bg-[color:rgb(var(--secondary-600))] hover:text-white focus:ring-purple-500',
        'outline-green': 'border-2 border-[color:rgb(var(--success-600))] text-[color:rgb(var(--success-600))] hover:bg-[color:rgb(var(--success-600))] hover:text-white focus:ring-green-500',
        'outline-orange': 'border-2 border-[color:rgb(var(--warning-600))] text-[color:rgb(var(--warning-600))] hover:bg-[color:rgb(var(--warning-600))] hover:text-white focus:ring-orange-500',
        'outline-red': 'border-2 border-[color:rgb(var(--error-600))] text-[color:rgb(var(--error-600))] hover:bg-[color:rgb(var(--error-600))] hover:text-white focus:ring-red-500',
        
        // Ghost variants
        'ghost-primary': 'text-[color:rgb(var(--primary-600))] hover:bg-[color:rgb(var(--primary-600))]/10 focus:ring-blue-500',
        'ghost-blue': 'text-[color:rgb(var(--primary-600))] hover:bg-[color:rgb(var(--primary-600))]/10 focus:ring-blue-500',
        'ghost-purple': 'text-[color:rgb(var(--secondary-600))] hover:bg-[color:rgb(var(--secondary-600))]/10 focus:ring-purple-500',
        'ghost-green': 'text-[color:rgb(var(--success-600))] hover:bg-[color:rgb(var(--success-600))]/10 focus:ring-green-500',
        'ghost-orange': 'text-[color:rgb(var(--warning-600))] hover:bg-[color:rgb(var(--warning-600))]/10 focus:ring-orange-500',
        'ghost-red': 'text-[color:rgb(var(--error-600))] hover:bg-[color:rgb(var(--error-600))]/10 focus:ring-red-500',
        
        // Special variants
        secondary: 'bg-white border border-[color:rgb(var(--neutral-300))] text-[color:rgb(var(--neutral-700))] hover:bg-[color:rgb(var(--neutral-50))] hover:border-[color:rgb(var(--neutral-400))] shadow-md hover:shadow-lg focus:ring-gray-500',
        dark: 'bg-[color:rgb(var(--neutral-900))] hover:bg-[color:rgb(var(--neutral-800))] text-white shadow-md hover:shadow-lg focus:ring-gray-500',
        light: 'bg-[color:rgb(var(--neutral-100))] hover:bg-[color:rgb(var(--neutral-200))] text-[color:rgb(var(--neutral-900))] shadow-md hover:shadow-lg focus:ring-gray-500',
        
        // Gradient special variants
        'gradient-success': 'gradient-success hover:opacity-90 text-white shadow-lg hover:shadow-xl focus:ring-green-500',
        'gradient-warning': 'gradient-warning hover:opacity-90 text-white shadow-lg hover:shadow-xl focus:ring-orange-500',
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
        xl: 'h-14 px-8 text-xl',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-[var(--radius-sm)]',
        md: 'rounded-[var(--radius-md)]',
        lg: 'rounded-[var(--radius-lg)]',
        xl: 'rounded-[var(--radius-xl)]',
        '2xl': 'rounded-[var(--radius-2xl)]',
        full: 'rounded-[var(--radius-full)]',
      },
      textWrap: {
        true: 'whitespace-normal text-center',
        false: 'whitespace-nowrap',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      rounded: 'xl',
      textWrap: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      rounded,
      textWrap,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const content = (
      <>
        {loading && (
          <LoadingSpinner 
            size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} 
          />
        )}
        {!loading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        <span>{loading && loadingText ? loadingText : children}</span>
        {!loading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </>
    );

    return (
      <button
        className={clsx(
          buttonStyles({ variant, size, fullWidth, rounded, textWrap }),
          loading && 'gap-2',
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonStyles };
export default Button;
