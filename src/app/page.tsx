"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSpring, animated } from "react-spring";
import Link from "next/link";
import Head from "next/head";
import Slider from "react-slick";
import MessageComponent from "./MessageComponent";
import Footer from "./Footer";
import SignupForm from "./signup/SignupForm";
import LoginComponent from "./login/LoginComponent";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "@/utils/utils";
import { logos, logoSettings, kathmanduText, countWords } from "./constants";
import { NextSeo } from 'next-seo';  // Importing next-seo
import { defaultSEOConfig,breadcrumbJsonLd } from '../../next-seo.config';


import Header from "./header";

// Import the l-grid component
import { grid } from "ldrs";
// import { StickyScrollRevealDemo } from "./SmartProcessingSection";

import TopGrammarScore from "./TopGrammarScore";
import ZeroPlagiarism from "./ZeroPlagiarism";
import { AccordionDemo } from "./FAQ";
import ElegantFooter from "./last";
import { AnimatedBeamMultipleOutputDemo } from "./AnimatedBeam";
import Hero from "./hero";
import {CompareDemo} from "./CompareDemo";
import {BentoDemo} from "./BeatTurnitinCard"
import {TabsDemo} from "./humnaizedshowcase"
import Tweeter from "./howtouse"
import ReviewCard from "./joinwrites"

interface Message {
  id: number;
  text: string;
  sender: string;
  originalInput?: string;
  variants?: { text: string; score: number }[];
  variantIndex?: number;
}

interface User {
  name: string;
  email: string;
  credits: number;
  dailyFreeWords: number;
  referralCode: string;

}

