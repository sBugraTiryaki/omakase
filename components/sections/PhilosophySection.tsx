'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { createScrollObserver } from '@/lib/animations';

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return;

    const observer = createScrollObserver(
      sectionRef.current,
      () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const elements = sectionRef.current?.querySelectorAll('[data-animate]');
        if (elements) {
          animate(Array.from(elements), {
            opacity: [0, 1],
            translateY: [40, 0],
            delay: stagger(150),
            duration: 1000,
            ease: 'cubicBezier(0.22, 1, 0.36, 1)',
          });
        }
      },
      { threshold: 0.3 }
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="section-secondary py-32 md:py-40 lg:py-48 px-6"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Japanese character */}
        <p
          data-animate
          className="text-6xl md:text-7xl mb-8 opacity-0"
          style={{ color: 'var(--color-gold-primary)', opacity: 0.3 }}
        >
          任
        </p>

        {/* Label */}
        <span
          data-animate
          className="text-xs tracking-[0.25em] uppercase mb-6 block opacity-0"
          style={{ color: 'var(--color-gold-primary)' }}
        >
          Philosophy
        </span>

        {/* Title */}
        <h2
          data-animate
          className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 opacity-0"
          style={{
            fontFamily: 'var(--font-cormorant)',
            color: 'var(--color-text-primary)',
          }}
        >
          Trust the Chef
        </h2>

        {/* Main text */}
        <p
          data-animate
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 opacity-0"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Omakase means &ldquo;I leave it up to you.&rdquo; It is an act of trust,
          a surrender to the chef&apos;s vision. Each course tells a story.
          Each ingredient, at its peak.
        </p>

        {/* Secondary text */}
        <p
          data-animate
          className="text-base leading-relaxed max-w-xl mx-auto opacity-0"
          style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}
        >
          In this intimate setting, you become part of the journey.
          No menu, no choices—only the pure expression of seasonal perfection.
        </p>

        {/* Decorative line */}
        <div
          data-animate
          className="w-16 h-[1px] mx-auto mt-12 opacity-0"
          style={{ backgroundColor: 'var(--color-gold-primary)' }}
        />
      </div>
    </section>
  );
}
