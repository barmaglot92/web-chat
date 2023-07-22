import { useState } from "react";
import "./Chat.css";
import { ChatProvider, useChatContext } from "./hooks/useChat";
import { ChatBody } from "./components/ChatBody/ChatBody";
import { ChatProps } from "./types";

const ChatInner = () => {
  const { sendMessage } = useChatContext();
  const [value, setValue] = useState("");

  return (
    <div className="Chat">
      <ChatBody />

      <input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        type="text"
      />
      <button
        onClick={() => sendMessage({ message: value, user_name: "test_user" })}
      >
        send
      </button>
    </div>
  );
};

export const Chat = (props: ChatProps) => (
  <ChatProvider {...props}>
    <ChatInner />
  </ChatProvider>
);
