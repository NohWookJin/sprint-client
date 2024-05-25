import { instance } from "../lib/userAuth";

export interface ProfileResponse {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  badges: string[];
  level: string;
}

export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const { data } = await instance.get(`/user/info`);

    return data;
  } catch (error) {
    throw console.error(error);
  }
};
