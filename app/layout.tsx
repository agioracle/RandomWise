import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://randomwise.app'),
  title: 'RandomWise - Make Quick Decisions Using Free Random Tools',
  description: 'make decisions easy & fun with our complete collection of free random tools',
  keywords: 'random tools, quick decisions, easy decisions, fun decisions, randomizing tools, decision-making tools, random generator, randomizer, coin flip, spin wheel, roll dice, random number generator, rock paper scissors, fortune teller, card picker',
  authors: [{ name: 'Agi' }],
  publisher: 'RandomWise',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RandomWise - Make Quick Decisions Using Free Random Tools',
    description: 'make decisions easy & fun with our complete collection of free random tools',
    type: 'website',
    url: 'https://randomwise.app',
    siteName: 'RandomWise',
    images: [
      {
        url: '/images/hero-image.webp',
        width: 1200,
        height: 630,
        alt: 'RandomWise Hero Image',
      },
    ],
  },
  twitter: {
    title: 'RandomWise - Make Quick Decisions Using Free Random Tools',
    description: 'make decisions easy & fun with our complete collection of free random tools',
    card: 'summary_large_image',
    site: '@randomwise',
    creator: '@randomwise',
    images: [
      {
        url: '/images/hero-image.webp',
        width: 1200,
        height: 630,
        alt: 'RandomWise Hero Image',
      },
    ],
  },
  icons: {
    icon: '/icons/randomwise.ico',
    shortcut: '/icons/randomwise.ico',
    apple: '/icons/randomwise.webp',
  },
  manifest: '/icons/randomwise.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script defer
          src="https://cloud.umami.is/script.js"
          data-website-id="42083369-9ce7-4575-b502-10cce5b02989"
        >
        </script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
