'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { createScrollObserver } from '@/lib/animations';
import { COURSE_PROGRESSION } from '@/lib/constants';

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return;

    const observer = createScrollObserver(
      sectionRef.current,
      () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        // Animate header elements
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

        // Animate course items with longer stagger
        setTimeout(() => {
          const courseItems = sectionRef.current?.querySelectorAll('[data-animate-course]');
          if (courseItems) {
            animate(Array.from(courseItems), {
              opacity: [0, 1],
              translateX: [-30, 0],
              delay: stagger(100),
              duration: 800,
              ease: 'cubicBezier(0.22, 1, 0.36, 1)',
            });
          }
        }, 600);
      },
      { threshold: 0.2 }
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
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
            The Experience
          </span>
          <h2
            data-animate-header
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 opacity-0"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'var(--color-text-primary)',
            }}
          >
            12 Seats. One Evening.
          </h2>
          <p
            data-animate-header
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-0"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Sit at the counter. Watch mastery unfold. Each movement is deliberate,
            each presentation a work of art. This is not dining. This is theater.
          </p>
        </div>

        {/* Course Progression */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {COURSE_PROGRESSION.map((course, index) => (
            <div
              key={course.name}
              data-animate-course
              className="p-6 border opacity-0 transition-all duration-500 hover:border-gold/50"
              style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              {/* Course number */}
              <span
                className="text-xs tracking-wider mb-4 block"
                style={{ color: 'var(--color-gold-primary)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Japanese name */}
              <p
                className="text-2xl mb-1"
                style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}
              >
                {course.japanese}
              </p>

              {/* English name */}
              <h3
                className="text-xl font-light mb-2"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {course.name}
              </h3>

              {/* Description */}
              <p
                className="text-sm"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {course.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          data-animate-header
          className="text-center text-sm mt-12 opacity-0"
          style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}
        >
          * Course selection varies by season and availability
        </p>
      </div>
    </section>
  );
}
