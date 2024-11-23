import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TextareaWithButton = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() === "") {
      alert("Please enter a message before sending.");
      return;
    }

    toast.success("Message sent successfully!", {
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

    setMessage(""); // Clear the textarea after sending
  };

  return (
    <div className="grid gap-4 mb-24  bg-neutral-900 text-black p-6 w-full max-w-full sm:w-full mx-auto rounded-lg sm:mx-4 md:mx-auto md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
      <h2 className="text-2xl font-semibold text-white">Feedback</h2>
      <Textarea
        className="w-full"
        placeholder="Type your message here."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        className="w-full bg-black text-white hover:bg-blue-500 mt-4"
        onClick={handleSendMessage}
      >
        Send message
      </Button>
      <ToastContainer />
    </div>
  );
};

export default TextareaWithButton;
