import RoutineBlogDetailBlogItem from "./RoutineBlogDetailBlogItem";
import type { Blog } from "../../API/getRoutineBlog";
import { themeState } from "../../Store/themeState";
import { useRecoilValue } from "recoil";

interface RoutineBlogDetailBlogProps {
  blog: Blog[];
  routineId: number;
}

const RoutineBlogDetailBlog = ({
  blog,
  routineId,
}: RoutineBlogDetailBlogProps) => {
  const darkMode = useRecoilValue(themeState);

  return (
    <div className="mb-[60px] w-full flex flex-col justify-between ">
      {blog.length === 0 ? (
        <div className="mt-[50px]">
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
              isDark={darkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoutineBlogDetailBlog;
