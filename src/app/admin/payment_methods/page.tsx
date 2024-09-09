"use client";
import axios from "axios";
import { serverURL } from "@/utils/utils";
import { FiCreditCard } from "react-icons/fi";
import React, { useEffect, useState } from "react";

type PaymentMethodData = {
  enabled: boolean;
  currencies: string[];
};

type PaymentMethods = {
  stripe: PaymentMethodData;
  razorpay: PaymentMethodData;
  manual: PaymentMethodData;
  imepay: PaymentMethodData;
  esewa: PaymentMethodData;
  khalti: PaymentMethodData;
};

export default function Page() {
  const [data, setData] = useState<PaymentMethods | null>(null);

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

  const saveData = async (updatedData: PaymentMethods) => {
    const config = {
      method: "POST",
      url: `${serverURL}/admin/payment-methods`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: updatedData,
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

  const handleToggle = (method: keyof PaymentMethods) => {
    if (data) {
      const updatedData = {
        ...data,
        [method]: { ...data[method], enabled: !data[method].enabled },
      };
      setData(updatedData);
      saveData(updatedData);
    }
  };

  return (
    <div className="animate-fade-in-bottom w-full h-full p-4">
      <p className="font-semibold text-xl flex items-center">
        <FiCreditCard className="mr-2" /> Payment Methods
      </p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Payment Method</th>
              <th>Enable</th>
              <th>Currencies</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.entries(data)
                .filter(([method]) => ["stripe", "razorpay", "manual", "imepay", "esewa", "khalti"].includes(method))
                .map(([method, details], index) => (
                  <tr className="hover" key={method}>
                    <th>{index + 1}</th>
                    <td>{method.charAt(0).toUpperCase() + method.slice(1)}</td>
                    <td>
                      <input
                        type="checkbox"
                        className="toggle"
                        onChange={() => handleToggle(method as keyof PaymentMethods)}
                        checked={details.enabled}
                      />
                    </td>
                    <td>{details.currencies?.join(", ") || "N/A"}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
