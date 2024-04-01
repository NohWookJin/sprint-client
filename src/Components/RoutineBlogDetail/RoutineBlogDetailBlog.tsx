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
      <div className="flex flex-col gap-[15px]">
        {blog.map((blog) => (
          <RoutineBlogDetailBlogItem
            key={blog.id}
            blog={blog}
            routineId={routineId}
          />
        ))}
      </div>
    </div>
  );
};

export default RoutineBlogDetailBlog;
