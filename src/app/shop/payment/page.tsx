"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FiArrowLeft } from "react-icons/fi";
import WordFadeIn from "@/components/ui/word-fade-in";

// Dynamically load payment forms for different methods
const IMEPayIntegration = dynamic(() => import("./imepay_form"), { ssr: false });
const EsewaIntegration = dynamic(() => import("./esewa_form"), { ssr: false });
const FonepayIntegration = dynamic(() => import("./fonepay_form"), { ssr: false });

function PaymentContent() {
  const params = useSearchParams();
  const method = params.get("method");
  const item = params.get("item");

  return (
    <div className="w-full max-w-md mx-auto">
      {method === "imepay" && item && <IMEPayIntegration item={item} />}
      {method === "esewa" && item && <EsewaIntegration item={item} />}
      {method === "fonepay" && item && <FonepayIntegration item={item} />}
    </div>
  );
}

export default function Page() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen bg-black text-white">
      <div className="w-1/3 flex items-center justify-center p-8 border-r border-gray-800">
        <div className="text-center">
          <WordFadeIn words="NoaiGPT" className="text-4xl font-bold mb-2" />
          <WordFadeIn words="Stay Unique, Stay Undetectable" className="text-xl text-gray-400" />
        </div>
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="max-w-md mx-auto w-full py-12 px-4">
          <button
            onClick={() => router.back()}
            className="flex items-center mb-8 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            <span>Back</span>
          </button>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
            <div className="relative z-10 p-8">
              <h1 className="text-4xl font-bold mb-4 text-center text-white">
                Complete Your Purchase
              </h1>
              <p className="text-gray-400 text-center">
                Please review your order details and proceed with the payment.
              </p>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
                </div>
                <p className="text-gray-400">Loading payment...</p>
              </div>
            }
          >
            <PaymentContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
