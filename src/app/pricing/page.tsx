// pages/pricing.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiCheckCircle, FiGlobe } from "react-icons/fi";
import gsap from "gsap";
import Link from "next/link";
import Header from "../header";
import SignupForm from "../signup/SignupForm";

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
    }
  }, [country]);

  return (
    <main className="relative flex flex-col w-screen min-h-screen bg-gray-100 overflow-x-hidden">
      <Header
        isLoggedIn={isLoggedIn}
        onShowSignupForm={() => setShowSignupForm(true)}
      />

      <div className="flex flex-col items-center mt-24 mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
          Flexible Top-Up Plans
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-xl">
          Choose the perfect top-up plan that fits your needs. Enjoy unlimited
          word usage with no expiration.
        </p>
      </div>

      <div ref={cardsRef} className="w-full flex-grow flex items-stretch justify-center flex-wrap px-4 pb-12 overflow-x-hidden">
        {pricingData[country].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-2xl border border-gray-200 w-full max-w-xs hover:scale-105 duration-300 m-4 rounded-2xl flex flex-col overflow-hidden"
          >
            <div className="card-body p-6 flex flex-col justify-between h-full">
              <h2 className="card-title text-2xl font-bold text-gray-800 mb-4 text-center">
                {item.title}
              </h2>
              <div className="flex flex-col items-center mb-6">
                <div className="text-2xl font-extrabold text-gray-900 mb-2">
                  {item.currency} {item.price.toFixed(2)}
                </div>
                <div className="text-lg font-semibold text-gray-600">
                  {item.rewriteLimit.toLocaleString()} words
                </div>
              </div>
              <p className="text-gray-700 font-semibold mb-4">
                Features:
              </p>
              <ul className="text-gray-600 space-y-2 pl-4 mb-auto text-left">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FiCheckCircle className="mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => !isLoggedIn && setShowSignupForm(true)}
                className="mt-auto px-4 py-2 bg-white border border-gray-300 text-gray-900 font-semibold text-lg rounded-lg hover:bg-gray-50 hover:border-gray-400 transition duration-300 w-full"
              >
                {isLoggedIn ? "Choose Plan" : "Sign Up to Choose Plan"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setCountry(country === "USD" ? "NPR" : "USD")}
          className="flex items-center space-x-2 px-4 py-2 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
        >
          <FiGlobe />
          <span>{country === "USD" ? "United States" : "Nepal"}</span>
        </button>
      </div>

      {showSignupForm && (
        <SignupForm onClose={() => setShowSignupForm(false)} />
      )}
    </main>
  );
}
