"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { serverURL } from "@/utils/utils";
import "react-toastify/dist/ReactToastify.css";
import { RainbowButton } from "@/components/ui/rainbow-button";

import {
  FiUser,
  FiLogOut,
  FiCopy,
  FiShoppingCart,
  FiShoppingBag,
  FiPackage,
} from "react-icons/fi";
import MinidenticonImg from "./MinidenticonImg";
import Header from "../dashboard/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  name: string;
  email: string;
  credits: number;
  referralCode: string;
}

interface EarnedPointAsReferrer {
  referredUserName: string;
  rewardAmount: number;
}

interface EarnedPointAsReferred {
  referrerName: string;
  rewardAmount: number;
}

interface EarnedPointsResponse {
  earnedPointsAsReferrer: EarnedPointAsReferrer[];
  earnedPointsAsReferred: EarnedPointAsReferred[];
  totalCompletedReferrals: number;
}

interface Purchase {
  _id: string;
  item: string;
  amount: number;
  paymentMethod: string;
  date: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [earnedPointsAsReferrer, setEarnedPointsAsReferrer] = useState<
    EarnedPointAsReferrer[]
  >([]);
  const [earnedPointsAsReferred, setEarnedPointsAsReferred] = useState<
    EarnedPointAsReferred[]
  >([]);
  const [totalCompletedReferrals, setTotalCompletedReferrals] =
    useState<number>(0);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [rewriteCount, setRewriteCount] = useState<number>(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchEarnedPoints = useCallback(async () => {
    try {
      const response = await axios.get<EarnedPointsResponse>(
        `${serverURL}/referrals/earned-points`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);

      setEarnedPointsAsReferrer(response.data.earnedPointsAsReferrer);
      setEarnedPointsAsReferred(response.data.earnedPointsAsReferred);
      setTotalCompletedReferrals(response.data.totalCompletedReferrals);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching earned points:",
          error.response?.data || error.message
        );
        toast.error(
          `Failed to load earned points: ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        console.error("Unknown error:", error);
        toast.error("An unknown error occurred while fetching earned points.");
      }
    }
  }, []);

  const fetchPurchases = useCallback(async () => {
    try {
      const response = await axios.get<Purchase[]>(
        `${serverURL}/shop/purchases`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPurchases(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching purchases:",
          error.response?.data || error.message
        );
        toast.error(
          `Failed to load purchases: ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        console.error("Unknown error:", error);
        toast.error("An unknown error occurred while fetching purchases.");
      }
    }
  }, []);

