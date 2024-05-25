import RoutineSetting from "../../Components/RoutineSetting/RoutineSetting";

const SettingRoutinePage = () => {
  return (
    <section className="pt-[30px]">
      <h1 className="font-bold text-[24px]">내 루틴 관리</h1>
      <div className="flex flex-col pt-[10px] pb-[40px] opacity-[0.6]">
        <span className="text-[13px]">
          • 루틴의 이름 수정과 삭제만 가능합니다.
        </span>
        <span className="text-[13px]">
          • 이미 삭제된 루틴은 복구할 수 없습니다.
        </span>
        <span className="text-[13px]">
          • 루틴은 최대 5개만 생성할 수 있습니다.
        </span>
        <span className="text-[13px]">
          • 5개의 루틴을 이미 생성했다면 신규 생성 버튼이 비활성화됩니다.
        </span>
      </div>
      <RoutineSetting />
    </section>
  );
};

export default SettingRoutinePage;
