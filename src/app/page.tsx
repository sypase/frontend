// // "use client";

// // import { useState, useEffect, useRef } from "react";
// // import axios from "axios";
// // import { ToastContainer, toast } from "react-toastify";
// // import { motion } from "framer-motion";
// // import { useSpring, animated } from "react-spring";
// // import Link from "next/link";
// // import Head from "next/head";
// // import Slider from "react-slick";
// // import MessageComponent from "./MessageComponent";
// // import Footer from "./Footer";
// // import SignupForm from "./signup/SignupForm";
// // import LoginComponent from "./login/LoginComponent";
// // import Skeleton from "react-loading-skeleton";
// // import "react-toastify/dist/ReactToastify.css";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import "react-loading-skeleton/dist/skeleton.css";
// // import { serverURL } from "@/utils/utils";
// // import { logos, logoSettings, kathmanduText, countWords } from "./constants";

// // interface Message {
// //   id: number;
// //   text: string;
// //   sender: string;
// //   originalInput?: string;
// //   variants?: { text: string; score: number }[];
// //   variantIndex?: number;
// // }

// // export default function Home() {
// //   const [text, setText] = useState<string>("");
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [wordCount, setWordCount] = useState<number>(0);
// //   const [remainingAttempts, setRemainingAttempts] = useState<number>(5);
// //   const [showLanding, setShowLanding] = useState<boolean>(true);
// //   const [isLoaded, setIsLoaded] = useState<boolean>(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
// //   const [showSignupForm, setShowSignupForm] = useState(false);
// //   const [showLoginForm, setShowLoginForm] = useState(false);
// //   const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);
// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const textareaRef = useRef<HTMLTextAreaElement>(null);

// //   let messageIdCounter = 0;

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     setIsLoggedIn(!!token);

// //     setTimeout(() => {
// //       setIsLoaded(true);
// //     }, 500);
// //   }, []);

// //   const sendMessage = async () => {
// //     if (text.trim().length < 3 || loading) return;
// //     if (wordCount < 100) {
// //       toast.error("Minimum word count is 100.");
// //       return;
// //     }

// //     setLoading(true);
// //     setShowLanding(false);
// //     const userMessage = { id: messageIdCounter++, text, sender: "user" };
// //     setMessages((prevMessages) => [...prevMessages, userMessage]);
// //     setText("");

// //     try {
// //       const response = await axios.post(`${serverURL}/free/rewrite`, {
// //         text: text,
// //         setting: isAdvancedMode ? 2 : 1,
// //         output_format: "json",
// //       });

// //       setLoading(false);

// //       const variants = response.data.variants.map((variant: any) => ({
// //         text: variant.text,
// //         score: variant.score,
// //       }));

// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         {
// //           id: messageIdCounter++,
// //           text: "Humanized Text Version",
// //           sender: "bot",
// //           originalInput: text,
// //           variants,
// //           variantIndex: 0,
// //         },
// //       ]);
// //       setRemainingAttempts(response.data.remainingAttempts);
// //       scrollToBottom();
// //     } catch (error: any) {
// //       setLoading(false);
// //       if (error.response?.status === 429) {
// //         toast.error("No more free attempts. Please sign up for more rewrites.");
// //         setTimeout(() => {
// //           setShowSignupForm(true);
// //         }, 3000);
// //       } else {
// //         toast.error(error.response?.data?.error || "Something went wrong!");
// //       }
// //     }
// //   };

// //   const copyToClipboard = (text: string) => {
// //     navigator.clipboard.writeText(text).then(
// //       () => {
// //         toast.success("Copied to clipboard!");
// //       },
// //       (err) => {
// //         console.error("Could not copy text: ", err);
// //         toast.error("Failed to copy text.");
// //       }
// //     );
// //   };

// //   const redoMessage = (originalInput: string) => {
// //     setText(originalInput);
// //     textareaRef.current?.focus();
// //   };

// //   const handleTextAreaChange = (
// //     event: React.ChangeEvent<HTMLTextAreaElement>
// //   ) => {
// //     const newText = event.target.value;
// //     setText(newText);
// //     setWordCount(countWords(newText));
// //     adjustTextareaHeight();
// //   };

