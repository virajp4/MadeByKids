import React, { useEffect, useState } from "react";
import { NavLink, Form, useRouteLoaderData } from "react-router-dom";

import NavItem from "./NavItem";

const pages = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Shop",
    link: "/shop",
  },
  {
    name: "Contact Us",
    link: "/contact",
  },
  {
    name: "Login",
    link: "/auth?mode=login",
  },
  {
    name: "Register",
    link: "/auth?mode=register",
  },
];

export default function Navbar() {
  const navClass =
    "block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-black md:hover:text-gray-300 md:p-0 text-white";

  const token = useRouteLoaderData("root");

  return (
    <nav className="bg-gray-900 w-full">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">MadeByKids</span>
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            {pages.map((page) => {
              if (page.name === "Login" && token) return null;
              if (page.name === "Register" && token) return null;
              return <NavItem key={page.name} title={page.name} href={page.link} />;
            })}
            {token && (
              <Form className={navClass} action="/logout" method="POST">
                <button>Logout</button>
              </Form>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
