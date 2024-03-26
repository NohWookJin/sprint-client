import { useLocation } from "react-router-dom";
import Category from "../../Components/Category/Category";
import RoutineBlogDetail from "../../Components/RoutineBlogDetail/RoutineBlogDetail";
import RoutineTodoDetail from "../../Components/RotineTodoDetail/RoutineTodoDetail";

const RoutinePage = () => {
  const location = useLocation();
  const { routine_type, id } = location.state || {};

  return (
    <div>
      <Category />
      {routine_type === "todo" ? (
        <RoutineTodoDetail routineId={id} />
      ) : (
        <RoutineBlogDetail />
        // <RoutineBlogDetail routineId={id} />
      )}
    </div>
  );
};

export default RoutinePage;
