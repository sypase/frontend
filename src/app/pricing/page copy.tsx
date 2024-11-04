// pages/UnifiedPricingShop.tsx (or page.tsx)
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverURL, frontendURL } from "@/utils/utils";
import Header from "../header";
import SignupForm from "../signup/SignupForm";
import ElegantFooter from "../last";
import { BentoDemo } from "./bentopricing";
import { FiGlobe, FiCheckCircle } from "react-icons/fi";
import { BorderBeam } from "@/components/ui/border-beam";
import { initializePaddle } from '@paddle/paddle-js';

interface Item {
  _id: string;
  title: string;
  rewriteLimit: number;
  enable: boolean;
  country: string;
  currency: string;
  price: number;
  features: string[];
  paddleProductId: string | null;
}

interface PaymentMethods {
  stripe: { enabled: boolean; currencies: string[] };
  imepay: { enabled: boolean; currencies: string[] };
  esewa: { enabled: boolean; currencies: string[] };
  khalti: { enabled: boolean; currencies: string[] };
}

export default function UnifiedPricingShop() {
  const [items, setItems] = useState<Item[]>([
    {
      _id: "test_item_id",
      title: "Test Plan",
      rewriteLimit: 10000,
      enable: true,
      country: "US",
      currency: "USD",
      price: 9.99,
      features: ["Feature 1", "Feature 2", "Feature 3"],
      paddleProductId: "pri_01jbpha9zvtkx2q859tv7kms7q",
    },
  ]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods | null>(null);
  const [currency, setCurrency] = useState<"USD" | "NPR">("USD");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const detectLocation = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      const country = response.data.country;
      setCurrency(country === "NP" ? "NPR" : "USD");
    } catch (error) {
      console.error("Error detecting location:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    detectLocation();

    const initPaddle = async () => {
      try {
        await initializePaddle({
          token: 'test_0592d7578edf803262da4c97ccf',
          environment: 'sandbox',
        });
        console.log('Paddle initialized');
      } catch (error) {
        console.error('Failed to initialize Paddle:', error);
      }
    };

    initPaddle();
  }, []);

  const openCheckout = async (priceId: string) => {
    if (typeof window !== 'undefined' && window.Paddle) {
      try {
        const checkout = await window.Paddle.Checkout.open({
          items: [{ priceId, quantity: 1 }],
          settings: {
            frameTarget: 'self',
            frameInitialHeight: 450,
            frameStyle: 'width: 100%; min-width: 312px; background-color: transparent; border: none;'
          }
        });
        console.log('Checkout completed', checkout);
      } catch (error) {
        console.error('Checkout failed:', error);
      }
    } else {
      console.error('Paddle is not initialized');
    }
  };

  const handleSelectPlan = async (item: Item) => {
    console.log("Selected item:", item);
    if (isLoggedIn) {
      if (currency === "NPR" && paymentMethods?.imepay?.enabled) {
        window.location.href = `${frontendURL}/shop/payment?item=${item._id}&method=imepay`;
      } else if (item.paddleProductId) {
        try {
          console.log("Opening paddle checkout...");
          await openCheckout(item.paddleProductId);
        } catch (error) {
          console.error("Paddle checkout error:", error);
        }
      } else {
        alert("No payment method available");
      }
    } else {
      setShowSignupForm(true);
    }
  };

  const PricingCards = () => (
    <div className="w-full flex-grow flex items-stretch justify-center flex-wrap">
      {items.map((item, i) => (
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
                onClick={() => handleSelectPlan(item)}
                className="mt-auto px-4 py-2 bg-white text-black border border-gray-300 font-semibold text-lg rounded-lg shadow hover:bg-gray-100 transition duration-300 w-full"
                disabled={!item.enable}
              >
                {isLoggedIn 
                  ? (item.enable 
                    ? "Choose Plan" 
                    : "Currently Unavailable")
                  : "Sign Up to Choose Plan"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="relative flex flex-col w-full min-h-screen bg-background text-foreground overflow-hidden">
      <Header
        isLoggedIn={isLoggedIn}
        onShowSignupForm={() => setShowSignupForm(true)}
      />

      <div className="flex flex-col items-center mt-40 mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-black p-4">
          Stay Unique, Stay Undetectable
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-xl">
          Choose the perfect{" "}
          <span className="font-bold italic text-primary hover:text-primary/80 transition duration-300">
            top-up
          </span>{" "}
          plan that fits your needs. Enjoy unlimited word usage with{" "}
          <span className="font-bold italic text-primary hover:text-primary/80 transition duration-300">
            no expiration
          </span>
          .
        </p>
      </div>

      <PricingCards />

      {!paymentMethods?.imepay?.enabled && currency === "NPR" && (
        <p className="text-center mb-10 text-destructive">
          No payment method available for NPR
        </p>
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setCurrency(currency === "USD" ? "NPR" : "USD")}
          className="flex items-center space-x-2 px-4 py-2 bg-card text-card-foreground border-2 border-primary font-semibold rounded-full shadow-md hover:bg-accent transition-all duration-300"
        >
          <FiGlobe className="text-primary" />
          <span>{currency === "USD" ? "United States" : "Nepal"}</span>
        </button>
      </div>

      <BentoDemo />
      <ElegantFooter />
      {showSignupForm && (
        <SignupForm onClose={() => setShowSignupForm(false)} />
      )}
    </main>
  );
}