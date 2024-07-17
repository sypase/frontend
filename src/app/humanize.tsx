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
  FiFileText,
  FiEdit,
  FiTrash,
  FiMenu,
  FiArrowRight,
  FiShoppingCart,
  FiShoppingBag,
  FiPackage,
} from "react-icons/fi";

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
  const moreModalRef = useRef<null | HTMLLabelElement>(null);
  const newDocumentModalRef = useRef<null | HTMLLabelElement>(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState<boolean>(false);
  const [generateTextWithAIPrompt, setGenerateTextWithAIPrompt] =
    useState<string>("");
  const [user, setUser] = useState<any>({});
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number>(0);
  const [credits, setCredits] = useState<number>(0);

  //Documents
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<number>(-1);
  const [newDocumentTitle, setNewDocumentTitle] = useState<string>("");
  const [loadingDocument, setLoadingDocument] = useState<boolean>(false);
  const [creatingDocument, setCreatingDocument] = useState<boolean>(false);

  const getDocument = async (documentId: string) => {
    if (selectedDocument === -1 || !documentId) return;

    setLoadingDocument(true);
    const config = {
      method: "POST",
      url: `${serverURL}/documents/by-id`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        documentId: documentId,
      },
    };

    axios(config)
      .then((response) => {
        setLoadingDocument(false);
        setText(response.data.content ?? "");
        setTone(response.data.settings.tone ?? 0);
        setLength(response.data.settings.length ?? 1);
        setRewritesCount(response.data.settings.rewrites ?? 1);
      })
      .catch((error) => {
        setLoadingDocument(false);
      });
  };

  const getDocuments = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/documents/list`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setDocuments(response.data.documents);
        setUser(response.data.user);
        if (response.data.documents.length > 0) {
          setSelectedDocument(0);
        } else {
          setSelectedDocument(-1);
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch documents");
      });
  };

  const createDocument = async () => {
    if (!newDocumentTitle || creatingDocument || loadingDocument) return;
    setSelectedDocument(-1);
    setCreatingDocument(true);
    const config = {
      method: "POST",
      url: `${serverURL}/documents/create`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        title: newDocumentTitle,
      },
    };

    axios(config)
      .then((response) => {
        toast.success("Document created!");
        getDocuments();
        setSelectedDocument(0);
        setCreatingDocument(false);
        setLoadingDocument(false);
      })
      .catch((error) => {
        setNewDocumentTitle("");
        toast.error("Failed to create document!");
        setCreatingDocument(false);
        setLoadingDocument(false);
      });
  };

  const editDocument = async () => {
    const config = {
      method: "POST",
      url: `${serverURL}/documents/edit`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        documentId: documents[selectedDocument]?._id,
        title: newDocumentTitle,
      },
    };

    axios(config)
      .then((response) => {
        getDocuments();
        setNewDocumentTitle("");
        toast.success("Document edited!");
      })
      .catch((error) => {
        toast.error("Failed to edit document");
      });
  };

  const deleteDocument = async () => {
    const config = {
      method: "POST",
      url: `${serverURL}/documents/delete`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        documentId: documents[selectedDocument]?._id,
      },
    };

    axios(config)
      .then((response) => {
        getDocuments();
        setSelectedDocument(-1);
        toast.success("Document deleted!");
      })
      .catch((error) => {
        toast.error("Failed to delete document");
      });
  };

  const [theme, setTheme] = useState<null | any | string>("light");

  const toggleDarkMode = (x: any) => {
    if (x.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const [rewriteCount, setRewriteCount] = useState<number>(-1);

  // create get expiration daate

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
        console.log(response.data);
        
        console.log(response.data.output);

        setRewrites([response.data.output]);
        rewritesModalRef.current?.click();
        getRewrites();
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data) {
          // Display the error response data in a toast notification
          toast.error(error.response.data);
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  const doMore = async (type: number) => {
    const doMoreType = [
      "continue-writing",
      "summarise",
      "explain",
      "give-example",
      "counterargument",
      "define",
      "shorten",
      "expand",
    ][type];
    if (text.length < 3 || loading) return;

    setLoading(true);
    const config = {
      method: "POST",
      url: `${serverURL}/rewordai/${doMoreType}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        text: text,
        length: length,
      },
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setText(response.data);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something went wrong!");
      });
  };

  const generateTextWithAI = async () => {
    if (generateTextWithAIPrompt.length < 5 || loading) return;

    setLoading(true);
    const config = {
      method: "POST",
      url: `${serverURL}/rewordai/generate-text-with-ai`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        prompt: generateTextWithAIPrompt,
        length: length,
      },
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setText(response.data);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something went wrong!");
      });
  };

  const handleKeyDown = (event: any) => {
    if (event.altKey && event.key === "n") {
      console.log("New document");
      setNewDocumentTitle("");
      newDocumentModalRef.current?.click();
    }

    if (event.key === "Escape") {
      setSelectedDocument(-1);
    }
  };

  useEffect(() => {
    getRewrites();
    getDocuments();
    getExpirationDate();

    document.addEventListener("keydown", handleKeyDown);
    if (typeof window !== "undefined") {
      setTheme(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
      );
      if (!localStorage.getItem("token")) {
        window.location.href = "/login";
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme: string = localStorage.getItem("theme")!.toString();
    document.querySelector("html")!.setAttribute("data-theme", localTheme);
  }, [theme]);

  const autoSaveDocument = (documentId: string) => {
    if (!documentId) return;

    const config = {
      method: "POST",
      url: `${serverURL}/documents/save`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        documentId: documentId,
        content: text,
        tone: tone,
        length: length,
        rewrites: rewritesCount,
      },
    };

    axios(config);
  };

  //Autosave document
  useEffect(() => {
    if (selectedDocument === -1) return;
    const timer = setTimeout(() => {
      autoSaveDocument(documents[selectedDocument]?._id);
    }, 1000);
    return () => clearTimeout(timer);
  }, [text, tone, length, rewritesCount]);

  useEffect(() => {
    getDocument(documents[selectedDocument]?._id);
  }, [selectedDocument, documents]);

  // ... (other code)

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
  // ... (other code)

  return (
    <main
      className="flex bg-base-100 h-screen w-screen p-2 max-sm:p-0"
      onClick={() => {
        if (moreMenuOpen) setMoreMenuOpen(false);
      }}
    >
      {/* Sidebar */}
      <div
        className={
          "flex flex-col p-5 min-w-[275px] max-w-[15vw] h-full rounded-md " +
          (!showMenu
            ? "max-sm:hidden "
            : "max-sm:fixed max-sm:w-full max-sm:h-full max-sm:max-w-none bg-base-100 max-sm:z-50 ")
        }
      >
        <div className="flex justify-between items-center max-sm:mb-4">
          <p className="mb-5 font-semibold text-3xl max-sm:mb-3 max-sm:text-2xl">
            {appName} <Link href="/shop"></Link>
          </p>
          <div className="hidden max-sm:flex justify-end mb-3">
            <button
              className="btn btn-square btn-sm"
              onClick={() => setShowMenu(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <label
          className="btn btn-primary"
          htmlFor="newdocument_modal"
          onClick={() => setNewDocumentTitle("")}
        >
          <FiPlus /> NEW DOCUMENT
        </label>
        <div className="p-0 my-2 h-full w-full overflow-hidden hover:overflow-y-auto">
          {documents.map((document: any, i: number) => {
            return (
              <div
                key={i}
                className={
                  (selectedDocument === i
                    ? " bg-base-200 "
                    : " bg-transparent hover:bg-base-200 ") +
                  "cursor-pointer flex flex-col px-3 py-2 rounded-md w-full mb-1"
                }
                onClick={() => {
                  setSelectedDocument(i);
                  setShowMenu(false);
                }}
              >
                <div className="flex justify-start items-center">
                  <div className="w-fit mr-2">
                    <FiFileText />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-sm text-ellipsis line-clamp-1 font-semibold">
                      {document.title}
                    </p>
                  </div>
                </div>
                {selectedDocument === i ? (
                  <div className="flex mt-2">
                    <label
                      htmlFor="editdocument_modal"
                      className="cursor-pointer flex justify-center items-center w-full p-2 bg-base-300 rounded-md mr-1 hover:bg-gray-500 hover:text-white"
                      onClick={() => setNewDocumentTitle(documents[i].title)}
                    >
                      <FiEdit />
                      <p className="ml-2 text-xs">Edit</p>
                    </label>
                    <label
                      htmlFor="deletedocument_modal"
                      className="cursor-pointer flex justify-center items-center w-full p-2 bg-base-300 rounded-md hover:bg-red-500 hover:text-white"
                    >
                      <FiTrash />
                      <p className="ml-2 text-xs">Delete</p>
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
        <hr />
        <div className="flex items-center justify-between my-4">
          <p>
            {rewriteCount} rewrites left
            {/* {expirationDate && (
              <span>
                {" "}
                | Expires on: {new Date(expirationDate).toLocaleDateString()}
              </span>
            )} */}
          </p>
          <Link href="/shop">
            <button className="btn btn-sm">
              <FiShoppingCart /> SHOP
            </button>
          </Link>
        </div>
        <div className="flex items-center justify-between my-4">
          <p>
            {expirationDate && (
              <span>
                {" "}
                Expires on: {new Date(expirationDate).toLocaleDateString()}
              </span>
            )}
          </p>
        </div>
        {user?.type === "admin" ? (
          <Link href="/admin/dashboard">
            <label className="btn mb-2 w-full">
              <FiUser /> ADMIN PANEL <FiArrowRight />
            </label>
          </Link>
        ) : (
          ""
        )}
        <div
          tabIndex={0}
          className="cursor-pointer dropdown dropdown-top flex items-center hover:bg-base-200 p-2 rounded-lg"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="avatar placeholder mr-2">
                <div className="bg-blue-700 text-white mask mask-squircle w-10">
                  <span>
                    <FiUser />
                  </span>
                </div>
              </div>
              <p className="font-semibold">{user?.name}</p>
            </div>
            <FiMoreHorizontal />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2"
          >
            <label htmlFor="settings_modal">
              <li className="flex">
                <p>
                  <FiSettings />
                  Settings
                </p>
              </li>
            </label>
            <Link href="/shop">
              <label>
                <li className="flex">
                  <p>
                    <FiShoppingCart />
                    Shop
                  </p>
                </li>
              </label>
            </Link>
            <Link href="/orders">
              <label>
                <li className="flex">
                  <p>
                    <FiPackage /> My Orders
                  </p>
                </li>
              </label>
            </Link>
            <Link href="/purchases">
              <label>
                <li className="flex">
                  <p>
                    <FiShoppingBag />
                    My Purchases
                  </p>
                </li>
              </label>
            </Link>

            <hr className="my-2" />
            <li
              className="flex"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              <p>
                <FiLogOut className="text-red-600" />
                Logout
              </p>
            </li>
          </ul>
        </div>
      </div>
      {/* Main */}
      <div className="flex flex-col items-center justify-center ml-2 p-5 border-base-300 border-[1px] w-full h-full rounded-lg 2xl:items-center max-sm:ml-0 max-sm:border-none max-sm:p-2 max-sm:items-start max-sm:justify-start">
        {loadingDocument || creatingDocument ? (
          <div className="flex items-center">
            <span className="loading loading-spinner mr-4"></span>
            <p>{loadingDocument ? "Loading" : "Creating"} Document...</p>
          </div>
        ) : selectedDocument === -1 ? (
          <div className="select-none flex flex-col justify-center items-center w-full h-full">
            <p className="text-5xl font-semibold mb-2">{appName} </p>
            <p className="text-center">
              Create a new document or select an existing document to start
              rewriting!
            </p>
            <div className="flex flex-wrap justify-center mt-7">
              <div className="bg-base-300 rounded-lg p-4 hover:bg-base-200 max-w-xs m-2">
                <p className="font-semibold text-md mb-2">
                  ✨ AI Rewriting & Grammar Check
                </p>
                <p className="text-sm opacity-70">
                  Effortlessly enhance your writing with AI-powered rewriting
                  and precise grammar checking.
                </p>
              </div>
              <div className="bg-base-300 rounded-lg p-4 hover:bg-base-200 max-w-xs m-2">
                <p className="font-semibold text-md mb-2">
                  🎭 Rewrites in Custom Tones & Length
                </p>
                <p className="text-sm opacity-70">
                  Personalize your text with customizable rewrites in various
                  tones and lengths.
                </p>
              </div>
              <div className="bg-base-300 rounded-lg p-4 hover:bg-base-200 max-w-xs m-2">
                <p className="font-semibold text-md mb-2">
                  📝 Multiple Document Creation
                </p>
                <p className="text-sm opacity-70">
                  Seamlessly create and manage multiple documents for all your
                  writing needs.
                </p>
              </div>
            </div>
            <div className="flex mt-5">
              Press <kbd className="kbd kbd-sm mx-2">Alt</kbd> +{" "}
              <kbd className="kbd kbd-sm mx-2">N</kbd> to create a new document.
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-bottom flex flex-col w-full max-w-[50vw] max-sm:max-w-none">
            <div className="hidden max-sm:flex justify-end mb-3">
              <button
                className="btn btn-square"
                onClick={() => setSelectedDocument(-1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* <div className="flex mb-4 items-center max-sm:flex-wrap">
              <p className="mr-2 font-semibold">Level: </p>
              {["Basic", "Normal", "Advanced"].map((e, i: number) => {
                return (
                  <button
                    className={
                      "btn btn-sm mr-2 max-sm:mb-2 " +
                      (tone == i ? "btn-primary" : "")
                    }
                    onClick={() => setTone(i)}
                  >
                    {e}
                  </button>
                );
              })}
            </div> */}
            <div className="flex mb-4 items-center max-sm:flex-wrap">
              <p className="mr-2 font-semibold">Level: </p>
              {["Basic", "Normal", "Advanced"].map((e, i: number) => {
                return (
                  <button
                    key={e} // Assigning each string as the key
                    className={
                      "btn btn-sm mr-2 max-sm:mb-2 " +
                      (tone == i ? "btn-primary" : "")
                    }
                    onClick={() => setTone(i)}
                  >
                    {e}
                  </button>
                );
              })}
            </div>

            <p className="flex items-center font-semibold text-xl mb-1 mt-4">
              <FiFileText className="mr-2" />{" "}
              {documents[selectedDocument]?.title}
            </p>
            <textarea
              className="bg-base-100 mt-5 text-md min-h-[25vh] p-2 rounded-md outline-none border-2 border-base-300"
              onChange={handleTextAreaChange}
              value={text}
              placeholder="Write or paste your text here..."
              autoFocus
            ></textarea>
            <div className="mt-3 flex items-center">
              <p className="mr-4 text-sm text-gray-500">
                Word Count: {wordCount}
              </p>
              <p className="text-sm text-gray-500">Credits Cost: {credits}</p>
            </div>

            <div className="mt-7 flex items-center max-sm:flex-col">
              <button
                className={
                  "btn btn-primary max-sm:w-full max-sm:mb-3 " +
                  (text.length < 3 || loading ? "opacity-50" : "")
                }
                onClick={() => rewrite()}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  " "
                )}
                Humanize
              </button>
            </div>
            {rewriteCount !== -1 ? (
              <p className="mt-3 text-sm text-gray-500">
                {rewriteCount} credits lefts
              </p>
            ) : (
              ""
            )}
          </div>
        )}
        <label
          htmlFor="newdocument_modal"
          className="sm:hidden absolute right-5 bottom-5 btn btn-primary btn-square"
        >
          <FiPlus />
        </label>
        {selectedDocument === -1 ? (
          <button
            className="sm:hidden absolute left-5 top-5 btn btn-square"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FiMenu />
          </button>
        ) : (
          ""
        )}
        {/* New Document Modal */}
        <input
          type="checkbox"
          id="newdocument_modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="flex items-center font-bold text-lg">
              <FiFileText className="mr-1" /> New Document
            </h3>
            <p className="flex items-center py-4">
              <FiType className="mr-2" />
              Title
            </p>
            <input
              className="input input-bordered w-full"
              placeholder="What is this document about?"
              type="text"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  createDocument();
                  newDocumentModalRef.current?.click();
                }
              }}
              onChange={(x) => setNewDocumentTitle(x.target.value)}
              value={newDocumentTitle}
            />
            <div className="modal-action">
              <label htmlFor="newdocument_modal" className="btn">
                Cancel
              </label>
              <label
                htmlFor="newdocument_modal"
                className="btn btn-primary"
                onClick={() => createDocument()}
              >
                Create Document ✨
              </label>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="newdocument_modal">
            Cancel
          </label>
          <label
            ref={newDocumentModalRef}
            htmlFor="newdocument_modal"
            hidden
          ></label>
        </div>
        {/* Edit Document Modal */}
        <input
          type="checkbox"
          id="editdocument_modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="flex items-center font-bold text-lg">
              <FiEdit className="mr-1" /> Edit Document
            </h3>
            <p className="flex items-center py-4">
              <FiType className="mr-2" />
              Title
            </p>
            <input
              className="input input-bordered w-full"
              placeholder="What is this chat about?"
              type="text"
              onChange={(x) => setNewDocumentTitle(x.target.value)}
              value={newDocumentTitle}
            />
            <div className="modal-action">
              <label htmlFor="editdocument_modal" className="btn">
                Cancel
              </label>
              <label
                htmlFor="editdocument_modal"
                className="btn btn-primary"
                onClick={() => editDocument()}
              >
                Save
              </label>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="editdocument_modal">
            Cancel
          </label>
        </div>
        {/* Delete Document Modal */}
        <input
          type="checkbox"
          id="deletedocument_modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="flex items-center font-bold text-lg">
              <FiTrash className="mr-1" /> Delete Document
            </h3>
            <p className="py-4">Are you sure want to delete this document?</p>
            <div className="modal-action">
              <label htmlFor="deletedocument_modal" className="btn">
                Cancel
              </label>
              <label
                htmlFor="deletedocument_modal"
                className="btn btn-error"
                onClick={() => deleteDocument()}
              >
                Delete
              </label>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="deletedocument_modal">
            Cancel
          </label>
        </div>
        {/* Rewrites Modal */}
        <label ref={rewritesModalRef} htmlFor="rewrites_modal" hidden></label>
        <input type="checkbox" id="rewrites_modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
             NoaiGPT AI Bypass ({rewrites.length})
            </h3>
            <div className="max-h-[40vh] overflow-y-auto">
              {rewrites.map((e, i: number) => {
                return (
                  <div
                    key={i}
                    className="hover:bg-base-200 rounded-lg px-2 cursor-pointer"
                    onClick={() => {
                      setText(e);
                    }}
                  >
                    <p className="py-4">
                      {e}
                      <button
                        className="btn btn-sm ml-2"
                        onClick={() => {
                          navigator.clipboard.writeText(e);
                          toast.success("Copied to clipboard!");
                        }}
                      >
                        <FiCopy />
                      </button>
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="modal-action">
              <label htmlFor="rewrites_modal" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>
        {/* More Modal */}
        <input
          type="checkbox"
          id="generatetext_modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">✨ Generate Text with AI</h3>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Your AI prompt"
              onChange={(x) => setGenerateTextWithAIPrompt(x.target.value)}
              value={generateTextWithAIPrompt}
              autoFocus
            ></textarea>
            <div className="modal-action">
              <label htmlFor="generatetext_modal" className="btn">
                Close
              </label>
              <label
                htmlFor={
                  generateTextWithAIPrompt.length > 5
                    ? "generatetext_modal"
                    : ""
                }
                className={
                  "btn btn-primary " +
                  (generateTextWithAIPrompt.length < 5 ? "opacity-50" : "")
                }
                onClick={() => generateTextWithAI()}
              >
                ✨ Generate
              </label>
            </div>
          </div>
          <label
            ref={moreModalRef}
            className="modal-backdrop"
            htmlFor="generatetext_modal"
          >
            Close
          </label>
        </div>
        {/* Settings Modal */}
        <input type="checkbox" id="settings_modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="flex items-center font-bold text-lg">
              <FiSettings className="mr-1" /> Settings
            </h3>
            <div className="form-control">
              <label className="label cursor-pointer">
                <p className="flex items-center py-4">
                  <FiMoon className="mr-2" />
                  Dark Theme
                </p>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={theme === "dark"}
                  onChange={(x) => toggleDarkMode(x)}
                />
              </label>
            </div>
            <div className="modal-action">
              <label htmlFor="settings_modal" className="btn">
                Close
              </label>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="settings_modal">
            Cancel
          </label>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