// //   const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
// //     if (event.key === "Enter" && !event.shiftKey) {
// //       event.preventDefault();
// //       sendMessage();
// //     }
// //   };

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   };

// //   const adjustTextareaHeight = () => {
// //     if (textareaRef.current) {
// //       textareaRef.current.style.height = "auto";
// //       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
// //     }
// //   };

// //   useEffect(() => {
// //     adjustTextareaHeight();
// //   }, [text]);

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages]);

// //   const fadeIn = useSpring({
// //     opacity: isLoaded ? 1 : 0,
// //     from: { opacity: 0 },
// //     config: { duration: 1000 },
// //   });

// //   const backgroundAnimation = useSpring({
// //     from: { backgroundPosition: "0% 50%" },
// //     to: { backgroundPosition: "100% 50%" },
// //     config: { duration: 20000, loop: true },
// //     reset: true,
// //   });

// //   const handleKathmanduClick = () => {
// //     setText(kathmanduText);
// //     setWordCount(countWords(kathmanduText));
// //   };

// //   const handleVariantChange = (messageId: number, variantIndex: number) => {
// //     setMessages((prevMessages) =>
// //       prevMessages.map((msg) =>
// //         msg.id === messageId ? { ...msg, variantIndex } : msg
// //       )
// //     );
// //   };

// //   const toggleAdvancedMode = () => {
// //     setIsAdvancedMode((prevMode) => !prevMode);
// //   };

// //   if (!isLoaded) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-gray-50">
// //         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <Head>
// //         <title>NoaiGPT - Transform AI Text into Human Text</title>
// //         <meta
// //           name="description"
// //           content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection."
// //         />
// //         <meta name="viewport" content="width=device-width, initial-scale=1" />
// //         <meta
// //           property="og:title"
// //           content="NoaiGPT - Transform AI Text into Human Text"
// //         />
// //         <meta
// //           property="og:description"
// //           content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection."
// //         />
// //         <meta
// //           property="og:image"
// //           content="https://your-image-url.com/og-image.jpg"
// //         />
// //         <meta property="og:url" content="https://your-website-url.com" />
// //         <meta name="twitter:card" content="summary_large_image" />
// //         <meta
// //           name="twitter:title"
// //           content="NoaiGPT - Transform AI Text into Human Text"
// //         />
// //         <meta
// //           name="twitter:description"
// //           content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection."
// //         />
// //         <meta
// //           name="twitter:image"
// //           content="https://your-image-url.com/twitter-image.jpg"
// //         />
// //       </Head>

// //       <div className="flex flex-col min-h-screen w-screen font-sans relative overflow-hidden">
// //         <animated.div
// //           style={{
// //             ...backgroundAnimation,
// //             position: "absolute",
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             background:
// //               "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8))",
// //             backdropFilter: "blur(10px)",
// //             backgroundSize: "400% 400%",
// //           }}
// //         />

