import { useEffect, useState } from "react";
import { Analysis, getAnalysis } from "../../API/getAnalysis";
import RoutineDetailAnalysisItem from "../Analysis/RoutineDetailAnalysisItem";
import { formatDate } from "../../lib/timeFormatChange";
import { useRecoilValue } from "recoil";
import { themeState } from "../../Store/themeState";

interface RoutineTodoDetailAnalysisProps {
  routineId: number;
  startDate: string;
}

const RoutineTodoDetailAnalysis = ({
  routineId,
  startDate,
}: RoutineTodoDetailAnalysisProps) => {
  const [analysisData, setAnalysisData] = useState<Analysis | null>(null);
  const [analysisTable, setAnalysisTable] = useState<number[]>([]);
  const isDark = useRecoilValue(themeState);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAnalysis(routineId);

      if (res) {
        setAnalysisData({
          ...res,
          date: formatDate(startDate),
        });

        const parsedCounts = JSON.parse(res.dailyCounts);

        if (parsedCounts && parsedCounts.length >= 365) {
          const changedCounnts = parsedCounts.slice(0, 364);
          setAnalysisTable(changedCounnts);
        } else {
          setAnalysisTable(parsedCounts);
        }
      }
    };
    fetchData();
  }, [routineId, startDate]);

  if (analysisData) {
    return (
      <div className="mb-[60px] mt-[80px]">
        <h1 className="text-[26px] font-semibold">
          {analysisData.name} 루틴 요약
        </h1>
        <div className="pt-[20px] flex flex-col gap-[3px]">
          <span>
            🤔 최초 스프린트 :
            <span className="pl-[5px] text-[#3a7ce1] font-semibold">
              {analysisData.date}
            </span>
          </span>
          <span>
            🏃 현재 스프린트 :
            <span className="pl-[5px] text-[#3a7ce1] font-semibold">
              {analysisData.continuity}KM
            </span>
            <div className="pl-[5px] pt-[5px] text-[12px] opacity-[0.5]">
              * 현재 스프린트란? 해당 루틴에서 현재까지 연속해서 수행한
              횟수입니다. (어제 날짜를 기준으로 기록됩니다.)
            </div>
          </span>
        </div>
        <div className="pt-[20px]">
          <div className="pb-[10px]">
            <span className="text-[20px] font-semibold">스프린트 기록</span>
          </div>
          <div className="flex flex-col gap-[3px]">
            <span>
              🎯 평균 스프린트 :
              <span className="pl-[5px] text-[#3a7ce1] font-semibold">
                {analysisData.average}%
              </span>
            </span>
            <span>
              👀 일일 목표 횟수 :
              <span className="pl-[5px] text-[#3a7ce1] font-semibold">
                {analysisData.targetCount}
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <RoutineDetailAnalysisItem
            calendar={analysisTable}
            targetCount={analysisData.targetCount}
            isDark={isDark}
          />
        </div>
      </div>
    );
  }
};

export default RoutineTodoDetailAnalysis;
