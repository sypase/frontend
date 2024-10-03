// components/MultipleVariantsSection.tsx

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MultipleVariantsSection = () => {
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = gsap.utils.toArray(".card") as HTMLElement[];

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, x: 0 },
        {
          opacity: 1,
          y: (i) => i * -20,
          x: (i) => (i % 2 === 0 ? -i * 60 : i * 60),
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  // Define an array of colors for the variant cards
  const cardColors = [
    "bg-red-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
  ];

  return (
    <section className="flex flex-col items-center justify-center h-auto md:h-screen p-8 bg-gray-50">
      {/* Heading and Description */}
      <div className="text-center mb-12">
        <h2 className=" text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Generate Multiple Variants In One Click
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-2">
          Explore the power of generating multiple content variants
          effortlessly.
        </p>
        <p className="text-base md:text-lg text-gray-600">
          Generate multiple variants so you can choose the best of the best.
        </p>
      </div>

      {/* Animated Cards */}
      <div
        ref={cardsRef}
        className=" hidden md:block relative w-full max-w-md h-64 "
      >
        {Array.from({ length: cardColors.length }).map((_, index) => (
          <div
            key={index}
            className={`card absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 shadow-lg rounded-lg opacity-0 ${cardColors[index]}`}
            style={{ width: "80%", maxWidth: "250px" }}
          >
            <h3 className="text-xl font-semibold text-center">
              Variant {index + 1}
            </h3>
            <p className="text-center">
              This variant appears as you scroll down.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MultipleVariantsSection;
