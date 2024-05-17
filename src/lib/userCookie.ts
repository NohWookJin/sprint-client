import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: object) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const setCookieLogin = (accessToken: string) => {
  if (accessToken) {
    setCookie("SP_AES", accessToken, {
      path: "/",
      secure: false,
      HttpOnly: false,
      HostOnly: false,
      maxAge: 24 * 60 * 60,
    });
  }
};

export const setCookieLogout = (name: string) => {
  return cookies.remove(name, { path: "/" });
};

export const setCookieUserInfo = (email: string, name: string) => {
  setCookie("SP_USER_EMAIL", email, {
    path: "/",
    secure: false,
    HttpOnly: false,
    HostOnly: false,
    maxAge: 24 * 60 * 60,
  });
  setCookie("SP_USER_NAME", name, {
    path: "/",
    secure: false,
    HttpOnly: false,
    HostOnly: false,
    maxAge: 24 * 60 * 60,
  });
};
