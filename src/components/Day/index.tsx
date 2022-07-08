import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import "./Day.css";
import { Typography } from "antd";
import CreateEventModal from "../CreateEventModal";
import ShowExistingEventModal from "../ShowExistingEventModal";

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
  // Scroll state handler for timeBlocks
  var allTimesForEachDateDiv: any = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollForTime, setScrollForTime] = useState(false);
  //Add events
  const [savedEvents, setSavedEvents]: any = useState([]);
  //Existing event
  const [existingEventCardPopup, setExistingEventCardPopup] =
    useState<boolean>(false);
  const [existingEventCardPopupDetails, setExistingEventCardPopupDetails] =
    useState<object>({});

  // Control eventCard Popup
  function handleOpenEventModal(oneDay: any, startTimeHr: number) {
    setEventModalInfo({ oneDay, startTimeHr });
    setOpenEventModal(true);
  }

  function handleCloseEventModal() {
    setOpenEventModal(false);
    setEventModalInfo(null);
  }

  console.log("Saved Events", savedEvents);

  // For scrollHandling in timeblocks
  const allTimeBlocksForEachDate = Array.from(
    document.getElementsByClassName("alltimesForEachDate")
  );

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(allTimesForEachDateDiv.current.scrollTop);
    };
    const allTimesForEachDate = allTimesForEachDateDiv.current;
    allTimesForEachDate.addEventListener("scroll", updatePosition);
    return () =>
      allTimesForEachDate.removeEventListener("scroll", updatePosition);
  }, []);

  useEffect(() => {
    // console.log("allTimeBlocksForEachDate", allTimeBlocksForEachDate);
    allTimeBlocksForEachDate.forEach((el: any) => {
      el.scrollTop = scrollPosition;
    });
  }, [allTimeBlocksForEachDate, scrollPosition]);

  // Calculating event duration
  function calculateEventDuration(
    stTimeHr: number,
    stTimeMin: number,
    endTimeHr: number,
    endTimeMin: number
  ) {
    const stTime = stTimeHr * 60 + stTimeMin;
    const endTime = endTimeHr * 60 + endTimeMin;

    const duration = endTime - stTime;
    // console.log("duration", duration);
    const heightValue = ((duration / 15) * 25).toString() + "%";
    return heightValue;
  }

  // Exisiting event click handler
  function onExistingEventClick(e: object, oneDay: object) {
    // console.log("onExistingEventClick", e);
    setExistingEventCardPopup(true);
    setExistingEventCardPopupDetails({ e, oneDay });
  }

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
                  style={{
                    margin: "0",
                    borderLeft: "none",
                    height: "4rem",
                    zIndex: "1",
                  }}
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
                {timeArr.map((startTimeHr: number) => {
                  return (
                    <div style={{ position: "relative" }}>
                      <div
                        className="timeBlocks"
                        style={{
                          height: "4rem",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleOpenEventModal(oneDay, startTimeHr)
                        }
                      ></div>
                      <span>
                        {savedEvents.length > 0 &&
                          savedEvents.map((event: any) => {
                            console.log(event);
                            if (startTimeHr === event.startTimeHr) {
                              console.log("Wohooooo", startTimeHr);
                            }
                            return (
                              <div>
                                {oneDay.format("DD-MM-YY") === event.dayMe &&
                                startTimeHr === event.startTimeHr ? (
                                  <div
                                    onClick={() =>
                                      onExistingEventClick(
                                        event,
                                        oneDay.format("MMMM D, YYYY")
                                      )
                                    }
                                    style={{
                                      position: "absolute",
                                      zIndex: "2",
                                      width: "90%",
                                      backgroundColor: event.labelColor,
                                      height: calculateEventDuration(
                                        event.startTimeHr,
                                        event.startTimeMin,
                                        event.endTimeHr,
                                        event.endTimeMin
                                      ),
                                      top:
                                        event.startTimeMin === 0
                                          ? "0%"
                                          : event.startTimeMin === 15
                                          ? "25%"
                                          : event.startTimeMin === 30
                                          ? "50%"
                                          : "75%",
                                      cursor: "pointer",
                                      // color: "#fff",
                                    }}
                                  >
                                    {event.title ? event.title : ""}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            );
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

      <CreateEventModal
        eventModalInfo={eventModalInfo}
        openEventModal={openEventModal}
        setEventModalInfo={setEventModalInfo}
        handleCloseEventModal={handleCloseEventModal}
        savedEvents={savedEvents}
        setSavedEvents={setSavedEvents}
      />

      <ShowExistingEventModal
        existingEventCardPopup={existingEventCardPopup}
        setExistingEventCardPopup={setExistingEventCardPopup}
        existingEventCardPopupDetails={existingEventCardPopupDetails}
        setExistingEventCardPopupDetails={setExistingEventCardPopupDetails}
      />
    </>
  );
}
