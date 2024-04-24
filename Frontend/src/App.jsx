import { useEffect } from "react";
import { RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layouts/HomeLayout/Layout";
import ProductLayout from "./components/Layouts/ProductLayout/ProductLayout";
import HomePage from "./components/HomePage/HomePage";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import Product from "./components/ProductsPage/Product";
import LoginPage from "./components/AuthPage/LoginPage";
import RegisterPage from "./components/AuthPage/RegisterPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "shop",
          element: <ProductLayout />,
          children: [
            { index: true, element: <ProductsPage /> },
            {
              path: ":productId",
              id: "product-detail",
              element: <Product />,
              children: [{ path: "edit", element: <h1>Edit Product</h1>, id: "edit-product" }],
            },
            {
              path: "new",
              element: <h1>New Product</h1>,
              id: "new-product",
            },
          ],
        },
        {
          path: "login",
          element: <LoginPage />
        },
        {
          path: "register",
          element: <RegisterPage />
        },
        { path: "*", element: <h1>404 Not Found</h1> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;