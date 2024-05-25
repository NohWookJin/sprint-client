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

  return data;
};

// {
//   "blog": {
//     "id": 38,
//     "title": "5월 23일 오전 2시 17분 (2)",
//     "content": "5월 23일 오전 2시 17분",
//     "imagePath": null,
//     "date": "2024-05-22T08:18:00.545Z",
//     "routine": {
//       "id": 48,
//       "userId": 15,
//       "name": "Blog",
//       "date": "2024-05-22T08:17:45.962Z",
//       "routineType": "blog",
//       "targetCount": 1,
//       "colorSelection": "#3a7ce1",
//       "isDeleted": false
//     }
//   },
//   "today": [],
//   "past": {
//     "2024-05-22": [
//       {
//         "id": 38,
//         "title": "5월 23일 오전 2시 17분 (2)",
//         "content": "5월 23일 오전 2시 17분",
//         "imagePath": null,
//         "date": "2024-05-22T08:18:00.545Z"
//       }
//     ]
//   }
// }
