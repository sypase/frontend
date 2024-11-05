"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { serverURL } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import {
  FiUser,
  FiLogOut,
  FiShoppingCart,
  FiCopy,
  FiRefreshCw,
} from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { quantum } from "ldrs";
import { jelly } from "ldrs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MultiStepLoader } from "../../components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, LogOut } from "lucide-react";
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

// Register the ScrollToPlugin with GSAP
gsap.registerPlugin(ScrollToPlugin);

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  originalInput?: string;
  variants?: { text: string; score: number }[];
  variantIndex: number;
}

const loadingStates = [
  { text: "Received AI Text" },
  { text: "Removing AI" },
  { text: "Generating Variants" },
  { text: "Checking AI" },
  { text: "Fixing Grammar" },
  { text: "Polishing Responses" },
  { text: "Final Review Complete" },
];

const TypewriterEffect: React.FC<{ messages: string[] }> = ({ messages }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);

  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      setIsTyping(false);
      return;
    }

    const currentMessage = messages[currentMessageIndex];
    if (currentText.length < currentMessage.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentMessage.slice(0, currentText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, currentMessage]);
        setCurrentMessageIndex(currentMessageIndex + 1);
        setCurrentText("");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentMessageIndex, messages]);

  return (
    <div className="text-gray-400">
      {displayedMessages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
      <p>{currentText}</p>
      {isTyping && <span className="animate-pulse">|</span>}
    </div>
  );
};

