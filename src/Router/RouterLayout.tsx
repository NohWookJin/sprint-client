import { Outlet } from "react-router-dom";
// import { Nav } from '@components/common/nav';
// import { InputComment } from '@components/common/nav';
import Header from "../Components/Common/Header";
import "../index.css";

const MainLayout = () => {
  //   const location = useLocation();
  //   const hideNavPaths = [

  // //   ];
  //   const showNav = !hideNavPaths.some((path) =>
  //     location.pathname.includes(path),
  //   );

  return (
    <div className="mx-auto min-h-dvh min-w-[360px] max-w-[640px]">
      <Header />
      <div className="h-full min-w-[640px]">
        <Outlet />
      </div>
      {/* {showNav && <Nav />} */}
      {/* {location.pathname.includes('/reviewComment') && <InputComment />} */}
    </div>
  );
};

export default MainLayout;
