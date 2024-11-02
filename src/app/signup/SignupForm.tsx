import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverURL } from "@/utils/utils";
import jwt from "jsonwebtoken";

import gsap from "gsap";

interface SignupFormProps {
  onClose: () => void;
}

export default function SignupForm({ onClose }: SignupFormProps) {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const referral = new URLSearchParams(window.location.search).get(
      "referral"
    );
    if (referral) {
      setReferralCode(referral);
    }

    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    try {
      console.log(response);
      const tokenId = response.credential;

      // Decode the JWT token
      if (!tokenId) {
        throw new Error("Token ID is undefined");
      }

      const profileObj = jwt.decode(tokenId) as unknown as { picture: string };

      // Log the URL of the user's profile picture
      const profilePicture = profileObj?.picture;
      console.log("User Profile Picture:", profilePicture);

      const config = {
        method: "POST",
        url: `${serverURL}/users/google-auth`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: {
          tokenId: tokenId,
          approval_state: "approved",
          referralCode: referralCode,
        },
      };

      const res = await axios(config);

      console.log(res);

      if (res.status === 200) {
        const { token, user } = res.data;
        toast.success("Welcome to NoaiGPT! 🎉");
        localStorage.setItem("token", token);
        window.location.href = user.type === "admin" ? "/admin" : "/";
      } else {
        throw new Error("Failed to authenticate with the server");
      }
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  const handleGoogleError = () => {
    toast.error("Unable to sign in with Google. Please try again.");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div
        ref={formRef}
        className="bg-neutral-900 backdrop-blur-lg rounded-3xl max-w-2xl w-full shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/20"
      >
        {/* Left Section */}
        <div className="md:w-7/12 p-8 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5">
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NoaiGPT
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                AI writing, reimagined
              </p>
            </div>

            <div className="space-y-3">
              <div className="group bg-white/40 p-3.5 rounded-xl backdrop-blur-sm border border-white/60 shadow-sm hover:bg-white/60 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg shrink-0 group-hover:scale-95 transition-transform duration-300">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      1000 Free Words Daily
                    </h3>
                    <p className="text-xs text-gray-500">
                      Fresh credits every day
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/40 p-3.5 rounded-xl backdrop-blur-sm border border-white/60 shadow-sm hover:bg-white/60 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-lg shrink-0 group-hover:scale-95 transition-transform duration-300">
                    <svg
                      className="w-4 h-4 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      Refer & Earn +500
                    </h3>
                    <p className="text-xs text-gray-500">
                      Bonus words per referral
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/40 p-3.5 rounded-xl backdrop-blur-sm border border-white/60 shadow-sm hover:bg-white/60 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg shrink-0 group-hover:scale-95 transition-transform duration-300">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      Undetectable AI
                    </h3>
                    <p className="text-xs text-gray-500">
                      100% human-like content
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* New tagline */}
            <div className="mt-6 text-center">
              <h4 className="text-lg font-semibold text-gray-800">
                Stay unique, stay undetectable
              </h4>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-5/12 p-8 bg-white/60 backdrop-blur-sm flex flex-col justify-center items-center">
          <div className="w-full max-w-sm space-y-6">
            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-semibold text-gray-800">
                Get Started
              </h3>
              <p className="text-xs text-gray-500">
                Join in seconds • No credit card needed
              </p>
            </div>

            <div className="space-y-4">
              <GoogleOAuthProvider clientId="602949390183-1s1u35436p3samriicqmk0hjt9ffufeo.apps.googleusercontent.com">
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    size="large"
                    theme="filled_blue"
                    shape="pill"
                    locale="english"
                    text="continue_with"
                  />
                </div>
              </GoogleOAuthProvider>

              <div className="text-xs text-gray-400 text-center px-6">
                By continuing, you agree to our{" "}
                <a
                  href="/assets/Privacy%20Policy%20for%20NoaiGPT%20-%20TermsFeed.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/assets/terms-of-service.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
