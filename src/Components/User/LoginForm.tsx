import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const onClickJoin = () => {
    navigate("/join");
  };

  return (
    <form className="flex flex-col shadow-2xl w-[60%] px-[20px] py-[20px] rounded-[8px]">
      <div className="border-b border-[#d9d9d9] pb-[10px]">
        <h1 className="font-semibold text-[20px]">로그인</h1>
      </div>
      <div className="flex flex-col pt-[20px] gap-[10px]">
        <input
          type="text"
          className="bg-[#f0f0f0] px-[8px] py-[8px] rounded-[3px] text-[13.5px] focus:border-[#3a7ce1]"
        />
        <input
          type="text"
          className="bg-[#f0f0f0] px-[8px] py-[8px]  text-[13.5px] rounded-[3px] focus:border-[#3a7ce1]"
        />
      </div>
      <div className="pt-[20px] flex flex-col gap-[20px]">
        <button className=" w-full font-semibold bg-[#3a7ce1] text-white px-4 py-2 rounded-[5px]">
          로그인
        </button>
        <span
          onClick={onClickJoin}
          className="cursor-pointer opacity-[0.7] text-[12px] text-right"
        >
          * 회원이 아니신가요? <span className="text-[#3a7ce1]"> 회원가입</span>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
