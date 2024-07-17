// "use client";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { FiArrowLeft, FiFileText } from "react-icons/fi";
// import { appName, currencySymbol, serverURL } from "@/utils/utils";

// export default function Page() {
//   const params = useParams();
//   const id = params.id;
//   const [data, setData] = useState<any>();

//   const getData = async () => {
//     const config = {
//       method: "POST",
//       url: `${serverURL}/shop/invoice`,
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       data: { purchaseId: id },
//     };
//     axios(config).then((response) => {
//       setData(response.data);
//     });
//   };

//   useEffect(() => {
//     getData();
//   }, [getData]); // Include getData in the dependency array

//   useEffect(() => {
//     if (data) {
//       window.print();
//     }
//   }, [data]);

//   return (
//     <main className="invoice-page flex flex-col w-screen h-screen p-4 overflow-hidden bg-purple-100">
//       <div className="headerp flex items-center mb-5 font-semibold text-2xl max-sm:mb-3">
//         <div
//           className="cursor-pointer"
//           onClick={() => {
//             window.location.href = "/";
//           }}
//         >
//           <FiArrowLeft className="mr-5" />
//         </div>
//         <FiFileText className="mr-2" /> Invoice
//       </div>
//       <div className="w-full h-full flex flex-col justify-center items-center ">
//         <p className="mb-5 text-lg">{appName}</p>
//         <div className="min-w-[35vw] bg-white rounded-xl overflow-hidden">
//           <div className="flex justify-center p-10 bg-primary text-white text-xl">
//             <p>Thank you.</p>
//           </div>
//           <div>
//             <div className="flex justify-between p-6">
//               <p>Purchase ID: {data?.purchaseId}</p>
//               <p>{data?.date}</p>
//             </div>
//             <div className="divider my-0"></div>
//             <div className="flex justify-between p-6">
//               <p>Payment Method:</p>
//               <p>{data?.paymentMethod}</p>
//             </div>
//             <div className="divider my-0"></div>
//             <div className="flex justify-between p-6">
//               <p>{data?.item}</p>
//               <p>
//                 {currencySymbol} {data?.amount}
//               </p>
//             </div>
//             <div className="divider my-0"></div>
//             <div className="flex justify-between p-6">
//               <div>
//                 <p>Invoice for: </p>
//                 <p>{data?.to?.name}</p>
//                 <p>{data?.to?.email}</p>
//               </div>
//               <div>
//                 <p>From: </p>
//                 <p>{data?.from?.name}</p>
//                 <p className="max-w-xs">{data?.from?.email}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { FiArrowLeft, FiFileText } from "react-icons/fi";
import { appName, currencySymbol, serverURL } from "@/utils/utils";

export default function Page() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState<any>();

  const getData = useCallback(async () => {
    const config = {
      method: "POST",
      url: `${serverURL}/shop/invoice`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { purchaseId: id },
    };
    axios(config).then((response) => {
      setData(response.data);
    });
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (data) {
      window.print();
    }
  }, [data]);

  return (
    <main className="invoice-page flex flex-col w-screen h-screen p-4 overflow-hidden bg-purple-100">
      <div className="headerp flex items-center mb-5 font-semibold text-2xl max-sm:mb-3">
        <div
          className="cursor-pointer"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <FiArrowLeft className="mr-5" />
        </div>
        <FiFileText className="mr-2" /> Invoice
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <p className="mb-5 text-lg">{appName}</p>
        <div className="min-w-[35vw] bg-white rounded-xl overflow-hidden">
          <div className="flex justify-center p-10 bg-primary text-white text-xl">
            <p>Thank you.</p>
          </div>
          <div>
            <div className="flex justify-between p-6">
              <p>Purchase ID: {data?.purchaseId}</p>
              <p>{data?.date}</p>
            </div>
            <div className="divider my-0"></div>
            <div className="flex justify-between p-6">
              <p>Payment Method:</p>
              <p>{data?.paymentMethod}</p>
            </div>
            <div className="divider my-0"></div>
            <div className="flex justify-between p-6">
              <p>{data?.item}</p>
              <p>
                {currencySymbol} {data?.amount}
              </p>
            </div>
            <div className="divider my-0"></div>
            <div className="flex justify-between p-6">
              <div>
                <p>Invoice for: </p>
                <p>{data?.to?.name}</p>
                <p>{data?.to?.email}</p>
              </div>
              <div>
                <p>From: </p>
                <p>{data?.from?.name}</p>
                <p className="max-w-xs">{data?.from?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
