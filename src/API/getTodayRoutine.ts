import { instance } from "../lib/userAuth";

export interface CombinedResponse {
  dailyCounts: string;
  date: string;
  id: number;
  routineId: number;
  name: string;
  continuity: number;
  average: number;
  routineName: string;
  routineType: string;
  targetCount: number;
  userId: number;
  colorSelection: string;
  isDeleted: boolean;
  startWith: string;
}

export interface Routine {
  id: number;
  userId: number;
  name: string;
  date: string;
  routineType: string;
  targetCount: number;
  colorSelection: string;
  isDeleted: boolean;
}

export interface Analysis {
  routineId: number;
  routineName: string;
  name: string;
  date: string;
  targetCount: number;
  continuity: number;
  average: number;
  dailyCounts: string;
  startWith: string;
}

export const getRoutines = async (): Promise<Routine[]> => {
  const { data } = await instance.get("/routine");
  return data;
};

export const getAnalysisAll = async (): Promise<Analysis[]> => {
  const { data } = await instance.get("/analysis/all");
  return data;
};

export const getCombinedData = async (): Promise<CombinedResponse[]> => {
  const routines = await getRoutines();
  const analyses = await getAnalysisAll();

  const combinedData = routines.map((routine) => {
    const analysis = analyses.find((a) => a.routineId === routine.id);

    return {
      id: routine.id,
      routineId: routine.id,
      userId: routine.userId,
      name: routine.name,
      date: routine.date,
      routineType: routine.routineType,
      targetCount: routine.targetCount,
      colorSelection: routine.colorSelection,
      isDeleted: routine.isDeleted,
      dailyCounts: analysis ? analysis.dailyCounts : "[]",
      continuity: analysis ? analysis.continuity : 0,
      average: analysis ? analysis.average : 0,
      routineName: analysis ? analysis.routineName : routine.name,
      startWith: analysis ? analysis.startWith : routine.date,
    };
  });

  return combinedData;
};
