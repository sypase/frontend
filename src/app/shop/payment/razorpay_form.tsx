    // "use client";
    // import axios from 'axios';
    // import { toast } from 'react-toastify';
    // import React, { useEffect } from 'react';

    // export default function RazorpayIntegration(item: any | string) {
    //     useEffect(() => {
    //         const script = document.createElement("script");
    //         script.src = "https://checkout.razorpay.com/v1/checkout.js";
    //         script.async = true;
    //         document.body.appendChild(script);
    //         openPayModal();
    //     }, []);

    //     const openPayModal = async () => {
    //         const config = {
    //             method: 'POST',
    //             url: 'http://localhost:8080/shop/create-order-razorpay',
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             data: { itemId: item.item },
    //         };

    //         const response = await axios(config);

    //         const orderData = response.data;

    //         const options = {
    //             key: orderData.key,
    //             amount: orderData.amount,
    //             currency: orderData.currency,
    //             name: orderData.name,
    //             description: orderData.description,
    //             order_id: orderData.order_id,
    //             prefill: {
    //                 name: orderData.prefill.name,
    //                 email: orderData.prefill.email,
    //             },
    //             handler: async (response: any) => {
    //                 const { razorpay_signature, razorpay_payment_id } = response;

    //                 const values = {
    //                     razorpay_signature,
    //                     razorpay_order_id: orderData.order_id,
    //                     transactionid: razorpay_payment_id,
    //                     transactionamount: orderData.amount,
    //                 };

    //                 try {
    //                     const config = {
    //                         method: 'POST',
    //                         url: 'http://localhost:8080/shop/verify-razorpay-payment',
    //                         headers: {
    //                             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //                             'Content-Type': 'application/json',
    //                         },
    //                         data: values,
    //                     };

    //                     var resp = await axios(config);

    //                     setTimeout(() => {
    //                         window.location.href = '/invoice/' + resp?.data?.purchaseId;
    //                     }, 2000);
    //                 } catch (error) {
    //                     console.error(error);
    //                     alert('Payment failed');
    //                 }
    //             },
    //             theme: orderData.theme,
    //         };

    //         if (typeof window !== 'undefined') {
    //             const rzp1 = new (window as any).Razorpay(options);
    //             rzp1.open();
    //         }
    //     };

    //     return (
    //         <div>
    //         </div>
    //     );
    // };

    import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react';

export default function RazorpayIntegration(item: any | string) {
    useEffect(() => {
        const openPayModal = async () => {
            const config = {
                method: 'POST',
                url: 'http://localhost:8080/shop/create-order-razorpay',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                data: { itemId: item.item },
            };
    
            const response = await axios(config);
    
            const orderData = response.data;
    
            const options = {
                key: orderData.key,
                amount: orderData.amount,
                currency: orderData.currency,
                name: orderData.name,
                description: orderData.description,
                order_id: orderData.order_id,
                prefill: {
                    name: orderData.prefill.name,
                    email: orderData.prefill.email,
                },
                handler: async (response: any) => {
                    const { razorpay_signature, razorpay_payment_id } = response;
    
                    const values = {
                        razorpay_signature,
                        razorpay_order_id: orderData.order_id,
                        transactionid: razorpay_payment_id,
                        transactionamount: orderData.amount,
                    };
    
                    try {
                        const config = {
                            method: 'POST',
                            url: 'http://localhost:8080/shop/verify-razorpay-payment',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                'Content-Type': 'application/json',
                            },
                            data: values,
                        };
    
                        var resp = await axios(config);
    
                        setTimeout(() => {
                            window.location.href = '/invoice/' + resp?.data?.purchaseId;
                        }, 2000);
                    } catch (error) {
                        console.error(error);
                        alert('Payment failed');
                    }
                },
                theme: orderData.theme,
            };
    
            if (typeof window !== 'undefined') {
                const rzp1 = new (window as any).Razorpay(options);
                rzp1.open();
            }
        };
    
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        openPayModal();
    }, [item]); // Include item in the dependency array

    return (
        <div>
        </div>
    );
};
