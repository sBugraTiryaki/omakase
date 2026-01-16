'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { animate, stagger } from 'animejs';

// Sections where header should be transparent
const TRANSPARENT_SECTIONS = ['hero', 'gallery'];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverImageSection, setIsOverImageSection] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  // Detect which section is at the top of viewport
  useEffect(() => {
    const checkCurrentSection = () => {
      const headerHeight = 80;

      if (window.scrollY < 100) {
        setIsOverImageSection(true);
        return;
      }

      for (const sectionId of TRANSPARENT_SECTIONS) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= headerHeight && rect.bottom > headerHeight) {
            setIsOverImageSection(true);
            return;
          }
        }
      }

      setIsOverImageSection(false);
    };

    checkCurrentSection();
    window.addEventListener('scroll', checkCurrentSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkCurrentSection);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Animate mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current || !menuLinksRef.current) return;

    if (isMenuOpen) {
      // Show menu
      mobileMenuRef.current.style.pointerEvents = 'auto';
      animate(mobileMenuRef.current, {
        opacity: [0, 1],
        translateX: ['100%', '0%'],
        duration: 500,
        ease: 'cubicBezier(0.22, 1, 0.36, 1)',
      });

      // Animate links with stagger
      const links = menuLinksRef.current.querySelectorAll('[data-menu-item]');
      animate(links, {
        opacity: [0, 1],
        translateY: [30, 0],
        delay: stagger(100, { start: 200 }),
        duration: 500,
        ease: 'cubicBezier(0.22, 1, 0.36, 1)',
      });
    } else {
      // Hide menu
      animate(mobileMenuRef.current, {
        opacity: [1, 0],
        translateX: ['0%', '100%'],
        duration: 400,
        ease: 'cubicBezier(0.22, 1, 0.36, 1)',
        complete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.pointerEvents = 'none';
          }
        },
      });
    }
  }, [isMenuOpen]);

  // Initial header animation
  useEffect(() => {
    if (!headerRef.current) return;

    animate(headerRef.current, {
      opacity: [0, 1],
      duration: 800,
      ease: 'cubicBezier(0.22, 1, 0.36, 1)',
    });
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-500 opacity-0 ${
          isOverImageSection
            ? 'bg-transparent'
            : 'bg-luxury-black/95 backdrop-blur-md'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-2xl tracking-wide font-light"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: 'var(--color-text-primary)',
            }}
          >
            {SITE_NAME}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-wider font-light transition-colors duration-500"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-gold-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="outline" size="sm" href="#reserve">
              Reserve
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 touch-target"
            style={{ color: 'var(--color-text-primary)' }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 lg:hidden opacity-0"
        style={{
          backgroundColor: 'var(--color-luxury-black)',
          pointerEvents: 'none',
          transform: 'translateX(100%)',
        }}
      >
        <div
          ref={menuLinksRef}
          className="flex flex-col items-center justify-center h-full gap-10 px-6"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-menu-item
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-light opacity-0 transition-colors duration-500"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'var(--color-text-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-gold-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
            >
              {link.label}
            </a>
          ))}
          <div data-menu-item className="mt-4 opacity-0">
            <Button
              variant="outline"
              onClick={() => setIsMenuOpen(false)}
              href="#reserve"
            >
              Reserve Your Seat
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
