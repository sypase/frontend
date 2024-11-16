import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BorderBeam } from "@/components/ui/border-beam";

gsap.registerPlugin(ScrollTrigger);

const ZeroPlagiarism = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;

    if (section && text && image) {
      gsap.fromTo(
        text.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        image,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <>
      {/* SEO meta tags */}
      <head>
        <title>Zero Plagiarism - Ensure Original Content</title>
        <meta
          name="description"
          content="Ensure the originality of your content with our advanced plagiarism detection tools. Maintain 100% unique content with reliable plagiarism checks."
        />
        <meta
          property="og:title"
          content="Zero Plagiarism - Ensure Original Content"
        />
        <meta
          property="og:description"
          content="Ensure the originality of your content with our advanced plagiarism detection tools. Maintain 100% unique content with reliable plagiarism checks."
        />
        <meta
          property="og:image"
          content="/assets/temp/zeroplag.png"
        />
        <meta
          property="og:site_name"
          content="NoaiGPT"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
      </head>

      <section ref={sectionRef} className="h-auto min-h-[80vh] flex items-center justify-center py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div ref={imageRef} className="relative w-full h-full">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/assets/temp/zeroplag.png" 
                  alt="Zero Plagiarism Tool"  // Alt text for SEO
                  className="w-full h-full object-cover"
                />
                <BorderBeam size={500} duration={10} delay={5} borderWidth={4} className="opacity-50" />
              </div>
            </div>
            <div ref={textRef} className="space-y-6 lg:space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 leading-tight">
                Zero Plagiarism
              </h2>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                Ensure the originality of your content with our advanced plagiarism detection tools. Our system provides reliable checks to maintain the integrity of your work, guaranteeing 100% unique content.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-3xl font-bold text-green-500">100%</span>
                <span className="text-lg">Original Content</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ZeroPlagiarism;
