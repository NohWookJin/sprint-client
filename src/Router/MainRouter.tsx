import { Route, Routes } from "react-router-dom";
import MainLayout from "./RouterLayout";
import JoinPage from "../Pages/User/join.page";
import LoginPage from "../Pages/User/login.page";
import Mainpage from "../Pages/Main/main.page";
import NewRoutinePage from "../Pages/Routine/new.page";
import RoutinePage from "../Pages/Routine/routine.page";
import RoutineDetailViewPage from "../Pages/RoutineDetail/routineDetailView.page.";
import RoutineDetailPostPage from "../Pages/RoutineDetail/routineDetailPost.page";
import SettingRoutinePage from "../Pages/Routine/setting.page";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route index element={<Mainpage />} />
          <Route path="/routine/new" element={<NewRoutinePage />} />
          <Route path="/routine/:id" element={<RoutinePage />} />
          <Route path="/routine/:id/new" element={<RoutineDetailPostPage />} />
          <Route
            path="/routine/:routineId/detail/:date/:id"
            element={<RoutineDetailViewPage />}
          />
          <Route path="/routine/setting" element={<SettingRoutinePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
