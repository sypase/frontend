"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { appName, serverURL } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import VerticalCarousel from "../signup/VerticalCarousel";

export default function Home() {
  const [theme, setTheme] = useState<null | any | string>("light");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
      );
      if (localStorage.getItem("token")) {
        window.location.href = "/chat";
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme: string = localStorage.getItem("theme")!.toString();
    document.querySelector("html")!.setAttribute("data-theme", localTheme);
  }, [theme]);

  const login = async () => {
    const config = {
      method: "POST",
      url: `${serverURL}/users/login`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        email: email,
        password: password,
      },
    };

    axios(config)
      .then((response) => {
        toast.success("Logged In!");
        localStorage.setItem("token", response.data.token);
        window.location.href =
          response.data.user.type === "admin" ? "/admin" : "/";
      })
      .catch((error) => {
        console.log(error);
        toast.error("Email or Password is wrong");
      });
  };

  return (
    <main className="w-screen h-screen bg-base-100 flex flex-col items-center justify-center p-2 overflow-hidden">
      <div className="absolute top-0 left-0 p-4 mx-4 my-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">NoaiGPTχ</h1>
        </div>
      </div>
      <VerticalCarousel />
      <div className="animate-fade-in-bottom flex flex-col w-full max-w-md rounded-xl p-10 border border-gray-300">
        <p className="font-bold text-xl mb-4">Enter your personal or work email</p>
        <input
          className="input input-bordered mb-4 w-full"
          placeholder="Enter your email"
          type="text"
          onChange={(x) => setEmail(x.target.value)}
          value={email}
        />
        <p className="text-sm mb-1">Password</p>
        <input
          className="input input-bordered mb-5 w-full"
          placeholder="Password"
          type="password"
          onChange={(x) => setPassword(x.target.value)}
          value={password}
        />
        <button className="btn btn-primary w-full mb-4" onClick={() => login()}>
          Login
        </button>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"}>
              <span className="link link-primary">Sign up</span>
            </Link>
          </p>
          <Link href="/forgotpassword" className="text-primary font-medium">
            Forgot Password?
          </Link>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}