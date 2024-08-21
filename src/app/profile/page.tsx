"use client";
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { serverURL } from '@/utils/utils';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser, FiLogOut, FiCopy, FiShoppingCart, FiShoppingBag, FiPackage } from 'react-icons/fi';
import MinidenticonImg from './MinidenticonImg'; // Import the Minidenticon component

interface User {
  name: string;
  email: string;
  credits: number;
  referralCode: string;
}

interface EarnedPoint {
  referrerName: string;
  rewardAmount: number;
}

interface EarnedPointsResponse {
  earnedPoints: EarnedPoint[];
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
  const [earnedPoints, setEarnedPoints] = useState<EarnedPoint[]>([]);
  const [totalCompletedReferrals, setTotalCompletedReferrals] = useState<number>(0);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [rewriteCount, setRewriteCount] = useState<number>(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchEarnedPoints = useCallback(async () => {
    try {
      const response = await axios.get<EarnedPointsResponse>(`${serverURL}/referrals/earned-points`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEarnedPoints(response.data.earnedPoints);
      setTotalCompletedReferrals(response.data.totalCompletedReferrals);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching earned points:", error.response?.data || error.message);
        toast.error(`Failed to load earned points: ${error.response?.data?.message || error.message}`);
      } else {
        console.error("Unknown error:", error);
        toast.error("An unknown error occurred while fetching earned points.");
      }
    }
  }, []);

  const fetchPurchases = useCallback(async () => {
    try {
      const response = await axios.get<Purchase[]>(`${serverURL}/shop/purchases`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPurchases(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching purchases:", error.response?.data || error.message);
        toast.error(`Failed to load purchases: ${error.response?.data?.message || error.message}`);
      } else {
        console.error("Unknown error:", error);
        toast.error("An unknown error occurred while fetching purchases.");
      }
    }
  }, []);

  const getRewrites = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/rewordai/rewrites`,
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
          console.error("Error fetching user data:", error.response?.data || error.message);
          toast.error(`Failed to load user data: ${error.response?.data?.message || error.message}`);
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
      navigator.clipboard.writeText(referralLink)
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
    return <div className="text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center">No user data available.</div>;
  }

  const referralLink = `${window.location.origin}/?referral=${user.referralCode}`;

  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen w-screen font-sans">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold text-gray-800">
                  NoaiGPT
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/profile" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Profile
                </Link>
                <Link href="/shop" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Shop
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span>{user?.name}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FiUser className="inline mr-2" /> Profile
                    </Link>
                    <Link href="/shop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FiShoppingCart className="inline mr-2" /> Shop
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FiPackage className="inline mr-2" /> My Orders
                    </Link>
                    <Link href="/purchases" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FiShoppingBag className="inline mr-2" /> My Purchases
                    </Link>
                    <div className="px-4 py-2 text-sm text-gray-700">
                      Credits: {rewriteCount}
                    </div>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      <FiLogOut className="inline mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="bg-white bg-opacity-90 rounded-xl p-6 flex-1">
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <div>
                <MinidenticonImg username={user.email} width={150} height={150} className="rounded-full mb-4" />
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p>
                  <strong>Referral Code:</strong> {user.referralCode}
                  <button 
                    onClick={copyReferralLink}
                    className="ml-2 text-blue-600 hover:text-blue-900"
                  >
                    <FiCopy />
                  </button>
                </p>
                <p><strong>Total Completed Referrals:</strong> {totalCompletedReferrals}</p>
              </div>
            </div>

            <div className="rounded-xl p-6 flex-1">
              <div className="refer-section flex flex-col items-center justify-center p-8 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-black mb-2">Refer Your Friends!</h3>
                <p className="text-lg text-black mb-4">
                  Earn <span className="font-bold text-black">5 credits</span> for each friend who signs up using your referral code!
                </p>
                <div className="flex justify-center w-full p-4 rounded-lg mb-4">
                  <a href={referralLink} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-800 hover:text-blue-900 text-center w-full">
                    {referralLink}
                  </a>
                </div>
                <button 
                  onClick={copyReferralLink}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-90 rounded-xl mb-8 p-6">
            <h2 className="text-2xl font-bold mb-6">Credits</h2>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-200 to-teal-200 bg-opacity-70 rounded-lg">
              <div>
                <p className="text-4xl font-bold text-green-800">{user.credits || 0}</p>
                <p className="text-lg text-green-700">Total Available Credits</p>
              </div>
              <button 
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Buy More Credits
              </button>
            </div>
          </div>

          <div className="bg-white bg-opacity-90 rounded-xl mb-8 p-6">
            <h2 className="text-2xl font-bold mb-6">Earned Points</h2>
            {earnedPoints.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {earnedPoints.map((point, index) => (
                  <li key={index} className="py-4">
                    <p className="text-sm font-medium text-gray-900">Referral: {point.referrerName}</p>
                    <p className="text-sm text-gray-500">Amount: {point.rewardAmount}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No earned points yet.</p>
            )}

          </div>

          <div className="bg-white bg-opacity-90 rounded-xl mb-8 p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Purchases</h2>
            {purchases.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {purchases.map((purchase) => (
                      <tr key={purchase._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.item}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${purchase.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.paymentMethod}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No purchases yet.</p>
            )}
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}