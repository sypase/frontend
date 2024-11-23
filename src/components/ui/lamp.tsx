"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-black w-full rounded-md z-0",
        "h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px]",
        className
      )}
    >
      <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-20 sm:h-24 overflow-visible w-[20rem] sm:w-[25rem] bg-gradient-conic from-white via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-black h-16 sm:h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-32 sm:w-40 h-[100%] left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-20 sm:h-24 w-[20rem] sm:w-[25rem] bg-gradient-conic from-transparent via-transparent to-white text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-32 sm:w-40 h-[100%] right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-black h-16 sm:h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-20 sm:h-24 w-full translate-y-4 sm:translate-y-6 scale-x-150 bg-black blur-xl sm:blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-20 sm:h-24 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-16 sm:h-18 w-[20rem] sm:w-[28rem] -translate-y-1/2 rounded-full bg-white opacity-50 blur-2xl sm:blur-3xl"></div>
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "12rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-12 sm:h-18 w-48 sm:w-64 -translate-y-[2rem] sm:-translate-y-[3rem] rounded-full bg-white blur-xl sm:blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "10rem" }}
          whileInView={{ width: "20rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[20rem] sm:w-[30rem] -translate-y-[2.5rem] sm:-translate-y-[3.5rem] bg-white"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-18 sm:h-22 w-full -translate-y-[5rem] sm:-translate-y-[6.25rem] bg-black"></div>
      </div>

      <div className="relative z-50 flex -translate-y-[3.5rem] sm:-translate-y-[4.5rem] flex-col items-center px-3 sm:px-5">
        {children}
      </div>
    </div>
  );
};
