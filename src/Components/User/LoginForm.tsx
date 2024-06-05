import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginDataForm, login } from "../../API/users";
import { useRecoilValue } from "recoil";
import { themeState } from "../../Store/themeState";

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginDataForm>({
    email: "",
    password: "",
  });
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [isNotUser, setIsNotUser] = useState<boolean>(false);

  const darkMode = useRecoilValue(themeState);

  const navigate = useNavigate();

  const isValidateForm = (data: LoginDataForm) => {
    return data.email.length > 0 && data.password.length > 0;
  };

  const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: value,
      };
      setIsValidForm(isValidateForm(newFormData));
      return newFormData;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      setIsNotUser(true);
    }
  };

  const onClickJoin = () => {
    navigate("/join");
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className={`flex flex-col shadow-2xl w-[60%] px-[20px] py-[20px] rounded-[8px] ${
          darkMode ? "dark: bg-white" : ""
        }`}
      >
        <div className="border-b border-[#d9d9d9] pb-[10px]">
          <h1
            className={`font-semibold text-[20px] ${
              darkMode ? "dark: text-black" : ""
            }`}
          >
            로그인
          </h1>
        </div>
        {isNotUser && (
          <div className="w-full mt-[20px]">
            <div className="flex items-center bg-[#eed3d7] py-[15px] pl-[10px] rounded-[5px]">
              <span className="text-[#ff0000] text-[13.5px]">
                잘못된 이메일 혹은 비밀번호입니다.
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-col pt-[20px] gap-[10px]">
          <input
            type="text"
            name="email"
            onChange={onChangeField}
            className={`bg-[#f0f0f0] px-[8px] py-[8px] rounded-[3px] text-[13.5px] focus:border-[#3a7ce1] ${
              darkMode ? "dark: text-black" : ""
            }`}
          />
          <input
            type="password"
            name="password"
            onChange={onChangeField}
            className={`bg-[#f0f0f0] px-[8px] py-[8px]  text-[13.5px] rounded-[3px] focus:border-[#3a7ce1] ${
              darkMode ? "dark: text-black" : ""
            }`}
          />
        </div>
        <div className="pt-[20px] flex flex-col gap-[20px]">
          <button
            type="submit"
            className={`w-full font-semibold px-4 py-2 rounded-[5px] text-white ${
              isValidForm
                ? "bg-[#3a7ce1] cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isValidForm}
          >
            로그인
          </button>
          <span
            onClick={onClickJoin}
            className={`cursor-pointer opacity-[0.7] text-[12px] text-right ${
              darkMode ? "dark: text-black" : ""
            }`}
          >
            * 회원이 아니신가요?{" "}
            <span className="text-[#3a7ce1]"> 회원가입</span>
          </span>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
