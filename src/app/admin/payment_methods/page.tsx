// "use client";
// import axios from 'axios';
// import { serverURL } from "@/utils/utils";
// import { FiCreditCard } from 'react-icons/fi';
// import React, { useEffect, useState } from 'react';

// export default function Page() {
//     type PaymentMethodData = {
//         stripe: boolean;
//         razorpay: boolean;
//     }

//     const [data, setData] = useState<PaymentMethodData | null>();

//     const getData = async () => {
//         const config = {
//             method: "GET",
//             url: `${serverURL}/admin/payment-methods`,
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             },
//         };

//         axios(config)
//             .then((response) => {
//                 setData(response.data);
//             })
//     }

//     const saveData = async (data: PaymentMethodData) => {
//         const config = {
//             method: "POST",
//             url: `${serverURL}/admin/payment-methods`,
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`,
//                 "Content-Type": "application/json"
//             },
//             data: data
//         };

//         axios(config).then((response) => {
//             setData(response.data);
//         });
//     }

//     useEffect(() => {
//         getData();
//     }, []);

//     return <div className='animate-fade-in-bottom w-full h-full p-4'>
//         <p className='font-semibold text-xl flex items-center'><FiCreditCard className='mr-2' /> Payment methods</p>
//         <div className="overflow-x-auto">
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th></th>
//                         <th>Payment method</th>
//                         <th>Enable</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr className='hover'>
//                         <th>1</th>
//                         <td>Stripe</td>
//                         <td><input type="checkbox" className="toggle" onChange={(x) => {
//                             setData({
//                                 ...data!,
//                                 stripe: !data?.stripe
//                             });
//                             saveData({ razorpay: data?.razorpay!, stripe: !data?.stripe! });
//                         }} checked={data?.stripe} /></td>
//                     </tr>
//                     {/* row 2 */}
//                     <tr className='hover'>
//                         <th>2</th>
//                         <td>Razorpay</td>
//                         <td><input type="checkbox" className="toggle" onChange={(x) => {
//                             setData({
//                                 ...data!,
//                                 razorpay: !data?.razorpay
//                             });
//                             saveData({ razorpay: !data?.razorpay!, stripe: data?.stripe! });
//                         }} checked={data?.razorpay} /></td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     </div>
// }


"use client";
import axios from "axios";
import { serverURL } from "@/utils/utils";
import { FiCreditCard } from "react-icons/fi";
import React, { useEffect, useState } from "react";

export default function Page() {
  type PaymentMethodData = {
    stripe: boolean;
    razorpay: boolean;
    manual: boolean;
  };

  const [data, setData] = useState<PaymentMethodData | null>();

  const getData = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/admin/payment-methods`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment methods:", error);
      });
  };

  const saveData = async (data: PaymentMethodData) => {
    const config = {
      method: "POST",
      url: `${serverURL}/admin/payment-methods`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error saving payment methods:", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="animate-fade-in-bottom w-full h-full p-4">
      <p className="font-semibold text-xl flex items-center">
        <FiCreditCard className="mr-2" /> Payment methods
      </p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Payment method</th>
              <th>Enable</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <th>1</th>
              <td>Stripe</td>
              <td>
                <input
                  type="checkbox"
                  className="toggle"
                  onChange={() => {
                    setData({
                      ...data!,
                      stripe: !data?.stripe,
                    });
                    saveData({
                      razorpay: data?.razorpay!,
                      stripe: !data?.stripe!,
                      manual: data?.manual!,
                    });
                  }}
                  checked={data?.stripe}
                />
              </td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>Razorpay</td>
              <td>
                <input
                  type="checkbox"
                  className="toggle"
                  onChange={() => {
                    setData({
                      ...data!,
                      razorpay: !data?.razorpay,
                    });
                    saveData({
                      razorpay: !data?.razorpay!,
                      stripe: data?.stripe!,
                      manual: data?.manual!,
                    });
                  }}
                  checked={data?.razorpay}
                />
              </td>
            </tr>
            {/* row 3 */}
            <tr className="hover">
              <th>3</th>
              <td>Manual</td>
              <td>
                <input
                  type="checkbox"
                  className="toggle"
                  onChange={() => {
                    setData({
                      ...data!,
                      manual: !data?.manual,
                    });
                    saveData({
                      razorpay: data?.razorpay!,
                      stripe: data?.stripe!,
                      manual: !data?.manual!,
                    });
                  }}
                  checked={data?.manual}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}