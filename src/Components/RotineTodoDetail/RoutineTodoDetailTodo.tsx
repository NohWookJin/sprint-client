import RoutineTodoDetailTodoItem from "./RoutineTodoDetailTodoItem";
import type { Todo } from "../../API/getRoutine";

interface RoutineTodoDetailTodoProps {
  todo: Todo[];
  onTogglTodo: (id: number) => void;
  //   onAddTodo: (content: string) => void;
}

const RoutineTodoDetailTodo = ({
  todo,
  onTogglTodo,
}: RoutineTodoDetailTodoProps) => {
  return (
    <div className="bg-[#F4F4F8] w-full flex flex-col justify-between min-h-[180px] shadow-2xl rounded-lg p-4">
      <div className="flex flex-col gap-[15px]">
        {todo.map((todo) => (
          <RoutineTodoDetailTodoItem
            key={todo.id}
            todo={todo}
            onTogglTodo={onTogglTodo}
          />
        ))}
      </div>
      <span className="text-[13px] opacity-[0.6]">
        * 완료한 투두를 삭제할 시 지난 투두리스트에서 확인할 수 없습니다.
      </span>
    </div>
  );
};

export default RoutineTodoDetailTodo;
