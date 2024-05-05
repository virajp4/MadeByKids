import React from "react";
import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";

import { getAuthToken, parseJwt } from "../../utils/auth";
import ShowProduct from "./ShowProduct";

export default function TalentPage() {
  const { childData, childProducts } = useLoaderData();

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col w-full sm:w-[80%] md:w-[75%] lg:w-[55%] p-4 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2.5 justify-center items-center">
              <img src="https://readymadeui.com/team-1.webp" className="rounded-full w-20 md:w-32 shadow-md border-4 border-stone-400" />
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 h-fit">{childData.childName}</h3>
                <Link to="/user/new" className="flex">
                  <div className="text-sm text-gray-900 hover:text-gray-500 h-fit mr-1.5">Edit Profile</div>
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </div>
            </div>
            <div className="rounded-md shadow-sm flex justify-center items-center flex-wrap md:flex-nowrap gap-1" role="group">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg focus:z-10 focus:ring-2 bg-gray-700 border-gray-700 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
              >
                <i className="fa-solid fa-plus"></i>
                <Link to={`/shop/${childData.childId}/new`} className="font-medium text-sm px-1">
                  New Product
                </Link>
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border-t border-b focus:z-10 focus:ring-2 bg-gray-700 border-gray-700 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
              >
                <i className="fa-solid fa-shop"></i>
                <Link to="/shop" className="font-medium text-sm px-1">
                  Marketplace
                </Link>
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg focus:z-10 focus:ring-2 bg-gray-700 border-gray-700 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
              >
                <i className="fa-solid fa-house"></i>
                <Link to="/shop" className="font-medium text-sm px-1">
                  Browse
                </Link>
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col gap-3">
            <div className="flex items-center flex-col">
              <h3 className="text-xl font-bold flex-1 text-black">Manage your products:</h3>
              <div className="p-4 sm:px-5 sm:py-5 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 xl:gap-x-8">
                  {childProducts.map((prod, idx) => {
                    return <ShowProduct key={idx} {...prod} childId={childData["childId"]} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

async function fetchChildData(token, userId, childId) {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/children/${childId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch user data.");
  } else {
    return res.data.child;
  }
}

async function fetchChildProducts(token, userId, childId) {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/children/${childId}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch user data.");
  } else {
    return res.data.products;
  }
}

export async function loader({ params, request }) {
  const token = getAuthToken();
  const userId = parseJwt(token);
  const childId = params.childId;

  const childData = await fetchChildData(token, userId, childId);
  const childProducts = await fetchChildProducts(token, userId, childId);

  return { childData, childProducts };
}
