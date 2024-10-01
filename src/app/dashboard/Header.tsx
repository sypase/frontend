// components/Header.tsx

import Link from "next/link";
import { FiUser, FiLogOut, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  user: any; // You can specify a more detailed type for user if needed
  rewriteCount: number;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, user, rewriteCount }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // Adjust the delay as needed
    setDropdownTimeout(timeout);
  };

  return (
    <header className="bg-transparent backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="/assets/logo.svg" alt="NoaiGPT Logo" className="h-8 w-auto" />
          <span className="text-gray-800 text-xl font-bold ml-2">Beta</span>
        </Link>

        <div className="flex items-center space-x-6 relative">
          {/* Navigation Links */}
          <Link href="/blog" className="text-gray-800 hover:text-blue-600 transition-all duration-300">Blog</Link>
          <Link href="/ai-detector" className="text-gray-800 hover:text-blue-600 transition-all duration-300">AI Detector</Link>
          <Link href="/earn" className="text-gray-800 hover:text-blue-600 transition-all duration-300">Earn</Link>

          {/* Discord Icon */}
          <a href="https://discord.com/invite/your_invite_link" target="_blank" rel="noopener noreferrer" className="flex items-center">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/006/892/625/non_2x/discord-logo-icon-editorial-free-vector.jpg" 
              alt="Discord Logo" 
              className="h-6 w-6 hover:opacity-80 transition-opacity duration-300"
            />
          </a>

          {isLoggedIn && (
            <div 
              className="relative" 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center px-3 py-1.5 text-sm font-medium text-black bg-white border border-black rounded hover:bg-gray-100 transition-all duration-300"
              >
                {user?.name}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 flex items-center transition-all duration-200"
                  >
                    <FiUser className="inline mr-2" /> Profile
                  </Link>
                  <Link
                    href="/shop"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 flex items-center transition-all duration-200"
                  >
                    <FiShoppingCart className="inline mr-2" /> Shop
                  </Link>
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Credits: {rewriteCount}
                  </div>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-all duration-200"
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