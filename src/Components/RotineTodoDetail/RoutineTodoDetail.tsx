import { useEffect, useState } from "react";
import RoutineTodoDetailTodo from "./RoutineTodoDetailTodo";
import { getRoutine, Response } from "../../API/getRoutine";

interface RoutineTodoDetailProps {
  routineId: number;
}

const RoutineTodoDetail = ({ routineId }: RoutineTodoDetailProps) => {
  const [data, setData] = useState<Response | null>(null);

  const onTogglTodo = (todoId: number) => {
    setData((currentData) => {
      if (!currentData) return null;
      const updatedTodos = currentData.todo.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return { ...currentData, todo: updatedTodos };
    });
  };

  useEffect(() => {
    const res = getRoutine();
    setData(res);
    // getRoutine(routineId);  추후 API
  }, [routineId]);

  if (data) {
    return (
      <section>
        <h1 className="text-[28px] font-bold text-[#3A7CE1] pb-[5px]">
          {data.name}
        </h1>
        <div className="pb-[20px] font-semibold text-[20px]">
          {data.date}, 오늘의 투두리스트
        </div>
        <RoutineTodoDetailTodo todo={data.todo} onTogglTodo={onTogglTodo} />
      </section>
    );
  }
};

export default RoutineTodoDetail;
