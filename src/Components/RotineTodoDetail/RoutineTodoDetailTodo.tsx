import { FormEvent, useState } from "react";
import RoutineTodoDetailTodoItem from "./RoutineTodoDetailTodoItem";
import type { Todo } from "../../API/getRoutineTodo";

interface RoutineTodoDetailTodoProps {
  todo: Todo[];
  onToggleTodo: (id: number) => void;
  onAddTodo: (content: string) => void;
  onEditTodo: (id: number, content: string) => void;
}

const RoutineTodoDetailTodo = ({
  todo,
  onToggleTodo,
  onAddTodo,
  onEditTodo,
}: RoutineTodoDetailTodoProps) => {
  const [newTodoContent, setNewTodoContent] = useState("");

  const onSubmitNewContent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTodo(newTodoContent);
    setNewTodoContent("");
  };

  return (
    <div className="mb-[60px] bg-[#F4F4F8] w-full flex flex-col justify-between min-h-[180px] shadow-2xl rounded-lg p-4">
      <div className="flex flex-col gap-[15px]">
        {todo.map((todo) => (
          <RoutineTodoDetailTodoItem
            key={todo.id}
            todo={todo}
            onToggleTodo={onToggleTodo}
            onEditTodo={onEditTodo}
          />
        ))}
      </div>

      <form onSubmit={onSubmitNewContent} className="mt-[20px]">
        <input
          type="text"
          value={newTodoContent}
          onChange={(e) => setNewTodoContent(e.target.value)}
          className="border-b border-[#d9d9d9] focus:outline-none w-full p-2 bg-[#F4F4F8]"
          placeholder="새로운 투두를 작성해보세요."
        />
      </form>
    </div>
  );
};

export default RoutineTodoDetailTodo;
