import { useEffect, useState } from "react";
import {
  Analysis,
  Routine,
  getCombinedData,
  CombinedResponse,
} from "../../API/getTodayRoutine";
import MainTodayRoutineItem from "./MainTodayRoutineItem";
import { useNavigate } from "react-router-dom";

const MainTodayRoutine = () => {
  const [combinedData, setCombinedData] = useState<CombinedResponse[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCombinedData();

      if (res) {
        setCombinedData(res);
      }
    };
    fetchData();
  }, []);

  const getTodayTargetCount = (item: Routine & Analysis) => {
    const startDate = new Date(item.date);
    startDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const dailyCounts = JSON.parse(item.dailyCounts);

    return item.targetCount - (dailyCounts[diffDays] || 0);
  };

  const todayRoutineTodo = combinedData
    .filter((item) => item.routineType === "todo")
    .map((item) => ({
      ...item,
      count: getTodayTargetCount(item),
    }));

  const todayRoutineBlog = combinedData
    .filter((item) => item.routineType === "blog")
    .map((item) => ({
      ...item,
      count: getTodayTargetCount(item),
    }));

  return (
    <section className="mb-[100px]">
      <h1 className="text-[23px] font-semibold pb-[30px]">
        오늘 SPRINT 해야 할 루틴들을 알려드려요
      </h1>
      {combinedData === null || combinedData.length === 0 ? (
        <div
          onClick={() => navigate(`/routine/new`)}
          className="cursor-pointer"
        >
          <span className="text-[15px] font-bold opacity-[0.6]">
            아직 루틴이 없어요. 생성하시겠어요? 🖱️
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-wrap gap-[20px]">
            {todayRoutineTodo.map((item, index) => (
              <MainTodayRoutineItem key={index} item={item} category="todo" />
            ))}
          </div>
          <div className="flex flex-wrap gap-[20px]">
            {todayRoutineBlog.map((item, index) => (
              <MainTodayRoutineItem key={index} item={item} category="blog" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default MainTodayRoutine;
