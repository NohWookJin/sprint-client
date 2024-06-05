import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import { formats } from "./QuillEditor";
import "react-quill/dist/quill.snow.css";
import "./QuillStlye.css";
import { patchBlog } from "../../API/routinesBlog";
import { useSetRecoilState } from "recoil";
import { editState } from "../../Store/editState";
import { useRecoilValue } from "recoil";
import { themeState } from "../../Store/themeState";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

interface BlogForm {
  title: string;
  content: string;
  image?: File;
}

interface EditProps {
  routineId: number;
  id: number;
  title: string;
  content: string;
  date: string;
}

const RoutineBlogDetailEditorEdit = ({
  routineId,
  id,
  title,
  content,
  date,
}: EditProps) => {
  const darkMode = useRecoilValue(themeState);

  const setIsEdit = useSetRecoilState(editState);
  const navigate = useNavigate();

  const quillRef = useRef<ReactQuill>(null);

  const [formDataBlog, setFormDataBlog] = useState<BlogForm>({
    title: title,
    content: content,
  });

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDataBlog({ ...formDataBlog, title: e.target.value });
  };

  const onChangeContent = (content: string) => {
    setFormDataBlog({ ...formDataBlog, content });
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (file) {
        setFormDataBlog((prev) => ({ ...prev, image: file }));
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

      const data = await patchBlog(routineId, Number(id), formDataWithImage);

      if (data) {
        navigate(-1);
        setIsEdit(false);
        navigate(`/routine/${routineId}/detail/${date}/${Number(id)}`, {
          state: { id, date, title, content },
        });
      } else {
        navigate(-1);
        setIsEdit(false);
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
      className={`flex flex-col shadow-lg pt-[20px] relative ${
        darkMode ? "dark: bg-[#23272f]" : ""
      }`}
    >
      <div className="flex justify-center gap-[30px] mb-[20px]">
        <input
          onChange={onChangeTitle}
          placeholder="제목을 입력하세요."
          value={formDataBlog.title}
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
          &larr; 취소하기
        </button>
        <button
          type="submit"
          className="font-semibold bg-[#3a7ce1] text-white px-4 py-2 rounded-[5px]"
        >
          수정하기
        </button>
      </div>
    </form>
  );
};

export default RoutineBlogDetailEditorEdit;
