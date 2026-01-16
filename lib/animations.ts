/**
 * Anime.js v4 Animation Presets for Omakase
 *
 * Usage:
 * - Import functions and call them with target selectors
 * - Scroll animations auto-play based on scroll position
 * - Manual animations return animation instance for control
 */

import { animate, stagger, createTimeline } from 'animejs';

// ===== Easing Curves =====
export const LUXURY_EASE = 'cubicBezier(0.22, 1, 0.36, 1)';
export const DRAMATIC_EASE = 'cubicBezier(0.16, 1, 0.3, 1)';
export const SMOOTH_EASE = 'cubicBezier(0.25, 0.1, 0.25, 1)';

// ===== Entrance Animations =====

/**
 * Fade in with upward movement
 */
export function fadeInUp(targets: string | HTMLElement | HTMLElement[], options?: {
  duration?: number;
  delay?: number;
  distance?: number;
}) {
  const { duration = 1000, delay = 0, distance = 60 } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    translateY: [distance, 0],
    duration,
    delay,
    ease: LUXURY_EASE,
  });
}

/**
 * Fade in from left
 */
export function fadeInLeft(targets: string | HTMLElement | HTMLElement[], options?: {
  duration?: number;
  delay?: number;
  distance?: number;
}) {
  const { duration = 1000, delay = 0, distance = 80 } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    translateX: [-distance, 0],
    duration,
    delay,
    ease: LUXURY_EASE,
  });
}

/**
 * Fade in from right
 */
export function fadeInRight(targets: string | HTMLElement | HTMLElement[], options?: {
  duration?: number;
  delay?: number;
  distance?: number;
}) {
  const { duration = 1000, delay = 0, distance = 80 } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    translateX: [distance, 0],
    duration,
    delay,
    ease: LUXURY_EASE,
  });
}

/**
 * Scale up with fade
 */
export function scaleUp(targets: string | HTMLElement | HTMLElement[], options?: {
  duration?: number;
  delay?: number;
}) {
  const { duration = 800, delay = 0 } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    scale: [0.95, 1],
    duration,
    delay,
    ease: LUXURY_EASE,
  });
}

/**
 * Blur in effect
 */
export function blurIn(targets: string | HTMLElement | HTMLElement[], options?: {
  duration?: number;
  delay?: number;
}) {
  const { duration = 1200, delay = 0 } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    filter: ['blur(20px)', 'blur(0px)'],
    duration,
    delay,
    ease: LUXURY_EASE,
  });
}

// ===== Staggered Animations =====

/**
 * Staggered fade in up for lists/grids
 */
export function staggerFadeInUp(targets: string | HTMLElement | HTMLElement[], options?: {
  duration?: number;
  staggerDelay?: number;
  distance?: number;
}) {
  const { duration = 800, staggerDelay = 100, distance = 40 } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    translateY: [distance, 0],
    duration,
    delay: stagger(staggerDelay),
    ease: LUXURY_EASE,
  });
}

/**
 * Staggered text reveal (character by character)
 */
export function staggerTextReveal(targets: string | HTMLElement | HTMLElement[], options?: {
  duration?: number;
  staggerDelay?: number;
}) {
  const { duration = 600, staggerDelay = 30 } = options || {};

  return animate(targets, {
    opacity: [0, 1],
    translateY: [20, 0],
    duration,
    delay: stagger(staggerDelay),
    ease: DRAMATIC_EASE,
  });
}

// ===== Hover Animations =====

/**
 * Subtle scale on hover
 */
export function hoverScale(targets: string | HTMLElement | HTMLElement[]) {
  return animate(targets, {
    scale: 1.03,
    duration: 400,
    ease: LUXURY_EASE,
  });
}

/**
 * Reset hover scale
 */
export function hoverScaleReset(targets: string | HTMLElement | HTMLElement[]) {
  return animate(targets, {
    scale: 1,
    duration: 400,
    ease: LUXURY_EASE,
  });
}

// ===== Continuous Animations =====

/**
 * Subtle floating animation
 */
export function floatAnimation(targets: string | HTMLElement | HTMLElement[]) {
  return animate(targets, {
    translateY: [-8, 8, -8],
    duration: 6000,
    ease: 'inOutSine',
    loop: true,
  });
}

/**
 * Ken Burns effect for images
 */
export function kenBurnsAnimation(targets: string | HTMLElement | HTMLElement[]) {
  return animate(targets, {
    scale: [1, 1.08],
    duration: 25000,
    ease: 'linear',
    direction: 'alternate',
    loop: true,
  });
}

/**
 * Gold glow pulse
 */
export function glowPulse(targets: string | HTMLElement | HTMLElement[]) {
  return animate(targets, {
    boxShadow: [
      '0 0 20px rgba(212, 175, 55, 0.2)',
      '0 0 40px rgba(212, 175, 55, 0.4)',
      '0 0 20px rgba(212, 175, 55, 0.2)',
    ],
    duration: 3000,
    ease: 'inOutSine',
    loop: true,
  });
}