const aiDetectors = [
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

interface HeaderProps {
  isLoggedIn: boolean;
  user?: {
    name: string;
    email: string;
    credits: number;
    dailyFreeWords: number;
    referralCode: string;
  };
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        className={`fixed left-0 right-0 z-40 bg-neutral-950 bg-opacity-50 backdrop-blur-lg border-b border-neutral-800 ${
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
            {isLoggedIn && user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="px-4 py-1.5 text-sm font-medium text-black bg-white border border-transparent rounded hover:bg-neutral-200 transition-all duration-300"
                >
                  {user.name || "Dashboard"}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-neutral-950 bg-black bg-opacity-80 rounded-md shadow-lg">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-neutral-400">
                        My Account
                      </div>
                      <div className="border-t border-neutral-800"></div>
                      <button
                        onClick={() => (window.location.href = "/profile")}
                        className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                      >
                        <FiUser className="inline-block mr-2" /> Profile
                      </button>
                      <div className="border-t border-neutral-800"></div>
                      <div className="px-4 py-2 text-sm text-neutral-300">
                        Credits: {user.credits}
                      </div>
                      <div className="px-4 py-2 text-sm text-neutral-300">
                        Daily Free: {user.dailyFreeWords}
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

export default function Home() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<any>({});
  const [wordCount, setWordCount] = useState<number>(0);
  const [rewriteCount, setRewriteCount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const outputContainerRef = useRef<HTMLTextAreaElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!loading) {
      const savedMessages = localStorage.getItem("messageHistory");
      const existingMessages = savedMessages ? JSON.parse(savedMessages) : [];
      const combinedMessages = [...existingMessages, ...messages];
      localStorage.setItem("messageHistory", JSON.stringify(combinedMessages));
    }
  }, [messages, loading]);

  const getRewrites = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/bypass/rewrites`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await axios(config);
      setRewriteCount(response.data.rewrites);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const getUser = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/users`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const rewrite = async () => {
    if (text.length < 3 || loading) return;

    setLoading(true);
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text,
      variantIndex: 0,
    };
    setMessages((prev) => [...prev, newMessage]);
    setText("");

    if (inputContainerRef.current) {
      const messageElement = inputContainerRef.current.lastElementChild;
      if (messageElement) {
        gsap.fromTo(
          messageElement,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );
      }
    }

    const config = {
      method: "POST",
      url: `${serverURL}/bypass/rewrite`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        text,
        tone: 0,
      },
    };

    try {
      const response = await axios(config);

      console.log(response.data);

      const variants = response.data.variants.map((variant: any) => ({
        text: variant.text,
        score: variant.score,
      }));

      const botMessage: Message = {
        id: response.data.messageId,
        sender: "bot",
        text: variants.length > 0 ? variants[0].text : response.data.output,
        variants,
        variantIndex: 0,
        originalInput: text,
      };

      setMessages((prev) => [...prev, botMessage]);

      await getRewrites();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    getRewrites();
  }, []);

  useEffect(() => {
    getRewrites();
  }, [messages]);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
    setWordCount(event.target.value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      rewrite();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#272727",
            color: "#fff",
            borderRadius: "8px",
          },
        });
            },
            (err) => {
        toast.error("Failed to copy text.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#272727",
            color: "#fff",
            borderRadius: "8px",
          },
        });
      }
    );
  };

  const redoMessage = (originalInput: string) => {
    setText(originalInput);
    textareaRef.current?.focus();
  };

  const welcomeMessages = [
    "Hello, Welcome to NoaiGPT!",
    "Paste the text and Start Humanizing Content",
    "Bypass Turnitin, Zerogpt, GptZero etc",
    "Stay Unique, Stay Undetectable.",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      quantum.register();
      jelly.register();
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Header isLoggedIn={isLoggedIn} user={user} rewriteCount={rewriteCount} />

      <main
        className="flex-grow flex px-4 py-2 overflow-hidden mt-20 pt-16"
        style={{ height: "calc(100vh - 112px)" }}
      >
        <div className="max-w-7xl w-full mx-auto flex space-x-4">
          {/* Left side - Input messages */}
          <div className="flex flex-col w-[45%] rounded-lg bg-black shadow-md border border-gray-800">
            <div
              ref={inputContainerRef}
              className="flex-grow overflow-y-auto p-4"
            >
              {messages.length === 0 && text.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <l-jelly size="40" speed="0.9" color="#4B5563"></l-jelly>
                  <p className="mt-4 text-gray-400">Waiting for input...</p>
                </div>
              ) : (
                messages
                  .filter((m) => m.sender === "user")
                  .map((message, index, array) => (
                    <div
                      key={message.id}
                      ref={index === array.length - 1 ? latestMessageRef : null}
                      className="p-3 rounded-lg bg-gray-900 shadow-sm mb-3"
                    >
                      <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>
                  ))
              )}
            </div>
            <div className="p-4 border-t border-gray-800">
              <Footer
                text={text}
                setText={setText}
                wordCount={wordCount}
                loading={loading}
                sendMessage={rewrite}
                handleTextAreaChange={handleTextAreaChange}
                handleKeyDown={handleKeyDown}
                textareaRef={textareaRef}
              />
            </div>
          </div>

          {/* Right side - Output messages */}
          <div className="w-[55%] rounded-lg shadow-md border border-gray-800">
            <div className="h-full flex flex-col">
              <div className="flex-grow p-4  relative">
                {loading ? (
                  <div className="absolute inset-0">
                    <MultiStepLoader
                      loadingStates={loadingStates}
                      loading={loading}
                      duration={2000}
                    />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <TypewriterEffect messages={welcomeMessages} />
                  </div>
                ) : (
                  <textarea
                    ref={outputContainerRef}
                    className="w-full h-full resize-none text-sm text-gray-300 leading-relaxed focus:outline-none bg-black"
                    value={messages[messages.length - 1].text}
                    readOnly
                  />
                )}
              </div>
              {messages.length > 0 &&
                messages[messages.length - 1].variants && (
                  <div className="p-4 border-t border-gray-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-400">
                        Human
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50"
                        onClick={() => {
                          const lastMessage = messages[messages.length - 1];
                          const newIndex =
                            (lastMessage.variantIndex -
                              1 +
                              lastMessage.variants!.length) %
                            lastMessage.variants!.length;
                          setMessages((prev) => {
                            const newMessages = [...prev];
                            newMessages[newMessages.length - 1] = {
                              ...lastMessage,
                              text: lastMessage.variants![newIndex].text,
                              variantIndex: newIndex,
                            };
                            return newMessages;
                          });
                        }}
                        disabled={
                          messages[messages.length - 1].variantIndex === 0
                        }
                      >
                        &lt;
                      </button>
                      <span className="text-gray-400">
                        Variant {messages[messages.length - 1].variantIndex + 1}{" "}
                        / {messages[messages.length - 1].variants!.length}
                      </span>
                      <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50"
                        onClick={() => {
                          const lastMessage = messages[messages.length - 1];
                          const newIndex =
                            (lastMessage.variantIndex + 1) %
                            lastMessage.variants!.length;
                          setMessages((prev) => {
                            const newMessages = [...prev];
                            newMessages[newMessages.length - 1] = {
                              ...lastMessage,
                              text: lastMessage.variants![newIndex].text,
                              variantIndex: newIndex,
                            };
                            return newMessages;
                          });
                        }}
                        disabled={
                          messages[messages.length - 1].variantIndex ===
                          messages[messages.length - 1].variants!.length - 1
                        }
                      >
                        &gt;
                      </button>
                      <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300"
                        onClick={() =>
                          copyToClipboard(messages[messages.length - 1].text)
                        }
                      >
                        Copy
                        <FiCopy className="inline ml-2" />
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
