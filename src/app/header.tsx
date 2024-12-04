"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, FileUser, LogOut, ShoppingCart } from "lucide-react";
import { FiUser } from "react-icons/fi";
import { FiArchive, FiBook, FiBookOpen, FiDollarSign, FiGift, FiCrosshair } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { serverURL } from "@/utils/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  onShowSignupForm?: () => void;
}

interface User {
  name: string;
  email: string;
  credits: number;
  DailyFreeCredits: number;
  referralCode: string;
}

const aiDetectors: { title: string; href: string; description: string }[] = [
  {
    title: "Turnitin",
    href: "https://www.turnitin.com/",
    description:
      "Industry-standard plagiarism detection tool used by educational institutions.",
  },
  {
    title: "GPTZero",
    href: "https://gptzero.me/",
    description: "AI-powered tool designed to detect machine-generated text.",
  },
  {
    title: "ZeroGPT",
    href: "https://www.zerogpt.com/",
    description:
      "Open-source AI content detector for identifying AI-generated text.",
  },
  {
    title: "Crossplag",
    href: "https://crossplag.com/",
    description:
      "Cross-language plagiarism detection tool for academic and professional use.",
  },
  {
    title: "Undetectable.ai",
    href: "https://undetectable.ai/",
    description:
      "AI writing tool that claims to produce human-like text undetectable by AI detectors.",
  },
];