// //         <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-50 backdrop-blur-lg shadow-sm">
// //           <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
// //             <h1 className="text-2xl font-bold text-gray-900">NoaiGPT</h1>
// //             <div className="flex space-x-4">
// //               {!isLoggedIn && (
// //                 <>
// //                   <Link
// //                     href="/pricing"
// //                     className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
// //                   >
// //                     Pricing
// //                   </Link>
// //                   <button
// //                     onClick={() => setShowSignupForm(true)}
// //                     className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
// //                   >
// //                     Try for Free
// //                   </button>
// //                 </>
// //               )}
// //               {isLoggedIn && (
// //                 <Link
// //                   href="/dashboard"
// //                   className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
// //                 >
// //                   Go to Dashboard
// //                 </Link>
// //               )}
// //             </div>
// //           </div>
// //         </header>
// //         <main className="flex-grow mt-24 px-4 overflow-y-auto relative z-30 pb-24 bg-gray-50">
// //           <animated.div style={fadeIn} className="max-w-2xl mx-auto">
// //             {showLanding && (
// //               <div className="text-center py-8">
// //                 <h2 className="text-4xl font-bold mb-4 text-gray-900">
// //                   Transform Your AI Text into{" "}
// //                   <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
// //                     Human Text
// //                   </span>
// //                 </h2>
// //                 <p className="text-lg mb-8 text-gray-700">
// //                   With no AI detection and natural flow, our tool bypasses AI
// //                   detectors like:
// //                 </p>
// //                 <Slider {...logoSettings} className="mb-8">
// //                   {logos.map((logo, index) => (
// //                     <div key={index} className="flex justify-center px-2">
// //                       <img src={logo} alt={`Logo ${index}`} className="h-12" />
// //                     </div>
// //                   ))}
// //                 </Slider>
// //                 <p className="text-lg mb-8 text-gray-700">
// //                   Remove AI traces and achieve plagiarism-free paraphrasing.
// //                 </p>
// //                 <div className="flex justify-center mt-8">
// //                   <img
// //                     src="/assets/MS-Startups-Celebration-Badge-Dark.png"
// //                     alt="Microsoft Startups Member"
// //                     className="h-16"
// //                   />
// //                 </div>
// //                 <p className="text-sm text-gray-600 mt-4">
// //                   Proud member of the Microsoft for Startups program.
// //                 </p>
// //                 <button
// //                   className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
// //                   onClick={handleKathmanduClick}
// //                 >
// //                   Try Example: Kathmandu Description
// //                 </button>
// //               </div>
// //             )}

// //             <div className="space-y-4">
// //               {messages.map((message, index) => (
// //                 <MessageComponent
// //                   key={index}
// //                   message={message}
// //                   copyToClipboard={copyToClipboard}
// //                   redoMessage={redoMessage}
// //                   onVariantChange={handleVariantChange}
// //                 />
// //               ))}
// //               {loading && (
// //                 <div className="p-4 rounded-lg bg-white max-w-[90%]">
// //                   <Skeleton count={3} />
// //                 </div>
// //               )}
// //               <div ref={messagesEndRef} />
// //             </div>
// //           </animated.div>
// //         </main>

// //         <Footer
// //           text={text}
// //           setText={setText}
// //           wordCount={wordCount}
// //           loading={loading}
// //           sendMessage={sendMessage}
// //           handleTextAreaChange={handleTextAreaChange}
// //           handleKeyDown={handleKeyDown}
// //           textareaRef={textareaRef}
// //           isAdvancedMode={isAdvancedMode} // Added this line
// //           toggleAdvancedMode={toggleAdvancedMode} // Added this line
// //         />
// //         {showSignupForm && (
// //           <SignupForm onClose={() => setShowSignupForm(false)} />
// //         )}
// //         {showLoginForm && (
// //           <LoginComponent onClose={() => setShowLoginForm(false)} />
// //         )}
// //         <ToastContainer position="bottom-right" />
// //       </div>
// //     </>
// //   );
// // }

