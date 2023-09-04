import { memo } from "react";
import { IMessage } from "../../services/ChatService/types";
import "./ChatMessage.scss";

const formatDate = (dateStr: string): string => {
  const date: Date = new Date(dateStr);
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
};

// react-virtuoso seems to have problems with vertical margins calculation, so I added spacer
// instead of specifing margin-bottom on ChatMessage
export const ChatMessage = memo(
  ({ message, style }: { message: IMessage; style?: object }) => {
    return (
      <>
        <div className="ChatMessage" {...style}>
          <div className="ChatMessage__author">{message.user_name}</div>
          <div className="ChatMessage__text">{message.message}</div>
          <div className="ChatMessage__date">
            {formatDate(message.send_date)}
          </div>
        </div>
        <div className="spacer"></div>
      </>
    );
  },
);
