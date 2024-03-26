import React from "react";
import { ActivityCalendarEntry } from "../../API/getAnalysis";

interface AnalysisItemProps {
  calendar: ActivityCalendarEntry;
}

const groupByWeek = (calendar: Record<string, boolean>) => {
  const weeks: Record<string, boolean>[] = [];
  let week: Record<string, boolean> = {};
  let currentWeekDay = new Date(Object.keys(calendar)[0]).getDay();

  Object.entries(calendar).forEach(([date, didActivity], index) => {
    week[date] = didActivity;
    currentWeekDay++;

    if (
      currentWeekDay % 7 === 0 ||
      index === Object.keys(calendar).length - 1
    ) {
      weeks.push(week);
      week = {};
    }
  });

  return weeks;
};

const RoutineDetailAnalysisItem: React.FC<AnalysisItemProps> = ({
  calendar,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-[20px]">
      <div className="flex">
        {groupByWeek(calendar).map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[1px]">
            {Object.entries(week).map(([date, didActivity]) => (
              <div
                key={date}
                title={date}
                className={`w-[11px] h-[12px] ${
                  didActivity ? "bg-[#3A7CE1] opacity-[0.95]" : "bg-gray-200"
                } rounded-[3px] mr-[1px]`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineDetailAnalysisItem;