// // // <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg z-40 shadow-lg">
// // // <div className="max-w-2xl mx-auto relative">
// // //   <div className="absolute top-[-40px] right-0">
// // //     <div className="flex items-center cursor-not-allowed relative">
// // //       <div className="group flex items-center relative">
// // //         <div
// // //           className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
// // //             isAdvancedMode
// // //               ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
// // //               : "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600"
// // //           }`}
// // //         >
// // //           <div
// // //             className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
// // //               isAdvancedMode ? "translate-x-6" : ""
// // //             }`}
// // //           ></div>
// // //         </div>
// // //         <div className="absolute bottom-12 left-[-80px] bg-white text-gray-700 text-sm p-4 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-72 flex flex-col items-start pointer-events-none">
// // //           <div className="flex items-center mb-2">
// // //             <FiZap className="mr-2 text-blue-500" />
// // //             <span className="font-bold">Pro Mode Features</span>
// // //           </div>
// // //           <p className="mb-2 flex items-center">
// // //             <FiCheckCircle className="mr-2 text-green-500" />
// // //             Advanced AI checking for superior content quality.
// // //           </p>
// // //           <p className="mb-2">
// // //             🚀 Enhanced grammar and advanced model for higher accuracy
// // //             and natural language flow.
// // //           </p>
// // //           <p className="text-orange-500 font-semibold">
// // //             ⚠️ You need to sign in to use Pro Mode.
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   </div>
// // //   <div
// // //     className="flex items-end rounded-lg overflow-hidden bg-white bg-opacity-50 shadow-lg transition-all duration-300 hover:shadow-xl relative"
// // //     style={{
// // //       boxShadow:
// // //         "0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2), 0 0 45px rgba(59, 130, 246, 0.1)",
// // //     }}
// // //   >
// // //     <textarea
// // //       ref={textareaRef}
// // //       className="flex-1 p-3 bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-gray-900 placeholder-gray-500 max-h-40 overflow-y-auto"
// // //       style={{ minHeight: "40px" }}
// // //       value={text}
// // //       onChange={handleTextAreaChange}
// // //       onKeyDown={handleKeyDown}
// // //       placeholder="Enter your AI-generated text here..."
// // //     />
// // //     <div className="absolute top-2 right-2 text-sm text-gray-600">
// // //       {wordCount} words
// // //     </div>
// // //     <button
// // //       className={`p-3 text-blue-500 hover:text-blue-600 focus:outline-none transition-all duration-300 ${
// // //         loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
// // //       }`}
// // //       onClick={sendMessage}
// // //       disabled={loading || text.trim().length < 3 || wordCount < 100}
// // //     >
// // //       {loading ? (
// // //         <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
// // //       ) : (
// // //         <FiArrowRight className="w-6 h-6" />
// // //       )}
// // //     </button>
// // //   </div>
// // // </div>
// // // </footer>


// "use client";

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { useSpring, animated } from "react-spring";
// import Link from "next/link";
// import Head from "next/head";
// import Slider from "react-slick";
// import MessageComponent from "./MessageComponent";
// import Footer from "./Footer";
// import SignupForm from "./signup/SignupForm";
// import LoginComponent from "./login/LoginComponent";
// import Skeleton from "react-loading-skeleton";
// import "react-toastify/dist/ReactToastify.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "react-loading-skeleton/dist/skeleton.css";
// import { serverURL } from "@/utils/utils";
// import { logos, logoSettings, kathmanduText, countWords } from "./constants";

// interface Message {
//   id: number;
//   text: string;
//   sender: string;
//   originalInput?: string;
//   variants?: { text: string; score: number }[];
//   variantIndex?: number;
// }

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
//   const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   let messageIdCounter = 0;

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
//     const userMessage = { id: messageIdCounter++, text, sender: "user" };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setText("");

//     try {
//       const response = await axios.post(`${serverURL}/free/rewrite`, {
//         text: text,
//         setting: isAdvancedMode ? 2 : 1,
//         output_format: "json",
//       });

//       setLoading(false);

//       const variants = response.data.variants.map((variant: any) => ({
//         text: variant.text,
//         score: variant.score,
//       }));

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           id: messageIdCounter++,
//           text: "Humanized Text Version",
//           sender: "bot",
//           originalInput: text,
//           variants,
//           variantIndex: 0,
//         },
//       ]);
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
//     navigator.clipboard.writeText(text).then(
//       () => {
//         toast.success("Copied to clipboard!");
//       },
//       (err) => {
//         console.error("Could not copy text: ", err);
//         toast.error("Failed to copy text.");
//       }
//     );
//   };

//   const redoMessage = (originalInput: string) => {
//     setText(originalInput);
//     textareaRef.current?.focus();
//   };

//   const handleTextAreaChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     const newText = event.target.value;
//     setText(newText);
//     setWordCount(countWords(newText));
//     adjustTextareaHeight();
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();
//       sendMessage();
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const adjustTextareaHeight = () => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
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
//     config: { duration: 1000 },
//   });

//   const backgroundAnimation = useSpring({
//     from: { backgroundPosition: "0% 50%" },
//     to: { backgroundPosition: "100% 50%" },
//     config: { duration: 20000, loop: true },
//     reset: true,
//   });

//   const handleKathmanduClick = () => {
//     setText(kathmanduText);
//     setWordCount(countWords(kathmanduText));
//   };

