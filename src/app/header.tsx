// components/Header.tsx

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  onShowSignupForm: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onShowSignupForm }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto p-3 md:px-4 md:py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          {/* <img src="/assets/logo.svg" alt="NoaiGPT Logo" className="h-10 w-auto" /> */}
          <Image
            src="/assets/logo.svg"
            alt="NoaiGPT Logo"
            width={150}
            height={40}
            className="w-24 h-6 md:w-36 md:h-10"
          />
          Beta
        </Link>

        <div className="flex space-x-3">
          {!isLoggedIn && (
            <>
              <Link
                href="/pricing"
                className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
              >
                Pricing
              </Link>
              <button
                onClick={onShowSignupForm}
                className="px-4 py-1.5 text-sm font-medium text-white bg-gray-900 border border-transparent rounded hover:bg-gray-800 transition-all duration-300"
              >
                Try for Free
              </button>
            </>
          )}
          {isLoggedIn && (
            <Link
              href="/dashboard"
              className="p-[7px] text-xs font-medium text-white bg-gray-900 border border-transparent rounded hover:bg-gray-800 transition-all duration-300 md:px-4 md:py-1.5 md:text-sm"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
