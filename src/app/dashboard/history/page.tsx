"use client"
import axios from "axios";
import React, { useEffect, useState } from "react"
import { CarouselDApiDemo } from "@/components/ui/CarouselDApiDemo"
import { Card, CardContent } from "@/components/ui/card"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import Header from "../../header";
import { serverURL } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";

interface Variant {
  id: number
  text: string
}

interface Message {
  id: string
  sender: string
  text: string
  originalInput: string
  variants: Variant[]
}

interface HeaderProps {
  onShowSignupForm?: () => void;
}
interface User {
  name: string;
  email: string;
  credits: number;
  referralCode: string;
}

const HistoryPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([])
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [rewriteCount, setRewriteCount] = useState<number>(-1);


  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    const config = {
      method: "GET",
      url: `${serverURL}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios(config);
      setUser(response.data.user);
    } catch (error) {
    }
  };
  
  useEffect(() => {
    getUser();
    const storedMessages = localStorage.getItem("messageHistory")
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }, [])

  
  const getRewrites = async () => {
    try {
      const response = await axios.get(`${serverURL}/bypass/rewrites`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRewriteCount(response.data.rewrites);
    } catch (error) {
      console.error("Error fetching rewrites:", error);
      toast.error("Failed to load rewrite count.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<{ user: User }>(`${serverURL}/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data.");
        setLoading(false);
      }
    };
    fetchUserData();
    getRewrites();
  }, []);

  const botMessages = Array.from(
    new Map(
      messages
        .filter((message) => message.sender === "bot")
        .map((message) => [message.id, message])
    ).values()
  ).sort((a, b) => (a.id < b.id ? -1 : 1))

  const clearHistory = () => {
    setMessages([])
    localStorage.removeItem("messageHistory")
    setShowConfirmation(false)
  }

  const exportMessage = (message: Message) => {
    const variantsText = message.variants
      .map((variant, index) => `Variant ${index + 1}:\n${variant.text}`)
      .join("\n\n")
    const exportText = `Original Input:\n${message.originalInput}\n\n${variantsText}`
    const element = document.createElement("a")
    const file = new Blob([exportText], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `message_${message.id}.txt`
    document.body.appendChild(element)
    element.click()
  }

  const exportAllMessages = async () => {
    const zip = new JSZip()
    botMessages.forEach((message) => {
      const variantsText = message.variants
        .map((variant, index) => `Variant ${index + 1}:\n${variant.text}`)
        .join("\n\n")
      const exportText = `Original Input:\n${message.originalInput}\n\n${variantsText}`
      zip.file(`message_${message.id}.txt`, exportText)
    })
    const content = await zip.generateAsync({ type: "blob" })
    saveAs(content, "all_messages.zip")
  }
  
  return (   
    <>
      <Header />
      
      <div className="bg-black min-h-screen font-sans text-white">
        <main className="pt-9 pb-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row max-w-7xl justify-between items-center px-20 py-4 mt-20 pt-10 mx-4 md:mx-8 lg:mx-16">
            <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">Documents History</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmation(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Clear History
              </button>
              <button
                onClick={exportAllMessages}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2a1 1 0 000 2h10a1 1 0 100-2H5zm0 4a1 1 0 000 2h10a1 1 0 100-2H5zm0 4a1 1 0 000 2h10a1 1 0 100-2H5z"
                    clipRule="evenodd"
                  />
                </svg>
                Export All
              </button>
            </div>
          </div>

          <div className="max-w-7xl justify-center px-20 mx-4 md:mx-8 lg:mx-16">
            {botMessages.length === 0 ? (
              <div className="bg-[#1e2532] rounded-lg p-6" role="alert">
                <p className="font-bold text-white text-xl mb-2">No messages found</p>
                <p className="text-gray-400">There are no bot messages in the history.</p>
              </div>
            ) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {botMessages.map((message) => (
    <div
      key={message.id} // This ensures that each message gets its own unique box.
      className="bg-gray-800 text-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition duration-300"
      onClick={() => setSelectedMessage(message)} // Handle the selection of a message.
    >
      <h2 className="text-lg font-semibold mb-2">
        {message.originalInput.slice(0, 35)}...
      </h2>
      <p className="text-gray-400 mb-2 line-clamp-3">{message.text}</p>
      <p className="text-gray-500 text-sm italic">Click to see full details.</p>
    </div>
  ))}
</div>

            )}
          </div>
          
          {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 mx-4">
              <div className="bg-gray-800 text-white p-6 rounded-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Confirm Clear History</h2>
                <p className="mb-6">
                  Are you sure you want to clear the bot message history? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={clearHistory}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Clear History
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedMessage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 mx-4">
              <div className="bg-gray-800 text-white rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col px-4">
                <div className="p-6 flex-grow overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-4">Message Details</h2>
                  <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-300 mb-2">Original Input:</label>
                    <Card className="bg-gray-800 text-white shadow-lg rounded-md w-full">
                      <CardContent className="flex items-center justify-center p-2">
                        <span className="text-lg m-0">{selectedMessage.originalInput}</span>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-300 mb-2">Variants:</label>
                    <CarouselDApiDemo variants={selectedMessage.variants} />
                  </div>
                </div>
                <div className="p-6 border-t border-gray-700">
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => exportMessage(selectedMessage)}
                      className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <ToastContainer position="bottom-right" />
        </main>
      </div>
    </>
  )
}

export default HistoryPage;