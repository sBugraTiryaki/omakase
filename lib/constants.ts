// Site configuration
export const SITE_NAME = 'Omakase';
export const SITE_TAGLINE = 'Trust the journey.';
export const SITE_DESCRIPTION = 'An intimate omakase experience in the heart of Dubai. 12 seats. One unforgettable evening.';

// Navigation links
export const NAV_LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Experience', href: '#experience' },
  { label: 'Chef', href: '#chef' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reserve', href: '#reserve' },
] as const;

// Hero slides
export const HERO_SLIDES = [
  {
    id: 1,
    image: '/images/hero/hero-01.png',
    preTitle: 'Welcome to',
    title: 'Omakase',
    subtitle: 'Trust the journey.',
  },
  {
    id: 2,
    image: '/images/hero/hero-02.png',
    preTitle: 'Experience',
    title: 'The Craft',
    subtitle: 'Mastery in every movement.',
  },
  {
    id: 3,
    image: '/images/hero/hero-03.png',
    preTitle: 'Savor',
    title: 'Perfection',
    subtitle: 'Each course, a revelation.',
  },
] as const;

// Menu tiers
export const MENU_TIERS = [
  {
    id: 'lunch',
    name: 'Lunch Omakase',
    japanese: '昼のおまかせ',
    courses: '8 courses',
    price: 'AED 750',
    description: 'A refined midday journey through seasonal flavors.',
    duration: '~90 minutes',
    featured: false,
  },
  {
    id: 'dinner',
    name: 'Dinner Omakase',
    japanese: '夜のおまかせ',
    courses: '12 courses',
    price: 'AED 1,200',
    description: 'The full evening experience. Our signature progression.',
    duration: '~2.5 hours',
    featured: true,
  },
  {
    id: 'grand',
    name: 'Grand Omakase',
    japanese: '特別おまかせ',
    courses: '15 courses',
    price: 'AED 1,800',
    description: 'The ultimate expression. Rare ingredients. Extended journey.',
    duration: '~3 hours',
    featured: false,
  },
] as const;

// Operating hours
export const OPERATING_HOURS = {
  lunch: {
    label: 'Lunch',
    days: 'Tuesday - Saturday',
    time: '12:00 - 14:30',
    note: 'Last seating 13:00',
  },
  dinner: {
    label: 'Dinner',
    days: 'Tuesday - Saturday',
    time: '18:00 - 22:00',
    note: 'Last seating 20:00',
  },
  closed: {
    label: 'Closed',
    days: 'Sunday & Monday',
  },
} as const;

// Contact information
export const CONTACT = {
  address: 'DIFC Gate Building, Level 4',
  city: 'Dubai, UAE',
  phone: '+971 4 XXX XXXX',
  email: 'reservations@omakase-dubai.com',
  whatsapp: '+971 4 XXX XXXX',
} as const;

// Gallery images
export const GALLERY_IMAGES = [
  {
    id: 1,
    src: '/images/gallery/gallery-01.png',
    alt: 'Otoro sashimi presentation',
    caption: 'Otoro - Bluefin tuna belly',
  },
  {
    id: 2,
    src: '/images/gallery/gallery-02.png',
    alt: 'Chef preparing nigiri',
    caption: 'Precision and mastery',
  },
  {
    id: 3,
    src: '/images/gallery/gallery-03.png',
    alt: 'Seasonal appetizer course',
    caption: 'Sakizuke - The opening course',
  },
  {
    id: 4,
    src: '/images/gallery/gallery-04.png',
    alt: 'Interior counter seating',
    caption: 'Intimate counter experience',
  },
  {
    id: 5,
    src: '/images/gallery/gallery-05.png',
    alt: 'Wagyu preparation',
    caption: 'A5 Wagyu - Miyazaki prefecture',
  },
  {
    id: 6,
    src: '/images/gallery/gallery-06.png',
    alt: 'Dessert presentation',
    caption: 'Mizugashi - Seasonal finale',
  },
] as const;

// Chef information
export const CHEF = {
  name: 'Takeshi Yamamoto',
  nameJapanese: '山本 武',
  title: 'Head Chef & Owner',
  experience: '25+ years',
  training: 'Tokyo, Kyoto, Dubai',
  philosophy: 'Every ingredient has a story. My role is to honor that story through technique, timing, and respect for tradition.',
  credentials: [
    'Apprenticed under Master Jiro Ono, Tokyo',
    'Former Head Chef, Ginza Kyubey',
    '15 years mastering Edomae sushi tradition',
    'Recognized by Michelin Guide Japan',
  ],
} as const;

// Course progression
export const COURSE_PROGRESSION = [
  { name: 'Sakizuke', japanese: '先付', description: 'Opening appetizer' },
  { name: 'Owan', japanese: '御椀', description: 'Seasonal soup' },
  { name: 'Otsukuri', japanese: 'お造り', description: 'Sashimi selection' },
  { name: 'Yakimono', japanese: '焼物', description: 'Grilled course' },
  { name: 'Nigiri', japanese: '握り', description: 'Hand-pressed sushi' },
  { name: 'Tamago', japanese: '玉子', description: 'Traditional egg' },
  { name: 'Miso', japanese: '味噌汁', description: 'Red miso soup' },
  { name: 'Mizugashi', japanese: '水菓子', description: 'Seasonal dessert' },
] as const;

// Animation easings
export const LUXURY_EASE = 'cubicBezier(0.22, 1, 0.36, 1)';
export const DRAMATIC_EASE = 'cubicBezier(0.16, 1, 0.3, 1)';
