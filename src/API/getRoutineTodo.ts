import { instance } from "../lib/userAuth";

export interface Response {
  todo: Todo[];
  past: Past;
}

export interface Todo {
  id: number;
  content: string;
  date: string;
  completed: boolean;
}

export interface Past {
  [key: string]: Todo[];
}

export const getRoutineTodo = async (routineId: number): Promise<Response> => {
  const { data } = await instance.get(`/routines/${routineId}/todos`);

  console.log(data);

  return data;
};
