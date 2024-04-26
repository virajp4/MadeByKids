import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layouts/HomeLayout/Layout";
import ProductLayout from "./components/Layouts/ProductLayout/ProductLayout";
import HomePage from "./components/HomePage/HomePage";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import Product from "./components/ProductsPage/Product";
import AuthPage, { action as authAction } from "./components/AuthPage/AuthPage";
import { action as LogoutAction } from "./components/AuthPage/Logout";

import { checkAuthLoader, tokenLoader } from "./utils/auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      id: "root",
      loader: tokenLoader,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "shop",
          element: <ProductLayout />,
          children: [
            { index: true, element: <ProductsPage /> },
            {
              path: ":productId",
              element: <Product />,
              children: [
                { path: "edit", element: <h1>Edit Product</h1>, loader: checkAuthLoader }
              ],
            },
            {
              path: "new",
              element: <h1>New Product</h1>,
              id: "new-product",
              loader: checkAuthLoader,
            },
          ],
        },
        {
          path: "auth",
          element: <AuthPage />,
          action: authAction,
        },
        {
          path: "logout",
          action: LogoutAction,
        },
        { path: "*", element: <h1>404 Not Found</h1> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