//   const handleVariantChange = (messageId: number, variantIndex: number) => {
//     setMessages((prevMessages) =>
//       prevMessages.map((msg) =>
//         msg.id === messageId ? { ...msg, variantIndex } : msg
//       )
//     );
//   };

//   const toggleAdvancedMode = () => {
//     if (!isLoggedIn) {
//       toast.error("Please sign in to use Advanced Mode.");
//       setShowLoginForm(true);
//       return;
//     }
//     setIsAdvancedMode((prevMode) => !prevMode);
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
//         <meta
//           name="description"
//           content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection."
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta
//           property="og:title"
//           content="NoaiGPT - Transform AI Text into Human Text"
//         />
//         <meta
//           property="og:description"
//           content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection."
//         />
//         <meta
//           property="og:image"
//           content="https://your-image-url.com/og-image.jpg"
//         />
//         <meta property="og:url" content="https://your-website-url.com" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta
//           name="twitter:title"
//           content="NoaiGPT - Transform AI Text into Human Text"
//         />
//         <meta
//           name="twitter:description"
//           content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection."
//         />
//         <meta
//           name="twitter:image"
//           content="https://your-image-url.com/twitter-image.jpg"
//         />
//       </Head>

//       <div className="flex flex-col min-h-screen w-screen font-sans relative overflow-hidden">
//         <animated.div
//           style={{
//             ...backgroundAnimation,
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background:
//               "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8))",
//             backdropFilter: "blur(10px)",
//             backgroundSize: "400% 400%",
//           }}
//         />

//         <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-50 backdrop-blur-lg shadow-sm">
//           <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-gray-900">NoaiGPT</h1>
//             <div className="flex space-x-4">
//               {!isLoggedIn && (
//                 <>
//                   <Link
//                     href="/pricing"
//                     className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
//                   >
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
//                 <Link
//                   href="/dashboard"
//                   className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//                 >
//                   Go to Dashboard
//                 </Link>
//               )}
//             </div>
//           </div>
//         </header>
//         <main className="flex-grow mt-24 px-4 overflow-y-auto relative z-30 pb-24 bg-gray-50">
//           <animated.div style={fadeIn} className="max-w-2xl mx-auto">
//             {showLanding && (
//               <div className="text-center py-8">
//                 <h2 className="text-4xl font-bold mb-4 text-gray-900">
//                   Transform Your AI Text into{" "}
//                   <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
//                     Human Text
//                   </span>
//                 </h2>
//                 <p className="text-lg mb-8 text-gray-700">
//                   With no AI detection and natural flow, our tool bypasses AI
//                   detectors like:
//                 </p>
//                 <Slider {...logoSettings} className="mb-8">
//                   {logos.map((logo, index) => (
//                     <div key={index} className="flex justify-center px-2">
//                       <img src={logo} alt={`Logo ${index}`} className="h-12" />
//                     </div>
//                   ))}
//                 </Slider>
//                 <p className="text-lg mb-8 text-gray-700">
//                   Remove AI traces and achieve plagiarism-free paraphrasing.
//                 </p>
//                 <div className="flex justify-center mt-8">
//                   <img
//                     src="/assets/MS-Startups-Celebration-Badge-Dark.png"
//                     alt="Microsoft Startups Member"
//                     className="h-16"
//                   />
//                 </div>
//                 <p className="text-sm text-gray-600 mt-4">
//                   Proud member of the Microsoft for Startups program.
//                 </p>
//                 <button
//                   className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
//                   onClick={handleKathmanduClick}
//                 >
//                   Try Example: Kathmandu Description
//                 </button>
//               </div>
//             )}

//             <div className="space-y-4">
//               {messages.map((message, index) => (
//                 <MessageComponent
//                   key={index}
//                   message={message}
//                   copyToClipboard={copyToClipboard}
//                   redoMessage={redoMessage}
//                   onVariantChange={handleVariantChange}
//                 />
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

