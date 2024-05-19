// import React from "react";
// import { ActivityCalendarEntry } from "../../API/getAnalysis";

// interface AnalysisItemProps {
//   calendar: ActivityCalendarEntry;
//   name?: string;
//   start_with?: string;
//   continuity?: number;
// }

// const groupByWeek = (calendar: Record<string, boolean>) => {
//   const weeks: Record<string, boolean>[] = [];
//   let week: Record<string, boolean> = {};
//   let currentWeekDay = new Date(Object.keys(calendar)[0]).getDay();

//   Object.entries(calendar).forEach(([date, didActivity], index) => {
//     week[date] = didActivity;
//     currentWeekDay++;

//     if (
//       currentWeekDay % 7 === 0 ||
//       index === Object.keys(calendar).length - 1
//     ) {
//       weeks.push(week);
//       week = {};
//     }
//   });

//   return weeks;
// };

// const AnalysisItem: React.FC<AnalysisItemProps> = ({
//   calendar,
//   name,
//   start_with,
//   continuity,
// }) => {
//   return (
//     <div className="flex flex-col gap-4 mb-[20px]">
//       <div className="flex flex-col">
//         <div className="w-full text-lg font-semibold text-white rounded-lg bg-gradient-to-br from-blue-500 to-blue-800 shadow-lg py-2 px-4 transform">
//           {name}
//         </div>
//         <div className="flex flex-col pt-[10px]">
//           <div>
//             <span className="text-[13px] opacity-[0.6]">
//               * {start_with}에 {name} 루틴을 시작했어요.
//             </span>
//           </div>
//           <div>
//             <span className="text-[13px] opacity-[0.6]">
//               * {continuity}KM 달리고 있어요.
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="flex">
//         {groupByWeek(calendar).map((week, weekIndex) => (
//           <div key={weekIndex} className="flex flex-col gap-[1px]">
//             {Object.entries(week).map(([date, didActivity]) => (
//               <div
//                 key={date}
//                 title={date}
//                 className={`w-[11px] h-[12px] ${
//                   didActivity ? "bg-[#3A7CE1] opacity-[0.95]" : "bg-gray-200"
//                 } rounded-[3px] mr-[1px]`}
//               ></div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AnalysisItem;
