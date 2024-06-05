import { FormEvent, useState } from "react";
import RoutineTodoDetailTodoItem from "./RoutineTodoDetailTodoItem";
import type { Todo } from "../../API/routines";
import { useRecoilValue } from "recoil";
import { themeState } from "../../Store/themeState";

interface RoutineTodoDetailTodoProps {
  todos: Todo[];
  onToggleTodo: (id: number, completed: boolean) => void;
  onAddTodo: (content: string) => void;
  onEditTodo: (id: number, content: string) => void;
  onDeleteTodo: (id: number) => void;
}

const RoutineTodoDetailTodo = ({
  todos,
  onToggleTodo,
  onAddTodo,
  onEditTodo,
  onDeleteTodo,
}: RoutineTodoDetailTodoProps) => {
  const [newTodoContent, setNewTodoContent] = useState("");

  const darkMode = useRecoilValue(themeState);

  const onSubmitNewContent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTodo(newTodoContent);
    setNewTodoContent("");
  };

  return (
    <div className="mb-[60px] bg-[#F4F4F8] w-full flex flex-col justify-between shadow-2xl rounded-lg p-4">
      {todos.length !== 0 && (
        <div className="flex flex-col gap-[15px]">
          {todos
            .sort((a, b) => a.id - b.id)
            .map((todo) => (
              <RoutineTodoDetailTodoItem
                key={todo.id}
                todo={todo}
                onToggleTodo={onToggleTodo}
                onEditTodo={onEditTodo}
                onDeleteTodo={onDeleteTodo}
                darkMode={darkMode}
              />
            ))}
        </div>
      )}

      <form onSubmit={onSubmitNewContent} className="mt-[20px]">
        <input
          type="text"
          value={newTodoContent}
          onChange={(e) => setNewTodoContent(e.target.value)}
          className={`border-b border-[#d9d9d9] focus:outline-none w-full p-2 bg-[#F4F4F8] ${
            darkMode ? "dark: text-black" : ""
          }`}
          placeholder="새로운 투두를 작성해보세요."
        />
      </form>
    </div>
  );
};

export default RoutineTodoDetailTodo;
