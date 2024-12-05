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
import { NextSeo } from "next-seo"; // Import NextSeo component


interface User {
    name: string;
    email: string;
    credits: number;
    referralCode: string;
}

interface ReferralData {
    earnedPointsAsReferrer: number;
    earnedPointsAsReferred: number;
    totalCompletedReferrals: number;
}

interface ReferredUser {
    referredUserName: string;
    referredUserEmail: string;
    invoices: {
      invoiceId: string;
      purchaseId: string;
      date: string;
      amount: number;
      totalAmount: number;
      currency: string;
      paymentMethod: string;
    }[];
  }

const EarnPage = () => {
    const [totalCompletedReferrals, setTotalCompletedReferrals] = useState<number>(0);
    const [earnings, setEarnings] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [referralData, setReferralData] = useState<ReferredUser[]>([]);
    const [totalReferrals, setTotalReferrals] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const allowedEmails = [
        "swikarsharma@gmail.com",
        "sunabranjitkar@gmail.com",
        "shresthajoyash@gmail.com"
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
      
    useEffect(() => {
        getUser();
        
    }, []);

    
    useEffect(() => {
        if (isLoggedIn) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get<{ user: User }>(`${serverURL}/users`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    });
                    setUser(response.data.user);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    toast.error("Failed to load user data.");
                    setLoading(false);
                }
            };

            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            const fetchReferralData = async () => {
                try {
                    const response = await axios.get(`${serverURL}/referrals/earned-points`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    });
    
                    // Log response data to check what’s returned
                    console.log("Referral data response:", response);
    
                    const { earnedPointsAsReferrer, totalCompletedReferrals } = response.data;
                    setTotalCompletedReferrals(totalCompletedReferrals);
                    setEarnings(totalCompletedReferrals * 500);
                    console.log("Referral data:", response.data);
                } catch (error) {
                    // Log detailed error information
                    console.error("Error fetching referral data:", error);
                    if (axios.isAxiosError(error)) {
                        console.error("Axios error details:", error.response);
                    }
                    toast.error("Failed to load referral data.");
                }
            };
    
            fetchReferralData();
        }
    }, [isLoggedIn]);
    
    
    useEffect(() => {
        const fetchReferralData = async () => {
            try {
              const response = await axios.get(`${serverURL}/referrals/earned-swikar`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
      
              const { totalReferrals, referredUsers } = response.data;
              setReferralData(referredUsers);
              setTotalReferrals(totalReferrals);
              setLoading(false);
            } catch (error) {
              console.error("Error fetching Swikar referral data:", error);
              if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 403) {
                  setError("You are not authorized to view this referral data.");
                } else {
                  toast.error(`Error: ${error.response.data.message}`);
                }
              } else {
                setError("Failed to fetch Swikar's referral data.");
              }
              setLoading(false);
            }
          };
      
          fetchReferralData();
        }, []);

    const copyReferralLink = () => {
        if (user && user.referralCode) {
            const referralLink = `${window.location.origin}/?referral=${user.referralCode}`;
            navigator.clipboard
                .writeText(referralLink)
                .then(() => 
                    toast.success("Referral link copied to clipboard!", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        style: {
                          backgroundColor: "#272727",
                          color: "#fff",
                          borderRadius: "8px",
                        },
                          })
                        )
                        .catch(() => 
                          toast.error("Failed to copy referral link.", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            style: {
                              backgroundColor: "#272727",
                              color: "#fff",
                              borderRadius: "8px",
                        },
                          })
                        );
        }
    };

    const calculateTotalEarned = (invoices: { totalAmount: number }[]) => {
        return invoices.reduce((total, invoice) => total + invoice.totalAmount, 0) * 0.5;
      };



    return (
        <>
            <main className="flex-grow px-4 overflow-y-auto overflow-x-hidden relative z-30 bg-black text-gray-100">
                <Header onShowSignupForm={() => setShowSignupForm(true)}/>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-20 pt-10">
                    <h1 className="text-center text-4xl md:text-5xl font-semibold text-gray-100">
                        Earn with Our Referral Program
                    </h1>

                    {user && allowedEmails.includes(user.email) ? (
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-center text-gray-100 mb-4">
                                Swikar's Referral Information
                            </h2>
                            <Card className="bg-neutral-900 border border-neutral-800 shadow-lg w-full max-w-4xl mx-auto my-8 rounded-2xl">
                                <CardHeader className="bg-neutral-800 p-6 rounded-t-2xl">
                                <CardTitle className="text-xl font-extrabold text-white">
                                    Total Referrals: {totalReferrals}
                                </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                {referralData.length > 0 ? (
                                    referralData.map((user, index) => {
                                    const totalEarned = calculateTotalEarned(user.invoices);

                                    return (
                                        <div key={index} className="bg-neutral-800 p-4 rounded-xl mb-4">
                                        <table className="min-w-full text-neutral-400 mt-4">
                                            <thead>
                                            <tr>
                                                <th className="p-2 text-left">Invoice Date</th>
                                                <th className="p-2 text-left">Total Amount</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {user.invoices.map((invoice, idx) => (
                                                <tr key={idx}>
                                                <td className="p-2">{invoice.date}</td>
                                                <td className="p-2">{invoice.totalAmount} {invoice.currency}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        <div className="mt-4 text-white">
                                            <strong>Total Earned: </strong>{totalEarned.toFixed(2)} {user.invoices[0]?.currency}
                                        </div>
                                        </div>
                                    );
                                    })
                                ) : (
                                    <p className="text-neutral-400">No referrals found for Swikar.</p>
                                )}
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <p className="text-neutral-400 text-center">You are not authorized to view this information.</p>
                    )}

                    {/* New Card for Referrals and Earnings */}
                    {isLoggedIn && (
                    <Card className="bg-neutral-900 border border-neutral-800 shadow-lg w-full max-w-3xl mx-auto my-12 rounded-2xl">
                        <CardHeader className="bg-neutral-800 p-6 rounded-t-2xl">
                            <CardTitle className="text-2xl font-extrabold text-white">
                                Referral Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <p className="text-neutral-400 text-lg">
                                <strong>Total Completed Referrals:</strong> {totalCompletedReferrals}
                            </p>
                            <p className="text-neutral-400 text-lg">
                                <strong>Total Earnings:</strong> {earnings } Credits
                            </p>
                        </CardContent>
                    </Card>)}

                    {/* How It Works Section */}
                    <Card className="bg-neutral-900 border border-neutral-800 shadow-2xl w-full max-w-7xl mx-auto my-12 rounded-2xl">
                        <CardHeader className="bg-neutral-800 p-6 rounded-t-2xl">
                            <CardTitle className="text-3xl font-extrabold text-white">
                                How It Works
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-8">
                            <p className="text-lg text-neutral-400">
                                Here's how you can earn 500 credits by simply referring your friends. It's quick, easy, and rewarding!{" "}
                                <span className="ml-2">💸</span>
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Step 1 */}
                                <Card className="bg-neutral-800 border border-neutral-700 shadow-lg p-6 rounded-xl">
                                    <CardHeader className="bg-neutral-700 p-4 rounded-xl">
                                        <CardTitle className="text-xl font-semibold text-white">
                                            Share Your Referral Link
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-neutral-400 text-base pt-8">
                                            Copy your unique referral link and share it with your friends via social media, text, or email.
                                        </p>
                                        <Button
                                            onClick={() => {
                                                if (isLoggedIn) {
                                                    copyReferralLink();
                                                } else {
                                                    setShowSignupForm(true);
                                                }
                                            }}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
                                        >
                                            {isLoggedIn ? "Copy Referral Link" : "Sign In and Copy Link"}
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Step 2 */}
                                <Card className="bg-neutral-800 border border-neutral-700 shadow-lg p-6 rounded-xl">
                                    <CardHeader className="bg-neutral-700 p-4 rounded-xl">
                                        <CardTitle className="text-xl font-semibold text-white">
                                            Friend Logs In
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-neutral-400 text-base pt-8">
                                            Your friend uses your referral link to sign up and create their account.
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Step 3 */}
                                <Card className="bg-neutral-800 border border-neutral-700 shadow-lg p-6 rounded-xl">
                                    <CardHeader className="bg-neutral-700 p-4 rounded-xl">
                                        <CardTitle className="text-xl font-semibold text-white">
                                            Earn 500 Credits
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-neutral-400 text-base pt-8">
                                            Once your friend logs in, you and your friend will automatically receive 500 credits.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                    <div>

</div>

                    <ToastContainer theme="dark" />
                    {showSignupForm && (
        <SignupForm onClose={() => setShowSignupForm(false)} />
      )}
                    <ElegantFooter />
                </div>
            </main>
        </>
    );
};

export default EarnPage;
