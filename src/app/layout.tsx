import './globals.css';
import { appName } from '@/utils/utils';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { defaultSEOConfig } from '../../next-seo.config';
import Head from 'next/head'; // Import Head from Next.js

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://noaigpt.com'),
  keywords: defaultSEOConfig.additionalMetaTags?.find(tag => tag.name === 'keywords')?.content,

  authors: [{ name: 'NoAIGPT' }],
  creator: 'NoAIGPT',
  publisher: 'NoAIGPT',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },


  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>{children}</head>
      <body>{children}</body>
    </html>
  )
}
