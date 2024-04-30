import React from "react";
import { createContext, useEffect, useContext, useReducer } from "react";

const UserContext = createContext({
  userId: "",
  setUserId: () => {},
});

function reducerFunction(state, action) {
  switch (action.type) {
    case "setUserId":
      return { ...state, userId: action.payload };
    default:
      return state;
  }
}

export default function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, { userId: "" });

  function setUserId(userId) {
    dispatch({ type: "setUserId", payload: userId });
  }

  const ctxValue = { userId: state.userId, setUserId };

  return <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}