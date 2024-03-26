import type { Todo } from "../../API/getRoutine";

interface RoutineTodoDetailTodoItemProps {
  todo: Todo;
  onTogglTodo: (item_id: number) => void;
}

const RoutineTodoDetailTodoItem = ({
  todo,
  onTogglTodo,
}: RoutineTodoDetailTodoItemProps) => {
  const { content, id, completed } = todo;

  console.log(content, completed);

  return (
    <div className="flex items-center justify-between border-b border-[#d9d9d9] pb-[10px]">
      <div className="flex items-center gap-[10px]">
        <div>
          <input type="checkbox" onChange={() => onTogglTodo(id)} />
        </div>
        <div
          className={`${
            completed ? "line-through opacity-[0.6]" : ""
          } max-w-[500px] truncate`}
        >
          <span>{content}</span>
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <span className="text-[13px] opacity-[0.6] cursor-pointer">수정</span>
        <span className="text-[13px] opacity-[0.6] cursor-pointer">삭제</span>
      </div>
    </div>
  );
};

export default RoutineTodoDetailTodoItem;
