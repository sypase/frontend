// pages/UnifiedPricingShop.tsx (or page.tsx)
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverURL, frontendURL } from "@/utils/utils";
import Header from "../header";
import SignupForm from "../signup/SignupForm";
import ElegantFooter from "../last";
import { BentoDemo } from "./bentopricing";
import { FiGlobe } from "react-icons/fi";
import PricingCards from "./pricingcard";
import { initializePaddle } from "@paddle/paddle-js";

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
  const [items, setItems] = useState<Item[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods | null>(
    null
  );
  const [currency, setCurrency] = useState<"USD" | "NPR">("USD");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [paddleLoaded, setPaddleLoaded] = useState(false);

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
          "ngrok-skip-browser-warning": "true",
        },
      });
      const { items, paymentMethods } = response.data;
      console.log("Fetched items:", items);
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

    const initPaddle = async () => {
      try {
        const paddleInstance = await initializePaddle({
          token: "test_0592d7578edf803262da4c97ccf", // Replace with your actual client-side token
          environment: "sandbox", // Change to 'production' for live environment
          checkout: {
            settings: {
              frameTarget: "self",
              frameInitialHeight: 450,
              frameStyle:
                "width: 100%; min-width: 312px; background-color: transparent; border: none;",
            },
   
          },
          
          // eventCallback: function (event) {
          //   console.log("Paddle event:", event);
          //   handleSuccessfulPayment(event);
          //   if (event.name === "checkout.completed") {
          //     handleSuccessfulPayment(event.data);
          //   }
          // },

          //send custom data 
          
        });
        console.log("Paddle initialized");
        setPaddleLoaded(true);
      } catch (error) {
        console.error("Failed to initialize Paddle:", error);
      }
    };

    initPaddle();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [currency]);

  const handleSuccessfulPayment = async (data: any) => {
    console.log("Payment data:", data);
    console.log("asahdkhashdahsd", data);
    try {
      const response = await axios.post(
        `${serverURL}/payments/paddle`,
        {
          data: data.data,
          transactionId: data.transactionId,
          customerId: data.customerId,
          subscriptionId: data.subscriptionId,
          planId: data.planId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Subscription updated:", response.data);
      alert("Payment successful! Your account has been upgraded.");
      // Optionally, refresh the page or update the UI
      window.location.reload();
    } catch (error) {
      console.error("Failed to update subscription:", error);
      alert(
        "Payment was successful, but we encountered an error updating your account. Please contact support."
      );
    }
  };

  const openCheckout = async (priceId: string) => {
    if (paddleLoaded && typeof window !== "undefined" && window.Paddle) {
      try {
        console.log("Opening paddle checkout...");
        console.log("priceId:", priceId);
        const checkout = await window.Paddle.Checkout.open({
          items: [{ priceId, quantity: 1 }],
          settings: {
            frameTarget: "self",
            frameInitialHeight: 450,
            frameStyle:
              "width: 100%; min-width: 312px; background-color: transparent; border: none;",
            theme: "dark",
          },
        });
        console.log("Checkout completed", checkout);
      } catch (error) {
        console.error("Checkout failed:", error);
        alert(
          "Something went wrong. Please try again later. If the issue persists, you can contact our support team."
        );
      }
    } else {
      console.error("Paddle is not initialized");
      alert("Payment system is not ready. Please try again later.");
    }
  };

  return (
    <main className="relative flex flex-col w-full min-h-screen bg-black text-white overflow-hidden">
      <Header
        isLoggedIn={isLoggedIn}
        onShowSignupForm={() => setShowSignupForm(true)}
      />

      <div className="flex flex-col items-center mt-40 mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white p-4">
          Stay Unique, Stay Undetectable
        </h1>
        <p className="text-lg text-gray-300 text-center max-w-xl">
          Choose the perfect{" "}
          <span className="font-bold italic text-blue-400 hover:text-blue-300 transition duration-300">
            top-up
          </span>{" "}
          plan that fits your needs. Enjoy unlimited word usage with{" "}
          <span className="font-bold italic text-blue-400 hover:text-blue-300 transition duration-300">
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
        openCheckout={openCheckout}
      />

      {!paymentMethods?.imepay?.enabled && currency === "NPR" && (
        <p className="text-center mb-10 text-red-500">
          No payment method available for NPR
        </p>
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setCurrency(currency === "USD" ? "NPR" : "USD")}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white border-2 border-blue-500 font-semibold rounded-full shadow-md hover:bg-gray-700 transition-all duration-300"
        >
          <FiGlobe className="text-blue-400" />
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
