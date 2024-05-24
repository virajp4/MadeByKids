import React from "react";
import axios from "axios";

import CategoryCarousel from "../HomePage/CategoryCarousel";
import ProductsGrid from "./ProductsGrid";
import { getAuthToken } from "../../utils/auth";
import { useLoaderData } from "react-router-dom";

export default function ProductPage() {
  const products = useLoaderData();

  return (
    <div className="max-w-screen-xl overflow-x-hidden">
      <CategoryCarousel visibleItems={100} />
      <ProductsGrid limit={8} products={products} />
    </div>
  );
}

export async function loader({ params }) {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/shop`);

  if (response.status !== 200) {
    throw new Error("Failed to load products");
  }

  const products = response.data.products;
  return products;
}
