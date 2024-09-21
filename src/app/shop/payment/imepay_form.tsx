"use client";
import React, { useState, useEffect } from "react";
import { serverURL } from "@/utils/utils";
import axios from "axios";
import Image from "next/image";
import { quantum } from "ldrs";

quantum.register();

interface IMEPayProps {
  item: string | null;
}

interface TransactionDetails {
  TranAmount: number;
  RefId: string;
  TokenId: string;
  RequestDate: string;
  ItemId: string;
  Title: string;
  RewriteLimit: number;
  Features: string[];
}

const IMEPayIntegration: React.FC<IMEPayProps> = ({ item }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    if (item) {
      createOrder();
    } else {
      setError("No item specified for payment");
      setLoading(false);
    }
  }, [item]);

  const createOrder = async () => {
    try {
      const response = await axios.post(
        `${serverURL}/payments/imepay/create-order-imepay`,
        {
          item,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.redirectUrl) {
        setRedirectUrl(response.data.redirectUrl);
        setTransactionDetails(response.data.transactionDetails);
      } else {
        throw new Error("No redirect URL received from server");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    }, 1000); // Delay for animation
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <l-quantum size="45" speed="1.75" color="black"></l-quantum>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl mx-auto mt-12 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-10 w-full md:w-1/3">
        <h1 className="text-3xl font-extrabold mb-6">NoaiGPT</h1>
        {transactionDetails && (
          <>
            <h2 className="text-2xl font-bold mb-4">{transactionDetails.Title}</h2>
            <p className="mb-2">
              <strong>Rewrites:</strong> {transactionDetails.RewriteLimit}
            </p>
            <p className="mb-4">
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              {transactionDetails.Features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="p-10 w-full md:w-2/3">
        {transactionDetails && (
          <div className="mb-6">
            <p className="text-lg">
              <strong>Amount:</strong> NPR {transactionDetails.TranAmount}
            </p>
            <p className="text-lg">
              <strong>Reference ID:</strong> {transactionDetails.RefId}
            </p>
            <p className="text-lg">
              <strong>Request Date:</strong>{" "}
              {new Date(transactionDetails.RequestDate).toLocaleString()}
            </p>
          </div>
        )}
        <p className="text-gray-700 mb-6">
          Click the button below to proceed with IME Pay payment.
        </p>
        <div className="flex justify-end">
          <button
            className={`w-full md:w-auto flex items-center justify-center py-3 px-6 rounded-lg transition-transform duration-200 ${
              isButtonClicked
                ? "bg-gradient-to-r from-green-400 to-green-600 scale-95"
                : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
            }`}
            onClick={handlePayment}
            disabled={!redirectUrl}
          >
            <span className="text-white font-semibold">
              {isButtonClicked ? "Redirecting to IME Pay..." : "Confirm Pay with IME Pay"}
            </span>
            <Image
              src="/assets/imepay.png"
              alt="IME Pay Logo"
              width={24}
              height={24}
              className="ml-2 object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IMEPayIntegration;
