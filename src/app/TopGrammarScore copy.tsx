// components/TopGrammarScore.tsx

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TopGrammarScore = () => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef} className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Unparalleled Grammar Accuracy
            </h2>
            <p className="text-xl text-gray-600">
              Our advanced tool consistently achieves an impressive average score of 95 in Grammarly and QuillBot grammar checks. Experience the highest level of accuracy and clarity in your content, without the need for unnecessary embellishments.
            </p>
          </div>
          <div ref={imageRef} className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg blur opacity-50"></div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/assets/grammercheck.png" 
                alt="Grammar Check" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopGrammarScore;