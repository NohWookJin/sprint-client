import { instance } from "./../lib/userAuth";

// 투두 추가
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

// 투두 완료 여부 수정
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

// 투두 내용 수정
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

// 투두 삭제
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
