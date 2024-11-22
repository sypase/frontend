"use client";
import React from "react";
import Header from "../header";
import { useState } from "react";
import SignupForm from "../signup/SignupForm";
import Table from "./components/Table";
import { LampDemo } from "./components/LampDemo";

export default function Page() {
  const tableData = [
    ["S.No", "AI-Bypass", "Accuracy", "Grammer", "Price"],
    ["1", "NoaiGPT", "100%", "Fluent", "Free"],
    ["2", "NoaiGPT", "100%", "Fluent", "Free"],
    ["3", "NoaiGPT", "100%", "Fluent", "Free"],
    ["4", "NoaiGPT", "100%", "Fluent", "Free"],
  ];
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div className="min-h-screen bg-black p-40">
      <Header onShowSignupForm={() => setShowSignupForm(true)} />
      <div className="realtive mt-[-65px] mb-[-15px]">
        <LampDemo />
      </div>
      <div className="z-10 ">
        <Table data={tableData} />
      </div>
    </div>
  );
}
