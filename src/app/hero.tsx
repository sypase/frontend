"use client";

import React from 'react';
import Slider from 'react-slick';
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import SparklesText from "@/components/ui/sparkles-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { BorderBeam } from "@/components/ui/border-beam";

interface HeroProps {
  logos: string[];
  logoSettings: {
    [key: string]: any;
  };
  handleKathmanduClick: () => void;
}

const AnimatedGradientTextDemo: React.FC = () => {
  return (
    <div className="z-10 flex items-center justify-center py-4">
      <AnimatedGradientText>
        🎉 <hr className="mx-4 h-6 w-px shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent px-2`,
          )}
        >
          Introducing NoaiGPT
        </span>
        <ChevronRight className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
    </div>
  );
};

export function SparklesTextDemo() {
  return <SparklesText text="Human Writing" />;
}

export function BorderBeamDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <iframe 
        width="800" 
        height="450" 
        // src="https://www.youtube.com/embed/GDlkCkcIqTasds?autoplay=1&controls=0&mute=1" 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        className="w-full h-full rounded-lg"
      ></iframe>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}

const Hero: React.FC<HeroProps> = ({ logos, logoSettings, handleKathmanduClick }) => {
  return (
    <section
      className="text-center py-8 px-4 md:px-8"
      style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}
    >
      <AnimatedGradientTextDemo />
      
      <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-6">
        Transform AI Text into Natural
      </h2>
      
      <div className="my-6">
        <SparklesTextDemo />
      </div>

      <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">
        Effortlessly bypass AI detectors with our cutting-edge
        tool, ensuring a natural flow and undetectable AI traces.
      </p>

      <Slider {...logoSettings} className="mb-12 w-full md:w-3/4 lg:w-1/2 mx-auto">
        {logos.map((logo: string, index: number) => (
          <div key={index} className="flex justify-center px-4">
            <img
              src={logo}
              alt={`Logo ${index}`}
              className="h-12 object-contain"
            />
          </div>
        ))}
      </Slider>

      <div className="flex justify-center mb-12 max-w-4xl mx-auto">
        <BorderBeamDemo />
      </div>

    </section>
  );
};

export default Hero;