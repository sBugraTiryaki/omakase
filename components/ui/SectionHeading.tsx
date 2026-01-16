'use client';

import { useEffect, useRef } from 'react';
import { createScrollObserver, fadeInUp, staggerFadeInUp } from '@/lib/animations';

interface SectionHeadingProps {
  label?: string;
  labelJapanese?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  label,
  labelJapanese,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const observer = createScrollObserver(
      containerRef.current,
      () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const elements = containerRef.current?.querySelectorAll('[data-animate]');
        if (elements) {
          staggerFadeInUp(Array.from(elements) as HTMLElement[], {
            staggerDelay: 150,
            distance: 30,
          });
        }
      },
      { threshold: 0.3 }
    );

    return () => observer.disconnect();
  }, []);

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-4 mb-12 md:mb-16 ${alignmentClasses[align]} ${className}`}
    >
      {(label || labelJapanese) && (
        <div
          data-animate
          className="flex items-center gap-3 opacity-0"
        >
          {label && (
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: 'var(--color-gold-primary)' }}
            >
              {label}
            </span>
          )}
          {labelJapanese && (
            <span
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {labelJapanese}
            </span>
          )}
        </div>
      )}

      <h2
        data-animate
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light opacity-0"
        style={{
          fontFamily: 'var(--font-cormorant)',
          color: 'var(--color-text-primary)',
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          data-animate
          className="text-base md:text-lg max-w-2xl opacity-0"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
