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

export interface BlogResponse {
  blog: BlogDetail;
}

export interface BlogDetail {
  id: number;
  title: string;
  content: string;
  imagePath: string;
  date: string;
  routine: Routine;
}

interface Routine {
  id: number;
  userId: number;
  name: string;
  date: string;
  routineType: string;
  targetCount: number;
  colorSelection: string;
  isDeleted: boolean;
}

export const getRoutineBlogDetail = async (
  routineId: number,
  contentId: number
): Promise<BlogResponse> => {
  const { data } = await instance.get(
    `/routines/${routineId}/blogs/${contentId}`
  );

  console.log(data);

  return data;
};
