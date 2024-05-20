import { instance } from "../lib/userAuth";

export interface Response {
  blog: Blog[];
  past: Past;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface Past {
  [key: string]: Blog[];
}

export const getRoutineBlog = async (routineId: number): Promise<Response> => {
  const { data } = await instance.get(`/routines/${routineId}/blogs`);

  return data;
};
