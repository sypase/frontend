import { DefaultSeoProps, BreadCrumbJsonLdProps, SocialProfileJsonLdProps, ProductJsonLdProps, FAQPageJsonLdProps } from "next-seo";

const defaultSEOConfig: DefaultSeoProps = {
  title: "NoAIGPT - Professional AI Text Humanizer & Content Authenticity Platform",
  titleTemplate: "%s | NoAIGPT",
  description: 
    "Experience the most advanced AI text humanization platform trusted by over 100,000 professionals worldwide. Our cutting-edge technology transforms AI-generated content into perfectly natural human text, guaranteed to pass all content detection tools with 100% accuracy. Utilizing proprietary deep learning algorithms and linguistic pattern analysis, NoAIGPT preserves your content's original meaning while ensuring complete undetectability. Perfect for content creators, marketing agencies, academic professionals, and enterprises seeking to maintain authenticity in their digital content. Join the leading solution for content authenticity and experience why top companies choose NoAIGPT for their content optimization needs.",
  canonical: "https://noaigpt.com/",
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
    twitter: {
      handle: "@noaigpt",
      site: "@noaigpt",
      cardType: "summary_large_image",
    },
    // WhatsApp specific meta tags
    additionalMetaTags: [
      {
        name: "keywords",
        content: "AI Text Humanizer, AI Content Humanization, AI Detection Bypass, Humanize AI Text, Content Authenticity Platform, Professional Content Humanizer, AI Text to Human Text, Linguistic Pattern Analysis, Deep Learning Content Humanizer, Content Optimization Tool, Best AI Detection Bypass Tool, NoAIGPT Platform",
      },
      {
        property: "og:image:secure_url",
        content: "https://noaigpt.com/assets/images/og-image.png",
      },
      {
        property: "og:video:secure_url",
        content: "https://noaigpt.com/assets/videos/demo.mp4",
      },
      {
        property: "og:image:alt",
        content: "NoAIGPT - Professional AI Content Humanizer Platform",
      },
      // For iMessage rich previews
      {
        name: "apple-mobile-web-app-title",
        content: "NoAIGPT",
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      // For LinkedIn
      {
        name: "author",
        content: "NoAIGPT",
      },
      {
        name: "thumbnail",
        content: "https://noaigpt.com/assets/images/og-image.png",
      },
      // For Facebook Messenger
      {
        property: "fb:app_id",
        content: "YOUR_FACEBOOK_APP_ID",
      },
      // For Slack
      {
        name: "slack-app-id",
        content: "YOUR_SLACK_APP_ID",
      },
      // For general mobile sharing
      {
        name: "mobile-web-app-capable",
        content: "yes",
      },
      // For color scheme
      {
        name: "theme-color",
        content: "#000000",
      },
    ],  
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
  ],
};

const productJsonLd: ProductJsonLdProps = {
  type: "Product",
  name: "NoAIGPT Enterprise Humanizer Suite",
  productName: "NoAIGPT Enterprise Humanizer Suite",
  description: "Enterprise-grade AI text humanization platform with advanced linguistic processing and 100% undetectable guarantee. Featuring real-time processing, API access, and dedicated support.",
  image: "/assets/images/pricing.png",
  brand: "NoAIGPT",
  offers: {
    "@type": "Offer",
    price: "999",
    priceCurrency: "USD",
    priceValidUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "NoAIGPT",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1847",
  },
};

const faqJsonLd: FAQPageJsonLdProps = {
  mainEntity: [
    {
      questionName: "How does NoAIGPT ensure 100% undetectable content?",
      acceptedAnswerText: "NoAIGPT uses proprietary deep learning algorithms and advanced linguistic pattern analysis to transform AI-generated text into naturally flowing human content. Unlike basic prompt-based solutions, our technology maintains perfect naturalness while preserving the original meaning.",
    },
    {
      questionName: "What makes NoAIGPT the leading solution in the market?",
      acceptedAnswerText: "NoAIGPT combines enterprise-grade technology, advanced linguistic processing, and years of research to deliver unmatched results. We offer the highest success rate in the industry, backed by a 100% satisfaction guarantee and trusted by over 100,000 professionals worldwide.",
    },
    {
      questionName: "Is NoAIGPT suitable for enterprise and professional use?",
      acceptedAnswerText: "Absolutely. NoAIGPT is the preferred choice for content creators, marketing agencies, academic institutions, and Fortune 500 companies. Our enterprise solution includes API access, advanced analytics, dedicated support, and customizable features to meet specific business needs.",
    },
    {
      questionName: "How quickly can NoAIGPT process content?",
      acceptedAnswerText: "Our advanced processing engine handles content in real-time, with most texts being humanized within seconds. Enterprise users benefit from priority processing and can humanize unlimited content through our API.",
    },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NoAIGPT",
  url: "https://noaigpt.com",
  logo: "/assets/images/logo.png",
  sameAs: [
    "https://twitter.com/noaigpt",
    "https://www.linkedin.com/company/noaigpt",
    "https://www.youtube.com/noaigpt",
    "https://www.facebook.com/noaigpt",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Nepali"],
    email: "support@noaigpt.com",
    telephone: "+977-9767473470",
  },
};

const socialProfileJsonLd: SocialProfileJsonLdProps = {
  type: "Organization",
  name: "NoAIGPT",
  url: "https://noaigpt.com",
  sameAs: [
    "https://twitter.com/noaigpt",
    "https://www.linkedin.com/company/noaigpt",
    "https://www.youtube.com/noaigpt",
    "https://www.facebook.com/noaigpt",
  ],
};

const breadcrumbJsonLd: BreadCrumbJsonLdProps = {
  itemListElements: [
    {
      position: 1,
      name: "Home",
      item: "https://noaigpt.com/",
    },
    {
      position: 2,
      name: "Pricing",
      item: "https://noaigpt.com/pricing",
    },
    { 
      position: 3, 
      name: "AI Detectors", 
      item: "https://noaigpt.com/ai-detectors",
    },
  ],
};

export { 
  defaultSEOConfig, 
  productJsonLd, 
  faqJsonLd, 
  organizationJsonLd,
  socialProfileJsonLd, 
  breadcrumbJsonLd 
};