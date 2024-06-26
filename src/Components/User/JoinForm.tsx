import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupForm, signUp } from "../../API/users";
import {
  isValidEmailType,
  isValidName,
  isValidPassword,
  isEnteredSamePassword,
} from "../../lib/validateJoinForm";
import { useRecoilValue } from "recoil";
import { themeState } from "../../Store/themeState";

const JoinForm = () => {
  const [formData, setFormData] = useState<SignupForm>({
    email: "",
    name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isValidForm, setIsValidForm] = useState({
    email: false,
    name: false,
    password: false,
    confirmPassword: false,
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const darkMode = useRecoilValue(themeState);

  const navigate = useNavigate();

  const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    switch (name) {
      case "email":
        setIsValidForm((prev) => ({ ...prev, email: isValidEmailType(value) }));
        setFormErrors((prev) => ({
          ...prev,
          email: isValidEmailType(value)
            ? ""
            : "올바른 이메일 형식을 입력해주세요.",
        }));
        break;
      case "name":
        setIsValidForm((prev) => ({ ...prev, name: isValidName(value) }));
        setFormErrors((prev) => ({
          ...prev,
          name: isValidName(value)
            ? ""
            : "닉네임은 2글자 이상 10글자 이하로 입력해주세요.",
        }));
        break;
      case "password":
        setIsValidForm((prev) => ({
          ...prev,
          password: isValidPassword(value),
        }));
        setFormErrors((prev) => ({
          ...prev,
          password: isValidPassword(value)
            ? ""
            : "비밀번호는 8자 이상이어야 합니다.",
        }));
        setIsValidForm((prev) => ({
          ...prev,
          confirmPassword: isEnteredSamePassword(value, confirmPassword),
        }));
        setFormErrors((prev) => ({
          ...prev,
          confirmPassword: isEnteredSamePassword(value, confirmPassword)
            ? ""
            : "비밀번호가 일치하지 않습니다.",
        }));
        break;
      default:
        break;
    }
  };

  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setIsValidForm((prev) => ({
      ...prev,
      confirmPassword: isEnteredSamePassword(formData.password, value),
    }));
    setFormErrors((prev) => ({
      ...prev,
      confirmPassword: isEnteredSamePassword(formData.password, value)
        ? ""
        : "비밀번호가 일치하지 않습니다.",
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(formData);
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };

  const onClickAlreadyUser = () => {
    navigate("/login");
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col shadow-2xl w-[70%] px-[20px] py-[20px] rounded-[8px] ${
        darkMode
          ? "dark: bg-[#23272f] border border-[#d9d9d9] text-white border border-opacity-30"
          : ""
      }`}
    >
      <div className="pb-[10px]">
        <span
          className={`font-semibold text-[23px] ${
            darkMode ? "dark: text-white" : ""
          }`}
        >
          회원가입
        </span>
      </div>
      <div className="flex flex-col gap-[40px] pt-[30px]">
        <label htmlFor="email" className="flex flex-col gap-[10px]">
          <span
            className={`font-semibold ${darkMode ? "dark: text-white" : ""}`}
          >
            이메일
          </span>
          <input
            type="text"
            name="email"
            onChange={onChangeField}
            className={`border-b focus:outline-none pb-[5px] focus:border-[#3a7ce1] ${
              darkMode ? "dark: text-white bg-[#23272f]" : ""
            }`}
          />
          {formErrors.email && (
            <span className="text-[11px] text-[#ff0000] opacity-[0.7]">
              {formErrors.email}
            </span>
          )}
        </label>
        <label htmlFor="name" className="flex flex-col gap-[10px]">
          <span
            className={`font-semibold ${darkMode ? "dark: text-white" : ""}`}
          >
            닉네임
          </span>
          <input
            type="text"
            name="name"
            onChange={onChangeField}
            className={`border-b focus:outline-none pb-[5px] focus:border-[#3a7ce1] ${
              darkMode ? "dark: text-white bg-[#23272f]" : ""
            }`}
          />

          {formErrors.name && (
            <span className="text-[11px] text-[#ff0000] opacity-[0.7]">
              {formErrors.name}
            </span>
          )}
        </label>
        <label htmlFor="password" className="flex flex-col gap-[10px]">
          <span
            className={`font-semibold ${darkMode ? "dark: text-white" : ""}`}
          >
            비밀번호
          </span>

          <input
            type="password"
            name="password"
            onChange={onChangeField}
            className={`border-b focus:outline-none pb-[3px] focus:border-[#3a7ce1] ${
              darkMode ? "dark: text-white bg-[#23272f]" : ""
            }`}
          />
          {formErrors.password && (
            <span className="text-[11px] text-[#ff0000] opacity-[0.7]">
              {formErrors.password}
            </span>
          )}
        </label>
        <label className="flex flex-col gap-[10px]">
          <span
            className={`font-semibold ${darkMode ? "dark: text-white" : ""}`}
          >
            비밀번호 확인
          </span>

          <input
            type="password"
            onChange={onChangeConfirmPassword}
            className={`border-b focus:outline-none pb-[5px] focus:border-[#3a7ce1] ${
              darkMode ? "dark: text-white bg-[#23272f]" : ""
            }`}
          />
          {formErrors.confirmPassword && (
            <span className="text-[11px] text-[#ff0000] opacity-[0.7]">
              {formErrors.confirmPassword}
            </span>
          )}
        </label>
      </div>
      <div className="pt-[40px] flex flex-col gap-[20px]">
        <button
          type="submit"
          className={`w-full font-semibold px-4 py-2 rounded-[5px] text-white ${
            Object.values(isValidForm).every((v) => v)
              ? "bg-[#3a7ce1] cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!Object.values(isValidForm).every((v) => v)}
        >
          회원가입
        </button>
        <span
          onClick={onClickAlreadyUser}
          className={`cursor-pointer opacity-[0.7] text-[12px] text-right ${
            darkMode ? "dark: text-white" : ""
          }`}
        >
          * 이미 회원이신가요? <span className="text-[#3a7ce1]"> 로그인</span>
        </span>
      </div>
    </form>
  );
};

export default JoinForm;
