import React, { useEffect } from "react";

import CategoryCarousel from "./CategoryCarousel";
import ProductsGrid from "../ProductsPage/ProductsGrid";

export default function HomePage() {
  return (
    <div>
      <div className="bg-black w-100 h-[200px]"></div>
      <CategoryCarousel />
      <ProductsGrid limit={2} />
      <div className="flex justify-center items-center">
        <div className=" w-50 px-16 py-3 bg-yellow-300 border border-0.5 border-black rounded-full">Start Shopping</div>
      </div>
    </div>
  );
}
