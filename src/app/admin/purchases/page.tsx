"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiDollarSign, FiDownload } from "react-icons/fi";
import { currencySymbol, serverURL } from "@/utils/utils";

export default function Page() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/admin/purchases`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="animate-fade-in-bottom w-full h-full p-4">
      <p className="font-semibold text-xl flex items-center">
        <FiDollarSign className="mr-2" /> Purchases
      </p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Purchase Date</th>
              <th>User</th>
              <th>Email</th>
              <th>Item</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, i: number) => {
              return (
                <tr key={i} className="hover">
                  <th>1</th>
                  <td>{item?.date}</td>
                  <td>{item?.user}</td>
                  <td>
                    <Link
                      href={`mailto:${item?.email}`}
                      target="_blank"
                      className="underline"
                    >
                      {item?.email}
                    </Link>
                  </td>
                  <td>{item?.item}</td>
                  <td>
                    {currencySymbol} {item?.amount}
                  </td>
                  <td>{item?.paymentMethod}</td>
                  <td>
                    <Link href={"/invoice/" + item?._id}>
                      <button className="btn btn-md">
                        <FiDownload />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
