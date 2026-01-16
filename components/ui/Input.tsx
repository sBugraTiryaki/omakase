'use client';

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            className="text-xs tracking-[0.15em] uppercase"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3
            bg-white/5 border border-white/10
            text-text-primary placeholder:text-text-muted
            focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30
            transition-all duration-300
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-400">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            className="text-xs tracking-[0.15em] uppercase"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 min-h-[120px] resize-none
            bg-white/5 border border-white/10
            text-text-primary placeholder:text-text-muted
            focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30
            transition-all duration-300
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-400">{error}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
