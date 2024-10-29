
import React, { useState } from 'react';
import { FiCopy, FiRefreshCw } from "react-icons/fi";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
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
  onVariantChange 
}) => {
  const [localVariantIndex, setLocalVariantIndex] = useState<number>(message.variantIndex || 0);

  const handleVariantChange = (index: number) => {
    setLocalVariantIndex(index);
    onVariantChange(message.id, index);
  };

  return (
    <div className={`p-6 rounded-lg ${message.sender === "user" ? "bg-indigo-50" : "bg-white"} shadow-md transition-all duration-300 hover:shadow-lg`}>
      <p className="text-sm text-gray-800 mb-4 leading-relaxed">
        {message.variants?.[localVariantIndex]?.text || message.text}
      </p>
      {message.sender === "bot" && message.variants && message.variants.length > 0 && (
        <div className="flex justify-between items-center text-xs mt-4">
          <div className="flex space-x-4">
            <button 
              onClick={() => redoMessage(message.originalInput || "")} 
              className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
            >
              <FiRefreshCw className="mr-1" /> Redo
            </button>
            <button 
              onClick={() => copyToClipboard(message.variants?.[localVariantIndex]?.text || "")} 
              className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
            >
              <FiCopy className="mr-1" /> Copy
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleVariantChange((localVariantIndex - 1 + message.variants!.length) % message.variants!.length)} 
              className="text-indigo-500 hover:text-indigo-700 p-1"
            >
              ←
            </button>
            <span className="text-indigo-500 font-medium">
              {localVariantIndex + 1}/{message.variants.length}
            </span>
            <button 
              onClick={() => handleVariantChange((localVariantIndex + 1) % message.variants!.length)} 
              className="text-indigo-500 hover:text-indigo-700 p-1"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageComponent;