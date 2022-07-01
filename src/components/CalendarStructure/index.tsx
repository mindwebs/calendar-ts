import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Button, Col, Row, Menu } from "antd";
import Day from "../Day";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

export default function CalendarStructure() {
  // const [currentMonth, setCurrentMonth] : number = useState(dayjs().month());

  // console.log(dayjs().format("MMMM YYYY"));
  // console.log(dayjs().format("MMMM"));
  // console.log(dayjs().format("YYYY"));
  // console.log(dayjs().format("D"));
  // console.log(dayjs().format("d"));
  // console.log(dayjs().format("H"));
  // console.log(dayjs().format("m"));
  // console.log(dayjs().format("s"));
  // console.log(dayjs().format("a"));
  // console.log(dayjs().date());
  // console.log(dayjs().day(30));
  // console.log(dayjs().weekYear();
  // console.log(dayjs('2018-06-27').week());
  // console.log(dayjs().isoWeek());
  // dayjs Difference

  // console.log(dayjs().diff(dayjs("2018-06-27"), "day"));
  // console.log("ÖKKK");
  const year = dayjs().year();
  const month = dayjs().month();
  // const firstDayOfTheMonth = dayjs().startOf("month");
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  console.log("firstDay", firstDayOfTheMonth);

  var currentMonthCount = 0 - firstDayOfTheMonth;
  console.log(currentMonthCount);

  const weeksMatrix = new Array(7).fill(null).map(() => {
    currentMonthCount++;
    return dayjs(new Date(year, 6, currentMonthCount));
  });

  const [weekMatrix, setWeekMatrix]: any = useState(weeksMatrix);
  const [weekCount, setWeekCount]: any = useState(currentMonthCount);

  function heheMatrix() {
    console.log("HEYO", currentMonthCount);
    currentMonthCount = weekCount;
    const weeksMatrix = new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, 6, currentMonthCount));
    });
    console.log("Fuck off", currentMonthCount);
    setWeekCount(currentMonthCount);
    setWeekMatrix(weeksMatrix);
    // return weeksMatrix;
  }

  const timeArr = [];
  for (let index = 0; index < 24; index++) {
    timeArr.push(index);
  }

  // const daysMatrix = new Array(5).fill([]).map(() => {
  //   return new Array(7).fill(null).map(() => {
  //     currentMonthCount++;
  //     return dayjs(new Date(year, month, currentMonthCount));
  //   });
  // });

  console.log("WEEK", weekMatrix);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Row>
        <Col xs={24} xl={collapsed ? 1 : 4}>
          <Sidebar collapsed={collapsed} />
        </Col>
        <Col
          xs={24}
          xl={collapsed ? 23 : 20}
          style={{ paddingLeft: collapsed ? "2vw" : "0" }}
        >
          <Day
            day={weekMatrix}
            timeArr={timeArr}
            currentMonthCount={currentMonthCount}
            heheMatrix={heheMatrix}
          />
        </Col>
      </Row>
    </div>
  );
}
