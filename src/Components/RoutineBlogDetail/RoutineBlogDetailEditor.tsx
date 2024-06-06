import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import "react-quill/dist/quill.snow.css";
import "./QuillStlye.css";
import { postBlog, uploadImage, BlogData } from "../../API/routinesBlog";
import { formatDateToISO } from "../../lib/timeFormatChange";
import { useRecoilValue } from "recoil";
import { themeState } from "../../Store/themeState";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

const toolbarOptions = [
  ["link", "image", "video"],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];

interface BlogForm {
  title: string;
  content: string;
  imagePath?: string;
}

const RoutineBlogDetailEditor = () => {
  const darkMode = useRecoilValue(themeState);

  const location = useLocation();
  const navigate = useNavigate();

  const { routineId } = (location.state as { routineId: number }) || {};
  const quillRef = useRef<ReactQuill>(null);

  const [formDataBlog, setFormDataBlog] = useState<BlogForm>({
    title: "",
    content: "",
    imagePath: "",
  });

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
                const webpFile = new File(
                  [blob],
                  file.name.replace(/\.[^.]+$/, ".webp"),
                  {
                    type: "image/webp",
                  }
                );
                resolve(webpFile);
              } else {
                reject(new Error("WebP 변환에 실패했습니다."));
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

  useEffect(() => {
    const quill = quillRef.current;

    const handleImage = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (file) {
          try {
            const webpFile = await convertImageToWebP(file);
            const imageData = new FormData();
            imageData.append("file", webpFile);
            const response = await uploadImage(routineId, imageData);
            if (response) {
              const url = response.imageUrl;
              const quillEditor = quill?.getEditor();
              const range = quill?.getEditor().getSelection();
              quillEditor?.insertEmbed(range?.index as number, "image", url);
              quillEditor?.setSelection({
                index: (range?.index as number) + 1,
                length: 0,
              });
            }
          } catch (error) {
            console.error(error);
          }
        }
      };
    };
    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule("toolbar");
      toolbar.addHandler("image", handleImage);
    }
  }, [routineId]);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
      },
    };
  }, []);

  const onSaveContent = async () => {
    try {
      const blogData: BlogData = {
        title: formDataBlog.title,
        content: formDataBlog.content,
        imagePath: formDataBlog.imagePath,
      };

      const data = await postBlog(routineId, blogData);

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
        alert("블로그 생성이 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDataBlog({ ...formDataBlog, title: e.target.value });
  };

  const onChangeContent = (content: string) => {
    setFormDataBlog({ ...formDataBlog, content });
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

  const onClickBackArrow = () => {
    navigate(-1);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col shadow-lg pt-[20px] relative ${
        darkMode ? "dark: bg-[#23272f]" : ""
      }`}
    >
      <div className="flex justify-center gap-[30px] mb-[20px]">
        <input
          onChange={onChangeTitle}
          placeholder="제목을 입력하세요."
          type="text"
          className={`px-[3px] pl-[20px] py-[20px] w-[100%] text-[30px] border-b border-[#d9d9d9] focus:outline-none ${
            darkMode ? "dark: text-white bg-[#23272f]" : ""
          }`}
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
      <div
        className={`absolute bottom-0 z-50 sticky shadow-2xl flex justify-between px-[15px] py-[15px] ${
          darkMode
            ? "border-t dark: bg-[#23272f] text-white"
            : "bg-white text-black"
        }`}
      >
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
