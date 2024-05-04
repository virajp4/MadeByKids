import React from "react";
import axios from "axios";
import { Form, redirect, useLoaderData } from "react-router-dom";

import CreateSection from "./CreateSection";
import { parseJwt, getAuthToken } from "../../utils/auth";

export default function CreateUser() {
  const userData = useLoaderData();

  return (
    <>
      <div className="flex flex-col gap-5 p-5 w-full sm:w-[85%] md:w-[60%]">
        <h1 className="text-2xl font-semibold text-gray-900">Add your details</h1>
        <div>
          <Form method="POST">
            <CreateSection data={userData} />
          </Form>
        </div>
      </div>
    </>
  );
}

export async function loader({ request }) {
  const token = getAuthToken();
  const userId = parseJwt(token);
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const isNewUser = res.data.user.newUser;
  const emptyData = {
    userName: "",
    userAddress: "",
    userRole: "",
    userEmail: "",
    userLang: "",
  };

  if (isNewUser === 1) return emptyData;
  else {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch user data.");
    }
    return res.data.user;
  }
}

export async function action({ request }) {
  const data = await request.formData();
  const token = localStorage.getItem("token");
  const userId = parseJwt(token);

  const formData = {
    userName: data.get("userName"),
    userEmail: data.get("userEmail"),
    userAddress: data.get("userAddress"),
    userRole: data.get("userRole"),
    userLang: data.get("userLang"),
  };

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return redirect("/user");
    } else {
      throw new Error("Unknown error");
    }
  } catch (error) {
    console.error("Error posting data:", error);
    throw new Error(error.response.data.message || "Unknown error");
  }
}
