import { FormEvent, useEffect, useRef, useState } from "react";
import type { Todo } from "../../API/routines";

interface RoutineTodoDetailTodoItemProps {
  todo: Todo;
  onToggleTodo: (id: number, completed: boolean) => void;
  onEditTodo: (id: number, content: string) => void;
  onDeleteTodo: (id: number) => void;
}

const RoutineTodoDetailTodoItem = ({
  todo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
}: RoutineTodoDetailTodoItemProps) => {
  const { content, id, completed } = todo;
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(content);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSaveEditContent = () => {
    onEditTodo(id, editedContent);
    setIsEditing(false);
  };

  const onToggleCompleted = () => {
    const newCompleted = !isCompleted;
    setIsCompleted(!isCompleted);
    onToggleTodo(id, newCompleted);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSaveEditContent();
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex items-center justify-between border-b border-[#d9d9d9] pb-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={onToggleCompleted}
        />
        {isEditing ? (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={editedContent}
              ref={inputRef}
              onChange={(e) => setEditedContent(e.target.value)}
              className="focus:outline-none w-full bg-[#F4F4F8]"
            />
          </form>
        ) : (
          <span
            className={`truncate ${
              isCompleted ? "line-through opacity-60" : ""
            }`}
          >
            {content}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <span
            className="text-xs opacity-60 cursor-pointer"
            onClick={onSaveEditContent}
          >
            저장
          </span>
        ) : (
          <>
            <span
              className="text-xs opacity-60 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              수정
            </span>
            <span
              className="text-xs opacity-60 cursor-pointer"
              onClick={() => onDeleteTodo(id)}
            >
              삭제
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default RoutineTodoDetailTodoItem;
