"use client";

import Image from "next/image";
import { Tabs } from "@/components/ui/tabs";

export function TabsDemo() {
  const tabs = [
    {
      title: "GPTZero",
      value: "GPTZero",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>GPTZero</p>
          <TabContent title="GPTZero" />
        </div>
      ),
    },
    {
      title: "ZeroGPT",
      value: "ZeroGPT",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>ZeroGPT</p>
          <TabContent title="ZeroGPT" />
        </div>
      ),
    },
    {
      title: "Turnitin",
      value: "Turnitin",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Turnitin</p>
          <TabContent title="Turnitin" />
        </div>
      ),
    },
    {
      title: "Undetectable",
      value: "Undetectable AI",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Undetectable AI</p>
          <TabContent title="Undetectable AI" />
        </div>
      ),
    },
    {
      title: "Writer",
      value: "Writer",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Writer</p>
          <TabContent title="Writer" />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

const TabContent = ({ title }: { title: string }) => {
  const imagePath = `/assets/Bypass Photos/${title}.png`;
  return (
    <Image
      src={imagePath}
      alt={title}
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
