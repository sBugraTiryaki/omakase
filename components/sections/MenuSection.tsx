'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { createScrollObserver } from '@/lib/animations';
import { MENU_TIERS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return;

    const observer = createScrollObserver(
      sectionRef.current,
      () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        // Animate header
        const headerElements = sectionRef.current?.querySelectorAll('[data-animate-header]');
        if (headerElements) {
          animate(Array.from(headerElements), {
            opacity: [0, 1],
            translateY: [40, 0],
            delay: stagger(150),
            duration: 1000,
            ease: 'cubicBezier(0.22, 1, 0.36, 1)',
          });
        }

        // Animate cards
        setTimeout(() => {
          const cards = sectionRef.current?.querySelectorAll('[data-animate-card]');
          if (cards) {
            animate(Array.from(cards), {
              opacity: [0, 1],
              translateY: [60, 0],
              delay: stagger(200),
              duration: 1000,
              ease: 'cubicBezier(0.22, 1, 0.36, 1)',
            });
          }
        }, 400);
      },
      { threshold: 0.2 }
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="section-primary py-32 md:py-40 lg:py-48 px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span
            data-animate-header
            className="text-xs tracking-[0.25em] uppercase mb-6 block opacity-0"
            style={{ color: 'var(--color-gold-primary)' }}
          >
            The Menu
          </span>
          <h2
            data-animate-header
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 opacity-0"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'var(--color-text-primary)',
            }}
          >
            Seasonal Journey
          </h2>
          <p
            data-animate-header
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-0"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Our menu changes with nature&apos;s rhythm. What you experience
            tonight will never be replicated. This moment is yours alone.
          </p>
        </div>

        {/* Menu Tiers */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {MENU_TIERS.map((tier) => (
            <div
              key={tier.id}
              data-animate-card
              className={`p-8 md:p-10 opacity-0 transition-all duration-500 ${
                tier.featured ? 'relative' : ''
              }`}
              style={{
                backgroundColor: tier.featured
                  ? 'rgba(212, 175, 55, 0.05)'
                  : 'transparent',
                border: tier.featured
                  ? '1px solid var(--color-gold-primary)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Featured badge */}
              {tier.featured && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs tracking-wider uppercase"
                  style={{
                    backgroundColor: 'var(--color-gold-primary)',
                    color: 'var(--color-luxury-black)',
                  }}
                >
                  Signature
                </span>
              )}

              {/* Japanese name */}
              <p
                className="text-lg mb-2"
                style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}
              >
                {tier.japanese}
              </p>

              {/* Name */}
              <h3
                className="text-2xl md:text-3xl font-light mb-4"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {tier.name}
              </h3>

              {/* Courses */}
              <p
                className="text-sm tracking-wider uppercase mb-2"
                style={{ color: 'var(--color-gold-primary)' }}
              >
                {tier.courses}
              </p>

              {/* Duration */}
              <p
                className="text-sm mb-6"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {tier.duration}
              </p>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {tier.description}
              </p>

              {/* Price */}
              <p
                className="text-3xl font-light mb-6"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: 'var(--color-gold-primary)',
                }}
              >
                {tier.price}
              </p>

              {/* CTA */}
              <Button
                variant={tier.featured ? 'primary' : 'outline'}
                size="sm"
                href="#reserve"
                className="w-full"
              >
                Reserve
              </Button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          data-animate-header
          className="text-center text-sm mt-12 opacity-0"
          style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}
        >
          Prices exclude beverages. Wine pairing available upon request.
        </p>
      </div>
    </section>
  );
}
