import Category from "../Category/Category";
import Profile from "../Profile/Profile";
import MainTodayRoutine from "./MainTodayRoutine";
import Analysis from "../Analysis/Analysis";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../API/users";
import { getCookie } from "../../lib/userCookie";

const Main = () => {
  const [isUserLogined, setIsUserLogined] = useState<boolean>(false);

  useEffect(() => {
    const userLogined = getCookie("SP_AES");
    if (userLogined) {
      setIsUserLogined(true);
      getUserInfo();
    } else {
      setIsUserLogined(false);
    }
  }, []);

  return (
    <>
      {isUserLogined ? (
        <>
          <Category />
          <Profile />
          <MainTodayRoutine />
          <Analysis />
        </>
      ) : (
        <>
          <span>첫 방문 페이지(비로그인) : 애니메이션</span>
        </>
      )}
    </>
  );
};

export default Main;
