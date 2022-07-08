import { useState } from "react";
import dayjs from "dayjs";

const year = dayjs().year();
const month = dayjs().month();
const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
var currentMonthCount = 0 - firstDayOfTheMonth;

//   console.log("firstDayOfTheMonth", firstDayOfTheMonth);
//   console.log(currentMonthCount);

const weeksMatrix = new Array(7).fill(null).map(() => {
  currentMonthCount++;
  return dayjs(new Date(year, 6, currentMonthCount));
});

export const CalendarStructureLogic = () => {
  const [collapsed, setCollapsed] = useState(false); // Sidebar
  const [weekData, setWeekData]: any = useState(weeksMatrix);
  const [weekCount, setWeekCount]: any = useState(currentMonthCount);

  // Fetching next week dates
  function handleWeekForward() {
    currentMonthCount = weekCount;
    const weeksMatrix = new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, 6, currentMonthCount));
    });
    setWeekCount(currentMonthCount);
    setWeekData(weeksMatrix);
  }

  // Fetching prev week dates
  function handleWeekBackward() {
    currentMonthCount = weekCount - 14; // going 2 weeks back and getting the next forward week value
    const weeksMatrix = new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, 6, currentMonthCount));
    });
    setWeekCount(currentMonthCount);
    setWeekData(weeksMatrix);
  }

  // 24hrs in a day
  const timeArr = [];
  for (let index = 0; index < 24; index++) {
    timeArr.push(index);
  }

  return {
    collapsed,
    setCollapsed,
    handleWeekForward,
    handleWeekBackward,
    weekData,
    timeArr,
    currentMonthCount,
  };
};
