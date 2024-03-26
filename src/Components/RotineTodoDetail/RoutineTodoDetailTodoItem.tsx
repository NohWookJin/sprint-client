import { useState } from "react";
import type { Todo } from "../../API/getRoutine";

interface RoutineTodoDetailTodoItemProps {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onEditTodo: (id: number, content: string) => void;
}

const RoutineTodoDetailTodoItem = ({
  todo,
  onToggleTodo,
  onEditTodo,
}: RoutineTodoDetailTodoItemProps) => {
  const { content, id, completed } = todo;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(content);

  const onSaveEditContent = () => {
    onEditTodo(id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between border-b border-[#d9d9d9] pb-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleTodo(id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="focus:outline-none w-full bg-[#F4F4F8]"
          />
        ) : (
          <span
            className={`truncate ${completed ? "line-through opacity-60" : ""}`}
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
            <span className="text-xs opacity-60 cursor-pointer">삭제</span>
          </>
        )}
      </div>
    </div>
  );
};

export default RoutineTodoDetailTodoItem;
