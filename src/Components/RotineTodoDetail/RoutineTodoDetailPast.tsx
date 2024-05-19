import { useState } from "react";
import { Past, Todo } from "../../API/getRoutineTodo";

interface RoutineTodoDetailPastProps {
  name: string;
  past: Past;
}

const RoutineTodoDetailPast = ({ past, name }: RoutineTodoDetailPastProps) => {
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
    todos.every((todo) => todo.completed);

  return (
    <section className="mb-[60px]">
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
      {Object.entries(past).map(([date, todos]) => (
        <div
          key={date}
          className="mt-[20px] w-full text-lg font-semibold rounded-lg  border border-[#d9d9d9] py-3 px-4 transform flex flex-col mb-[5px]"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-[18px] font-bold">{date}</h2>
              <span
                className={`pl-[20px] text-[14px] font-normal mt-[1px] ${
                  isAllCompleted(todos) ? "text-[#3a7ce1]" : "text-[#ff6961]"
                }`}
              >
                {isAllCompleted(todos) ? " SPRINT 완료" : " SPRINT 실패"}
              </span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => onClickPrevTodo(date)}
            >
              {isClickedPrevTodos[date] ? (
                <span className="opacity-[0.6] text-[14px]">닫기</span>
              ) : (
                <span className="opacity-[0.6] text-[14px]">자세히 보기</span>
              )}
            </div>
          </div>
          {isClickedPrevTodos[date] && (
            <ul className="list-disc ml-5 mt-2">
              {todos.map((todo) => (
                <li key={todo.id} className="text-[13px]">
                  <span className="pr-[5px]">{todo.content}</span>
                  <span>{todo.completed ? "(완료)" : "(미완료)"}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default RoutineTodoDetailPast;
