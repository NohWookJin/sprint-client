import {
  ChangeEvent,
  FormEvent,
  // useCallback,
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

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

interface FormProps {
  title: string;
  content: string;
}

const RoutineBlogDetailEditor = () => {
  const navigate = useNavigate();

  const quillRef = useRef<ReactQuill>(null);

  const [formData, setFormData] = useState<FormProps>({
    title: "",
    content: "",
  });

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const onChangeContent = (content: string) => {
    setFormData({ ...formData, content: content });
  };

  // const imageHandler = useCallback(() => {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();
  //   input.addEventListener("change", async () => {
  //     const editor = quillRef.current?.getEditor();
  //     if (!editor) return;

  //     const file = input.files?.[0];
  //     if (!file) return;

  //   });
  // }, []);

  const onClickBackArrow = () => {
    navigate(-1);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.title === "" || formData.content === "") {
      alert("제목 또는 내용을 입력하세요.");
    } else {
      alert("전송 성공...");
      console.log(formData);
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
          ["image"],
        ],
        ImageResize: {
          parchment: Quill.import("parchment"),
        },
      },
    };
  }, []);

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
        value={formData.content || ""}
        ref={quillRef}
        onChange={onChangeContent}
        placeholder="루틴을 시작해보세요..."
      />
      <div className="absolute bg-white bottom-0 z-50 sticky shadow-2xl flex justify-between px-[15px] py-[15px]">
        <button onClick={onClickBackArrow} className="font-semibold">
          &larr; 나가기
        </button>
        <button className="font-semibold bg-[#3a7ce1] text-white px-4 py-2 rounded-[5px]">
          저장하기
        </button>
      </div>
    </form>
  );
};

export default RoutineBlogDetailEditor;
