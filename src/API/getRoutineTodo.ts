import data from "../Dummy/RoutineTodo.json";

export interface Response {
  name: string;
  date: string;
  todo: Todo[];
  analysis: Analysis;
  past: Past;
}

export interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

export interface Past {
  [key: string]: Todo[];
}

export interface Analysis {
  start_with: string;
  continuity: number;
  average: number;
}

export const getRoutineTodo = (): Response => {
  const res = data;

  return res.response;
};
