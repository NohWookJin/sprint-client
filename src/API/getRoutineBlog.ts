import data from "../Dummy/RoutineBlog.json";

export interface Response {
  name: string;
  date: string;
  blog: Blog[];
  analysis: Analysis;
  past: Past;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
}

export interface Past {
  [key: string]: Blog[];
}

export interface Analysis {
  start_with: string;
  continuity: number;
  average: number;
}

export const getRoutineBlog = (): Response => {
  const res = data;

  return res.response;
};
