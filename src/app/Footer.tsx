import { FiArrowRight, FiZap, FiCheckCircle } from "react-icons/fi";

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
}) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg z-40 shadow-lg">
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute top-[-40px] right-0">
          <div className="flex items-center cursor-pointer relative" onClick={toggleAdvancedMode}>
            <div className="group flex items-center relative">
              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                  isAdvancedMode
                    ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
                    : "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
                    isAdvancedMode ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
              <div className="absolute bottom-12 left-[-80px] bg-white text-gray-700 text-sm p-4 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-72 flex flex-col items-start pointer-events-none">
                <div className="flex items-center mb-2">
                  <FiZap className="mr-2 text-blue-500" />
                  <span className="font-bold">Pro Mode Features</span>
                </div>
                <p className="mb-2 flex items-center">
                  <FiCheckCircle className="mr-2 text-green-500" />
                  Advanced AI checking for superior content quality.
                </p>
                <p className="mb-2">
                  🚀 Enhanced grammar and advanced model for higher accuracy and natural language flow.
                </p>
                <p className="text-orange-500 font-semibold">
                  ⚠️ You need to sign in to use Pro Mode.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex items-end rounded-lg overflow-hidden bg-white bg-opacity-50 shadow-lg transition-all duration-300 hover:shadow-xl relative"
          style={{
            boxShadow:
              "0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2), 0 0 45px rgba(59, 130, 246, 0.1)",
          }}
        >
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
    </footer>
  );
};

export default Footer;