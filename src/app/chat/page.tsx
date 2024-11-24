"use client";
import axios from "axios";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { appName, serverURL } from "@/utils/utils";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  FiPlus,
  FiMoreHorizontal,
  FiSettings,
  FiUser,
  FiLogOut,
  FiCopy,
  FiMoon,
  FiType,
  FiShoppingCart,
  FiShoppingBag,
  FiPackage,
  FiArrowRight,
} from "react-icons/fi";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function countWords(str: string) {
  if (str.trim().length === 0) {
    return 0; // Return 0 for empty strings
  }
  const words = str.trim().split(/\s+/);
  return words.length;
}

function calculateCredits(score: number) {
  if (score === 0) {
    return 0; // Return 0 for no words
  }
  if (score >= 1 && score <= 149) {
    return 1;
  } else if (score >= 150 && score <= 249) {
    return 2;
  } else if (score >= 250 && score <= 349) {
    return 3;
  } else {
    const creditsBase = 3;
    const scoreRange = 100;
    const creditsIncrement = Math.floor((score - 249) / scoreRange);
    return creditsBase + creditsIncrement;
  }
}

export default function Home() {
  const [text, setText] = useState<string>("");
  const [tone, setTone] = useState<number>(0);
  const [length, setLength] = useState<number>(1);
  const [rewritesCount, setRewritesCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [rewrites, setRewrites] = useState<string[]>([]);
  const [expirationDate, setExpirationDate] = useState<string | null>(null);
  const rewritesModalRef = useRef<null | HTMLLabelElement>(null);
  const [user, setUser] = useState<any>({});
  const [wordCount, setWordCount] = useState<number>(0);
  const [credits, setCredits] = useState<number>(0);
  const [rewriteCount, setRewriteCount] = useState<number>(-1);
  const [theme, setTheme] = useState<null | any | string>("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleDarkMode = (x: any) => {
    if (x.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const getRewrites = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/rewordai/rewrites`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setRewriteCount(response.data.rewrites);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  const getExpirationDate = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/rewordai/userExpirationDate`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setExpirationDate(response.data.expirationDate);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  const getUser = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/users`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  const rewrite = async () => {
    if (text.length < 3 || loading) return;

    setLoading(true);
    const config = {
      method: "POST",
      url: `${serverURL}/rewordai/rewrite`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        text: text,
        tone: tone,
      },
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setRewrites([response.data.output]);
        getRewrites();
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  useEffect(() => {
    getRewrites();
    getExpirationDate();
    getUser();

    if (typeof window !== "undefined") {
      setTheme(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
      );
      if (!localStorage.getItem("token")) {
        window.location.href = "/signup";
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme!);
    const localTheme: string = localStorage.getItem("theme")!.toString();
    document.querySelector("html")!.setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setText((prevText) => event.target.value);
    calculateWordCountAndCredits(event.target.value);
  };

  const calculateWordCountAndCredits = (text: string) => {
    const wordCount = countWords(text);
    const credits = calculateCredits(wordCount);
    setWordCount(wordCount);
    setCredits(credits);
  };

  return (
    <main
      className={`flex-col ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100"
      } h-screen w-screen p-5 max-sm:p-0 relative`}
    >
      <div className="flex justify-between items-center w-full mb-8">
        <div>
          <p
            className={`font-semibold text-3xl max-sm:text-2xl ${
              theme === "dark" ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            NoaiGPT✦
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/humanizer"
            className={`${
              theme === "dark"
                ? "text-indigo-400 hover:text-indigo-200"
                : "text-indigo-600 hover:text-indigo-800"
            } hover:underline transition-colors`}
          >
            <span className="flex items-center">
              Humanizer+Paraphraser{" "}
              <FiArrowRight className="ml-1 opacity-0 transition-opacity hover:opacity-100" />
            </span>
          </Link>
          <Link
            href="/checksimilarity"
            className={`${
              theme === "dark"
                ? "text-indigo-400 hover:text-indigo-200"
                : "text-indigo-600 hover:text-indigo-800"
            } hover:underline transition-colors`}
          >
            <span className="flex items-center">
              SimilarityCheck{" "}
              <FiArrowRight className="ml-1 opacity-0 transition-opacity hover:opacity-100" />
            </span>
          </Link>
          <Link
            href="/aichecker"
            className={`${
              theme === "dark"
                ? "text-indigo-400 hover:text-indigo-200"
                : "text-indigo-600 hover:text-indigo-800"
            } hover:underline transition-colors`}
          >
            <span className="flex items-center">
              AI Checker{" "}
              <FiArrowRight className="ml-1 opacity-0 transition-opacity hover:opacity-100" />
            </span>
          </Link>

          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className={`flex items-center cursor-pointer ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-purple-100"
              } p-2 rounded-lg`}
            >
              <div className="avatar placeholder mr-2">
                <div
                  className={`${
                    theme === "dark" ? "bg-indigo-400" : "bg-indigo-500"
                  } text-white mask mask-squircle w-10`}
                >
                  <span>
                    <FiUser />
                  </span>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {user?.name}
              </p>
            </label>
            <ul
              tabIndex={0}
              className={`dropdown-content menu p-2 shadow ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } rounded-box w-52 mt-2`}
            >
              <label htmlFor="settings_modal">
                <li className="flex">
                  <p
                    className={
                      theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                    }
                  >
                    <FiSettings className="mr-2" />
                    Settings
                  </p>
                </li>
              </label>
              <Link href="/shop">
                <label>
                  <li className="flex">
                    <p
                      className={
                        theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                      }
                    >
                      <FiShoppingCart className="mr-2" />
                      Shop
                    </p>
                  </li>
                </label>
              </Link>
              <Link href="/orders">
                <label>
                  <li className="flex">
                    <p
                      className={
                        theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                      }
                    >
                      <FiPackage className="mr-2" /> My Orders
                    </p>
                  </li>
                </label>
              </Link>
              <Link href="/purchases">
                <label>
                  <li className="flex">
                    <p
                      className={
                        theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                      }
                    >
                      <FiShoppingBag className="mr-2" />
                      My Purchases
                    </p>
                  </li>
                </label>
              </Link>
              <hr
                className={`my-2 ${
                  theme === "dark" ? "border-gray-700" : "border-purple-200"
                }`}
              />
              <li
                className="flex"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              >
                <p className="text-red-500">
                  <FiLogOut className="mr-2" />
                  Logout
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <div
          className={`flex flex-col mx-auto my-8 ml-8 mr-8 p-5 w-full h-full rounded-lg 2xl:items-center max-sm:ml-2 max-sm:mr-2 max-sm:my-4 max-sm:p-2 border-2 ${
            theme === "dark"
              ? "border-gray-700 bg-gray-800"
              : "border-purple-200 bg-white"
          } shadow-md`}
        >
          <div className="flex mb-4 items-center max-sm:flex-wrap">
            <p
              className={`mr-2 font-semibold ${
                theme === "dark" ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              Level:{" "}
            </p>
            {["Basic", "Normal", "Advanced"].map((e, i: number) => (
              <button
                key={e}
                className={`btn btn-sm mr-2 max-sm:mb-2 ${
                  tone === i
                    ? theme === "dark"
                      ? "bg-indigo-400 text-gray-900"
                      : "bg-indigo-500 text-white"
                    : theme === "dark"
                    ? "bg-gray-700 text-indigo-400 border-indigo-400"
                    : "bg-white text-indigo-600 border-indigo-500"
                }`}
                onClick={() => setTone(i)}
              >
                {e}
              </button>
            ))}
          </div>
          <div className="animate-fade-in-bottom flex w-full">
            <div className="flex w-1/2 max-sm:w-full mr-4">
              <div className="flex flex-col w-full">
                <textarea
                  className={`${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-purple-50 text-gray-800"
                  } text-md h-[35vh] p-4 rounded-lg outline-none border-2 ${
                    theme === "dark"
                      ? "border-gray-600 focus:border-indigo-400"
                      : "border-purple-200 focus:border-indigo-500"
                  } shadow-md resize-none`}
                  onChange={handleTextAreaChange}
                  value={text}
                  placeholder="Write or paste your text here..."
                  autoFocus
                ></textarea>
                <div className="mt-3 flex items-center max-sm:flex-wrap">
                  <p
                    className={`mr-4 text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Word Count: {wordCount}
                      </p>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Credits Cost: {credits}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center max-sm:flex-col">
                      <button
                        className={`btn ${
                          theme === "dark"
                            ? "bg-indigo-400 text-gray-900"
                            : "bg-indigo-500 text-white"
                        } max-sm:w-full max-sm:mb-3 ${
                          text.length < 3 || loading ? "opacity-50" : ""
                        }`}
                        onClick={() => rewrite()}
                      >
                        {loading ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          " "
                        )}
                        Humanize
                      </button>
                      {rewriteCount !== -1 ? (
                        <p
                          className={`mt-3 ml-4 text-sm ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {rewriteCount} credits left
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex w-1/2 max-sm:w-full">
                  <div className="flex flex-col w-full">
                    <div
                      className={`${
                        theme === "dark" ? "bg-gray-800" : "bg-white"
                      } h-[35vh] p-4 rounded-lg overflow-y-auto border-2 ${
                        theme === "dark"
                          ? "border-gray-700"
                          : "border-purple-200"
                      } shadow-md`}
                    >
                      {loading ? (
                        <Skeleton count={5} />
                      ) : (
                        rewrites.map((e, i) => (
                          <div
                            key={i}
                            className={`mb-4 p-2 rounded-md ${
                              theme === "dark"
                                ? "bg-gray-700"
                                : "bg-purple-50"
                            } shadow-md border-2 ${
                              theme === "dark"
                                ? "border-indigo-400"
                                : "border-indigo-500"
                            }`}
                          >
                            <p>{e}</p>
                            <button
                              className={`btn btn-sm ${
                                theme === "dark"
                                  ? "bg-indigo-400 text-gray-900"
                                  : "bg-indigo-500 text-white"
                              } mt-2`}
                              onClick={() => {
                                navigator.clipboard.writeText(e);
                                toast.success("Copied to clipboard!");
                              }}
                            >
                              <FiCopy className="mr-2" />
                              Copy
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          <input type="checkbox" id="settings_modal" className="modal-toggle" />
          <div className="modal">
            <div
              className={`modal-box max-sm:w-full ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3
                className={`flex items-center font-bold text-lg ${
                  theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                <FiSettings className="mr-2" /> Settings
              </h3>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <p
                    className={`flex items-center py-4 ${
                      theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    <FiMoon className="mr-2" />
                    Dark Theme
                  </p>
                  <input
                    type="checkbox"
                    className={`toggle ${
                      theme === "dark" ? "bg-indigo-400" : "bg-indigo-500"
                    }`}
                    checked={theme === "dark"}
                    onChange={(x) => toggleDarkMode(x)}
                  />
                </label>
              </div>
              <div className="modal-action">
                <label
                  htmlFor="settings_modal"
                  className={`btn ${
                    theme === "dark"
                      ? "bg-indigo-400 text-gray-900"
                      : "bg-indigo-500 text-white"
                  }`}
                >
                  Close
                </label>
              </div>
            </div>
            <label className="modal-backdrop" htmlFor="settings_modal">
              Cancel
            </label>
          </div>
          <ToastContainer />
        </main>
      );
    }