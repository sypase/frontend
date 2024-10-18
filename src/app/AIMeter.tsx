
// export default AIMeter;

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bypassScreenshot } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const AIMeter = () => {
  const meterRef = useRef<HTMLDivElement | null>(null);
  const [percentage, setPercentage] = useState<number>(100);
  const [inView, setInView] = useState<boolean>(false);

  // Use IntersectionObserver to detect when the AI meter is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true); // Set inView to true when the section is visible
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the component is in view
    );

    if (meterRef.current) {
      observer.observe(meterRef.current);
    }

    return () => {
      if (meterRef.current) {
        observer.unobserve(meterRef.current);
      }
    };
  }, []);

  // Trigger percentage countdown when in view
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (inView && percentage > 0) {
      interval = setInterval(() => {
        setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
      }, 100); // Adjusted interval for slower countdown
    }

    return () => clearInterval(interval);
  }, [inView, percentage]);

  // GSAP animation for each screenshot
  useEffect(() => {
    if (meterRef.current) {
      bypassScreenshot.forEach((_, index) => {
        gsap.fromTo(
          `.image-${index}`,
          { y: 100, opacity: 0, x: index % 2 === 0 ? -100 : 100 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.image-${index}`,
              start: "top bottom",
              end: "top center",
              scrub: true
            }
          }
        );
      });
    }
  }, []);

  return (
    <section
      ref={meterRef}
      style={{ height: "120vh" }}
      className="relative flex flex-col items-center justify-center w-full overflow-hidden"
    >
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-extrabold mb-8 leading-tight">
          Bypass all AI detection effortlessly with plag-free content
        </h1>
        <h1 className="text-4xl font-extrabold mb-8 leading-tight">
          {percentage}% AI Detected
        </h1>
        <h2 className="text-xl font-bold mb-4">AI Detection Meter</h2>
        <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4 mx-auto">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 transition-all"
            style={{ width: `${100 - percentage}%` }} // Inversely proportional width
          ></div>
        </div>
        <p className="text-lg mb-8 mx-auto max-w-md">
          Our AI detection tool is the best in the market, ensuring your content is free from plagiarism and AI detection. Experience seamless content creation with our advanced technology.
        </p>
      </div>

      {/* Animated Screenshots */}
      <div className="absolute inset-0 flex justify-between items-end">
        {bypassScreenshot.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Bypass ${index + 1}`}
            className={`image-${index} absolute w-full max-w-xs h-auto object-cover`}
            style={{
              bottom: `${index * (60 / bypassScreenshot.length)}%`,
              left: `${index % 2 === 0 ? '5%' : 'auto'}`,
              right: `${index % 2 !== 0 ? '5%' : 'auto'}`,
              transform: `rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default AIMeter;