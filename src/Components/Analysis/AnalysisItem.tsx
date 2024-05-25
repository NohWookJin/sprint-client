import { useEffect, useState } from "react";
import { Analysis } from "../../API/getAnalysis";
import RoutineDetailAnalysisItem from "./RoutineDetailAnalysisItem";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../lib/timeFormatChange";
import moment from "moment";

interface AnalysisItemProps {
  item: Analysis;
}

const AnalysisItem = ({ item }: AnalysisItemProps) => {
  const {
    name,
    routineId,
    continuity,
    average,
    dailyCounts,
    targetCount,
    date,
  } = item;
  const [analysisTable, setAnalysisTable] = useState<number[]>([]);
  const [newDate, setNewDate] = useState<string>(date);

  const naivgate = useNavigate();

  useEffect(() => {
    const parsedCounts = JSON.parse(dailyCounts);
    if (parsedCounts && parsedCounts.length >= 365) {
      const changedCounnts = parsedCounts.slice(0, 364);
      setAnalysisTable(changedCounnts);
      setNewDate(moment(date).toISOString());
    } else {
      setAnalysisTable(parsedCounts);
    }
  }, [dailyCounts, date]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div
          onClick={() => naivgate(`/routine/${routineId}`)}
          className="cursor-pointer w-full text-lg font-semibold text-white rounded-lg bg-gradient-to-br from-blue-500 to-blue-800 shadow-lg py-2 px-4 transform"
        >
          {name}
        </div>
        <div className="flex flex-col pt-[10px]">
          <div>
            <span className="text-[13px]">
              🤔 {""}
              <span className="text-[#3a7ce1] font-bold">
                {formatDate(newDate)}
              </span>
              에 루틴을 시작했어요.
            </span>
          </div>
          <div>
            <span className="text-[13px]">
              🏃 쉬지 않고 {""}
              <span className="text-[#3a7ce1] font-bold">
                {continuity}KM
              </span>{" "}
              달리고 있어요.
            </span>
          </div>
          <div>
            <span className="text-[13px]">
              🎯 {name} 루틴은 최초 스프린트부터 현재까지{" "}
              <span className="text-[#3a7ce1] font-bold">평균 {average}%</span>
              를 달성하고 있어요.
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mb-[20px]">
            <div className="flex flex-col gap-5 mt-5">
              <RoutineDetailAnalysisItem
                calendar={analysisTable}
                targetCount={targetCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisItem;
