import moment from "moment-timezone";

export const formatTodayDate = (): string => {
  // const setRealTime = moment().add(9, "hours").tz("Asia/Seoul");
  const setRealTime = moment().tz("Asia/Seoul");
  return setRealTime.format("M월 D일");
};

export const formatTodayFullDate = (): string => {
  // const setRealTime = moment().add(9, "hours").tz("Asia/Seoul");
  const setRealTime = moment().tz("Asia/Seoul");
  return setRealTime.format("YYYY-MM-DD");
};

export const formatDate = (time: string): string => {
  // const setRealTime = moment(time).add(9, "hours").tz("Asia/Seoul");
  const setRealTime = moment(time).tz("Asia/Seoul");
  return setRealTime.format("YYYY년 M월 D일");
};

export const formatDateToISO = (time: string): string => {
  const setRealTime = moment(time).tz("Asia/Seoul");
  return setRealTime.format("YYYY-MM-DD");
};
