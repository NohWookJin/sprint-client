export interface ActivityCalendarEntry {
  [date: string]: boolean;
}

export interface Activity {
  name: string;
  start_with: string;
  continuity: number;
  calendar: ActivityCalendarEntry[];
}

export interface ActivitiesResponse {
  response: Record<number, Activity[]>;
}

export const generateDummyData = (): ActivitiesResponse => {
  const startYear = new Date().getFullYear() - 1;
  const startMonth = new Date().getMonth() + 1;
  const startDate = new Date(`${startYear}-${startMonth}-01`);
  const endDate = new Date(`${startYear + 1}-${startMonth}-01`);
  const currentDate = new Date(startDate);

  const activityCalendar: ActivityCalendarEntry = {};
  while (currentDate < endDate) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    activityCalendar[formattedDate] = Math.random() > 0.5;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    response: {
      1: [
        {
          name: "TIL",
          start_with: startDate.toISOString().split("T")[0],
          continuity: 13,
          calendar: [activityCalendar],
        },
      ],
      2: [
        {
          name: "알고리즘",
          start_with: startDate.toISOString().split("T")[0],
          continuity: 16,
          calendar: [activityCalendar],
        },
      ],
    },
  };
};
