import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { getTokenDuration } from "../../../utils/auth";

export default function Layout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <div className="bg-[#FAFAFA] font-inter min-w-screen min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center pb-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
