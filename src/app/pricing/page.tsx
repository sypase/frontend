// pages/pricing.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiCheckCircle } from "react-icons/fi";
import { serverURL } from "@/utils/utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface Pricing {
  country: string;
  currency: string;
  price: number;
}

interface Item {
  _id: string;
  title: string;
  rewriteLimit: number;
  enable: boolean;
  pricing: Pricing[];
  features: string[];
}

export default function PricingPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await axios.get(`${serverURL}/shop/pricing`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching pricing data:", error);
      }
    };

    const detectLocation = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const country = response.data.country;
        setCurrency(country === "NP" ? "NPR" : "USD");
      } catch (error) {
        console.error("Error detecting location:", error);
      }
    };

    fetchPricingData();
    detectLocation();
    // You should implement a proper authentication check here
    setIsLoggedIn(false);
  }, []);

  return (
    <main className="relative flex flex-col w-screen min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-50 backdrop-blur-lg shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">NoaiGPT</h1>
          <div className="flex space-x-4">
            {!isLoggedIn && (
              <>
                <Link
                  href="/pricing"
                  className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  Pricing
                </Link>
                <button
                  onClick={() => setShowSignupForm(true)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Try for Free
                </button>
              </>
            )}
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center mt-24 mb-12"
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Flexible Top-Up Plans
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-xl">
          Choose the perfect top-up plan that fits your needs. Enjoy unlimited word usage with no expiration.
        </p>
        <motion.div 
          className="mt-6 flex space-x-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button
            className={`px-5 py-2 rounded-full transition duration-300 shadow-md ${
              currency === "USD"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-white text-blue-600 border border-blue-600"
            }`}
            onClick={() => setCurrency("USD")}
          >
            USD
          </button>
          <button
            className={`px-5 py-2 rounded-full transition duration-300 shadow-md ${
              currency === "NPR"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-white text-blue-600 border border-blue-600"
            }`}
            onClick={() => setCurrency("NPR")}
          >
            NPR
          </button>
        </motion.div>
      </motion.div>

      <div className="w-full flex-grow flex items-center justify-center flex-wrap overflow-y-auto px-4 pb-12">
        {items.map((item, i) => {
          const price =
            item.pricing.find((p) => p.currency === currency)?.price || "N/A";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-200 cursor-pointer card w-80 hover:shadow-2xl duration-300 m-4 rounded-2xl transform transition-all hover:scale-105"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <div className="card-body p-6">
                <h2 className="card-title text-2xl font-bold text-gray-800 flex justify-between items-center mb-4">
                  {item.title}
                  <div className="badge bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full">
                    {currency} {price}
                  </div>
                </h2>
                <p className="text-gray-600 mb-3">
                  Top up your plan with {item.rewriteLimit} words. Enjoy the flexibility of unlimited usage with no expiration.
                </p>
                <p className="flex items-center text-gray-700 mb-2">
                  <FiCheckCircle className="mr-2 text-green-500" />
                  {item.rewriteLimit} words
                </p>
                <p className="text-gray-700 font-semibold mb-2">Features:</p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {item.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md w-full transform hover:scale-105">
                  Choose Plan
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}