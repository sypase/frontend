import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BorderBeam } from "@/components/ui/border-beam";

gsap.registerPlugin(ScrollTrigger);

const TopGrammarScore = () => {
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
    <section ref={sectionRef} className="h-auto min-h-[80vh] flex items-center justify-center py-20 bg-black"> {/* Adjusted height and padding for spacing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={textRef} className="space-y-6 lg:space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 leading-tight">
              Elevate Your Writing
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
              Experience unparalleled grammar accuracy with our advanced tool. Consistently achieving top scores in Grammarly and QuillBot checks, we ensure your content shines with clarity and precision.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <span className="text-3xl font-bold text-green-500">95+</span>
              <span className="text-lg">Average Grammar Score</span>
            </div>
          </div>
          <div ref={imageRef} className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/temp/grammercheck.png" 
                alt="Grammar Check" 
                className="w-full h-full object-cover"
              />
              <BorderBeam size={500} duration={10} delay={5} borderWidth={4} className="opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopGrammarScore;