export default function Home() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [remainingAttempts, setRemainingAttempts] = useState<number>(5);
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [rewriteCount, setRewriteCount] = useState<number>(-1);
  const [dailyFreeWords, setDailyFreeWords] = useState<number>( 0);


  const phrases = ["Bypassing AI", "Checking Grammar", "Checking AI"];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  let messageIdCounter = 0;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (text.trim().length < 3 || loading) return;
    if (wordCount < 100) {
      return;
    }

    setLoading(true);
    setShowLanding(false);
    const userMessage = { id: messageIdCounter++, text, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setText("");

    try {
      const response = await axios.post(`${serverURL}/free/bypass`, {
        text: text,
        tone: 1,
      });

      setLoading(false);

      const variants = response.data.variants.map((variant: any) => ({
        text: variant.text,
        score: variant.score,
      }));

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: messageIdCounter++,
          text: "Humanized Text Version",
          sender: "bot",
          originalInput: text,
          variants,
          variantIndex: 0,
        },
      ]);
      setRemainingAttempts(response.data.remainingAttempts);
      scrollToBottom();
    } catch (error: any) {
      setLoading(false);
      if (error.response?.status === 429) {
        toast.error("No more free attempts. Please sign up for more rewrites.", {
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
        setTimeout(() => {
          setShowSignupForm(true);
        }, 3000);
      } else {
        toast.error(error.response?.data?.error || "Something went wrong!", {
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
    }
  };

  const getRewrites = async () => {
    try {
      const response = await axios.get(`${serverURL}/bypass/rewrites`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRewriteCount(response.data.rewrites);
    } catch (error) {
      console.error("Error fetching rewrites:", error);
      toast.error("Failed to load rewrite count.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get<{ user: User }>(`${serverURL}/users`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setUser(response.data.user);
          setLoading(false);
          setDailyFreeWords(response.data.user.dailyFreeWords); // Set the dailyFreeWords directly here
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load user data.");
          setLoading(false);
        }
      };
      fetchUserData();
      getRewrites();
    }
  }, [isLoggedIn]);
  

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

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newText = event.target.value;
    setText(newText);
    setWordCount(countWords(newText));
    adjustTextareaHeight();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fadeIn = useSpring({
    opacity: isLoaded ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const backgroundAnimation = useSpring({
    from: { backgroundPosition: "0% 50%" },
    to: { backgroundPosition: "100% 50%" },
    config: { duration: 20000, loop: true },
    reset: true,
  });

  const handleKathmanduClick = () => {
    setText(kathmanduText);
    setWordCount(countWords(kathmanduText));
  };

  const handleVariantChange = (messageId: number, variantIndex: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, variantIndex } : msg
      )
    );
  };

  

  const toggleAdvancedMode = () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to use Advanced Mode.");
      setShowLoginForm(true);
      return;
    }
    setIsAdvancedMode((prevMode) => !prevMode);
  };

  const handleShowSignupForm = () => {
    if (isLoggedIn) {
      window.location.href = "/dashboard";
    } else {
      setShowSignupForm(true);// Show signup form if not logged in
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      grid.register();
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="text-4xl font-semibold text-center text-transparent bg-gradient-to-b from-gray-200 to-gray-600 bg-clip-text transition-transform transform hover:scale-105">
          Stay Unique, Stay Undetectable
        </div>
      </div>
    );
  }
  

  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NoAIGPT - Professional AI Text Humanizer & Content Authenticity Platform</title>
        <meta
          name="description"
          content = "Experience the most advanced AI text humanization platform trusted by over 100,000 professionals worldwide. Our cutting-edge technology transforms AI-generated content into perfectly natural human text, guaranteed to pass all content detection tools with 100% accuracy. Utilizing proprietary deep learning algorithms and linguistic pattern analysis, NoAIGPT preserves your content's original meaning while ensuring complete undetectability. Perfect for content creators, marketing agencies, academic professionals, and enterprises seeking to maintain authenticity in their digital content. Join the leading solution for content authenticity and experience why top companies choose NoAIGPT for their content optimization needs."
          />
        <link rel="canonical" href="https://noaigpt.com/" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://noaigpt.com/" />
        <meta property="og:site_name" content="NoAIGPT" />
        <meta property="og:title" content="NoAIGPT - Professional AI Text Humanizer | Trusted by 100,000+ Users" />
        <meta
          property="og:description"
          content="Transform AI-generated content into flawlessly natural human text with our enterprise-grade humanization platform. Featuring advanced linguistic algorithms, real-time processing, and guaranteed passing of all content detection systems."
        />
        <meta
          property="og:image"
          content="https://noaigpt.com/assets/images/og-image.png"
        />
        <meta property="og:image:secure_url" content="https://noaigpt.com/assets/images/og-image.png" />
        <meta property="og:image:alt" content="NoAIGPT - Professional AI Content Humanizer Platform" />
        <meta
          property="og:image"
          content="https://noaigpt.com/assets/images/og-square.png"
        />
        <meta property="og:image:alt" content="NoAIGPT Logo" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@noaigpt" />
        <meta name="twitter:handle" content="@noaigpt" />
        <meta name="twitter:title" content="NoAIGPT - Professional AI Text Humanizer | Trusted by 100,000+ Users" />
        <meta
          name="twitter:description"
          content="Transform AI-generated content into flawlessly natural human text with our enterprise-grade humanization platform."
        />
        <meta name="twitter:image" content="https://noaigpt.com/assets/images/og-image.png" />

        {/* Apple and Mobile Meta Tags */}
        <meta name="apple-mobile-web-app-title" content="NoAIGPT" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

        {/* Preconnect for Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data for Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://noaigpt.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Pricing",
                "item": "https://noaigpt.com/pricing"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "AI Detectors",
                "item": "https://noaigpt.com/ai-detectors"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Earn",
                "item": "https://noaigpt.com/earn"
              },
            ]
          })}
        </script>
      </head>
      <Header
      onShowSignupForm={() => setShowSignupForm(true)}
/>

<div className="flex flex-col min-h-screen w-full font-sans relative overflow-hidden overflow-x-hidden">
  <animated.div
    style={{
      ...backgroundAnimation,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "black", // Darker gradient background
      backdropFilter: "blur(10px)",
      backgroundSize: "400% 400%",
    }}
  />

  <main className="flex-grow mt-24 px-4 overflow-y-auto overflow-x-hidden relative z-30 pb-24 bg-black"> {/* Dark background for main content */}
    <animated.div style={fadeIn} className="max-w-1xl mx-auto text-white"> {/* White text for visibility */}
      {showLanding && (
        <div className="flex flex-col min-h-screen w-full font-sans relative overflow-hidden overflow-x-hidden bg-black">

                {/* Landing Section */}
                {showLanding && (
                  //                 <section
                  //                   className="text-center py-8"
                  //                   style={{ height: "150vh", backgroundColor: "#f9fafb" }}
                  //                 >
                  //                   <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  //                     #1 Premium AI Humanizer In The World
                  //                   </h2>
                  //                   <p className="text-lg mb-8 text-gray-700">
                  //                     Effortlessly bypass AI detectors with our cutting-edge
                  //                     tool, ensuring a natural flow and undetectable AI traces.
                  //                   </p>

                  //                   <Slider {...logoSettings} className="mb-8 w-1/2 mx-auto">
                  //                     {logos.map((logo, index) => (
                  //                       <div key={index} className="flex justify-center px-2">
                  //                         <img
                  //                           src={logo}
                  //                           alt={`Logo ${index}`}
                  //                           className="h-12"
                  //                         />
                  //                       </div>
                  //                     ))}
                  //                   </Slider>

                  //                   <div className="flex justify-center mb-8">
                  //                     <iframe
                  //                       width="800" // Set a larger width
                  //                       height="450" // Set a larger height
                  //                       src="https://www.youtube.com/embed/GDlkCkcIqTs?autoplay=1&controls=0&mute=1"
                  //                       title="YouTube video player"
                  //                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  //                       className="w-full max-w-3xl rounded-lg shadow-lg" // Adjust max-width for responsiveness
                  //                     ></iframe>
                  //                   </div>

                  //                   {/* <button
                  //   className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
                  //   onClick={handleKathmanduClick}
                  // >
                  //   Try Example: Kathmandu Description
                  // </button> */}
                  //                 </section>
                  <Hero
                    logos={logos}
                    logoSettings={logoSettings}
                    handleKathmanduClick={handleKathmanduClick}
                    isLoggedIn={!!user}
                    
                  />
                )}


                <AnimatedBeamMultipleOutputDemo />

                <CompareDemo />
                <TabsDemo />
                <ReviewCard />






                <TopGrammarScore />


                <ZeroPlagiarism />
                <Tweeter />


                <BentoDemo onShowSignupForm={handleShowSignupForm} />




                <AccordionDemo />


                <ElegantFooter />

                <div className=""></div>
              </div>
            )}

            <div className="flex flex-col items-center space-y-4 max-w-6xl mx-auto">
              {messages.map((message, index) => (
              <MessageComponent
                key={index}
                message={message}
                copyToClipboard={copyToClipboard}
                redoMessage={redoMessage}
                onVariantChange={handleVariantChange}
              />
              ))}
              {loading && (
              <div className="flex items-center p-4 rounded-lg bg-gray max-w-[50%]">
                <l-grid size="30" speed="1.0" color="green"></l-grid>
                <p className="ml-4 text-gray-200 text-lg">
                {phrases[currentPhraseIndex]}
                </p>
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
          sendMessage={sendMessage}
          handleTextAreaChange={handleTextAreaChange}
          handleKeyDown={handleKeyDown}
          textareaRef={textareaRef}
          isAdvancedMode={isAdvancedMode} // Added this line
          toggleAdvancedMode={toggleAdvancedMode} // Added this line
          isLoggedIn={!!user}
          />  
        {showSignupForm && (
          <SignupForm onClose={() => setShowSignupForm(false)} />
        )}
        {showLoginForm && (
          <LoginComponent onClose={() => setShowLoginForm(false)} />
        )}
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
