import React from "react";
import { json, redirect } from "react-router-dom";

import { parseJwt } from "../../utils/auth";
import AuthSection from "./AuthSection";

export default function AuthPage() {
  return <AuthSection />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  const APP_URL = import.meta.env.VITE_BACKEND_URL;

  if (mode !== "login" && mode !== "register") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    userPhone: data.get("userPhone"),
    userPassword: data.get("userPassword"),
  };

  const response = await fetch(`${APP_URL}/auth/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...authData }),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  const userId = parseJwt(token);

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
