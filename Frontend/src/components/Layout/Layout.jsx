import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="w-screen">
      <Navbar />
      <div className="flex-grow mb-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
