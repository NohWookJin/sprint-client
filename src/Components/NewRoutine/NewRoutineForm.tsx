import { ChangeEvent, FormEvent, useState } from "react";
import ColorType from "../../Dummy/assets/setColor.png";
import ColorType2 from "../../Dummy/assets/setColor2.png";

// 추후 인터페이스 api 이동
interface FormProps {
  routine_name: string;
  routine_type: string;
  routine_color_type: string;
}

const NewRoutineForm = () => {
  const [formData, setFormData] = useState<FormProps>({
    routine_name: "",
    routine_type: "",
    routine_color_type: "",
  });

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.routine_name.trim() ||
      !formData.routine_type.trim() ||
      !formData.routine_color_type.trim()
    ) {
      alert("이름 혹은 선택을 모두 완료해주세요.");
      return;
    }
    alert("루틴 생성 완료. 추후 API 연결 예정...");
  };

  const onChangeRoutineName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, routine_name: e.target.value });
  };

  const onChangeRoutineType = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, routine_type: e.target.value });
  };

  const onChangeRoutineColorType = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, routine_color_type: e.target.value });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className="flex flex-col pb-[80px]">
        <span className="pb-[10px] font-semibold text-[20px]">
          1. 새로운 루틴의 이름을 정해주세요.
        </span>
        <input
          onChange={onChangeRoutineName}
          className="focus:outline-none border-b border-[#d9d9d9] pt-[10px] pb-[10px]"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-[15px] text-[20px] pb-[80px]">
        <span className="font-semibold">
          2. 새로운 루틴의 형태를 정해주세요.
        </span>
        <div className="flex items-center gap-[30px]">
          <label className="min-w-[300px] flex flex-col">
            <div>
              <input
                onChange={onChangeRoutineType}
                name="routineType"
                type="radio"
                value="todolist"
              />
              <span className="pl-[10px] text-[16px] font-semibold">
                투두리스트
              </span>
            </div>
            <span className="text-[12px] pt-[3px] opacity-[0.6]">
              투두리스트는 완료율이 다양해요.
            </span>
          </label>
          <label className="min-w-[300px] flex flex-col">
            <div>
              <input
                onChange={onChangeRoutineType}
                name="routineType"
                type="radio"
                value="blog"
              />
              <span className="pl-[10px]  text-[16px] font-semibold">
                블로그
              </span>
            </div>
            <span className=" text-[12px] pt-[3px] opacity-[0.6]">
              블로그는 완료율이 0%와 100%만 존재해요.
            </span>
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-[15px] text-[20px] pb-[80px]">
        <span className="font-semibold text-[20px]">
          3. 새로운 루틴의 잔디 색상을 정해주세요.
        </span>
        <div className="flex items-center gap-[30px]">
          <label className="min-w-[300px] flex flex-col">
            <div>
              <input
                onChange={onChangeRoutineColorType}
                name="routineColorType"
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
            <div>
              <input
                onChange={onChangeRoutineColorType}
                name="routineColorType"
                type="radio"
                value="#30A14E"
              />
              <span className="pl-[10px]  text-[16px] font-semibold">녹색</span>
            </div>
            <div className="pt-[10px] cursor-pointer transform transition duration-200 hover:scale-110">
              <img
                className="object-contain"
                src={ColorType2}
                alt="routine-color-image"
              />
            </div>
          </label>
        </div>
      </div>
      <button className="bg-[#3A7CE1] text-white w-full h-[45px] rounded-[6px]">
        생성하기
      </button>
    </form>
  );
};

export default NewRoutineForm;
