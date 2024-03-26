import { Route, Routes } from "react-router-dom";
import MainLayout from "./RouterLayout";
import JoinPage from "../Pages/User/join.page";
import LoginPage from "../Pages/User/login.page";
import Mainpage from "../Pages/Main/main.page";
import NewRoutinePage from "../Pages/Routine/new.page";
import RoutinePage from "../Pages/Routine/routine.page";

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
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
