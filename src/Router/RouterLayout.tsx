import { Outlet } from "react-router-dom";
import Header from "../Components/Common/Header";
import "../index.css";

const MainLayout = () => {
  return (
    <div className="mx-auto min-h-dvh min-w-[360px] max-w-[640px]">
      <Header />
      <div className="h-full min-w-[640px]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
