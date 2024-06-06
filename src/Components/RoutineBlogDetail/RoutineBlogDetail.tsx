import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoutineBlogDetailBlog from "./RoutineBlogDetailBlog";
import RoutineTodoDetailAnalysis from "../RotineTodoDetail/RoutineTodoDetailAnalysis";
import RoutineBlogDetailPast from "./RoutineBlogDetailPast";
import { formatTodayDate } from "../../lib/timeFormatChange";
import { RoutineBlogData, getRoutineBlogAll } from "../../API/routines";

interface RoutineBlogDetailProps {
  routineId: number;
}

const RoutineBlogDetail = ({ routineId }: RoutineBlogDetailProps) => {
  const [blogs, setBlogs] = useState<RoutineBlogData | null>(null);
  const [todayDate, setTodayDate] = useState<string>("");
  const [isBlogsChanged, setIsBlogsChanged] = useState<boolean>(false);

  const navigate = useNavigate();

  const onClickNewItem = () => {
    navigate(`/routine/${routineId}/new`, { state: { routineId } });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRoutineBlogAll(routineId);

      if (data) {
        setBlogs(data);
        setTodayDate(formatTodayDate());
        setIsBlogsChanged(false);
      }
    };

    if (isBlogsChanged) fetchData();

    fetchData();
  }, [isBlogsChanged, routineId]);

  if (blogs) {
    return (
      <section>
        <h1 className="text-[28px] font-bold text-[#3A7CE1] pb-[5px]">
          {blogs.name}
        </h1>
        <div className="pb-[20px] font-semibold text-[20px]">
          <div className="flex justify-between items-center">
            <span>{todayDate} - 오늘의 블로그</span>
            <span
              onClick={onClickNewItem}
              className="text-[16px] cursor-pointer mt-[-3px] shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105"
            >
              + 작성하기
            </span>
          </div>
        </div>
        <RoutineBlogDetailBlog blog={blogs.today} routineId={routineId} />
        <RoutineTodoDetailAnalysis
          routineId={routineId}
          startDate={blogs.date as string}
        />
        <RoutineBlogDetailPast
          name={blogs.name}
          past={blogs.past}
          routineId={routineId}
        />
      </section>
    );
  }
};

export default RoutineBlogDetail;
