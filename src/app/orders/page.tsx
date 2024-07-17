// // "use client";
// // import axios from "axios";
// // import Link from "next/link";
// // import React, { useEffect, useState } from "react";
// // import { currencySymbol, serverURL } from "@/utils/utils";
// // import { FiArrowLeft, FiEye, FiBox, FiSearch } from "react-icons/fi";

// // export default function Page() {
// //   const [data, setData] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [sortOrder, setSortOrder] = useState("");

// //   const getData = async () => {
// //     const config = {
// //       method: "GET",
// //       url: `${serverURL}/shop/orders?search=${searchTerm}&sort=${sortOrder}`,
// //       headers: {
// //         Authorization: `Bearer ${localStorage.getItem("token")}`,
// //       },
// //     };
// //     axios(config).then((response) => {
// //       setData(response.data);
// //     });
// //   };

// //   useEffect(() => {
// //     getData();
// //   }, [searchTerm, sortOrder]);

// //   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setSearchTerm(e.target.value);
// //   };

// //   const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     setSortOrder(e.target.value);
// //   };

// //   return (
// //     <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
// //       <p className="flex items-center mb-5 font-semibold text-2xl max-sm:mb-3">
// //         <Link href="/">
// //           <FiArrowLeft className="mr-5" />
// //         </Link>
// //         <FiBox className="mr-2" /> My Orders
// //       </p>
// //       <div className="flex justify-between mb-4">
// //         <div className="form-control">
// //           <div className="input-group">
// //             <input
// //               type="text"
// //               placeholder="Search..."
// //               className="input input-bordered"
// //               value={searchTerm}
// //               onChange={handleSearch}
// //             />
// //             <button className="btn btn-square">
// //               <FiSearch />
// //             </button>
// //           </div>
// //         </div>
// //         <div className="form-control">
// //           <select
// //             className="select select-bordered"
// //             value={sortOrder}
// //             onChange={handleSort}
// //           >
// //             <option value="">Sort by</option>
// //             <option value="latest">Latest</option>
// //             <option value="oldest">Oldest</option>
// //           </select>
// //         </div>
// //       </div>
// //       <div className="overflow-x-auto">
// //         <table className="table">
// //           {/* head */}
// //           <thead>
// //             <tr>
// //               <th></th>
// //               <th>Order ID</th>
// //               <th>Order Date</th>
// //               <th>Order Status</th>
// //               <th>Total Price</th>
// //               <th>View Details</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {data.map((item: any, i: number) => {
// //               return (
// //                 <tr className="hover" key={item._id}>
// //                   <th>{i + 1}</th>
// //                   <td>{item?.orderId}</td>
// //                   <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
// //                   <td>{item?.status}</td>
// //                   <td>
// //                     {currencySymbol} {item?.amount}
// //                   </td>
// //                   <td>
// //                     <Link href={`/orders/${item?._id}`}>
// //                       <button className="btn btn-md">
// //                         <FiEye />
// //                       </button>
// //                     </Link>
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>
// //     </main>
// //   );
// // }

// "use client";
// import axios from "axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { currencySymbol, serverURL } from "@/utils/utils";
// import { FiArrowLeft, FiBox, FiSearch } from "react-icons/fi";

// export default function Page() {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState("");

//   const getData = async () => {
//     const config = {
//       method: "GET",
//       url: `${serverURL}/shop/orders?search=${searchTerm}&sort=${sortOrder}`,
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     };
//     axios(config).then((response) => {
//       setData(response.data);
//     });
//   };

//   useEffect(() => {
//     getData();
//   }, [searchTerm, sortOrder]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSortOrder(e.target.value);
//   };

