"use client";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        window.location.href = "/";
    });

    return <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
        <p className="mb-5 font-semibold text-2xl max-sm:mb-3">Payment Successful</p>
    </main>
}

