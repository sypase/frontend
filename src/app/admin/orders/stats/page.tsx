'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiDollarSign, FiShoppingBag, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { currencySymbol, serverURL } from '@/utils/utils';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

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

export default function OrderStatsPage() {
  const [orders, setOrders] = useState<Order[]>([]);

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

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalCustomers = [...new Set(orders.map((order) => order.userId))].length;
  const averageOrderValue = totalRevenue / totalOrders;

  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const statusLabels = Object.keys(ordersByStatus);
  const statusData = Object.values(ordersByStatus);

  const barData = {
    labels: statusLabels,
    datasets: [
      {
        label: 'Orders',
        data: statusData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: statusLabels,
    datasets: [
      {
        data: statusData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
      },
    ],
  };

  const incomeByDay = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + order.amount;
    return acc;
  }, {} as { [key: string]: number });

  const incomeByDayLabels = Object.keys(incomeByDay);
  const incomeByDayData = Object.values(incomeByDay);

  const incomeByDayLineData = {
    labels: incomeByDayLabels,
    datasets: [
      {
        label: 'Income',
        data: incomeByDayData,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const incomeByMonth = orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).toISOString().slice(0, 7);
    acc[month] = (acc[month] || 0) + order.amount;
    return acc;
  }, {} as { [key: string]: number });

  const incomeByMonthLabels = Object.keys(incomeByMonth);
  const incomeByMonthData = Object.values(incomeByMonth);

  const incomeByMonthBarData = {
    labels: incomeByMonthLabels,
    datasets: [
      {
        label: 'Income',
        data: incomeByMonthData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="animate-fade-in-bottom w-full h-full p-4">
      <p className="font-semibold text-xl flex items-center mb-4">
        <FiTrendingUp className="mr-2" /> Order Statistics
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-md p-4 rounded-md flex items-center">
          <FiShoppingBag className="text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">{totalOrders}</p>
            <p className="text-gray-500">Total Orders</p>
          </div>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md flex items-center">
          <FiDollarSign className="text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">
              {currencySymbol}
              {totalRevenue.toFixed(2)}
            </p>
            <p className="text-gray-500">Total Revenue</p>
          </div>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md flex items-center">
          <FiUsers className="text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">{totalCustomers}</p>
            <p className="text-gray-500">Total Customers</p>
          </div>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md flex items-center">
          <FiDollarSign className="text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">
              {currencySymbol}
              {averageOrderValue.toFixed(2)}
            </p>
            <p className="text-gray-500">Average Order Value</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="font-semibold text-xl mb-4">Orders by Status</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white shadow-md p-4 rounded-md">
            <Bar data={barData} />
          </div>
          <div className="bg-white shadow-md p-4 rounded-md">
            <Pie data={pieData} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="font-semibold text-xl mb-4">Income by Day</p>
        <div className="bg-white shadow-md p-4 rounded-md">
          <Line data={incomeByDayLineData} />
        </div>
      </div>
      <div className="mt-8">
        <p className="font-semibold text-xl mb-4">Income by Month</p>
        <div className="bg-white shadow-md p-4 rounded-md">
          <Bar data={incomeByMonthBarData} />
        </div>
      </div>
    </div>
  );
}