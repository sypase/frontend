"use client";

import { Tweet } from 'react-tweet';
import React from "react";
import { AiFillStar } from 'react-icons/ai';

export default function CleanLayout() {
  return (
    <>
      {/* <head>
        <title>How to Use NoaiGPT</title>
        <meta name="description" content="Follow these simple steps to start using NoaiGPT. Create an account, choose your plan, and explore the AI capabilities at your fingertips." />
        <meta property="og:title" content="How to Use NoaiGPT" />
        <meta property="og:description" content="Follow these simple steps to start using NoaiGPT. Create an account, choose your plan, and explore the AI capabilities at your fingertips." />
        <meta property="og:image" content="https://noaigpt.com/assets/images/howtouse.png" />
        <meta property="og:site_name" content="NoaiGPT" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://noaigpt.com/assets/images/howtouse.png" />
      </head> */}

      <div className="min-h-screen bg-black">
        {/* Hero Section with How to Use */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl font-bold text-center mb-20 text-gray-100">
              How to Use <span className="text-gray-100">NoaiGPT</span>
            </h1>
            
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
              {/* Steps Cards */}
              <div className="lg:w-1/2 space-y-8">
                {/* Step 1 */}
                <div className="group bg-neutral-800 rounded-3xl p-8 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-medium text-lg">
                      1
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100 mb-3">Create Your Account</h3>
                      <p className="text-gray-300 leading-relaxed">Get started with a free account. No credit card required - sign up in just seconds.</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="group bg-neutral-800 rounded-3xl p-8 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-medium text-lg">
                      2
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100 mb-3">Choose Your Plan</h3>
                      <p className="text-gray-300 leading-relaxed">Select from our flexible plans designed for different needs and usage levels.</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="group bg-neutral-800 rounded-3xl p-8 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-medium text-lg">
                      3
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100 mb-3">Start Using NoaiGPT</h3>
                      <p className="text-gray-300 leading-relaxed">Access our intuitive interface and begin exploring AI capabilities instantly.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tweet Section */}
              <div className="flex items-center justify-center w-full lg:w-1/2">
                <div className="bg-neutral-800 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] p-10 w-full max-w-xl flex items-center justify-center">
                  <Tweet id="1732824684683784516" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
