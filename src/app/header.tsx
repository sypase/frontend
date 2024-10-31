import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles } from "lucide-react";

interface HeaderProps {
  isLoggedIn: boolean;
  onShowSignupForm: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onShowSignupForm }) => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <>
      {showAnnouncement && (
        <div className="bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-700 text-white text-center py-2.5 px-4 fixed top-0 left-0 right-0 z-50 border-b border-gray-700">
          <div className="max-w-7xl mx-auto relative flex items-center justify-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="bg-gray-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full border border-gray-500">NEW</span>
              <Sparkles className="h-4 w-4 text-purple-400" />
              <p className="text-sm font-medium">
                <span className="font-semibold">NoaiGPT Model Update:</span>
                <span className="mx-1.5">Now with Enhanced Turnitin Compatibility</span>
                <span className="inline-flex items-center">
                  <Link href="/learn-more" className="inline-flex items-center ml-2 text-purple-400 hover:text-purple-500 font-medium group">
                    Learn more
                    <svg className="w-4 h-4 ml-0.5 transform transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </span>
              </p>
            </div>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="absolute right-0 p-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded-full transition-all duration-200"
              aria-label="Close announcement"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      <header 
        className={`fixed left-0 right-0 z-40 bg-neutral-900 bg-opacity-80 border-b border-gray-700 ${
          showAnnouncement ? 'top-10' : 'top-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight text-white">
              NoaiGPT
            </h1>
            <Badge variant="outline" className="ml-2 bg-gray-700 text-white">Beta</Badge>
          </Link>

          <div className="flex space-x-3">
            {!isLoggedIn && (
              <>
                <Link
                  href="/pricing"
                  className="px-4 py-1.5 text-sm font-medium text-gray-300 bg-transparent border border-gray-600 rounded hover:bg-gray-700 hover:text-white transition-all duration-300"
                >
                  Pricing
                </Link>
                <button
                  onClick={onShowSignupForm}
                  className="px-4 py-1.5 text-sm font-medium text-white bg-gray-800 border border-transparent rounded hover:bg-gray-700 transition-all duration-300"
                >
                  Try for Free
                </button>
              </>
            )}
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="px-4 py-1.5 text-sm font-medium text-white bg-gray-800 border border-transparent rounded hover:bg-gray-700 transition-all duration-300"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
