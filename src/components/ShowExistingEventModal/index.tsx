import "./ShowExistingEventModal.css";
import { Card, Typography } from "antd";
import { CloseOutlined, FileTextFilled } from "@ant-design/icons";

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
        }}
        className="existingEventModalCard"
      >
        <div>
          <CloseOutlined
            className="eventModal_closeBtn"
            onClick={() => setExistingEventCardPopup(false)}
          />
        </div>

        {/* Title */}
        <div className="existingEventModalCard_contentDivs">
          <div
            className="existingEventModalCard_titleSquareIcon"
            style={{
              backgroundColor: existingEventCardPopupDetails.e?.labelColor,
            }}
          ></div>
          <Title level={4} className="existingEventModalCard_title">
            {existingEventCardPopupDetails.e?.title}
          </Title>
        </div>

        {/* Date and Time */}
        <div style={{ display: "flex", margin: "0 2rem" }}>
          <Title level={5} className="existingEventModalCard_dateAndTime">
            {existingEventCardPopupDetails &&
              existingEventCardPopupDetails.oneDay}
            <div className="existingEventModalCard_dateAndTimeBlackDot"></div>
            {existingEventCardPopupDetails.e?.startTimeHr +
              ":" +
              (existingEventCardPopupDetails.e?.startTimeMin === 0
                ? "00"
                : existingEventCardPopupDetails.e?.startTimeMin) +
              " – " +
              existingEventCardPopupDetails.e?.endTimeHr +
              ":" +
              (existingEventCardPopupDetails.e?.endTimeMin === 0
                ? "00"
                : existingEventCardPopupDetails.e?.endTimeMin)}
          </Title>
        </div>

        {/* Description */}
        {existingEventCardPopupDetails.e?.description && (
          <div style={{ display: "flex", margin: "1rem 0" }}>
            <FileTextFilled className="existingEventModalCard_descriptionIcon" />
            <Title level={5} className="existingEventModalCard_description">
              {existingEventCardPopupDetails &&
                existingEventCardPopupDetails.e?.description}
            </Title>
          </div>
        )}
      </Card>
    </>
  );
}
