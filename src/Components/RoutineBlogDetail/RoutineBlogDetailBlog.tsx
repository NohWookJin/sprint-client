import RoutineBlogDetailBlogItem from "./RoutineBlogDetailBlogItem";
import type { Blog } from "../../API/getRoutineBlog";

interface RoutineBlogDetailBlogProps {
  blog: Blog[];
  routineId: number;
}

const RoutineBlogDetailBlog = ({
  blog,
  routineId,
}: RoutineBlogDetailBlogProps) => {
  return (
    <div className="mb-[60px] w-full flex flex-col justify-between ">
      {blog.length === 0 ? (
        <div className="mt-[60px]">
          <span className="font-bold text-[15px]">
            🏃 오늘도 루틴을 달성해볼까요?
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-[15px]">
          {blog.map((blog) => (
            <RoutineBlogDetailBlogItem
              key={blog.id}
              blog={blog}
              routineId={routineId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoutineBlogDetailBlog;
