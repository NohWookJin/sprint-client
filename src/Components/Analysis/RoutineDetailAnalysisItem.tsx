import React from "react";

interface AnalysisItemProps {
  calendar: number[];
  targetCount: number;
  isDark: boolean;
}

const RoutineDetailAnalysisItem: React.FC<AnalysisItemProps> = ({
  calendar,
  targetCount,
  isDark,
}) => {
  return (
    <div className="flex flex-wrap gap-1 mb-[20px]">
      {calendar.map((didActivity, index) => (
        <div
          key={index}
          className={`w-[11px] h-[12px] ${
            didActivity >= targetCount
              ? `bg-[#3A7CE1] opacity-[0.95]`
              : isDark
              ? "bg-gray-600"
              : "bg-gray-200"
          } rounded-[3px]`}
        ></div>
      ))}
    </div>
  );
};

export default RoutineDetailAnalysisItem;
