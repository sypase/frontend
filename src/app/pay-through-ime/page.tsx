"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import WordPullUp from "@/components/ui/word-pull-up";
export default function Page() {
  const timelineData = [
    {
      title: "Step 1",
      content: (
        <div className="prose prose-invert">
          {" "}
          <div className="border border-white rounded-lg p-4 h-96">
            <div className="flex justify-center">
              <Image src="/images/Random.svg" alt="" width={200} height={200} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mt-3">Major Release1</h3>
          <p className="text-neutral-300">
            Launched the complete UI library with over 50 components and
            advanced features. Reached 1000+ GitHub stars and 500+ daily
            downloads.
          </p>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div className="prose prose-invert">
          {" "}
          <div className="border border-white rounded-lg p-4 h-96">
            <div className="flex justify-center">
              <Image src="/images/Random.svg" alt="" width={200} height={200} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">Major Release</h3>
          <p className="text-neutral-300">
            Launched the complete UI library with over 50 components and
            advanced features. Reached 1000+ GitHub stars and 500+ daily
            downloads.
          </p>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div className="prose prose-invert">
          {" "}
          <div className="border border-white rounded-lg p-4 h-96">
            <div className="flex justify-center">
              <Image src="/images/Random.svg" alt="" width={200} height={200} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">Major Release</h3>
          <p className="text-neutral-300">
            Launched the complete UI library with over 50 components and
            advanced features. Reached 1000+ GitHub stars and 500+ daily
            downloads.
          </p>
        </div>
      ),
    },
    {
      title: "Step 4",
      content: (
        <div className="prose prose-invert">
          {" "}
          <div className="border border-white rounded-lg p-4 h-96">
            <div className="flex justify-center">
              <Image src="/images/Random.svg" alt="" width={200} height={200} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">Major Release</h3>
          <p className="text-neutral-300">
            Launched the complete UI library with over 50 components and
            advanced features. Reached 1000+ GitHub stars and 500+ daily
            downloads.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl text-white text-6xl pt-20 mb-[-50px] mx-auto   ">
        <WordPullUp
          className="text-4xl font-bold tracking-[-0.02em] text-white dark:text-white md:text-6xl md:leading-[5rem]"
          words="How To Pay Through IME Pay"
        />
      </div>

      <Timeline data={timelineData} />
    </div>
  );
}
