import { useChatContext } from "../../hooks/useChat";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import "./ChatBody.css";

export const ChatBody = () => {
  const { messages } = useChatContext();

  return (
    <div className="ChatBody">
      {messages.map((message) => (
        <ChatMessage message={message} key={message.id} />
      ))}
    </div>
  );
};
