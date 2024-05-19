// 회원가입, 로그인 API
import { instance } from "../lib/userAuth";
import {
  getCookie,
  setCookieLogin,
  setCookieUserInfo,
} from "../lib/userCookie";

// 회원가입
export interface RequestSignup {
  signUpformData: SignupForm;
}

export interface SignupForm {
  email: string;
  name: string;
  password: string;
}

export const signUp = async (
  signUpformData: SignupForm
): Promise<RequestSignup> => {
  const res = await instance.post(`/user`, signUpformData);

  return res.data;
};

// 로그인
export interface LoginDataForm {
  email: string;
  password: string;
}

export const login = async (form: LoginDataForm) => {
  const { data } = await instance.post(`/login`, form);

  if (data && data.accessToken) {
    setCookieLogin(String(data.accessToken));
  }

  return data;
};

// 사용자 조회
interface ResponseUserInfo {
  email: string;
  name: string;
}

export const getUserInfo = async (): Promise<ResponseUserInfo> => {
  const { data } = await instance.get("/me");
  const accessToken = getCookie("SP_AES");

  if (data && accessToken) {
    setCookieUserInfo(String(data.email), String(data.name));
  }

  return data;
};
