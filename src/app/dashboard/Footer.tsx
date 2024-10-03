// import React, { useEffect, useState } from 'react';
// import { FiArrowRight, FiZap, FiCheckCircle } from "react-icons/fi";

// interface FooterProps {
//   text: string;
//   setText: React.Dispatch<React.SetStateAction<string>>;
//   wordCount: number;
//   loading: boolean;
//   sendMessage: () => void;
//   handleTextAreaChange: (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => void;
//   handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
//   textareaRef: React.RefObject<HTMLTextAreaElement>;
//   isAdvancedMode: boolean;
//   toggleAdvancedMode: () => void;
// }

// const Footer: React.FC<FooterProps> = ({
//   text,
//   setText,
//   wordCount,
//   loading,
//   sendMessage,
//   handleTextAreaChange,
//   handleKeyDown,
//   textareaRef,
//   isAdvancedMode,
//   toggleAdvancedMode,
// }) => {
//   const [gradientPosition, setGradientPosition] = useState(0);

//   useEffect(() => {
//     let animationFrame: number;

//     const animateGradient = () => {
//       setGradientPosition((prevPosition) => (prevPosition + 1) % 200);
//       animationFrame = requestAnimationFrame(animateGradient);
//     };

//     if (isAdvancedMode) {
//       animationFrame = requestAnimationFrame(animateGradient);
//     }

//     return () => {
//       if (animationFrame) {
//         cancelAnimationFrame(animationFrame);
//       }
//     };
//   }, [isAdvancedMode]);

//   const gradientStyle = isAdvancedMode
//     ? {
//         backgroundImage: `linear-gradient(90deg, #4ade80, #3b82f6, #8b5cf6, #4ade80)`,
//         backgroundSize: '200% 100%',
//         backgroundPosition: `${gradientPosition}% 0`,
//         transition: 'background-position 0.5s ease',
//       }
//     : {};

//   return (
//     <div className="mt-auto">
//       <div className="relative">
//         <div className="absolute top-[-40px] right-0">
//           <div className="flex items-center cursor-pointer relative" onClick={toggleAdvancedMode}>
//             <div className="relative inline-block w-10 mr-2 align-middle select-none">
//               <input
//                 type="checkbox"
//                 name="toggle"
//                 id="toggle"
//                 checked={isAdvancedMode}
//                 onChange={toggleAdvancedMode}
//                 className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
//               />
//               <label
//                 htmlFor="toggle"
//                 className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
//               ></label>
//             </div>
//             <span className="text-gray-400 font-medium">
//               {isAdvancedMode ? "Advanced Mode" : "Standard Mode"}
//             </span>
//           </div>
//         </div>
//         <div
//           className={`flex items-end rounded-lg overflow-hidden bg-white transition-all border duration-300 hover:shadow-xl relative ${
//             isAdvancedMode ? 'p-[3px]' : ''
//           }`}
//           style={{
//             ...gradientStyle,
//             boxShadow: isAdvancedMode
//               ? "0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2), 0 0 45px rgba(59, 130, 246, 0.1)"
//               : "",
//           }}
//         >
//           <div className={`flex items-end w-full ${isAdvancedMode ? 'bg-white rounded-lg' : ''}`}>
//             <textarea
//               ref={textareaRef}
//               className="flex-1 p-3 bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-gray-900 placeholder-gray-500 max-h-40 overflow-y-auto"
//               style={{ minHeight: "40px" }}
//               value={text}
//               onChange={handleTextAreaChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Enter your AI-generated text here..."
//             />
//             <div className="absolute top-2 right-2 text-sm text-gray-600">
//               {wordCount} words
//             </div>
//             <button
//               className={`p-3 text-blue-500 hover:text-blue-600 focus:outline-none transition-all duration-300 ${
//                 loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
//               }`}
//               onClick={sendMessage}
//               disabled={loading || text.trim().length < 3 || wordCount < 100}
//             >
//               {loading ? (
//                 <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 <FiArrowRight className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;


import React, { useEffect, useState } from 'react';
import { FiArrowRight } from "react-icons/fi";

interface FooterProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  wordCount: number;
  loading: boolean;
  sendMessage: () => void;
  handleTextAreaChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const Footer: React.FC<FooterProps> = ({
  text,
  setText,
  wordCount,
  loading,
  sendMessage,
  handleTextAreaChange,
  handleKeyDown,
  textareaRef,
}) => {
  const [gradientPosition, setGradientPosition] = useState(0);

  useEffect(() => {
    let animationFrame: number;

    const animateGradient = () => {
      setGradientPosition((prevPosition) => (prevPosition + 1) % 200);
      animationFrame = requestAnimationFrame(animateGradient);
    };

    animationFrame = requestAnimationFrame(animateGradient);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, #4ade80, #3b82f6, #8b5cf6, #4ade80)`,
    backgroundSize: '200% 100%',
    backgroundPosition: `${gradientPosition}% 0`,
    transition: 'background-position 0.5s ease',
    boxShadow: "0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2), 0 0 45px rgba(59, 130, 246, 0.1)",
  };

  return (
    <div className="mt-auto">
      <div className="relative">
        <div
          className="flex items-end rounded-lg overflow-hidden bg-white transition-all border duration-300 hover:shadow-xl relative p-[3px]"
          style={gradientStyle}
        >
          <div className="flex items-end w-full bg-white rounded-lg">
            <textarea
              ref={textareaRef}
              className="flex-1 p-3 bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-gray-900 placeholder-gray-500 max-h-40 overflow-y-auto"
              style={{ minHeight: "40px" }}
              value={text}
              onChange={handleTextAreaChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your AI-generated text here..."
            />
            <div className="absolute top-2 right-2 text-sm text-gray-600">
              {wordCount} words
            </div>
            <button
              className={`p-3 text-blue-500 hover:text-blue-600 focus:outline-none transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
              }`}
              onClick={sendMessage}
              disabled={loading || text.trim().length < 3 || wordCount < 100}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FiArrowRight className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;