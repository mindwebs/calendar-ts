import { useState } from "react";
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

  const [userEventInfo, setUserEventInfo]: any = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
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
      startTime: eventModalInfo.oneTime,
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
        <p>{eventModalInfo && eventModalInfo.oneDay.format("DD-MMMM-YYYY")}</p>

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
