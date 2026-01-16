'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with luxury-feel configuration
    const lenis = new Lenis({
      duration: 1.6,           // Slower, more luxurious scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,    // Less sensitive, more controlled
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
