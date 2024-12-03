"use client";
import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import { frontendURL } from "@/utils/utils";

interface PricingItem {
  _id: string;
  title: string;
  currency: string;
  price: number;
  creditLimit: number;
  features: string[];
  country: string;
  enable: boolean;
  paddleProductId: string | null;
}

interface PricingCardsProps {
  pricingData: PricingItem[];
  country: string;
  isLoggedIn: boolean;
  setShowSignupForm: (show: boolean) => void;
  paymentMethods: any;
  openCheckout: (priceId: string) => Promise<void>;
}

interface PaymentMethodPopupProps {
  onClose: () => void;
  paymentMethods: any;
  onSelectMethod: (method: string) => void;
}

const PaymentMethodPopup: React.FC<PaymentMethodPopupProps> = ({
  onClose,
  paymentMethods,
  onSelectMethod,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 relative border border-gray-700"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close payment method selection"
          >
            <FiX size={24} />
          </button>

          <h3 className="text-2xl font-bold mb-8 text-white text-center">
            Select Payment Method
          </h3>

          <div className="space-y-4">
            {paymentMethods?.fonepay?.enabled && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectMethod("fonepay")}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center space-x-4 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group"
              >
                <div className="bg-white p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/assets/logos/fonepay-dark.png"
                    alt="Fonepay"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-white font-semibold text-lg">
                  Pay with Fonepay
                </span>
              </motion.button>
            )}

            {paymentMethods?.imepay?.enabled && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectMethod("imepay")}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center space-x-4 hover:from-green-700 hover:to-green-800 transition-all duration-300 group"
              >
                <div className="bg-white p-2 rounded-lg border-2 border-green-400 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/assets/logos/imepay.png"
                    alt="IME Pay"
                    className="w-8 h-8 object-contain rounded-md"
                  />
                </div>
                <span className="text-white font-semibold text-lg">
                  Pay with IME Pay
                </span>
              </motion.button>
            )}
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            Choose your preferred payment method to continue
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const PricingCard: React.FC<{
  item: PricingItem;
  onSelect: (item: PricingItem) => void;
  isLoggedIn: boolean;
}> = ({ item, onSelect, isLoggedIn }) => {
  const isPopular = item.title === "Standard Plan";

  return (
    <div className="relative w-full max-w-xs m-4">
      <div
        className={`relative rounded-2xl shadow-xl h-full overflow-hidden transition-all duration-300 
        ${
          isPopular
            ? "bg-gradient-to-r from-blue-600 to-blue-800"
            : "bg-gray-800"
        }`}
      >
        {isPopular && (
          <BorderBeam
            className="absolute inset-0"
            duration={12}
            borderWidth={3}
            size={2000}
            anchor={80}
          />
        )}
        <div className="bg-gray-900 bg-opacity-90 p-6 flex flex-col justify-between h-full rounded-2xl overflow-hidden">
          {isPopular && (
            <span className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold py-1 px-3 rounded-full shadow-lg">
              Most Popular
            </span>
          )}

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              {item.title}
            </h2>

            <div className="flex flex-col items-center mb-6">
              <div className="text-4xl font-extrabold text-white mb-2">
                {item.currency} {item.price.toFixed(2)}
              </div>
              <div className="text-lg font-semibold text-gray-300">
                {item.creditLimit.toLocaleString()} words
              </div>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-xl mb-6">
              <p className="text-white font-semibold mb-3">Features:</p>
              <ul className="space-y-3">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <FiCheckCircle className="mr-2 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(item)}
            disabled={!item.enable}
            className={`
              px-6 py-3 font-semibold text-lg rounded-xl shadow-lg w-full
              transition duration-300
              ${
                item.enable
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-600 cursor-not-allowed text-gray-300"
              }
            `}
          >
            {isLoggedIn
              ? item.enable
                ? "Choose Plan"
                : "Currently Unavailable"
              : "Sign Up to Choose Plan"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const PricingCards: React.FC<PricingCardsProps> = ({
  pricingData,
  country,
  isLoggedIn,
  setShowSignupForm,
  paymentMethods,
  openCheckout,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [selectedItem, setSelectedItem] = useState<PricingItem | null>(null);

  const handleSelectPlan = (item: PricingItem) => {
    setSelectedItem(item);
    if (isLoggedIn) {
      if (
        country === "NP" &&
        (paymentMethods?.fonepay?.enabled || paymentMethods?.imepay?.enabled)
      ) {
        setSelectedPaymentMethod("popup");
      } else if (item.paddleProductId) {
        openCheckout(item.paddleProductId).catch((error) => {
          console.error("Paddle checkout error:", error);
          alert(
            "Something went wrong. Please try again later. If the issue persists, you can contact our support team."
          );
        });
      } else {
        alert("No payment method available");
      }
    } else {
      setShowSignupForm(true);
    }
  };

  const handlePaymentMethodSelection = (method: string) => {
    if (isLoggedIn && selectedItem) {
      window.location.href = `${frontendURL}/shop/payment?item=${selectedItem._id}&method=${method}`;
    }
    setSelectedPaymentMethod(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap items-stretch justify-center gap-6">
        {pricingData.map((item, i) => (
          <PricingCard
            key={item._id}
            item={item}
            onSelect={handleSelectPlan}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>

      {selectedPaymentMethod === "popup" && (
        <PaymentMethodPopup
          onClose={() => setSelectedPaymentMethod(null)}
          paymentMethods={paymentMethods}
          onSelectMethod={handlePaymentMethodSelection}
        />
      )}
    </div>
  );
};

export default PricingCards;