  const getRewrites = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/bypass/rewrites`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setRewriteCount(response.data.rewrites);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<{ user: User }>(`${serverURL}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching user data:",
            error.response?.data || error.message
          );
          toast.error(
            `Failed to load user data: ${
              error.response?.data?.message || error.message
            }`
          );
        } else {
          console.error("Unknown error:", error);
          toast.error("An unknown error occurred while fetching user data.");
        }
        setLoading(false);
      }
    };

    fetchUserData();
    fetchEarnedPoints();
    fetchPurchases();
    getRewrites();
  }, [fetchEarnedPoints, fetchPurchases]);

  const copyReferralLink = () => {
    if (user && user.referralCode) {
      const referralLink = `${window.location.origin}/?referral=${user.referralCode}`;
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          toast.success("Referral link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy referral link:", error);
          toast.error("Failed to copy referral link.");
        });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-400">No user data available.</div>
    );
  }

  const referralLink = `${window.location.origin}/?referral=${user.referralCode}`;

  return (
    <>
      <Header isLoggedIn={!!user} user={user} rewriteCount={rewriteCount} />
      <div className="bg-black min-h-screen font-sans text-white bg-black ">
        <main className="pt-8 pb-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-neutral-900 border border-neutral-800 shadow-md">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-6">
                    <MinidenticonImg
                      username={user.email}
                      width={150}
                      height={150}
                      className="rounded-full mr-6"
                    />
                    <div>
                      <p className="text-xl font-semibold mb-2">{user.name}</p>
                      <p className="text-neutral-400 mb-2">{user.email}</p>
                      <div className="flex items-center">
                        <p className="text-neutral-400 mr-2">Referral Code:</p>
                        <p className="font-semibold">{user.referralCode}</p>
                        <Button
                          variant="ghost"
                          onClick={copyReferralLink}
                          className="ml-2 text-neutral-400 hover:text-neutral-200"
                        >
                          <FiCopy />
                        </Button>
                      </div>
                      <p className="text-neutral-400 mt-2">
                        Total Completed Referrals: {totalCompletedReferrals}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-900 border border-neutral-800 shadow-md overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6">
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <span className="mr-2">👥</span> Refer Your Friends
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-lg text-neutral-400 mb-6">
                    Earn{" "}
                    <span className="font-bold text-blue-400">500 credits</span>{" "}
                    for each friend who signs up using your referral code!{" "}
                    <span className="ml-2">🎉</span>
                  </p>
                  <div className="flex justify-center w-full p-4 rounded-lg mb-6 bg-neutral-800">
                    <a
                      href={referralLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-400 hover:text-blue-500 text-center w-full transition-colors duration-200"
                    >
                      {referralLink}
                    </a>
                  </div>
                  <Button
                    onClick={copyReferralLink}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 flex items-center justify-center"
                  >
                    <span className="mr-2">📋</span> Copy Referral Link
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-12 bg-neutral-900 border border-neutral-800 shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-900 to-teal-900 p-6">
                <CardTitle className="text-2xl font-bold text-white">
                  Credits Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="mb-4 sm:mb-0">
                    <p className="text-6xl font-bold text-emerald-400 mb-2 text-center sm:text-left">
                      {user.credits || 0}
                    </p>
                    <p className="text-lg text-neutral-400 text-center sm:text-left">
                      Available Credits
                    </p>
                  </div>
                  <Link href="/pricing" passHref>
                    <RainbowButton>Add Credits</RainbowButton>
                  </Link>
                </div>
              </CardContent>
            </Card>
            {earnedPointsAsReferrer && (
              <Card className="mb-12 bg-neutral-900 border border-neutral-800 shadow-md">
                <CardHeader>
                  <CardTitle>Earned Points as Referrer</CardTitle>
                </CardHeader>
                <CardContent>
                  {earnedPointsAsReferrer.length > 0 ? (
                    <ul className="divide-y divide-neutral-800">
                      {earnedPointsAsReferrer.map((point, index) => (
                        <li key={index} className="py-4">
                          <p className="text-lg font-medium text-neutral-300">
                            Referred User: {point.referredUserName}
                          </p>
                          <p className="text-lg text-neutral-400">
                            Amount: {point.rewardAmount}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-neutral-400">
                      No earned points as referrer yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {earnedPointsAsReferred && (
              <Card className="mb-12 bg-neutral-900 border border-neutral-800 shadow-md">
                <CardHeader>
                  <CardTitle>Earned Points as Referred</CardTitle>
                </CardHeader>
                <CardContent>
                  {earnedPointsAsReferred.length > 0 ? (
                    <ul className="divide-y divide-neutral-800">
                      {earnedPointsAsReferred.map((point, index) => (
                        <li key={index} className="py-4">
                          <p className="text-lg font-medium text-neutral-300">
                            Referrer: {point.referrerName}
                          </p>
                          <p className="text-lg text-neutral-400">
                            Amount: {point.rewardAmount}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-neutral-400">
                      No earned points as referred yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="mb-12 bg-neutral-900 border border-neutral-800 shadow-md">
              <CardHeader>
                <CardTitle>Recent Purchases</CardTitle>
              </CardHeader>
              <CardContent>
                {purchases.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-neutral-300">Item</TableHead>
                        <TableHead className="text-neutral-300">
                          Amount
                        </TableHead>
                        <TableHead className="text-neutral-300">
                          Payment Method
                        </TableHead>
                        <TableHead className="text-neutral-300">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {purchases.map((purchase) => (
                        <TableRow key={purchase._id}>
                          <TableCell className="font-medium text-neutral-300">
                            {purchase.item}
                          </TableCell>
                          <TableCell className="text-neutral-400">
                            ${purchase.amount.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-neutral-400">
                            {purchase.paymentMethod}
                          </TableCell>
                          <TableCell className="text-neutral-400">
                            {purchase.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-neutral-400">No purchases yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <ToastContainer theme="dark" />
    </>
  );
}
