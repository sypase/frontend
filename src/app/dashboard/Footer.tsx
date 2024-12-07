import React, { useEffect, useState, useRef } from 'react';
import { FiArrowRight } from "react-icons/fi";
import ScrollToFooterButton from "./ScrollToFooterButton";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { FiClipboard } from "react-icons/fi"; // Import clipboard icon



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
  const [isDragging, setIsDragging] = useState(false); // State for drag-and-drop

  useEffect(() => {
    const savedText = localStorage.getItem('sharedText');
    if (savedText) {
      setText(savedText);
    }

    const fromFooterPage = localStorage.getItem('fromFooterPage');
    if (fromFooterPage === 'true') {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }

      const button = document.querySelector('button.p-3.text-purple-400') as HTMLButtonElement;
      if (button) {
        button.click();
      }

      const waitForButtonClick = () => {
        return new Promise<void>((resolve) => {
          const button = document.querySelector('button.p-3.text-purple-400');
          if (button) {
            button.addEventListener(
              'click',
              () => {
                resolve();
              },
              { once: true }
            );
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

    const handlePaste = async () => {
    const fromFooterPage = localStorage.getItem('fromFooterPage') === 'true';
  
    if (fromFooterPage) {
      // If it's from the footer page, skip pasting from clipboard.
      return;
    }
  
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (error) {
      toast.error('Failed to paste clipboard content.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: {
          backgroundColor: "#272727",
          color: "#fff",
          borderRadius: "8px",
        },
      });
    }
  };
  // const handleAction = (
  //   event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>
  // ) => {
  //   if ((event as React.KeyboardEvent).key === 'Enter' || event.type === 'click') {
  //     event.preventDefault();
  //     if (text.trim().length > 0 && wordCount >= 80 && wordCount <= 500) {
  //       sendMessage();
  //     }
  //   }
  // };

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

  useEffect(() => {
    const updatedWordCount = text.split(/\s+/).filter(Boolean).length;
    setWordCount(updatedWordCount);

    if (textareaRef.current) {
      textareaRef.current.style.height = '80px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
      setTextareaHeight(scrollHeight + 'px');
    }
  }, [text]);

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setIsDragging(false);

  //   if (e.dataTransfer.files.length > 0) {
  //     const file = e.dataTransfer.files[0];
  //     if (file.type === 'text/plain') {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const fileText = reader.result as string;
  //         setText(fileText);
  //         sendMessage(); // Automatically send the message after dropping the file
  //       };
  //       reader.readAsText(file);
  //     } else {
  //       alert('Only text files are allowed.');
  //     }
  //   }
  // };

  const handleAction = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const fromFooterPage = localStorage.getItem('fromFooterPage') === 'true';
  
    if ((event as React.KeyboardEvent).key === 'Enter' || event.type === 'click') {
      event.preventDefault();
      
      if (!fromFooterPage) { // Only show toast if not from FooterPage
        if (wordCount < 80 || wordCount > 500) {
          toast.error('Word count must be between 80 and 500.', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            style: {
              backgroundColor: "#272727",
              color: "#fff",
              borderRadius: "8px",
            },
          });      
        } else if (text.trim().length > 0) {
          sendMessage();
        }
      } else {
        sendMessage();
      }
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const fromFooterPage = localStorage.getItem('fromFooterPage') === 'true';
  
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = () => {
          const fileText = reader.result as string;
          setText(fileText);
          sendMessage(); // Automatically send the message after dropping the file
        };
        reader.readAsText(file);
      } else if (!fromFooterPage) { // Only show toast if not from FooterPage
        toast.error('Only text files are allowed.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            backgroundColor: "#272727",
            color: "#fff",
            borderRadius: "8px",
          },
        });
      }
    }
  };
  

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, #ffaa40, #9c40ff, #ffaa40)`,
    backgroundSize: '200% 100%',
    backgroundPosition: `${gradientPosition}% 0`,
    transition: 'background-position 0.5s ease',
    boxShadow: "0 0 15px rgba(156, 64, 255, 0.3), 0 0 30px rgba(156, 64, 255, 0.2), 0 0 45px rgba(156, 64, 255, 0.1)",
  };



  return (
    <div
      className={`mt-auto ${isDragging ? 'border-dashed border-4 border-purple-500' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="relative">
        <div
          className="flex items-end rounded-lg overflow-hidden bg-black transition-all border duration-300 hover:shadow-xl relative p-[2px]"
          style={gradientStyle}
        >
          <ScrollToFooterButton />
          <div className="flex items-end w-full bg-black rounded-lg">
            <textarea
              ref={textareaRef}
              className="flex-1 p-3 bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-gray-300 placeholder-gray-500 overflow-y-auto custom-scrollbar"
              style={{
                minHeight: "80px",
                height: textareaHeight,
                maxHeight: "300px",
              }}
              value={text}
              onChange={handleTextAreaChange}
              onKeyDown={handleAction}
              placeholder="Enter your AI-generated text here..."
            />
            <div className="absolute top-2 right-2 text-sm text-gray-400">
              {wordCount} words
            </div>
            <button
            className="p-3 pr-0 text-purple-400/90 hover:text-purple-300 focus:outline-none transition-all duration-300"
            onClick={handlePaste}
          >
            <FiClipboard className="w-6 h-6" />
          </button>
            <button
              className={`p-3 text-purple-400 hover:text-purple-300 focus:outline-none transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
              onClick={handleAction}
              // disabled={loading || text.trim().length < 3 || wordCount < 80 || wordCount > 500}
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
            <ToastContainer /> {/* Include the ToastContainer to render toasts */}

    </div>
  );
};

export default Footer;
