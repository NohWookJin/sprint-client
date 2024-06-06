import { useNavigate } from "react-router-dom";
import { Past, Blog } from "../../API/getRoutineBlog";
import { formatDate } from "../../lib/timeFormatChange";
import { useRecoilValue } from "recoil";
import { themeState } from "../../Store/themeState";

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
  const isDark = useRecoilValue(themeState);

  const sortedPast: { [date: string]: Blog[] } = Object.entries(past)
    .sort(([dateA], [dateB]) => (dateA > dateB ? -1 : 1))
    .reduce((acc: { [date: string]: Blog[] }, [date, blogs]) => {
      const newDate = new Date(date);
      const newDateString = newDate.toISOString().split("T")[0];
      acc[newDateString] = blogs;
      return acc;
    }, {});

  const navigate = useNavigate();

  const onClickPrevBlog = (
    id: number,
    date: string,
    title: string,
    content: string
  ) => {
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

  return (
    <section className="pb-[60px]">
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center gap-[10px]">
          <h1 className="text-[26px] font-semibold">지난 {name}</h1>
          <span className="opacity-[0.6] text-[13px] mt-[10px]">
            지난 블로그를 삭제하면 루틴 기록에서 사라질 수 있어요.
          </span>
        </div>
        <span className="opacity-[0.6] text-[14px]">
          * 클릭하면 상세 블로그로 이동할 수 있어요.
        </span>
      </div>
      {Object.keys(sortedPast).length === 0 ? (
        <div className="mt-[20px]">
          <p
            className={`text-[14px] opacity-[0.6] ${
              isDark ? "dark: text-white" : ""
            }`}
          >
            🥲 지난 글이 없어요...
          </p>
        </div>
      ) : (
        Object.entries(sortedPast).map(([date, blogs]) => (
          <div key={date} className="mt-[20px]">
            <div>
              {blogs.map((blog) => {
                const previewImageUrl =
                  extractPreviewImageUrl(blog.content) ||
                  "https://via.placeholder.com/100x100?text=No+Image";
                const contentWithoutImage = removeImagesFromContent(
                  blog.content
                );

                return (
                  <div
                    key={blog.id}
                    className={`cursor-pointer border shadow rounded-lg p-4 min-h-[30px] ${
                      isDark
                        ? "dark: bg-[#23272f] text-white border border-opacity-30"
                        : "bg-[#F4F4F8]"
                    } mb-[20px] flex justify-between items-center`}
                    onClick={() =>
                      onClickPrevBlog(blog.id, date, blog.title, blog.content)
                    }
                  >
                    <div className="flex gap-[20px] items-start">
                      {previewImageUrl && (
                        <img
                          src={previewImageUrl}
                          alt="Blog Preview Image"
                          className="w-[100px] h-[100px] rounded object-cover"
                        />
                      )}
                      <div className="flex flex-col gap-[5px]">
                        <div className="text-[12px] opacity-[0.4]">
                          <span>{formatDate(date)}</span>
                        </div>
                        <div className="font-bold text-[20px]">
                          <span>{blog.title}</span>
                        </div>
                        <div className="text-[15px] opacity-[0.75] max-h-[30px] overflow-hidden">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: contentWithoutImage,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default RoutineBlogDetailPast;
