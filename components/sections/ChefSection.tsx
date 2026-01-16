'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { animate, stagger } from 'animejs';
import { createScrollObserver } from '@/lib/animations';
import { CHEF } from '@/lib/constants';

export function ChefSection() {
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

        // Animate credentials with stagger
        setTimeout(() => {
          const credentials = sectionRef.current?.querySelectorAll('[data-animate-credential]');
          if (credentials) {
            animate(Array.from(credentials), {
              opacity: [0, 1],
              translateX: [-20, 0],
              delay: stagger(100),
              duration: 800,
              ease: 'cubicBezier(0.22, 1, 0.36, 1)',
            });
          }
        }, 800);
      },
      { threshold: 0.3 }
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="chef"
      ref={sectionRef}
      className="section-secondary py-32 md:py-40 lg:py-48 px-6"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Chef Portrait */}
          <div
            data-animate
            className="aspect-[3/4] relative opacity-0 order-2 lg:order-1 overflow-hidden"
          >
            <Image
              src="/images/chef/chef.png"
              alt={`Chef ${CHEF.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle overlay for depth */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 30%)',
              }}
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span
              data-animate
              className="text-xs tracking-[0.25em] uppercase mb-6 block opacity-0"
              style={{ color: 'var(--color-gold-primary)' }}
            >
              The Chef
            </span>

            {/* Japanese name */}
            <p
              data-animate
              className="text-2xl mb-2 opacity-0"
              style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}
            >
              {CHEF.nameJapanese}
            </p>

            {/* Name */}
            <h2
              data-animate
              className="text-4xl md:text-5xl font-light mb-4 opacity-0"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'var(--color-text-primary)',
              }}
            >
              {CHEF.name}
            </h2>

            {/* Title */}
            <p
              data-animate
              className="text-sm tracking-wider mb-8 opacity-0"
              style={{ color: 'var(--color-gold-primary)' }}
            >
              {CHEF.title}
            </p>

            {/* Philosophy quote */}
            <blockquote
              data-animate
              className="text-lg md:text-xl leading-relaxed mb-8 opacity-0"
              style={{
                color: 'var(--color-text-secondary)',
                borderLeft: '2px solid var(--color-gold-primary)',
                paddingLeft: '1.5rem',
              }}
            >
              &ldquo;{CHEF.philosophy}&rdquo;
            </blockquote>

            {/* Experience */}
            <div
              data-animate
              className="flex gap-8 mb-8 opacity-0"
            >
              <div>
                <p
                  className="text-2xl font-light"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    color: 'var(--color-gold-primary)',
                  }}
                >
                  {CHEF.experience}
                </p>
                <p
                  className="text-xs tracking-wider uppercase"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Experience
                </p>
              </div>
              <div>
                <p
                  className="text-2xl font-light"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    color: 'var(--color-gold-primary)',
                  }}
                >
                  {CHEF.training}
                </p>
                <p
                  className="text-xs tracking-wider uppercase"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Training
                </p>
              </div>
            </div>

            {/* Credentials */}
            <ul className="space-y-3">
              {CHEF.credentials.map((credential, index) => (
                <li
                  key={index}
                  data-animate-credential
                  className="flex items-start gap-3 opacity-0"
                >
                  <span
                    className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-gold-primary)' }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {credential}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
