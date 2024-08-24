// "use client";

// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { useState, useEffect, useRef } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { FiArrowRight, FiCopy, FiRefreshCw } from "react-icons/fi";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { motion } from "framer-motion";
// import { useSpring, animated } from "react-spring";
// import Select from "react-select";
// import Link from 'next/link';
// import Slider from "react-slick";
// import SignupForm from './signup/SignupForm';
// import LoginComponent from './login/LoginComponent';
// import Head from 'next/head';

// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// const serverURL = "http://localhost:8080"; // Replace with your actual server URL

// function countWords(str: string) {
//   return str.trim().split(/\s+/).filter(Boolean).length;
// }

// interface Message {
//   text: string;
//   sender: string;
//   originalInput?: string;
//   versions?: { text: string; confidence: number }[];
//   currentVersionIndex?: number;
// }

// const logos = [
//   "https://i.postimg.cc/FYFYsj7M/Undetectableai.png",
//   "https://i.postimg.cc/mhMzdLv5/Gptzero.png",
//   "https://i.postimg.cc/mcth7B3V/Writer.png",
//   "https://i.postimg.cc/XBwrXLKb/Crossplag.png",
//   "https://i.postimg.cc/XpkZb27K/copyleaks.png",
//   "https://i.postimg.cc/Z9d4TRxk/Contentatscale.png",
//   "https://i.postimg.cc/cvDrKr3r/turnitin.png"
// ];

// const modelOptions = [
//   { value: 'base', label: 'Base Model' },
//   { value: 'advanced', label: 'Advanced Model' }
// ];

// export default function Home() {
//   const [text, setText] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [wordCount, setWordCount] = useState<number>(0);
//   const [remainingAttempts, setRemainingAttempts] = useState<number>(5);
//   const [showLanding, setShowLanding] = useState<boolean>(true);
//   const [isLoaded, setIsLoaded] = useState<boolean>(false);
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [showSignupForm, setShowSignupForm] = useState(false);
//   const [showLoginForm, setShowLoginForm] = useState(false);
//   const [model, setModel] = useState<string>("base");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);

//     setTimeout(() => {
//       setIsLoaded(true);
//     }, 500);
//   }, []);

//   const sendMessage = async () => {
//     if (text.trim().length < 3 || loading) return;
//     if (wordCount < 100) {
//       toast.error("Minimum word count is 100.");
//       return;
//     }

//     setLoading(true);
//     setShowLanding(false);
//     const userMessage = { text, sender: "user" };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setText("");

//     try {
//       const response = await axios.post(`${serverURL}/free/rewrite`, {
//         text: text,
//         setting: model === "base" ? 1 : 2,
//         output_format: "json"
//       });

//       setLoading(false);
      
//       const humanLikeVersions = response.data.humanizedText;
      
//       setMessages(prevMessages => [...prevMessages, { 
//         text: humanLikeVersions, 
//         sender: "bot",
//         originalInput: text,
//         versions: humanLikeVersions,
//         currentVersionIndex: 0
//       }]);
//       setRemainingAttempts(response.data.remainingAttempts);
//       scrollToBottom();
//     } catch (error: any) {
//       setLoading(false);
//       if (error.response?.status === 429) {
//         toast.error("No more free attempts. Please sign up for more rewrites.");
//         setTimeout(() => {
//           setShowSignupForm(true);
//         }, 3000);
//       } else {
//         toast.error(error.response?.data?.error || "Something went wrong!");
//       }
//     }
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       toast.success("Copied to clipboard!");
//     }, (err) => {
//       console.error('Could not copy text: ', err);
//       toast.error("Failed to copy text.");
//     });
//   };

//   const redoMessage = (originalInput: string) => {
//     setText(originalInput);
//     textareaRef.current?.focus();
//   };

