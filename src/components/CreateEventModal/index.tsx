import { useState, useEffect } from "react";
import "./CreateEventModal.css";
import { Card, Button, TimePicker, Input, Typography } from "antd";
import {
  CloseOutlined,
  ClockCircleOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const labelColors = ["red", "blue", "yellow", "green"];

export default function CreateEventModal({
  eventModalInfo,
  openEventModal,
  setEventModalInfo,
  handleCloseEventModal,
  savedEvents,
  setSavedEvents,
}: any) {
  console.log("GET EVENT DATE", eventModalInfo);

  const [endTimeHrDropdownValues, setEndTimeHrDropdownValues] = useState<any[]>(
    []
  );
  const [userEventInfo, setUserEventInfo] = useState<any>({
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

  // Allowing only those values for endTimeHr that comes after startTimeHr
  useEffect(() => {
    var filteredHrs = [];
    for (let eachHr = eventModalInfo?.startTimeHr + 1; eachHr <= 23; eachHr++) {
      console.log(eachHr + 1);
      filteredHrs.push(eachHr);
    }
    setEndTimeHrDropdownValues(filteredHrs);
  }, [eventModalInfo]);

  console.log("setEndTimeHrDropdownValues", endTimeHrDropdownValues);

  // Handling user inputs on onChange
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

  // Adding new event on submit
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
        style={{ display: openEventModal ? "block" : "none" }}
        className="eventModalCard"
      >
        <div>
          <CloseOutlined
            onClick={() => handleCloseEventModal()}
            className="eventModal_closeBtn"
          />
        </div>
        {/* Title */}
        <Input
          size="large"
          placeholder="Add Title"
          bordered={false}
          className="eventModal_textFields eventModal_titleTextField"
          value={userEventInfo.title}
          onChange={(e) => handleNewEventDetails(e, "title")}
        />
        {/* Date Div */}
        <div className="eventModal_dateDiv">
          <ClockCircleOutlined className="eventModal_dateDivIcon" />
          <Title level={5} className="eventModal_dateDivText">
            {eventModalInfo && eventModalInfo.oneDay.format("DD-MMMM-YYYY")}
          </Title>
        </div>

        {/* Time Div */}
        <div className="eventModal_timeDiv">
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
            <span className="eventModal_timeDivDashIcon">–</span>
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
              <option value="" disabled selected hidden style={{color: "#C4C4C4", borderColor: "#C4C4C4"}}>
                hr
              </option>
              {endTimeHrDropdownValues.map((eachHrTime: string) => {
                return <option value={eachHrTime} style={{color: "#000"}}>{eachHrTime}</option>;
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
          className="eventModal_textFields eventModal_descriptionTextField"
          value={userEventInfo.description}
          onChange={(e) => handleNewEventDetails(e, "description")}
        />

        {/* Colors */}
        <div style={{ display: "flex" }}>
          <BgColorsOutlined className="eventModal_labelColorIcon" />
          <Title level={5} className="eventModal_labelColorHeading">
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
        <hr style={{ margin: "1.5rem 0", borderColor: "#ededed" }} />

        {/* Submit */}
        <div className="eventModal_submitBtnDiv">
          <Button
            className="eventModal_submitBtn"
            onClick={() => addNewEvent()}
          >
            Save Event
          </Button>
        </div>
      </Card>
    </>
  );
}
