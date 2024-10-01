"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverURL } from "@/utils/utils";
import gsap from "gsap";

interface SignupFormProps {
  onClose: () => void;
}

export default function SignupForm({ onClose }: SignupFormProps) {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const referral = new URLSearchParams(window.location.search).get(
      "referral"
    );
    if (referral) {
      setReferralCode(referral);
    }

    // GSAP animation
    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current.children,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 2,
          repeat: -1,
          repeatDelay: 2,
          duration: 1,
          ease: "power2.inOut",
        }
      );
    }
  }, []);

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    try {
      const tokenId = response.credential;
      const config = {
        method: "POST",
        url: `${serverURL}/users/google-auth`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": `application/json`,
        },
        data: {
          tokenId: tokenId,
          approval_state: "approved",
          "referralCode": referralCode // Pass the referral code if available
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-xl transform transition-all duration-300 ease-in-out flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 p-8 flex flex-col justify-center items-start text-left space-y-6 text-gray-800">
          <h2 className="text-4xl font-bold">Try for Free</h2>
          <div ref={carouselRef} className="text-lg space-y-4">
            <div>
              <h3 className="text-xl font-semibold">Try NoaiGPT for Free</h3>
              <p>*Enjoy free words on your first use.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Refer and Earn</h3>
              <p>*Get free words for each referral!</p>
            </div>
            <div>Stay Unique, Stay Undetectable.</div>
          </div>
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center items-center bg-gray-100">
          <GoogleOAuthProvider clientId="602949390183-1s1u35436p3samriicqmk0hjt9ffufeo.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              size="large"
              ux_mode="popup"
              theme="filled_blue"
              shape="pill"
              locale="english"
              text="continue_with"
            />
          </GoogleOAuthProvider>
          <div className="mt-8 text-sm text-gray-600 text-center">
            By signing up, you agree to our{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Terms and Conditions
            </a>
            .
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
