import { useState, useEffect } from "react";
import "./EventModal.css";
import { Card, Button, TimePicker } from "antd";

export default function EventModal({
  eventModalInfo,
  openEventModal,
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
  }

  return (
    <>
      <Card
        style={{
          display: openEventModal ? "block" : "none",
        }}
        className="eventModalCard"
      >
        <button onClick={() => handleCloseEventModal()}>Close</button>
        <input
          placeholder="Title"
          value={setUserEventInfo.title}
          onChange={(e) => handleNewEventDetails(e, "title")}
        />
        <input
          placeholder="Description"
          value={setUserEventInfo.description}
          onChange={(e) => handleNewEventDetails(e, "description")}
        />
        {/* Start Time */}
        <p>Start Time</p>
        <p>{eventModalInfo && eventModalInfo.oneDay.format("DD-MMMM-YYYY")}</p>
        <p>{eventModalInfo && eventModalInfo.startTimeHr}</p>
        <TimePicker
          format="mm"
          minuteStep={15}
          onOk={(e) => handleNewEventDetails(e!.minute(), "startTimeMin")}
        />

        {/* End Time */}
        <p>End Time</p>
        <select
          value={setUserEventInfo.endTimeHr}
          onChange={(e) => handleNewEventDetails(e.target.value, "endTimeHr")}
        >
          {endTimeHrDropdownValues.map((eachHrTime: string) => {
            return <option value={eachHrTime}>{eachHrTime}</option>;
          })}
        </select>
        <TimePicker
          format="mm"
          minuteStep={15}
          onOk={(e) => handleNewEventDetails(e!.minute(), "endTimeMin")}
        />

        {/* Colors */}
        <select
          value={setUserEventInfo.labelColor}
          onChange={(e) => handleNewEventDetails(e, "labelColor")}
        >
          {labelColors.map((color: string) => {
            return <option value={color}>{color}</option>;
          })}
        </select>
        <Button onClick={() => addNewEvent()}>Add Event</Button>
      </Card>
    </>
  );
}
