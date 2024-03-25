import data from "../Dummy/Profile.json";

export interface MainProfile {
  response: MainProfileItems;
}

export interface MainProfileItems {
  start_with: number;
  badge: string[];
}

// export interface MainProfileItems {
//     image: string;
//     start_with: number;
//     badge: string[];
//   }

export const getProfile = () => {
  const res = data;

  return res;
};
