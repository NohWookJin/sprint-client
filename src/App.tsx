import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./Router/MainRouter";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </RecoilRoot>
  );
};
export default App;
