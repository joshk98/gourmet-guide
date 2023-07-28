import Cookies from "js-cookie";

const AUTH_COOKIE_KEY = "my_app_auth";

export const isLoggedIn = () => {
  const authCookie = Cookies.get(AUTH_COOKIE_KEY);
  return authCookie === "true";
};

export const setLoggedIn = () => {
  Cookies.set(AUTH_COOKIE_KEY, "true", { expires: 7 });
};

export const logout = () => {
  Cookies.remove(AUTH_COOKIE_KEY);
};
