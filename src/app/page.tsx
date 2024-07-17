

"use client";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { serverURL } from "@/utils/utils";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiMoon, FiSun, FiArrowRight, FiChevronLeft, FiChevronRight, FiCopy, FiRefreshCw } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";

function countWords(str: string) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

interface Message {
  text: string;
  sender: string;
  originalInput?: string;
  versions?: { text: string; confidence: number }[];
  currentVersionIndex?: number;
}

const exampleTexts = [
  {
    ai: "Artificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines. It has become an essential part of the technology industry.",
    human: "AI isn't just a tech buzzword - it's the spark igniting a revolution in how we interact with machines. From your smartphone's voice assistant to complex problem-solving algorithms, AI is reshaping our world in ways we're only beginning to understand."
  },
  {
    ai: "Climate change is a long-term change in the average weather patterns that have come to define Earth's local, regional and global climates.",
    human: "Our planet is running a fever, and we're the cause. Climate change isn't just about warmer summers - it's a complex shift in weather patterns that threatens everything from our food supply to coastal cities. It's the biggest challenge of our generation, and the clock is ticking."
  },
  {
    ai: "Exercise is physical activity that is planned, structured, and repetitive for the purpose of conditioning the body. Exercise consists of cardiovascular conditioning, strength training, and flexibility.",
    human: "Sweat, breathe, move, repeat. Exercise isn't just about building muscle or losing weight - it's a celebration of what your body can do. It's your daily dose of endorphins, your stress-buster, your fountain of youth. Whether you're pumping iron or dancing in your living room, you're investing in a healthier, happier you."
  }
];

export default function Home() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [remainingAttempts, setRemainingAttempts] = useState<number>(5);
  const [theme, setTheme] = useState<string>("dark");
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [currentExampleIndex, setCurrentExampleIndex] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  const sendMessage = async () => {
    if (text.trim().length < 3 || loading) return;
    if (wordCount > 200) {
      toast.error("Text exceeds 200 words limit.");
      return;
    }

    setLoading(true);
    setShowLanding(false);
    const userMessage = { text, sender: "user" };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setText("");

    try {
      const response = await axios.post(`${serverURL}/free/rewrite`, {
        text: text,
        setting: 2,
        output_format: "json"
      });

      setLoading(false);
      
      const humanLikeVersions = response.data.humanLikeVersions;
      
      setMessages(prevMessages => [...prevMessages, { 
        text: humanLikeVersions[0].text, 
        sender: "bot",
        originalInput: text,
        versions: humanLikeVersions,
        currentVersionIndex: 0
      }]);
      setRemainingAttempts(response.data.remainingAttempts);
      scrollToBottom();
    } catch (error: any) {
      setLoading(false);
      if (error.response?.status === 429) {
        toast.error("No more free attempts. Please sign up for more rewrites.");
        setTimeout(() => {
          window.location.href = '/signup';
        }, 3000);
      } else {
        toast.error(error.response?.data?.error || "Something went wrong!");
      }
    }
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    }, (err) => {
      console.error('Could not copy text: ', err);
      toast.error("Failed to copy text.");
    });
  };

  const redoMessage = (originalInput: string) => {
    setText(originalInput);
    textareaRef.current?.focus();
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);

    const timer = setInterval(() => {
      setCurrentExampleIndex(prevIndex => (prevIndex + 1) % exampleTexts.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    setWordCount(countWords(newText));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentExampleIndex]);

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

  return (
    <div className={`flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen w-screen font-sans relative overflow-hidden`}>
      <animated.div
        style={{
          ...backgroundAnimation,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme === "dark" 
            ? 'linear-gradient(45deg, #111827, #1f2937, #374151, #111827)'
            : 'linear-gradient(45deg, #ffffff, #f9fafb, #f3f4f6, #ffffff)',
          backgroundSize: '400% 400%',
        }}
      />
      <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>NoaiGPT</h1>
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"} transition-all duration-300 hover:scale-110`}
          >
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </header>

      <main className="flex-grow mt-16 mb-24 px-4 overflow-hidden relative z-10">
        <animated.div style={fadeIn} className="max-w-2xl mx-auto">
          {showLanding && (
            <div className="text-center py-8">
              <h2 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Welcome to NoaiGPT</h2>
              <p className={`text-lg mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                NoaiGPT converts AI-generated content into natural, human-like writing that bypasses AI detection.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {showLanding && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentExampleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg max-w-[90%] transform hover:scale-105 transition-all duration-300`}>
                    <p className="text-sm mb-2 text-blue-500 font-semibold">AI Generated:</p>
                    <p className="text-sm">{exampleTexts[currentExampleIndex].ai}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} shadow-lg max-w-[90%] ml-auto mt-4 transform hover:scale-105 transition-all duration-300`}>
                    <p className="text-sm mb-2 text-green-500 font-semibold">Human Rewritten:</p>
                    <p className="text-sm">{exampleTexts[currentExampleIndex].human}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {messages.map((message, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg shadow-lg ${
                  message.sender === "user" 
                    ? `${theme === "dark" ? "bg-blue-600" : "bg-blue-500"} text-white ml-auto` 
                    : `${theme === "dark" ? "bg-gray-800" : "bg-white"} ${theme === "dark" ? "text-white" : "text-gray-900"}`
                } max-w-[90%] transform hover:scale-105 transition-all duration-300`}
              >
                <p className="text-sm">{message.text}</p>
                {message.sender === "bot" && message.versions && (
                  <div className="mt-2 flex justify-between items-center text-sm">
                    <button onClick={() => changeVersion(index, 'prev')} className="text-blue-300">
                      <FiChevronLeft />
                    </button>
                    <span className="text-blue-300">
                      {`Human: ${(message.versions[message.currentVersionIndex || 0].confidence * 100).toFixed(2)}%`}
                    </span>
                    <button onClick={() => changeVersion(index, 'next')} className="text-blue-300">
                      <FiChevronRight />
                    </button>
                  </div>
                )}
                {message.sender === "bot" && (
                  <div className="mt-2 flex justify-end space-x-2">
                    <button onClick={() => copyToClipboard(message.text)} className="text-blue-300 hover:text-blue-400 transition-colors duration-200">
                      <FiCopy size={14} />
                    </button>
                    <button onClick={() => redoMessage(message.originalInput || '')} className="text-blue-300 hover:text-blue-400 transition-colors duration-200">
                      <FiRefreshCw size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
            {loading && (
              <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} max-w-[90%]`}>
                <Skeleton count={3} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </animated.div>
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-opacity-90 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          <div className={`flex items-center rounded-lg overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg transition-all duration-300 hover:shadow-xl`}
               style={{
                 boxShadow: theme === "dark"
                   ? "0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3), 0 0 45px rgba(59, 130, 246, 0.1)"
                   : "0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2), 0 0 45px rgba(59, 130, 246, 0.1)"
               }}>
            <textarea 
              ref={textareaRef}
              className={`flex-1 p-3 bg-transparent border-none focus:ring-0 focus:outline-none resize-none ${theme === "dark" ? "text-white" : "text-gray-900"} placeholder-gray-500`}
              rows={1}
              value={text} 
              onChange={handleTextAreaChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your AI-generated text here..." 
            />
            <button 
              className={`p-3 text-blue-500 hover:text-blue-600 focus:outline-none transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
              onClick={sendMessage}
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
      </footer>

         </div>
  );
}