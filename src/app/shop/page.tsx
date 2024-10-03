"use client";
import axios from "axios";
import { serverURL } from "@/utils/utils";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiCreditCard, FiShoppingCart } from "react-icons/fi";

// Define interfaces for the item and payment methods
interface Item {
    _id: string;
    title: string;
    rewriteLimit: number;
    enable: boolean;
    country: string;
    currency: string;
    price: number;
    features: string[];
}

interface PaymentMethods {
    stripe: { enabled: boolean; currencies: string[] };
    imepay: { enabled: boolean; currencies: string[] };
    esewa: { enabled: boolean; currencies: string[] };
    khalti: { enabled: boolean; currencies: string[] };
}

export default function Page() {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethods | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("imepay");
    const [currency, setCurrency] = useState("USD");

    const getItems = async () => {
        try {
            const response = await axios.get(`${serverURL}/shop`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const { items, paymentMethods } = response.data;
            setItems(items);
            setPaymentMethods(paymentMethods);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const detectLocation = async () => {
        try {
            const response = await axios.get("https://ipapi.co/json/");
            const country = response.data.country;
            if (country === "NP") {
                setCurrency("NPR");
                setPaymentMethod("imepay");
            } else {
                setCurrency("USD");
                setPaymentMethod("stripe");
            }
        } catch (error) {
            console.error("Error detecting location:", error);
        }
    };

    useEffect(() => {
        getItems();
        detectLocation();
    }, []);

    const isCurrencyPaymentMethodEnabled = () => {
        if (!paymentMethods) return false;

        if (currency === "USD") {
            return (
                paymentMethods.stripe.enabled 

            );
        } else if (currency === "NPR") {
            return (
                paymentMethods.imepay.enabled ||
                paymentMethods.esewa.enabled ||
                paymentMethods.khalti.enabled
            );
        }
        return false;
    };

    return (
        <main className="relative flex flex-col w-screen h-screen bg-gray-100 p-6 overflow-hidden">
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <Link href="/">
                        <FiArrowLeft className="mr-5 text-3xl text-gray-800" />
                    </Link>
                    <p className="font-semibold text-3xl text-gray-800 flex items-center">
                        <FiShoppingCart className="mr-2" /> Shop
                    </p>
                    {/* Simplified Currency Selection */}
                    <div className="ml-4 flex space-x-2">
                        <button
                            className={`px-3 py-1 rounded-md transition duration-300 ${
                                currency === "USD" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300"
                            }`}
                            onClick={() => setCurrency("USD")}
                        >
                            USD
                        </button>
                        <button
                            className={`px-3 py-1 rounded-md transition duration-300 ${
                                currency === "NPR" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300"
                            }`}
                            onClick={() => setCurrency("NPR")}
                        >
                            NPR
                        </button>
                    </div>
                </div>
            </header>

            <section className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Discover NoaiGPT Flexible Pricing and Plans</h1>
                <p className="text-lg text-gray-600">Choose a plan that suits your needs. Our plans never expire and offer unmatched features.</p>
            </section>

            <div className="animate-fade-in-bottom w-full h-full flex items-center justify-center flex-wrap overflow-y-auto">
                {items.map((item, i) => {
                    const isBestSelling = currency === "NPR" && item.price === 999;
                    return (
                        <div
                            key={i}
                            onClick={() => setSelectedItem(i)}
                            className={`${
                                selectedItem === i ? "border-blue-500 " : "border-gray-300 "
                            }cursor-pointer border-2 select-none card w-96 bg-white hover:bg-gray-50 duration-150 active:scale-95 shadow-xl m-4 rounded-lg transform transition-transform`}
                        >
                            <div className="card-body p-8">
                                <h2 className="card-title text-2xl font-bold text-gray-800 flex justify-between items-center">
                                    {item.title}
                                    <div className="badge bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                                        {item.currency} {item.price}
                                    </div>
                                </h2>
                                {isBestSelling && (
                                    <div className="badge bg-yellow-200 text-yellow-800 mt-2 px-3 py-1 rounded-full">
                                        Best Selling
                                    </div>
                                )}
                                {!item.enable && (
                                    <div className="badge bg-gray-200 text-gray-600 mt-2 px-3 py-1 rounded-full">
                                        Disabled
                                    </div>
                                )}
                                <p className="flex items-center mt-4 text-gray-700">
                                    <FiCheckCircle className="mr-2 text-green-500" />
                                    {item.rewriteLimit} words
                                </p>
                                <p className="text-gray-700 mt-2">Features:</p>
                                <ul className="list-disc list-inside text-gray-700">
                                    {item.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
            {!isCurrencyPaymentMethodEnabled() ? (
                <p className="text-center mb-10 text-red-600">
                    No payment method available for {currency}
                </p>
            ) : (
                <div className="flex justify-center my-5">
                    <label
                        htmlFor="paymentmethod_modal"
                        className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full shadow-lg transition duration-300 hover:from-green-500 hover:to-blue-600 transform hover:scale-105"
                    >
                        Buy Now <FiArrowRight className="ml-2" />
                    </label>
                </div>
            )}

            {/* Payment Method Modal */}
            <input type="checkbox" id="paymentmethod_modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box p-6">
                    <h3 className="flex items-center font-bold text-lg text-gray-800 mb-4">
                        <FiCreditCard className="mr-1" /> Select Payment Method
                    </h3>
                    {currency === "USD" && paymentMethods?.stripe.enabled && (
                        <PaymentOption
                            method="stripe"
                            currentMethod={paymentMethod}
                            setMethod={setPaymentMethod}
                        />
                    )}

                    {currency === "NPR" && paymentMethods?.imepay.enabled && (
                        <PaymentOption
                            method="imepay"
                            currentMethod={paymentMethod}
                            setMethod={setPaymentMethod}
                        />
                    )}
                    {currency === "NPR" && paymentMethods?.esewa.enabled && (
                        <PaymentOption
                            method="esewa"
                            currentMethod={paymentMethod}
                            setMethod={setPaymentMethod}
                        />
                    )}
                    {currency === "NPR" && paymentMethods?.khalti.enabled && (
                        <PaymentOption
                            method="khalti"
                            currentMethod={paymentMethod}
                            setMethod={setPaymentMethod}
                        />
                    )}
                    <div className="modal-action mt-6">
                        <label
                            htmlFor="paymentmethod_modal"
                            className="btn bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-400"
                        >
                            Cancel
                        </label>
                        <label
                            className="btn bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-600"
                            onClick={() =>
                                (window.location.href = `/shop/payment?item=${items[selectedItem]?._id}&method=${paymentMethod}`)
                            }
                        >
                            Pay
                        </label>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="paymentmethod_modal">
                    Cancel
                </label>
            </div>
        </main>
    );
}

interface PaymentOptionProps {
    method: string;
    currentMethod: string;
    setMethod: (method: string) => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
    method,
    currentMethod,
    setMethod,
}) => (
    <div
        onClick={() => setMethod(method)}
        className={`${
            currentMethod === method ? "border-blue-500 " : "border-gray-300 "
        }cursor-pointer border-2 select-none card bg-white hover:bg-gray-100 duration-150 active:scale-95 shadow-lg m-4 rounded-lg`}
    >
        <div className="card-body flex flex-row items-center justify-between p-4">
            <h2 className="card-title text-gray-800 font-semibold">
                {method.charAt(0).toUpperCase() + method.slice(1)}
            </h2>
            {method === "imepay" && (
                <Image
                    src="/assets/imepay.png"
                    alt="IME Pay Logo"
                    width={80}
                    height={40}
                    className="object-contain rounded-full border-2 border-gray-300"
                />
            )}
        </div>
    </div>
);