import { useLocation } from "react-router-dom";
import Category from "../../Components/Category/Category";
import RoutineBlogDetail from "../../Components/RoutineBlogDetail/RoutineBlogDetail";
import RoutineTodoDetail from "../../Components/RotineTodoDetail/RoutineTodoDetail";
import { useEffect, useState } from "react";

const RoutinePage = () => {
  const location = useLocation();
  const { id, routineType } = location.state || {};
  const [currentRoutineType, setCurrentRoutineType] = useState<string>(
    routineType || null
  );

  useEffect(() => {
    if (routineType) setCurrentRoutineType(routineType);
  }, [routineType]);

  return (
    <div>
      <Category />
      {currentRoutineType === "todo" ? (
        <RoutineTodoDetail routineId={id} />
      ) : (
        <RoutineBlogDetail routineId={id} />
      )}
    </div>
  );
};

export default RoutinePage;
