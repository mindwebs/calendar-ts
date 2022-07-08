import { Col, Row } from "antd";
import { CalendarStructureLogic } from "./CalendarStructure";

// Components
import Day from "../Day";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export default function CalendarStructure() {
  const {
    collapsed,
    setCollapsed,
    handleWeekForward,
    handleWeekBackward,
    weekData,
    timeArr,
    currentMonthCount,
  } = CalendarStructureLogic();

  // console.log("weekData", weekData);

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
