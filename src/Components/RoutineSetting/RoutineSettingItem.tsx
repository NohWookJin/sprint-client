import { FormEvent, useEffect, useRef, useState } from "react";

interface RoutineSettingItemProps {
  item: RoutineSettingItemDetail;
  onEditRoutine: (routineId: number, newName: string) => void;
  onRemoveRoutine: (routineId: number) => void;
}

interface RoutineSettingItemDetail {
  id: number;
  userId?: number;
  name: string;
  date?: string;
  routineType: string | null;
  targetCount?: number;
  colorSelection?: string;
}

const RoutineSettingItem = ({
  item,
  onEditRoutine,
  onRemoveRoutine,
}: RoutineSettingItemProps) => {
  const { name, colorSelection, id } = item;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newRoutineName, setNewRoutineName] = useState<string>(name);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSaveEditRoutineName = () => {
    setIsEdit(false);
    onEditRoutine(id, newRoutineName);
  };

  const onDeleteRoutine = () => {
    setIsEdit(true);

    const confirmDelete = confirm("루틴을 정말 삭제하시겠습니까?");
    if (confirmDelete) {
      setIsEdit(false);
      onRemoveRoutine(id);
    } else {
      setIsEdit(false);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSaveEditRoutineName();
  };

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <div className="border rounded-[6px] py-[15px] px-[10px] flex items-center justify-between">
      <div className="flex items-center gap-[6px]">
        <div className={`w-[10px] h-[10px] bg-[${colorSelection}]`}></div>
        {isEdit ? (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              ref={inputRef}
              value={newRoutineName}
              onChange={(e) => setNewRoutineName(e.target.value)}
              className="focus:outline-none"
            />
          </form>
        ) : (
          <span className="font-bold">{name}</span>
        )}
      </div>
      <div className="flex gap-[5px] text-[13px] opacity-[0.7]">
        {isEdit ? (
          <button className="cursor-pointer" onClick={onSaveEditRoutineName}>
            저장
          </button>
        ) : (
          <>
            <button className="cursor-pointer" onClick={() => setIsEdit(true)}>
              수정
            </button>
            <button className="cursor-pointer" onClick={onDeleteRoutine}>
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RoutineSettingItem;
