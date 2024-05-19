import RoutineSetting from "../../Components/RoutineSetting/RoutineSetting";

const SettingRoutinePage = () => {
  return (
    <section className="pt-[30px]">
      <h1 className="font-bold text-[24px]">내 루틴 관리</h1>
      <div className="flex flex-col pt-[10px] pb-[40px] opacity-[0.6]">
        <span className="text-[14px]">
          * 루틴의 이름 수정과 삭제만 가능합니다.
        </span>
        <span className="text-[14px]">
          * 한 번 삭제된 루틴은 복구할 수 없습니다.
        </span>
      </div>
      <RoutineSetting />
    </section>
  );
};

export default SettingRoutinePage;
