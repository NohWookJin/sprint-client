import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="max-w-[640px] flex items-end justify-between py-[20px] mb-[5px]">
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
      <div className="flex justify-between gap-[10px] pb-[12px]">
        {/* <span className="text-[14px]">후원하기</span> */}
        {/* <span className="text-[14px]">내 정보</span> */}
        <div onClick={() => navigate("/login")}>
          <span className="text-[14px] cursor-pointer">로그인</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
