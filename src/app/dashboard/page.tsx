"use client";

import axios from "axios";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { appName, serverURL } from "@/utils/utils";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  FiUser,
  FiLogOut,
  FiCopy,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiShoppingCart,
  FiShoppingBag,
  FiPackage,
  FiChevronUp,
} from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";

type Mode = "General" | "University" | "Essay" | "Business" | "Creative";

interface Message {
  sender: "user" | "bot";
  text: string;
  versions?: { text: string; confidence: number }[];
  currentVersionIndex?: number;
}

function countWords(str: string) {
  if (str.trim().length === 0) return 0;
  return str.trim().split(/\s+/).length;
}

export default function Home() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<any>({});
  const [wordCount, setWordCount] = useState<number>(0);
  const [rewriteCount, setRewriteCount] = useState<number>(-1);
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [expirationDate, setExpirationDate] = useState<string | null>(null);
  const [tone, setTone] = useState<number>(0);
  const [rewrites, setRewrites] = useState<string[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  const [mode, setMode] = useState<Mode>("General");
  const [showModeDropup, setShowModeDropup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const modes: Mode[] = ["General", "University", "Essay", "Business", "Creative"];

  const getRewrites = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/rewordai/rewrites`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setRewriteCount(response.data.rewrites);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  const getExpirationDate = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/rewordai/userExpirationDate`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setExpirationDate(response.data.expirationDate);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  const getUser = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/users`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setUser(response.data.user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        toast.error("Something went wrong!");
      });
  };

  const rewrite = async () => {
    if (text.length < 3 || loading) return;

    setLoading(true);
    setShowLanding(false);
    setMessages(prev => [...prev, { sender: "user", text }]);
    
    const config = {
      method: "POST",
      url: `${serverURL}/rewordai/rewrite`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        text: text,
        tone: tone,
        mode: mode,
      },
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setRewrites([response.data.output]);
        setMessages(prev => [...prev, { 
          sender: "bot", 
          text: response.data.output,
          versions: [{ text: response.data.output, confidence: 0.95 }],
          currentVersionIndex: 0
        }]);
        getRewrites();
        setText("");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  useEffect(() => {
    getUser();
    getRewrites();
    getExpirationDate();
  }, []);

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setWordCount(countWords(event.target.value));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      rewrite();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    }, (err) => {
      toast.error("Failed to copy text.");
    });
  };

  const redoMessage = (originalInput: string) => {
    setText(originalInput);
    textareaRef.current?.focus();
  };

  const changeVersion = (messageIndex: number, direction: 'next' | 'prev') => {
    setMessages(prevMessages => prevMessages.map((msg, idx) => {
      if (idx === messageIndex && msg.versions && msg.currentVersionIndex !== undefined) {
        let newIndex = direction === 'next' 
          ? (msg.currentVersionIndex + 1) % msg.versions.length
          : (msg.currentVersionIndex - 1 + msg.versions.length) % msg.versions.length;
        return {
          ...msg,
          text: msg.versions[newIndex].text,
          currentVersionIndex: newIndex
        };
      }
      return msg;
    }));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 }
  });


  const backgroundAnimation = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 20000, loop: true },
    reset: true,
  });

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setShowModeDropup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showModeDropup && !(event.target as Element).closest('.mode-dropdown, .mode-button')) {
        setShowModeDropup(false);
      }
      if (showDropdown && !(event.target as Element).closest('.dropdown-menu, .dropdown-button')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModeDropup, showDropdown]);

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen w-screen font-sans relative overflow-hidden">
      <animated.div
        style={{
          ...backgroundAnimation,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, #ffffff, #f9fafb, #f3f4f6, #ffffff)',
          backgroundSize: '400% 400%',
        }}
      />
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">NoaiGPT</h1>
          <div className="flex items-center space-x-4">
            {!isLoggedIn && (
              <Link href="/pricing" className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105">
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
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FiUser className="inline mr-2" /> Profile
                    </Link>
                    <Link href="/shop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FiShoppingCart className="inline mr-2" /> Shop
                    </Link>
   
                    <div className="px-4 py-2 text-sm text-gray-700">
                      Credits: {rewriteCount}
                      <div className="relative w-full h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                          style={{ width: `${(rewriteCount / 100) * 100}%` }}
                        />
                      </div>
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

      <main className="flex-grow mt-16 mb-24 px-4 overflow-hidden relative z-10">
        <animated.div style={fadeIn} className="max-w-2xl mx-auto">
          {showLanding && (
            <div className="text-center py-8">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Welcome to NoaiGPT</h2>
              <p className="text-lg mb-8 text-gray-700">
                NoaiGPT converts AI-generated content into natural, human-like writing that bypasses AI detection.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg shadow-lg ${
                  message.sender === "user" 
                    ? "bg-blue-500 text-white ml-auto" 
                    : "bg-white text-gray-900"
                } max-w-[90%] transform hover:scale-105 transition-all duration-300`}
              >


                <p className="text-sm">{message.text}</p>
                {message.sender === "bot" && message.versions && (
                  <div className="mt-2 flex justify-between items-center text-sm">
                    <button onClick={() => changeVersion(index, 'prev')} className="text-blue-500">
                      <FiChevronLeft />
                    </button>
                    <span className="text-blue-500">
                      {`Human: ${(message.versions[message.currentVersionIndex || 0].confidence * 100).toFixed(2)}%`}
                    </span>
                    <button onClick={() => changeVersion(index, 'next')} className="text-blue-500">
                      <FiChevronRight />
                    </button>
                  </div>
                )}
                {message.sender === "bot" && (
                  <div className="mt-2 flex justify-end space-x-2">
                    <button onClick={() => copyToClipboard(message.text)} className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
                      <FiCopy size={14} />
                    </button>
                    <button onClick={() => redoMessage(message.text)} className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
                      <FiRefreshCw size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
            {loading && (
              <div className="p-4 rounded-lg bg-white max-w-[90%]">
                <Skeleton count={3} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </animated.div>
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-opacity-90 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <div className="relative mode-dropdown">
                <button 
                  onClick={() => setShowModeDropup(!showModeDropup)}
                  className="flex items-center space-x-1 bg-white rounded-lg px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 mode-button"
                >
                  <span>{mode}</span>
                  <FiChevronUp className={`transform transition-transform duration-200 ${showModeDropup ? 'rotate-180' : ''}`} />
                </button>
                {showModeDropup && (
                  <div className="absolute bottom-full left-0 mb-1 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                    {modes.map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          handleModeChange(m);
                          setShowModeDropup(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-end rounded-lg overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                 style={{
                   boxShadow: "0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2), 0 0 45px rgba(59, 130, 246, 0.1)"
                 }}>
              <textarea 
                ref={textareaRef}
                className="flex-1 p-3 bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-gray-900 placeholder-gray-500 max-h-40 overflow-y-auto"
                style={{ minHeight: '40px' }}
                value={text} 
                onChange={handleTextAreaChange}
                onKeyDown={handleKeyDown}
                placeholder={`Enter your AI-generated ${mode.toLowerCase()} text here...`} 
              />
              <button 
                className={`p-3 text-blue-500 hover:text-blue-600 focus:outline-none transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                onClick={rewrite}
                disabled={loading || text.trim().length < 3}
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FiArrowRight className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </footer>

      <ToastContainer position="bottom-right" />
    </div>
  );
}