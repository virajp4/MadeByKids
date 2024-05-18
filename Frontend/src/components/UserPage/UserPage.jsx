import React from "react";
import { useState, useEffect } from "react";
import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";
import axios from "axios";

import ChildSection from "./ChildSection";
import { parseJwt, getAuthToken } from "../../utils/auth";

export default function UserPage() {
  const { user, children } = useLoaderData();

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col w-full sm:w-[80%] md:w-[75%] lg:w-[55%] p-4 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2.5 justify-center items-center">
              <img src="https://readymadeui.com/team-1.webp" className="rounded-full w-20 md:w-32 shadow-md border-4 border-stone-400" />
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 h-fit">{user.userName}</h3>
                <Link to="/user/new" className="flex">
                  <div className="text-sm text-gray-900 hover:text-gray-500 h-fit mr-1.5">Edit Profile</div>
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </div>
            </div>
            <div className="rounded-md shadow-sm flex justify-center items-center gap-1" role="group">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg focus:z-10 focus:ring-2 bg-gray-700 border-gray-700 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
              >
                <i className="fa-solid fa-user-plus"></i>
                <Link to="/user/children/create" className="font-medium text-sm px-1">
                  Add Talent
                </Link>
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg focus:z-10 focus:ring-2 bg-gray-700 border-gray-700 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
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
            <div className="flex items-center">
              <h3 className="text-xl font-bold flex-1 text-black">Manage your talents:</h3>
            </div>
            <div className="flex justify-center items-center gap-4">
              {children.map((child, index) => (
                <ChildSection key={index} data={child} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

async function fetchUser(token, userId) {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status !== 200) {
    throw new Error("Failed to fetch user data.");
  } else {
    return res.data.user;
  }
}

async function fetchChildren(token, userId) {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/children/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status !== 200) {
    throw new Error("Failed to fetch children data.");
  } else {
    return res.data.children;
  }
}

export async function loader({ params, request }) {
  const token = getAuthToken();
  const userId = parseJwt(token);
  const user = await fetchUser(token, userId);
  const children = await fetchChildren(token, userId);
  return { user, children };
}
