import { DefaultSeoProps, BreadCrumbJsonLdProps, SocialProfileJsonLdProps, ProductJsonLdProps, FAQPageJsonLdProps } from "next-seo";

const defaultSEOConfig: DefaultSeoProps = {
  title: "NoAIGPT - Professional AI Text Humanizer | 100% Undetectable Content",
  titleTemplate: "%s | NoAIGPT",
  description: 
    "Transform AI-generated content into natural human text instantly. Guaranteed to pass all content detection tools. Try our professional humanization service trusted by 100,000+ users.",
  canonical: "https://noaigpt.com/",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noaigpt.com/",
    siteName: "NoAIGPT",
    title: "NoAIGPT - Professional AI Text Humanizer | 100% Success Rate",
    description: 
      "Transform AI content into natural human text that passes all content detection systems. Industry-leading accuracy with our 100% pass guarantee.",
    images: [
      {
        url: "https://noaigpt.com/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "NoAIGPT - Professional AI Content Humanizer",
        type: "image/png",
      }
    ],
  },
  twitter: {
    handle: "@noaigpt",
    site: "@noaigpt",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: 
        "ai text humanizer, content detection bypass, undetectable ai text, human writing converter, content authenticity tool, ai content humanizer, natural text generator, ai text converter, humanize ai text, professional writing tool, content enhancement tool",
    },
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=5",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "google",
      content: "notranslate",
    },
    {
      property: "og:price:amount",
      content: "9.99",
    },
    {
      property: "og:price:currency",
      content: "USD",
    },
    {
      name: "msapplication-TileColor",
      content: "#000000",
    },
    {
      property: "category",
      content: "AI Tools",
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
  name: "NoAIGPT Professional Humanizer",
  productName: "NoAIGPT Professional Humanizer",
  description: "Advanced AI text humanization tool with 100% undetectable guarantee",
  image: "https://noaigpt.com/assets/product-preview.png",
  brand: "NoAIGPT",
  offers: {
    "@type": "Offer",
    price: "499",
    priceCurrency: "NPR",
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
    reviewCount: "1247",
  },
};

const faqJsonLd: FAQPageJsonLdProps = {
  mainEntity: [
    {
      questionName: "How does NoAIGPT ensure content passes detection?",
      acceptedAnswerText: "NoAIGPT is fine-tuned, unlike other prompt-based humanizers, which ensures the content maintains a natural, human-like feel.",
    },
    {
      questionName: "What makes NoAIGPT different from other solutions?",
      acceptedAnswerText: "Our proprietary technology preserves the original meaning while ensuring perfect naturalness. We offer the highest success rate in the industry with a money-back guarantee.",
    },
    {
      questionName: "Is NoAIGPT suitable for professional use?",
      acceptedAnswerText: "Yes, NoAIGPT is trusted by content creators, marketing agencies, and businesses worldwide. Our enterprise-grade solution maintains content quality while ensuring undetectability.",
    },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NoAIGPT",
  url: "https://noaigpt.com",
  logo: "https://noaigpt.com/assets/logo.png",
  sameAs: [
    "https://twitter.com/noaigpt",
    "https://www.facebook.com/noaigpt",
    "https://www.linkedin.com/company/noaigpt",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
};

const socialProfileJsonLd: SocialProfileJsonLdProps = {
  type: "Person",
  name: "NoAIGPT",
  url: "https://noaigpt.com",
  sameAs: [
    "https://twitter.com/noaigpt",
    "https://www.linkedin.com/company/noaigpt",
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
      name: "Ai-detectors", 
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