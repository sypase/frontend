// pages/pricing.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiCheckCircle, FiGlobe } from "react-icons/fi";
import gsap from "gsap";
import Link from "next/link";
import Header from "../header";
import SignupForm from "../signup/SignupForm";
import ElegantFooter from "../last";


interface Item {
  id: string;
  title: string;
  rewriteLimit: number;
  price: number;
  currency: string;
  features: string[];
}

const pricingData: { [key: string]: Item[] } = {
  USD: [
    {
      id: "usd-1",
      title: "Basic Plan",
      rewriteLimit: 10000,
      price: 9.99,
      currency: "USD",
      features: ["10,000 words", "24/7 customer support", "API access"],
    },
    {
      id: "usd-2",
      title: "Standard Plan",
      rewriteLimit: 20000,
      price: 19.99,
      currency: "USD",
      features: [
        "20,000 words",
        "24/7 customer support",
        "API access",
        "Priority processing",
      ],
    },
    {
      id: "usd-3",
      title: "Premium Plan",
      rewriteLimit: 30000,
      price: 29.99,
      currency: "USD",
      features: [
        "30,000 words",
        "24/7 customer support",
        "API access",
        "Priority processing",
        "Advanced analytics",
      ],
    },
  ],
  NPR: [
    {
      id: "npr-1",
      title: "Basic Plan",
      rewriteLimit: 7000,
      price: 499,
      currency: "NPR",
      features: ["7,000 words", "24/7 customer support", "API access"],
    },
    {
      id: "npr-2",
      title: "Standard Plan",
      rewriteLimit: 14000,
      price: 999,
      currency: "NPR",
      features: [
        "14,000 words",
        "24/7 customer support",
        "API access",
        "Priority processing",
      ],
    },
    {
      id: "npr-3",
      title: "Premium Plan",
      rewriteLimit: 30000,
      price: 1999,
      currency: "NPR",
      features: [
        "30,000 words",
        "24/7 customer support",
        "API access",
        "Priority processing",
        "Advanced analytics",
      ],
    },
  ],
};

