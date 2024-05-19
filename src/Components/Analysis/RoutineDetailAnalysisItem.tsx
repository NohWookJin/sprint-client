import React from "react";

interface AnalysisItemProps {
  calendar: number[];
  targetCount: number;
}

const RoutineDetailAnalysisItem: React.FC<AnalysisItemProps> = ({
  calendar,
  targetCount,
}) => {
  const groupByWeek = (calendar: number[]) => {
    const weeks: number[][] = [];
    let currentWeek: number[] = [];

    calendar.forEach((count, index) => {
      currentWeek.unshift(count);

      if (currentWeek.length === 7 || index === calendar.length - 1) {
        weeks.unshift(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length === 1) {
      weeks.unshift(currentWeek);
    }

    return weeks;
  };

  const weeks = groupByWeek(calendar);

  return (
    <div className="flex flex-col gap-4 mb-[20px]">
      <div className="flex">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[1px]">
            {week.map((didActivity, index) => (
              <div
                key={index}
                className={`w-[11px] h-[12px] ${
                  didActivity >= targetCount
                    ? "bg-[#3A7CE1] opacity-[0.95]"
                    : "bg-gray-200"
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
