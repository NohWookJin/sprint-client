import { useEffect, useState } from "react";
import RoutineTodoDetailTodo from "./RoutineTodoDetailTodo";
// import RoutineTodoDetailAnalysis from "./RoutineTodoDetailAnalysis";
import RoutineTodoDetailPast from "./RoutineTodoDetailPast";
import { RoutineData, getRoutineTodoAll } from "../../API/routines";
import { formatTodayDate } from "../../lib/timeFormatChange";
import { deleteTodo, patchTodo, postTodo } from "../../API/routinesTodo";

interface RoutineTodoDetailProps {
  routineId: number;
}

const RoutineTodoDetail = ({ routineId }: RoutineTodoDetailProps) => {
  const [todos, setTodos] = useState<RoutineData | null>(null);
  const [todayDate, setTodayDate] = useState<string>("");
  const [isTodosChanged, setIsTodosChanged] = useState<boolean>(false);

  const onToggleTodo = (todoId: number) => {
    setTodos((currentData) => {
      if (!currentData) return null;
      const updatedTodos = currentData.today.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return { ...currentData, todo: updatedTodos };
    });
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

      console.log(data);

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
        {/* <RoutineTodoDetailAnalysis
          name={todos.name}
          analysis={todos.analysis}
        /> */}
        <RoutineTodoDetailPast name={todos.name} past={todos.past} />
      </section>
    );
  }
};

export default RoutineTodoDetail;
