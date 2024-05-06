import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { getCart, getCartId, getCartItemInventory } from "../../utils/functions";
import { useUserContext } from "../../store/UserContext";
import { getAuthToken, parseJwt } from "../../utils/auth";

export default function CartButton({ productId }) {
  const { setCart, setCartLength } = useUserContext();
  const [prodProps, setProdProps] = useState({
    quantity: 0,
    limit: 0,
  });

  useEffect(() => {
    async function fetchCart() {
      const backendCart = await getCart();
      const limit = await getCartItemInventory(productId);
      const quantity = getQuantity(backendCart, productId);
      setCart(backendCart);
      setProdProps({ quantity, limit });
    }
    fetchCart();
  }, []);

  async function onAdd() {
    if (prodProps.quantity >= prodProps.limit) return;
    try {
      await addProductToCart(productId, 1);
      setProdProps((prev) => ({ ...prev, quantity: prev.quantity + 1 }));

      const backendCart = await getCart();
      setCart(backendCart);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  }

  async function onRemove() {
    if (prodProps.quantity === 0) return;
    try {
      await removeProductFromCart(productId, 1);
      setProdProps((prev) => ({ ...prev, quantity: prev.quantity - 1 }));

      const backendCart = await getCart();
      setCart(backendCart);
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  }

  async function addProductToCart(productId, quantity) {
    const token = getAuthToken();
    const userId = parseJwt(token);

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/${userId}/cart/add`,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status !== 200) {
      throw new Error(res.data.error);
    }
  }

  async function removeProductFromCart(productId, quantity) {
    const token = getAuthToken();
    const userId = parseJwt(token);
    const cartId = await getCartId();

    const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/cart/${cartId}/items/${productId}`, {
      data: { quantity },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error(res.data.error);
    }
  }

  return (
    <div>
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
        <span className="border border-gray-200 rounded-full outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center">
          {prodProps.quantity}
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
      {prodProps.quantity >= prodProps.limit && <p className="text-red-500 text-sm text-center">You have reached the limit</p>}
    </div>
  );
}

const getQuantity = (cart, productId) => {
  const item = cart.find((item) => item.productId === productId);
  return item ? item.quantity : 0;
};
