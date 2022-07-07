import "./Navbar.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Layout, Typography, Row, Col } from "antd";

const { Header } = Layout;
const { Title } = Typography;

export default function Navbar({
  collapsed,
  setCollapsed,
  handleWeekForward,
  handleWeekBackward,
  currentTimelineHeading,
}: any) {
  return (
    <>
      <Header className="navbar">
        <Row>
          <Col xs={24} xl={4}>
            <div style={{ display: "flex" }}>
              {collapsed ? (
                <MenuUnfoldOutlined
                  className="toggleCollapseBtn"
                  onClick={() => setCollapsed(!collapsed)}
                />
              ) : (
                <MenuFoldOutlined
                  className="toggleCollapseBtn"
                  onClick={() => setCollapsed(!collapsed)}
                />
              )}
              <img
                className="logo"
                src="//ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_3_2x.png#"
                alt=""
              />
              <Title level={3} className="calendarHeading">
                Calendar
              </Title>
            </div>
          </Col>
          <Col xs={24} xl={20}>
            <Button className="todayBtn">Today</Button>
            <LeftOutlined
              className="nav_weekChangeArrowBtns"
              onClick={() => handleWeekBackward()}
            />
            <RightOutlined
              className="nav_weekChangeArrowBtns"
              onClick={() => handleWeekForward()}
            />
            <Title level={3} className="nav_currentMonth">
              {currentTimelineHeading}
            </Title>
          </Col>
        </Row>
      </Header>
    </>
  );
}
