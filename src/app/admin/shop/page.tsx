"use client";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { serverURL } from "@/utils/utils";
import {
  FiCheckCircle,
  FiDollarSign,
  FiEdit,
  FiFile,
  FiPlus,
  FiShoppingCart,
  FiTrash,
} from "react-icons/fi";

type Item = {
  _id: string;
  enable: boolean;
  title: string;
  rewriteLimit: number;
  country: string;
  currency: string;
  price: number;
  features: string[];
};

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState<string>("");
  const [rewriteLimit, setRewriteLimit] = useState<number>(1);
  const [enable, setEnable] = useState<boolean>(true);
  const [country, setCountry] = useState<string>("US");
  const [currency, setCurrency] = useState<string>("USD");
  const [price, setPrice] = useState<number>(0);
  const [features, setFeatures] = useState<string[]>([]);
  const [editItemId, setEditItemId] = useState<string>("");

  const getItems = async () => {
    try {
      const response = await axios.get(`${serverURL}/admin/shop`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setItems(response.data);
    } catch (error) {
      toast.error("Failed to fetch items!");
    }
  };

  const createItem = async () => {
    if (!title) return toast.error("Please enter a title!");
    if (!rewriteLimit) return toast.error("Please enter a rewrite limit!");
    if (!price) return toast.error("Please enter a price!");

    try {
      await axios.post(
        `${serverURL}/admin/shop/create`,
        {
          title,
          rewriteLimit,
          country,
          currency,
          price,
          features,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Item created!");
      resetForm();
      getItems();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const editItem = async () => {
    if (!title) return toast.error("Please enter a title!");
    if (!rewriteLimit) return toast.error("Please enter a rewrite limit!");
    if (!price) return toast.error("Please enter a price!");

    try {
      await axios.post(
        `${serverURL}/admin/shop/edit`,
        {
          itemId: editItemId,
          enable,
          title,
          rewriteLimit,
          country,
          currency,
          price,
          features,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Item updated!");
      resetForm();
      getItems();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const disableItem = async (itemId: string) => {
    try {
      await axios.post(
        `${serverURL}/admin/shop/disable`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Item disabled!");
      getItems();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const resetForm = () => {
    setTitle("");
    setRewriteLimit(1);
    setEnable(true);
    setCountry("US");
    setCurrency("USD");
    setPrice(0);
    setFeatures([]);
    setEditItemId("");
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="animate-fade-in-bottom w-full h-full p-4">
      <p className="font-semibold text-xl flex items-center mb-4">
        <FiShoppingCart className="mr-2" /> Shop
      </p>
      <div className="w-full flex flex-wrap">
        {items.map((item, i) => (
          <div
            key={i}
            className="select-none card w-96 bg-base-100 shadow-xl mr-5 mb-5"
          >
            <div className="card-body">
              <h2 className="card-title">
                {item.title}
                {!item.enable && (
                  <div className="badge badge-ghost">Disabled</div>
                )}
              </h2>
              <p className="font-semibold text-4xl mb-4">
                {item.currency} {item.price} ({item.country})
              </p>
              <p className="flex items-center">
                <FiCheckCircle className="mr-2" />
                {item.rewriteLimit} rewrites
              </p>
              <div className="card-actions justify-end">
                <label
                  htmlFor="edititem_modal"
                  className="btn btn-sm"
                  onClick={() => {
                    setTitle(item.title);
                    setRewriteLimit(item.rewriteLimit);
                    setEditItemId(item._id);
                    setEnable(item.enable);
                    setCountry(item.country);
                    setCurrency(item.currency);
                    setPrice(item.price);
                    setFeatures(item.features);
                  }}
                >
                  <FiEdit />
                  Edit
                </label>
                <button
                  className="btn btn-sm"
                  onClick={() => disableItem(item._id)}
                >
                  <FiTrash />
                  Disable
                </button>
              </div>
            </div>
          </div>
        ))}
        <label
          htmlFor="newitem_modal"
          className="btn h-auto min-h-[30vh] card w-96 bg-base-100 shadow-xl mr-5 mb-5"
        >
          <FiPlus className="text-4xl" />
          <p>New Item</p>
        </label>
      </div>
      {/* New Item Modal */}
      <input type="checkbox" id="newitem_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg">
            <FiShoppingCart className="mr-1" /> New Item
          </h3>
          <p className="flex items-center py-4">
            <FiFile className="mr-2" />
            Title
          </p>
          <input
            className="input input-bordered w-full"
            placeholder="Item title"
            type="text"
            onChange={(x) => setTitle(x.target.value)}
            value={title}
          />
          <p className="flex items-center py-4">
            <FiEdit className="mr-2" />
            Rewrite Limit
          </p>
          <input
            className="input input-bordered w-full"
            placeholder="Limit"
            type="number"
            min={1}
            onChange={(x) => setRewriteLimit(parseInt(x.target.value))}
            value={rewriteLimit}
          />
          <p className="flex items-center py-4">
            <FiDollarSign className="mr-2" />
            Pricing
          </p>
          <div className="flex items-center mb-2">
            <select
              className="select select-bordered w-full mr-2"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            >
              <option value="US">United States</option>
              <option value="NP">Nepal</option>
              <option value="IN">India</option>
            </select>
            <select
              className="select select-bordered w-full mr-2"
              onChange={(e) => setCurrency(e.target.value)}
              value={currency}
            >
              <option value="USD">USD</option>
              <option value="NPR">NPR</option>
              <option value="INR">INR</option>
            </select>
            <input
              className="input input-bordered w-full"
              placeholder="Price"
              type="number"
              min={0}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              value={price}
            />
          </div>
          <p className="flex items-center py-4">
            <FiFile className="mr-2" />
            Features
          </p>
          <input
            className="input input-bordered w-full"
            placeholder="Enter features separated by commas"
            type="text"
            onChange={(e) =>
              setFeatures(e.target.value.split(",").map((f) => f.trim()))
            }
            value={features.join(", ")}
          />
          <div className="modal-action">
            <label htmlFor="newitem_modal" className="btn">
              Cancel
            </label>
            <label
              htmlFor="newitem_modal"
              className="btn btn-primary"
              onClick={() => createItem()}
            >
              Create item
            </label>
          </div>
        </div>
      </div>
      {/* Edit Item Modal */}
      <input type="checkbox" id="edititem_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg">
            <FiEdit className="mr-1" /> Edit Item
          </h3>
          <div className="form-control py-4">
            <label className="label cursor-pointer">
              <span className="flex items-center">
                <FiCheckCircle className="mr-2" />
                Enable
              </span>
              <input
                type="checkbox"
                className="toggle"
                onChange={(x) => setEnable(x.target.checked)}
                checked={enable}
              />
            </label>
          </div>
          <p className="flex items-center py-4">
            <FiFile className="mr-2" />
            Title
          </p>
          <input
            className="input input-bordered w-full"
            placeholder="Item title"
            type="text"
            onChange={(x) => setTitle(x.target.value)}
            value={title}
          />
          <p className="flex items-center py-4">
            <FiEdit className="mr-2" />
            Rewrite Limit
          </p>
          <input
            className="input input-bordered w-full"
            placeholder="Limit"
            type="number"
            min={1}
            onChange={(x) => setRewriteLimit(parseInt(x.target.value))}
            value={rewriteLimit}
          />
          <p className="flex items-center py-4">
            <FiDollarSign className="mr-2" />
            Pricing
          </p>
          <div className="flex items-center mb-2">
            <select
              className="select select-bordered w-full mr-2"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            >
              <option value="US">United States</option>
              <option value="NP">Nepal</option>
              <option value="IN">India</option>
            </select>
            <select
              className="select select-bordered w-full mr-2"
              onChange={(e) => setCurrency(e.target.value)}
              value={currency}
            >
              <option value="USD">USD</option>
              <option value="NPR">NPR</option>
              <option value="INR">INR</option>
            </select>
            <input
              className="input input-bordered w-full"
              placeholder="Price"
              type="number"
              min={0}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              value={price}
            />
          </div>
          <p className="flex items-center py-4">
            <FiFile className="mr-2" />
            Features
          </p>
          <input
            className="input input-bordered w-full"
            placeholder="Enter features separated by commas"
            type="text"
            onChange={(e) =>
              setFeatures(e.target.value.split(",").map((f) => f.trim()))
            }
            value={features.join(", ")}
          />
          <div className="modal-action">
            <label htmlFor="edititem_modal" className="btn">
              Cancel
            </label>
            <label
              htmlFor="edititem_modal"
              className="btn btn-primary"
              onClick={() => editItem()}
            >
              Save
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}