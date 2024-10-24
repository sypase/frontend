import React from "react";
import { Compare } from "@/components/ui/compare";
import ShineBorder from "@/components/ui/shine-border";

export function CompareDemo() {
  return (
    <section className="mt-4 h-[100vh] flex justify-center items-center bg-[#f9f9f9]">
      <div className="h-full w-full flex justify-center items-center">
        {/* <ShineBorder
          className="relative flex flex-col items-center justify-center border bg-background md:shadow-xl rounded-3xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          borderWidth={2}
          borderRadius={30}
        > */}
          <div className="p-2 border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800">
            <Compare
              firstImage="https://assets.aceternity.com/code-problem.png"
              secondImage="https://assets.aceternity.com/code-solution.png"
              firstImageClassName="object-cover object-left-top"
              secondImageClassname="object-cover object-left-top"
              className="h-[250px] w-[200px] md:h-[500px] md:w-[800px]"
              slideMode="hover"
            />
          </div>
        {/* </ShineBorder>  */}
      </div>
    </section>
  );
}