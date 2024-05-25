import { instance } from "./../lib/userAuth";

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
