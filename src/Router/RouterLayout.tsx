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
    <div className="mx-auto min-h-dvh min-w-[350px] max-w-[412px] bg-white">
      <Header />
      <div className="h-full px-5">
        <Outlet />
      </div>
      {/* {showNav && <Nav />} */}
      {/* {location.pathname.includes('/reviewComment') && <InputComment />} */}
    </div>
  );
};

export default MainLayout;
