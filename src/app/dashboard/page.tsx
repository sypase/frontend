"use client";

import axios from "axios";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { serverURL } from "@/utils/utils";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiUser, FiLogOut, FiShoppingCart, FiCopy, FiRefreshCw, FiArrowRight } from "react-icons/fi";
import Footer from "./Footer";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  originalInput?: string;
  variants?: { text: string; score: number }[];
  variantIndex?: number;
}

const Header: React.FC<{
  isLoggedIn: boolean;
  user: any;
  rewriteCount: number;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
}> = ({ isLoggedIn, user, rewriteCount, showDropdown, setShowDropdown }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">NoaiGPT</h1>
        <div className="flex items-center space-x-4">
          {!isLoggedIn && (
            <Link href="/pricing" className="px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-all duration-300">
              Pricing
            </Link>
          )}
          {isLoggedIn && (
            <div className="relative">
              <button
                className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all duration-300"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user?.name}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
                    <FiUser className="inline mr-2" /> Profile
                  </Link>
                  <Link href="/shop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
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

const MessageComponent: React.FC<{
  message: Message;
  copyToClipboard: (text: string) => void;
  redoMessage: (originalInput: string) => void;
  onVariantChange: (messageId: number, variantIndex: number) => void;
}> = ({ message, copyToClipboard, redoMessage, onVariantChange }) => {
  const [localVariantIndex, setLocalVariantIndex] = useState<number>(message.variantIndex || 0);

  const handleVariantChange = (index: number) => {
    setLocalVariantIndex(index);
    onVariantChange(message.id, index);
  };

  return (
    <div className={`p-6 rounded-lg ${message.sender === "user" ? "bg-indigo-50" : "bg-white"} shadow-md transition-all duration-300 hover:shadow-lg`}>
      <p className="text-sm text-gray-800 mb-4 leading-relaxed">{message.variants?.[localVariantIndex]?.text || message.text}</p>
      {message.sender === "bot" && message.variants && message.variants.length > 0 && (
        <div className="flex justify-between items-center text-xs mt-4">
          <div className="flex space-x-4">
            <button onClick={() => redoMessage(message.originalInput || "")} className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center">
              <FiRefreshCw className="mr-1" /> Redo
            </button>
            <button onClick={() => copyToClipboard(message.variants?.[localVariantIndex]?.text || "")} className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center">
              <FiCopy className="mr-1" /> Copy
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => handleVariantChange((localVariantIndex - 1 + message.variants!.length) % message.variants!.length)} className="text-indigo-500 hover:text-indigo-700 p-1">←</button>
            <span className="text-indigo-500 font-medium">{localVariantIndex + 1}/{message.variants.length}</span>
            <button onClick={() => handleVariantChange((localVariantIndex + 1) % message.variants!.length)} className="text-indigo-500 hover:text-indigo-700 p-1">→</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<any>({});
  const [wordCount, setWordCount] = useState<number>(0);
  const [rewriteCount, setRewriteCount] = useState<number>(-1);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

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
    };
    setMessages((prev) => [...prev, newMessage]);

    const config = {
      method: "POST",
      url: `${serverURL}/free/bypass`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        text: text,
        tone: 0, // Assuming default tone
      },
    };

    try {
      const response = await axios(config);
      const botMessage: Message = {
        id: newMessage.id + 1,
        sender: "bot",
        text: response.data.output,
        variants: [{ text: response.data.output, score: 95 }],
        variantIndex: 0,
        originalInput: text,
      };
      setMessages((prev) => [...prev, botMessage]);
      getRewrites();
      setText("");
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

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setWordCount(event.target.value.trim().split(/\s+/).length);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      rewrite();
    }
  };

  const toggleAdvancedMode = () => {
    setIsAdvancedMode(prev => !prev);
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

  const changeVersion = (messageId: number, variantIndex: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === messageId && msg.variants) {
          return {
            ...msg,
            variantIndex: variantIndex,
          };
        }
        return msg;
      })
    );
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      <Header 
        isLoggedIn={isLoggedIn}
        user={user}
        rewriteCount={rewriteCount}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />

      <main className="flex-grow mt-20 mb-24 px-8">
        <div className="max-w-7xl mx-auto flex space-x-12">
          {/* Left side - Input messages */}
          <div className="w-1/2 space-y-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Input</h2>
            <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-4">
              {messages.filter(m => m.sender === "user").map((message) => (
                <MessageComponent
                  key={message.id}
                  message={message}
                  copyToClipboard={copyToClipboard}
                  redoMessage={redoMessage}
                  onVariantChange={changeVersion}
                />
              ))}
            </div>
          </div>
          
          {/* Right side - Output messages */}
          <div className="w-1/2 space-y-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Output</h2>
            <div className="space-y-6">
              {messages.filter(m => m.sender === "bot").slice(-1).map((message) => (
                <MessageComponent
                  key={message.id}
                  message={message}
                  copyToClipboard={copyToClipboard}
                  redoMessage={redoMessage}
                  onVariantChange={changeVersion}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer
        text={text}
        setText={setText}
        wordCount={wordCount}
        loading={loading}
        sendMessage={rewrite}
        handleTextAreaChange={handleTextAreaChange}
        handleKeyDown={handleKeyDown}
        textareaRef={textareaRef}
        isAdvancedMode={isAdvancedMode}
        toggleAdvancedMode={toggleAdvancedMode}
      />

      <ToastContainer position="bottom-right" />
    </div>
  );
}