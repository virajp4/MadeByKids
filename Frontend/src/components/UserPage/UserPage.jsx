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
      <div className="bg-white shadow rounded-lg border">
        <div className="m-3">
          <div className="relative flex">
            <img src="https://readymadeui.com/team-1.webp" className="rounded-full w-20 md:w-32 shadow-md border-4 border-stone-400" />
            <div className="m-3">
              <h3 className="text-lg font-bold text-gray-900 h-fit"> {user.userName} </h3>
              <button className="text-sm text-gray-900 hover:text-gray-500 h-fit">Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="m-3">
          <Link to="/user/children/new" className="text-gray-800 font-medium text-sm w-1/3 px-1">
            Add Talent
          </Link>
          <a href="" className="text-gray-800 font-medium text-sm w-1/3 px-1">
            Marketplace
          </a>
          <a href="" className="text-gray-800 font-medium text-sm w-1/3 px-1">
            Browse
          </a>
        </div>
        <div className="bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] px-6 py-8 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
          <div className="flex items-center">
            <h3 className="text-xl font-bold flex-1 text-black">Heading</h3>
          </div>
          {children.map((child, index) => <ChildSection key={index} childName={child.childName} />)}
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