const Header: React.FC<HeaderProps> = ({ onShowSignupForm }) => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [rewriteCount, setRewriteCount] = useState<number>(-1);
  const [dailyFreeCredits, setDailyFreeWords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user has already closed the announcement in this session
    const announcementClosed = sessionStorage.getItem("announcementClosed");
    if (announcementClosed) {
      setShowAnnouncement(false);
    }
  }, []);

  const closeAnnouncement = () => {
    setShowAnnouncement(false);
    sessionStorage.setItem("announcementClosed", "true");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getRewrites = async () => {
    try {
      const response = await axios.get(`${serverURL}/bypass/rewrites`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRewriteCount(response.data.balance);
    } catch (error) {
      console.error("Error fetching rewrites:", error);
      toast.error("Failed to load rewrite count.");
    }
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const config = {
      method: "GET",
      url: `${serverURL}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios(config);
      setUser(response.data.user);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get<{ user: User }>(`${serverURL}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser(response.data.user);
      setLoading(false);
      setDailyFreeWords(response.data.user.DailyFreeCredits); // Set the dailyFreeWords directly here
      getRewrites();
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const toggleDropdown = () => {
    if (isLoggedIn) {
      getRewrites();
      fetchUserData();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <>
{showAnnouncement && (
  <div className="bg-gradient-to-r from-[#ffaa40] to-[#9c40ff] text-white text-center py-1.5 px-3 fixed top-0 left-0 right-0 z-50 border-b border-[#ffaa40] max-h-screen overflow-hidden">
    <div className="max-w-7xl mx-auto relative flex items-center justify-center gap-2">
      {isLoggedIn && (rewriteCount + dailyFreeCredits) < 80 ? (
        // Low Credit Announcement
        <div className="flex items-center gap-1">
          <span className="bg-[#ffaa40] text-white text-xs font-semibold px-2 py-0.5 rounded-full border border-[#ffaa40]">
            ALERT
          </span>
          <p className="text-xs font-medium">
            <span className="font-semibold text-white">Low Credit Count!</span>
            <span className="mx-1 text-white">Get more credits now to continue rewriting!</span>
            <span className="inline-flex items-center">
              <Link
                href="/pricing"
                className="inline-flex items-center ml-2 text-white hover:text-[#ffaa40] font-medium group"
              >
                Get Credits
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
      ) : (
        // Default Announcement
        <div className="flex items-center gap-1">
          <span className="bg-[#ffaa40] text-white text-xs font-semibold px-2 py-0.5 rounded-full border border-[#ffaa40]">
            NEW
          </span>
          <Sparkles className="h-3 w-3 text-[#9c40ff]" />
          <p className="text-xs font-medium">
            <span className="font-semibold text-white">NoaiGPT Model Update:</span>
            <span className="mx-1 text-white">Now with Enhanced Turnitin Compatibility</span>
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
      )}
      <button
        onClick={closeAnnouncement}
        className="absolute right-0 p-1 text-white hover:text-[#ffaa40] hover:bg-[#9c40ff] rounded-full transition-all duration-200"
        aria-label="Close announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  </div>
)}




<header
className={`fixed left-0 right-0 z-40 bg-neutral-950 bg-opacity-50 backdrop-blur-lg border-b border-neutral-800 ${
  showAnnouncement ? "top-9 sm:top-8" : "top-0"
}`}

>
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    <div className="flex flex-col md:flex-row items-start md:items-center">
      <Link href="/" className="flex items-center">
        <h1 className="text-xl font-bold tracking-tight text-white">
          NoaiGPT
            <Badge
              variant="outline"
              className="ml-2 text-neutral-300 border-neutral-600 hidden sm:inline-block"
            >
              Beta
            </Badge>
        </h1>
      </Link>
      <div className="ml-4 hidden items-center sm:inline-block">
      <span className="text-green-500 text-sm font-medium sm:block">
        Humanizer
      </span>
    </div>

    </div>

    <NavigationMenu className="ml-auto px-2 hidden sm:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-neutral-50 text-sm font-medium bg-transparent">
            AI Detector
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-neutral-800/50 to-neutral-800 p-6 no-underline outline-none focus:shadow-md"
                    href="/ai-detectors"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      AI Detectors
                    </div>
                    <p className="text-sm leading-tight text-neutral-400">
                      Compare various AI detection tools and see how they
                      perform.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              {aiDetectors.map((detector) => (
                <ListItem
                  key={detector.title}
                  href={detector.href}
                  title={detector.title}
                >
                  {detector.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <div className="flex items-center space-x-3">
      <Link
        href="/pricing"
        className="px-4 py-1.5 text-sm font-medium text-neutral-300 bg-transparent border border-neutral-700 rounded hover:bg-neutral-800 hover:text-neutral-50 transition-all duration-300  sm:block"
      >
        Pricing
      </Link>
      <Link
        href="/earn"
        className="px-4 py-1.5 text-sm font-medium text-neutral-300 bg-transparent border border-neutral-700 rounded hover:bg-neutral-800 hover:text-neutral-50 transition-all duration-300 hidden sm:block"
      >
        Earn
      </Link>
      <a
        href="https://discord.gg/EHyTgxm52E"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-neutral-200 transition-colors duration-200 hidden md:block"
      >
        <FaDiscord className="h-5 w-5" />
      </a>

      {!isLoggedIn && (
        <button
          onClick={onShowSignupForm}
          className="px-4 py-2 text-sm font-medium text-black bg-white border border-transparent rounded hover:bg-neutral-200 transition-all duration-300"
        >
          Try for Free
        </button>
      )}
      {isLoggedIn && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="px-4 py-2 text-sm font-medium text-black bg-white border border-transparent rounded hover:bg-neutral-200 transition-all duration-300"
          >
            {user?.name || "Dashboard"}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-black bg-opacity-80 rounded-md shadow-lg">
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-neutral-300">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs">{user?.email}</p>
                  <div className="my-1 text-sm text-neutral-400">
                    {dailyFreeCredits} Free Words Left
                  </div>
                  <div className="my-1 text-sm text-neutral-400 flex justify-between items-center">
                    <span>{rewriteCount || 0} Credits Left</span>
                    <button
                      onClick={() => (window.location.href = "/pricing")}
                      className="text-blue-500 hover:text-blue-700 text-sm border-2 border-blue-500 rounded px-3 py-1"
                    >
                      Get More
                    </button>
                  </div>
                </div>
                <div className="border-t border-neutral-800"></div>
                <button
                  onClick={() => (window.location.href = "/profile")}
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                >
                  <FiUser className="inline-block mr-2" /> Profile
                </button>
                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                >
                  <FiBook className="inline-block mr-2" /> Dashboard
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "/dashboard/history")
                  }
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                >
                  <FiArchive className="inline-block mr-2" /> History
                </button>
                {/*<button
                  onClick={() =>
                    (window.location.href = "/pricing")
                  }
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 sm:hidden"
                >
                  <FiDollarSign className="inline-block mr-2" /> Pricing
                </button>*/}
                <button
                  onClick={() =>
                    (window.location.href = "/earn")
                  }
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 sm:hidden"
                >
                  <FiGift className="inline-block mr-2" /> Earn Credits
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "/ai-detectors")
                  }
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 sm:hidden"
                >
                <FiCrosshair className="inline-block mr-2" /> AI Detectors
                </button>
              </div>
              <div className="border-t border-neutral-700">
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-neutral-800"
                >
                  <LogOut className="inline-block mr-2" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
</header>


    </>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-gradient-to-b from-neutral-800/50 to-neutral-800 hover:text-neutral-50 focus:bg-neutral-700 focus:text-neutral-50",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-neutral-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
