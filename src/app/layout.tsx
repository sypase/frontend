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
  title: defaultSEOConfig.title,
  description: defaultSEOConfig.description,
  keywords: defaultSEOConfig.additionalMetaTags?.find(tag => tag.name === 'keywords')?.content,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noaigpt.com/",
    siteName: "NoAIGPT",
    title: "NoAIGPT - Professional AI Text Humanizer | Trusted by 100,000+ Users",
    description: 
      "Transform AI-generated content into flawlessly natural human text with our enterprise-grade humanization platform. Featuring advanced linguistic algorithms, real-time processing, and guaranteed passing of all content detection systems. Experience the industry's highest success rate backed by our 100% satisfaction guarantee. Trusted by leading content creators, marketing agencies, and Fortune 500 companies worldwide.",
      images: [
        {
          url: "https://noaigpt.com/assets/images/og-image.png", // Must be absolute URL
          width: 1200,
          height: 630,
          alt: "NoAIGPT - Professional AI Content Humanizer Platform",
          type: "image/png",
        },
        {
          // Square image for platforms that prefer it (e.g., WhatsApp)
          url: "https://noaigpt.com/assets/images/og-square.png",
          width: 600,
          height: 600,
          alt: "NoAIGPT Logo",
          type: "image/png",
        }
      ],
      // Video preview (optional)
      // videos: [
      //   {
      //     url: "https://noaigpt.com/assets/videos/demo.mp4",
      //     width: 1280,
      //     height: 720,
      //     type: "video/mp4",
      //   }
      // ],
    },
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
  twitter: {
    ...defaultSEOConfig.twitter,
    title: defaultSEOConfig.title,
    description: defaultSEOConfig.description,
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        
        {/* Apple-specific meta tags */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={appName} />
        
        {/* Mobile specific meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
