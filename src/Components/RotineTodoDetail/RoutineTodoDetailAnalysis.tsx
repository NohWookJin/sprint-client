import { Analysis } from "../../API/getRoutine";
import { ActivitiesResponse, generateDummyData } from "../../API/getAnalysis";
import RoutineDetailAnalysisItem from "../Analysis/RoutineDetailAnalysisItem";

interface RoutineTodoDetailAnalysisProps {
  name: string;
  analysis: Analysis;
}

const RoutineTodoDetailAnalysis = ({
  analysis,
  name,
}: RoutineTodoDetailAnalysisProps) => {
  const filterName = name;

  const jsonData: ActivitiesResponse = generateDummyData();
  const filteredActivities = Object.values(jsonData.response)
    .flat()
    .filter((activity) => activity.name === filterName);

  return (
    <div className="mb-[60px]">
      <h1 className="text-[26px] font-semibold">{name} 루틴 요약</h1>
      <div className="pt-[20px] flex flex-col gap-[3px]">
        <span>
          최초 스프린트 :{" "}
          <span className="text-[#3a7ce1] font-semibold">
            {analysis.start_with}
          </span>
        </span>
        <span>
          현재 스프린트 :{" "}
          <span className="text-[#3a7ce1] font-semibold">
            {analysis.continuity}KM
          </span>
        </span>
      </div>
      <div className="pt-[20px]">
        <div className="pb-[10px]">
          <span className="text-[20px] font-semibold">스프린트 기록</span>
        </div>
        <div className="pl-[10px]">
          <span>
            평균 스프린트 :{" "}
            <span className="text-[#3a7ce1] font-semibold">
              {analysis.continuity}%
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        {filteredActivities.map((activity, index) => (
          <RoutineDetailAnalysisItem
            key={index}
            calendar={activity.calendar[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default RoutineTodoDetailAnalysis;
