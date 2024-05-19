import moment from "moment-timezone";

export const formatTodayDate = (): string => {
  return moment().tz("Asia/Seoul").format("M월 D일");
};
