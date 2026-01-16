'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ChefSection } from '@/components/sections/ChefSection';
import { MenuSection } from '@/components/sections/MenuSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { LocationSection } from '@/components/sections/LocationSection';
import { ReservationSection } from '@/components/sections/ReservationSection';
import { ChopsticksAnimation } from '@/components/ui/ChopsticksAnimation';

export default function Home() {
  return (
    <>
      <Header />
      <ChopsticksAnimation />
      <main>
        <HeroSection />
        <PhilosophySection />
        <ExperienceSection />
        <ChefSection />
        <MenuSection />
        <GallerySection />
        <LocationSection />
        <ReservationSection />
      </main>
      <Footer />
    </>
  );
}
