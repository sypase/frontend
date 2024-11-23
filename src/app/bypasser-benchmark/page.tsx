"use client";
import React, { useState, useEffect } from "react";
import Header from "../header";
import SignupForm from "../signup/SignupForm";
import Table from "./components/Table";
import { LampDemo } from "./components/LampDemo";
import ElegantFooter from "../last";


const BypasserPage = () => {
  const tableData = [
    ["S.No", "AI-Bypass", "Accuracy", "Grammar", "Price"],
    ["1", "NoaiGPT", "100%", "Fluent", "Free"],
    ["2", "NoaiGPT", "100%", "Fluent", "Free"],
    ["3", "NoaiGPT", "100%", "Fluent", "Free"],
    ["4", "NoaiGPT", "100%", "Fluent", "Free"],
  ];
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="flex-grow px-4 overflow-y-auto overflow-x-hidden relative z-30 bg-black text-gray-100">
      <div className="min-h-screen bg-black pt-10  mt-24 mb-20 md:px-20 lg:pt-0">
        <Header onShowSignupForm={() => setShowSignupForm(true)} />
        
        <div className="relative mt-[-40px] mb-4 md:mt-[-65px] md:mb-[-15px]">
          <LampDemo />
        </div>
        <div className="overflow-x-auto">
  <div className="min-w-full sm:table-fixed">
    <Table data={tableData} />
  </div>
</div>
<ElegantFooter />
      </div>

      {isClient && showSignupForm && (
          <SignupForm onClose={() => setShowSignupForm(false)} />
        )}

    </main>
  );
};

export default BypasserPage;
