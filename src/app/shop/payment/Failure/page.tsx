"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { FaExclamationTriangle, FaArrowRight } from "react-icons/fa";

export default function Page() {
    const [countdown, setCountdown] = useState<number>(10); // Countdown state
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Countdown timer for redirect
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    window.location.href = "/pricing"; // Redirect to pricing page
                    return prev;
                }
                return prev - 1;
            });
        }, 1000);

        // Animate the card with GSAP
        gsap.fromTo(cardRef.current, 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        return () => {
            clearInterval(timer); // Cleanup timer on unmount
        };
    }, []);

    return (
        <main className="flex flex-col items-center justify-center w-screen h-screen bg-black p-8">
            <div 
                ref={cardRef}
                className="bg-red-600 rounded-lg shadow-lg p-8 max-w-md w-full text-center"
            >
                <FaExclamationTriangle className="text-white h-16 w-16 mx-auto mb-4" />
                <h1 className="mb-4 text-3xl font-bold text-white">Transaction Canceled</h1>
                <p className="text-lg text-white mb-4">
                    An error occurred during your transaction. If you bought and money was deducted but credit was not added, please contact us at 
                    <a href="mailto:contact@noaigpt.com" className="text-blue-200 underline"> contact@noaigpt.com</a> or on Discord.
                </p>
                <p className="text-white mb-4">
                    You will be redirected to the pricing page in {countdown} seconds...
                </p>
                
                {/* Pricing Page Button */}
                <a 
                    href="/pricing"
                    className="flex items-center justify-center mt-4 px-4 py-2 bg-white text-red-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition duration-300"
                >
                    <FaArrowRight className="mr-2" />
                    Go to Pricing Page
                </a>

                {/* Additional Information */}
                <div className="mt-6 text-gray-200">
                    <p>If you have any questions or need further assistance, feel free to reach out!</p>
                    <p>Thank you for your understanding.</p>
                </div>
            </div>
        </main>
    );
}