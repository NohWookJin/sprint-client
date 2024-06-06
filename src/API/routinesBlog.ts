import { instance } from "./../lib/userAuth";
export interface UploadImageResponse {
  imageUrl: string;
}

export interface BlogData {
  title: string;
  content: string;
  imagePath?: string;
}

export interface BlogResponse {
  id: number;
  date: string;
  title: string;
  content: string;
  imagePath: string;
}

// 이미지 업로드 함수
export const uploadImage = async (
  routineId: number,
  imageData: FormData
): Promise<UploadImageResponse> => {
  try {
    const { data } = await instance.post<UploadImageResponse>(
      `/routines/${routineId}/blogs/file`,
      imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 블로그 생성 함수
export const postBlog = async (
  routineId: number,
  blogData: BlogData
): Promise<BlogResponse> => {
  try {
    const { data } = await instance.post<BlogResponse>(
      `/routines/${routineId}/blogs`,
      blogData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchBlog = async (
  routineId: number,
  contentId: number,
  blogData: BlogData
): Promise<BlogResponse> => {
  try {
    const { data } = await instance.patch<BlogResponse>(
      `/routines/${routineId}/blogs/${contentId}`,
      blogData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
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
    throw error;
  }
};
