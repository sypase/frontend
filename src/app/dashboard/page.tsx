"use client";

import axios from "axios";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { serverURL } from "@/utils/utils";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  FiUser,
  FiLogOut,
  FiShoppingCart,
  FiCopy,
  FiRefreshCw,
} from "react-icons/fi";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { quantum } from "ldrs";
import { jelly } from "ldrs";

// Register the ScrollToPlugin with GSAP
gsap.registerPlugin(ScrollToPlugin);

// Register quantum loader
quantum.register();

// Register jelly loader
jelly.register();

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  originalInput?: string;
  variants?: { text: string; score: number }[];
  variantIndex: number;
}

const Header: React.FC<{
  isLoggedIn: boolean;
  user: any;
  rewriteCount: number;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
}> = ({ isLoggedIn, user, rewriteCount, showDropdown, setShowDropdown }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">NoaiGPT</h1>
        <div className="flex items-center space-x-4">
          {!isLoggedIn && (
            <Link
              href="/pricing"
              className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-all duration-300 text-sm"
            >
              Pricing
            </Link>
          )}
          {isLoggedIn && (
            <div className="relative">
              <button
                className="px-4 py-1 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all duration-300 text-sm"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user?.name}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                  >
                    <FiUser className="inline mr-2" /> Profile
                  </Link>
                  <Link
                    href="/shop"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
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
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
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

export default function Home() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<any>({});
  const [wordCount, setWordCount] = useState<number>(0);
  const [rewriteCount, setRewriteCount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const outputContainerRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (inputContainerRef.current && outputContainerRef.current) {
      gsap.to(inputContainerRef.current, {
        duration: 0.5,
        scrollTo: { y: "max" },
        ease: "power3.out",
      });
      outputContainerRef.current.scrollTop =
        outputContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      url: `${serverURL}/free/bypass`,
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

      const variants = response.data.variants.map((variant: any) => ({
        text: variant.text,
        score: variant.score,
      }));

      const botMessage: Message = {
        id: newMessage.id + 1,
        sender: "bot",
        text: variants.length > 0 ? variants[0].text : response.data.output,
        variants,
        variantIndex: 0,
        originalInput: text,
      };

      setMessages((prev) => [...prev, botMessage]);

      getRewrites();
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
        toast.success("Copied to clipboard!");
      },
      (err) => {
        toast.error("Failed to copy text.");
      }
    );
  };

  const redoMessage = (originalInput: string) => {
    setText(originalInput);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br">
      {/* <Header
        isLoggedIn={isLoggedIn}
        user={user}
        rewriteCount={rewriteCount}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      /> */}

      <main className="flex-grow flex px-4 py-2 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto flex space-x-4">
          {/* Left side - Input messages */}
          <div className="flex flex-col w-[45%] rounded-lg bg-white shadow-md">
            <div
              ref={inputContainerRef}
              className="flex-grow overflow-y-auto p-4"
            >
              {messages.length === 0 && text.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <l-jelly size="40" speed="0.9" color="black"></l-jelly>
                  <p className="mt-4 text-gray-600">Waiting for input...</p>
                </div>
              ) : (
                messages
                  .filter((m) => m.sender === "user")
                  .map((message) => (
                    <div
                      key={message.id}
                      className="p-3 rounded-lg bg-indigo-50 shadow-sm mb-3"
                    >
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  ))
              )}
            </div>
            <div className="p-4 border-t">
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
          <div className="w-[55%] bg-white rounded-lg shadow-md p-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">No output yet...</p>
              </div>
            ) : (
              <textarea
                ref={outputContainerRef}
                className="w-full h-full resize-none text-sm text-gray-800 leading-relaxed overflow-y-auto focus:outline-none"
                value={messages[messages.length - 1].text}
                readOnly
              />
            )}
          </div>
        </div>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}