import React from 'react';
import { FiArrowRight, FiZap, FiCheckCircle } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles



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
  isAdvancedMode: boolean;
  toggleAdvancedMode: () => void;
  isLoggedIn: boolean;
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
  isAdvancedMode,
  toggleAdvancedMode,
  isLoggedIn
}) => {

  // New function to handle sending message and redirecting without useNavigate
  const handleSendMessage = () => {
    // Save text to localStorage
    localStorage.setItem('sharedText', text);
  
    // Set a flag indicating the redirect from app/Footer.tsx
    localStorage.setItem('fromFooterPage', 'true');
  
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  // Handle action for both Enter key and button click
  const handleAction = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (isLoggedIn) {
      // Check if the event is a keyboard event and the key is 'Enter', or if it's a click event
      if ((event as React.KeyboardEvent).key === 'Enter' || event.type === 'click') {
        event.preventDefault();
        if (text.trim().length > 0 && wordCount >= 100) {
          handleSendMessage(); // Send the message if conditions are met
        }
      }
    } else {
      // If not logged in, use sendMessage for Enter key or button click
      if ((event as React.KeyboardEvent).key === 'Enter' || event.type === 'click') {
        event.preventDefault(); // Prevent default behavior
        if (text.trim().length > 0 && wordCount >= 100) {
          sendMessage(); // Call sendMessage directly for non-logged-in users
        }
        else
        {
          toast.error('Word count must be between 80 and 500.', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "#272727",
              color: "#fff",
              borderRadius: "8px",
            },
          });
        }
      }
    }
  };  
  

  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white bg-opacity-0 backdrop-filter backdrop-blur-lg z-40">
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute top-[-40px] right-0">
          <div className="flex items-center cursor-pointer relative">
            <div className="group flex items-center relative">
              {/* Advanced mode toggle, etc. */}
            </div>
          </div>
        </div>
        <div
          className="flex items-end rounded-lg overflow-hidden bg-white bg-opacity-50 shadow-lg transition-all duration-300 hover:shadow-xl relative border border-gray-500"
        >
          <textarea
            ref={textareaRef}
            className="flex-1 p-3 bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-gray-900 placeholder-neutral-900 max-h-40 overflow-y-auto"
            style={{ minHeight: "40px" }}
            value={text}
            onChange={handleTextAreaChange}
            onKeyDown={handleAction} // Use handleAction for key press events
            placeholder="Enter your AI-generated text here..."
          />
          <div className="absolute top-2 right-2 text-sm text-gray-600">
            {wordCount} words
          </div>
          <button
            className={`p-3 text-blue-500 hover:text-blue-600 focus:outline-none transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
            onClick={handleAction} // Use handleAction for button click
            // disabled={loading || text.trim().length < 80 || wordCount > 500}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FiArrowRight className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

    </footer>
    
  );
};

export default Footer;