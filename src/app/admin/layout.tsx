"use client";
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { appName, serverURL } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiCreditCard, FiDollarSign, FiHome, FiLogOut, FiMoreHorizontal, FiShoppingCart, FiUser, FiUsers, FiBox } from "react-icons/fi";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showMenu, setShowMenu] = useState(true);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const pathName = usePathname();

  const [user, setUser] = useState<any>();

  const getUser = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/documents/list`,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    };

    axios(config)
      .then((response) => {
        setUser(response.data.user);
      })
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <main className="flex bg-base-100 h-screen w-screen p-2 max-sm:p-0" onClick={() => {
      if (moreMenuOpen) setMoreMenuOpen(false);
    }}>
      {/* Sidebar */}
      <div className={'flex flex-col p-5 min-w-[275px] max-w-[15vw] h-full rounded-md ' + (!showMenu ? "max-sm:hidden " : "max-sm:fixed max-sm:w-full max-sm:h-full max-sm:max-w-none bg-base-100 max-sm:z-50 ")}>
        <div className="flex justify-between items-center max-sm:mb-4">
          <Link href="/"><p className="mb-5 font-semibold max-sm:mb-3">📝 {appName} ✨ | Admin</p></Link>
          <div className="hidden max-sm:flex justify-end mb-3">
            <button className="btn btn-square btn-sm" onClick={() => setShowMenu(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <div className='p-0 my-2 h-full w-full overflow-hidden hover:overflow-y-auto'>
          <Link href="/admin/dashboard"><label className={(!pathName.includes("/admin/dashboard") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiHome /> Dashboard</label></Link>
          <Link href="/admin/shop"><label className={(!pathName.includes("/admin/shop") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiShoppingCart /> Shop</label></Link>
          <Link href="/admin/orders"><label className={(!pathName.includes("/admin/orders") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiBox /> Orders</label></Link>
          <Link href="/admin/purchases"><label className={(!pathName.includes("/admin/purchases") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiDollarSign /> Purchases</label></Link>
          <Link href="/admin/payment_methods"><label className={(!pathName.includes("/admin/payment_methods") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiCreditCard /> Payment methods</label></Link>
          <Link href="/admin/users"><label className={(!pathName.includes("/admin/users") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiUsers /> Users</label></Link>

        </div>
        <hr />
        <Link href="/"><label className='btn mb-2 mt-4 w-full'><FiArrowLeft /> USER HOME</label></Link>
        <div tabIndex={0} className='cursor-pointer dropdown dropdown-top flex items-center hover:bg-base-200 p-2 rounded-lg'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
              <div className="avatar placeholder mr-2">
                <div className="bg-blue-700 text-white mask mask-squircle w-10">
                  <span><FiUser /></span>
                </div>
              </div>
              <p className='font-semibold'>{user?.name}</p>
            </div>
            <FiMoreHorizontal />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2">
            <li className='flex' onClick={() => {
              localStorage.clear()
              window.location.href = "/login";
            }}><p><FiLogOut className="text-red-600" />Logout</p></li>
          </ul>
        </div>
      </div>
      <div className='w-full h-full overflow-y-auto'>
        {children}
      </div>
      <ToastContainer />
    </main>
  )
}
