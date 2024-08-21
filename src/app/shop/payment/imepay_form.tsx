// "use client";
// import React, { useState, useEffect } from 'react';
// import { serverURL } from "@/utils/utils";

// interface IMEPayProps {
//   item: string | null;
//   user: string | null;
// }

// const IMEPayIntegration: React.FC<IMEPayProps> = ({ item, user }) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

//   useEffect(() => {
//     if (item && user) {
//       createOrder();
//     } else {
//       setError("No item or user specified for payment");
//       setLoading(false);
//     }
//   }, [item, user]);

//   const createOrder = async () => {
//     try {
//       const response = await fetch(`${serverURL}/imepay/create-order-imepay?item=${item}&user=${user}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       if (data.redirectUrl) {
//         setRedirectUrl(data.redirectUrl);
//       } else {
//         throw new Error('No redirect URL received from server');
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePayment = () => {
//     if (redirectUrl) {
//       window.location.href = redirectUrl;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">Error: </strong>
//         <span className="block sm:inline">{error}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="card w-full max-w-sm bg-base-100 shadow-xl mx-auto">
//       <div className="card-body">
//         <h2 className="card-title">IME Pay Payment</h2>
//         <p>Click the button below to proceed with IME Pay payment.</p>
//         <div className="card-actions justify-end">
//           <button 
//             className="btn btn-primary" 
//             onClick={handlePayment}
//             disabled={!redirectUrl}
//           >
//             Pay with IME Pay
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IMEPayIntegration;
"use client";
import React, { useState, useEffect } from 'react';
import { serverURL } from "@/utils/utils";
import axios from 'axios';

interface IMEPayProps {
  item: string | null;
}

const IMEPayIntegration: React.FC<IMEPayProps> = ({ item }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      createOrder();
    } else {
      setError("No item specified for payment");
      setLoading(false);
    }
  }, [item]);

  const createOrder = async () => {
    try {
      const response = await axios.post(`${serverURL}/imepay/create-order-imepay`, {
        item,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.redirectUrl) {
        setRedirectUrl(response.data.redirectUrl);
      } else {
        throw new Error('No redirect URL received from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">IME Pay Payment</h2>
        <p>Click the button below to proceed with IME Pay payment.</p>
        <div className="card-actions justify-end">
          <button 
            className="btn btn-primary" 
            onClick={handlePayment}
            disabled={!redirectUrl}
          >
            Pay with IME Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default IMEPayIntegration;