import { useEffect, useState } from "react";
import { getTodayRoutine, TodayRoutine } from "../../API/getTodayRoutine";
import MainTodayRoutineItem from "./MainTodayRoutineItem";

const MainTodayRoutine = () => {
  const [todayRoutine, setTodayRoutine] = useState<TodayRoutine | null>(null);

  useEffect(() => {
    const data = getTodayRoutine();
    if (data) setTodayRoutine(data.response);
  }, []);

  if (todayRoutine) {
    return (
      <section className="mb-[100px]">
        <h1 className="text-[23px] font-semibold pb-[25px]">
          오늘 SPRINT 해야 할 루틴들을 알려드려요.
        </h1>
        <div className="flex gap-[30px] items-center flex-wrap">
          <div>
            {todayRoutine.todo.map((item, index) => (
              <MainTodayRoutineItem key={index} item={item} category="todo" />
            ))}
          </div>
          <div>
            {todayRoutine.blog.map((item, index) => (
              <MainTodayRoutineItem key={index} item={item} category="blog" />
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default MainTodayRoutine;
