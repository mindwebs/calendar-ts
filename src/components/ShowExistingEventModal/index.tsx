import { useState, useEffect } from "react";
import "./ShowExistingEventModal.css";
import { Card, Button, TimePicker, Input, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function ShowExistingEventModal({
  existingEventCardPopup,
  setExistingEventCardPopup,
  existingEventCardPopupDetails,
  setExistingEventCardPopupDetails,
}: any) {
  return (
    <>
      <Card
        style={{
          display: existingEventCardPopup ? "block" : "none",
          padding: "0",
        }}
        className="existingEventModalCard"
      >
        <div>
          <CloseOutlined
            onClick={() => setExistingEventCardPopup(false)}
            className="eventModal_closeBtn"
          />
        </div>
      </Card>
    </>
  );
}