//   return (
//     <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
//       <p className="flex items-center mb-5 font-semibold text-2xl max-sm:mb-3">
//         <Link href="/">
//           <FiArrowLeft className="mr-5" />
//         </Link>
//         <FiBox className="mr-2" /> My Orders
//       </p>
//       <div className="flex justify-between mb-4">
//         <div className="form-control">
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="input input-bordered"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <button className="btn btn-square">
//               <FiSearch />
//             </button>
//           </div>
//         </div>
//         <div className="form-control">
//           <select
//             className="select select-bordered"
//             value={sortOrder}
//             onChange={handleSort}
//           >
//             <option value="">Sort by</option>
//             <option value="latest">Latest</option>
//             <option value="oldest">Oldest</option>
//           </select>
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th></th>
//               <th>Order ID</th>
//               <th>Order Date</th>
//               <th>Order Status</th>
//               <th>Total Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item: any, i: number) => {
//               return (
//                 <tr className="hover" key={item._id}>
//                   <th>{i + 1}</th>
//                   <td>{item?.orderId}</td>
//                   <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
//                   <td>{item?.status}</td>
//                   <td>
//                     {currencySymbol} {item?.amount}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// }

// "use client";
// import axios from "axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { currencySymbol, serverURL } from "@/utils/utils";
// import { FiArrowLeft, FiBox, FiSearch } from "react-icons/fi";

// export default function Page() {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState("");

//   const getData = async () => {
//     const config = {
//       method: "GET",
//       url: `${serverURL}/shop/orders?search=${searchTerm}&sort=${sortOrder}`,
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     };
//     axios(config).then((response) => {
//       setData(response.data);
//     });
//   };

//   useEffect(() => {
//     getData();
//   }, [getData, searchTerm, sortOrder]); // Include getData in the dependency array

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSortOrder(e.target.value);
//   };

//   return (
//     <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
//       <p className="flex items-center mb-5 font-semibold text-2xl max-sm:mb-3">
//         <Link href="/">
//           <FiArrowLeft className="mr-5" />
//         </Link>
//         <FiBox className="mr-2" /> My Orders
//       </p>
//       <div className="flex justify-between mb-4">
//         <div className="form-control">
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="input input-bordered"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <button className="btn btn-square">
//               <FiSearch />
//             </button>
//           </div>
//         </div>
//         <div className="form-control">
//           <select
//             className="select select-bordered"
//             value={sortOrder}
//             onChange={handleSort}
//           >
//             <option value="">Sort by</option>
//             <option value="latest">Latest</option>
//             <option value="oldest">Oldest</option>
//           </select>
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th></th>
//               <th>Order ID</th>
//               <th>Order Date</th>
//               <th>Order Status</th>
//               <th>Total Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item: any, i: number) => {
//               return (
//                 <tr className="hover" key={item._id}>
//                   <th>{i + 1}</th>
//                   <td>{item?.orderId}</td>
//                   <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
//                   <td>{item?.status}</td>
//                   <td>
//                     {currencySymbol} {item?.amount}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// }

"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { currencySymbol, serverURL } from "@/utils/utils";
import { FiArrowLeft, FiBox, FiSearch } from "react-icons/fi";

export default function Page() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const getData = async () => {
      const config = {
        method: "GET",
        url: `${serverURL}/shop/orders?search=${searchTerm}&sort=${sortOrder}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      axios(config).then((response) => {
        setData(response.data);
      });
    };

    getData(); // Call getData inside the useEffect
  }, [searchTerm, sortOrder]); // Dependencies

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  return (
    <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
      <p className="flex items-center mb-5 font-semibold text-2xl max-sm:mb-3">
        <Link href="/">
          <FiArrowLeft className="mr-5" />
        </Link>
        <FiBox className="mr-2" /> My Orders
      </p>
      <div className="flex justify-between mb-4">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-square">
              <FiSearch />
            </button>
          </div>
        </div>
        <div className="form-control">
          <select
            className="select select-bordered"
            value={sortOrder}
            onChange={handleSort}
          >
            <option value="">Sort by</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Status</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, i: number) => {
              return (
                <tr className="hover" key={item._id}>
                  <th>{i + 1}</th>
                  <td>{item?.orderId}</td>
                  <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
                  <td>{item?.status}</td>
                  <td>
                    {currencySymbol} {item?.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
