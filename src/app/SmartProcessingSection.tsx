// components/SmartProcessingSection.tsx

import React, { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmartProcessingSection = () => {
  const featureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (featureRef.current) {
      const featureElements =
        featureRef.current.querySelectorAll(".feature-point");

      gsap.fromTo(
        featureElements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featureRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section
      className="flex flex-col md:flex-row items-center justify-center bg-white mt-2 md:mt-0 h-fit md:h-[90vh]"
      // style={{ height: "90vh" }}
    >
      {/* Spline 3D Scene */}
      <div className="hidden w-full md:w-1/2 h-full md:flex items-center justify-center p-4">
        <Spline
          scene="https://prod.spline.design/ljUI71P0HRLnGMKo/scene.splinecode"
          className="w-full h-full max-w-lg"
        />
      </div>

      {/* Feature Content */}
      <div
        ref={featureRef}
        className="flex flex-col items-start justify-center p-8 w-full md:w-1/2 max-w-md mt-2 md:mt-0"
      >
        {/* Smart Processing */}
        <div className="text-center">
          <div className="mb-6 feature-point ">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">
              Smart Processing
            </h2>
            <p className="text-base text-gray-600">
              Leverage AI-driven algorithms for intelligent data processing.
            </p>
          </div>

          {/* Fast Processing */}
          <div className="mb-6 feature-point">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">
              Lightning Processing
            </h2>
            <p className="text-base text-gray-600">
              Experience rapid data handling and processing speeds that enhance
              productivity and efficiency.
            </p>
          </div>

          {/* Advanced Algorithms */}
          <div className="feature-point">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">
              Advanced Algorithms
            </h2>
            <p className="text-base text-gray-600">
              Utilize cutting-edge algorithms that provide precise and accurate
              results, outperforming other models in the market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartProcessingSection;
