"use client";
import React, { useState, useEffect, useRef } from "react";
import { serverURL } from "@/utils/utils";
import axios from "axios";
import Image from "next/image";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { BorderBeam } from "@/components/ui/border-beam";

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
  const orderCreated = useRef(false);

  useEffect(() => {
    if (item && !orderCreated.current) {
      createOrder();
      orderCreated.current = true;
    } else if (!item) {
      setError("No item specified for payment");
      setLoading(false);
    }
  }, [item]);

  const createOrder = async () => {
    try {
      const response = await axios.post(
        `${serverURL}/payments/imepay/create-order-imepay`,
        { item },
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
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-900 px-4 py-3 rounded-lg" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl">
      <BorderBeam size={350} duration={15} delay={0}  />
      {transactionDetails && (
        <div className="relative z-10 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{transactionDetails.Title}</h2>
            <p className="text-4xl font-bold text-white">
              NPR {transactionDetails.TranAmount}
            </p>
          </div>
          <ul className="mb-8 space-y-4">
            <li className="flex items-center">
              <FiCheck className="mr-3 text-white" />
              <span className="text-gray-200">{transactionDetails.RewriteLimit} Rewrites</span>
            </li>
            {transactionDetails.Features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <FiCheck className="mr-3 text-white" />
                <span className="text-gray-200">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mb-8 text-sm text-gray-400">
            <p><strong>Reference ID:</strong> {transactionDetails.RefId}</p>
            <p><strong>Request Date:</strong> {new Date(transactionDetails.RequestDate).toLocaleString()}</p>
          </div>
          <button
            className={`group w-full flex items-center justify-center py-4 px-6 rounded-full border-2 border-white transition-all duration-200 ${
              isButtonClicked
                ? "bg-white text-black scale-95"
                : "bg-black text-white hover:bg-white hover:text-black"
            }`}
            onClick={handlePayment}
            disabled={!redirectUrl}
          >
            <span className="font-semibold mr-2">
              {isButtonClicked ? "Redirecting to IME Pay..." : "Pay with IME Pay"}
            </span>
            {!isButtonClicked && (
              <FiArrowRight
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            )}
            <Image
              src="/assets/imepay.png"
              alt="IME Pay Logo"
              width={24}
              height={24}
              className="ml-2 object-contain"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default IMEPayIntegration;