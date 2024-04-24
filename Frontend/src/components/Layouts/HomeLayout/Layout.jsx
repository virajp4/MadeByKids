import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <div className="bg-[#FAFAFA] font-inter w-screen min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
