// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { serverURL } from "@/utils/utils";
// import QRCode from "qrcode.react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Confetti from "react-confetti";

// export default function ManualPayment({ item }: { item: string | null }) {
//   const [transactionDetails, setTransactionDetails] = useState("");
//   const [qrData, setQrData] = useState({});
//   const [orderId, setOrderId] = useState("");
//   const [showOrderDetails, setShowOrderDetails] = useState(false);
//   const [orderStatus, setOrderStatus] = useState("");
//   const [orderTime, setOrderTime] = useState("");
//   const [orderAmount, setOrderAmount] = useState("");

//   useEffect(() => {
//     handlePayment();
//   }, []);

//   const handlePayment = async () => {
//     if (!item) {
//       console.error("Item ID is missing");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         `${serverURL}/shop/create-manual-order`,
//         { itemId: item },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setQrData(response.data.qrData);
//       setOrderId(response.data.orderId);
//       setOrderAmount(response.data.qrData.amount);
//     } catch (error) {
//       console.error("Error creating manual order:", error);
//       toast.error("Failed to create manual order");
//     }
//   };

//   const handleConfirmPayment = async () => {
//     try {
//       const response = await axios.post(
//         `${serverURL}/shop/confirm-manual-payment`,
//         { transactionDetails, orderId },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       // Handle successful payment confirmation
//       console.log("Payment confirmed:", response.data);
//       toast.success("Order placed successfully");
//       // Show order details popup
//       setShowOrderDetails(true);
//       // Set order details from the response
//       setOrderId(response.data.orderId);
//       setOrderStatus(response.data.orderStatus);
//       setOrderTime(response.data.time);

//       // Reset form state
//       setTransactionDetails(response.data.transactionDetails);
//     } catch (error) {
//       console.error("Error confirming manual payment:", error);
//       toast.error("Payment failed");
//     }
//   };

//   const handleCancel = async () => {
//     try {
//       const response = await axios.post(
//         `${serverURL}/shop/cancel-manual-order`,
//         { orderId },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       console.log("Order cancelled:", response.data);
//       toast.success("Order cancelled successfully");
//       // Redirect to the home page or perform any other necessary actions
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Error cancelling order:", error);
//       toast.error("Failed to cancel order");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold mb-2">Manual Payment</h2>
//           <p className="text-gray-600">
//             Scan the QR code and enter transaction details
//           </p>
//         </div>
//         <p className="text-lg font-bold mb-4 text-center">
//           Amount to Pay: Rs {orderAmount}
//         </p>
//         <div className="mb-6">
//           <QRCode
//             value={JSON.stringify(qrData)}
//             size={256}
//             className="mx-auto"
//           />
//         </div>
//         <p className="text-sm mb-4 text-center">Order ID: {orderId}</p>
//         <p className="text-sm mb-4 text-center">
//           Note: Pay only thorugh ESEWA app and enter the transaction code below.
//         </p>
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Enter Transaction Details"
//             value={transactionDetails}
//             onChange={(e) => setTransactionDetails(e.target.value)}
//             className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="flex justify-between">
//           <button
//             onClick={handleCancel}
//             className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleConfirmPayment}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
//           >
//             Confirm Payment
//           </button>
//         </div>
//       </div>

//       {showOrderDetails && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
//             <div className="flex justify-center mb-6">
//               <Confetti />
//             </div>
//             <h2 className="text-2xl font-bold text-center mb-4">
//               Order Details
//             </h2>
//             <div className="bg-gray-100 rounded-lg p-4 mb-4">
//               <p className="text-gray-600 mb-2">
//                 <span className="font-semibold">Order ID:</span> {orderId}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <span className="font-semibold">Transaction Details:</span>{" "}
//                 {transactionDetails}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <span className="font-semibold">Order Amount:</span> $
//                 {orderAmount}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <span className="font-semibold">Order Status:</span>{" "}
//                 {orderStatus}
//               </p>
//               <p className="text-gray-600">
//                 <span className="font-semibold">Order Time:</span>{" "}
//                 {new Date(orderTime).toLocaleString()}
//               </p>
//             </div>
//             <div className="flex justify-between">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
//                 onClick={() => {
//                   setShowOrderDetails(false);
//                   window.location.href = "/";
//                 }}
//               >
//                 Close
//               </button>
//               <button
//                 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
//                 onClick={() => {
//                   setShowOrderDetails(false);
//                   window.location.href = "/orders";
//                 }}
//               >
//                 See All Orders
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { serverURL } from "@/utils/utils";
import QRCode from "qrcode.react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";

