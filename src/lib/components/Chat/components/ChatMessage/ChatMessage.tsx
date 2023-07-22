import { IMessage } from "../../services/ChatService/types";
import "./ChatMessage.css";

export const ChatMessage = ({ message }: { message: IMessage }) => {
  return <div className="ChatMessage">{message.message}</div>;
};
