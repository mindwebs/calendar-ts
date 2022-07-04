import { useState, useEffect } from "react";
import "./EventModal.css";
import { Card, Button } from "antd";

export default function EventModal({
  eventModalInfo,
  openEventModal,
  handleCloseEventModal,
  savedEvents,
  setSavedEvents,
}: any) {
  console.log("GET EVENT DATE", eventModalInfo);

  const labelColors = ["red", "blue", "yellow", "green"];
  const minTime: string[] = ["00", "15", "30", "45"];

  const [endTimeHrDropdownValues, setEndTimeHrDropdownValues] = useState<any[]>([])

  // Allowing only those values that comes after startTimeHr
  useEffect(() => {
    console.log(eventModalInfo?.startTimeHr)
      for (let eachHr = eventModalInfo?.startTimeHr; eachHr <= 23; eachHr++) {
        console.log(eachHr + 1)
        setEndTimeHrDropdownValues([...endTimeHrDropdownValues, eachHr+1])    
      }
      console.log("setEndTimeHrDropdownValues", endTimeHrDropdownValues)
  }, [eventModalInfo])

  console.log("setEndTimeHrDropdownValues", endTimeHrDropdownValues)

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
    setUserEventInfo({
      ...userEventInfo,
      [key]: e.target.value,
      day: eventModalInfo.oneDay.valueOf(),
      dayMe: eventModalInfo.oneDay.format("DD-MM-YY"),
      startTimeHr: eventModalInfo.startTimeHr,
      id: Date.now(),
    });
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
        <select
          value={setUserEventInfo.startTimeMin}
          onChange={(e) => handleNewEventDetails(e, "startTimeMin")}
        >
          {minTime.map((eachMinTime: string) => {
            return <option value={eachMinTime}>{eachMinTime}</option>;
          })}
        </select>

        {/* End Time */}
        <p>End Time</p>
        <select
          value={setUserEventInfo.endTimeHr}
          onChange={(e) => handleNewEventDetails(e, "endTimeHr")}
        >
          {endTimeHrDropdownValues.map((eachMinTime: string) => {
            return <option value={eachMinTime}>{eachMinTime}</option>;
          })}
        </select>
        <select
          value={setUserEventInfo.endTimeMin}
          onChange={(e) => handleNewEventDetails(e, "endTimeMin")}
        >
          {minTime.map((eachMinTime: string) => {
            return <option value={eachMinTime}>{eachMinTime}</option>;
          })}
        </select>

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
