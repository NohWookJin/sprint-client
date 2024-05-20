import { instance } from "./../lib/userAuth";

// 블로그 생성
export const postBlog = async (routineId: number, formData: FormData) => {
  try {
    const { data } = await instance.post(
      `/routines/${routineId}/blogs`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

// 블로그 수정
export const patchBlog = async (
  routineId: number,
  contentId: number,
  formData: FormData
) => {
  try {
    const { data } = await instance.patch(
      `/routines/${routineId}/blogs/${contentId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

// 블로그 삭제
export const deleteBlog = async (routineId: number, contentId: number) => {
  try {
    const res = await instance.delete(
      `/routines/${routineId}/blogs/${contentId}`
    );

    return res;
  } catch (error) {
    console.error(error);
  }
};
