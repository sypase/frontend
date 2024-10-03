"use client"
import React, { useEffect, useState } from "react";

interface Variant {
  id: number;
  text: string;
}

interface Message {
  id: string;
  sender: string;
  text: string;
  originalInput: string;
  variants: Variant[];
}

const HistoryPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [currentVariantIndex, setCurrentVariantIndex] = useState<number>(0);

  useEffect(() => {
    const storedMessages = localStorage.getItem("messageHistory");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const botMessages = messages
    .filter((message) => message.sender === "bot")
    .sort((a, b) => (a.id < b.id ? -1 : 1));

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem("messageHistory");
    setShowConfirmation(false);
  };

  const handleNextVariant = () => {
    if (selectedMessage && currentVariantIndex < selectedMessage.variants.length - 1) {
      setCurrentVariantIndex((prev) => prev + 1);
    }
  };

  const handlePreviousVariant = () => {
    if (selectedMessage && currentVariantIndex > 0) {
      setCurrentVariantIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Bot Message History</h1>
          <button
            onClick={() => setShowConfirmation(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Clear History
          </button>
        </div>

        {botMessages.length === 0 ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <p className="font-bold">No messages found</p>
            <p>There are no bot messages in the history.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {botMessages.map((message) => (
              <div
                key={message.id}
                className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => {
                  setSelectedMessage(message);
                  setCurrentVariantIndex(0);
                }}
              >
                <h2 className="text-lg font-semibold mb-2">Message ID: {message.id}</h2>
                <p className="text-gray-600 mb-2 line-clamp-3">{message.text}</p>
                <p className="text-gray-400 text-sm italic">
                  Original input: {message.originalInput.slice(0, 50)}...
                </p>
              </div>
            ))}
          </div>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Confirm Clear History</h2>
              <p className="mb-6">Are you sure you want to clear the bot message history? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="p-6 flex-grow overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Message Details</h2>
                <div className="mb-4">
                  <label className="block text-lg font-medium text-gray-700 mb-2">Original Input:</label>
                  <div className="bg-gray-50 p-4 rounded-md h-48 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm break-words">
                      {selectedMessage.originalInput}
                    </pre>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-medium text-gray-700 mb-2">Variant:</label>
                  <div className="bg-gray-50 p-4 rounded-md h-48 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm break-words">
                      {selectedMessage.variants[currentVariantIndex].text}
                    </pre>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePreviousVariant}
                    disabled={currentVariantIndex === 0}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-500">
                    Variant {currentVariantIndex + 1} of {selectedMessage.variants.length}
                  </span>
                  <button
                    onClick={handleNextVariant}
                    disabled={currentVariantIndex === selectedMessage.variants.length - 1}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="p-6 border-t">
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;