// pages/UnifiedPricingShop.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverURL } from "@/utils/utils";
import Header from "../header";
import SignupForm from "../signup/SignupForm";
import ElegantFooter from "../last";
import { BentoDemo } from "./bentopricing";
import { FiGlobe } from "react-icons/fi";
import PricingCards from "./pricingcard";
import { usePaddle } from "@/hooks/usePaddle";

interface Item {
  _id: string;
  title: string;
  rewriteLimit: number;
  enable: boolean;
  country: string;
  currency: string;
  price: number;
  features: string[];
  paddleProductId: string | null; // Add this line
}

interface PaymentMethods {
  stripe: { enabled: boolean; currencies: string[] };
  imepay: { enabled: boolean; currencies: string[] };
  esewa: { enabled: boolean; currencies: string[] };
  khalti: { enabled: boolean; currencies: string[] };
}

export default function UnifiedPricingShop() {
  const [items, setItems] = useState<Item[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods | null>(
    null
  );
  const [currency, setCurrency] = useState<"USD" | "NPR">("USD");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const paddle = usePaddle();

  const detectLocation = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      const country = response.data.country;
      setCurrency(country === "NP" ? "NPR" : "USD");
    } catch (error) {
      console.error("Error detecting location:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${serverURL}/shop`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "ngrok-skip-browser-warning": "true", // Value set to "true" to bypass the warning
          "User-Agent": "CustomUserAgent/1.0",
        },
      });
      const { items, paymentMethods } = response.data;
      setItems(
        items.filter((item: Item) => item.currency === currency && item.enable)
      );
      setPaymentMethods(paymentMethods);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    detectLocation();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [currency]);

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

      <PricingCards
        pricingData={items}
        country={currency === "NPR" ? "NP" : "US"}
        isLoggedIn={isLoggedIn}
        setShowSignupForm={setShowSignupForm}
        paymentMethods={paymentMethods}
        paddle={paddle}
      />

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
