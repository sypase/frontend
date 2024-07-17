"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { serverURL } from "../../../utils/utils";
import { FiUser, FiUsers } from "react-icons/fi";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/admin/users`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="animate-fade-in-bottom w-full h-full p-4">
      <p className="font-semibold text-xl flex items-center">
        <FiUsers className="mr-2" /> Users
      </p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>Email</th>
              <th>Rewrites Left</th>
              <th>Purchases</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar placeholder mr-2">
                        <div className="bg-blue-700 text-white mask mask-squircle w-10">
                          <span>
                            <FiUser />
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Link
                      href={`mailto:${user?.email}`}
                      target="_blank"
                      className="underline"
                    >
                      {user?.email}
                    </Link>
                  </td>
                  <td>{user?.rewrites}</td>
                  <td>{user?.purchases}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
