"use client";

import { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight, FaPrint } from "react-icons/fa";
import { gsap } from "gsap";

export default function Component() {
  const [prn, setPrn] = useState<string | null>(null);
  const [creditLimit, setCreditLimit] = useState<string | null>(null);
  const [invoiceDetails, setInvoiceDetails] = useState<any>({});
  const [countdown, setCountdown] = useState<number>(5); // Countdown state
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setPrn(searchParams.get("prn"));
    setCreditLimit(searchParams.get("creditLimit"));

    // Extract additional invoice parameters
    const invoiceData = {
      invoiceId: searchParams.get("invoiceId"),
      invoiceAmount: searchParams.get("invoiceAmount"),
      invoiceTotalAmount: searchParams.get("invoiceTotalAmount"),
      invoiceCurrency: searchParams.get("invoiceCurrency"),
      invoicePaymentMethod: searchParams.get("invoicePaymentMethod"),
      invoiceToName: searchParams.get("invoiceToName"),
      invoiceToEmail: searchParams.get("invoiceToEmail"),
      invoiceFromName: searchParams.get("invoiceFromName"),
      invoiceFromEmail: searchParams.get("invoiceFromEmail"),
      invoiceDate: searchParams.get("invoiceDate"),
    };

    setInvoiceDetails(invoiceData);

    // Animate the entire card with a fade-in effect
    gsap.fromTo(cardRef.current,
      { scale: 0.9, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    // Countdown timer for redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/dashboard'; // Change to your dashboard URL
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="relative max-w-md w-full">
        <div 
          ref={cardRef} 
          className="w-full space-y-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200"
          style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', height: 'auto' }}
        >
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-green-500 h-16 w-16" />
            <h1 className="text-3xl font-bold mt-4">Payment Successful</h1>
            <p className="text-gray-600 text-lg mt-2">
              Thank you for your purchase! Your payment was processed successfully.
            </p>
          </div>

          {/* Invoice Number Display */}
          <div className="flex justify-between mt-4">
            <span className="text-gray-500">#Invoice Number:</span>
            <span className="font-mono text-gray-800">{invoiceDetails.invoiceId || "N/A"}</span>
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Reference Number:</span>
              <span className="font-mono text-gray-800">{prn || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Credit Added:</span>
              <span className="font-mono text-gray-800">{creditLimit || "N/A"}</span>
            </div>
            {/* Displaying Additional Invoice Details */}
            <div className="flex justify-between">
              <span className="text-gray-500">Invoice Amount:</span>
              <span className="font-mono text-gray-800">{invoiceDetails.invoiceAmount || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Amount:</span>
              <span className="font-mono text-gray-800">{invoiceDetails.invoiceTotalAmount || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Currency:</span>
              <span className="font-mono text-gray-800">{invoiceDetails.invoiceCurrency || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-mono text-gray-800">{invoiceDetails.invoicePaymentMethod || "N/A"}</span>
            </div>
          </div>

          {/* Print Button */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={handlePrintInvoice} 
              className="flex items-center px-3 py-1 bg-black text-white font-semibold border border-black rounded-lg hover:bg-white hover:text-black transition duration-300"
            >
              <FaPrint className="mr-1" />
              Print Invoice
            </button>
          </div>

          {/* Countdown Timer */}
          <p className="text-gray-600 mt-4">
            You will be redirected to the dashboard in {countdown} seconds...
          </p>

          {/* Redirect Link */}
          <div className="flex items-center justify-center mt-8">
            <Link
              href="/profile"
              className="flex items-center text-blue-600 hover:text-black transition duration-300"
            >
              Go to Profile
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}