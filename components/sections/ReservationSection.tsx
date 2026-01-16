'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { createScrollObserver } from '@/lib/animations';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MENU_TIERS } from '@/lib/constants';

export function ReservationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    menuTier: 'dinner',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
            delay: stagger(100),
            duration: 1000,
            ease: 'cubicBezier(0.22, 1, 0.36, 1)',
          });
        }
      },
      { threshold: 0.2 }
    );

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');

    // Reset form after success
    setTimeout(() => {
      setSubmitStatus('idle');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        menuTier: 'dinner',
        specialRequests: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="reserve"
      ref={sectionRef}
      className="section-secondary py-32 md:py-40 lg:py-48 px-6"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            data-animate
            className="text-xs tracking-[0.25em] uppercase mb-6 block opacity-0"
            style={{ color: 'var(--color-gold-primary)' }}
          >
            Reservations
          </span>
          <h2
            data-animate
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 opacity-0"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'var(--color-text-primary)',
            }}
          >
            By Appointment Only
          </h2>
          <p
            data-animate
            className="text-lg leading-relaxed max-w-2xl mx-auto opacity-0"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Reservations are required and accepted up to 30 days in advance.
            For special occasions or private events, please contact us directly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >
          <div data-animate className="opacity-0">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div data-animate className="opacity-0">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div data-animate className="opacity-0">
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+971 XX XXX XXXX"
              required
            />
          </div>

          <div data-animate className="opacity-0">
            <Input
              label="Number of Guests"
              name="guests"
              type="number"
              min="1"
              max="12"
              value={formData.guests}
              onChange={handleChange}
              required
            />
          </div>

          <div data-animate className="opacity-0">
            <Input
              label="Preferred Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div data-animate className="opacity-0">
            <label
              className="text-xs tracking-[0.15em] uppercase block mb-2"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Preferred Time
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-text-primary focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-300"
            >
              <option value="">Select time</option>
              <option value="12:00">12:00 PM (Lunch)</option>
              <option value="13:00">1:00 PM (Lunch)</option>
              <option value="18:00">6:00 PM (Dinner)</option>
              <option value="18:30">6:30 PM (Dinner)</option>
              <option value="19:00">7:00 PM (Dinner)</option>
              <option value="19:30">7:30 PM (Dinner)</option>
              <option value="20:00">8:00 PM (Dinner)</option>
            </select>
          </div>

          <div data-animate className="md:col-span-2 opacity-0">
            <label
              className="text-xs tracking-[0.15em] uppercase block mb-2"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Menu Selection
            </label>
            <div className="grid grid-cols-3 gap-4">
              {MENU_TIERS.map((tier) => (
                <label
                  key={tier.id}
                  className="cursor-pointer"
                >
                  <input
                    type="radio"
                    name="menuTier"
                    value={tier.id}
                    checked={formData.menuTier === tier.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className="p-4 text-center border transition-all duration-300"
                    style={{
                      borderColor:
                        formData.menuTier === tier.id
                          ? 'var(--color-gold-primary)'
                          : 'rgba(255, 255, 255, 0.1)',
                      backgroundColor:
                        formData.menuTier === tier.id
                          ? 'rgba(212, 175, 55, 0.05)'
                          : 'transparent',
                    }}
                  >
                    <p
                      className="text-sm font-medium mb-1"
                      style={{
                        color:
                          formData.menuTier === tier.id
                            ? 'var(--color-gold-primary)'
                            : 'var(--color-text-primary)',
                      }}
                    >
                      {tier.name.split(' ')[0]}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {tier.courses}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div data-animate className="md:col-span-2 opacity-0">
            <Textarea
              label="Special Requests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Dietary restrictions, allergies, special occasions..."
            />
          </div>

          <div data-animate className="md:col-span-2 text-center opacity-0">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="min-w-[200px]"
            >
              {isSubmitting ? 'Submitting...' : 'Request Reservation'}
            </Button>

            {submitStatus === 'success' && (
              <p
                className="mt-4 text-sm"
                style={{ color: 'var(--color-gold-primary)' }}
              >
                Thank you! We&apos;ll confirm your reservation shortly.
              </p>
            )}
          </div>
        </form>

        {/* Note */}
        <p
          data-animate
          className="text-center text-sm mt-12 opacity-0"
          style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}
        >
          A credit card is required to secure your reservation.
          Cancellations within 24 hours are subject to a fee.
        </p>
      </div>
    </section>
  );
}
