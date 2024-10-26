"use client";

import React, { useRef } from "react";
import { FiCheckCircle } from "react-icons/fi";
import ShineBorder from "@/components/ui/shine-border";

interface PricingItem {
  title: string;
  currency: string;
  price: number;
  rewriteLimit: number;
  features: string[];
}

interface PricingCardsProps {
  pricingData: { [key: string]: PricingItem[] };
  country: string;
  isLoggedIn: boolean;
  setShowSignupForm: (show: boolean) => void;
}

function PricingCards({
  pricingData,
  country,
  isLoggedIn,
  setShowSignupForm,
}: PricingCardsProps) {
  const cardsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardsRef}
      className="w-full flex-grow flex items-stretch justify-center flex-wrap"
    >
      {pricingData[country].map((item, i) => (
        <div key={i} className="relative w-full max-w-xs m-4 flex-grow">
          <ShineBorder
            className="rounded-2xl shadow-xl w-full h-full flex flex-col "
            color={
              item.title === "Standard Plan"
                ? ["#A07CFE", "#FE8FB5", "#FFBE7B"]
                : []
            }
          >
            <div className="bg-white p-4 flex flex-col justify-between rounded-2xl overflow-hidden flex-grow">
              <h2 className="card-title text-2xl font-bold text-black mb-4 text-center">
                {item.title}
              </h2>
              <div className="flex flex-col items-center mb-4">
                <div className="text-2xl font-extrabold text-black mb-2">
                  {item.currency} {item.price.toFixed(2)}
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {item.rewriteLimit.toLocaleString()} words
                </div>
              </div>
              <p className="text-black font-semibold mb-2">Features:</p>
              <ul className="text-gray-700 space-y-2 pl-4 mb-auto text-left">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FiCheckCircle className="mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => !isLoggedIn && setShowSignupForm(true)}
              className="mt-4 px-4 py-2 bg-white text-black border border-transparent font-semibold text-lg rounded-lg hover:bg-green-50 transition duration-300 w-full"
            >
              {isLoggedIn ? "Choose Plan" : "Sign Up to Choose Plan"}
            </button>
          </ShineBorder>
        </div>
      ))}
    </div>
  );
}

export default PricingCards;
