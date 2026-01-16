'use client';

import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, children, className = '', ...props }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center
      font-medium tracking-wide uppercase
      transition-all duration-500
      overflow-hidden
      touch-target
    `;

    const variants = {
      primary: `
        bg-gold text-luxury-black
        hover:bg-gold-light
        border border-gold
      `,
      secondary: `
        bg-transparent text-text-primary
        border border-white/20
        hover:border-white/40 hover:bg-white/5
      `,
      outline: `
        bg-transparent text-gold
        border border-gold
        hover:bg-gold hover:text-luxury-black
      `,
    };

    const sizes = {
      sm: 'px-5 py-2.5 text-xs',
      md: 'px-7 py-3.5 text-sm',
      lg: 'px-10 py-4 text-base',
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim();

    if (href) {
      return (
        <a
          href={href}
          className={combinedClassName}
          style={{ letterSpacing: '0.15em' }}
        >
          <span className="relative z-10">{children}</span>
          <span
            className="absolute inset-0 bg-gold-light opacity-0 transition-opacity duration-300 hover:opacity-100"
            aria-hidden="true"
          />
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        style={{ letterSpacing: '0.15em' }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