// ===== Timeline Presets =====

/**
 * Hero entrance timeline
 */
export function heroEntranceTimeline(selectors: {
  preTitle?: string;
  title?: string;
  subtitle?: string;
  cta?: string;
  scrollIndicator?: string;
}) {
  const tl = createTimeline({
    defaults: { ease: LUXURY_EASE },
  });

  if (selectors.preTitle) {
    tl.add(selectors.preTitle, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
    }, 0);
  }

  if (selectors.title) {
    tl.add(selectors.title, {
      opacity: [0, 1],
      translateY: [60, 0],
      duration: 1200,
    }, 200);
  }

  if (selectors.subtitle) {
    tl.add(selectors.subtitle, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
    }, 600);
  }

  if (selectors.cta) {
    tl.add(selectors.cta, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
    }, 900);
  }

  if (selectors.scrollIndicator) {
    tl.add(selectors.scrollIndicator, {
      opacity: [0, 1],
      duration: 600,
    }, 1200);
  }

  return tl;
}

/**
 * Section entrance timeline
 */
export function sectionEntranceTimeline(selectors: {
  label?: string;
  heading?: string;
  text?: string;
  content?: string;
}) {
  const tl = createTimeline({
    defaults: { ease: LUXURY_EASE },
  });

  if (selectors.label) {
    tl.add(selectors.label, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
    }, 0);
  }

  if (selectors.heading) {
    tl.add(selectors.heading, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
    }, 150);
  }

  if (selectors.text) {
    tl.add(selectors.text, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
    }, 400);
  }

  if (selectors.content) {
    tl.add(selectors.content, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
    }, 600);
  }

  return tl;
}

// ===== SVG Animations =====

/**
 * SVG path draw animation
 */
export function drawPath(targets: string | SVGPathElement | SVGPathElement[], options?: {
  duration?: number;
  delay?: number;
}) {
  const { duration = 1500, delay = 0 } = options || {};

  // Get path length and set up stroke-dasharray
  const paths = typeof targets === 'string'
    ? document.querySelectorAll<SVGPathElement>(targets)
    : Array.isArray(targets) ? targets : [targets];

  let totalLength = 0;
  paths.forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    totalLength = length;
  });

  return animate(targets, {
    strokeDashoffset: [totalLength, 0],
    duration,
    delay,
    ease: LUXURY_EASE,
  });
}

/**
 * Chopsticks rotation animation (for scroll sync)
 */
export function chopsticksRotation(leftSelector: string, rightSelector: string, options?: {
  maxAngle?: number;
}) {
  const { maxAngle = 15 } = options || {};

  return {
    open: () => {
      animate(leftSelector, {
        rotate: -maxAngle,
        duration: 600,
        ease: LUXURY_EASE,
      });
      animate(rightSelector, {
        rotate: maxAngle,
        duration: 600,
        ease: LUXURY_EASE,
      });
    },
    close: () => {
      animate(leftSelector, {
        rotate: 0,
        duration: 600,
        ease: LUXURY_EASE,
      });
      animate(rightSelector, {
        rotate: 0,
        duration: 600,
        ease: LUXURY_EASE,
      });
    },
    setRotation: (progress: number) => {
      // progress 0-1, where 0.5 is fully open
      const angle = Math.sin(progress * Math.PI) * maxAngle;
      animate(leftSelector, {
        rotate: -angle,
        duration: 0,
      });
      animate(rightSelector, {
        rotate: angle,
        duration: 0,
      });
    },
  };
}

// ===== Utility Functions =====

/**
 * Create a scroll-triggered animation observer
 */
export function createScrollObserver(
  targets: string | HTMLElement | HTMLElement[],
  onEnter: () => void,
  options?: {
    threshold?: number;
    rootMargin?: string;
  }
) {
  const { threshold = 0.2, rootMargin = '0px' } = options || {};

  const elements = typeof targets === 'string'
    ? document.querySelectorAll(targets)
    : Array.isArray(targets) ? targets : [targets];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onEnter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold, rootMargin }
  );

  elements.forEach((el) => observer.observe(el));

  return observer;
}

/**
 * Animate with scroll progress (0-1)
 */
export function animateWithProgress(
  targets: string | HTMLElement | HTMLElement[],
  properties: Record<string, [number, number] | [string, string]>,
  progress: number
) {
  const interpolatedProps: Record<string, number | string> = {};

  Object.entries(properties).forEach(([key, [from, to]]) => {
    if (typeof from === 'number' && typeof to === 'number') {
      interpolatedProps[key] = from + (to - from) * progress;
    }
  });

  return animate(targets, {
    ...interpolatedProps,
    duration: 0,
  });
}
