import { useEffect } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./Router/MainRouter";
import { themeState } from "./Store/themeState";

const AppContent = () => {
  const darkMode = useRecoilValue(themeState);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);

    return () => {
      document.body.classList.remove("dark");
    };
  }, [darkMode]);

  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
};

export default App;
