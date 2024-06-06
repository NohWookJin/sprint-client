import { useState } from "react";
import { Past, Todo } from "../../API/getRoutineTodo";
import { useRecoilValue } from "recoil";
import { themeState } from "../../Store/themeState";

interface RoutineTodoDetailPastProps {
  name: string;
  past: Past;
  targetCount: number;
}

const RoutineTodoDetailPast = ({
  past,
  name,
  targetCount,
}: RoutineTodoDetailPastProps) => {
  const [visibleCount, setVisibleCount] = useState(7);

  const isDark = useRecoilValue(themeState);

  const sortedPast: { [date: string]: Todo[] } = Object.entries(past)
    .sort(([dateA], [dateB]) => (dateA > dateB ? -1 : 1))
    .reduce((acc: { [date: string]: Todo[] }, [date, todos]) => {
      const newDate = new Date(date);
      const newDateString = newDate.toISOString().split("T")[0];
      acc[newDateString] = todos;
      return acc;
    }, {});

  const [isClickedPrevTodos, setIsClickedPrevTodos] = useState<{
    [date: string]: boolean;
  }>({});

  const onClickPrevTodo = (date: string) => {
    setIsClickedPrevTodos((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const isAllCompleted = (todos: Todo[]) =>
    todos.filter((todo) => todo.completed).length >= targetCount;

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 7);
  };

  const allTodos = Object.entries(sortedPast).flatMap(([date, todos]) =>
    todos.map((todo) => ({ ...todo, todoDate: date }))
  );

  return (
    <section className="pb-[60px]">
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center gap-[10px]">
          <h1 className="text-[26px] font-semibold">지난 {name}</h1>
          <span className="opacity-[0.6] text-[11px] mt-[10px]">
            지난 투두리스트는 삭제는 추후 업데이트 예정입니다.
          </span>
        </div>
        <span className="opacity-[0.6] text-[14px]">
          * 클릭하면 자세히 볼 수 있어요.
        </span>
      </div>
      {allTodos.length === 0 ? (
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
        allTodos.slice(0, visibleCount).map((todo) => {
          const date = todo.todoDate;
          const todosForDate = sortedPast[date];
          return (
            <div
              key={todo.id}
              className={`mt-[20px] w-full text-lg font-semibold rounded-lg shadow-lg  py-4 px-4 transform flex flex-col mb-[5px] ${
                isDark
                  ? "dark:  border border-[#4b5563]"
                  : "border border-[#d9d9d9] border-opacity-30"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h2 className="text-[18px] font-bold">{date}</h2>
                  <span
                    className={`pl-[20px] text-[14px] font-normal mt-[1px] ${
                      isAllCompleted(todosForDate)
                        ? "text-[#3a7ce1]"
                        : "text-[#ff6961]"
                    }`}
                  >
                    {isAllCompleted(todosForDate)
                      ? " SPRINT 완료"
                      : " SPRINT 실패"}
                  </span>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => onClickPrevTodo(date)}
                >
                  {isClickedPrevTodos[date] ? (
                    <span className="opacity-[0.6] text-[14px]">닫기</span>
                  ) : (
                    <span className="opacity-[0.6] text-[14px]">
                      자세히 보기
                    </span>
                  )}
                </div>
              </div>
              {isClickedPrevTodos[date] && (
                <ul className="list-disc ml-5 mt-2">
                  {todosForDate.map((todo) => (
                    <li key={todo.id} className="text-[13px]">
                      <span className="pr-[5px]">{todo.content}</span>
                      <span>{todo.completed ? "(완료)" : "(미완료)"}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })
      )}
      {allTodos.length > visibleCount && (
        <div className="flex justify-center mt-[20px]">
          <button
            onClick={handleShowMore}
            className="px-[20px] py-[10px] bg-[#3A7CE1] text-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105"
          >
            더보기
          </button>
        </div>
      )}
    </section>
  );
};

export default RoutineTodoDetailPast;
