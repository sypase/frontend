import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { serverURL } from "@/utils/utils";

interface FonepayFormProps {
  item: string;
}

export default function FonepayForm({ item }: FonepayFormProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasInitiated = useRef(false); // Use ref instead of state
  const router = useRouter();

  useEffect(() => {
    if (hasInitiated.current) return; // Check the ref instead of state
    hasInitiated.current = true;

    const initiateFonepayPayment = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.post(
          `${serverURL}/payments/fonepay/create-order-fonepay`,
          { item },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Fonepay response:", response.data);

        if (response.data && response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl;
        } else {
          throw new Error("Failed to get redirect URL from server.");
        }
      } catch (err: any) {
        setError(
          err?.response?.data?.error ||
            "An error occurred while initiating payment."
        );
      } finally {
        setLoading(false);
      }
    };

    initiateFonepayPayment();
  }, [item]); // Dependency array ensures it's run once per `item`

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
        <p className="text-gray-400 mt-4">Redirecting to Fonepay...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return null; // This should never render as the user is redirected.
}
