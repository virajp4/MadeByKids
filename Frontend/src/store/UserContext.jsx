import React from "react";
import { createContext, useEffect, useContext, useReducer } from "react";

const UserContext = createContext({
  userId: "",
  setUserId: () => {},
  cart: 0,
  setCart: () => {},
});

function reducerFunction(state, action) {
  switch (action.type) {
    case "setUserId":
      return { ...state, userId: action.payload };
    case "setCart":
      return { ...state, cart: action.payload < 0 ? 0 : action.payload };
    default:
      return state;
  }
}

export default function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, { userId: "", cart: 0 });

  function setUserId(userId) {
    dispatch({ type: "setUserId", payload: userId });
  }

  function setCart(val) {
    if (val > 0) {
      dispatch({ type: "setCart", payload: state.cart + 1 });
    } else {
      dispatch({ type: "setCart", payload: state.cart - 1 });
    }
  }

  const ctxValue = { userId: state.userId, setUserId, cart: state.cart, setCart };

  return <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
