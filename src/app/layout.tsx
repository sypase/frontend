
import './globals.css';
import { appName } from '@/utils/utils';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { defaultSEOConfig } from '../../next-seo.config';

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
  alternates: {
    canonical: 'https://noaigpt.com',
  },


  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
  category: 'technology',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${inter.variable}`}
    >
      <head>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        
        {/* Apple-specific meta tags */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={appName} />
        
        {/* Mobile specific meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://noaigpt.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Pricing",
                "item": "https://noaigpt.com/pricing"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "AI Detectors",
                "item": "https://noaigpt.com/ai-detectors"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Earn",
                "item": "https://noaigpt.com/earn"
              },
            ]
          })}
        </script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.dataset.theme = 'dark';
              } catch (_) {}
            `,
          }}
        />
        {children}
        <GoogleAnalytics gaId="G-YOUR-ANALYTICS-ID" />
      </body>
    </html>
  );
}
