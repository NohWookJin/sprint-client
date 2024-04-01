import { useNavigate } from "react-router-dom";

const JoinForm = () => {
  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate("/login");
  };

  return (
    <form className="flex flex-col shadow-2xl w-[60%] px-[20px] py-[20px] rounded-[8px]">
      <div className="pb-[10px]">
        <span className="font-semibold text-[23px]">회원가입</span>
      </div>
      <div className="flex flex-col gap-[40px] pt-[30px]">
        <label className="flex flex-col gap-[10px]">
          <span className="font-semibold">이메일</span>
          <input
            type="text"
            className="border-b focus:outline-none pb-[5px] focus:border-[#3a7ce1]"
          />
        </label>
        <label className="flex flex-col gap-[10px]">
          <span className="font-semibold">닉네임</span>
          <input
            type="text"
            className="border-b focus:outline-none pb-[5px] focus:border-[#3a7ce1]"
          />
        </label>
        <label className="flex flex-col gap-[10px]">
          <span className="font-semibold">비밀번호</span>
          <input
            type="password"
            className="border-b focus:outline-none pb-[5px] focus:border-[#3a7ce1]"
          />
        </label>
        <label className="flex flex-col gap-[10px]">
          <span className="font-semibold">비밀번호 확인</span>
          <input
            type="password"
            className="border-b focus:outline-none pb-[5px] focus:border-[#3a7ce1]"
          />
        </label>
      </div>
      <div className="pt-[40px] flex flex-col gap-[20px]">
        <button className=" w-full font-semibold bg-[#3a7ce1] text-white px-4 py-2 rounded-[5px]">
          회원가입
        </button>
        <span
          onClick={onClickLogin}
          className="cursor-pointer opacity-[0.7] text-[12px] text-right"
        >
          * 이미 회원이신가요? <span className="text-[#3a7ce1]"> 로그인</span>
        </span>
      </div>
    </form>
  );
};

export default JoinForm;
