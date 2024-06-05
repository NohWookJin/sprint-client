import { useNavigate } from "react-router-dom";
import ThemeBtn from "./ThemeBtn";
import { getCookie, setCookieLogout } from "../../lib/userCookie";
import { useRecoilValue } from "recoil";
import { themeState } from "../../Store/themeState";

const Header = () => {
  const navigate = useNavigate();
  const accessToken = getCookie("SP_AES");

  const darkMode = useRecoilValue(themeState);

  const onClikcLogout = () => {
    setCookieLogout("SP_AES");
    setCookieLogout("SP_USER_EMAIL");
    setCookieLogout("SP_USER_NAME");
    navigate("/login");
  };

  return (
    <header
      className={`max-w-[640px] flex items-end justify-between py-[20px] mb-[5px] ${
        darkMode ? "dark" : ""
      }`}
    >
      <div onClick={() => navigate("/")}>
        <div className="flex items-end gap-[10px] cursor-pointer">
          <span className="text-[46px] font-semibold text-[#3A7CE1] ">
            SPRINT
          </span>
          <span className="text-[14px] font-bold pb-[12px]">
            성장을 위한 나의 루틴
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center gap-[15px] pb-[12px]">
        <ThemeBtn />
        {accessToken && (
          <div onClick={() => navigate("/routine/setting")}>
            <span className="text-[13px] cursor-pointer opacity-[0.6]">
              루틴 설정
            </span>
          </div>
        )}
        {accessToken ? (
          <div onClick={onClikcLogout}>
            <span className="text-[13px] cursor-pointer opacity-[0.6]">
              로그아웃
            </span>
          </div>
        ) : (
          <div onClick={() => navigate("/login")}>
            <span className="text-[13px] cursor-pointer opacity-[0.7]">
              로그인
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
