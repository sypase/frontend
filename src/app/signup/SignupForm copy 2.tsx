
"use client";
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import { serverURL } from '@/utils/utils';
import { ToastContainer, toast } from 'react-toastify';
import LoginComponent from '../login/LoginComponent'; // Import the LoginComponent
import { useRouter } from 'next/navigation'; // Use next/navigation for the App Router

interface SignupFormProps {
  onClose: () => void;
}

export default function SignupForm({ onClose }: SignupFormProps) {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCodeSent, setVerificationCodeSent] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(1);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false); // State to toggle login form
  const [referralCode, setReferralCode] = useState<string | null>(null); // State to store referral code

  const router = useRouter();

  useEffect(() => {
    const referral = new URLSearchParams(window.location.search).get('referral'); // Get the referral code from the URL
    if (referral) {
      setReferralCode(referral); // Store the referral code from the URL
    }
  }, []);

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    try {
      const tokenId = response.credential;
      const approvalState = "approved";

      const config = {
        method: "POST",
        url: `${serverURL}/users/google-auth`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": `application/json`,
        },
        data: {
          tokenId: tokenId,
          approval_state: approvalState,
        },
      };

      const res = await axios(config);

      if (res.status === 200) {
        const { token, user } = res.data;
        toast.success("Google Authentication Successful!");
        localStorage.setItem("token", token);
        window.location.href = user.type === "admin" ? "/admin" : "/";
      } else {
        throw new Error("Failed to authenticate with the server");
      }
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error("Google authentication failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In was unsuccessful. Please try again.");
  };

  const sendVerificationCode = async () => {
    setLoading(true);
    if (email === "") {
      toast.error("Please enter your email!");
      setLoading(false);
      return;
    }

    const config = {
      method: "POST",
      url: `${serverURL}/users/send-verification-code`,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        "email": email
      }
    };

    axios(config)
      .then((response) => {
        toast.success("Verification Code Sent!");
        setVerificationCodeSent(true);
        setLoading(false);
        setFormStep(2);
      })
      .catch((error) => {
        toast.error("Something went wrong! Please try again later.");
        setLoading(false);
      });
  };

  const verifyEmail = async () => {
    if (name === "" || password === "" || verificationCode === "") {
      toast.error("Please fill out all fields!");
      return;
    }

    const config = {
      method: "POST",
      url: `${serverURL}/users/verify-email`,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        "email": email,
        "code": verificationCode,
      }
    };

    axios(config)
      .then((response) => {
        toast.success("Email verified!");
        signup();
      })
      .catch((error) => {
        toast.error("Something went wrong! Please try again later.");
      });
  };

  const signup = async () => {
    const config = {
      method: "POST",
      url: `${serverURL}/users/signup`,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        "name": name,
        "email": email,
        "password": password,
        "referralCode": referralCode // Pass the referral code if available
      }
    };

    axios(config)
      .then((response) => {
        toast.success("Account created!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      {showLoginForm ? (
        <LoginComponent onClose={() => setShowLoginForm(false)} />
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            {formStep === 1 && (
              <>
                <p className="font-semibold text-xl mb-4 text-gray-700">Enter your personal or work email</p>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-4"
                  placeholder="Enter your email"
                  type="email"
                  onChange={(x) => setEmail(x.target.value)}
                  value={email}
                />
                <button
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg transition-all duration-300 mb-4 relative overflow-hidden group"
                  onClick={() => {
                    if (loading) return;
                    if (!verificationCodeSent) {
                      sendVerificationCode();
                    }
                  }}
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">
                    {loading ? <span className="loading loading-spinner"></span> : "Continue with email"}
                  </span>
                </button>
                
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-600">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="flex justify-center">
                  <GoogleOAuthProvider clientId="602949390183-rkkfk6dmhq54h4unrg8e727mqvi00i1h.apps.googleusercontent.com">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      size='large'
                      ux_mode='popup'
                      theme="filled_blue"
                      shape='pill'
                      locale='english'
                      text='continue_with'
                    />
                  </GoogleOAuthProvider>
                </div>
              </>
            )}
            {formStep === 2 && (
              <>
                <p className="text-sm font-medium text-gray-700 mb-2">Full Name</p>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-4"
                  placeholder="Full Name"
                  type="text"
                  onChange={(x) => setName(x.target.value)}
                  value={name}
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-200" onClick={() => setFormStep(3)}>
                  Next
                </button>
              </>
            )}
            {formStep === 3 && (
              <>
                <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-4"
                  placeholder="Password"
                  type="password"
                  onChange={(x) => setPassword(x.target.value)}
                  value={password}
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-200" onClick={() => setFormStep(4)}>
                  Next
                </button>
              </>
            )}

            {formStep === 4 && (
              <>
                <p className="text-sm font-medium text-gray-700 mb-2">Verification Code</p>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-4"
                  placeholder="Verification Code"
                  type="text"
                  onChange={(x) => setVerificationCode(x.target.value)}
                  value={verificationCode}
                />
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all duration-200" onClick={verifyEmail}>
                  Create Account
                </button>
              </>
            )}
            <p className="mt-8 text-center text-gray-600">
              Have an account?{" "}
              <span
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                onClick={() => setShowLoginForm(true)}
              >
                Log in
              </span>
            </p>
          </div>
          <style jsx>{`
            @keyframes rgb-animation {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            
            button {
              background-size: 200% 200%;
              animation: rgb-animation 5s ease infinite;
            }
          `}</style>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
