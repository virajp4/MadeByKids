import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../../utils/auth";

export default function ShowProduct({ productId, productName, productPrice, childId }) {
  async function deleteProduct() {
    const token = getAuthToken();

    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/shop/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to delete product.");
    }

    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
            alt="Front of men&#039;s Basic Tee in black."
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className=""></span>
              {productName}
            </h3>
            <p className="mt-1 text-sm text-gray-500">Black</p>
          </div>
          <p className="text-sm font-medium text-gray-900">₹{productPrice}</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg focus:z-10 focus:ring-2 bg-gray-700 border-gray-700 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
        >
          <i className="fa-solid fa-pen-to-square"></i>
          <Link to={`/user/children/${childId}/products/${productId}/edit`} className="font-medium text-sm px-1">
            Edit
          </Link>
        </button>
        <button
          onClick={deleteProduct}
          className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg focus:z-10 focus:ring-2 bg-gray-700 border-gray-700 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
        >
          <i className="fa-solid fa-trash"></i>
          <div className="font-medium text-sm px-1">Delete</div>
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg focus:z-10 focus:ring-2 bg-gray-700 border-gray-700 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
        >
          <i className="fa-solid fa-eye"></i>
          <Link to={`/shop/${productId}`} className="font-medium text-sm px-1">
            View In Shop
          </Link>
        </button>
      </div>
    </div>
  );
}
