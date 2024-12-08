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

    // Weekly invoices
    const [weeklyInvoices, setWeeklyInvoices] = useState<{ [week: string]: Invoice[] }>({});
    const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
    const [currentWeekPage, setCurrentWeekPage] = useState<number>(1);
    const INVOICES_PER_PAGE = 5;

    // Non-NPR invoices
    const [nonNprInvoices, setNonNprInvoices] = useState<Invoice[]>([]);

    const allowedEmails = [
        "swikarsharma@gmail.com",
        "sunabranjitkar@gmail.com",
        "shresthajoyash@gmail.com",
    ];

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

    const groupInvoicesByWeek = (invoices: Invoice[]) => {
        const groupedInvoices: { [week: string]: Invoice[] } = {};
        const otherCurrencyInvoices: Invoice[] = [];

        invoices.forEach((invoice) => {
            if (invoice.currency !== "NPR") {
                otherCurrencyInvoices.push(invoice);
                return;
            }

            const invoiceDate = new Date(invoice.date);
            const year = invoiceDate.getFullYear();
            const firstDayOfYear = new Date(year, 0, 1);
            const daysPassed = Math.floor((invoiceDate.getTime() - firstDayOfYear.getTime()) / 86400000);
            const weekNumber = Math.ceil((daysPassed + firstDayOfYear.getDay() + 1) / 7);
            const weekKey = `${year}-W${weekNumber}`;

            if (!groupedInvoices[weekKey]) {
                groupedInvoices[weekKey] = [];
            }
            groupedInvoices[weekKey].push(invoice);
        });

        setNonNprInvoices(otherCurrencyInvoices);
        return groupedInvoices;
    };

    const calculateWeeklyTotal = (invoices: Invoice[]) => {
        return invoices.reduce((total, invoice) => total + invoice.totalAmount, 0) * 0.5;
    };

    const calculateGrandTotal = () => {
        const total = Object.values(weeklyInvoices).flat().reduce((total, invoice) => total + invoice.totalAmount, 0);
        return total * 0.5;
    };

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

                const allInvoices = referredUsers.flatMap((user: ReferredUser) => user.invoices);
                const groupedInvoices = groupInvoicesByWeek(allInvoices);

                setReferralData(referredUsers);
                setTotalReferrals(totalReferrals);
                setWeeklyInvoices(groupedInvoices);

                if (Object.keys(groupedInvoices).length > 0) {
                    setSelectedWeek(Object.keys(groupedInvoices)[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching referral data:", error);
                toast.error("Failed to fetch referral data.");
                setLoading(false);
            }
        };

        fetchReferralData();
    }, []);

    return (
        <main className="flex-grow px-4 overflow-y-auto overflow-x-hidden relative z-30 bg-black text-gray-100">
            <Header onShowSignupForm={() => setShowSignupForm(true)} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-20 pt-10">
                {user && allowedEmails.includes(user.email) ? (
                    <div>
                        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-4">
                            Referral Information
                        </h2>

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
                                        Week {selectedWeek} Sales
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
                                </CardContent>
                            </Card>
                        )}

                        <Card className="bg-neutral-900 border border-neutral-800 shadow-lg w-full max-w-4xl mx-auto my-8 rounded-2xl">
                            <CardHeader className="bg-neutral-800 p-6 rounded-t-2xl">
                                <CardTitle className="text-xl font-extrabold text-white">
                                    Grand Total Earnings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-2xl font-bold text-white text-center">
                                    {calculateGrandTotal().toFixed(2)} NPR
                                </p>
                            </CardContent>
                        </Card>

                        {nonNprInvoices.length > 0 && (
                            <Card className="bg-neutral-900 border border-neutral-800 shadow-lg w-full max-w-4xl mx-auto my-8 rounded-2xl">
                                <CardHeader className="bg-neutral-800 p-6 rounded-t-2xl">
                                    <CardTitle className="text-xl font-extrabold text-white">
                                        Non-NPR Invoices
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <table className="min-w-full text-neutral-400 mt-4">
                                        <thead>
                                            <tr>
                                                <th className="p-2 text-left">Invoice Date</th>
                                                <th className="p-2 text-left">Total Amount</th>
                                                <th className="p-2 text-left">Currency</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {nonNprInvoices.map((invoice, idx) => (
                                                <tr key={idx} className="border-b border-neutral-700">
                                                    <td className="p-2">{invoice.date}</td>
                                                    <td className="p-2">{invoice.totalAmount}</td>
                                                    <td className="p-2">{invoice.currency}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ) : (
                    <p className="text-neutral-400 text-center">You are not authorized to view this information.</p>
                )}

                <ToastContainer theme="dark" />
                {showSignupForm && <SignupForm onClose={() => setShowSignupForm(false)} />}
                <ElegantFooter />
            </div>
        </main>
    );
};

export default EarnPage;
