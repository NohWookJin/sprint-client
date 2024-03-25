import { Route, Routes } from "react-router-dom";
import MainLayout from "./RouterLayout";
import Mainpage from "../Pages/Main/main.page";
import RoutinePage from "../Pages/Routine/routine.page";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Mainpage />} />
          <Route path="/routine/:id" element={<RoutinePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
