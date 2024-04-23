import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import CategoryCarousel from "./CategoryCarousel";
import ProductsGrid from "../ProductsPage/ProductsGrid";

export default function HomePage() {
  return (
    <div>
      <div className="bg-black w-100 h-[200px]"></div>
      <CategoryCarousel visibleItems={3} />
      <ProductsGrid limit={2} />
      <div className="flex justify-center items-center">
        <Link to={"/shop"} className=" w-50 px-16 py-3 bg-yellow-300 shadow-xl hover:bg-yellow-400 border-black rounded-full">
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
