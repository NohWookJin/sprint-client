import { useLocation } from "react-router-dom";
import Category from "../../Components/Category/Category";
import RoutineBlogDetailView from "../../Components/RoutineBlogDetail/RoutineBlogDetailView";

const RoutineDetailViewPage = () => {
  const location = useLocation();

  const blogDetails = location.state || {};

  return (
    <>
      <Category />
      <section>
        <RoutineBlogDetailView {...blogDetails} />
      </section>
    </>
  );
};

export default RoutineDetailViewPage;
