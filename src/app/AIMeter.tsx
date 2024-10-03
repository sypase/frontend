// // // // // // // // // // // // // // components/AIMeter.tsx

// // // // // // // // // // // // // import { useEffect, useState, useRef } from "react";

// // // // // // // // // // // // // const AIMeter = () => {
// // // // // // // // // // // // //   const [percentage, setPercentage] = useState<number>(100);
// // // // // // // // // // // // //   const [inView, setInView] = useState<boolean>(false); // To track if the section is in view
// // // // // // // // // // // // //   const meterRef = useRef<HTMLDivElement | null>(null); // Ref to observe the section

// // // // // // // // // // // // //   // Intersection Observer to detect when the section is in view
// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const observer = new IntersectionObserver(
// // // // // // // // // // // // //       (entries) => {
// // // // // // // // // // // // //         if (entries[0].isIntersecting) {
// // // // // // // // // // // // //           setInView(true); // Set inView to true when the section is visible
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       { threshold: 0.5 } // Trigger when 50% of the component is in view
// // // // // // // // // // // // //     );

// // // // // // // // // // // // //     if (meterRef.current) {
// // // // // // // // // // // // //       observer.observe(meterRef.current);
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // //       if (meterRef.current) {
// // // // // // // // // // // // //         observer.unobserve(meterRef.current);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // //   // Trigger animation when the section comes into view
// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     let interval: NodeJS.Timeout | undefined;

// // // // // // // // // // // // //     if (inView && percentage > 0) {
// // // // // // // // // // // // //       interval = setInterval(() => {
// // // // // // // // // // // // //         setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// // // // // // // // // // // // //       }, 50); // Decrease the percentage when in view
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // // // // // //   }, [inView, percentage]);

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <section
// // // // // // // // // // // // //       ref={meterRef} // Attach the ref to the section
// // // // // // // // // // // // //       style={{ height: "90vh" }}
// // // // // // // // // // // // //       className="flex flex-col items-center justify-center  w-full"
// // // // // // // // // // // // //     >
// // // // // // // // // // // // //       <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // // // // // // //         Bypass all AI detection effortlessly with plag-free content
// // // // // // // // // // // // //       </h1>
// // // // // // // // // // // // //       <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // // // // // // //         {percentage}% AI Detected
// // // // // // // // // // // // //       </h1>
// // // // // // // // // // // // //       <h2 className="text-center text-xl font-bold mb-4">AI Detection Meter</h2>
// // // // // // // // // // // // //       <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4">
// // // // // // // // // // // // //         <div
// // // // // // // // // // // // //           className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// // // // // // // // // // // // //           style={{ width: `${percentage}%` }}
// // // // // // // // // // // // //         ></div>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </section>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default AIMeter;

// // // // // // // // // // // // import { useEffect, useState, useRef } from "react";
// // // // // // // // // // // // import { bypassScreenshot } from "./constants";
// // // // // // // // // // // // const AIMeter = () => {
// // // // // // // // // // // //   const [percentage, setPercentage] = useState<number>(100);
// // // // // // // // // // // //   const [inView, setInView] = useState<boolean>(false);
// // // // // // // // // // // //   const meterRef = useRef<HTMLDivElement | null>(null);

