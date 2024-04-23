import React, { useEffect } from "react";

import CategoryCarousel from "./CategoryCarousel";
import ProductsGrid from "../ProductsPage/ProductsGrid";

export default function HomePage() {
  return (
    <div>
      <header className="my-2">
        <div className="bg-black w-100 h-[200px]"></div>
      </header>
      <CategoryCarousel />
      <ProductsGrid limit={2} />
    </div>
  );
}
