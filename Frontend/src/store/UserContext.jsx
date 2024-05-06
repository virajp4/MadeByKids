import React from "react";
import { createContext, useContext, useReducer } from "react";

const UserContext = createContext({
  userId: "",
  setUserId: () => {},
  cart: [],
  setCart: () => {},
  cartLength: 0,
});

function reducerFunction(state, action) {
  switch (action.type) {
    case "setUserId":
      return { ...state, userId: action.payload };
    case "setCart":
      return { ...state, cart: action.payload, cartLength: action.payload.length };
    default:
      return state;
  }
}

export default function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, { userId: "", cart: [] });

  function setUserId(userId) {
    dispatch({ type: "setUserId", payload: userId });
  }

  async function setCart(cart) {
    dispatch({ type: "setCart", payload: cart });
  }

  const ctxValue = { userId: state.userId, setUserId, cart: state.cart, setCart, cartLength: state.cart.length };

  return <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
