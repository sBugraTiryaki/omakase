// Navigation
export interface NavLink {
  label: string;
  href: string;
}

// Hero
export interface HeroSlide {
  id: number;
  image: string;
  preTitle: string;
  title: string;
  subtitle: string;
}

// Menu
export interface MenuTier {
  id: string;
  name: string;
  japanese: string;
  courses: string;
  price: string;
  description: string;
  duration: string;
  featured?: boolean;
}

// Gallery
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

// Chef
export interface ChefInfo {
  name: string;
  nameJapanese: string;
  title: string;
  experience: string;
  training: string;
  philosophy: string;
  credentials: string[];
}

// Course
export interface Course {
  name: string;
  japanese: string;
  description: string;
}

// Contact
export interface ContactInfo {
  address: string;
  city: string;
  phone: string;
  email: string;
  whatsapp: string;
}

// Operating Hours
export interface HoursSlot {
  label: string;
  days: string;
  time?: string;
  note?: string;
}

// Form
export interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  menuTier: string;
  specialRequests?: string;
}

// Animation
export interface ScrollAnimationOptions {
  target?: string | HTMLElement;
  enter?: string;
  leave?: string;
  sync?: boolean | number;
}
