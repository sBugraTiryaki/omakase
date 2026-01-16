'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { animate } from 'animejs';

interface ChopsticksAnimationProps {
  className?: string;
}

export function ChopsticksAnimation({ className = '' }: ChopsticksAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftChopstickRef = useRef<SVGPathElement>(null);
  const rightChopstickRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Calculate rotation based on scroll progress
  const handleScroll = useCallback(() => {
    if (!leftChopstickRef.current || !rightChopstickRef.current) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Calculate scroll progress (0 to 1)
    const maxScroll = documentHeight - windowHeight;
    const progress = Math.min(1, scrollY / maxScroll);

    // Create a wave pattern: closed -> open -> closed -> open -> closed
    // Using sine wave for smooth animation
    const waveProgress = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;

    // Max rotation angle
    const maxAngle = 18;
    const angle = waveProgress * maxAngle;

    // Apply rotation directly without animation for smooth scroll sync
    leftChopstickRef.current.style.transform = `rotate(${-angle}deg)`;
    rightChopstickRef.current.style.transform = `rotate(${angle}deg)`;

    // Hide on certain sections (optional)
    // const heroSection = document.getElementById('hero');
    // if (heroSection) {
    //   const heroRect = heroSection.getBoundingClientRect();
    //   setIsVisible(heroRect.bottom < 0 || scrollY > windowHeight * 0.5);
    // }
  }, []);

  // Initial line draw animation
  useEffect(() => {
    if (!leftChopstickRef.current || !rightChopstickRef.current) return;

    // Get path lengths
    const leftPath = leftChopstickRef.current;
    const rightPath = rightChopstickRef.current;

    const leftLength = leftPath.getTotalLength();
    const rightLength = rightPath.getTotalLength();

    // Set up for line draw
    leftPath.style.strokeDasharray = `${leftLength}`;
    leftPath.style.strokeDashoffset = `${leftLength}`;
    rightPath.style.strokeDasharray = `${rightLength}`;
    rightPath.style.strokeDashoffset = `${rightLength}`;

    // Animate draw with delay
    setTimeout(() => {
      animate(leftPath, {
        strokeDashoffset: [leftLength, 0],
        duration: 1500,
        ease: 'cubicBezier(0.22, 1, 0.36, 1)',
      });

      animate(rightPath, {
        strokeDashoffset: [rightLength, 0],
        duration: 1500,
        delay: 200,
        ease: 'cubicBezier(0.22, 1, 0.36, 1)',
      });
    }, 1500);
  }, []);

  // Scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className={`fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 hidden lg:block transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 60 200"
        className="w-8 h-32 md:w-10 md:h-40"
        style={{ overflow: 'visible' }}
      >
        {/* Decorative top element */}
        <circle
          cx="30"
          cy="8"
          r="4"
          fill="none"
          stroke="var(--color-gold-primary)"
          strokeWidth="0.5"
          opacity="0.5"
        />

        {/* Left Chopstick */}
        <path
          ref={leftChopstickRef}
          d="M26,20 L22,180"
          stroke="var(--color-gold-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          style={{
            transformOrigin: '26px 20px',
            transition: 'transform 0.1s linear',
          }}
        />

        {/* Right Chopstick */}
        <path
          ref={rightChopstickRef}
          d="M34,20 L38,180"
          stroke="var(--color-gold-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          style={{
            transformOrigin: '34px 20px',
            transition: 'transform 0.1s linear',
          }}
        />

        {/* Decorative binding band */}
        <rect
          x="20"
          y="25"
          width="20"
          height="8"
          rx="1"
          fill="none"
          stroke="var(--color-gold-dark)"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* Subtle gradient overlay */}
        <defs>
          <linearGradient id="chopstickGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-gold-light)" />
            <stop offset="50%" stopColor="var(--color-gold-primary)" />
            <stop offset="100%" stopColor="var(--color-gold-dark)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Label */}
      <div
        className="mt-4 text-center"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}
        >
          Scroll
        </span>
      </div>
    </div>
  );
}
