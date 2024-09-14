"use client";

import axios from "axios";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { appName, serverURL } from "@/utils/utils";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiUser, FiLogOut, FiShoppingCart } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import MessageComponent from "./MessageComponent";
import Footer from "./Footer";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  versions?: { text: string; confidence: number }[];
  currentVersionIndex?: number;
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
  const [tone, setTone] = useState<number>(0);
  const [rewrites, setRewrites] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // Add this line
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false); // Ensure state is managed like this

  const toggleAdvancedMode = () => {
    setIsAdvancedMode((prevMode) => !prevMode); // Toggle the state
  };

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
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, newMessage]);

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
      },
    };

    axios(config)
      .then((response) => {
        console.log(response);

        setLoading(false);
        const botMessage: Message = {
          id: newMessage.id + 1,
          sender: "bot",
          text: response.data.output,
          versions: [{ text: response.data.output, confidence: 0.95 }],
          currentVersionIndex: 0,
        };
        setMessages((prev) => [...prev, botMessage]);
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
  }, []);

  const countWords = (text: string) => {
    // Implement your logic to count words here
    return 0; // Replace 0 with the actual word count
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
    setWordCount(countWords(event.target.value));
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

  const changeVersion = (messageId: number, variantIndex: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (
          msg.id === messageId &&
          msg.versions &&
          msg.currentVersionIndex !== undefined
        ) {
          return {
            ...msg,
            text: msg.versions[variantIndex].text,
            currentVersionIndex: variantIndex,
          };
        }
        return msg;
      })
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen w-screen font-sans relative overflow-hidden">
      <animated.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(45deg, #ffffff, #f9fafb, #f3f4f6, #ffffff)",
          backgroundSize: "400% 400%",
        }}
      />
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

      <main className="flex-grow mt-16 mb-24 px-4 overflow-hidden relative z-10">
        <animated.div style={fadeIn} className="max-w-2xl mx-auto">
          {showLanding && (
            <div className="text-center py-8">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Welcome to NoaiGPT
              </h2>
              <p className="text-lg mb-8 text-gray-700">
                NoaiGPT converts AI-generated content into natural, human-like
                writing that bypasses AI detection.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((message) => (
              <MessageComponent
                key={message.id}
                message={message}
                copyToClipboard={copyToClipboard}
                redoMessage={redoMessage}
                onVariantChange={changeVersion}
              />
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
