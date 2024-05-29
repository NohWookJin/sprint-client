import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import { formats } from "./QuillEditor";
import "react-quill/dist/quill.snow.css";
import "./QuillStlye.css";
import { postBlog } from "../../API/routinesBlog";
import { formatDateToISO } from "../../lib/timeFormatChange";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

interface BlogForm {
  title: string;
  content: string;
  image?: File;
}

const RoutineBlogDetailEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { routineId } = location.state || {};
  const quillRef = useRef<ReactQuill>(null);

  const [formDataBlog, setFormDataBlog] = useState<BlogForm>({
    title: "",
    content: "",
  });

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDataBlog({ ...formDataBlog, title: e.target.value });
  };

  const onChangeContent = (content: string) => {
    setFormDataBlog({ ...formDataBlog, content });
  };

  const convertImageToWebP = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const webpFile = new File([blob], file.name, {
                  type: "image/webp",
                });
                resolve(webpFile);
              } else {
                reject(new Error("WebP 변환 실패"));
              }
            },
            "image/webp",
            0.75
          );
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          const webpFile = await convertImageToWebP(file);
          setFormDataBlog((prev) => ({ ...prev, image: webpFile }));
        } catch (error) {
          console.error("이미지 변환 실패:", error);
        }
      }
    });
  }, []);

  const onClickBackArrow = () => {
    navigate(-1);
  };

  const onSaveContent = async () => {
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("title", formDataBlog.title);
      formDataWithImage.append("content", formDataBlog.content);
      if (formDataBlog.image) {
        formDataWithImage.append("image", formDataBlog.image);
      }

      const data = await postBlog(routineId, formDataWithImage);

      if (data) {
        const date = formatDateToISO(data.date);
        const id = Number(data.id);
        const title = data.title;
        const content = data.content;
        navigate(`/routine/${routineId}/detail/${date}/${id}`, {
          state: { id, date, title, content },
        });
      } else {
        navigate(-1);
        console.error("이미지 전송 실패");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formDataBlog.title.trim() === "" ||
      formDataBlog.content.trim() === ""
    ) {
      alert("제목 또는 내용을 입력하세요.");
    } else {
      onSaveContent();
    }
  };

  const modules = useMemo(() => {
    return {
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            "link",
            { indent: "-1" },
            { indent: "+1" },
          ],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
              ],
            },
            { background: [] },
          ],
          [{ image: imageHandler }],
        ],
        ImageResize: {
          parchment: Quill.import("parchment"),
        },
      },
    };
  }, [imageHandler]);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col shadow-lg pt-[20px] relative"
    >
      <div className="flex justify-center gap-[30px] mb-[20px]">
        <input
          onChange={onChangeTitle}
          placeholder="제목을 입력하세요."
          type="text"
          className="px-[3px] py-[20px] w-[95%] text-[30px] border-b border-[#d9d9d9] focus:outline-none"
        />
      </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={formDataBlog.content || ""}
        ref={quillRef}
        onChange={onChangeContent}
        placeholder="루틴을 시작해보세요..."
      />
      <div className="absolute bg-white bottom-0 z-50 sticky shadow-2xl flex justify-between px-[15px] py-[15px]">
        <button onClick={onClickBackArrow} className="font-semibold">
          &larr; 나가기
        </button>
        <button
          type="submit"
          className="font-semibold bg-[#3a7ce1] text-white px-4 py-2 rounded-[5px]"
        >
          저장하기
        </button>
      </div>
    </form>
  );
};

export default RoutineBlogDetailEditor;
