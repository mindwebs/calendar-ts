import React from "react";
import dayjs from "dayjs";
import "./Day.css";
import { Typography, Row, Col, Divider } from "antd";

export default function Day({ day, timeArr }: any) {
  // console.log(day);
  const { Title } = Typography;

  return (
    <>
      <button>Inc</button>
      <div style={{ display: "flex" }}>
        <div style={{ width: "3vw" }}>
          <Title level={5}>&nbsp; </Title>
          <Title level={2} className="date">
            &nbsp;
          </Title>
          {timeArr.map((oneTime: number) => {
            return (
              <p
                style={{ margin: "0", borderLeft: "none" }}
                className="timeBlocks"
              >
                <span style={{ position: "relative", top: "-12px" }}>
                  {oneTime}:00
                </span>
              </p>
            );
          })}
        </div>

        {day.map((oneDay: any) => {
          return (
            <div style={{ width: "14.2%" }}>
              <Title level={5} style={{ textAlign: "center" }}>
                {oneDay.format("ddd").toUpperCase()}
              </Title>
              <Title
                level={2}
                className="date"
                style={{
                  textAlign: "center",
                }}
              >
                {oneDay.format("DD")}
              </Title>
              {timeArr.map((oneTime: number) => {
                return (
                  <Title
                    level={4}
                    className="timeBlocks"
                    style={{ margin: "0" }}
                  >
                    {oneTime}
                    {/* <Divider plain>{oneTime}</Divider> */}
                  </Title>
                );
              })}
              {/* <p>
              {timeArr.map((oneTime: number) => {
                return <span>{oneTime}</span>;
              })}
            </p> */}
            </div>
          );
        })}
      </div>
    </>
  );
}
