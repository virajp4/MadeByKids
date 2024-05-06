import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";

import { useUserContext } from "../../store/UserContext";

import NavItem from "./NavItem";

export default function Navbar() {
  const { cartLength } = useUserContext();

  const navClass =
    "block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-black md:hover:text-gray-300 md:p-0 text-white";

  const token = useRouteLoaderData("root");

  const pages = [
    {
      name: "Home",
      link: "/",
      condition: () => true,
    },
    {
      name: "Shop",
      link: "/shop",
      condition: () => true,
    },
    {
      name: "Login",
      link: "/auth?mode=login",
      condition: (token) => !token,
    },
    {
      name: "Register",
      link: "/auth?mode=register",
      condition: (token) => !token,
    },
    {
      name: "User",
      link: "/user",
      condition: (token) => token,
    },
    {
      name: "Talents",
      link: "/talents",
      condition: (token) => token,
    },
    {
      name: `Cart (${cartLength})`,
      link: "/user/cart",
      condition: (token) => token,
    },
    {
      name: "Logout",
      link: "/logout",
      condition: (token) => token,
      isLogout: true,
    },
  ];

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
              if (page.condition(token)) {
                return <NavItem key={page.name} title={page.name} href={page.link} isLogout={page.isLogout} />;
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
