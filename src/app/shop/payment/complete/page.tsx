"use client";

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

export default function Component() {
  const [prn, setPrn] = useState<string | null>(null);
  const [creditLimit, setCreditLimit] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setPrn(searchParams.get("prn"));
    setCreditLimit(searchParams.get("creditLimit"));

    // Redirect to /profile after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = "/profile";
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-gray-900 p-4">
      <Card className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-green-500 h-16 w-16" />
          <h1 className="text-3xl font-bold mt-6">Payment Successful</h1>
          <p className="text-gray-600 text-lg mt-4">
            Thank you for your purchase! Your payment was processed successfully.
          </p>
        </div>
        <div className="space-y-4 mt-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Payment Reference Number:</span>
            <span className="font-mono text-gray-800">{prn || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Credit Added:</span>
            <span className="font-mono text-gray-800">{creditLimit || "N/A"}</span>
          </div>
        </div>
        <p className="text-gray-600 mt-4">
          The credit has been successfully added to your account.
        </p>
        <div className="flex items-center justify-center mt-8">
          <Link
            href="/profile"
            className="flex items-center text-blue-600 hover:text-black transition duration-300"
          >
            Go to Profile
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </Card>
    </div>
  );
}