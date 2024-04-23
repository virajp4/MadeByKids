import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div style={{ maxWidth: "100vw" }}>
      <Navbar />
      <div className="">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}