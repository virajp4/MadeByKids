import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";

import UserContextProvider from "./store/UserContext";

import Layout from "./components/Layouts/HomeLayout/Layout";
import ProductLayout from "./components/Layouts/ProductLayout/ProductLayout";
import UserLayout from "./components/Layouts/UserLayout/UserLayout";
import ChildLayout from "./components/Layouts/UserLayout/ChildLayout";

import HomePage from "./components/HomePage/HomePage";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import Product from "./components/ProductsPage/Product";
import AuthPage, { action as authAction } from "./components/AuthPage/AuthPage";
import TalentDetails from "./components/TalentsPage/TalentDetails";
import UserPage, { loader as userLoader } from "./components/UserPage/UserPage";
import CreateUser, { action as createUserAction, loader as newUserDataLoader } from "./components/UserPage/CreateUser";
import CartPage from "./components/CartPage/CartPage";

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
              children: [{ path: "edit", element: <h1>Edit Product</h1>, loader: checkAuthLoader }],
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
          path: "user",
          element: <UserLayout />,
          loader: checkAuthLoader,
          id: "user",
          children: [
            { index: true, element: <UserPage />, loader: userLoader },
            { path: "new", element: <CreateUser />, action: createUserAction, loader: newUserDataLoader },
            {
              path: "children",
              element: <ChildLayout />,
              children: [
                { index: true, element: <h1>Child Profile</h1> },
                {
                  path: "create",
                  element: <TalentDetails />,
                },
                {
                  path: ":childId",
                  element: <h1>Child Profile</h1>,
                },
                {
                  path: ":childId/edit",
                  element: <TalentDetails />,
                },
              ],
            },
            {
              path: "settings",
              element: <h1>User Settings</h1>,
            },
            {
              path: "cart",
              element: <CartPage />,
            },
          ],
        },
        {
          path: "auth",
          element: <AuthPage />,
          action: authAction,
        },
        { path: "*", element: <h1>404 Not Found</h1> },
      ],
    },
  ]);

  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
