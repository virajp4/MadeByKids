import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full p-2.5 border-t shadow md:flex md:items-center md:justify-between bg-gray-800 border-gray-600">
      <div className="w-full max-w-screen-xl mx-auto p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <span className="self-center text-xl font-bold whitespace-nowrap text-white">
              <span className="text-violet-400">Made</span>ByKids
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-4 sm:mx-auto border-gray-700 lg:my-6" />
        <span className="block text-sm sm:text-center text-gray-400">
          © 2023{" "}
          <Link to="/" className="hover:underline">
            MadeByKids™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
