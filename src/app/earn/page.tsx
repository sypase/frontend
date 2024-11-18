"use client";


import React, { useState, useEffect } from "react";
import Header from "../header";
import ElegantFooter from "../last";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { serverURL } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import SignupForm from "../signup/SignupForm";
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

const EarnPage = () => {
    const [totalCompletedReferrals, setTotalCompletedReferrals] = useState<number>(0);
    const [earnings, setEarnings] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showSignupForm, setShowSignupForm] = useState(false);




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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-black text-white">
                Loading...
            </div>
        );
    }



    return (
        <>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>NoAIGPT - Earn with Our Referral Program</title>
                <meta
                    name="description"
                    content="Earn rewards by referring friends to NoAIGPT. Share your unique referral link and start earning credits today."
                />
                <link rel="canonical" href="https://noaigpt.com/earn" />

                {/* Open Graph Meta Tags */}
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:url" content="https://noaigpt.com/earn" />
                <meta property="og:site_name" content="NoAIGPT" />
                <meta property="og:title" content="Earn with Our Referral Program | NoAIGPT" />
                <meta
                    property="og:description"
                    content="Share your referral link and earn rewards with NoAIGPT. Start earning today!"
                />
                <meta
                    property="og:image"
                    content="https://noaigpt.com/assets/images/earn.png"
                />
                <meta property="og:image:secure_url" content="https://noaigpt.com/assets/images/earn.png" />
                <meta property="og:image:alt" content="Earn with NoAIGPT" />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@noaigpt" />
                <meta name="twitter:handle" content="@noaigpt" />
                <meta name="twitter:title" content="Earn with Our Referral Program | NoAIGPT" />
                <meta
                    name="twitter:description"
                    content="Earn rewards by referring friends to NoAIGPT. Start earning credits today!"
                />
                <meta name="twitter:image" content="https://noaigpt.com/assets/images/earn.png" />

                {/* Apple and Mobile Meta Tags */}
                <meta name="apple-mobile-web-app-title" content="NoAIGPT" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="theme-color" content="#000000" />

                {/* Favicon and Icons */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
                <link rel="manifest" href="/site.webmanifest" />

                {/* Preconnect for Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />

                {/* Structured Data for Breadcrumb */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://noaigpt.com/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Earn",
                                "item": "https://noaigpt.com/earn"
                            }
                        ]
                    })}
                </script>
            </head>



            <main className="flex-grow px-4 overflow-y-auto overflow-x-hidden relative z-30 bg-black text-gray-100">
                <Header onShowSignupForm={() => setShowSignupForm(true)}/>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-20 pt-10">
                    <h1 className="text-center text-4xl md:text-5xl font-semibold text-gray-100">
                        Earn with Our Referral Program
                    </h1>

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
