"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { serverURL } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";

interface LoginComponentProps {
  onClose: () => void;
}

const LoginComponent = ({ onClose }: LoginComponentProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      window.location.href = "/chat";
    }
  }, []);

  const login = async () => {
    const config = {
      method: "POST",
      url: `${serverURL}/users/login`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        email: email,
        password: password,
      },
    };

    axios(config)
      .then((response) => {
        toast.success("Logged In!");
        localStorage.setItem("token", response.data.token);
        window.location.href =
          response.data.user.type === "admin" ? "/admin" : "/chat";
      })
      .catch((error) => {
        console.log(error);
        toast.error("Email or Password is wrong");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Log In</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <p className="font-semibold text-xl mb-4 text-gray-700">Enter your personal or work email</p>
        <input
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-4"
          placeholder="Enter your email"
          type="email"
          onChange={(x) => setEmail(x.target.value)}
          value={email}
        />
        <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
        <input
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-4"
          placeholder="Password"
          type="password"
          onChange={(x) => setPassword(x.target.value)}
          value={password}
        />
        <button
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg transition-all duration-300 mb-4 relative overflow-hidden group"
          onClick={() => login()}
        >
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10">Login</span>
        </button>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
              onClick={onClose}
            >
              Sign up
            </span>
          </p>
          <Link href="/forgotpassword" className="text-primary font-medium">
            Forgot Password?
          </Link>
        </div>
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
  );
};

export default LoginComponent;