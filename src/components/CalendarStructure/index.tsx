import React, { useState } from "react";
import dayjs from "dayjs";
import { Button, Col, Row } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
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

  let currentMonthCount = 0 - firstDayOfTheMonth;
  console.log(currentMonthCount);

  const weeksMatrix = new Array(7).fill(null).map(() => {
    currentMonthCount++;
    return dayjs(new Date(year, 6, currentMonthCount));
  });

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

  // console.log(daysMatrix);
  console.log(weeksMatrix);

  return (
    <div>
      {/* <Navbar /> */}
      <Row>
        <Col xs={24} xl={4}>
          {/* <Sidebar /> */}
        </Col>
        <Col xs={24} xl={20}>
          <Day day={weeksMatrix} timeArr={timeArr} />
        </Col>
      </Row>
    </div>
  );
}
