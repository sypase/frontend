"use client";
import React, { useEffect, useRef, useState } from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center text-black">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-yellow-100 to-green-100 flex items-center justify-center text-black">
        Version control
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-black">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center text-black">
        Running out of content
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  const stickyScrollRef = useRef<HTMLDivElement>(null);
  const [scrollAllowed, setScrollAllowed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const container = entry.target;
            const middle = container.clientHeight / 2;

            if (entry.boundingClientRect.top <= middle) {
              setScrollAllowed(true);
              container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
              });
            }
          } else {
            setScrollAllowed(false);
          }
        });
      },
      {
        threshold: 0.5, // Adjust the threshold as needed
      }
    );

    if (stickyScrollRef.current) {
      observer.observe(stickyScrollRef.current);
    }

    return () => {
      if (stickyScrollRef.current) {
        observer.unobserve(stickyScrollRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-8">
      <div
        ref={stickyScrollRef}
        className={`h-[100vh] w-full max-w-7xl mx-auto overflow-y-auto ${
          !scrollAllowed ? "pointer-events-none" : ""
        }`}
      >
        <StickyScroll content={content} />
      </div>
    </div>
  );
}
