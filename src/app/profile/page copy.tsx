"use client";
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { serverURL } from '@/utils/utils';
import 'react-toastify/dist/ReactToastify.css';
import QRCode from 'qrcode.react';

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

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [earnedPoints, setEarnedPoints] = useState<EarnedPoint[]>([]);
  const [totalCompletedReferrals, setTotalCompletedReferrals] = useState<number>(0);

  const fetchEarnedPoints = useCallback(async () => {
    try {
      const response = await axios.get<EarnedPointsResponse>(`${serverURL}/referrals/earned-points`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Earned points response:", response.data);
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
    fetchEarnedPoints(); // Fetch earned points immediately
  }, [fetchEarnedPoints]);

  useEffect(() => {
    // Set up an interval to fetch earned points every 5 minutes (300000 ms)
    const intervalId = setInterval(fetchEarnedPoints, 300000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [fetchEarnedPoints]);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: User Details */}
          <div className="flex-1 p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile</h2>
            <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-700"><strong>Credits:</strong> {user.credits || 0}</p>
            <p className="text-gray-700"><strong>Referral Code:</strong> {user.referralCode}</p>
            <p className="text-gray-700"><strong>Total Completed Referrals:</strong> {totalCompletedReferrals}</p>
          </div>

          {/* Right Side: QR Code with Emojis and Copy Link */}
          <div className="flex flex-col items-center justify-start md:ml-6 mt-6 md:mt-0">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-2">🌱</span>
              <span className="text-4xl mr-2">🔗</span>
              <div className="bg-gray-100 p-2 rounded-lg">
                <QRCode value={`${window.location.origin}/?referral=${user.referralCode}`} size={100} />
              </div>
              <span className="text-4xl ml-2">🔗</span>
              <span className="text-4xl ml-2">🍀</span>
            </div>
            <button 
              onClick={copyReferralLink} 
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Copy Referral Link
            </button>
            <p className="mt-2 text-gray-600 text-center text-sm">
              Share your referral link to earn 5 free credits for you and your friends!
            </p>
          </div>
        </div>

        {/* Earned Points Section */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Earned Points:</h3>
          {earnedPoints.length > 0 ? (
            <ul className="list-disc list-inside">
              {earnedPoints.map((point, index) => (
                <li key={index} className="text-gray-700">
                  <span className="text-green-600 font-bold">+ </span>
                  {`Referral: ${point.referrerName}, Amount: ${point.rewardAmount}`}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No earned points yet.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
