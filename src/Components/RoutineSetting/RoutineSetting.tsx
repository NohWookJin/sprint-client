import { useEffect, useState } from "react";
import RoutineSettingItem from "./RoutineSettingItem";
import {
  deleteRoutine,
  getCategory,
  patchRoutineName,
} from "../../API/routines";
import type { Categories } from "../../API/routines";

const RoutineSetting = () => {
  const [routineTodoData, setRoutineTodoData] = useState<Categories | null>(
    null
  );
  const [routineBlogData, setRoutineBlogData] = useState<Categories | null>(
    null
  );
  const [isRoutineChanged, setIsRoutineChanged] = useState<boolean>(false);

  const onEditRoutine = async (routineId: number, newName: string) => {
    const res = await patchRoutineName(routineId, newName);
    if (res) {
      alert(1);
      setIsRoutineChanged(true);
    }
  };

  const onRemoveRoutine = async (routineId: number) => {
    await deleteRoutine(routineId);
    setIsRoutineChanged(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsRoutineChanged(false);

      const res = await getCategory();

      if (res) {
        const execptTotalItem = res.filter((item) => item.id !== 0);
        const todoData = execptTotalItem.filter(
          (item) => item.routineType !== "blog"
        );
        const blogData = execptTotalItem.filter(
          (item) => item.routineType !== "todo"
        );

        setRoutineTodoData(todoData);
        setRoutineBlogData(blogData);
      }
    };

    fetchData();

    if (isRoutineChanged) fetchData();
  }, [isRoutineChanged]);

  return (
    <div className="flex flex-col gap-[60px]">
      <div>
        <h1 className="pb-[20px] font-bold">투두 리스트 타입</h1>
        <div className="flex flex-col gap-[20px]">
          {routineTodoData?.map((item) => (
            <RoutineSettingItem
              key={item.id}
              item={item}
              onEditRoutine={onEditRoutine}
              onRemoveRoutine={onRemoveRoutine}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="pb-[20px] font-bold">블로그 타입</h1>
        <div className="flex flex-col gap-[20px]">
          {routineBlogData?.map((item) => (
            <RoutineSettingItem
              key={item.id}
              item={item}
              onEditRoutine={onEditRoutine}
              onRemoveRoutine={onRemoveRoutine}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutineSetting;
