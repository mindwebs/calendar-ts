import { useState, useEffect } from "react";
import "./CreateEventModal.css";
import { Card, Button, TimePicker, Input, Typography } from "antd";
import {
  CloseOutlined,
  ClockCircleOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export default function CreateEventModal({
  eventModalInfo,
  openEventModal,
  setEventModalInfo,
  handleCloseEventModal,
  savedEvents,
  setSavedEvents,
}: any) {
  console.log("GET EVENT DATE", eventModalInfo);

  const labelColors = ["red", "blue", "yellow", "green"];

  const [endTimeHrDropdownValues, setEndTimeHrDropdownValues] = useState<any[]>(
    []
  );

  // Allowing only those values that comes after startTimeHr
  useEffect(() => {
    var some = [];
    for (let eachHr = eventModalInfo?.startTimeHr + 1; eachHr <= 23; eachHr++) {
      console.log(eachHr + 1);
      some.push(eachHr);
    }
    setEndTimeHrDropdownValues(some);
    console.log("setEndTimeHrDropdownValues", endTimeHrDropdownValues);
  }, [eventModalInfo]);

  console.log("setEndTimeHrDropdownValues", endTimeHrDropdownValues);

  const [userEventInfo, setUserEventInfo]: any = useState({
    title: "",
    description: "",
    startTimeHr: "",
    startTimeMin: "",
    endTimeHr: "",
    endTimeMin: "",
    day: "",
    labelColor: "blue",
    id: "",
  });

  function handleNewEventDetails(e: any, key: string) {
    if (key === "startTimeMin" || key === "endTimeHr" || key === "endTimeMin") {
      setUserEventInfo({
        ...userEventInfo,
        [key]: parseInt(e),
      });
    } else {
      setUserEventInfo({
        ...userEventInfo,
        [key]: e.target.value,
        day: eventModalInfo.oneDay.valueOf(),
        dayMe: eventModalInfo.oneDay.format("DD-MM-YY"),
        startTimeHr: eventModalInfo.startTimeHr,
        id: Date.now(),
      });
    }
  }
  console.log(userEventInfo);

  function addNewEvent() {
    setSavedEvents([...savedEvents, userEventInfo]);
    handleCloseEventModal();
    setUserEventInfo({
      title: "",
      description: "",
      startTimeHr: "",
      startTimeMin: "",
      endTimeHr: "",
      endTimeMin: "",
      day: "",
      labelColor: "blue",
      id: "",
    });
    setEventModalInfo(null);
  }

  console.log("userEventInfo", userEventInfo);
  return (
    <>
      <Card
        style={{
          display: openEventModal ? "block" : "none",
          padding: "0",
        }}
        className="eventModalCard"
      >
        <div>
          <CloseOutlined
            onClick={() => handleCloseEventModal()}
            className="eventModal_closeBtn"
          />
        </div>
        <Input
          size="large"
          placeholder="Add Title"
          bordered={false}
          className="eventModal_titleTextField"
          value={userEventInfo.title}
          onChange={(e) => handleNewEventDetails(e, "title")}
        />
        <div style={{ display: "flex", margin: "0.8rem 0" }}>
          <ClockCircleOutlined
            style={{ margin: "auto 1rem auto 0", fontSize: "1.1rem" }}
          />

          <Title level={5} style={{ display: "block", margin: "auto 0" }}>
            {eventModalInfo && eventModalInfo.oneDay.format("DD-MMMM-YYYY")}
          </Title>
        </div>

        <div
          style={{
            paddingLeft: "1.95rem",
            display: "flex",
            margin: "0.8rem 0",
            justifyContent: "space-between",
          }}
        >
          {/* Start Time */}
          <div>
            {eventModalInfo && (
              <select className="eventModal_timeHrSelect">
                <option value={eventModalInfo.startTimeHr}>
                  {eventModalInfo.startTimeHr}
                </option>
              </select>
            )}
            <TimePicker
              format="mm"
              placeholder="min"
              className="eventModal_timePickerMinBox"
              minuteStep={15}
              onOk={(e) => handleNewEventDetails(e!.minute(), "startTimeMin")}
            />
          </div>
          <div aria-label=" to ">
            <span style={{ position: "relative", top: "0.25rem" }}>–</span>
          </div>
          {/* End Time */}
          <div>
            <select
              value={userEventInfo.endTimeHr}
              className="eventModal_timeHrSelect"
              onChange={(e) =>
                handleNewEventDetails(e.target.value, "endTimeHr")
              }
            >
              <option value="" disabled selected hidden>
                hr
              </option>
              {endTimeHrDropdownValues.map((eachHrTime: string) => {
                return <option value={eachHrTime}>{eachHrTime}</option>;
              })}
            </select>
            <TimePicker
              format="mm"
              minuteStep={15}
              placeholder="min"
              className="eventModal_timePickerMinBox"
              onOk={(e) => handleNewEventDetails(e!.minute(), "endTimeMin")}
            />
          </div>
        </div>
        {/* Description */}
        <Input
          size="large"
          placeholder="Add Description"
          bordered={false}
          style={{
            width: "90%",
            left: "10%",
            margin: "0.5rem 0 1.5rem",
            borderBottom: "1px solid #000",
          }}
          // className="eventModal_titleTextField"
          value={userEventInfo.description}
          onChange={(e) => handleNewEventDetails(e, "description")}
        />

        {/* Colors */}
        <div style={{ display: "flex" }}>
          <BgColorsOutlined
            style={{ margin: "auto 1rem auto 0", fontSize: "1.35rem" }}
          />
          <Title
            level={5}
            style={{ display: "block", margin: "auto 1rem auto 0" }}
          >
            Choose color :{" "}
          </Title>
          <select
            className="eventModal_timeHrSelect"
            value={userEventInfo.labelColor}
            onChange={(e) => handleNewEventDetails(e, "labelColor")}
          >
            {labelColors.map((color: string) => {
              return <option value={color}>{color}</option>;
            })}
          </select>
        </div>
        <hr style={{ margin: "1rem 0" }} />
        <div style={{ position: "relative", height: "2rem" }}>
          <Button
            style={{ position: "absolute", right: "0" }}
            onClick={() => addNewEvent()}
          >
            Add Event
          </Button>
        </div>
      </Card>
      <div
        style={{
          display: openEventModal ? "block" : "none",
        }}
        className="greyBg"
      ></div>
    </>
  );
}
