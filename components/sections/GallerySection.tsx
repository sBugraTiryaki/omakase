'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, stagger } from 'animejs';
import { createScrollObserver } from '@/lib/animations';
import { GALLERY_IMAGES } from '@/lib/constants';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
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
      { threshold: 0.2 }
    );

    return () => observer.disconnect();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (lightboxOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [lightboxOpen]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="section-secondary py-32 md:py-40 lg:py-48 px-6"
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span
              data-animate
              className="text-xs tracking-[0.25em] uppercase mb-6 block opacity-0"
              style={{ color: 'var(--color-gold-primary)' }}
            >
              Gallery
            </span>
            <h2
              data-animate
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 opacity-0"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'var(--color-text-primary)',
              }}
            >
              Visual Poetry
            </h2>
          </div>

          {/* Carousel */}
          <div
            data-animate
            className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden opacity-0"
          >
            {/* Images */}
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={image.id}
                className="absolute inset-0 transition-opacity duration-1000 cursor-pointer group"
                style={{ opacity: index === currentIndex ? 1 : 0 }}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                {/* Zoom icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={48} style={{ color: 'var(--color-gold-primary)' }} />
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p
                    className="text-lg font-light"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {image.caption}
                  </p>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 transition-all duration-300 hover:scale-110"
              style={{ color: 'var(--color-text-primary)' }}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 transition-all duration-300 hover:scale-110"
              style={{ color: 'var(--color-text-primary)' }}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {GALLERY_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    index === currentIndex
                      ? 'var(--color-gold-primary)'
                      : 'rgba(255, 255, 255, 0.3)',
                  transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)',
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <p
            className="text-center mt-4 text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {String(currentIndex + 1).padStart(2, '0')} / {String(GALLERY_IMAGES.length).padStart(2, '0')}
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 transition-colors duration-300"
            style={{ color: 'var(--color-text-primary)' }}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) =>
                prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
              );
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3"
            style={{ color: 'var(--color-text-primary)' }}
            aria-label="Previous image"
          >
            <ChevronLeft size={48} />
          </button>

          <div
            className="relative w-full max-w-5xl aspect-[4/3] mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <p
              className="absolute bottom-0 left-0 right-0 p-4 text-center"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'var(--color-text-primary)',
                fontSize: '1.25rem',
              }}
            >
              {GALLERY_IMAGES[lightboxIndex].caption}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3"
            style={{ color: 'var(--color-text-primary)' }}
            aria-label="Next image"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </>
  );
}
