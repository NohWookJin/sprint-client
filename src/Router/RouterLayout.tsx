import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Common/Header";
import ScreenMessage from "../Components/Common/ScreenMessage";
import "../index.css";
import { useRecoilValue } from "recoil";
import { themeState } from "../Store/themeState";

const MainLayout = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  const darkMode = useRecoilValue(themeState);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
      if (window.innerWidth <= 640) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`relative mx-auto min-h-screen min-w-[360px] max-w-[640px] ${
        darkMode ? "dark" : ""
      }`}
    >
      <Header />
      {isMobileView && <ScreenMessage />}
      <div className={`h-full ${isMobileView ? "blur-sm" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
