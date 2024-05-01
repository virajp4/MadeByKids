import React, { useEffect } from "react";
import axios from "axios";
import { useRouteLoaderData, useNavigate, Form, redirect } from "react-router-dom";

import CreateSection from "./CreateSection";
import { parseJwt } from "../../utils/auth";

async function checkFirstTimeUser(token) {
  const userId = parseJwt(token);

  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const isNewUser = res.data.user.newUser;
  if (isNewUser === 1) return true;
  else return false;
}

export default function CreateUser() {
  const token = useRouteLoaderData("user");
  const navigate = useNavigate();

  useEffect(() => {
    function check() {
      const isNew = checkFirstTimeUser(token);
      if (!isNew) {
        navigate("/user");
      }
    }
    check();
  }, [token]);

  return (
    <>
      <div className="flex flex-col gap-5 p-5 w-full sm:w-[85%] md:w-[60%]">
        <h1 className="text-2xl font-semibold text-gray-900">Add your details</h1>
        <div>
          <Form method="POST">
            <CreateSection />
          </Form>
        </div>
      </div>
    </>
  );
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
