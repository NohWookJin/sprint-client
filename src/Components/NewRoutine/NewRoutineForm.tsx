import { ChangeEvent, FormEvent, useState } from "react";
import { RoutineDataForm, postNewRoutine } from "../../API/routines";
import RoutineType1 from "../../Assets/todoType.png";
import RoutineType2 from "../../Assets/blogType.png";
import ColorType from "../../Assets/setColor.png";
import ColorType2 from "../../Assets/setColor2.png";
import { useNavigate } from "react-router-dom";

const NewRoutineForm = () => {
  const [formData, setFormData] = useState<RoutineDataForm>({
    name: "",
    routineType: "",
    targetCount: 0,
    colorSelection: "",
  });
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const navigate = useNavigate();

  const isValidateForm = (data: RoutineDataForm) => {
    return (
      data.name.trim().length > 1 &&
      data.name.trim().length < 7 &&
      data.routineType.trim().length > 0 &&
      data.targetCount >= 1 &&
      data.colorSelection.trim().length > 0
    );
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await postNewRoutine(formData);
      navigate(`/routine/${data.id}?routineType=${formData.routineType}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeField = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  return (
    <form onSubmit={onSubmit} className="pb-[40px]">
      <div className="flex flex-col pb-[80px]">
        <span className="pb-[10px] font-semibold text-[20px]">
          1. 새로운 루틴의 이름을 정해주세요.
        </span>
        <input
          onChange={onChangeField}
          className="focus:outline-none border-b border-[#d9d9d9] pt-[10px] pb-[10px]"
          name="name"
          type="text"
        />
        {formData.name.trim().length > 7 && (
          <span className="pt-[10px] mb-[-10px] text-[13px] text-[#ff0000] opacity-[0.7]">
            * 루틴의 이름은 최대 6글자만 가능합니다.
          </span>
        )}
      </div>
      <div className="flex flex-col gap-[15px] text-[20px] pb-[80px]">
        <span className="font-semibold">
          2. 새로운 루틴의 형태를 정해주세요.
        </span>
        <div className="flex items-center gap-[30px]">
          <label className="min-w-[300px] flex flex-col">
            <div>
              <input
                onChange={onChangeField}
                name="routineType"
                type="radio"
                value="todo"
              />
              <span className="pl-[10px] text-[16px] font-semibold">
                투두리스트
              </span>
            </div>
            <div className="pt-[25px] cursor-pointer transform transition duration-200 hover:scale-110">
              <img
                className="object-contain"
                src={RoutineType1}
                alt="routine-color-image"
              />
            </div>
          </label>
          <label className="min-w-[300px] flex flex-col">
            <div>
              <input
                onChange={onChangeField}
                name="routineType"
                type="radio"
                value="blog"
              />
              <span className="pl-[10px]  text-[16px] font-semibold">
                블로그
              </span>
            </div>
            <div className="pt-[25px] cursor-pointer transform transition duration-200 hover:scale-110">
              <img
                className="object-contain"
                src={RoutineType2}
                alt="routine-color-image"
              />
            </div>
          </label>
        </div>
      </div>
      <div className="flex flex-col pb-[80px]">
        <span className="pb-[10px] font-semibold text-[20px]">
          3. 루틴의 일일 목표 횟수를 정해주세요.
        </span>
        <span className="pb-[10px] text-[12px] opacity-[0.6]">
          * 일일 목표 횟수를 달성해야 루틴의 기록(잔디)을 채울 수 있으니 신중히
          선택해주세요.
        </span>
        <select
          onChange={onChangeField}
          name="targetCount"
          value={formData.targetCount}
          className="focus:outline-none bg-white appearance-none border-none pt-[10px] pb-[10px]"
        >
          <option value={0} disabled>
            목표 횟수를 선택하세요
          </option>
          {[...Array(15).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-[15px] text-[20px] pb-[80px]">
        <span className="font-semibold text-[20px]">
          4. 새로운 루틴의 잔디 색상을 정해주세요.
        </span>
        <div className="flex items-center gap-[30px]">
          <label className="min-w-[300px] flex flex-col">
            <div>
              <input
                onChange={onChangeField}
                name="colorSelection"
                type="radio"
                value="#3a7ce1"
              />
              <span className="pl-[10px] text-[16px] font-semibold">
                파란색
              </span>
            </div>
            <div className="pt-[10px] cursor-pointer transform transition duration-200 hover:scale-110">
              <img
                className="object-contain"
                src={ColorType}
                alt="routine-color-image"
              />
            </div>
          </label>
          <label className="min-w-[300px] flex flex-col">
            <div className="relative cursor-not-allowed">
              <input
                onChange={onChangeField}
                name="colorSelection"
                type="radio"
                value="#30A14E"
                disabled
              />
              <span className="pl-[10px]  text-[16px] font-semibold">녹색</span>
              <div className="text-[11.5px] opacity-[0.6] absolute top-[8px] left-[60px]">
                아직 지원하지 않고 있어요.
              </div>
            </div>
            <div className="pt-[10px] cursor-pointer opacity-[0.5]">
              <img
                className="object-contain"
                src={ColorType2}
                alt="routine-color-image"
              />
            </div>
          </label>
        </div>
      </div>
      <button
        className={`bg-[#3A7CE1] text-white w-full h-[45px] rounded-[6px] ${
          isValidForm
            ? "bg-[#3a7ce1] cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isValidForm}
      >
        생성하기
      </button>
    </form>
  );
};

export default NewRoutineForm;
