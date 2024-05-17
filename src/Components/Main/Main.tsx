import Category from "../Category/Category";
import Profile from "../Profile/Profile";
import MainTodayRoutine from "./MainTodayRoutine";
import Analysis from "../Analysis/Analysis";
import { useEffect } from "react";
import { getUserInfo } from "../../API/getUser";

const Main = () => {
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Category />
      <Profile />
      <MainTodayRoutine />
      <Analysis />
    </>
  );
};

export default Main;
