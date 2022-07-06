import { useState } from "react";
import dayjs from "dayjs";
import { Col, Row } from "antd";
import Day from "../Day";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export default function CalendarStructure() {
  const [collapsed, setCollapsed] = useState(false);

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

  const [weekData, setWeekData]: any = useState(weeksMatrix);
  const [weekCount, setWeekCount]: any = useState(currentMonthCount);

  function handleWeekForward() {
    currentMonthCount = weekCount;
    const weeksMatrix = new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, 6, currentMonthCount));
    });
    setWeekCount(currentMonthCount);
    setWeekData(weeksMatrix);
  }

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

  console.log("WEEK", weekData);
  console.log("WEEK COUNT", weekCount);

  return (
    <div>
      <Navbar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        handleWeekForward={handleWeekForward}
        handleWeekBackward={handleWeekBackward}
        currentTimelineHeading={weekData[3].format("MMMM YYYY")}
      />
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
            day={weekData}
            timeArr={timeArr}
            currentMonthCount={currentMonthCount}
          />
        </Col>
      </Row>
    </div>
  );
}