//   const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const newText = event.target.value;
//     setText(newText);
//     setWordCount(countWords(newText));
//     adjustTextareaHeight();
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (event.key === 'Enter' && !event.shiftKey) {
//       event.preventDefault();
//       sendMessage();
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const adjustTextareaHeight = () => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   };

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [text]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const fadeIn = useSpring({
//     opacity: isLoaded ? 1 : 0,
//     from: { opacity: 0 },
//     config: { duration: 1000 }
//   });

//   const backgroundAnimation = useSpring({
//     from: { backgroundPosition: '0% 50%' },
//     to: { backgroundPosition: '100% 50%' },
//     config: { duration: 20000, loop: true },
//     reset: true,
//   });

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 5000,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 0,
//     cssEase: "linear",
//     pauseOnHover: false,
//     variableWidth: true
//   };

//   if (!isLoaded) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>NoaiGPT - Transform AI Text into Human Text</title>
//         <meta name="description" content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta property="og:title" content="NoaiGPT - Transform AI Text into Human Text" />
//         <meta property="og:description" content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection." />
//         <meta property="og:image" content="https://your-image-url.com/og-image.jpg" />
//         <meta property="og:url" content="https://your-website-url.com" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="NoaiGPT - Transform AI Text into Human Text" />
//         <meta name="twitter:description" content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection." />
//         <meta name="twitter:image" content="https://your-image-url.com/twitter-image.jpg" />
//       </Head>
//       <div className="flex flex-col min-h-screen w-screen font-sans relative overflow-hidden">
//         <animated.div
//           style={{
//             ...backgroundAnimation,
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8))',
//             backdropFilter: 'blur(10px)',
//             backgroundSize: '400% 400%',
//           }}
//         />
//         <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-50 backdrop-blur-lg shadow-sm">
//           <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-gray-900">NoaiGPT</h1>
//             <div className="flex space-x-4">
//               {!isLoggedIn && (
//                 <>
//                   <Link href="/pricing" className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105">
//                     Pricing
//                   </Link>
//                   <button 
//                     onClick={() => setShowSignupForm(true)} 
//                     className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//                   >
//                     Try for Free
//                   </button>
//                 </>
//               )}
//               {isLoggedIn && (
//                 <Link href="/dashboard" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
//                   Go to Dashboard
//                 </Link>
//               )}
//             </div>
//           </div>
//         </header>
    
//         <main className="flex-grow mt-24 px-4 overflow-y-auto relative z-30 pb-24">
//           <animated.div style={fadeIn} className="max-w-2xl mx-auto">
//             {showLanding && (
//               <div className="text-center py-8">
//                 <h2 className="text-4xl font-bold mb-4 text-gray-900">
//                   Transform Your AI Text into <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">Human Text</span>
//                 </h2>
//                 <p className="text-lg mb-8 text-gray-700">
//                   With no AI detection and natural flow, our tool bypasses AI detectors like:
//                 </p>
//                 <Slider {...settings}>
//                   {logos.map((logo, index) => (
//                     <div key={index} className="flex justify-center">
//                       <img src={logo} alt={`Logo ${index}`} className="h-12 mx-4" />
//                     </div>
//                   ))}
//                 </Slider>
//                 <p className="text-lg mb-8 text-gray-700">
//                   Remove AI traces and achieve plagiarism-free paraphrasing.
//                 </p>
//                 <div className="flex justify-center mt-8">
//                   <img src="https://i.postimg.cc/br9Gtyt0/MS-Startups-Celebration-Badge-Dark.png" alt="Microsoft Startups Member" className="h-16" />
//                 </div>
//                 <p className="text-sm text-gray-600 mt-4">
//                   Proud member of the Microsoft for Startups program.
//                 </p>
//               </div>
//             )}
    
