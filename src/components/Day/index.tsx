import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./Day.css";
import { Typography, Row, Col, Divider } from "antd";

import EventModal from "../EventModal/EventModal";

export default function Day({
  day,
  timeArr,
  currentMonthCount,
  handleWeekChange,
}: any) {
  // console.log(day);
  const { Title } = Typography;

  const [eventModalInfo, setEventModalInfo]: any = useState();
  const [openEventModal, setOpenEventModal]: any = useState(false);
  //Add events
  const [savedEvents, setSavedEvents]: any = useState([]);
  const [eachDayEvent, setEachDayEvent]: any = useState([]);

  useEffect(() => {
    // const events = savedEvents.filter(
    //   (evt: any) =>
    //     dayjs(evt.day).format("DD-MM-YY") ===
    //     day.map((oneDay: any) => {
    //       console.log(dayjs(evt.day).format("DD-MM-YY"));
    //       console.log("Pweasee", oneDay);
    //       return oneDay.format("DD-MM-YY");
    //     })
    // );
    var events;
    events = day.map((oneDay: any) => {
      return savedEvents.filter(
        (evt: any) =>
          dayjs(evt.day).format("DD-MM-YY") === oneDay.format("DD-MM-YY")
      );
    });
    console.log("events", events);
    setEachDayEvent(events);
  }, [savedEvents]);
  console.log("eachDayEvent", eachDayEvent);

  function handleOpenEventModal(oneDay: any, oneTime: number) {
    setEventModalInfo({ oneDay, oneTime });
    setOpenEventModal(true);
  }

  function handleCloseEventModal() {
    setOpenEventModal(false);
    setEventModalInfo(null);
  }

  console.log("Saved Events", savedEvents);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "3vw" }}>
          <Title level={5}>&nbsp; </Title>
          <Title level={2} className="date">
            &nbsp;
          </Title>
          {timeArr.map((oneTime: number) => {
            return (
              <p
                style={{ margin: "0", borderLeft: "none", height: "4rem" }}
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
                  <div
                    className="timeBlocks"
                    style={{ height: "4rem", cursor: "pointer" }}
                    onClick={() => handleOpenEventModal(oneDay, oneTime)}
                  >
                    <Title level={4} style={{ margin: "0" }}>
                      {oneTime}
                    </Title>
                    <span>
                      {savedEvents.length > 0 &&
                        savedEvents.map((event: any) => {
                          console.log(event);
                          if (
                            oneDay.format("DD-MM-YY") === event.dayMe &&
                            oneTime === event.startTime
                          ) {
                            console.log("Wohooo", event);
                            return (
                              <span
                                style={{ backgroundColor: event.labelColor }}
                              >
                                {event.title ? event.title : ""}
                              </span>
                            );
                          }
                        })}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <EventModal
        eventModalInfo={eventModalInfo}
        openEventModal={openEventModal}
        handleCloseEventModal={handleCloseEventModal}
        savedEvents={savedEvents}
        setSavedEvents={setSavedEvents}
      />
    </>
  );
}
