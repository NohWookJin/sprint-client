import { useEffect, useState } from "react";

import RoutineTodoDetailTodo from "./RoutineTodoDetailTodo";
import RoutineTodoDetailAnalysis from "./RoutineTodoDetailAnalysis";
import RoutineTodoDetailPast from "./RoutineTodoDetailPast";

import { getRoutineTodo, Response } from "../../API/getRoutineTodo";

interface RoutineTodoDetailProps {
  routineId: number;
}

const RoutineTodoDetail = ({ routineId }: RoutineTodoDetailProps) => {
  const [data, setData] = useState<Response | null>(null);

  const onToggleTodo = (todoId: number) => {
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

  const onAddTodo = (content: string) => {
    setData((currentData) => {
      if (!currentData) return null;
      const newTodo = {
        id: Date.now(), // id 숫자로 변경해야 함.
        content,
        completed: false,
      };
      const updatedTodos = [...currentData.todo, newTodo];
      return { ...currentData, todo: updatedTodos };
    });
  };

  const onEditTodo = (todoId: number, newContent: string) => {
    setData((currentData) => {
      if (!currentData) return null;
      const updatedTodos = currentData.todo.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, content: newContent };
        }
        return todo;
      });
      return { ...currentData, todo: updatedTodos };
    });
  };

  useEffect(() => {
    const res = getRoutineTodo();
    setData(res);
    // getRoutineTodo(routineId);  추후 API
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
        <RoutineTodoDetailTodo
          todo={data.todo}
          onToggleTodo={onToggleTodo}
          onAddTodo={onAddTodo}
          onEditTodo={onEditTodo}
        />
        <RoutineTodoDetailAnalysis name={data.name} analysis={data.analysis} />
        <RoutineTodoDetailPast name={data.name} past={data.past} />
      </section>
    );
  }
};

export default RoutineTodoDetail;
