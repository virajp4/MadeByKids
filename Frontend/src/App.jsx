import { useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout/Layout";
import HomePage from "./components/HomePage/HomePage";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0, "smooth");
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [location]);
  return null;
}

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <>
          <ScrollToTop />
          <Layout />
        </>
      ),
      children: [
        { path: "/", element: <HomePage /> },
        { path: "*", element: <h1>404 Not Found</h1>}
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;