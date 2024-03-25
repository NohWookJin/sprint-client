import { Route, Routes } from "react-router-dom";
import Mainpage from "../Pages/Main/main.page";
import MainLayout from "./RouterLayout";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Mainpage />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
