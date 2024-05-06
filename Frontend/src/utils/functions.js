import axios from "axios";

import { getAuthToken, parseJwt } from "./auth";

async function getCart() {
  const token = getAuthToken();
  const userId = parseJwt(token);

  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    throw new Error(res.data.error);
  }
  return res.data.items;
}

async function getCartId() {
  const token = getAuthToken();
  const userId = parseJwt(token);

  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    throw new Error(res.data.error);
  }

  return res.data.user.cartId;
}

async function getCartItemInventory(prodId) {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/shop/${prodId}`);

  if (res.status !== 200) {
    throw new Error(res.data.error);
  }

  return res.data.product.inventory;
}

export { getCart, getCartId, getCartItemInventory };
