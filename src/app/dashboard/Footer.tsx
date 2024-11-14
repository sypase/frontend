import React, { useEffect, useState, useRef } from 'react';
import { FiArrowRight } from "react-icons/fi";

interface FooterProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
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
  loading,
  sendMessage,
  handleTextAreaChange,
  handleKeyDown,
  textareaRef,
}) => {
  const [gradientPosition, setGradientPosition] = useState(0);
  const [textareaHeight, setTextareaHeight] = useState('80px');
  const [wordCount, setWordCount] = useState(0); // State for word count

  useEffect(() => {
    // Retrieve text from localStorage if it exists
    const savedText = localStorage.getItem('sharedText');
    if (savedText) {
      setText(savedText);  // Set the text value
    }

    // Check if the redirect happened from app/Footer.tsx
    const fromFooterPage = localStorage.getItem('fromFooterPage');
    if (fromFooterPage === 'true') {
      // Focus the textarea if redirected from app/Footer.tsx
      if (textareaRef.current) {
        textareaRef.current.focus();  // Focus the textarea
      }

      // Simulate button click
      const button = document.querySelector('button.p-3.text-purple-400') as HTMLButtonElement;
      if (button) {
        button.click();
      }

      // Reset sharedText in localStorage
      const waitForButtonClick = () => {
        return new Promise<void>((resolve) => {
          const button = document.querySelector('button.p-3.text-purple-400');
          if (button) {
        button.addEventListener('click', () => {
          resolve();
        }, { once: true });
          } else {
        resolve();
          }
        });
      };

      waitForButtonClick().then(() => {
        localStorage.removeItem('sharedText');
        localStorage.removeItem('fromFooterPage');
        setText('');
      });
    }
  }, [setText, sendMessage, text, wordCount]);

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

  // Update word count whenever text changes
  useEffect(() => {
    const updatedWordCount = text.split(/\s+/).filter(Boolean).length;
    setWordCount(updatedWordCount); // Update state with the new word count

    if (textareaRef.current) {
      textareaRef.current.style.height = '80px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
      setTextareaHeight(scrollHeight + 'px');
    }
  }, [text]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, #ffaa40, #9c40ff, #ffaa40)`,
    backgroundSize: '200% 100%',
    backgroundPosition: `${gradientPosition}% 0`,
    transition: 'background-position 0.5s ease',
    boxShadow: "0 0 15px rgba(156, 64, 255, 0.3), 0 0 30px rgba(156, 64, 255, 0.2), 0 0 45px rgba(156, 64, 255, 0.1)",
  };

  return (
    <div className="mt-auto">
      <div className="relative">
        <div
          className="flex items-end rounded-lg overflow-hidden bg-black transition-all border duration-300 hover:shadow-xl relative p-[2px]"
          style={gradientStyle}
        >
          <div className="flex items-end w-full bg-black rounded-lg">
            <textarea
              ref={textareaRef}
              className="flex-1 p-3 bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-gray-300 placeholder-gray-500 overflow-y-auto custom-scrollbar"
              style={{
                minHeight: "80px",
                height: textareaHeight,
                maxHeight: "300px"
              }}
              value={text}
              onChange={handleTextAreaChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your AI-generated text here..."
            />
            <div className="absolute top-2 right-2 text-sm text-gray-400">
              {wordCount} words
            </div>
            <button
              className={`p-3 text-purple-400 hover:text-purple-300 focus:outline-none transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
              onClick={sendMessage}
              disabled={loading || text.trim().length < 3 || wordCount < 100}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FiArrowRight className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 4px;
          border: 2px solid #1a1a1a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}</style>
    </div>
  );
};

export default Footer;
