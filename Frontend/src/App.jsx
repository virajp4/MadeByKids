import { useEffect } from "react";
import { RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout/Layout";
import HomePage from "./components/HomePage/HomePage";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import Product from "./components/ProductsPage/Product";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "shop",
          element: <ProductsPage />,
          children: [
            {
              path: ":productId",
              id: "product-detail",
              element: <Product />,
              children: [{ path: "edit", element: <h1>Edit Product</h1>, id: "edit-product" }],
            },
            {
              path: 'new',
              element: <h1>New Product</h1>,
              id: 'new-product'
            }
          ],
        },
        { path: "*", element: <h1>404 Not Found</h1> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
