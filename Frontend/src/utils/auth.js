import { redirect } from "react-router-dom";

function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

function tokenLoader() {
  const token = getAuthToken();
  return token;
}

function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  if (token === "EXPIRED") {
    return redirect("/auth?mode=login");
  }

  return token;
}

function parseJwt(token) {
  try {
    const parsed = JSON.parse(atob(token.split(".")[1]));
    return parsed.userId;
  } catch (e) {
    return null;
  }
};

export { getAuthToken, checkAuthLoader, tokenLoader, getTokenDuration, parseJwt };