// // // // // // // // // // // //   // Intersection Observer to detect when the section is in view
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const observer = new IntersectionObserver(
// // // // // // // // // // // //       (entries) => {
// // // // // // // // // // // //         if (entries[0].isIntersecting) {
// // // // // // // // // // // //           setInView(true);
// // // // // // // // // // // //         } else {
// // // // // // // // // // // //           setInView(false);
// // // // // // // // // // // //         }
// // // // // // // // // // // //       },
// // // // // // // // // // // //       { threshold: 0.5 }
// // // // // // // // // // // //     );

// // // // // // // // // // // //     if (meterRef.current) {
// // // // // // // // // // // //       observer.observe(meterRef.current);
// // // // // // // // // // // //     }

// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //       if (meterRef.current) {
// // // // // // // // // // // //         observer.unobserve(meterRef.current);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   // Trigger animation when the section comes into view
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     let interval: NodeJS.Timeout | undefined;

// // // // // // // // // // // //     if (inView && percentage > 0) {
// // // // // // // // // // // //       interval = setInterval(() => {
// // // // // // // // // // // //         setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// // // // // // // // // // // //       }, 50);
// // // // // // // // // // // //     }

// // // // // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // // // // //   }, [inView, percentage]);

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <section
// // // // // // // // // // // //       ref={meterRef}
// // // // // // // // // // // //       style={{ height: "90vh" }}
// // // // // // // // // // // //       className="flex flex-col items-center justify-center w-full"
// // // // // // // // // // // //     >
// // // // // // // // // // // //       <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // // // // // //         Bypass all AI detection effortlessly with plag-free content
// // // // // // // // // // // //       </h1>
// // // // // // // // // // // //       <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // // // // // //         {percentage}% AI Detected
// // // // // // // // // // // //       </h1>
// // // // // // // // // // // //       <h2 className="text-center text-xl font-bold mb-4">AI Detection Meter</h2>
// // // // // // // // // // // //       <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4">
// // // // // // // // // // // //         <div
// // // // // // // // // // // //           className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// // // // // // // // // // // //           style={{ width: `${percentage}%` }}
// // // // // // // // // // // //         ></div>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* Animated Screenshots */}
// // // // // // // // // // // //       <div className="flex flex-wrap justify-center mt-8">
// // // // // // // // // // // //         {bypassScreenshot.map((src, index) => (
// // // // // // // // // // // //           <img
// // // // // // // // // // // //             key={index}
// // // // // // // // // // // //             src={src}
// // // // // // // // // // // //             alt={`Bypass ${index + 1}`}
// // // // // // // // // // // //             className={`w-32 h-32 m-2 transform transition-transform duration-700 ease-in-out ${
// // // // // // // // // // // //               inView ? "translate-y-0  opacity-100" : "translate-y-full opacity-0"
// // // // // // // // // // // //             }`}
// // // // // // // // // // // //           />
// // // // // // // // // // // //         ))}
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </section>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default AIMeter;

// // // // // // // // // // // import { useEffect, useState, useRef } from "react";
// // // // // // // // // // // import { bypassScreenshot } from "./constants";

// // // // // // // // // // // const AIMeter = () => {
// // // // // // // // // // //   const [percentage, setPercentage] = useState<number>(100);
// // // // // // // // // // //   const [inView, setInView] = useState<boolean>(false);
// // // // // // // // // // //   const meterRef = useRef<HTMLDivElement | null>(null);

// // // // // // // // // // //   // Intersection Observer to detect when the section is in view
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const observer = new IntersectionObserver(
// // // // // // // // // // //       (entries) => {
// // // // // // // // // // //         if (entries[0].isIntersecting) {
// // // // // // // // // // //           setInView(true);
// // // // // // // // // // //         } else {
// // // // // // // // // // //           setInView(false);
// // // // // // // // // // //         }
// // // // // // // // // // //       },
// // // // // // // // // // //       { threshold: 0.5 }
// // // // // // // // // // //     );

// // // // // // // // // // //     if (meterRef.current) {
// // // // // // // // // // //       observer.observe(meterRef.current);
// // // // // // // // // // //     }

// // // // // // // // // // //     return () => {
// // // // // // // // // // //       if (meterRef.current) {
// // // // // // // // // // //         observer.unobserve(meterRef.current);
// // // // // // // // // // //       }
// // // // // // // // // // //     };
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Trigger animation when the section comes into view
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     let interval: NodeJS.Timeout | undefined;

// // // // // // // // // // //     if (inView && percentage > 0) {
// // // // // // // // // // //       interval = setInterval(() => {
// // // // // // // // // // //         setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// // // // // // // // // // //       }, 50);
// // // // // // // // // // //     }

// // // // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // // // //   }, [inView, percentage]);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <section
// // // // // // // // // // //       ref={meterRef}
// // // // // // // // // // //       style={{ height: "90vh" }}
// // // // // // // // // // //       className="flex flex-col items-center justify-center w-full"
// // // // // // // // // // //     >
// // // // // // // // // // //       <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // // // // //         Bypass all AI detection effortlessly with plag-free content
// // // // // // // // // // //       </h1>
// // // // // // // // // // //       <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // // // // //         {percentage}% AI Detected
// // // // // // // // // // //       </h1>
// // // // // // // // // // //       <h2 className="text-center text-xl font-bold mb-4">AI Detection Meter</h2>
// // // // // // // // // // //       <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4">
// // // // // // // // // // //         <div
// // // // // // // // // // //           className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// // // // // // // // // // //           style={{ width: `${percentage}%` }}
// // // // // // // // // // //         ></div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* Animated Screenshots */}
// // // // // // // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 w-full px-4">
// // // // // // // // // // //         {bypassScreenshot.map((src, index) => (
// // // // // // // // // // //           <img
// // // // // // // // // // //             key={index}
// // // // // // // // // // //             src={src}
// // // // // // // // // // //             alt={`Bypass ${index + 1}`}
// // // // // // // // // // //             className={`w-full h-auto transform transition-transform duration-700 ease-in-out ${
// // // // // // // // // // //               inView ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
// // // // // // // // // // //             }`}
// // // // // // // // // // //           />
// // // // // // // // // // //         ))}
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </section>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default AIMeter;

// // // // // // // // // // import { useEffect, useState, useRef } from "react";
// // // // // // // // // // import { bypassScreenshot } from "./constants";

// // // // // // // // // // const AIMeter = () => {
// // // // // // // // // //   const [percentage, setPercentage] = useState<number>(100);
// // // // // // // // // //   const [inView, setInView] = useState<boolean>(false);
// // // // // // // // // //   const meterRef = useRef<HTMLDivElement | null>(null);

// // // // // // // // // //   // Intersection Observer to detect when the section is in view
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const observer = new IntersectionObserver(
// // // // // // // // // //       (entries) => {
// // // // // // // // // //         if (entries[0].isIntersecting) {
// // // // // // // // // //           setInView(true);
// // // // // // // // // //         } else {
// // // // // // // // // //           setInView(false);
// // // // // // // // // //         }
// // // // // // // // // //       },
// // // // // // // // // //       { threshold: 0.5 }
// // // // // // // // // //     );

// // // // // // // // // //     if (meterRef.current) {
// // // // // // // // // //       observer.observe(meterRef.current);
// // // // // // // // // //     }

// // // // // // // // // //     return () => {
// // // // // // // // // //       if (meterRef.current) {
// // // // // // // // // //         observer.unobserve(meterRef.current);
// // // // // // // // // //       }
// // // // // // // // // //     };
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Trigger animation when the section comes into view
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     let interval: NodeJS.Timeout | undefined;

// // // // // // // // // //     if (inView && percentage > 0) {
// // // // // // // // // //       interval = setInterval(() => {
// // // // // // // // // //         setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// // // // // // // // // //       }, 50);
// // // // // // // // // //     }

// // // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // // //   }, [inView, percentage]);

// // // // // // // // // //   return (
// // // // // // // // // //     <section
// // // // // // // // // //       ref={meterRef}
// // // // // // // // // //       style={{ height: "90vh" }}
// // // // // // // // // //       className="relative flex flex-col items-center justify-center w-full overflow-hidden"
// // // // // // // // // //     >
// // // // // // // // // //       <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // // // //         Bypass all AI detection effortlessly with plag-free content
// // // // // // // // // //       </h1>
// // // // // // // // // //       <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // // // //         {percentage}% AI Detected
// // // // // // // // // //       </h1>
// // // // // // // // // //       <h2 className="text-center text-xl font-bold mb-4">AI Detection Meter</h2>
// // // // // // // // // //       <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4">
// // // // // // // // // //         <div
// // // // // // // // // //           className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// // // // // // // // // //           style={{ width: `${percentage}%` }}
// // // // // // // // // //         ></div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* Animated Screenshots */}
// // // // // // // // // //       <div className="absolute inset-0">
// // // // // // // // // //         {bypassScreenshot.map((src, index) => (
// // // // // // // // // //           <img
// // // // // // // // // //             key={index}
// // // // // // // // // //             src={src}
// // // // // // // // // //             alt={`Bypass ${index + 1}`}
// // // // // // // // // //             className={`absolute w-32 h-32 object-cover transform transition-transform duration-700 ease-in-out ${
// // // // // // // // // //               inView ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
// // // // // // // // // //             }`}
// // // // // // // // // //             style={{
// // // // // // // // // //               top: `${Math.random() * 80}%`,
// // // // // // // // // //               left: `${Math.random() * 80}%`,
// // // // // // // // // //             }}
// // // // // // // // // //           />
// // // // // // // // // //         ))}
// // // // // // // // // //       </div>
// // // // // // // // // //     </section>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default AIMeter;

// // // // // // // // // import { useEffect, useState, useRef } from "react";
// // // // // // // // // import { bypassScreenshot } from "./constants";

// // // // // // // // // const AIMeter = () => {
// // // // // // // // //   const [percentage, setPercentage] = useState<number>(100);
// // // // // // // // //   const [inView, setInView] = useState<boolean>(false);
// // // // // // // // //   const meterRef = useRef<HTMLDivElement | null>(null);

// // // // // // // // //   // Intersection Observer to detect when the section is in view
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const observer = new IntersectionObserver(
// // // // // // // // //       (entries) => {
// // // // // // // // //         if (entries[0].isIntersecting) {
// // // // // // // // //           setInView(true);
// // // // // // // // //         } else {
// // // // // // // // //           setInView(false);
// // // // // // // // //         }
// // // // // // // // //       },
// // // // // // // // //       { threshold: 0.5 }
// // // // // // // // //     );

// // // // // // // // //     if (meterRef.current) {
// // // // // // // // //       observer.observe(meterRef.current);
// // // // // // // // //     }

// // // // // // // // //     return () => {
// // // // // // // // //       if (meterRef.current) {
// // // // // // // // //         observer.unobserve(meterRef.current);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //   }, []);

// // // // // // // // //   // Trigger animation when the section comes into view
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     let interval: NodeJS.Timeout | undefined;

// // // // // // // // //     if (inView && percentage > 0) {
// // // // // // // // //       interval = setInterval(() => {
// // // // // // // // //         setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// // // // // // // // //       }, 50);
// // // // // // // // //     }

// // // // // // // // //     return () => clearInterval(interval);
// // // // // // // // //   }, [inView, percentage]);

// // // // // // // // //   return (
// // // // // // // // //     <section
// // // // // // // // //       ref={meterRef}
// // // // // // // // //       style={{ height: "90vh" }}
// // // // // // // // //       className="relative flex flex-col items-center justify-center w-full overflow-hidden"
// // // // // // // // //     >
// // // // // // // // //       <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // // //         Bypass all AI detection effortlessly with plag-free content
// // // // // // // // //       </h1>
// // // // // // // // //       <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // // //         {percentage}% AI Detected
// // // // // // // // //       </h1>
// // // // // // // // //       <h2 className="text-center text-xl font-bold mb-4">AI Detection Meter</h2>
// // // // // // // // //       <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4">
// // // // // // // // //         <div
// // // // // // // // //           className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// // // // // // // // //           style={{ width: `${percentage}%` }}
// // // // // // // // //         ></div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* Animated Screenshots */}
// // // // // // // // //       <div className="absolute inset-0 flex justify-center items-end">
// // // // // // // // //         {bypassScreenshot.map((src, index) => (
// // // // // // // // //           <img
// // // // // // // // //             key={index}
// // // // // // // // //             src={src}
// // // // // // // // //             alt={`Bypass ${index + 1}`}
// // // // // // // // //             className={`absolute w-full max-w-xs h-auto object-cover transform transition-transform duration-700 ease-in-out ${
// // // // // // // // //               inView ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
// // // // // // // // //             }`}
// // // // // // // // //             style={{
// // // // // // // // //               bottom: `${index * 10}%`,
// // // // // // // // //               left: `${index % 2 === 0 ? '10%' : '60%'}`,
// // // // // // // // //               transform: `rotate(${index % 2 === 0 ? '-15deg' : '15deg'})`,
// // // // // // // // //             }}
// // // // // // // // //           />
// // // // // // // // //         ))}
// // // // // // // // //       </div>
// // // // // // // // //     </section>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default AIMeter;

// // // // // // // // import { useEffect, useState, useRef } from "react";
// // // // // // // // import { bypassScreenshot } from "./constants";

// // // // // // // // const AIMeter = () => {
// // // // // // // //   const [percentage, setPercentage] = useState<number>(100);
// // // // // // // //   const [inView, setInView] = useState<boolean>(false);
// // // // // // // //   const meterRef = useRef<HTMLDivElement | null>(null);

// // // // // // // //   // Intersection Observer to detect when the section is in view
// // // // // // // //   useEffect(() => {
// // // // // // // //     const observer = new IntersectionObserver(
// // // // // // // //       (entries) => {
// // // // // // // //         if (entries[0].isIntersecting) {
// // // // // // // //           setInView(true);
// // // // // // // //         } else {
// // // // // // // //           setInView(false);
// // // // // // // //         }
// // // // // // // //       },
// // // // // // // //       { threshold: 0.5 }
// // // // // // // //     );

// // // // // // // //     if (meterRef.current) {
// // // // // // // //       observer.observe(meterRef.current);
// // // // // // // //     }

// // // // // // // //     return () => {
// // // // // // // //       if (meterRef.current) {
// // // // // // // //         observer.unobserve(meterRef.current);
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //   }, []);

// // // // // // // //   // Trigger animation when the section comes into view
// // // // // // // //   useEffect(() => {
// // // // // // // //     let interval: NodeJS.Timeout | undefined;

// // // // // // // //     if (inView && percentage > 0) {
// // // // // // // //       interval = setInterval(() => {
// // // // // // // //         setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// // // // // // // //       }, 50);
// // // // // // // //     }

// // // // // // // //     return () => clearInterval(interval);
// // // // // // // //   }, [inView, percentage]);

// // // // // // // //   return (
// // // // // // // //     <section
// // // // // // // //       ref={meterRef}
// // // // // // // //       style={{ height: "90vh" }}
// // // // // // // //       className="relative flex flex-col items-center justify-center w-full overflow-hidden"
// // // // // // // //     >
// // // // // // // //       <div className="relative z-10">
// // // // // // // //         <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // //           Bypass all AI detection effortlessly with plag-free content
// // // // // // // //         </h1>
// // // // // // // //         <h1 className="text-center text-4xl font-extrabold mb-8 leading-tight">
// // // // // // // //           {percentage}% AI Detected
// // // // // // // //         </h1>
// // // // // // // //         <h2 className="text-center text-xl font-bold mb-4">AI Detection Meter</h2>
// // // // // // // //         <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4">
// // // // // // // //           <div
// // // // // // // //             className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// // // // // // // //             style={{ width: `${percentage}%` }}
// // // // // // // //           ></div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Animated Screenshots */}
// // // // // // // //       <div className="absolute inset-0 flex justify-between items-end">
// // // // // // // //         {bypassScreenshot.map((src, index) => (
// // // // // // // //           <img
// // // // // // // //             key={index}
// // // // // // // //             src={src}
// // // // // // // //             alt={`Bypass ${index + 1}`}
// // // // // // // //             className={`absolute w-full max-w-xs h-auto object-cover transform transition-transform duration-1000 ease-in-out ${
// // // // // // // //               inView ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
// // // // // // // //             }`}
// // // // // // // //             style={{
// // // // // // // //               bottom: `${index * 15}%`,
// // // // // // // //               left: `${index % 2 === 0 ? '5%' : 'auto'}`,
// // // // // // // //               right: `${index % 2 !== 0 ? '5%' : 'auto'}`,
// // // // // // // //               transform: `rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`,
// // // // // // // //             }}
// // // // // // // //           />
// // // // // // // //         ))}
// // // // // // // //       </div>
// // // // // // // //     </section>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default AIMeter;

// // // // // // // import { useEffect, useState, useRef } from "react";
// // // // // // // import gsap from "gsap";
// // // // // // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // // // // // import { bypassScreenshot } from "./constants";

// // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // const AIMeter = () => {
// // // // // // //   const [percentage, setPercentage] = useState<number>(100);
// // // // // // //   const meterRef = useRef<HTMLDivElement | null>(null);

// // // // // // //   // Initialize GSAP animations on component mount
// // // // // // //   useEffect(() => {
// // // // // // //     if (meterRef.current) {
// // // // // // //       bypassScreenshot.forEach((_, index) => {
// // // // // // //         gsap.fromTo(
// // // // // // //           `.image-${index}`,
// // // // // // //           { y: 100, opacity: 0 },
// // // // // // //           {
// // // // // // //             y: 0,
// // // // // // //             opacity: 1,
// // // // // // //             rotate: index % 2 === 0 ? -10 : 10,
// // // // // // //             scrollTrigger: {
// // // // // // //               trigger: meterRef.current,
// // // // // // //               start: "top center",
// // // // // // //               end: "bottom top",
// // // // // // //               scrub: true,
// // // // // // //               markers: true,
// // // // // // //             },
// // // // // // //           }
// // // // // // //         );
// // // // // // //       });
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   // Trigger percentage countdown
// // // // // // //   useEffect(() => {
// // // // // // //     let interval: NodeJS.Timeout | undefined;

// // // // // // //     if (percentage > 0) {
// // // // // // //       interval = setInterval(() => {
// // // // // // //         setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// // // // // // //       }, 50);
// // // // // // //     }

// // // // // // //     return () => clearInterval(interval);
// // // // // // //   }, [percentage]);

// // // // // // //   return (
// // // // // // //     <section
// // // // // // //       ref={meterRef}
// // // // // // //       style={{ height: "90vh" }}
// // // // // // //       className="relative flex flex-col items-center justify-center w-full overflow-hidden"
// // // // // // //     >
// // // // // // //       <div className="relative z-10 text-center">
// // // // // // //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// // // // // // //           Bypass all AI detection effortlessly with plag-free content
// // // // // // //         </h1>
// // // // // // //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// // // // // // //           {percentage}% AI Detected
// // // // // // //         </h1>
// // // // // // //         <h2 className="text-xl font-bold mb-4">AI Detection Meter</h2>
// // // // // // //         <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4 mx-auto">
// // // // // // //           <div
// // // // // // //             className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// // // // // // //             style={{ width: `${percentage}%` }}
// // // // // // //           ></div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Animated Screenshots */}
// // // // // // //       <div className="absolute inset-0 flex justify-between items-end">
// // // // // // //         {bypassScreenshot.map((src, index) => (
// // // // // // //           <img
// // // // // // //             key={index}
// // // // // // //             src={src}
// // // // // // //             alt={`Bypass ${index + 1}`}
// // // // // // //             className={`image-${index} absolute w-full max-w-xs h-auto object-cover`}
// // // // // // //             style={{
// // // // // // //               bottom: `${index * 15}%`,
// // // // // // //               left: `${index % 2 === 0 ? '5%' : 'auto'}`,
// // // // // // //               right: `${index % 2 !== 0 ? '5%' : 'auto'}`,
// // // // // // //               transform: `rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`,
// // // // // // //             }}
// // // // // // //           />
// // // // // // //         ))}
// // // // // // //       </div>
// // // // // // //     </section>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default AIMeter;

// // // // // // import { useEffect, useState, useRef } from "react";
// // // // // // import gsap from "gsap";
// // // // // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // // // // import { bypassScreenshot } from "./constants";

// // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // const AIMeter = () => {
// // // // // //   const meterRef = useRef<HTMLDivElement | null>(null);
// // // // // //   const [percentage, setPercentage] = useState<number>(100);

// // // // // //   useEffect(() => {
// // // // // //     if (meterRef.current) {
// // // // // //       // GSAP animation for the AI Meter
// // // // // //       gsap.to(meterRef.current, {
// // // // // //         scrollTrigger: {
// // // // // //           trigger: meterRef.current,
// // // // // //           start: "top 80%",
// // // // // //           end: "top 50%",
// // // // // //           scrub: true,
// // // // // //           onEnter: () => {
// // // // // //             gsap.to({}, {
// // // // // //               duration: 5,
// // // // // //               onUpdate: function() {
// // // // // //                 setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// // // // // //               }
// // // // // //             });
// // // // // //           }
// // // // // //         }
// // // // // //       });

// // // // // //       // GSAP animation for screenshots
// // // // // //       bypassScreenshot.forEach((_, index) => {
// // // // // //         gsap.fromTo(
// // // // // //           `.image-${index}`,
// // // // // //           { y: 200, opacity: 0, x: index % 2 === 0 ? -200 : 200 },
// // // // // //           {
// // // // // //             y: 0,
// // // // // //             x: 0,
// // // // // //             opacity: 1,
// // // // // //             duration: 1.5,
// // // // // //             ease: "power3.out",
// // // // // //             scrollTrigger: {
// // // // // //               trigger: meterRef.current,
// // // // // //               start: "top bottom",
// // // // // //               end: "top top",
// // // // // //               scrub: true
// // // // // //             }
// // // // // //           }
// // // // // //         );
// // // // // //       });
// // // // // //     }
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <section
// // // // // //       ref={meterRef}
// // // // // //       style={{ height: "90vh" }}
// // // // // //       className="relative flex flex-col items-center justify-center w-full overflow-hidden"
// // // // // //     >
// // // // // //       <div className="relative z-10 text-center">
// // // // // //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// // // // // //           Bypass all AI detection effortlessly with plag-free content
// // // // // //         </h1>
// // // // // //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// // // // // //           {percentage}% AI Detected
// // // // // //         </h1>
// // // // // //         <h2 className="text-xl font-bold mb-4">AI Detection Meter</h2>
// // // // // //         <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4 mx-auto">
// // // // // //           <div
// // // // // //             className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// // // // // //             style={{ width: `${percentage}%` }}
// // // // // //           ></div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Animated Screenshots */}
// // // // // //       <div className="absolute inset-0 flex justify-between items-end">
// // // // // //         {bypassScreenshot.map((src, index) => (
// // // // // //           <img
// // // // // //             key={index}
// // // // // //             src={src}
// // // // // //             alt={`Bypass ${index + 1}`}
// // // // // //             className={`image-${index} absolute w-full max-w-xs h-auto object-cover`}
// // // // // //             style={{
// // // // // //               bottom: `${index * 15}%`,
// // // // // //               left: `${index % 2 === 0 ? '5%' : 'auto'}`,
// // // // // //               right: `${index % 2 !== 0 ? '5%' : 'auto'}`,
// // // // // //               transform: `rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`,
// // // // // //             }}
// // // // // //           />
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </section>
// // // // // //   );
// // // // // // };

// // // // // // export default AIMeter;

// // // // // import { useEffect, useState, useRef } from "react";
// // // // // import gsap from "gsap";
// // // // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // // // import { bypassScreenshot } from "./constants";

// // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // const AIMeter = () => {
// // // // //   const meterRef = useRef<HTMLDivElement | null>(null);
// // // // //   const [percentage, setPercentage] = useState<number>(100);

// // // // //   useEffect(() => {
// // // // //     if (meterRef.current) {
// // // // //       // GSAP animation for the AI Meter
// // // // //       gsap.to(meterRef.current, {
// // // // //         scrollTrigger: {
// // // // //           trigger: meterRef.current,
// // // // //           start: "top 80%",
// // // // //           end: "top 50%",
// // // // //           scrub: true,
// // // // //           onEnter: () => {
// // // // //             gsap.to({}, {
// // // // //               duration: 5,
// // // // //               onUpdate: function() {
// // // // //                 setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// // // // //               }
// // // // //             });
// // // // //           }
// // // // //         }
// // // // //       });

// // // // //       // GSAP animation for each screenshot
// // // // //       bypassScreenshot.forEach((_, index) => {
// // // // //         gsap.fromTo(
// // // // //           `.image-${index}`,
// // // // //           { y: 200, opacity: 0, x: index % 2 === 0 ? -200 : 200 },
// // // // //           {
// // // // //             y: 0,
// // // // //             x: 0,
// // // // //             opacity: 1,
// // // // //             duration: 1.5,
// // // // //             ease: "power3.out",
// // // // //             scrollTrigger: {
// // // // //               trigger: `.image-${index}`,
// // // // //               start: "top bottom",
// // // // //               end: "top center",
// // // // //               scrub: true
// // // // //             }
// // // // //           }
// // // // //         );
// // // // //       });
// // // // //     }
// // // // //   }, []);

// // // // //   return (
// // // // //     <section
// // // // //       ref={meterRef}
// // // // //       style={{ height: "200vh" }} // Increased height for better scrolling effect
// // // // //       className="relative flex flex-col items-center justify-center w-full overflow-hidden"
// // // // //     >
// // // // //       <div className="relative z-10 text-center">
// // // // //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// // // // //           Bypass all AI detection effortlessly with plag-free content
// // // // //         </h1>
// // // // //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// // // // //           {percentage}% AI Detected
// // // // //         </h1>
// // // // //         <h2 className="text-xl font-bold mb-4">AI Detection Meter</h2>
// // // // //         <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4 mx-auto">
// // // // //           <div
// // // // //             className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// // // // //             style={{ width: `${percentage}%` }}
// // // // //           ></div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Animated Screenshots */}
// // // // //       <div className="absolute inset-0 flex justify-between items-end">
// // // // //         {bypassScreenshot.map((src, index) => (
// // // // //           <img
// // // // //             key={index}
// // // // //             src={src}
// // // // //             alt={`Bypass ${index + 1}`}
// // // // //             className={`image-${index} absolute w-full max-w-xs h-auto object-cover`}
// // // // //             style={{
// // // // //               bottom: `${index * (100 / bypassScreenshot.length)}%`,
// // // // //               left: `${index % 2 === 0 ? '5%' : 'auto'}`,
// // // // //               right: `${index % 2 !== 0 ? '5%' : 'auto'}`,
// // // // //               transform: `rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`,
// // // // //             }}
// // // // //           />
// // // // //         ))}
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // };

// // // // // export default AIMeter;

// // // // import { useEffect, useState, useRef } from "react";
// // // // import gsap from "gsap";
// // // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // // import { bypassScreenshot } from "./constants";

// // // // gsap.registerPlugin(ScrollTrigger);

// // // // const AIMeter = () => {
// // // //   const meterRef = useRef<HTMLDivElement | null>(null);
// // // //   const [percentage, setPercentage] = useState<number>(100);

// // // //   useEffect(() => {
// // // //     if (meterRef.current) {
// // // //       // GSAP animation for the AI Meter
// // // //       gsap.to(meterRef.current, {
// // // //         scrollTrigger: {
// // // //           trigger: meterRef.current,
// // // //           start: "top 80%",
// // // //           end: "top 50%",
// // // //           scrub: true,
// // // //           onEnter: () => {
// // // //             gsap.to({}, {
// // // //               duration: 5,
// // // //               onUpdate: function() {
// // // //                 setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// // // //               }
// // // //             });
// // // //           }
// // // //         }
// // // //       });

// // // //       // GSAP animation for each screenshot
// // // //       bypassScreenshot.forEach((_, index) => {
// // // //         gsap.fromTo(
// // // //           `.image-${index}`,
// // // //           { y: 100, opacity: 0, x: index % 2 === 0 ? -100 : 100 },
// // // //           {
// // // //             y: 0,
// // // //             x: 0,
// // // //             opacity: 1,
// // // //             duration: 1.5,
// // // //             ease: "power3.out",
// // // //             scrollTrigger: {
// // // //               trigger: `.image-${index}`,
// // // //               start: "top bottom",
// // // //               end: "top center",
// // // //               scrub: true
// // // //             }
// // // //           }
// // // //         );
// // // //       });
// // // //     }
// // // //   }, []);

// // // //   return (
// // // //     <section
// // // //       ref={meterRef}
// // // //       style={{ height: "120vh" }} // Reduced height for a more compact view
// // // //       className="relative flex flex-col items-center justify-center w-full overflow-hidden"
// // // //     >
// // // //       <div className="relative z-10 text-center">
// // // //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// // // //           Bypass all AI detection effortlessly with plag-free content
// // // //         </h1>
// // // //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// // // //           {percentage}% AI Detected
// // // //         </h1>
// // // //         <h2 className="text-xl font-bold mb-4">AI Detection Meter</h2>
// // // //         <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4 mx-auto">
// // // //           <div
// // // //             className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// // // //             style={{ width: `${percentage}%` }}
// // // //           ></div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Animated Screenshots */}
// // // //       <div className="absolute inset-0 flex justify-between items-end">
// // // //         {bypassScreenshot.map((src, index) => (
// // // //           <img
// // // //             key={index}
// // // //             src={src}
// // // //             alt={`Bypass ${index + 1}`}
// // // //             className={`image-${index} absolute w-full max-w-xs h-auto object-cover`}
// // // //             style={{
// // // //               bottom: `${index * (60 / bypassScreenshot.length)}%`, // Adjusted for better spacing
// // // //               left: `${index % 2 === 0 ? '5%' : 'auto'}`,
// // // //               right: `${index % 2 !== 0 ? '5%' : 'auto'}`,
// // // //               transform: `rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`,
// // // //             }}
// // // //           />
// // // //         ))}
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default AIMeter;

// // // import { useEffect, useState, useRef } from "react";
// // // import gsap from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import { bypassScreenshot } from "./constants";

// // // gsap.registerPlugin(ScrollTrigger);

// // // const AIMeter = () => {
// // //   const meterRef = useRef<HTMLDivElement | null>(null);
// // //   const [percentage, setPercentage] = useState<number>(100);
// // //   const [inView, setInView] = useState<boolean>(false);

// // //   // Use IntersectionObserver to detect when the AI meter is in view
// // //   useEffect(() => {
// // //     const observer = new IntersectionObserver(
// // //       (entries) => {
// // //         if (entries[0].isIntersecting) {
// // //           setInView(true); // Set inView to true when the section is visible
// // //         }
// // //       },
// // //       { threshold: 0.5 } // Trigger when 50% of the component is in view
// // //     );

// // //     if (meterRef.current) {
// // //       observer.observe(meterRef.current);
// // //     }

// // //     return () => {
// // //       if (meterRef.current) {
// // //         observer.unobserve(meterRef.current);
// // //       }
// // //     };
// // //   }, []);

// // //   // Trigger percentage countdown when in view
// // //   useEffect(() => {
// // //     if (inView) {
// // //       gsap.to({}, {
// // //         duration: 5,
// // //         onUpdate: function() {
// // //           setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// // //         }
// // //       });
// // //     }
// // //   }, [inView]);

// // //   // GSAP animation for each screenshot
// // //   useEffect(() => {
// // //     if (meterRef.current) {
// // //       bypassScreenshot.forEach((_, index) => {
// // //         gsap.fromTo(
// // //           `.image-${index}`,
// // //           { y: 100, opacity: 0, x: index % 2 === 0 ? -100 : 100 },
// // //           {
// // //             y: 0,
// // //             x: 0,
// // //             opacity: 1,
// // //             duration: 1.5,
// // //             ease: "power3.out",
// // //             scrollTrigger: {
// // //               trigger: `.image-${index}`,
// // //               start: "top bottom",
// // //               end: "top center",
// // //               scrub: true
// // //             }
// // //           }
// // //         );
// // //       });
// // //     }
// // //   }, []);

// // //   return (
// // //     <section
// // //       ref={meterRef}
// // //       style={{ height: "120vh" }}
// // //       className="relative flex flex-col items-center justify-center w-full overflow-hidden"
// // //     >
// // //       <div className="relative z-10 text-center">
// // //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// // //           Bypass all AI detection effortlessly with plag-free content
// // //         </h1>
// // //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// // //           {percentage}% AI Detected
// // //         </h1>
// // //         <h2 className="text-xl font-bold mb-4">AI Detection Meter</h2>
// // //         <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4 mx-auto">
// // //           <div
// // //             className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// // //             style={{ width: `${percentage}%` }}
// // //           ></div>
// // //         </div>
// // //         <p className="text-lg mb-8 mx-4">
// // //           Our AI detection tool is the best in the market, ensuring your content is free from plagiarism and AI detection. Experience seamless content creation with our advanced technology.
// // //         </p>
// // //       </div>

// // //       {/* Animated Screenshots */}
// // //       <div className="absolute inset-0 flex justify-between items-end">
// // //         {bypassScreenshot.map((src, index) => (
// // //           <img
// // //             key={index}
// // //             src={src}
// // //             alt={`Bypass ${index + 1}`}
// // //             className={`image-${index} absolute w-full max-w-xs h-auto object-cover`}
// // //             style={{
// // //               bottom: `${index * (60 / bypassScreenshot.length)}%`,
// // //               left: `${index % 2 === 0 ? '5%' : 'auto'}`,
// // //               right: `${index % 2 !== 0 ? '5%' : 'auto'}`,
// // //               transform: `rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`,
// // //             }}
// // //           />
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default AIMeter;

// // import { useEffect, useState, useRef } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import { bypassScreenshot } from "./constants";

// // gsap.registerPlugin(ScrollTrigger);

// // const AIMeter = () => {
// //   const meterRef = useRef<HTMLDivElement | null>(null);
// //   const [percentage, setPercentage] = useState<number>(100);
// //   const [inView, setInView] = useState<boolean>(false);

// //   // Use IntersectionObserver to detect when the AI meter is in view
// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         if (entries[0].isIntersecting) {
// //           setInView(true); // Set inView to true when the section is visible
// //         }
// //       },
// //       { threshold: 0.5 } // Trigger when 50% of the component is in view
// //     );

// //     if (meterRef.current) {
// //       observer.observe(meterRef.current);
// //     }

// //     return () => {
// //       if (meterRef.current) {
// //         observer.unobserve(meterRef.current);
// //       }
// //     };
// //   }, []);

// //   // Trigger percentage countdown when in view
// //   useEffect(() => {
// //     let interval: NodeJS.Timeout | undefined;

// //     if (inView && percentage > 0) {
// //       interval = setInterval(() => {
// //         setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
// //       }, 100); // Adjusted interval for slower countdown
// //     }

// //     return () => clearInterval(interval);
// //   }, [inView, percentage]);

// //   // GSAP animation for each screenshot
// //   useEffect(() => {
// //     if (meterRef.current) {
// //       bypassScreenshot.forEach((_, index) => {
// //         gsap.fromTo(
// //           `.image-${index}`,
// //           { y: 100, opacity: 0, x: index % 2 === 0 ? -100 : 100 },
// //           {
// //             y: 0,
// //             x: 0,
// //             opacity: 1,
// //             duration: 1.5,
// //             ease: "power3.out",
// //             scrollTrigger: {
// //               trigger: `.image-${index}`,
// //               start: "top bottom",
// //               end: "top center",
// //               scrub: true
// //             }
// //           }
// //         );
// //       });
// //     }
// //   }, []);

// //   return (
// //     <section
// //       ref={meterRef}
// //       style={{ height: "120vh" }}
// //       className="relative flex flex-col items-center justify-center w-full overflow-hidden"
// //     >
// //       <div className="relative z-10 text-center">
// //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// //           Bypass all AI detection effortlessly with plag-free content
// //         </h1>
// //         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
// //           {percentage}% AI Detected
// //         </h1>
// //         <h2 className="text-xl font-bold mb-4">AI Detection Meter</h2>
// //         <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4 mx-auto">
// //           <div
// //             className="absolute top-0 left-0 h-full bg-green-500 transition-all"
// //             style={{ width: `${percentage}%` }}
// //           ></div>
// //         </div>
// //         <p className="text-lg mb-8 mx-4">
// //           Our AI detection tool is the best in the market, ensuring your content is free from plagiarism and AI detection. Experience seamless content creation with our advanced technology.
// //         </p>
// //       </div>

// //       {/* Animated Screenshots */}
// //       <div className="absolute inset-0 flex justify-between items-end">
// //         {bypassScreenshot.map((src, index) => (
// //           <img
// //             key={index}
// //             src={src}
// //             alt={`Bypass ${index + 1}`}
// //             className={`image-${index} absolute w-full max-w-xs h-auto object-cover`}
// //             style={{
// //               bottom: `${index * (60 / bypassScreenshot.length)}%`,
// //               left: `${index % 2 === 0 ? '5%' : 'auto'}`,
// //               right: `${index % 2 !== 0 ? '5%' : 'auto'}`,
// //               transform: `rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`,
// //             }}
// //           />
// //         ))}
// //       </div>
// //     </section>
// //   );
// // };

// // export default AIMeter;

// import { useEffect, useState, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { bypassScreenshot } from "./constants";

// gsap.registerPlugin(ScrollTrigger);

// const AIMeter = () => {
//   const meterRef = useRef<HTMLDivElement | null>(null);
//   const [percentage, setPercentage] = useState<number>(100);
//   const [inView, setInView] = useState<boolean>(false);

//   // Use IntersectionObserver to detect when the AI meter is in view
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setInView(true); // Set inView to true when the section is visible
//         }
//       },
//       { threshold: 0.5 } // Trigger when 50% of the component is in view
//     );

//     if (meterRef.current) {
//       observer.observe(meterRef.current);
//     }

//     return () => {
//       if (meterRef.current) {
//         observer.unobserve(meterRef.current);
//       }
//     };
//   }, []);

//   // Trigger percentage countdown when in view
//   useEffect(() => {
//     let interval: NodeJS.Timeout | undefined;

//     if (inView && percentage > 0) {
//       interval = setInterval(() => {
//         setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
//       }, 100); // Adjusted interval for slower countdown
//     }

//     return () => clearInterval(interval);
//   }, [inView, percentage]);

//   // GSAP animation for each screenshot
//   useEffect(() => {
//     if (meterRef.current) {
//       bypassScreenshot.forEach((_, index) => {
//         gsap.fromTo(
//           `.image-${index}`,
//           { y: 100, opacity: 0, x: index % 2 === 0 ? -100 : 100 },
//           {
//             y: 0,
//             x: 0,
//             opacity: 1,
//             duration: 1.5,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: `.image-${index}`,
//               start: "top bottom",
//               end: "top center",
//               scrub: true
//             }
//           }
//         );
//       });
//     }
//   }, []);

//   return (
//     <section
//       ref={meterRef}
//       style={{ height: "120vh" }}
//       className="relative flex flex-col items-center justify-center w-full overflow-hidden"
//     >
//       <div className="relative z-10 text-center">
//         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
//           Bypass all AI detection effortlessly with plag-free content
//         </h1>
//         <h1 className="text-4xl font-extrabold mb-8 leading-tight">
//           {percentage}% AI Detected
//         </h1>
//         <h2 className="text-xl font-bold mb-4">AI Detection Meter</h2>
//         <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4 mx-auto">
//           <div
//             className="absolute top-0 left-0 h-full bg-green-500 transition-all"
//             style={{ width: `${100 - percentage}%` }} // Inversely proportional width
//           ></div>
//         </div>
//         <p className="text-lg mb-8 mx-4">
//           Our AI detection tool is the best in the market, ensuring your content is free from plagiarism and AI detection. Experience seamless content creation with our advanced technology.
//         </p>
//       </div>

//       {/* Animated Screenshots */}
//       <div className="absolute inset-0 flex justify-between items-end">
//         {bypassScreenshot.map((src, index) => (
//           <img
//             key={index}
//             src={src}
//             alt={`Bypass ${index + 1}`}
//             className={`image-${index} absolute w-full max-w-xs h-auto object-cover`}
//             style={{
//               bottom: `${index * (60 / bypassScreenshot.length)}%`,
//               left: `${index % 2 === 0 ? '5%' : 'auto'}`,
//               right: `${index % 2 !== 0 ? '5%' : 'auto'}`,
//               transform: `rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`,
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default AIMeter;

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bypassScreenshot } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const AIMeter = () => {
  const meterRef = useRef<HTMLDivElement | null>(null);
  const [percentage, setPercentage] = useState<number>(100);
  const [inView, setInView] = useState<boolean>(false);

  // Use IntersectionObserver to detect when the AI meter is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true); // Set inView to true when the section is visible
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the component is in view
    );

    if (meterRef.current) {
      observer.observe(meterRef.current);
    }

    return () => {
      if (meterRef.current) {
        observer.unobserve(meterRef.current);
      }
    };
  }, []);

  // Trigger percentage countdown when in view
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (inView && percentage > 0) {
      interval = setInterval(() => {
        setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
      }, 100); // Adjusted interval for slower countdown
    }

    return () => clearInterval(interval);
  }, [inView, percentage]);

  // GSAP animation for each screenshot
  useEffect(() => {
    if (meterRef.current) {
      bypassScreenshot.forEach((_, index) => {
        gsap.fromTo(
          `.image-${index}`,
          { y: 100, opacity: 0, x: index % 2 === 0 ? -100 : 100 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.image-${index}`,
              start: "top bottom",
              end: "top center",
              scrub: true,
            },
          }
        );
      });
    }
  }, []);

  return (
    <section
      ref={meterRef}
      // style={{ height: "120vh" }}
      className=" md:h-[120vh] relative flex flex-col items-center justify-center w-full overflow-hidden"
    >
      <div className="md:relative md:z-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight">
          Bypass all AI detection effortlessly with plag-free content
        </h1>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight">
          {percentage}% AI Detected
        </h1>
        <h2 className="text-base md:text-xl font-bold mb-4">
          AI Detection Meter
        </h2>
        <div className="relative w-80 h-8 bg-gray-300 rounded-full overflow-hidden mb-4 mx-auto">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 transition-all"
            style={{ width: `${100 - percentage}%` }} // Inversely proportional width
          ></div>
        </div>
        <p className="text-lg mb-8 mx-auto max-w-md">
          Our AI detection tool is the best in the market, ensuring your content
          is free from plagiarism and AI detection. Experience seamless content
          creation with our advanced technology.
        </p>
      </div>

      {/* Animated Screenshots */}
      <div className="absolute inset-0 hidden md:flex justify-between items-start h-auto">
        {bypassScreenshot.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Bypass ${index + 1}`}
            className={`image-${index} absolute w-full max-w-xs  object-cover`}
            style={{
              bottom: `${index * (60 / bypassScreenshot.length)}%`,
              left: `${index % 2 === 0 ? "5%" : "auto"}`,
              right: `${index % 2 !== 0 ? "5%" : "auto"}`,
              transform: `rotate(${index % 2 === 0 ? "-10deg" : "10deg"})`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default AIMeter;
