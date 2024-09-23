// components/NoSubscription.tsx

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';

gsap.registerPlugin(ScrollTrigger);

const NoSubscription = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-white p-8 overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Spline
          scene="https://prod.spline.design/TtKxEk97ZzdOkg8q/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative text-center max-w-xl z-10 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-800" style={{ fontFamily: "'Pacifico', cursive" }}>
          No Monthly Subscription
        </h1>
        <p className="text-2xl text-gray-700 mb-4">
          Top up and pay for what you use. The credit does not expire.
        </p>
        <button
          className="mt-4 px-6 py-3 bg-black text-white text-lg font-semibold rounded-md shadow-md hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2"
          onClick={() => window.location.href = '/pricing'}
        >
          <span>View Pricing</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transform rotate-45">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21.75 12m0 0l-4.5 5.25M21.75 12H3" />
          </svg>
        </button>
        <p className="text-xl text-gray-700 mt-4">
          Buy words and never worry about expiring credits. Enjoy the flexibility and freedom to use your credits whenever you need.
        </p>
      </div>
    </section>
  );
};

export default NoSubscription;