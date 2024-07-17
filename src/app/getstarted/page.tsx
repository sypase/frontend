'use client';
import React from "react";
import Link from "next/link";
import { FaInstagram, FaDiscord } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <nav className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-xl rounded-3xl mt-8 mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-black">NoaiGPT</span>
              </div>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                <Link href="/">
                  <span className="text-gray-800 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-300 hover:scale-105 transform rounded-md">
                    Home
                  </span>
                </Link>
                <Link href="/pricing">
                  <span className="text-gray-800 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-300 hover:scale-105 transform rounded-md">
                    Pricing
                  </span>
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <a
                href="https://www.instagram.com/your_instagram_handle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition duration-300 hover:scale-105 transform mr-6"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://discord.gg/your_discord_invite"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition duration-300 hover:scale-105 transform mr-8"
              >
                <FaDiscord className="h-6 w-6" />
              </a>
              <Link href="/signup">
                <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition duration-300 transform hover:scale-105 shadow-md">
                  Get Started
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/OPnCbbLYPV4?autoplay=1&mute=1&controls=0&loop=1&playlist=OPnCbbLYPV4"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
          <div className="mt-12 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Welcome to NoaiGPT
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500 sm:max-w-3xl">
              Discover the power of AI-driven content creation and optimization.
            </p>
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold mb-8">
              What you can do with NoaiGPT
            </h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 h-full transition duration-300 ease-in-out border-2 border-transparent hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30">
                  <h3 className="text-xl font-bold mb-4 text-purple-600">
                    Paraphrasing of text
                  </h3>
                  <p className="text-gray-600">
                    Efficiently rephrase and restructure your text while
                    maintaining its original meaning.
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 h-full transition duration-300 ease-in-out border-2 border-transparent hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                  <h3 className="text-xl font-bold mb-4 text-blue-600">
                    AI and plagiarism check
                  </h3>
                  <p className="text-gray-600">
                    Ensure the originality of your content with our advanced
                    AI-powered plagiarism detection.
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 h-full transition duration-300 ease-in-out border-2 border-transparent hover:border-green-500 hover:shadow-lg hover:shadow-green-500/30">
                  <h3 className="text-xl font-bold mb-4 text-green-600">
                    AI text conversion
                  </h3>
                  <p className="text-gray-600">
                    Transform AI-generated texts into human-like content,
                    bypassing major checkers like Turnitin, Copyleaks, GPT-3
                    Checker, and more.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">
                Bypass most AI detectors like a pro
              </h3>
              <div className="flex flex-wrap justify-center items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGxxlcvSEtPuWa9QRR61InmEx77wcj-rfWnh0tUHFd8g&s"
                  alt="Copyleaks Logo"
                  className="h-12 mx-4 mb-4"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Header_gptzero_logo.svg/2560px-Header_gptzero_logo.svg.png"
                  alt="GPTZero Logo"
                  className="h-12 mx-4 mb-4"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Turnitin_logo_%282021%29.svg/1024px-Turnitin_logo_%282021%29.svg.png"
                  alt="Turnitin Logo"
                  className="h-12 mx-4 mb-4"
                />
                <img
                  src="https://www.datocms-assets.com/96965/1709053054-ai-apps-originality-logo.jpeg"
                  alt="Originality.ai Logo"
                  className="h-12 mx-4 mb-4"
                />
              </div>
            </div>
          </div>


        </div>
      </main>
      <footer className="bg-white shadow-lg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
              <span className="text-xl font-bold text-black">NoaiGPT</span>
              <p className="mt-2 text-gray-600">
                &copy; {new Date().getFullYear()} NoaiGPT. All rights reserved.
              </p>
            </div>
            <div className="w-full sm:w-auto text-center sm:text-right">
              <div className="flex justify-center sm:justify-end space-x-6">
                <a
                  href="https://www.instagram.com/your_instagram_handle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 transition duration-300"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a
                  href="https://discord.gg/your_discord_invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 transition duration-300"
                >
                  <FaDiscord className="h-6 w-6" />
                </a>
              </div>
              <div className="mt-4">
                <Link href="/terms">
                  <span className="text-gray-600 hover:text-gray-900 transition duration-300 mr-4">
                    Terms of Service
                  </span>
                </Link>
                <Link href="/privacy">
                  <span className="text-gray-600 hover:text-gray-900 transition duration-300">
                    Privacy Policy
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;