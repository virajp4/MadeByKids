import { Outlet } from "react-router-dom";

import CategoryCarousel from "../HomePage/CategoryCarousel";
import ProductsGrid from "./ProductsGrid";

const ProductPage = () => {
  return (
    <>
      <CategoryCarousel visibleItems={3} />
      <ProductsGrid limit={8} />
    </>
  );
};

export default ProductPage;
