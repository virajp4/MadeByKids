import React, { useEffect } from "react";
import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";

import CategoryCarousel from "./CategoryCarousel";
import ProductsGrid from "../ProductsPage/ProductsGrid";
import header from "../../assets/header.jpg";

export default function HomePage() {
  const products = useLoaderData();
  const token = useRouteLoaderData("root");
  return (
    <div className="max-w-screen overflow-x-hidden">
      <div className="relative">
        <img src={header} alt="header" className="w-full h-[200px] object-cover" />
        {!token && (
          <div className="absolute inset-x-0 bottom-0 h-[50px] bg-black opacity-75 flex justify-center items-center gap-2 p-4">
            <button className="px-4 py-1 bg-transparent border-white border-2 rounded-full text-white font-semibold">Login </button>
            <button className="px-4 py-1 bg-violet-500 rounded-full text-white font-semibold">Signup</button>
          </div>
        )}
      </div>
      <CategoryCarousel visibleItems={5} />
      <ProductsGrid limit={4} showCart={false} products={products} />
      <div className="flex justify-center items-center">
        <Link to={"/shop"} className="w-50 px-16 py-3 bg-yellow-300 shadow-xl hover:bg-yellow-400 border-black rounded-full">
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
