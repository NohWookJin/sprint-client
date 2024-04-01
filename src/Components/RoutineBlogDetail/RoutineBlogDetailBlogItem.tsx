import { useNavigate } from "react-router-dom";
import type { Blog } from "../../API/getRoutineBlog";

interface RoutineBlogDetailBlogItemProps {
  blog: Blog;
  routineId: number;
}

const RoutineBlogDetailBlogItem = ({
  blog,
  routineId,
}: RoutineBlogDetailBlogItemProps) => {
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
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
    const date = String(formatDate(new Date()));

    navigate(`/routine/${routineId}/detail/${date}/${id}`, {
      state: { id, date, title, content },
    });
  };

  return (
    <div className="cursor-pointer shadow rounded-lg p-4 bg-[#F4F4F8]  min-h-[30px]">
      <div className="flex justify-between items-center">
        <span>{blog.title}</span>
        <span
          onClick={() =>
            onClickTodayDetailBlog(blog.id, blog.title, blog.content)
          }
          className="text-[12px] opacity-[0.6]"
        >
          이동하기
        </span>
      </div>
    </div>
  );
};

export default RoutineBlogDetailBlogItem;
