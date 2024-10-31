"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, FileUser, LogOut, ShoppingCart } from "lucide-react";
import { FiUser } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { cn } from "@/lib/utils";
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
  isLoggedIn: boolean;
  user?: any;
  rewriteCount?: number;
  onShowSignupForm?: () => void;
}

const aiDetectors: { title: string; href: string; description: string }[] = [
  {
    title: "Turnitin",
    href: "/turnitin",
    description:
      "Industry-standard plagiarism detection tool used by educational institutions.",
  },
  {
    title: "GPTZero",
    href: "/gptzero",
    description: "AI-powered tool designed to detect machine-generated text.",
  },
  {
    title: "ZeroGPT",
    href: "/zerogpt",
    description:
      "Open-source AI content detector for identifying AI-generated text.",
  },
  {
    title: "Crossplag",
    href: "/crossplag",
    description:
      "Cross-language plagiarism detection tool for academic and professional use.",
  },
  {
    title: "Undetectable.ai",
    href: "/undetectable-ai",
    description:
      "AI writing tool that claims to produce human-like text undetectable by AI detectors.",
  },
];

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  user,
  rewriteCount,
  onShowSignupForm,
}) => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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
        className={`fixed left-0 right-0 z-40 bg-neutral-950 bg-opacity-50 backdrop-blur-lg border-b border-neutral-800  ${
          showAnnouncement ? "top-10" : "top-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
              NoaiGPT
              <Badge
                variant="outline"
                className="ml-2 text-neutral-300 border-neutral-600"
              >
                Beta
              </Badge>
            </h1>
            <div className="ml-4 flex items-center">
              <span className="text-green-500 text-sm font-medium">
                Humanizer
              </span>
              <span className="mx-2 text-neutral-500">|</span>
              <NavigationMenu>
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
                                Compare various AI detection tools and see how
                                they perform.
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
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <Link
              href="/pricing"
              className="px-4 py-1.5 text-sm font-medium text-neutral-300 bg-transparent border border-neutral-700 rounded hover:bg-neutral-800 hover:text-neutral-50 transition-all duration-300"
            >
              Pricing
            </Link>
            <Link
              href="/earn"
              className="px-4 py-1.5 text-sm font-medium text-neutral-300 bg-transparent border border-neutral-700 rounded hover:bg-neutral-800 hover:text-neutral-50 transition-all duration-300"
            >
              Earn
            </Link>
            <a
              href="https://discord.gg/your-discord-invite-link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-neutral-200 transition-colors duration-200"
            >
              <FaDiscord className="h-5 w-5" />
            </a>

            {!isLoggedIn && (
              <button
                onClick={onShowSignupForm}
                className="px-4 py-1.5 text-sm font-medium text-black bg-white border border-transparent rounded hover:bg-neutral-200 transition-all duration-300"
              >
                Try for Free
              </button>
            )}
            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="px-4 py-1.5 text-sm font-medium text-black bg-white border border-transparent rounded hover:bg-neutral-200 transition-all duration-300"
                >
                  {user?.name || "Dashboard"}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-neutral-950 bg-black bg-opacity-80 rounded-md shadow-lg">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-neutral-400">My Account</div>
                      <div className="border-t border-neutral-800"></div>
                      <button
                        onClick={() => (window.location.href = "/profile")}
                        className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                      >
                        <FiUser className="inline-block mr-2" /> Profile
                      </button>
                      <div className="border-t border-neutral-800"></div>
                      <div className="px-4 py-2 text-sm text-neutral-300">
                        Credits: {rewriteCount || 0}
                      </div>
                      <div className="px-4 py-2 text-sm text-neutral-300">
                        Daily Free: {rewriteCount || 0}
                      </div>
                      <div className="border-t border-neutral-800"></div>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 focus:text-neutral-50",
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