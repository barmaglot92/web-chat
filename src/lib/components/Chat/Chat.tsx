import { useCallback, useState } from "react";
import { ChatProvider, useChatContext } from "./hooks/useChat";
import { ChatBody } from "./components/ChatBody/ChatBody";
import { ChatInput } from "./components/ChatInput/ChatInput";
import { ChatProps } from "./types";
import "./Chat.scss";

const ChatInner = ({
  messagesHeight,
  floodPreventionTimeout,
  user,
}: ChatProps) => {
  const { sendMessage } = useChatContext();
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSendMessage = useCallback(
    (message: string) => {
      setProcessing(true);
      sendMessage(
        { message, user_name: user.login },
        floodPreventionTimeout,
      ).then(() => setProcessing(false));
    },
    [sendMessage, floodPreventionTimeout, user.login],
  );

  return (
    <div className="Chat">
      <ChatBody height={messagesHeight} />
      <ChatInput onSend={handleSendMessage} disabled={processing} />
    </div>
  );
};

export const Chat = ({
  apiConfig,
  onTokenExpire,
  messagesHeight,
  floodPreventionTimeout,
  user,
}: ChatProps) => {
  return (
    <ChatProvider apiConfig={apiConfig} onTokenExpire={onTokenExpire}>
      <ChatInner
        onTokenExpire={onTokenExpire}
        apiConfig={apiConfig}
        messagesHeight={messagesHeight}
        floodPreventionTimeout={floodPreventionTimeout}
        user={user}
      />
    </ChatProvider>
  );
};
