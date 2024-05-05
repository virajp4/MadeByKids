import React from "react";
import { useEffect, useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";

import Input from "../partials/Input";
import { getAuthToken, parseJwt } from "../../utils/auth";

export default function AddProduct() {
  const isNew = window.location.pathname.includes("new");

  const product = useLoaderData();

  const [data, setData] = useState({
    productName: "",
    productDetails: "",
    productPrice: "",
    inventory: "",
  });

  useEffect(() => {
    if (!isNew) {
      setData(product);
    }
  }, [product]);

  function onChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-semibold text-gray-900">{isNew ? "Add" : "Edit"} Talent Details</h1>
      <div>
        <Form method="POST">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <Input label="Product Name" name="productName" value={data.productName} handleChange={onChange} required />
            <Input label="Product Details" name="productDetails" value={data.productDetails} handleChange={onChange} required />
            <Input label="Product Price" name="productPrice" value={data.productPrice} handleChange={onChange} type="number" required />
            <Input label="Inventory" name="inventory" value={data.inventory} handleChange={onChange} type="number" required />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const token = getAuthToken();
  const prodId = params.productId;

  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/shop/${prodId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch product.");
  } else {
    const product = res.data.product;
    return product;
  }
}

export async function action({ request, params }) {
  const token = getAuthToken();
  const userId = parseJwt(token);
  const childId = params.childId;
  const prodId = params.productId;
  const isNew = window.location.pathname.includes("new");

  const data = await request.formData();
  const productData = {
    productName: data.get("productName"),
    productDetails: data.get("productDetails"),
    productPrice: data.get("productPrice"),
    inventory: data.get("inventory"),
    childId: childId,
  };

  if (isNew) {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/children/${childId}/products`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error("Failed to add product.");
    }
  } else {
    const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/children/${childId}/products/${prodId}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error("Failed to edit product.");
    }
  }
  return redirect(`/user/children/${childId}`);
}
