import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="max-w-screen bg-[#FAFAFA]">
      <Navbar />
      <div className="flex-grow mb-5 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
