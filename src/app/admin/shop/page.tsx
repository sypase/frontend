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

type PricingOption = {
  country: string;
  currency: string;
  price: number;
};

export default function Page() {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");
  const [rewriteLimit, setRewriteLimit] = useState<number>(1);
  const [enable, setEnable] = useState<boolean>(false);
  const [pricing, setPricing] = useState<PricingOption[]>([
    { country: "US", currency: "USD", price: 0 },
  ]);
  const [features, setFeatures] = useState<string[]>([]);
  const [editItemId, setEditItemId] = useState<string>("");
  const [deleteItemId, setDeleteItemId] = useState<string>("");

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
    if (pricing.some((p) => !p.price))
      return toast.error("Please enter a price for all pricing options!");

    try {
      await axios.post(
        `${serverURL}/admin/shop/create`,
        {
          title,
          rewriteLimit,
          pricing,
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
    if (pricing.some((p) => !p.price))
      return toast.error("Please enter a price for all pricing options!");

    try {
      await axios.post(
        `${serverURL}/admin/shop/edit`,
        {
          itemId: editItemId,
          enable,
          title,
          rewriteLimit,
          pricing,
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

  const deleteItem = async () => {
    try {
      await axios.post(
        `${serverURL}/admin/shop/delete`,
        { itemId: deleteItemId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Item deleted!");
      getItems();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const resetForm = () => {
    setTitle("");
    setRewriteLimit(1);
    setEnable(false);
    setPricing([{ country: "US", currency: "USD", price: 0 }]);
    setFeatures([]);
    setEditItemId("");
  };

  const handlePricingChange = (
    index: number,
    field: keyof PricingOption,
    value: string | number
  ) => {
    const newPricing = [...pricing];
    newPricing[index] = { ...newPricing[index], [field]: value };
    setPricing(newPricing);
  };

  const addPricingOption = () => {
    setPricing([...pricing, { country: "US", currency: "USD", price: 0 }]);
  };

  const removePricingOption = (index: number) => {
    const newPricing = pricing.filter((_, i) => i !== index);
    setPricing(newPricing);
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
                {item?.title}
                {!item?.enable && (
                  <div className="badge badge-ghost">Disabled</div>
                )}
              </h2>
              {(item?.pricing || []).map((p: PricingOption, index: number) => (
                <p key={index} className="font-semibold text-4xl mb-4">
                  {p.currency} {p.price} ({p.country})
                </p>
              ))}
              <p className="flex items-center">
                <FiCheckCircle className="mr-2" />
                {item?.rewriteLimit} rewrites
              </p>
              <div className="card-actions justify-end">
                <label
                  htmlFor="edititem_modal"
                  className="btn btn-sm"
                  onClick={() => {
                    setTitle(item?.title);
                    setRewriteLimit(item?.rewriteLimit);
                    setEditItemId(item?._id);
                    setEnable(item?.enable);
                    setPricing(item?.pricing || []);
                    setFeatures(item?.features || []);
                  }}
                >
                  <FiEdit />
                  Edit
                </label>
                <label
                  htmlFor="deleteitem_modal"
                  className="btn btn-sm"
                  onClick={() => setDeleteItemId(item?._id)}
                >
                  <FiTrash />
                  Delete
                </label>
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
            Pricing Options
          </p>
          {pricing.map((p, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <select
                  className="select select-bordered w-full mr-2"
                  onChange={(e) =>
                    handlePricingChange(index, "country", e.target.value)
                  }
                  value={p.country}
                >
                  <option value="US">United States</option>
                  <option value="NP">Nepal</option>
                  {/* Add more countries as needed */}
                </select>
                <select
                  className="select select-bordered w-full mr-2"
                  onChange={(e) =>
                    handlePricingChange(index, "currency", e.target.value)
                  }
                  value={p.currency}
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
                  onChange={(e) =>
                    handlePricingChange(index, "price", parseInt(e.target.value))
                  }
                  value={p.price}
                />
                <button
                  className="btn btn-error btn-sm ml-2"
                  onClick={() => removePricingOption(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button className="btn btn-secondary btn-sm" onClick={addPricingOption}>
            Add Pricing Option
          </button>
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
            Pricing Options
          </p>
          {pricing.map((p, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <select
                  className="select select-bordered w-full mr-2"
                  onChange={(e) =>
                    handlePricingChange(index, "country", e.target.value)
                  }
                  value={p.country}
                >
                  <option value="US">United States</option>
                  <option value="NP">Nepal</option>
                  {/* Add more countries as needed */}
                </select>
                <select
                  className="select select-bordered w-full mr-2"
                  onChange={(e) =>
                    handlePricingChange(index, "currency", e.target.value)
                  }
                  value={p.currency}
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
                  onChange={(e) =>
                    handlePricingChange(index, "price", parseInt(e.target.value))
                  }
                  value={p.price}
                />
                <button
                  className="btn btn-error btn-sm ml-2"
                  onClick={() => removePricingOption(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button className="btn btn-secondary btn-sm" onClick={addPricingOption}>
            Add Pricing Option
          </button>
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
      {/* Delete Item Modal */}
      <input type="checkbox" id="deleteitem_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="flex items-center font-bold text-lg">
            <FiTrash className="mr-1" /> Delete Item
          </h3>
          <p className="py-4">Are you sure you want to delete this item?</p>
          <div className="modal-action">
            <label htmlFor="deleteitem_modal" className="btn">
              Cancel
            </label>
            <label
              htmlFor="deleteitem_modal"
              className="btn btn-error"
              onClick={() => deleteItem()}
            >
              Delete
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="deleteitem_modal">
          Cancel
        </label>
      </div>
    </div>
  );
}
