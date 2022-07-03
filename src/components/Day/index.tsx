import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import "./Day.css";
import { Typography } from "antd";
import EventModal from "../EventModal/EventModal";

const { Title } = Typography;

export default function Day({
  day,
  timeArr,
  currentMonthCount,
  handleWeekChange,
}: any) {
  // console.log(day);
  const [eventModalInfo, setEventModalInfo]: any = useState();
  const [openEventModal, setOpenEventModal]: any = useState(false);
  //Add events
  const [savedEvents, setSavedEvents]: any = useState([]);
  const [eachDayEvent, setEachDayEvent]: any = useState([]);

  useEffect(() => {
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

  // Control eventCard Popup
  function handleOpenEventModal(oneDay: any, oneTime: number) {
    setEventModalInfo({ oneDay, oneTime });
    setOpenEventModal(true);
  }

  function handleCloseEventModal() {
    setOpenEventModal(false);
    setEventModalInfo(null);
  }

  console.log("Saved Events", savedEvents);

  // For scrollHandling in timeblocks
  var allTimesForEachDateDiv: any = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollForTime, setScrollForTime] = useState(false);

  const allWithClass = Array.from(
    document.getElementsByClassName("alltimesForEachDate")
  );

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(allTimesForEachDateDiv.current.scrollTop);
    };

    allTimesForEachDateDiv.current.addEventListener("scroll", updatePosition);

    return () =>
      allTimesForEachDateDiv.current.removeEventListener(
        "scroll",
        updatePosition
      );
  }, []);

  useEffect(() => {
    console.log("allWithClass", allWithClass);
    allWithClass.forEach((el: any) => {
      el.scrollTop = scrollPosition;
    });
  }, [scrollPosition]);

  return (
    <>
      <div style={{ display: "flex", width: "98%" }}>
        {/* For showing time on the left side */}
        <div style={{ width: "3vw" }}>
          <Title level={5} className="calendar_dayNames">
            &nbsp;{" "}
          </Title>
          <Title level={2} className="dateDiv">
            &nbsp;
          </Title>
          <div
            style={{
              overflowY: scrollForTime ? "scroll" : "hidden",
            }}
            className="alltimesForEachDate"
          >
            {timeArr.map((oneTime: number) => {
              return (
                <p
                  style={{ margin: "0", borderLeft: "none", height: "4rem" }}
                  className="timeBlocks"
                >
                  <span className="calendar_timeHeadings">{oneTime}:00</span>
                </p>
              );
            })}
          </div>
        </div>

        {/* Each day & timeBlocks mapping */}
        {day.map((oneDay: any) => {
          return (
            <div style={{ width: "14.2%" }}>
              <div>
                <Title
                  level={5}
                  className="calendar_dayNames"
                  style={{
                    color:
                      oneDay.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
                        ? "#1967D2"
                        : "#70757a",
                  }}
                >
                  {oneDay.format("ddd").toUpperCase()}
                </Title>
                <Title level={2} className="dateDiv">
                  <span
                    className="date"
                    style={{
                      color:
                        oneDay.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
                          ? "#fff"
                          : "#3C4043",
                      backgroundColor:
                        oneDay.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
                          ? "#1967D2"
                          : "#fff",
                    }}
                  >
                    {oneDay.format("DD")}
                  </span>
                </Title>
              </div>
              <div
                style={{
                  overflowY: scrollForTime ? "scroll" : "hidden",
                }}
                className="alltimesForEachDate"
              >
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
            </div>
          );
        })}

        {/* For Scrolling Feature in timeBlocks */}
        <div>
          <Title level={5} className="calendar_dayNames">
            &nbsp;{" "}
          </Title>
          <Title level={2} className="dateDiv">
            &nbsp;
          </Title>
          <div
            ref={allTimesForEachDateDiv}
            style={{
              height: "70vh",
              overflowY: "scroll",
            }}
            onClick={() => setScrollForTime(true)}
          >
            {timeArr.map((oneTime: number) => {
              return (
                <p
                  style={{ margin: "0", borderLeft: "none", height: "4rem" }}
                  className="timeBlocks"
                >
                  <span>&nbsp;</span>
                </p>
              );
            })}
          </div>
        </div>
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
