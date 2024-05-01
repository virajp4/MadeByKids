import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Navbar from "../../partials/Navbar";
import Footer from "../../partials/Footer";
import { getTokenDuration, parseJwt } from "../../../utils/auth";
import { useUserContext } from "../../../store/UserContext";

export default function Layout() {
  const token = useLoaderData();
  const { userId, setUserId } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    setUserId("");
  }

  async function checkNewUser(token, userId) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newUser = response.data.user.newUser;
      if (newUser === 1) {
        navigate("/user/create");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    if (!token) {
      logout();
      return;
    }

    if (token === "EXPIRED") {
      logout();
      return;
    }

    const userId = parseJwt(token);
    setUserId(userId);
    const timeoutIdOne = setTimeout(() => {
      checkNewUser(token, userId);
    }, 1000);

    const tokenDuration = getTokenDuration();
    const timeoutIdTwo = setTimeout(() => {
      logout();
    }, tokenDuration);

    return () => {
      clearTimeout(timeoutIdOne);
      clearTimeout(timeoutIdTwo);
    };
  }, [token, userId, pathname]);

  return (
    <div className="bg-[#FAFAFA] font-inter max-w-screen min-h-screen max-h-full flex flex-col">
      <Navbar />
      <div className="flex-grow flex justify-center items-center pb-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
