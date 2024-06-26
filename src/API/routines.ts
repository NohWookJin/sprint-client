import { instance } from "./../lib/userAuth";

export type Categories = CategoriesItem[];

export interface CategoriesItem {
  id: number;
  userId?: number;
  name: string;
  date?: string;
  routineType: string | null;
  targetCount?: number;
  colorSelection?: string;
}

export const getCategory = async (): Promise<Categories> => {
  const { data } = await instance.get("/routine");

  if (data) {
    const allCategory: CategoriesItem = {
      id: 0,
      name: "전체",
      routineType: null,
    };

    return [allCategory, ...data].sort((a, b) => a.id - b.id);
  }

  return data;
};

export interface RoutineDataForm {
  name: string;
  routineType: string;
  targetCount: number;
  colorSelection: string;
}

export const postNewRoutine = async (form: RoutineDataForm) => {
  try {
    const { data } = await instance.post(`/routine`, form);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const patchRoutineName = async (routineId: number, name: string) => {
  try {
    const { data } = await instance.patch(`/routine/${routineId}`, { name });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRoutine = async (routineId: number) => {
  try {
    const { data } = await instance.delete(`/routine/${routineId}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export interface RoutineData {
  id: number;
  userId?: number;
  name: string;
  date?: string;
  routineType: string | null;
  targetCount?: number;
  colorSelection?: string;
  today: Todo[];
  past: { [date: string]: Todo[] };
}

export interface Todos {
  today: Todo[];
  past: { [date: string]: Todo[] };
}

export interface Todo {
  id: number;
  content: string;
  date: string;
  completed: boolean;
}

export const getRoutineTodo = async (routineId: number): Promise<Todos> => {
  const { data } = await instance.get(`/routines/${routineId}/todos`);

  return data;
};

export const getRoutineTodoAll = async (
  routineId: number
): Promise<RoutineData | null> => {
  try {
    const categories = await getCategory();
    const selectedCategory = categories.find(
      (category) => category.id === routineId
    );
    if (!selectedCategory) return null;

    const todos = await getRoutineTodo(routineId);

    const combinedData: RoutineData = {
      id: selectedCategory.id,
      userId: selectedCategory.userId,
      name: selectedCategory.name,
      date: selectedCategory.date,
      routineType: selectedCategory.routineType,
      targetCount: selectedCategory.targetCount,
      colorSelection: selectedCategory.colorSelection,
      today: todos.today,
      past: todos.past,
    };

    return combinedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface RoutineBlogData {
  id: number;
  userId?: number;
  name: string;
  date?: string;
  routineType: string | null;
  targetCount?: number;
  colorSelection?: string;
  today: Blog[];
  past: { [date: string]: Blog[] };
}

export interface Blogs {
  today: Blog[];
  past: { [date: string]: Blog[] };
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  date: string;
}

export const getRoutineBlog = async (routineId: number): Promise<Blogs> => {
  const { data } = await instance.get(`/routines/${routineId}/blogs`);

  return data;
};

export const getRoutineBlogAll = async (
  routineId: number
): Promise<RoutineBlogData | null> => {
  try {
    const categories = await getCategory();
    const selectedCategory = categories.find(
      (category) => category.id === routineId
    );
    if (!selectedCategory) return null;

    const blogs = await getRoutineBlog(routineId);

    const combinedData: RoutineBlogData = {
      id: selectedCategory.id,
      userId: selectedCategory.userId,
      name: selectedCategory.name,
      date: selectedCategory.date,
      routineType: selectedCategory.routineType,
      targetCount: selectedCategory.targetCount,
      colorSelection: selectedCategory.colorSelection,
      today: blogs.today,
      past: blogs.past,
    };

    return combinedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
