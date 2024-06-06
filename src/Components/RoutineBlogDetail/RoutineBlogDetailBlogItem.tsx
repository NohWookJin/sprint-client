import { useNavigate } from "react-router-dom";
import type { Blog } from "../../API/getRoutineBlog";
import { formatDate } from "../../lib/timeFormatChange";

interface RoutineBlogDetailBlogItemProps {
  blog: Blog;
  routineId: number;
  isDark: boolean;
}

const RoutineBlogDetailBlogItem = ({
  blog,
  routineId,
  isDark,
}: RoutineBlogDetailBlogItemProps) => {
  const navigate = useNavigate();

  const formatTodayDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onClickTodayDetailBlog = (
    id: number,
    title: string,
    content: string
  ) => {
    const date = String(formatTodayDate(new Date()));

    navigate(`/routine/${routineId}/detail/${date}/${id}`, {
      state: { id, date, title, content },
    });
  };

  const extractPreviewImageUrl = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const img = doc.querySelector("img");
    return img ? img.src : null;
  };

  const removeImagesFromContent = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.querySelectorAll("img");
    images.forEach((img) => img.remove());
    return doc.body.innerHTML;
  };
  const previewImageUrl =
    extractPreviewImageUrl(blog.content) ||
    "https://via.placeholder.com/100x100?text=No+Image";
  const contentWithoutImage = removeImagesFromContent(blog.content);

  return (
    <div
      className={` cursor-pointer shadow rounded-lg p-4 min-h-[30px] ${
        isDark
          ? "dark: bg-[#23272f] text-white border border-opacity-30"
          : "bg-[#F4F4F8]"
      }`}
    >
      <div
        className="flex justify-between items-center overflow-hidden text-ellipsis truncate "
        onClick={() => {
          onClickTodayDetailBlog(blog.id, blog.title, blog.content);
        }}
      >
        <div className="flex gap-[20px] ">
          {previewImageUrl && (
            <img
              src={previewImageUrl}
              alt="Blog Preview Image"
              className="w-[100px] h-[100px] rounded object-cover"
            />
          )}
          <div className="flex flex-col gap-[5px]">
            <div className="text-[12px] opacity-[0.4]">
              <span>{formatDate(blog.date)}</span>
            </div>
            <div className="font-bold text-[20px]">
              <span>{blog.title}</span>
            </div>
            <div className="text-[15px] opacity-[0.75] max-h-[30px] overflow-hidden">
              <span dangerouslySetInnerHTML={{ __html: contentWithoutImage }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineBlogDetailBlogItem;
