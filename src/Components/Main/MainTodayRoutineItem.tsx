import { useRecoilValue } from "recoil";
import { themeState } from "../../Store/themeState";

interface MainTodayRoutineItemProps {
  item: {
    id: number;
    name: string;
    count: number;
    routineType: string;
  };
  category: "todo" | "blog";
}

const MainTodayRoutineItem = ({
  item,
  category,
}: MainTodayRoutineItemProps) => {
  const { name, count, id, routineType } = item;

  const isDark = useRecoilValue(themeState);

  const onClickItem = () => {
    window.location.href = `/routine/${id}?routineType=${routineType}`;
  };

  return (
    <div
      onClick={onClickItem}
      className={`cursor-pointer flex flex-col  gap-[30px] w-[200px] h-[200px] shadow-2xl rounded-lg p-5 transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 ${
        isDark
          ? "dark: border border-[#4b5563] bg-[#23272f] text-white shadow-2xl"
          : "bg-[#F4F4F8] shadow-lg"
      }`}
    >
      <div className="flex justify-between items-center">
        <div
          className={`text-[20px] font-semibold  ${
            isDark ? "dark: text-white" : "text-[#495057]"
          }`}
        >
          <span>{name}</span>
        </div>
        <div>
          <span>📌</span>
        </div>
      </div>
      {category === "todo" ? (
        <div
          className={`text-[16px]  font-light ${
            isDark ? "dark: text-white" : "text-[#495057]"
          }`}
        >
          {count > 0 ? (
            <>
              <div className="pb-[3px]">투두리스트 작성이 </div>
              <div>
                <span>
                  <span className="font-semibold">{count}건 </span>있어요.
                </span>
              </div>
            </>
          ) : (
            <div>
              <span className="font-semibold">
                오늘의 목표를 <div>모두 달성했어요 🎉</div>
              </span>
            </div>
          )}
          <div className="text-[11px] pt-[33px] opacity-[0.5]">
            * {name} 루틴 이동하기
          </div>
        </div>
      ) : (
        <div
          className={`text-[16px]  font-light ${
            isDark ? "dark: text-white" : "text-[#495057]"
          }`}
        >
          {count > 0 ? (
            <>
              <div className="pb-[3px]">블로그 작성이 </div>
              <div>
                <span>
                  <span className="font-semibold">{count}건 </span>있어요.
                </span>
              </div>
            </>
          ) : (
            <div>
              <span className="font-semibold">
                오늘의 목표를 <div>모두 달성했어요 🎉</div>
              </span>
            </div>
          )}
          <div
            className={`text-[11px] pt-[33px] opacity-[0.5] ${
              isDark ? "dark: text-white" : ""
            }`}
          >
            * {name} 루틴 이동하기
          </div>
        </div>
      )}
    </div>
  );
};

export default MainTodayRoutineItem;
