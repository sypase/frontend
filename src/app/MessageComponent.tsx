


import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiRefreshCw } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

interface Message {
  id: number;
  text: string;
  sender: string;
  originalInput?: string;
  variants?: { text: string; score: number }[];
  variantIndex?: number;
}

interface MessageComponentProps {
  message: Message;
  copyToClipboard: (text: string) => void;
  redoMessage: (originalInput: string) => void;
  onVariantChange: (messageId: number, variantIndex: number) => void;
}

const MessageComponent: React.FC<MessageComponentProps> = ({
  message,
  copyToClipboard,
  redoMessage,
  onVariantChange,
}) => {
  const [localVariantIndex, setLocalVariantIndex] = useState<number>(
    message.variantIndex || 0
  );

  const handleVariantChange = (index: number) => {
    setLocalVariantIndex(index);
    onVariantChange(message.id, index);
  };

  const handleNextVariant = () => {
    if (message.variants) {
      const nextIndex = (localVariantIndex + 1) % message.variants.length;
      handleVariantChange(nextIndex);
    }
  };

  const handlePreviousVariant = () => {
    if (message.variants) {
      const prevIndex =
        (localVariantIndex - 1 + message.variants.length) %
        message.variants.length;
      handleVariantChange(prevIndex);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-xl ${
        message.sender === "user"
          ? "bg-gradient-to-r  text-gray-200 ml-auto"
          : "bg-gray-200  border-2	text-neutral-800"
      } max-w-[90%] w-full overflow-hidden`}
    >
      {message.sender === "bot" &&
        message.variants?.length &&
        message.variants.length > 0 && (
          <div className="space-y-4">
            <div
              className="text-sm overflow-y-auto max-h-64 leading-relaxed "
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.2px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {message.variants[localVariantIndex]?.text}
            </div>

            <div className="flex flex-wrap  justify-between items-center text-xs gap-2">
              <div className="flex items-center space-x-3 flex-wrap">
                {typeof message.variants[localVariantIndex]?.score ===
                  "number" && (
                  <div className="flex items-center space-x-1 bg-gray-200 px-2 py-1 rounded-full">
                    {message.variants[localVariantIndex]?.score >= 70 && (
                      <FaUser className="text-green-500" />
                    )}
                    <span
                      className={`font-semibold ${
                        message.variants[localVariantIndex]?.score <= 30
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      Human: {100-message.variants[localVariantIndex]?.score}%
                    </span>
                  </div>
                )}
                <button
                  onClick={() => redoMessage(message.originalInput || "")}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 flex items-center space-x-1"
                >
                  <FiRefreshCw size={14} />
                  <span>Redo</span>
                </button>
                <button
                  onClick={() =>
                    copyToClipboard(
                      message.variants?.[localVariantIndex]?.text ?? ""
                    )
                  }
                  className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 flex items-center space-x-1"
                >
                  <FiCopy size={14} />
                  <span>Copy</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousVariant}
                  className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full focus:outline-none hover:bg-indigo-200 transition-all"
                >
                  ←
                </button>
                <span className="font-semibold text-gray-700">
                  {`${localVariantIndex + 1}/${message.variants?.length}`}
                </span>
                <button
                  onClick={handleNextVariant}
                  className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full focus:outline-none hover:bg-indigo-200 transition-all"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}

      {message.sender !== "bot" && (
        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.2px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {message.text}
        </p>
      )}
    </motion.div>
  );
};

export default MessageComponent;