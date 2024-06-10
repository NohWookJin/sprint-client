import Category from "../Category/Category";
import Profile from "../Profile/Profile";
import MainTodayRoutine from "./MainTodayRoutine";
import AnalysisBox from "../Analysis/AnalysisBox";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../API/users";
import { getCookie } from "../../lib/userCookie";
import Hero from "../Landing/Hero";
import Benefits from "../Landing/Benefits";
import Chatbot from "../Chatbot/Chatbot";

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
        <section>
          <Category />
          <Profile />
          <MainTodayRoutine />
          <AnalysisBox />
          <Chatbot />
        </section>
      ) : (
        <section className="mb-[30px]">
          <Hero />
          <Benefits />
        </section>
      )}
    </>
  );
};

export default Main;
