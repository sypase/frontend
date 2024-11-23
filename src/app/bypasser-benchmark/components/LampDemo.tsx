"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { WordPullUpDemo } from "./WordPullUpDemo";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 py-2 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-4xl text-white"
      >
        Bypasss BenchMark
      </motion.h1>
    </LampContainer>
  );
}
