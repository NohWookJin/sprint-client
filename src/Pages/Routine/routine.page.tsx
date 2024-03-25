import { useParams } from "react-router-dom";
import Category from "../../Components/Category/Category";

const RoutinePage = () => {
  const params = useParams();

  return (
    <div>
      <Category />
      {params.id}
    </div>
  );
};

export default RoutinePage;
