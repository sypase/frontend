"use client";

import React, { useRef, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { BorderBeam } from "@/components/ui/border-beam";

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
  setSelectedItem: (item: PricingItem) => void; // Added prop for setting selected item
}

const PricingCards: React.FC<PricingCardsProps> = ({
  pricingData,
  country,
  isLoggedIn,
  setShowSignupForm,
  setSelectedItem, // Destructure the new prop
}) => {
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleSelectPlan = (item: PricingItem) => {
    if (isLoggedIn) {
      setSelectedItem(item); // Set the selected item
      // Open payment method modal
      document.getElementById("paymentmethod_modal")?.click();
    } else {
      setShowSignupForm(true);
    }
  };

  return (
    <div
      ref={cardsRef}
      className="w-full flex-grow flex items-stretch justify-center flex-wrap"
    >
      {pricingData[country].map((item, i) => (
        <div key={i} className="relative w-full max-w-xs m-4">
          <div
            className={`relative rounded-2xl shadow-xl h-full overflow-hidden transition-all duration-300 
            ${item.title === "Standard Plan" ? "bg-gradient-to-r from-blue-400 to-blue-600" : "bg-white"}`}
          >
            {item.title === "Standard Plan" && (
              <BorderBeam className="absolute inset-0" duration={12} borderWidth={3} size={2000} anchor={80} />
            )}
            <div className="bg-white p-4 flex flex-col justify-between h-full rounded-2xl overflow-hidden">
              {item.title === "Standard Plan" && (
                <span className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold py-1 px-3 rounded-full shadow-lg">
                  Most Popular
                </span>
              )}
              <h2 className="card-title text-2xl font-bold text-black mb-4 text-center">
                {item.title}
              </h2>
              <div className="flex flex-col items-center mb-4">
                <div className="text-3xl font-extrabold text-black mb-2">
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
              <button
                onClick={() => handleSelectPlan(item)} // Use the new function here
                className="mt-auto px-4 py-2 bg-white text-black border border-gray-300 font-semibold text-lg rounded-lg shadow hover:bg-gray-100 transition duration-300 w-full"
              >
                {isLoggedIn ? "Choose Plan" : "Sign Up to Choose Plan"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;
