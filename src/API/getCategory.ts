import data from "../Dummy/Category.json";

export interface Categories {
  response: CategoriesItem[];
}

export interface CategoriesItem {
  id: number;
  name: string;
}

export const getCategory = () => {
  const res = data;

  return res;
};
