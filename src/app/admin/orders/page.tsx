// 'use client';

// import axios from 'axios';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { FiCheck, FiDollarSign, FiDownload, FiX } from 'react-icons/fi';
// import { currencySymbol, serverURL } from '@/utils/utils';

// interface Order {
//   _id: string;
//   orderId: string;
//   userId: string;
//   email: string; // Change the field name to 'email'
//   itemId: string;
//   amount: number;
//   paymentMethod: string;
//   status: string;
//   expirationDate: string;
//   transactionDetails: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export default function Page() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const getOrders = async () => {
//     const config = {
//       method: 'GET',
//       url: `${serverURL}/admin/orders`,
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     };

//     axios(config)
//       .then((response) => {
//         setOrders(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching orders:', error);
//       });
//   };

//   useEffect(() => {
//     getOrders();
//   }, []);

//   const handleApproveOrder = async (orderId: string) => {
//     const config = {
//       method: 'POST',
//       url: `${serverURL}/admin/approve-order`,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//       data: {
//         orderId,
//       },
//     };

//     try {
//       await axios(config);
//       getOrders(); // Refresh orders after approval
//     } catch (error) {
//       console.error('Error approving order:', error);
//     }
//   };

//   const handleRejectOrder = async (orderId: string) => {
//     // Implement order rejection logic here
//   };

//   const filteredOrders = orders.filter((order) => {
//     const createdAt = new Date(order.createdAt);
//     const startDateFilter = startDate ? new Date(startDate) : null;
//     const endDateFilter = endDate ? new Date(endDate) : null;

//     return (
//       order.orderId.includes(searchTerm) &&
//       (!startDateFilter || createdAt >= startDateFilter) &&
//       (!endDateFilter || createdAt <= endDateFilter)
//     );
//   });

//   return (
//     <div className='animate-fade-in-bottom w-full h-full p-4'>
//       <p className='font-semibold text-xl flex items-center'>
//         <FiDollarSign className='mr-2' /> Orders
//       </p>
//       <div className='mb-4'>
//         <input
//           type='text'
//           placeholder='Search by Order ID'
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className='input input-bordered mr-2'
//         />
//         <input
//           type='date'
//           placeholder='Start Date'
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className='input input-bordered mr-2'
//         />
//         <input
//           type='date'
//           placeholder='End Date'
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className='input input-bordered'
//         />
//       </div>
//       <div className='overflow-x-auto'>
//         <table className='table'>
//           <thead>
//             <tr>
//               <th></th>
//               <th>Order Date</th>
//               <th>User</th>
//               <th>Email</th>
//               <th>Item</th>
//               <th>Total Price</th>
//               <th>Payment Method</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map((order: Order, i: number) => (
//               <tr key={order._id} className='hover'>
//                 <th>{i + 1}</th>
//                 <td>{new Date(order.createdAt).toLocaleString()}</td>
//                 <td>{order.userId}</td>
//                 <td>
//                   <Link
//                     href={`mailto:${order.email}`}
//                     target='_blank'
//                     className='underline'
//                   >
//                     {order.email}
//                   </Link>
//                 </td>
//                 <td>{order.itemId}</td>
//                 <td>
//                   {currencySymbol} {order.amount}
//                 </td>
//                 <td>{order.paymentMethod}</td>
//                 <td>{order.status}</td>
//                 <td>
//                   {order.status === 'pending' && (
//                     <>
//                       <button
//                         className='btn btn-sm btn-success mr-2'
//                         onClick={() => handleApproveOrder(order._id)}
//                       >
//                         <FiCheck />
//                       </button>
//                       <button
//                         className='btn btn-sm btn-error mr-2'
//                         onClick={() => handleRejectOrder(order._id)}
//                       >
//                         <FiX />
//                       </button>
//                     </>
//                   )}
//                   {order.status !== 'created' && order.status !== 'pending' && (
//                     <Link href={'/invoice/' + order._id}>
//                       <button className='btn btn-md'>
//                         <FiDownload />
//                       </button>
//                     </Link>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiCheck, FiDollarSign, FiDownload, FiX } from 'react-icons/fi';
import { currencySymbol, serverURL } from '@/utils/utils';

interface Order {
  _id: string;
  orderId: string;
  userId: string;
  email: string;
  itemId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  expirationDate: string;
  transactionDetails: string;
  createdAt: string;
  updatedAt: string;
}

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getOrders = async () => {
    const config = {
      method: 'GET',
      url: `${serverURL}/admin/orders`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    axios(config)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleApproveOrder = async (orderId: string) => {
    const config = {
      method: 'POST',
      url: `${serverURL}/admin/approve-order`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        orderId,
      },
    };

    try {
      await axios(config);
      getOrders(); // Refresh orders after approval
    } catch (error) {
      console.error('Error approving order:', error);
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    const config = {
      method: 'POST',
      url: `${serverURL}/admin/reject-order`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        orderId,
      },
    };
  
    try {
      await axios(config);
      getOrders(); // Refresh orders after rejection
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const createdAt = new Date(order.createdAt);
    const startDateFilter = startDate ? new Date(startDate) : null;
    const endDateFilter = endDate ? new Date(endDate) : null;

    let statusMatch = false;
    if (statusFilter === 'all') {
      statusMatch = true;
    } else {
      statusMatch = order.status === statusFilter;
    }

    return (
      statusMatch &&
      order.orderId.includes(searchTerm) &&
      order.email.includes(searchTerm) &&
      (!startDateFilter || createdAt >= startDateFilter) &&
      (!endDateFilter || createdAt <= endDateFilter)
    );
  });

  return (
    <div className='animate-fade-in-bottom w-full h-full p-4'>
      <p className='font-semibold text-xl flex items-center'>
        <FiDollarSign className='mr-2' /> Orders
      </p>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search by Order ID or Email'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='input input-bordered mr-2'
        />
        <input
          type='date'
          placeholder='Start Date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className='input input-bordered mr-2'
        />
        <input
          type='date'
          placeholder='End Date'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className='input input-bordered mr-2'
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='select select-bordered mr-2'
        >
          <option value='all'>All</option>
          <option value='pending'>Pending</option>
          <option value='approved'>Approved</option>
          <option value='cancelled'>Cancelled</option>
        </select>
      </div>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>Order Date</th>
              <th>User</th>
              <th>Email</th>
              <th>Item</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order: Order, i: number) => (
              <tr key={order._id} className='hover'>
                <th>{i + 1}</th>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.userId}</td>
                <td>
                  <Link
                    href={`mailto:${order.email}`}
                    target='_blank'
                    className='underline'
                  >
                    {order.email}
                  </Link>
                </td>
                <td>{order.itemId}</td>
                <td>
                  {currencySymbol} {order.amount}
                </td>
                <td>{order.paymentMethod}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === 'pending' && (
                    <>
                      <button
                        className='btn btn-sm btn-success mr-2'
                        onClick={() => handleApproveOrder(order._id)}
                      >
                        <FiCheck />
                      </button>
                      <button
                        className='btn btn-sm btn-error mr-2'
                        onClick={() => handleRejectOrder(order._id)}
                      >
                        <FiX />
                      </button>
                    </>
                  )}
                  {order.status !== 'created' && order.status !== 'pending' && (
                    <Link href={'/invoice/' + order._id}>
                      <button className='btn btn-md'>
                        <FiDownload />
                      </button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}