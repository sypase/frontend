"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { serverURL } from "@/utils/utils";
import "react-toastify/dist/ReactToastify.css";
import { RainbowButton } from "@/components/ui/rainbow-button";

import {
  FiUser,
  FiCopy,
  FiShoppingCart,
  FiDollarSign,
  FiFileText,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
  FiPackage,
  FiArrowRight,
} from "react-icons/fi";
import MinidenticonImg from "./MinidenticonImg";
import Header from "../header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface User {
  name: string;
  email: string;
  credits: number;
  referralCode: string;
}

interface Purchase {
  _id: string;
  item: string;
  amount: number;
  paymentMethod: string;
  date: string;
}

interface Order {
  _id: string;
  item: string;
  status: string;
  date: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCompletedReferrals, setTotalCompletedReferrals] =
    useState<number>(0);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [rewriteCount, setRewriteCount] = useState<number>(-1);
  const [isPurchasesCollapsed, setIsPurchasesCollapsed] = useState(true);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get<Purchase[]>(
        `${serverURL}/shop/purchases`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setPurchases(response.data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      toast.error("Failed to load purchases.");
    }
  };

  const getRewrites = async () => {
    try {
      const response = await axios.get(`${serverURL}/bypass/rewrites`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRewriteCount(response.data.rewrites);
    } catch (error) {
      console.error("Error fetching rewrites:", error);
      toast.error("Failed to load rewrite count.");
    }
  };

  useEffect(() => {
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
    fetchPurchases();
    getRewrites();
  }, []);

  const copyReferralLink = () => {
    if (user && user.referralCode) {
      const referralLink = `${window.location.origin}/?referral=${user.referralCode}`;
      navigator.clipboard
        .writeText(referralLink)
        .then(() => toast.success("Referral link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy referral link."));
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
      <Header />
      <div className="bg-black min-h-screen font-sans text-white">
        <main className="pt-9 pb-8 overflow-y-auto">
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

            <Card className="mb-12 bg-neutral-900 border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link href="/pricing">
                    <Card className="bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-200 cursor-pointer rounded-lg shadow-lg border-none">
                      <CardContent className="flex flex-col items-center justify-center p-8">
                        <FiShoppingCart className="text-5xl text-blue-200 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Purchase
                        </h3>
                        <p className="text-sm text-blue-200 text-center">
                          Buy credits or upgrade your plan
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/earn">
                    <Card className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 transition-all duration-200 cursor-pointer rounded-lg shadow-lg border-none">
                      <CardContent className="flex flex-col items-center justify-center p-8">
                        <FiDollarSign className="text-5xl text-green-200 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Earn
                        </h3>
                        <p className="text-sm text-green-200 text-center">
                          Refer friends and earn credits
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/documents">
                    <Card className="bg-gradient-to-br from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 transition-all duration-200 cursor-pointer rounded-lg shadow-lg border-none">
                      <CardContent className="flex flex-col items-center justify-center p-8">
                        <FiFileText className="text-5xl text-yellow-200 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Documents
                        </h3>
                        <p className="text-sm text-yellow-200 text-center">
                          View and manage your documents
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-12 bg-neutral-900 border border-neutral-800 shadow-md">
              <CardHeader className="flex items-center justify-between cursor-pointer">
                <div
                  className="flex items-center flex-grow"
                  onClick={() => setIsPurchasesCollapsed(!isPurchasesCollapsed)}
                >
                  <CardTitle className="flex items-center">
                    Recent Purchases
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FiInfo className="ml-2 text-neutral-400 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-white p-2 rounded">
                          <p>
                            If you have any issues with purchases, please open a
                            ticket in our Discord server.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  {isPurchasesCollapsed ? (
                    <FiChevronDown className="text-xl ml-2" />
                  ) : (
                    <FiChevronUp className="text-xl ml-2" />
                  )}
                </div>
              </CardHeader>
              {!isPurchasesCollapsed && (
                <CardContent>
                  {purchases.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-neutral-300">
                            Item
                          </TableHead>
                          <TableHead className="text-neutral-300">
                            Amount
                          </TableHead>
                          <TableHead className="text-neutral-300">
                            Payment Method
                          </TableHead>
                          <TableHead className="text-neutral-300">
                            Date
                          </TableHead>
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
              )}
            </Card>

            <Card className="mb-12 bg-neutral-900 border border-neutral-800 shadow-md">
              <CardHeader>
                <CardTitle>Detailed Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-neutral-400">
                    View a complete list of all your transactions
                  </p>
                  <Link
                    href="/detailed-transactions"
                    className="flex items-center text-blue-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    See all detailed transactions
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <ToastContainer theme="dark" />
    </>
  );
}
