// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FiCopy, FiRefreshCw } from "react-icons/fi";
// import { FaUser } from "react-icons/fa";

// interface Message {
//   id: number;
//   text: string;
//   sender: string;
//   originalInput?: string;
//   variants?: { text: string; score: number }[];
//   variantIndex?: number;
// }

// interface MessageComponentProps {
//   message: Message;
//   copyToClipboard: (text: string) => void;
//   redoMessage: (originalInput: string) => void;
//   onVariantChange: (messageId: number, variantIndex: number) => void;
// }

// const MessageComponent: React.FC<MessageComponentProps> = ({
//   message,
//   copyToClipboard,
//   redoMessage,
//   onVariantChange,
// }) => {
//   const [localVariantIndex, setLocalVariantIndex] = useState<number>(
//     message.variantIndex || 0
//   );

//   const handleVariantChange = (index: number) => {
//     setLocalVariantIndex(index);
//     onVariantChange(message.id, index);
//   };

//   const handleNextVariant = () => {
//     if (message.variants) {
//       const nextIndex = (localVariantIndex + 1) % message.variants.length;
//       handleVariantChange(nextIndex);
//     }
//   };

//   const handlePreviousVariant = () => {
//     if (message.variants) {
//       const prevIndex =
//         (localVariantIndex - 1 + message.variants.length) %
//         message.variants.length;
//       handleVariantChange(prevIndex);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className={`p-4 rounded-xl shadow-xl ${
//         message.sender === "user"
//           ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white ml-auto"
//           : "bg-white text-gray-900 border "
//       } max-w-[90%] transform hover:scale-105 transition-all duration-300 z-10`}
//     >
//       {message.sender === "bot" && message.variants?.length && message.variants.length > 0 && (
//         <div>
//           <div className="flex justify-between items-center  mb-2">
//             <textarea
//               readOnly
//               value={message.variants[localVariantIndex]?.text ?? ""}
//               className="w-full h-64 p-4 border rounded-lg resize-none overflow-y-auto bg-gray-100 shadow-inner"
//               style={{
//                 fontFamily: "'Inter', sans-serif",
//                 letterSpacing: "0.5px",
//                 borderColor: "#E5E7EB",
//               }}
//             />
//           </div>

//           <div className="flex justify-between items-center mt-2">
//           <div className="flex items-center">
//     {message.variants[localVariantIndex]?.score !== undefined &&
//       message.variants[localVariantIndex]?.score >= 70 && (
//         <FaUser className="text-green-500 mr-2" />
//     )}
//     {typeof message.variants[localVariantIndex]?.score === "number" && (
//       <span
//         className={`font-bold ${
//           message.variants[localVariantIndex]?.score <= 30
//             ? "text-green-500"
//             : "text-red-500"
//         }`}
//       >
//         Human Score: {message.variants[localVariantIndex]?.score}%
//       </span>
//     )}
//   </div>

//             <div className="flex space-x-3 items-center">
//               <button
//                 onClick={() =>
//                   copyToClipboard(
//                     message.variants?.[localVariantIndex]?.text ?? ""
//                   )
//                 }
//                 className="text-indigo-500 hover:text-indigo-600 transition-colors duration-200"
//               >
//                 <FiCopy size={16} />
//               </button>
//               <button
//                 onClick={() => redoMessage(message.originalInput || "")}
//                 className="text-indigo-500 hover:text-indigo-600 transition-colors duration-200"
//               >
//                 <FiRefreshCw size={16} />
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-center items-center mt-4 space-x-4">
//             <button
//               onClick={handlePreviousVariant}
//               className="bg-indigo-500 text-white px-3 py-1 rounded-full focus:outline-none transform hover:scale-105 transition-all"
//             >
//               ←
//             </button>
//             <span className="text-sm font-semibold text-gray-700">
//               {`${localVariantIndex + 1}/${message.variants?.length}`}
//             </span>
//             <button
//               onClick={handleNextVariant}
//               className="bg-indigo-500 text-white px-3 py-1 rounded-full focus:outline-none transform hover:scale-105 transition-all"
//             >
//               →
//             </button>
//           </div>
//         </div>
//       )}

//       {message.sender !== "bot" && (
//         <p
//           className="text-sm whitespace-pre-wrap"
//           style={{
//             fontFamily: "'Inter', sans-serif",
//             letterSpacing: "0.5px",
//           }}
//         >
//           {message.text}
//         </p>
//       )}
//     </motion.div>
//   );
// };

// export default MessageComponent;

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