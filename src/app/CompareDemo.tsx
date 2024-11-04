import React from "react";
import { Compare } from "@/components/ui/compare";
import ShineBorder from "@/components/ui/shine-border";

export function CompareDemo() {
  return (
    <section className="mt-4 h-[100vh] flex justify-center items-center bg-black"> {/* Dark background for the section */}
      <div className="h-full w-full flex justify-center items-center">
        <div className="p-2 border rounded-3xl bg-neutral-800 border-neutral-700 w-full max-w-[120vh]"> {/* Dark background and border */}
          <Compare
            firstImage="/assets/aitext1.png"
            secondImage="/assets/humanizedtext.png"
            firstImageClassName="object-cover object-top"
            secondImageClassname="object-cover object-top"
            className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] max-h-[100vh]"
            slideMode="hover"
          />
        </div>
      </div>
    </section>
  );
}
