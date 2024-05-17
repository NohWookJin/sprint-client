import axios from "axios";
import { getCookie, setCookieLogout } from "./userCookie";
import { isTokenExpired } from "./isTokenExpired";

export const instance = axios.create({
  baseURL: "https://api.sprints.co.kr/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = getCookie("SP_AES");

  if (accessToken) {
    if (isTokenExpired(accessToken)) {
      setCookieLogout("SP_AES");
      window.location.href = "/login";
      return Promise.reject("Token expired");
    }
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use((res) => {
  if (200 <= res.status && res.status < 300) {
    return res;
  }

  return Promise.reject(res.data);
});
