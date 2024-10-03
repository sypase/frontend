// components/TopGrammarScore.tsx

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TopGrammarScore = () => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.3,
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
    <section className="flex flex-col md:flex-row items-center justify-center  bg-white p-8">
      {/* Text Content on the Left */}
      <div
        ref={textRef}
        className="w-full text-center md:text-left md:w-1/2 p-4"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Top Grammar Score
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Our tool consistently scores an average of 90 to 100 in Grammarly and
          QuillBot grammar checks.
        </p>
        <p className="text-lg text-gray-700">
          We ensure high accuracy without relying on emojis or fancy strings,
          providing clear and precise content.
        </p>
      </div>

      {/* Image on the Right */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-4">
        <img
          src="/assets/grammercheck.png"
          alt="Grammar Check"
          className="w-full h-auto max-w-md"
        />
      </div>
    </section>
  );
};

export default TopGrammarScore;
