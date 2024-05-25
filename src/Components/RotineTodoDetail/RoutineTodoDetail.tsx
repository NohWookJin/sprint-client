import { useEffect, useState } from "react";
import RoutineTodoDetailTodo from "./RoutineTodoDetailTodo";
import RoutineTodoDetailAnalysis from "./RoutineTodoDetailAnalysis";
import RoutineTodoDetailPast from "./RoutineTodoDetailPast";
import { RoutineData, getRoutineTodoAll } from "../../API/routines";
import { formatTodayDate } from "../../lib/timeFormatChange";
import {
  changeCompletionTodo,
  deleteTodo,
  patchTodo,
  postTodo,
} from "../../API/routinesTodo";

interface RoutineTodoDetailProps {
  routineId: number;
}

const RoutineTodoDetail = ({ routineId }: RoutineTodoDetailProps) => {
  const [todos, setTodos] = useState<RoutineData | null>(null);
  const [todayDate, setTodayDate] = useState<string>("");
  const [isTodosChanged, setIsTodosChanged] = useState<boolean>(false);

  const onToggleTodo = async (contentId: number, completed: boolean) => {
    const res = await changeCompletionTodo(routineId, contentId, completed);

    if (res) setIsTodosChanged(true);
  };

  const onAddTodo = async (content: string) => {
    const res = await postTodo(routineId, content);
    if (res) setIsTodosChanged(true);
  };

  const onEditTodo = async (todoId: number, newContent: string) => {
    const res = await patchTodo(routineId, todoId, newContent);
    if (res) setIsTodosChanged(true);
  };

  const onDeleteTodo = async (todoId: number) => {
    const res = await deleteTodo(routineId, todoId);
    if (res) setIsTodosChanged(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRoutineTodoAll(routineId);

      if (data) {
        setTodos(data);
        setTodayDate(formatTodayDate());
        setIsTodosChanged(false);
      }
    };

    if (isTodosChanged) fetchData();

    fetchData();
  }, [isTodosChanged, routineId]);

  if (todos) {
    return (
      <section>
        <h1 className="text-[28px] font-bold text-[#3A7CE1] pb-[5px]">
          {todos.name}
        </h1>
        <div className="pb-[20px] font-semibold text-[20px]">
          {todayDate} - 오늘의 투두 리스트
        </div>
        <RoutineTodoDetailTodo
          todos={todos.today}
          onToggleTodo={onToggleTodo}
          onAddTodo={onAddTodo}
          onEditTodo={onEditTodo}
          onDeleteTodo={onDeleteTodo}
        />
        <RoutineTodoDetailAnalysis
          routineId={routineId}
          startDate={todos.date as string}
        />
        <RoutineTodoDetailPast
          name={todos.name}
          past={todos.past}
          targetCount={todos.targetCount as number}
        />
      </section>
    );
  }
};

export default RoutineTodoDetail;