//             <div className="space-y-4">
//               {messages.map((message, index) => (
//                 <motion.div 
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`p-4 rounded-lg shadow-lg ${
//                     message.sender === "user" 
//                       ? "bg-blue-500 text-white ml-auto" 
//                       : "bg-white text-gray-900"
//                   } max-w-[90%] transform hover:scale-105 transition-all duration-300 z-10`}
//                 >
//                   <p className="text-sm whitespace-pre-wrap">{message.text}</p>
//                   {message.sender === "bot" && (
//                     <div className="mt-2 flex justify-end space-x-2">
//                       <button onClick={() => copyToClipboard(message.text)} className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
//                         <FiCopy size={14} />
//                       </button>
//                       <button onClick={() => redoMessage(message.originalInput || '')} className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
//                         <FiRefreshCw size={14} />
//                       </button>
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//               {loading && (
//                 <div className="p-4 rounded-lg bg-white max-w-[90%]">
//                   <Skeleton count={3} />
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>
//           </animated.div>
//         </main>
//         <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg z-40 shadow-lg">
//           <div className="max-w-2xl mx-auto relative">
//             <div className="absolute top-[-40px] right-0">
//               <Select
//                 options={modelOptions}
//                 defaultValue={modelOptions[0]}
//                 onChange={(option) => setModel(option?.value || "base")}
//                 className="w-32 text-sm"
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     minHeight: '30px',
//                     height: '30px',
//                     fontSize: '12px',
//                   }),
//                   dropdownIndicator: (base) => ({
//                     ...base,
//                     padding: '0px 8px',
//                   }),
//                   clearIndicator: (base) => ({
//                     ...base,
//                     padding: '0px 8px',
//                   }),
//                   valueContainer: (base) => ({
//                     ...base,
//                     padding: '0px 6px',
//                   }),
//                   input: (base) => ({
//                     ...base,
//                     margin: '0px',
//                   }),
//                   menu: (base) => ({
//                     ...base,
//                     position: 'absolute',
//                     bottom: '100%',
//                     marginBottom: '5px',
//                   }),
//                 }}
//                 menuPlacement="top"
//               />
//             </div>
//             <div className="flex items-end rounded-lg overflow-hidden bg-white bg-opacity-50 shadow-lg transition-all duration-300 hover:shadow-xl relative"
//                  style={{
//                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2), 0 0 45px rgba(59, 130, 246, 0.1)"
//                  }}>
//               <textarea 
//                 ref={textareaRef}
//                 className="flex-1 p-3 bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-gray-900 placeholder-gray-500 max-h-40 overflow-y-auto"
//                 style={{ minHeight: '40px' }}
//                 value={text} 
//                 onChange={handleTextAreaChange}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Enter your AI-generated text here..." 
//               />
//               <div className="absolute top-2 right-2 text-sm text-gray-600">
//                 {wordCount} words
//               </div>
//               <button 
//                 className={`p-3 text-blue-500 hover:text-blue-600 focus:outline-none transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
//                 onClick={sendMessage}
//                 disabled={loading || text.trim().length < 3 || wordCount < 100}
//               >
//                 {loading ? (
//                   <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                 ) : (
//                   <FiArrowRight className="w-6 h-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </footer>
    
//         {showSignupForm && <SignupForm onClose={() => setShowSignupForm(false)} />}
//         {showLoginForm && <LoginComponent onClose={() => setShowLoginForm(false)} />}
//         <ToastContainer position="bottom-right" />
//       </div>
//     </>
//   );
// }

"use client";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiArrowRight, FiCopy, FiRefreshCw } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import Select from "react-select";
import Link from 'next/link';
import Slider from "react-slick";
import SignupForm from './signup/SignupForm';
import LoginComponent from './login/LoginComponent';
import Head from 'next/head';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const serverURL = "https://backendngpt.azurewebsites.net"; // Replace with your actual server URL

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

const logos = [
  "https://i.postimg.cc/FYFYsj7M/Undetectableai.png",
  "https://i.postimg.cc/mhMzdLv5/Gptzero.png",
  "https://i.postimg.cc/mcth7B3V/Writer.png",
  "https://i.postimg.cc/XBwrXLKb/Crossplag.png",
  "https://i.postimg.cc/XpkZb27K/copyleaks.png",
  "https://i.postimg.cc/Z9d4TRxk/Contentatscale.png",
  "https://i.postimg.cc/cvDrKr3r/turnitin.png"
];

