'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HERO_SLIDES } from '@/lib/constants';
import { animate, stagger } from 'animejs';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const hasAnimatedText = useRef<Set<number>>(new Set());

  // Calculate scroll progress within the hero section
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Calculate progress (0 to 1)
    const scrolled = -rect.top;
    const maxScroll = containerHeight - viewportHeight;
    const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

    setScrollProgress(progress);

    // Update active slide
    const slideIndex = Math.min(Math.floor(progress * 3), 2);
    setActiveSlide(slideIndex);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Animate text when slide becomes active
  useEffect(() => {
    if (hasAnimatedText.current.has(activeSlide)) return;
    hasAnimatedText.current.add(activeSlide);

    const slideContainer = document.querySelector(`[data-slide="${activeSlide}"]`);
    if (!slideContainer) return;

    const elements = slideContainer.querySelectorAll('[data-animate-text]');
    animate(elements, {
      opacity: [0, 1],
      translateY: [40, 0],
      delay: stagger(100, { start: 100 }),
      duration: 800,
      ease: 'cubicBezier(0.22, 1, 0.36, 1)',
    });

    // Animate gold line
    const goldLine = slideContainer.querySelector('[data-gold-line]');
    if (goldLine) {
      animate(goldLine, {
        scaleX: [0, 1],
        duration: 1000,
        delay: 400,
        ease: 'cubicBezier(0.22, 1, 0.36, 1)',
      });
    }
  }, [activeSlide]);

  // Initial entrance animation
  useEffect(() => {
    // Animate first slide immediately
    const firstSlide = document.querySelector('[data-slide="0"]');
    if (firstSlide) {
      const elements = firstSlide.querySelectorAll('[data-animate-text]');
      animate(elements, {
        opacity: [0, 1],
        translateY: [60, 0],
        delay: stagger(150, { start: 500 }),
        duration: 1000,
        ease: 'cubicBezier(0.22, 1, 0.36, 1)',
      });

      const goldLine = firstSlide.querySelector('[data-gold-line]');
      if (goldLine) {
        animate(goldLine, {
          scaleX: [0, 1],
          duration: 1200,
          delay: 800,
          ease: 'cubicBezier(0.22, 1, 0.36, 1)',
        });
      }
    }

    // Animate scroll indicator
    animate('[data-scroll-indicator]', {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 800,
      delay: 2000,
      ease: 'cubicBezier(0.22, 1, 0.36, 1)',
    });

    hasAnimatedText.current.add(0);
  }, []);

  // Calculate transforms based on scroll progress
  const getSlideOpacity = (index: number) => {
    const segmentSize = 1 / 3;
    const start = index * segmentSize;
    const end = (index + 1) * segmentSize;

    if (index === 0) {
      // First slide: visible at start, fades out
      if (scrollProgress < 0.25) return 1;
      if (scrollProgress > 0.33) return 0;
      return 1 - (scrollProgress - 0.25) / 0.08;
    } else if (index === 1) {
      // Second slide
      if (scrollProgress < 0.25) return 0;
      if (scrollProgress < 0.33) return (scrollProgress - 0.25) / 0.08;
      if (scrollProgress < 0.58) return 1;
      if (scrollProgress > 0.66) return 0;
      return 1 - (scrollProgress - 0.58) / 0.08;
    } else {
      // Third slide
      if (scrollProgress < 0.58) return 0;
      if (scrollProgress < 0.66) return (scrollProgress - 0.58) / 0.08;
      return 1;
    }
  };

  const getSlideScale = (index: number) => {
    const segmentSize = 1 / 3;
    const start = index * segmentSize;
    const end = (index + 1) * segmentSize;

    const localProgress = Math.max(0, Math.min(1, (scrollProgress - start) / segmentSize));
    return 1 + localProgress * 0.1; // Scale from 1 to 1.1
  };

  const getTextY = (index: number) => {
    const segmentSize = 1 / 3;
    const start = index * segmentSize;
    const localProgress = Math.max(0, Math.min(1, (scrollProgress - start) / segmentSize));
    return -localProgress * 150; // Move up 150px
  };

  const getTextOpacity = (index: number) => {
    const segmentSize = 1 / 3;
    const start = index * segmentSize;
    const end = (index + 1) * segmentSize;
    const fadeStart = end - 0.1;

    // First slide: starts visible, only fades out (no fade in)
    if (index === 0) {
      if (scrollProgress < fadeStart) return 1;
      if (scrollProgress < end) return 1 - (scrollProgress - fadeStart) / 0.1;
      return 0;
    }

    // Other slides: fade in, stay visible, fade out
    if (scrollProgress < start) return 0;
    if (scrollProgress < start + 0.1) return (scrollProgress - start) / 0.1;
    if (scrollProgress < fadeStart) return 1;
    if (scrollProgress < end) return 1 - (scrollProgress - fadeStart) / 0.1;
    return 0;
  };

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.offsetHeight;
    const targetScroll = (index / 3) * containerHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={containerRef} className="relative h-[300dvh]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Background Images */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-100"
            style={{
              opacity: getSlideOpacity(index),
              transform: `scale(${getSlideScale(index)})`,
            }}
          >
            <Image
              src={slide.image}
              alt={`${slide.title} - ${slide.subtitle}`}
              fill
              priority={index === 0}
              quality={90}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.2), var(--color-luxury-black))',
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{
            opacity: scrollProgress > 0.9 ? 1 - (scrollProgress - 0.9) * 10 : 1,
          }}
        >
          <div className="relative w-full max-w-5xl">
            {HERO_SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                data-slide={index}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  transform: `translateY(${getTextY(index)}px)`,
                  opacity: getTextOpacity(index),
                  pointerEvents: activeSlide === index ? 'auto' : 'none',
                }}
              >
                {/* Pre-title */}
                <p
                  data-animate-text
                  className="text-sm uppercase tracking-[0.5em] font-light mb-6"
                  style={{
                    color: 'var(--color-gold-primary)',
                    opacity: index === 0 ? 0 : undefined,
                  }}
                >
                  {slide.preTitle}
                </p>

                {/* Main Title */}
                <h1
                  data-animate-text
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-shadow-luxury"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    color: 'var(--color-text-primary)',
                    opacity: index === 0 ? 0 : undefined,
                  }}
                >
                  {slide.title}
                </h1>

                {/* Gold Line */}
                <div
                  data-gold-line
                  className="h-[1px] w-32 md:w-40 my-10 origin-center"
                  style={{
                    backgroundColor: 'var(--color-gold-primary)',
                    transform: 'scaleX(0)',
                  }}
                />

                {/* Subtitle */}
                <p
                  data-animate-text
                  className="text-xl md:text-2xl lg:text-3xl font-light max-w-2xl leading-relaxed"
                  style={{
                    color: 'var(--color-cream)',
                    opacity: index === 0 ? 0 : undefined,
                  }}
                >
                  {slide.subtitle}
                </p>

                {/* CTA Button */}
                <div
                  data-animate-text
                  className="mt-12"
                  style={{ opacity: index === 0 ? 0 : undefined }}
                >
                  <Button variant="outline" size="lg" href="#reserve">
                    Reserve Your Seat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators - Right Side */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(index)}
              className="relative h-12 md:h-16 w-[2px] overflow-hidden cursor-pointer"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className="absolute top-0 left-0 w-full transition-all duration-600"
                style={{
                  height: activeSlide === index ? '100%' : '0%',
                  backgroundColor: 'var(--color-gold-primary)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Slide Number */}
        <div className="absolute left-8 md:left-12 bottom-12 z-20">
          <div className="flex items-baseline gap-2">
            <span
              className="text-4xl md:text-5xl font-light"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'var(--color-text-primary)',
              }}
            >
              0{activeSlide + 1}
            </span>
            <span
              className="text-sm font-light"
              style={{ color: 'var(--color-text-muted)' }}
            >
              /
            </span>
            <span
              className="text-sm font-light"
              style={{ color: 'var(--color-text-muted)' }}
            >
              0{HERO_SLIDES.length}
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          data-scroll-indicator
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-0"
        >
          <div className="flex flex-col items-center gap-3 float-subtle">
            <span
              className="text-xs uppercase tracking-[0.3em] font-light"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Scroll
            </span>
            <ChevronDown
              size={20}
              style={{ color: 'var(--color-gold-primary)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
