// page.tsx

"use client";
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { serverURL } from '@/utils/utils';
import { ToastContainer, toast } from 'react-toastify';

const Page = () => {
    const [email, setEmail] = useState<string>("");

    const resetPassword = async () => {
        try {
            const response = await axios.post(`${serverURL}/users/reset-password`, { email });
            toast.success("Reset password email sent successfully");
        } catch (error) {
            toast.error("Something went wrong while sending reset password email");
        }
    }

    return (
        <main className="w-screen h-screen bg-base-100 flex flex-col items-center justify-center p-2 overflow-hidden">
                  <div className="absolute top-0 left-0 p-4 mx-4 my-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">NoaiGPTχ</h1>
        </div>
      </div>
            <div className="animate-fade-in-bottom flex flex-col w-full max-w-md rounded-xl p-10 border border-gray-300">
                <p className="font-bold text-xl mb-3">Forgot Password</p>
                <p className="mb-5">Remembered your password? <Link href={'/login'}><span className="text-blue-500 cursor-pointer">Login</span></Link></p>
                <p className="text-sm mb-1">Email</p>
                <input className="input input-bordered mb-5 w-full" placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                <button className="btn btn-primary w-full" onClick={() => resetPassword()}>Send Reset Link</button>
            </div>
            <ToastContainer />
        </main>
    )
}

export default Page;
