import { useNavigate } from "react-router-dom";
import type { Past } from "../../API/getRoutineBlog";

interface RoutineBlogDetailPastProps {
  name: string;
  past: Past;
  routineId: number;
}

const RoutineBlogDetailPast = ({
  name,
  past,
  routineId,
}: RoutineBlogDetailPastProps) => {
  const navigate = useNavigate();

  const onClickPastDetailBlog = (
    id: number,
    date: string,
    title: string,
    content: string
  ) => {
    navigate(`/routine/${routineId}/detail/${date}/${id}`, {
      state: { id, date, title, content },
    });
  };

  return (
    <section>
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center gap-[10px]">
          <h1 className="text-[26px] font-semibold">지난 {name}</h1>
          <span className="opacity-[0.6] text-[13px] mt-[10px]">
            지난 블로그는 삭제할 수 없어요.
          </span>
        </div>
        <span className="opacity-[0.6] text-[14px]">
          * 클릭하면 상세 블로그로 이동할 수 있어요.
        </span>
      </div>
      {Object.entries(past).map(([date, blogs]) => (
        <div key={date} className="mt-[20px]">
          <div>
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="cursor-pointer border border-[#d9d9d9] mb-[20px] p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-[13px] pb-[3px]">{date}</h2>
                  <span className="font-semibold">{blog.title}</span>
                </div>
                <div
                  onClick={() =>
                    onClickPastDetailBlog(
                      blog.id,
                      date,
                      blog.title,
                      blog.content
                    )
                  }
                >
                  <span className="text-[13px] opacity-[0.6]">이동하기</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default RoutineBlogDetailPast;
