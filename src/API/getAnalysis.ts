import { instance } from "../lib/userAuth";

export interface Analysis {
  name: string;
  date: string;
  targetCount: number;
  continuity: number;
  average: number;
  dailyCounts: string;
  startWith: string;
}

export const getAnalysis = async (routineId: number): Promise<Analysis> => {
  const { data } = await instance.get(`/analysis/${routineId}`);

  return data;
};