//         <Footer
//           text={text}
//           setText={setText}
//           wordCount={wordCount}
//           loading={loading}
//           sendMessage={sendMessage}
//           handleTextAreaChange={handleTextAreaChange}
//           handleKeyDown={handleKeyDown}
//           textareaRef={textareaRef}
//           isAdvancedMode={isAdvancedMode} // Added this line
//           toggleAdvancedMode={toggleAdvancedMode} // Added this line
//         />
//         {showSignupForm && (
//           <SignupForm onClose={() => setShowSignupForm(false)} />
//         )}
//         {showLoginForm && (
//           <LoginComponent onClose={() => setShowLoginForm(false)} />
//         )}
//         <ToastContainer position="bottom-right" />
//       </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
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

// Import the l-grid component
import { grid } from 'ldrs';
grid.register();

interface Message {
  id: number;
  text: string;
  sender: string;
  originalInput?: string;
  variants?: { text: string; score: number }[];
  variantIndex?: number;
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

  const phrases = [
    "Bypassing AI",
    "Checking Grammar",
    "Checking AI",
  ];

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
      toast.error("Minimum word count is 100.");
      return;
    }

    setLoading(true);
    setShowLanding(false);
    const userMessage = { id: messageIdCounter++, text, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setText("");

    try {
      const response = await axios.post(`${serverURL}/free/rewrite`, {
        text: text,
        setting: isAdvancedMode ? 2 : 1,
        output_format: "json",
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
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy text.");
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
        <meta
          name="description"
          content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="NoaiGPT - Transform AI Text into Human Text"
        />
        <meta
          property="og:description"
          content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection."
        />
        <meta
          property="og:image"
          content="https://your-image-url.com/og-image.jpg"
        />
        <meta property="og:url" content="https://your-website-url.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="NoaiGPT - Transform AI Text into Human Text"
        />
        <meta
          name="twitter:description"
          content="Use NoaiGPT to transform AI-generated text into human-like text with natural flow and no AI detection."
        />
        <meta
          name="twitter:image"
          content="https://your-image-url.com/twitter-image.jpg"
        />
      </Head>

      <div className="flex flex-col min-h-screen w-screen font-sans relative overflow-hidden">
        <animated.div
          style={{
            ...backgroundAnimation,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8))",
            backdropFilter: "blur(10px)",
            backgroundSize: "400% 400%",
          }}
        />

        <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-50 backdrop-blur-lg shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">NoaiGPT</h1>
            <div className="flex space-x-4">
              {!isLoggedIn && (
                <>
                  <Link
                    href="/pricing"
                    className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                  >
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
                <Link
                  href="/dashboard"
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </header>
        <main className="flex-grow mt-24 px-4 overflow-y-auto relative z-30 pb-24 bg-gray-50">
          <animated.div style={fadeIn} className="max-w-2xl mx-auto">
            {showLanding && (
              <div className="text-center py-8">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Transform Your AI Text into{" "}
                  <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                    Human Text
                  </span>
                </h2>
                <p className="text-lg mb-8 text-gray-700">
                  With no AI detection and natural flow, our tool bypasses AI
                  detectors like:
                </p>
                <Slider {...logoSettings} className="mb-8">
                  {logos.map((logo, index) => (
                    <div key={index} className="flex justify-center px-2">
                      <img src={logo} alt={`Logo ${index}`} className="h-12" />
                    </div>
                  ))}
                </Slider>
                <p className="text-lg mb-8 text-gray-700">
                  Remove AI traces and achieve plagiarism-free paraphrasing.
                </p>
                <div className="flex justify-center mt-8">
                  <img
                    src="/assets/MS-Startups-Celebration-Badge-Dark.png"
                    alt="Microsoft Startups Member"
                    className="h-16"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Proud member of the Microsoft for Startups program.
                </p>
                <button
                  className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
                  onClick={handleKathmanduClick}
                >
                  Try Example: Kathmandu Description
                </button>
              </div>
            )}

            <div className="space-y-4">
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
                  <l-grid
                    size="30"
                    speed="1.0" 
                    color="green" 
                  ></l-grid>
                  <p className="ml-4 text-black text-lg">{phrases[currentPhraseIndex]}</p>
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