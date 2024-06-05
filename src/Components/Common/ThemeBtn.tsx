import { themeState } from "../../Store/themeState";
import { useRecoilState } from "recoil";

const ThemeBtn = () => {
  const [darkMode, setDarkMode] = useRecoilState(themeState);

  const toggleThemeBtn = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      {darkMode ? (
        <span
          onClick={toggleThemeBtn}
          className="text-[13px] cursor-pointer opacity-[0.6]"
        >
          라이트 모드
        </span>
      ) : (
        <span
          onClick={toggleThemeBtn}
          className="text-[13px] cursor-pointer opacity-[0.6]"
        >
          다크 모드
        </span>
      )}
    </>
  );
};

export default ThemeBtn;