export default function ManualPayment({ item }: { item: string | null }) {
  const [transactionDetails, setTransactionDetails] = useState("");
  const [qrData, setQrData] = useState({});
  const [orderId, setOrderId] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [orderAmount, setOrderAmount] = useState("");

  const handlePayment = useCallback(async () => {
    if (!item) {
      console.error("Item ID is missing");
      return;
    }
    try {
      const response = await axios.post(
        `${serverURL}/shop/create-manual-order`,
        { itemId: item },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setQrData(response.data.qrData);
      setOrderId(response.data.orderId);
      setOrderAmount(response.data.orderPrice);
    } catch (error) {
      console.error("Error creating manual order:", error);
      toast.error("Failed to create manual order");
    }
  }, [item]);

  useEffect(() => {
    handlePayment();
  }, [handlePayment]);

  const handleConfirmPayment = async () => {
    try {
      const response = await axios.post(
        `${serverURL}/shop/confirm-manual-payment`,
        { transactionDetails, orderId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Handle successful payment confirmation
      console.log("Payment confirmed:", response.data);
      toast.success("Order placed successfully");
      // Show order details popup
      setShowOrderDetails(true);
      // Set order details from the response
      setOrderId(response.data.orderId);
      setOrderStatus(response.data.orderStatus);
      setOrderTime(response.data.time);

      // Reset form state
      setTransactionDetails(response.data.transactionDetails);
    } catch (error) {
      console.error("Error confirming manual payment:", error);
      toast.error("Payment failed");
    }
  };

  const handleCancel = async () => {
    try {
      const response = await axios.post(
        `${serverURL}/shop/cancel-manual-order`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Order cancelled:", response.data);
      toast.success("Order cancelled successfully");
      // Redirect to the home page or perform any other necessary actions
      window.location.href = "/";
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Manual Payment</h2>
          <p className="text-gray-600">
            Scan the QR code and enter transaction details
          </p>
        </div>
        <p className="text-lg font-bold mb-4 text-center">
          Amount to Pay: Rs {orderAmount}
        </p>
        <div className="mb-6">
          <QRCode
            value={JSON.stringify(qrData)}
            size={256}
            className="mx-auto"
          />
        </div>
        <div className="flex justify-center mb-4">
          <img
            src="https://i.ibb.co/f9Q43Nq/Esewa-logo-1.png"
            alt="eSewa Logo"
            className="h-16 w-auto"
          />
        </div>
        <p className="text-sm mb-4 text-center">Order ID: {orderId}</p>
        <p className="text-sm mb-4 text-center">
          Note: Pay only through ESEWA app and enter the transaction code below.
        </p>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Transaction Details"
            value={transactionDetails}
            onChange={(e) => setTransactionDetails(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmPayment}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Confirm Payment
          </button>
        </div>
      </div>

      {showOrderDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <Confetti />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">
              Order Details
            </h2>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Order ID:</span> {orderId}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Transaction Details:</span>{" "}
                {transactionDetails}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Order Amount:</span> $
                {orderAmount}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Order Status:</span>{" "}
                {orderStatus}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Order Time:</span>{" "}
                {new Date(orderTime).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                onClick={() => {
                  setShowOrderDetails(false);
                  window.location.href = "/";
                }}
              >
                Close
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                onClick={() => {
                  setShowOrderDetails(false);
                  window.location.href = "/orders";
                }}
              >
                See All Orders
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
