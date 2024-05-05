import React from "react";
import { useUserContext } from "../../store/UserContext";

export default function CartButton({ id }) {
  const { setCart } = useUserContext();

  function onAdd() {
    setCart(1);
  }

  function onRemove() {
    setCart(-1);
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={onRemove}
        className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-1.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
      >
        <svg
          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
          width="14"
          height="14"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.5 9.5H13.5" stroke="" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span className="border border-gray-200 rounded-full aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center">
        0
      </span>
      <button
        onClick={onAdd}
        className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-1.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
      >
        <svg
          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
          width="14"
          height="14"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.75 9.5H14.25M9 14.75V4.25" stroke="" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
