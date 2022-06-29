import { useState } from "react";
import dayjs from "dayjs";
import { Button } from "antd";

import Day from "../Day";

var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

var weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday);

export default function CalendarStructure() {
  // const [currentMonth, setCurrentMonth] : number = useState(dayjs().month());

  console.log(dayjs().format("MMMM YYYY"));
  console.log(dayjs().format("MMMM"));
  console.log(dayjs().format("YYYY"));
  console.log(dayjs().format("D"));
  console.log(dayjs().format("d"));
  console.log(dayjs().format("H"));
  console.log(dayjs().format("m"));
  console.log(dayjs().format("s"));
  console.log(dayjs().format("a"));
  console.log(dayjs().date());
  console.log(dayjs().day(30));
  // console.log(dayjs().weekYear();
  // console.log(dayjs('2018-06-27').week());
  // console.log(dayjs().isoWeek());
  // dayjs Difference

  console.log(dayjs().diff(dayjs("2018-06-27"), "day"));
  console.log("ÖKKK");
  const year = dayjs().year();
  const month = dayjs().month();
  // const firstDayOfTheMonth = dayjs().startOf("month");
  const firstDayOfTheMonth = dayjs(new Date(year, month, -1)).day();
  console.log("firstDay", firstDayOfTheMonth);

  let currentMonthCount = 0 - firstDayOfTheMonth;
  console.log(currentMonthCount);

  const weeksMatrix = new Array(7).fill(null).map(() => {
    currentMonthCount++;
    return dayjs(new Date(year, 6, currentMonthCount));
  });

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  console.log(daysMatrix);
  console.log(weeksMatrix);

  return (
    <div>
      <h1>CalendarStructure</h1>
      <Button type="primary">Button</Button>
      <Day day={weeksMatrix} />
    </div>
  );
}
