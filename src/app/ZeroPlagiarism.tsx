// components/ZeroPlagiarism.tsx

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ZeroPlagiarism = () => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section className="flex flex-col md:flex-row h-fit items-center justify-center  bg-white pl-5 pr-5 ">
      {/* Image on the Left */}
      <div className="w-full md:w-1/2 h-full hidden md:flex items-center justify-center p-4">
        <img
          src="/assets/zeroplag.png"
          alt="Zero Plagiarism"
          className="w-full h-auto max-w-md"
        />
      </div>

      {/* Text Content on the Right */}
      <div ref={textRef} className="w-full text-center md:w-1/2 p-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Zero Plagiarism
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Ensure your content is original and free from plagiarism with our
          advanced detection tools.
        </p>
        <p className="text-lg text-gray-700">
          Our system provides reliable checks to maintain the integrity of your
          work, ensuring zero plagiarism.
        </p>
      </div>
      <div className="w-full md:w-1/2 h-full flex md:hidden items-center justify-center p-4">
        <img
          src="/assets/zeroplag.png"
          alt="Zero Plagiarism"
          className="w-full h-auto max-w-md"
        />
      </div>
    </section>
  );
};

export default ZeroPlagiarism;
