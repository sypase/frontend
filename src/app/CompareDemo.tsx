import React from "react";
import { Compare } from "@/components/ui/compare";
import ShineBorder from "@/components/ui/shine-border";
import { NextSeo } from 'next-seo';

export function CompareDemo() {
  return (
    <>
      <NextSeo
        title="AI Text vs Humanized Text - Compare Demo"
        description="Compare AI-generated text with humanized text side by side to see the differences in a visually interactive way."
        openGraph={{
          title: "AI Text vs Humanized Text - Compare Demo",
          description: "A demo comparing AI-generated text with humanized text.",
          images: [
            {
              url: '/assets/Bypass Photos/aitext.png',
              width: 800,
              height: 600,
              alt: 'AI Generated Text Comparison',
            },
            {
              url: '/assets/Bypass Photos/humanizedtext.png',
              width: 800,
              height: 600,
              alt: 'Humanized Text Comparison',
            },
          ],
          site_name: 'NoaiGPT',
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@noaigpt',
          handle: '@noaigpt',
        }}
      />
      <section className="mt-4 h-[100vh] flex justify-center items-center bg-black">
        <div className="h-full w-full flex justify-center items-center">
          <div className="p-2 border rounded-3xl bg-neutral-800 border-neutral-700 w-full max-w-[120vh]">
            <Compare
              firstImage="/assets/Bypass Photos/aitext.png"
              secondImage="/assets/Bypass Photos/humanizedtext.png"
              firstImageClassName="object-cover object-top"
              secondImageClassname="object-cover object-top"
              className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] max-h-[100vh]"
              slideMode="hover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
