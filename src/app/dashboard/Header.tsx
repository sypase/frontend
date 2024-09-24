// components/Header.tsx

import Link from "next/link";
import { FiUser, FiLogOut, FiShoppingCart } from "react-icons/fi";

interface HeaderProps {
  isLoggedIn: boolean;
  user: any;
  rewriteCount: number;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, user, rewriteCount, showDropdown, setShowDropdown }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">NoaiGPT</h1>
        <div className="flex items-center space-x-4">
          {!isLoggedIn && (
            <Link
              href="/pricing"
              className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Pricing
            </Link>
          )}
          {isLoggedIn && (
            <div className="relative">
              <button
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 dropdown-button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user?.name}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg dropdown-menu">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiUser className="inline mr-2" /> Profile
                  </Link>
                  <Link
                    href="/shop"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiShoppingCart className="inline mr-2" /> Shop
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;