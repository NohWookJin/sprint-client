import { useLocation, useParams } from "react-router-dom";
import Category from "../../Components/Category/Category";
import RoutineBlogDetail from "../../Components/RoutineBlogDetail/RoutineBlogDetail";
import RoutineTodoDetail from "../../Components/RotineTodoDetail/RoutineTodoDetail";
import { useEffect, useState } from "react";

const RoutinePage = () => {
  const [currentRoutineType, setCurrentRoutineType] = useState<string | null>(
    null
  );
  const { id } = useParams<{ id: string }>();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const routineType = query.get("routineType");

  useEffect(() => {
    setCurrentRoutineType(routineType);
  }, [routineType]);

  return (
    <div>
      <Category />
      {currentRoutineType === "todo" ? (
        <RoutineTodoDetail routineId={Number(id)} />
      ) : (
        <RoutineBlogDetail routineId={Number(id)} />
      )}
    </div>
  );
};

export default RoutinePage;
