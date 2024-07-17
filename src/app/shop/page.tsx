
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { currencySymbol, serverURL } from "@/utils/utils";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiCreditCard, FiShoppingCart } from "react-icons/fi";

export default function Page() {
    const [paymentMethods, setPaymentMethods] = useState<any>();
    const [items, setItems] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("stripe"); // ["stripe", "razorpay", "manual"]

    const getItems = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/shop`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        };

        axios(config)
            .then((response) => {
                setItems(response.data.items);
                setPaymentMethods(response.data.paymentMethods);
            })
    }

    useEffect(() => {
        getItems();
    }, []);

    return <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
        <p className="flex items-center mb-5 font-semibold text-2xl max-sm:mb-3"><Link href="/"><FiArrowLeft className="mr-5" /></Link> <FiShoppingCart className="mr-2" /> Shop</p>
        <div className="animate-fade-in-bottom w-full h-full flex items-center justify-center flex-wrap overflow-y-auto">
            {
                items.map((item: any, i: number) => {
                    return <div key={i} onClick={() => setSelectedItem(i)} className={(selectedItem === i ? "border-primary " : "") + "cursor-pointer border-2 select-none card w-96 bg-base-100 hover:bg-base-200 duration-75 active:scale-95 shadow-xl mr-5 mb-5"}>
                        <div className="card-body">
                            <h2 className="card-title">
                                {item?.title}
                                <div className="badge badge-secondary">{["Free", "Paid"][item?.type]}</div>
                                {!item?.enable ? <div className="badge badge-ghost">Disabled</div> : ""}
                            </h2>
                            <p className="font-semibold text-4xl mb-4">{currencySymbol} {item?.price}</p>
                            <p className='flex items-center'><FiCheckCircle className='mr-2' />{item?.rewriteLimit} credits</p>
                        </div>
                    </div>
                })
            }
        </div>
        {!paymentMethods?.razorpay && !paymentMethods?.stripe && !paymentMethods?.manual ? <p className="text-center mb-10 text-red-600">No payment method available</p> : <div className="flex justify-center my-5">
            <label htmlFor="paymentmethod_modal" className="btn btn-primary" >Buy Now <FiArrowRight /></label>
        </div>}
        {/* Payment Method Modal */}
        <input type="checkbox" id="paymentmethod_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiCreditCard className="mr-1" /> Select Payment Method</h3>
                {paymentMethods?.stripe ? <div onClick={() => setPaymentMethod("stripe")} className={(paymentMethod === "stripe" ? "border-primary " : "") + "cursor-pointer border-2 select-none card bg-base-100 hover:bg-base-200 duration-75 active:scale-95 shadow-xl mr-5 my-4"}>
                    <div className="card-body">
                        <h2 className="card-title">
                            Stripe
                        </h2>
                    </div>
                </div> : ""}
                {paymentMethods?.razorpay ? <div onClick={() => setPaymentMethod("razorpay")} className={(paymentMethod === "razorpay" ? "border-primary " : "") + "cursor-pointer border-2 select-none card bg-base-100 hover:bg-base-200 duration-75 active:scale-95 shadow-xl mr-5 my-4"}>
                    <div className="card-body">
                        <h2 className="card-title">
                            Razorpay
                        </h2>
                    </div>
                </div> : ""}
                {paymentMethods?.manual ? <div onClick={() => setPaymentMethod("manual")} className={(paymentMethod === "manual" ? "border-primary " : "") + "cursor-pointer border-2 select-none card bg-base-100 hover:bg-base-200 duration-75 active:scale-95 shadow-xl mr-5 my-4"}>
                    <div className="card-body">
                        <h2 className="card-title">
                            Manual Payment
                        </h2>
                    </div>
                </div> : ""}
                <div className="modal-action mt-10">
                    <label htmlFor="paymentmethod_modal" className="btn">Cancel</label>
                    <label className="btn btn-primary" onClick={() => window.location.href = `/shop/payment?item=${items[selectedItem]?._id}&method=${paymentMethod}`}>Pay</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="paymentmethod_modal">Cancel</label>
            <label htmlFor="paymentmethod_modal" hidden></label>
        </div>
    </main>
}