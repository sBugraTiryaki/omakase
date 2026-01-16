'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { createScrollObserver } from '@/lib/animations';
import { CONTACT, OPERATING_HOURS } from '@/lib/constants';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export function LocationSection() {
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
      id="location"
      ref={sectionRef}
      className="section-primary py-32 md:py-40 lg:py-48 px-6"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            data-animate
            className="text-xs tracking-[0.25em] uppercase mb-6 block opacity-0"
            style={{ color: 'var(--color-gold-primary)' }}
          >
            Location & Hours
          </span>
          <h2
            data-animate
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 opacity-0"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'var(--color-text-primary)',
            }}
          >
            Find Us
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Address & Contact */}
          <div>
            <div
              data-animate
              className="mb-10 opacity-0"
            >
              <div className="flex items-start gap-4 mb-4">
                <MapPin
                  size={24}
                  style={{ color: 'var(--color-gold-primary)' }}
                  className="flex-shrink-0 mt-1"
                />
                <div>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Address
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    {CONTACT.address}
                    <br />
                    {CONTACT.city}
                  </p>
                </div>
              </div>
            </div>

            <div
              data-animate
              className="mb-10 opacity-0"
            >
              <div className="flex items-start gap-4 mb-4">
                <Phone
                  size={24}
                  style={{ color: 'var(--color-gold-primary)' }}
                  className="flex-shrink-0 mt-1"
                />
                <div>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Phone
                  </h3>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="transition-colors duration-300"
                    style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-gold-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                    }}
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>

            <div
              data-animate
              className="opacity-0"
            >
              <div className="flex items-start gap-4">
                <Mail
                  size={24}
                  style={{ color: 'var(--color-gold-primary)' }}
                  className="flex-shrink-0 mt-1"
                />
                <div>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Email
                  </h3>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="transition-colors duration-300"
                    style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-gold-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                    }}
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <div
              data-animate
              className="opacity-0"
            >
              <div className="flex items-start gap-4 mb-6">
                <Clock
                  size={24}
                  style={{ color: 'var(--color-gold-primary)' }}
                  className="flex-shrink-0 mt-1"
                />
                <h3
                  className="text-lg font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Operating Hours
                </h3>
              </div>

              <div className="space-y-6 pl-10">
                {/* Lunch */}
                <div>
                  <p
                    className="text-sm tracking-wider uppercase mb-1"
                    style={{ color: 'var(--color-gold-primary)' }}
                  >
                    {OPERATING_HOURS.lunch.label}
                  </p>
                  <p style={{ color: 'var(--color-text-primary)' }}>
                    {OPERATING_HOURS.lunch.days}
                  </p>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    {OPERATING_HOURS.lunch.time}
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}
                  >
                    {OPERATING_HOURS.lunch.note}
                  </p>
                </div>

                {/* Dinner */}
                <div>
                  <p
                    className="text-sm tracking-wider uppercase mb-1"
                    style={{ color: 'var(--color-gold-primary)' }}
                  >
                    {OPERATING_HOURS.dinner.label}
                  </p>
                  <p style={{ color: 'var(--color-text-primary)' }}>
                    {OPERATING_HOURS.dinner.days}
                  </p>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    {OPERATING_HOURS.dinner.time}
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}
                  >
                    {OPERATING_HOURS.dinner.note}
                  </p>
                </div>

                {/* Closed */}
                <div>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    {OPERATING_HOURS.closed.days} — Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div
          data-animate
          className="mt-16 aspect-[21/9] opacity-0"
          style={{
            backgroundColor: 'var(--color-luxury-dark)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MapPin
                size={48}
                style={{ color: 'var(--color-gold-primary)', opacity: 0.3 }}
                className="mx-auto mb-4"
              />
              <p
                className="text-sm tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Interactive map coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
