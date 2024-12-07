"use client";

import React, { useState, useEffect } from "react";
import Header from "../../header";
import ElegantFooter from "../../last";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { serverURL } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import SignupForm from "../../signup/SignupForm";
import { NextSeo } from "next-seo";

interface User {
    name: string;
    email: string;
    credits: number;
    referralCode: string;
}

interface Invoice {
    invoiceId: string;
    purchaseId: string;
    date: string;
    amount: number;
    totalAmount: number;
    currency: string;
    paymentMethod: string;
}

interface ReferredUser {
    referredUserName: string;
    referredUserEmail: string;
    invoices: Invoice[];
}

const EarnPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [referralData, setReferralData] = useState<ReferredUser[]>([]);
    const [totalReferrals, setTotalReferrals] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    // New state for weekly invoices
    const [weeklyInvoices, setWeeklyInvoices] = useState<{[week: string]: Invoice[]}>({});
    const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
    const [currentWeekPage, setCurrentWeekPage] = useState<number>(1);
    const INVOICES_PER_PAGE = 5;

    const allowedEmails = [
        "swikarsharma@gmail.com",
        "sunabranjitkar@gmail.com",
        "shresthajoyash@gmail.com"
    ];

    // Existing methods remain the same...
    const getUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
    
        const config = {
          method: "GET",
          url: `${serverURL}/users`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    
        try {
          const response = await axios(config);
          setUser(response.data.user);
          setIsLoggedIn(true);
        } catch (error) {
          setIsLoggedIn(false);
          toast.error("Something went wrong!");
        }
    };

    // Group invoices by week
    const groupInvoicesByWeek = (invoices: Invoice[]) => {
        const groupedInvoices: {[week: string]: Invoice[]} = {};
        
        invoices.forEach(invoice => {
            const invoiceDate = new Date(invoice.date);
            const year = invoiceDate.getFullYear();
            const month = invoiceDate.getMonth();
            const firstDayOfWeek = new Date(year, month, invoiceDate.getDate() - invoiceDate.getDay());
            const weekKey = `${year}-W${getWeekNumber(invoiceDate)}`;
            
            if (!groupedInvoices[weekKey]) {
                groupedInvoices[weekKey] = [];
            }
            groupedInvoices[weekKey].push(invoice);
        });
        
        return groupedInvoices;
    };

    // Helper function to get week number
    const getWeekNumber = (date: Date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.valueOf() - firstDayOfYear.valueOf()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    // Calculate total for a week
    const calculateWeeklyTotal = (invoices: Invoice[]) => {
        return invoices.reduce((total, invoice) => total + invoice.totalAmount, 0);
    };

    // Pagination for weekly invoices
    const getWeeklyInvoicesPaginated = () => {
        if (!selectedWeek) return [];
        
        const weekInvoices = weeklyInvoices[selectedWeek] || [];
        const startIndex = (currentWeekPage - 1) * INVOICES_PER_PAGE;
        return weekInvoices.slice(startIndex, startIndex + INVOICES_PER_PAGE);
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        const fetchReferralData = async () => {
            try {
              const response = await axios.get(`${serverURL}/referrals/earned-swikar`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
      
              const { totalReferrals, referredUsers } = response.data;
              
              // Collect all invoices from all referred users
              const allInvoices = referredUsers.flatMap((user: ReferredUser) => user.invoices);
              
              // Group invoices by week
              const groupedInvoices = groupInvoicesByWeek(allInvoices);
              
              setReferralData(referredUsers);
              setTotalReferrals(totalReferrals);
              setWeeklyInvoices(groupedInvoices);
              
              // Select the most recent week by default
              const weeks = Object.keys(groupedInvoices);
              if (weeks.length > 0) {
                setSelectedWeek(weeks[0]);
              }
              
              setLoading(false);
            } catch (error) {
              console.error("Error fetching Swikar referral data:", error);
              toast.error("Failed to fetch referral data.");
              setLoading(false);
            }
        };
      
        fetchReferralData();
    }, []);

    // Calculate grand total of all invoices
    const calculateGrandTotal = () => {
        return Object.values(weeklyInvoices).flat().reduce((total, invoice) => total + invoice.totalAmount, 0);
    };

    return (
        <main className="flex-grow px-4 overflow-y-auto overflow-x-hidden relative z-30 bg-black text-gray-100">
            <Header onShowSignupForm={() => setShowSignupForm(true)}/>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-20 pt-10">
                {user && allowedEmails.includes(user.email) ? (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-4">
                            Weekly Invoice Breakdown
                        </h2>

                        {/* Week Selector */}
                        <div className="flex justify-center mb-6 space-x-4">
                            {Object.keys(weeklyInvoices).map((week) => (
                                <Button 
                                    key={week} 
                                    onClick={() => {
                                        setSelectedWeek(week);
                                        setCurrentWeekPage(1);
                                    }}
                                    variant={selectedWeek === week ? "default" : "outline"}
                                    className="bg-neutral-800 hover:bg-neutral-700 text-white"
                                >
                                    {week}
                                </Button>
                            ))}
                        </div>

                        {selectedWeek && (
                            <Card className="bg-neutral-900 border border-neutral-800 shadow-lg w-full max-w-4xl mx-auto my-8 rounded-2xl">
                                <CardHeader className="bg-neutral-800 p-6 rounded-t-2xl">
                                    <CardTitle className="text-xl font-extrabold text-white">
                                        Week {selectedWeek} Invoices
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <table className="min-w-full text-neutral-400 mt-4">
                                        <thead>
                                            <tr>
                                                <th className="p-2 text-left">Invoice Date</th>
                                                <th className="p-2 text-left">Total Amount</th>
                                                <th className="p-2 text-left">Currency</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getWeeklyInvoicesPaginated().map((invoice, idx) => (
                                                <tr key={idx} className="border-b border-neutral-700">
                                                    <td className="p-2">{invoice.date}</td>
                                                    <td className="p-2">{invoice.totalAmount}</td>
                                                    <td className="p-2">{invoice.currency}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Pagination Controls */}
                                    <div className="flex justify-between items-center mt-4">
                                        <Button 
                                            onClick={() => setCurrentWeekPage(page => Math.max(1, page - 1))}
                                            disabled={currentWeekPage === 1}
                                            variant="outline"
                                            className="bg-neutral-800 hover:bg-neutral-700 text-white"
                                        >
                                            Previous
                                        </Button>
                                        <span className="text-neutral-400">
                                            Page {currentWeekPage} of {Math.ceil((weeklyInvoices[selectedWeek]?.length || 0) / INVOICES_PER_PAGE)}
                                        </span>
                                        <Button 
                                            onClick={() => setCurrentWeekPage(page => 
                                                page < Math.ceil((weeklyInvoices[selectedWeek]?.length || 0) / INVOICES_PER_PAGE) 
                                                    ? page + 1 
                                                    : page
                                            )}
                                            disabled={currentWeekPage >= Math.ceil((weeklyInvoices[selectedWeek]?.length || 0) / INVOICES_PER_PAGE)}
                                            variant="outline"
                                            className="bg-neutral-800 hover:bg-neutral-700 text-white"
                                        >
                                            Next
                                        </Button>
                                    </div>

                                    {/* Weekly Total */}
                                    <div className="mt-4 text-right">
                                        <p className="text-xl font-bold text-white">
                                            Week Total: {calculateWeeklyTotal(weeklyInvoices[selectedWeek] || []).toFixed(2)} {weeklyInvoices[selectedWeek]?.[0]?.currency || ''}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Grand Total Card */}
                        <Card className="bg-neutral-900 border border-neutral-800 shadow-lg w-full max-w-4xl mx-auto my-8 rounded-2xl">
                            <CardHeader className="bg-neutral-800 p-6 rounded-t-2xl">
                                <CardTitle className="text-xl font-extrabold text-white">
                                    Grand Total Earnings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-2xl font-bold text-white text-center">
                                    {calculateGrandTotal().toFixed(2)} {Object.values(weeklyInvoices).flat()[0]?.currency || ''}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <p className="text-neutral-400 text-center">You are not authorized to view this information.</p>
                )}

                <ToastContainer theme="dark" />
                {showSignupForm && (
                    <SignupForm onClose={() => setShowSignupForm(false)} />
                )}
                <ElegantFooter />
            </div>
        </main>
    );
};

export default EarnPage;