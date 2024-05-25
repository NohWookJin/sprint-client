import { instance } from "./../lib/userAuth";

export const postTodo = async (routineId: number, content: string) => {
  try {
    const { data } = await instance.post(`/routines/${routineId}/todos`, {
      content,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const changeCompletionTodo = async (
  routineId: number,
  contentId: number,
  completed: boolean
) => {
  try {
    const { data } = await instance.patch(
      `routines/${routineId}/todos/${contentId}/completion`,
      { completed }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const patchTodo = async (
  routineId: number,
  contentId: number,
  content: string
) => {
  try {
    const { data } = await instance.patch(
      `/routines/${routineId}/todos/${contentId}`,
      { content }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (routineId: number, contentId: number) => {
  try {
    const res = await instance.delete(
      `/routines/${routineId}/todos/${contentId}`
    );

    return res;
  } catch (error) {
    console.error(error);
  }
};
