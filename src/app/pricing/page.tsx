// pages/pricing.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiCheckCircle, FiGlobe } from "react-icons/fi";
import gsap from "gsap";
import Link from "next/link";
import Header from "../header";
import SignupForm from "../signup/SignupForm";
import ElegantFooter from "../last";
import ShineBorder from "@/components/ui/shine-border";
import PricingCards from "./pricingcard";
import { BentoDemo } from "./bentopricing";
import CommunitySection from "../joinwrites";
interface Item {
  id: string;
  title: string;
  rewriteLimit: number;
  price: number;
  currency: string;
  features: string[];
}

const pricingData: { [key: string]: Item[] } = {
  USD: [
    {
      id: "usd-1",
      title: "Basic Plan",
      rewriteLimit: 10000,
      price: 9.99,
      currency: "USD",
      features: ["10,000 words", "24/7 customer support", "API access"],
    },
    {
      id: "usd-2",
      title: "Standard Plan",
      rewriteLimit: 20000,
      price: 19.99,
      currency: "USD",
      features: [
        "20,000 words",
        "24/7 customer support",
        "API access",
        "Priority processing",
      ],
    },
    {
      id: "usd-3",
      title: "Premium Plan",
      rewriteLimit: 30000,
      price: 29.99,
      currency: "USD",
      features: [
        "30,000 words",
        "24/7 customer support",
        "API access",
        "Priority processing",
        "Advanced analytics",
      ],
    },
  ],
  NPR: [
    {
      id: "npr-1",
      title: "Basic Plan",
      rewriteLimit: 7000,
      price: 499,
      currency: "NPR",
      features: ["7,000 words", "24/7 customer support", "API access"],
    },
    {
      id: "npr-2",
      title: "Standard Plan",
      rewriteLimit: 14000,
      price: 999,
      currency: "NPR",
      features: [
        "14,000 words",
        "24/7 customer support",
        "API access",
        "Priority processing",
      ],
    },
    {
      id: "npr-3",
      title: "Premium Plan",
      rewriteLimit: 30000,
      price: 1999,
      currency: "NPR",
      features: [
        "30,000 words",
        "24/7 customer support",
        "API access",
        "Priority processing",
        "Advanced analytics",
      ],
    },
  ],
};

export default function PricingPage() {
  const [country, setCountry] = useState<"USD" | "NPR">("USD");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const detectorLogos = [
    { src: "/assets/copyleaks.png", alt: "Copyleaks" },
    { src: "/assets/Crossplag.png", alt: "Crossplag" },
    { src: "/assets/turnitin.png", alt: "Turnitin" },
    { src: "/assets/Writer.png", alt: "Writer" },
    { src: "/assets/Gptzero.png", alt: "GPTZero" },
    { src: "/assets/udetect.png", alt: "Undetectable" },
    { src: "/assets/zerogpt.png", alt: "Undetectable" },
  ];

  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.set(cards, { opacity: 0, y: 50 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });

      const standardCard = document.querySelector(".standard-card");
      if (standardCard) {
        gsap.fromTo(
          standardCard,
          { borderColor: "transparent", borderWidth: "0px" },
          {
            borderColor: "#10B981",
            borderWidth: "4px",
            duration: 1,
            ease: "power2.out",
          }
        );
      }
    }
  }, [country]);

  return (
    <main className="relative flex flex-col w-full min-h-screen bg-white text-black overflow-hidden">
      <Header
        isLoggedIn={isLoggedIn}
        onShowSignupForm={() => setShowSignupForm(true)}
      />

      <div className="flex flex-col items-center mt-40 mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4 text-center">
          Stay Unique, Stay Undetectable{" "}
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-xl">
          Choose the perfect{" "}
          <span className="font-bold italic text-black hover:text-gray-700 transition duration-300">
            top-up
          </span>{" "}
          plan that fits your needs. Enjoy unlimited word usage with{" "}
          <span className="font-bold italic text-black hover:text-gray-700 transition duration-300">
            no expiration
          </span>
          .
        </p>
      </div>

      <PricingCards
        pricingData={pricingData}
        country={country}
        isLoggedIn={isLoggedIn}
        setShowSignupForm={setShowSignupForm}
      />

      <div className="fixed bottom-4 right-4 z-100">
        <button
          onClick={() => setCountry(country === "USD" ? "NPR" : "USD")}
          className="flex items-center space-x-2 px-4 py-2 bg-white text-black border-2 border-black font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
        >
          <FiGlobe />
          <span>{country === "USD" ? "United States" : "Nepal"}</span>
        </button>
      </div>

      {/* <div className="flex flex-col items-center mt-40 mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4 text-center">
          Stay Unique, Stay Undetectable
        </h1>
      </div> */}
      {/* why noaigpt */}
      {/* Microsoft and Review Stars */}

      {/* <CommunitySection /> */}
      <BentoDemo />
      <ElegantFooter />

      {showSignupForm && (
        <SignupForm onClose={() => setShowSignupForm(false)} />
      )}
    </main>
  );
}
