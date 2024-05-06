import React from "react";

import { getCart } from "../../utils/functions";
import { useUserContext } from "../../store/UserContext";
import CartItem from "./CartItem";

export default function CartPage() {
  const { cart } = useUserContext();
  const total = getCartTotal(cart);
  
  return (
    <section class="py-24 relative">
      <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 class="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart</h2>
        {cart.map((item) => (
          <CartItem key={item.productId} data={item} />
        ))}
        <div class="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
          <h5 class="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">Subtotal</h5>

          <div class="flex items-center justify-between gap-5 ">
            <button class="rounded-full py-2.5 px-3 bg-indigo-50 text-indigo-600 font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100">
              Promo Code?
            </button>
            <h6 class="font-manrope font-bold text-3xl lead-10 text-indigo-600">₹{total}</h6>
          </div>
        </div>
        <div class="max-lg:max-w-lg max-lg:mx-auto">
          <p class="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">Shipping taxes, and discounts calculated at checkout</p>
          <button class="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 ">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}

function getCartTotal(cart) {
  return cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
}
