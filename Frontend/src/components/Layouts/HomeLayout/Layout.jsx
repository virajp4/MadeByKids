import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="h-fit max-w-screen bg-[#FAFAFA]">
      <Navbar />
      <div className="min-h-screen h-fit flex-grow mb-5 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
