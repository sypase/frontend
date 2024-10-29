import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, FileUser, LogOut, ShoppingCart } from "lucide-react";
import { FiUser } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  isLoggedIn: boolean;
  user?: any;
  rewriteCount?: number;
  onShowSignupForm?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  user,
  rewriteCount,
  onShowSignupForm,
}) => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <>
      {showAnnouncement && (
        <div className="bg-gradient-to-r from-[#ffaa40] to-[#9c40ff] text-white text-center py-1.5 px-3 fixed top-0 left-0 right-0 z-50 border-b border-[#ffaa40]">
          <div className="max-w-7xl mx-auto relative flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <span className="bg-[#ffaa40] text-white text-xs font-semibold px-2 py-0.5 rounded-full border border-[#ffaa40]">
                NEW
              </span>
              <Sparkles className="h-3 w-3 text-[#9c40ff]" />
              <p className="text-xs font-medium">
                <span className="font-semibold text-white">
                  NoaiGPT Model Update:
                </span>
                <span className="mx-1 text-white">
                  Now with Enhanced Turnitin Compatibility
                </span>
                <span className="inline-flex items-center">
                  <Link
                    href="/learn-more"
                    className="inline-flex items-center ml-2 text-white hover:text-[#ffaa40] font-medium group"
                  >
                    Learn more
                    <svg
                      className="w-3.5 h-3.5 ml-0.5 transform transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </span>
              </p>
            </div>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="absolute right-0 p-1 text-white hover:text-[#ffaa40] hover:bg-[#9c40ff] rounded-full transition-all duration-200"
              aria-label="Close announcement"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
      <header
        className={`fixed left-0 right-0 z-40 bg-gray-900 bg-opacity-50 backdrop-blur-lg border-b border-gray-800 ${
          showAnnouncement ? "top-10" : "top-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight text-white">
              NoaiGPT
            </h1>
            <Badge
              variant="outline"
              className="ml-2 text-gray-300 border-gray-600"
            >
              Beta
            </Badge>
          </Link>

          <div className="flex items-center space-x-3">
            <Link
              href="/pricing"
              className="px-4 py-1.5 text-sm font-medium text-gray-300 bg-transparent border border-gray-700 rounded hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              Pricing
            </Link>

            {!isLoggedIn && (
              <button
                onClick={onShowSignupForm}
                className="px-4 py-1.5 text-sm font-medium text-black bg-white border border-transparent rounded hover:bg-gray-200 transition-all duration-300"
              >
                Try for Free
              </button>
            )}
            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="px-4 py-1.5 text-sm font-medium text-black bg-white border border-transparent rounded hover:bg-gray-200 transition-all duration-300">
                    {user?.name || "Dashboard"}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-gray-800 rounded-md shadow-lg">
                  <DropdownMenuLabel className="text-gray-300">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link
                        href="/profile"
                        className="flex items-center text-gray-300 hover:text-white"
                      >
                        <FiUser className="mr-2" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/shop"
                        className="flex items-center text-gray-300 hover:text-white"
                      >
                        <ShoppingCart className="mr-2" /> Shop
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem>
                    <div className="px-4 py-2 text-sm text-gray-300">
                      Credits: {rewriteCount || 0}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                      }}
                      className="w-full text-left text-red-400 hover:bg-gray-700 flex items-center"
                    >
                      <LogOut className="mr-2" /> Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
