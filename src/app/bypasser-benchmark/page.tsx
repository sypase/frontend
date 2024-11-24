'use client';

import React, { useState, useEffect } from "react";
import Header from "../header";
import ElegantFooter from "../last";
import SignupForm from "../signup/SignupForm";
import { LampDemo } from "./components/LampDemo";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BypasserPage = () => {
  const tableData = [
    {
        name: "NoAIGPT",
        accuracy: "98%+",
        grammar: "98%+",
        price: "Free (Basic), $2 (Premium)",
    },
    {
        name: "Humanizey AI",
        accuracy: "90%",
        grammar: "88%",
        price: "Subscription-based",
    },
    {
        name: "Undetectable.ai",
        accuracy: "92%",
        grammar: "85%",
        price: "Free Trial, $10/month",
    },
    {
        name: "BypassGPT",
        accuracy: "88%",
        grammar: "82%",
        price: "$15/month",
    },
    {
        name: "TrueText AI",
        accuracy: "93%",
        grammar: "92%",
        price: "$20/month",
    },
    {
        name: "TextTransformer",
        accuracy: "89%",
        grammar: "90%",
        price: "Free Basic, $25/month Premium",
    },
    {
        name: "WriteGuard",
        accuracy: "80%",
        grammar: "78%",
        price: "$5/month",
    },
    {
        name: "Humbot",
        accuracy: "86%",
        grammar: "84%",
        price: "$10/month",
    },
];


    const [showSignupForm, setShowSignupForm] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <main className="flex-grow px-4 overflow-y-auto overflow-x-hidden relative z-30 bg-black text-gray-100">
            <div className="min-h-screen bg-black pt-10 mt-24 mb-20 md:px-20 lg:pt-0">
                <Header onShowSignupForm={() => setShowSignupForm(true)} />
                        
        <div className="relative mt-[-40px] mb-4 md:mt-[-65px] md:mb-[-15px]">
        <LampDemo />
      </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">


                <Table className="min-w-full table-auto">
    <TableCaption>Comparison of AI Bypass Tools</TableCaption>
    <TableHeader>
        <TableRow>
            <TableHead>AI Bypass</TableHead>
            <TableHead>Accuracy</TableHead>
            <TableHead>Grammar</TableHead>
            <TableHead className="w-80">Price</TableHead> {/* Adjust width here */}
        </TableRow>
    </TableHeader>
    <TableBody>
        {tableData.map((row, index) => (
            <TableRow key={index}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.accuracy}</TableCell>
                <TableCell>{row.grammar}</TableCell>
                <TableCell className="w-80">{row.price}</TableCell> {/* Adjust width here */}
            </TableRow>
        ))}
    </TableBody>
</Table>

                </div>

                <ElegantFooter />
                {isClient && showSignupForm && (
                    <SignupForm onClose={() => setShowSignupForm(false)} />
                )}
            </div>
        </main>
    );
};

export default BypasserPage;
