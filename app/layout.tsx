import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Cormorant_Garamond } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Omakase | Trust the Journey',
  description: 'An intimate omakase experience in the heart of Dubai. 12 seats. One unforgettable evening. Trust the chef\'s vision.',
  keywords: ['omakase', 'japanese restaurant', 'dubai', 'fine dining', 'sushi', 'luxury dining'],
  authors: [{ name: 'Bugra Tiryaki' }],
  openGraph: {
    title: 'Omakase | Trust the Journey',
    description: 'An intimate omakase experience in the heart of Dubai. 12 seats. One unforgettable evening.',
    url: 'https://omakase.bugratiryaki.com',
    siteName: 'Omakase Dubai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omakase | Trust the Journey',
    description: 'An intimate omakase experience in the heart of Dubai.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
