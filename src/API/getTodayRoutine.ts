import data from "../Dummy/TodayRoutine.json";

export interface Response {
  response: TodayRoutine;
}

export interface TodayRoutine {
  todo: RoutineItem[];
  blog: RoutineItem[];
}

export interface RoutineItem {
  routine_type: string | null;
  id: number;
  name: string;
  count: number;
}

export const getTodayRoutine = (): Response => {
  const res = data;

  return res;
};
