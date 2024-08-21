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
    imepay: boolean;
    esewa: boolean;
    khalti: boolean;
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

  const handleToggle = (method: keyof PaymentMethodData) => {
    if (data) {
      const updatedData = { ...data, [method]: !data[method] };
      setData(updatedData);
      saveData(updatedData);
    }
  };

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
            {data && Object.keys(data).map((method, index) => (
              <tr className="hover" key={method}>
                <th>{index + 1}</th>
                <td>{method.charAt(0).toUpperCase() + method.slice(1)}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle"
                    onChange={() => handleToggle(method as keyof PaymentMethodData)}
                    checked={data[method as keyof PaymentMethodData]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}