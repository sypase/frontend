"use client";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "/";
        }, 3000); // Redirect after 5 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4 overflow-hidden">
            <div className="bg-white p-10 rounded-lg shadow-lg animate-fade-in">
                <p className="mb-5 font-semibold text-3xl text-center text-gray-800 animate-bounce">
                    Payment Successful
                </p>
                <p className="text-lg text-center text-gray-700">
                    Thanks for purchasing!
                </p>
            </div>
        </main>
    );
}