export default function PricingPage() {
  const [country, setCountry] = useState<"USD" | "NPR">("USD");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const detectorLogos = [
    { src: "/assets/copyleaks.png", alt: "Copyleaks" },
    { src: "/assets/Crossplag.png", alt: "Crossplag" },
    { src: "/assets/turnitin.png", alt: "Turnitin" },
    { src: "/assets/Writer.png", alt: "Writer" },
    { src: "/assets/Gptzero.png", alt: "GPTZero" },
    { src: "/assets/udetect.png", alt: "Undetectable" },
    { src: "/assets/zerogpt.png", alt: "Undetectable" },
  ];

  
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.set(cards, { opacity: 0, y: 50 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });

      const standardCard = document.querySelector(".standard-card");
      if (standardCard) {
        gsap.fromTo(
          standardCard,
          { borderColor: "transparent", borderWidth: "0px" },
          {
            borderColor: "#10B981",
            borderWidth: "4px",
            duration: 1,
            ease: "power2.out",
          }
        );
      }
    }
  }, [country]);

  return (
    <main className="relative flex flex-col w-full min-h-screen bg-white text-black overflow-hidden">
      <Header
        isLoggedIn={isLoggedIn}
        onShowSignupForm={() => setShowSignupForm(true)}
      />

      <div className="flex flex-col items-center mt-24 mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4 text-center">
          Stay Unique, Stay Undetectable
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-xl">
          Choose the perfect{" "}
          <span className="font-bold italic text-black hover:text-gray-700 transition duration-300">
            top-up
          </span>{" "}
          plan that fits your needs. Enjoy unlimited word usage with{" "}
          <span className="font-bold italic text-black hover:text-gray-700 transition duration-300">
            no expiration
          </span>
          .
        </p>
      </div>

      <div
        ref={cardsRef}
        className="w-full flex-grow flex items-stretch justify-center flex-wrap px-4"
      >
        {pricingData[country].map((item, i) => (
          <div
            key={i}
            className={`bg-white shadow-xl w-full max-w-xs hover:scale-105 duration-300 m-4 rounded-2xl flex flex-col overflow-hidden relative
              ${
                item.title === "Standard Plan"
                  ? "border-4 border-green-500 standard-card"
                  : "border border-gray-200"
              }`}
          >
            {item.title === "Standard Plan" && (
              <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-sm font-bold rounded-bl-lg">
                Most Popular
              </div>
            )}
            <div className="card-body p-6 flex flex-col justify-between h-full">
              <h2 className="card-title text-2xl font-bold text-black mb-4 text-center">
                {item.title}
              </h2>
              <div className="flex flex-col items-center mb-6">
                <div className="text-2xl font-extrabold text-black mb-2">
                  {item.currency} {item.price.toFixed(2)}
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {item.rewriteLimit.toLocaleString()} words
                </div>
              </div>
              <p className="text-black font-semibold mb-4">Features:</p>
              <ul className="text-gray-700 space-y-2 pl-4 mb-auto text-left">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FiCheckCircle className="mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => !isLoggedIn && setShowSignupForm(true)}
                className="mt-auto px-4 py-2 bg-white text-black border-2 border-green-500 font-semibold text-lg rounded-lg hover:bg-green-50 transition duration-300 w-full"
              >
                {isLoggedIn ? "Choose Plan" : "Sign Up to Choose Plan"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* #1 AI Humanizer Section */}
      {/* Enhanced #1 AI Humanizer Section */}
      <div className="w-full max-w-6xl mx-auto mb-16 px-4 pt-10">
        <div className="bg-white text-black border-2 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="text-black">#1 AI Humanizer 🏆</span>
          </h2>
          <p className="text-lg text-center mb-8">
            Experience the power of our cutting-edge AI Humanizer. Transform
            your AI-generated content into natural, human-like text that's
            undetectable and engaging.
          </p>

          {/* Detector Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            {detectorLogos.map((logo, index) => (
              <div key={index} className="relative w-24 h-24">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={96}
                  height={96}
                  className="transition-transform hover:scale-110"
                />
              </div>
            ))}
          </div>

          <div className="text-center text-xl font-bold text-green-600">
            Bypasses all detectors easily
          </div>
        </div>
      </div>

      {/* Microsoft Startup Badge Section */}
      <div className="w-full max-w-6xl mx-auto mb-16 px-4">
        <div className="flex flex-col items-center justify-center space-y-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center">
            Proud to be a member of Microsoft for Startups
          </h3>

          <div className="relative w-64 h-32 group">
            <Image
              src="/assets/MS-Startups-Celebration-Badge-Dark.png"
              alt="Microsoft for Startups Badge"
              fill
              style={{ objectFit: "contain" }}
              className="transition-transform group-hover:scale-105 duration-300"
            />
          </div>

          <div className="max-w-2xl text-center space-y-4">
            <p className="font-mono text-lg text-gray-700">
              As a member of the Microsoft for Startups program, we leverage
              cutting-edge technology to deliver unparalleled AI humanization
              solutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-sans text-lg font-bold text-gray-900 mb-2">
                  Enterprise Security
                </h4>
                <p className="font-mono text-sm text-gray-600">
                  Powered by Azure's enterprise-grade security infrastructure
                </p>
              </div>

              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-sans text-lg font-bold text-gray-900 mb-2">
                  Global Scale
                </h4>
                <p className="font-mono text-sm text-gray-600">
                  Leveraging Microsoft's worldwide data centers for optimal
                  performance
                </p>
              </div>

              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-sans text-lg font-bold text-gray-900 mb-2">
                  AI Excellence
                </h4>
                <p className="font-mono text-sm text-gray-600">
                  Access to advanced AI and ML capabilities through Azure
                </p>
              </div>
            </div>

            <p className="font-garamond text-xl text-gray-800 italic mt-8">
              "Joining forces with Microsoft has empowered us to push the
              boundaries of AI text humanization while maintaining the highest
              standards of security and reliability."
            </p>
          </div>
        </div>
      </div>

      {/* Alternatives section */}
      <div className="w-full max-w-6xl mx-auto mb-16 px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-black">How We Compare</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See how our solution stacks up against other options in the market
          </p>
        </div>

        {/* Feature Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Our Solution Card */}
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-500 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="px-4 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                    Our Solution
                  </span>
                  <h3 className="text-2xl font-bold mt-2">AI Humanizer Pro</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Starting from</p>
                  <p className="text-2xl font-bold text-green-600">
                    $9.99/month
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Unlimited variants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Advanced AI detection bypass</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>24/7 Priority support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alternatives Cards */}
          {[
            {
              name: "NoAIGPT",
              pricing: "Pay-as-you-go",
              features: ["Top grammar", "Many variants at once"],
              highlight: "Best for occasional use",
            },
            {
              name: "Undetectable.ai",
              pricing: "From $14.99/month",
              features: ["Basic rewriting", "Limited features"],
              highlight: "Basic solution",
            },
            {
              name: "Write Human",
              pricing: "From $12/month",
              features: ["Simple interface", "Standard support"],
              highlight: "Entry level tool",
            },
          ].map((alternative, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    {alternative.highlight}
                  </span>
                  <h3 className="text-xl font-bold mt-2">{alternative.name}</h3>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600">Starting from</p>
                  <p className="text-xl font-bold text-gray-900">
                    {alternative.pricing}
                  </p>
                </div>

                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Included features:
                  </p>
                  <ul className="space-y-2">
                    {alternative.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Alternatives */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Other Alternatives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Stealthgpt.ai",
                pricing: "From $25/month",
                description: "Enterprise-focused solution with basic features",
              },
              {
                name: "BypassGPT",
                pricing: "From $20/month",
                description: "Simple tool for basic AI text processing",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
              >
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Starting at</p>
                  <p className="font-semibold">{item.pricing}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-6xl mx-auto mb-16 px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-black">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get quick answers to common questions about our AI Humanizer service
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: "Pricing & Plans",
              description: "Questions about our pricing structure and plans",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ),
              title: "Technical",
              description: "Technical aspects of our service",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              ),
              title: "Features",
              description: "Information about our service features",
            },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500 mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {[
            {
              category: "Pricing & Plans",
              questions: [
                {
                  q: "How does the word count system work?",
                  a: "Our word count system is based on input text length. Words are counted once during processing, and you can use your quota anytime within the subscription period. Unused words don't expire and roll over to the next month.",
                },
                {
                  q: "Can I upgrade or downgrade my plan?",
                  a: "Yes, you can change your plan at any time. When upgrading, you'll only pay the difference. When downgrading, your new rate will apply at the next billing cycle.",
                },
                {
                  q: "Do you offer refunds?",
                  a: "We offer a 7-day money-back guarantee for all new subscriptions. If you're not satisfied with our service, contact our support team for a full refund.",
                },
              ],
            },
            {
              category: "Technical",
              questions: [
                {
                  q: "How does the AI humanizer work?",
                  a: "Our AI humanizer uses advanced natural language processing to analyze and rewrite text, making it more human-like while maintaining the original meaning. It considers context, tone, and style to create natural variations.",
                },
                {
                  q: "What's the maximum text length per submission?",
                  a: "Single submissions can be up to 5,000 words. For longer texts, you can split them into multiple submissions while maintaining consistency.",
                },
                {
                  q: "Is my content secure and private?",
                  a: "Yes, we use enterprise-grade encryption for all data transmission and storage. Your content is automatically deleted from our servers after processing.",
                },
              ],
            },
            {
              category: "Features",
              questions: [
                {
                  q: "What detection systems can it bypass?",
                  a: "Our AI humanizer is effective against major AI detection systems, including GPTZero, Originality.ai, and Content at Scale. We regularly update our system to maintain effectiveness.",
                },
                {
                  q: "How many variations can I generate?",
                  a: "Premium plans allow unlimited variations per submission. Each variation maintains the original meaning while using different phrasing and structure.",
                },
                {
                  q: "Do you offer an API?",
                  a: "Yes, we provide a RESTful API for all paid plans. The API allows seamless integration with your existing workflows and applications.",
                },
              ],
            },
          ].map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{section.category}</h3>
                <div className="space-y-4">
                  {section.questions.map((item, qIndex) => {
                    const questionId = `${sectionIndex}-${qIndex}`;
                    return (
                      <div
                        key={qIndex}
                        className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                      >
                        <button
                          className="w-full flex justify-between items-start text-left"
                          onClick={() => {
                            const element = document.getElementById(questionId);
                            const icon = document.getElementById(
                              `icon-${questionId}`
                            );
                            if (element && element.style.display === "none") {
                              element.style.display = "block";
                              if (icon) {
                                icon.style.transform = "rotate(180deg)";
                              }
                            } else {
                              if (element) {
                                element.style.display = "none";
                              }
                              if (icon) {
                                icon.style.transform = "rotate(0deg)";
                              }
                            }
                          }}
                        >
                          <span className="font-semibold text-gray-900">
                            {item.q}
                          </span>
                          <svg
                            id={`icon-${questionId}`}
                            className="w-5 h-5 text-gray-500 transform transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <div
                          id={questionId}
                          className="mt-2 text-gray-600"
                          style={{ display: "none" }}
                        >
                          {item.a}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? Join our Discord community!
          </p>
          <a
            href="https://discord.gg/your-discord-invite-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
          >
            Join our Discord
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setCountry(country === "USD" ? "NPR" : "USD")}
          className="flex items-center space-x-2 px-4 py-2 bg-white text-black border-2 border-black font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
        >
          <FiGlobe />
          <span>{country === "USD" ? "United States" : "Nepal"}</span>
        </button>
      </div>
      <ElegantFooter />

      {showSignupForm && (
        <SignupForm onClose={() => setShowSignupForm(false)} />
      )}
    </main>
  );
}
