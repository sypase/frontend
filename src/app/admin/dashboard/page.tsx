"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { currencySymbol, serverURL } from "@/utils/utils";
import { FiCreditCard, FiDollarSign, FiHome, FiShoppingCart, FiUsers } from 'react-icons/fi';

export default function Page() {
    const adminPath = "/admin";
    type DashboardData = {
        earnings: number;
        purchases: number;
        items: number;
        users: number;
    }

    const [data, setData] = useState<DashboardData | null>();

    const getData = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/admin/dashboard`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        };

        axios(config)
            .then((response) => {
                setData(response.data);
            })
    }

    useEffect(() => {
        getData();
    }, []);

    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center mb-5'><FiHome className='mr-2' /> Dashboard</p>
        <div className="flex flex-wrap">
            <Link href={`${adminPath}/purchases`}>
                <div className="bg-[#D2E8FD] select-none hover:scale-105 cursor-pointer duration-100 w-64 min-h-[200px] rounded-lg flex flex-col items-center justify-center mr-5 sm:mb-5">
                    <FiDollarSign className="text-[#091B59] text-6xl my-5" />
                    <p className="text-3xl text-[#091B59] font-bold">{currencySymbol} {data?.earnings}</p>
                    <p className="text-xl text-[#091B59] font-semibold opacity-50">Total Earnings</p>
                </div>
            </Link>
            <Link href={`${adminPath}/purchases`}>

                <div className="bg-[#D0F2FC] select-none hover:scale-105 cursor-pointer duration-100 w-64 min-h-[200px] rounded-lg flex flex-col items-center justify-center mr-5 sm:mb-5">
                    <FiCreditCard className="text-[#091B59] text-6xl my-5" />
                    <p className="text-3xl text-[#091B59] font-bold">{data?.purchases}</p>
                    <p className="text-xl text-[#091B59] font-semibold opacity-50">Purchases</p>
                </div>
            </Link>
            <Link href={`${adminPath}/shop`}>
                <div className="bg-[#ffd4d4] select-none hover:scale-105 cursor-pointer duration-100 w-64 min-h-[200px] rounded-lg flex flex-col items-center justify-center mr-5 sm:mb-5">
                    <FiShoppingCart className="text-[#091B59] text-6xl my-5" />
                    <p className="text-3xl text-[#091B59] font-bold">{data?.items}</p>
                    <p className="text-xl text-[#091B59] font-semibold opacity-50">Shop Items</p>
                </div>
            </Link>
            <Link href={`${adminPath}/users`}>
                <div className="bg-[#FFF6CD] select-none hover:scale-105 cursor-pointer duration-100 w-64 min-h-[200px] rounded-lg flex flex-col items-center justify-center mr-5 sm:mb-5">
                    <FiUsers className="text-[#091B59] text-6xl my-5" />
                    <p className="text-3xl text-[#091B59] font-bold">{data?.users}</p>
                    <p className="text-xl text-[#091B59] font-semibold opacity-50">Users</p>
                </div>
            </Link>
        </div>
    </div>
}