const modelOptions = [
  { value: 'base', label: 'Base Model' },
  { value: 'advanced', label: 'Advanced Model' }
];

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
  const [model, setModel] = useState<string>("base");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  const sendMessage = async () => {
    if (text.trim().length < 3 || loading) return;
    if (wordCount < 100) {
      toast.error("Minimum word count is 100.");
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
        setting: model === "base" ? 1 : 2,
        output_format: "json"
      });

      setLoading(false);
      
      const humanLikeVersions = response.data.humanizedText;
      
      setMessages(prevMessages => [...prevMessages, { 
        text: humanLikeVersions, 
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
          setShowSignupForm(true);
        }, 3000);
      } else {
        toast.error(error.response?.data?.error || "Something went wrong!");
      }
    }
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

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    setWordCount(countWords(newText));
    adjustTextareaHeight();
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

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
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
    config: { duration: 1000 }
  });

  const backgroundAnimation = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 20000, loop: true },
    reset: true,
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    variableWidth: true
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>NoaiGPT - Transform AI Text into Human Text</title>
        <meta name="description" content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="NoaiGPT - Transform AI Text into Human Text" />
        <meta property="og:description" content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection." />
        <meta property="og:image" content="https://your-image-url.com/og-image.jpg" />
        <meta property="og:url" content="https://your-website-url.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NoaiGPT - Transform AI Text into Human Text" />
        <meta name="twitter:description" content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection." />
        <meta name="twitter:image" content="https://your-image-url.com/twitter-image.jpg" />
      </Head>
      <div className="flex flex-col min-h-screen w-screen font-sans relative overflow-hidden">
        <animated.div
          style={{
            ...backgroundAnimation,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8))',
            backdropFilter: 'blur(10px)',
            backgroundSize: '400% 400%',
          }}
        />
        <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-50 backdrop-blur-lg shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">NoaiGPT</h1>
            <div className="flex space-x-4">
              {!isLoggedIn && (
                <>
                  <Link href="/pricing" className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105">
                    Pricing
                  </Link>
                  <button 
                    onClick={() => setShowSignupForm(true)} 
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Try for Free
                  </button>
                </>
              )}
              {isLoggedIn && (
                <Link href="/dashboard" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </header>
    
        <main className="flex-grow mt-24 px-4 overflow-y-auto relative z-30 pb-24">
          <animated.div style={fadeIn} className="max-w-2xl mx-auto">
            {showLanding && (
              <div className="text-center py-8">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Transform Your AI Text into <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">Human Text</span>
                </h2>
                <p className="text-lg mb-8 text-gray-700">
                  With no AI detection and natural flow, our tool bypasses AI detectors like:
                </p>
                <Slider {...settings}>
                  {logos.map((logo, index) => (
                    <div key={index} className="flex justify-center">
                      <img src={logo} alt={`Logo ${index}`} className="h-12 mx-4" />
                    </div>
                  ))}
                </Slider>
                <p className="text-lg mb-8 text-gray-700">
                  Remove AI traces and achieve plagiarism-free paraphrasing.
                </p>
                <div className="flex justify-center mt-8">
                  <img src="https://i.postimg.cc/br9Gtyt0/MS-Startups-Celebration-Badge-Dark.png" alt="Microsoft Startups Member" className="h-16" />
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Proud member of the Microsoft for Startups program.
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
                  } max-w-[90%] transform hover:scale-105 transition-all duration-300 z-10`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  {message.sender === "bot" && (
                    <div className="mt-2 flex justify-end space-x-2">
                      <button onClick={() => copyToClipboard(message.text)} className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
                        <FiCopy size={14} />
                      </button>
                      <button onClick={() => redoMessage(message.originalInput || '')} className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
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
        <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg z-40 shadow-lg">
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute top-[-40px] right-0">
              <Select
                options={modelOptions}
                defaultValue={modelOptions[0]}
                onChange={(option) => setModel(option?.value || "base")}
                className="w-32 text-sm"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '30px',
                    height: '30px',
                    fontSize: '12px',
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    padding: '0px 8px',
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    padding: '0px 8px',
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: '0px 6px',
                  }),
                  input: (base) => ({
                    ...base,
                    margin: '0px',
                  }),
                  menu: (base) => ({
                    ...base,
                    position: 'absolute',
                    bottom: '100%',
                    marginBottom: '5px',
                  }),
                }}
                menuPlacement="top"
              />
            </div>
            <div className="flex items-end rounded-lg overflow-hidden bg-white bg-opacity-50 shadow-lg transition-all duration-300 hover:shadow-xl relative"
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
                placeholder="Enter your AI-generated text here..." 
              />
              <div className="absolute top-2 right-2 text-sm text-gray-600">
                {wordCount} words
              </div>
              <button 
                className={`p-3 text-blue-500 hover:text-blue-600 focus:outline-none transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                onClick={sendMessage}
                disabled={loading || text.trim().length < 3 || wordCount < 100}
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
    
        {showSignupForm && <SignupForm onClose={() => setShowSignupForm(false)} />}
        {showLoginForm && <LoginComponent onClose={() => setShowLoginForm(false)} />}
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}